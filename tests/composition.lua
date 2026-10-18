local suite = dofile("tests/scenarios.lua")
local scenario = suite.scenario

-- Synthetic IDs keep composition tests independent of class declarations.
local spellID, auraID, overrideID = 999101, 999102, 999103
local action = { spellIDs = { [spellID] = true } }

scenario("Happiness, usability, combat, and aura suppression", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.petExists, client.petHappiness = true, 1
    client.startRules({
        {
            key = "active-aura", action = action, visual = "highlight", suppressGlow = "needs-attention",
            condition = { mechanic = "aura", unit = "pet", filter = "HELPFUL", auraSpellIDs = { [auraID] = true } },
        },
        {
            key = "satisfied", action = action, visual = "highlight",
            condition = { mechanic = "pet-happiness", happiness = 3 },
        },
        {
            key = "needs-attention", action = action, visual = "glow", requireUsable = true,
            condition = { mechanic = "pet-happiness", happiness = 3, below = true, outOfCombat = true },
        },
    })
    client.refresh()
    local container = client.getContainer("pet", "active-aura")
    local slot = container.slots["active-aura"]
    client.setAuraPresent(slot, false)
    client.refresh()
    local glow = client.getSpellGlow()
    local highlight = client.getHighlight()
    assert(glow and highlight and glow.ProcLoop:IsPlaying())
    assert(glow.parent.booleanInput, "The glow has no separate usability condition.")
    assert(slot.candidateFilters.includeSpellIDs[auraID] and not slot.candidateFilters.includeSpellIDs[spellID])
    local layout = client.getLayout("pet", "active-aura")
    assert(layout and layout.groups["active-aura"].maxFrameCount == 1)
    assert(rawget(layout.groups["active-aura"].frame, "mouseEnabled") == false, "A layout marker can intercept mouse input.")
    assert(not slot.presenceTexture, "The suppressor still uses an aura-owned indicator.")
    assert(glow.point[2] == layout and glow.point[3] == "TOPRIGHT")
    assert(not layout.layoutQueryCount, "The core queried secure layout geometry.")
    for _, key in ipairs({ "ProcStartFlipbook", "ProcLoopFlipbook", "ProcAltGlow" }) do
        assert(not glow[key].masks, "The glow still uses a mask.")
    end

    for _, happiness in ipairs({ 1, 2, 3 }) do
        for _, usable in ipairs({ false, true }) do
            for _, inCombat in ipairs({ false, true }) do
                client.petHappiness, client.actions[1].isUsable, client.combatUnits.pet = happiness, usable, inCombat
                client.event("ACTION_USABLE_CHANGED")
                for _, activeAura in ipairs({ false, true }) do
                    client.setAuraPresent(slot, activeAura)
                    client.refresh()
                    local expectedGlow = happiness < 3 and usable and not inCombat and not activeAura
                    assert((client.getSpellGlow() ~= nil) == expectedGlow, "The composed glow has an incorrect condition.")
                    assert(client.alpha(highlight) == (happiness == 3 and 1 or 0))
                    assert(client.alpha(slot.texture) == (activeAura and 1 or 0))
                    local highlighted = client.alpha(highlight) > 0 or client.alpha(slot.texture) > 0
                    assert(highlighted == (happiness == 3 or activeAura), "The highlights do not express alternatives.")
                end
            end
        end
    end
    client.petHappiness = nil
    client.refresh()
    assert(client.alpha(highlight) == 0 and not client.getSpellGlow())
    assert(client.alpha(slot.texture) == 1, "Missing happiness data hid the independent aura highlight.")

    client.petHappiness, client.combatUnits.pet, client.combatUnits.player = 2, false, true
    client.setAuraPresent(slot, false)
    client.event("PLAYER_REGEN_DISABLED")
    client.refresh()
    assert(client.getSpellGlow() == glow, "Player combat changed the pet combat condition.")
    local frames = #client.frames
    client.setAuraPresent(slot, true)
    client.refresh()
    assert(not client.getSpellGlow() and client.alpha(glow) == 1)
    assert(client.alpha(slot.texture) == 1)
    client.setAuraPresent(slot, false)
    client.refresh()
    assert(client.getSpellGlow() == glow and #client.frames == frames, "Aura removal replaced the frames.")
    client.combatUnits.pet = true
    client.refresh()
    assert(not client.getSpellGlow() and not glow.ProcLoop:IsPlaying())
    client.setAuraPresent(slot, true)
    assert(client.alpha(slot.texture) == 1, "Pet combat hid the independent aura highlight.")
    client.combatUnits.player = false
    client.event("PLAYER_REGEN_ENABLED")
    client.refresh()
    assert(not client.getSpellGlow())
    client.setAuraPresent(slot, false)
    client.combatUnits.pet = false
    client.refresh()
    assert(client.getSpellGlow() == glow and glow.ProcLoop:IsPlaying())

    local queries = client.happinessQueryCount
    client.petExists = false
    client.refresh()
    assert(not client.getSpellGlow() and client.alpha(highlight) == 0 and not glow.ProcLoop:IsPlaying())
    assert(client.happinessQueryCount == queries)
    client.petExists, client.deadUnits.pet = true, true
    client.refresh()
    assert(not client.getSpellGlow() and client.alpha(highlight) == 0 and client.happinessQueryCount == queries)
    client.deadUnits.pet, client.petHappiness = false, 3
    client.refresh()
    assert(not client.getSpellGlow() and client.alpha(highlight) == 1)
    client.petHappiness = 1
    client.refresh()
    assert(client.getSpellGlow() == glow and client.alpha(highlight) == 0)

    local changes, slotChanges = container.filterChangeCount, container.slotChangeCount
    for _, event in ipairs({ "PLAYER_TARGET_CHANGED", "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        local refreshes = container.refreshCount
        client.event(event)
        client.refresh()
        assert(container.refreshCount > refreshes and client.getSpellGlow() == glow)
    end
    assert(#client.frames == frames and container.filterChangeCount == changes and container.slotChangeCount == slotChanges)
    button.visible = false
    client.refresh()
    assert(not client.getSpellGlow() and client.alpha(container) == 0 and not glow.ProcLoop:IsPlaying())
    button.visible, button.scale = true, 1.5
    client.refresh()
    assert(client.getSpellGlow() == glow and math.abs(glow.width - 75.6) < 0.001)
    assert(container.width == 54 and container.height == 54)
    client.baseSpellIDs[overrideID] = spellID
    client.actions[1].spellID = overrideID
    client.refresh()
    assert(client.getSpellGlow() == glow and container.slots["active-aura"].enabled)
    assert(not slot.candidateFilters.includeSpellIDs[overrideID])
    button.action = 13
    client.actions[13] = { spellID = auraID }
    client.refresh()
    assert(not client.getSpellGlow() and not container.enabled and client.alpha(highlight) == 0)
    client.actions[13] = { spellID = spellID, isUsable = false }
    client.refresh()
    assert(not client.getSpellGlow() and container.enabled and client.alpha(container) == 1)
    client.actions[13].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(client.getSpellGlow() == glow)
    client.actions[13] = nil
    client.refresh()
    assert(not client.getSpellGlow() and not container.enabled and not glow.ProcLoop:IsPlaying())
end)

scenario("Independent aura rules keep separate usability", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "present", action = action, visual = "highlight",
            condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true } },
        },
        {
            key = "replacement", action = action, visual = "red-blink", requireUsable = true,
            condition = {
                mechanic = "aura", unit = "target", filter = "HARMFUL|PLAYER", ownAura = true,
                auraSpellIDs = { [overrideID] = true },
            },
        },
    })
    client.refresh()
    local present = client.getContainer("target", "present")
    local replacement = client.getContainer("target", "replacement")
    assert(present ~= replacement)
    assert(replacement.slots.replacement.candidateFilters.isFromPlayerOrPlayerPet)
    for _, usable in ipairs({ false, true }) do
        client.actions[1].isUsable = usable
        client.event("ACTION_USABLE_CHANGED")
        assert(client.alpha(present) == 1 and client.alpha(replacement) == (usable and 1 or 0))
        assert(present.slots.present.enabled and replacement.slots.replacement.enabled)
    end
end)

scenario("Target debuff highlights and cast glows stay independent", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "debuff", action = action, visual = "highlight",
            condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true } },
        },
        {
            key = "interrupt", action = action, visual = "glow", requireUsable = true,
            condition = { mechanic = "target-cast" },
        },
    })
    client.refresh()
    local container = client.getContainer("target", "debuff")
    local slot = container.slots.debuff
    local frames = #client.frames
    assert(slot.filter == "HARMFUL" and slot.candidateFilters.isFromPlayerOrPlayerPet == nil)

    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        for _, present in ipairs({ false, true }) do
            client.setAuraPresent(slot, present)
            for _, usable in ipairs({ false, true }) do
                client.actions[1].isUsable = usable
                client.event("ACTION_USABLE_CHANGED")
                for _, cast in ipairs({ "none", "cast", "channel" }) do
                    client.targetCasting, client.targetChanneling = cast == "cast", cast == "channel"
                    client.refresh()
                    assert(client.alpha(slot.texture) == (present and 1 or 0), "The cast glow changed the debuff highlight.")
                    assert((client.getSpellGlow() ~= nil) == (usable and cast ~= "none"), "The debuff highlight changed the cast glow.")
                    assert(slot.enabled and container.enabled)
                end
            end
        end
    end
    assert(#client.frames == frames, "The condition changes replaced the frames.")
    assert(client.alpha(slot.texture) == 1 and client.getSpellGlow())
    button.visible = false
    client.refresh()
    assert(client.alpha(slot.texture) == 0 and not client.getSpellGlow())
    button.visible = true
    client.refresh()
    assert(client.alpha(slot.texture) == 1 and client.getSpellGlow())
    client.actions[1] = nil
    client.refresh()
    assert(not slot.enabled and not container.enabled and not client.getSpellGlow())
end)

scenario("Heal target health and buff highlights stay independent", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.helpfulSpells[spellID] = true
    client.startRules({
        {
            key = "buff", action = { anySpell = true }, visual = "highlight",
            condition = { mechanic = "aura", unit = "buff-target", filter = "HELPFUL", includeActionSpellID = true },
        },
        {
            key = "health", action = action, visual = "highlight",
            condition = { mechanic = "full-health", unit = "heal-target" },
        },
    })
    client.refresh()
    local health = client.healthTexture
    local frames = #client.frames

    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        for _, target in ipairs({
            { exists = true, friendly = true, unit = "target" },
            { exists = true, friendly = false, unit = "player" },
            { exists = false, friendly = false, unit = "player" },
        }) do
            client.targetExists, client.targetFriendly = target.exists, target.friendly
            client.event("PLAYER_TARGET_CHANGED")
            local buff = client.getContainer(target.unit, "buff")
            local slot = buff.slots.buff
            for _, full in ipairs({ false, true }) do
                client.fullHealthUnits.player, client.fullHealthUnits.target = not full, not full
                client.fullHealthUnits[target.unit] = full
                for _, present in ipairs({ false, true }) do
                    client.setAuraPresent(slot, present)
                    for _, usable in ipairs({ false, true }) do
                        client.actions[1].isUsable = usable
                        client.event("ACTION_USABLE_CHANGED")
                        assert(client.alpha(health) == (full and 1 or 0), "The buff or action usability changed the health highlight.")
                        assert(health.alpha.healthUnit == target.unit, "The health highlight selected another unit.")
                        assert(client.alpha(slot.texture) == (present and 1 or 0), "Health or action usability changed the buff highlight.")
                    end
                end
            end
            local queries = client.healthQueryCount[target.unit]
            client.deadUnits[target.unit] = true
            client.refresh()
            assert(client.alpha(health) == 0 and client.healthQueryCount[target.unit] == queries)
            client.deadUnits[target.unit] = false
        end
    end
    assert(#client.frames == frames, "The condition changes replaced the frames.")
    client.actions[1] = nil
    client.refresh()
    assert(client.alpha(health) == 0)
end)

scenario("Missing self buff with secure layout suppression", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID, isUsable = false }
    client.startRules({
        {
            key = "buff-present", action = action, visual = "none", suppressGlow = "buff-missing",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [auraID] = true, [overrideID] = true } },
        },
        {
            key = "buff-missing", action = action, visual = "glow",
            condition = { mechanic = "self-target" },
        },
    })
    client.refresh()
    local container = client.getContainer("player", "buff-present")
    local slot = container.slots["buff-present"]
    client.setAuraPresent(slot, false)
    client.refresh()
    local glow = client.getSpellGlow()
    assert(glow, "The missing buff has no glow.")
    assert(not client.getHighlight() and not slot.texture, "The suppressor added a visual.")
    assert(slot.filter == "HELPFUL" and slot.candidateFilters.isFromPlayerOrPlayerPet == nil)
    assert(slot.candidateFilters.includeSpellIDs[auraID] and slot.candidateFilters.includeSpellIDs[overrideID])
    local frames, filters, slots = #client.frames, container.filterChangeCount, container.slotChangeCount

    for _, target in ipairs({
        { exists = false, friendly = false, self = false, expected = true },
        { exists = true, friendly = false, self = false, expected = true },
        { exists = true, friendly = true, self = false, expected = false },
        { exists = true, friendly = true, self = true, expected = true },
    }) do
        client.targetExists, client.targetFriendly, client.targetIsPlayer = target.exists, target.friendly, target.self
        client.event("PLAYER_TARGET_CHANGED")
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for _, present in ipairs({ false, true }) do
                client.setAuraPresent(slot, present)
                client.refresh()
                assert((client.getSpellGlow() ~= nil) == (target.expected and not present))
            end
        end
    end
    assert(#client.frames == frames and container.filterChangeCount == filters and container.slotChangeCount == slots)
    client.setAuraPresent(slot, false)
    button.visible = false
    client.refresh()
    assert(not client.getSpellGlow())
    button.visible = true
    client.refresh()
    assert(client.getSpellGlow() == glow)
    client.actions[1] = nil
    client.refresh()
    assert(not client.getSpellGlow() and not container.enabled)
    client.actions[1] = { spellID = spellID }
    client.refresh()
    assert(client.getSpellGlow() == glow and container.enabled)
    client.setAuraPresent(slot, true)
    client.refresh()
    assert(not client.getSpellGlow(), "The restored suppressor did not hide the glow.")
end)

scenario("Buff target highlights keep the self-only glow", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID, isUsable = false }
    client.helpfulSpells[spellID] = true
    client.startRules({
        {
            key = "buff-highlight", action = action, visual = "highlight",
            condition = { mechanic = "aura", unit = "buff-target", filter = "HELPFUL", includeActionSpellID = true },
        },
        {
            key = "buff-present", action = action, visual = "none", suppressGlow = "buff-missing",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [auraID] = true } },
        },
        {
            key = "buff-missing", action = action, visual = "glow",
            condition = { mechanic = "self-target" },
        },
    })
    client.refresh()
    local highlight = client.getContainer("player", "buff-highlight")
    local highlightSlot = highlight.slots["buff-highlight"]
    local selfBuff = client.getContainer("player", "buff-present")
    local selfSlot = selfBuff.slots["buff-present"]
    local layout = client.getLayout("player", "buff-present")

    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        for _, target in ipairs({
            { exists = true, friendly = true, unit = "target", glow = false },
            { exists = true, friendly = false, unit = "player", glow = true },
            { exists = false, friendly = false, unit = "player", glow = true },
        }) do
            client.targetExists, client.targetFriendly = target.exists, target.friendly
            client.event("PLAYER_TARGET_CHANGED")
            assert(highlight.unit == target.unit and selfBuff.unit == "player" and layout.unit == "player")
            for _, playerBuff in ipairs({ false, true }) do
                for _, targetBuff in ipairs({ false, true }) do
                    client.setAuraPresent(selfSlot, playerBuff)
                    local highlighted = playerBuff
                    if target.unit == "target" then
                        highlighted = targetBuff
                    end
                    client.setAuraPresent(highlightSlot, highlighted)
                    client.refresh()
                    assert(client.alpha(highlightSlot.texture) == (highlighted and 1 or 0))
                    assert((client.getSpellGlow() ~= nil) == (target.glow and not playerBuff))
                end
            end
        end
    end
end)

scenario("Independent suppressors reset when their action no longer matches", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    local rules = {
        { key = "glow", action = { anySpell = true }, condition = { mechanic = "usable" }, visual = "glow" },
    }
    for _, key in ipairs({ "first", "second" }) do
        rules[#rules + 1] = {
            key = key, action = action, visual = "none", suppressGlow = "glow",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [auraID] = true } },
        }
    end
    client.startRules(rules)
    client.refresh()
    local first = client.getContainer("player", "first").slots.first
    local second = client.getContainer("player", "second").slots.second
    for _, firstPresent in ipairs({ false, true }) do
        for _, secondPresent in ipairs({ false, true }) do
            client.setAuraPresent(first, firstPresent)
            client.setAuraPresent(second, secondPresent)
            client.refresh()
            assert((client.getSpellGlow() ~= nil) == (not firstPresent and not secondPresent))
        end
    end
    first.frame.visible = false
    client.refresh()
    assert(not client.getSpellGlow(), "The suppression depends on the slot frame's visibility.")
    local frames = #client.frames
    client.actions[1].spellID = overrideID
    client.refresh()
    assert(client.getSpellGlow(), "An inactive suppressor retained its alpha condition.")
    client.actions[1].spellID = spellID
    client.refresh()
    assert(not client.getSpellGlow() and #client.frames == frames)
    client.setAuraPresent(first, false)
    client.setAuraPresent(second, false)
    client.refresh()
    assert(client.getSpellGlow(), "The restored suppressors did not release the glow.")
end)

scenario("Suppression starts during combat and updates its layout and filters", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.combatUnits.player = true
    client.startRules({
        { key = "glow", action = { anySpell = true }, condition = { mechanic = "usable" }, visual = "glow" },
        {
            key = "suppressor", action = { anySpell = true }, visual = "none", suppressGlow = "glow",
            condition = { mechanic = "aura", unit = "heal-target", filter = "HELPFUL", includeActionSpellID = true },
        },
    })
    client.refresh()
    local container = client.getContainer("player", "suppressor")
    local slot = container.slots.suppressor
    local layout = client.getLayout("player", "suppressor")
    assert(layout, "The suppression has no secure layout.")
    client.setAuraPresent(slot, false)
    client.refresh()
    local glow = client.getSpellGlow()
    assert(glow, "A missing buff has no glow during combat.")
    client.setAuraPresent(slot, true)
    client.refresh()
    assert(not client.getSpellGlow())
    local updates = layout.layoutChangeCount or 0
    local filters = layout.filterChangeCount
    client.refresh()
    assert((layout.layoutChangeCount or 0) == updates and layout.filterChangeCount == filters)
    UIParent:SetSize(2400, 1200)
    client.refresh()
    assert(layout.groups.suppressor.layout.elementWidth == 4800)
    assert(layout.layoutChangeCount == updates + 1)
    client.actions[1].spellID = overrideID
    client.refresh()
    assert(layout.groups.suppressor.candidateFilters.includeSpellIDs[overrideID])
    assert(not layout.groups.suppressor.candidateFilters.includeSpellIDs[spellID])
    assert(layout.filterChangeCount == filters + 1)
    client.targetFriendly = true
    local refreshes = layout.refreshCount
    client.event("PLAYER_TARGET_CHANGED")
    assert(container.unit == "target" and layout.unit == "target" and layout.refreshCount > refreshes)
    assert(not layout.layoutQueryCount)
    client.setAuraPresent(slot, false)
    client.refresh()
    assert(client.getSpellGlow() == glow)
end)

for _, dispelType in ipairs({ "Curse", "Poison" }) do
    scenario("Spell cleansing and buff highlights with " .. dispelType, function(client)
        local button = client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.helpfulSpells[spellID], client.helpfulSpells[overrideID] = true, true
        client.startRules({
            {
                key = "buff", action = { anySpell = true }, visual = "highlight",
                condition = { mechanic = "aura", unit = "buff-target", filter = "HELPFUL", includeActionSpellID = true },
            },
            {
                key = "cleanse", action = action, visual = "glow", requireUsable = true,
                condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelType = dispelType },
            },
        })
        client.refresh()
        local frames = #client.frames

        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for _, target in ipairs({
                { exists = false, friendly = false, unit = "player" },
                { exists = true, friendly = true, unit = "target" },
                { exists = true, friendly = false, unit = "player" },
            }) do
                client.targetExists, client.targetFriendly = target.exists, target.friendly
                client.event("PLAYER_TARGET_CHANGED")
                local buff = client.getContainer(target.unit, "buff")
                local cleanse = client.getContainer(target.unit, "cleanse")
                assert(buff and cleanse and buff ~= cleanse)
                local buffSlot, cleanseSlot = buff.slots.buff, cleanse.slots.cleanse
                assert(buffSlot.filter == "HELPFUL" and buffSlot.candidateFilters.includeSpellIDs[spellID])
                assert(cleanseSlot.filter == "HARMFUL" and cleanseSlot.candidateFilters.includeDispelTypes[dispelType])
                assert(not cleanseSlot.candidateFilters.includeSpellIDs)
                assert(not cleanseSlot.candidateFilters.isFromPlayerOrPlayerPet)

                for _, buffPresent in ipairs({ false, true }) do
                    client.setAuraPresent(buffSlot, buffPresent)
                    for _, debuffPresent in ipairs({ false, true }) do
                        client.setAuraPresent(cleanseSlot, debuffPresent)
                        for _, usable in ipairs({ false, true }) do
                            client.actions[1].isUsable = usable
                            client.event("ACTION_USABLE_CHANGED")
                            client.refresh()
                            assert(client.alpha(buffSlot.texture) == (buffPresent and 1 or 0), "Cleansing changed the buff highlight.")
                            assert((client.getSpellGlow() ~= nil) == (debuffPresent and usable), "The cleansing glow has an incorrect condition.")
                            assert(buffSlot.enabled and cleanseSlot.enabled)
                        end
                    end
                end
            end
        end
        assert(#client.frames == frames, "The condition changes replaced the frames.")
        client.baseSpellIDs[overrideID] = spellID
        client.actions[1].spellID = overrideID
        client.refresh()
        local buff = client.getContainer("player", "buff")
        local cleanse = client.getContainer("player", "cleanse")
        assert(buff.slots.buff.candidateFilters.includeSpellIDs[overrideID] and cleanse.enabled)
        assert(client.getSpellGlow())
        button.visible = false
        client.refresh()
        assert(client.alpha(buff) == 0 and not client.getSpellGlow())
        button.visible = true
        client.actions[1].spellID = auraID
        client.refresh()
        assert(not cleanse.enabled and not client.getSpellGlow(), "An unrelated spell kept the cleansing glow.")
    end)
end

suite.finish("Composition")
