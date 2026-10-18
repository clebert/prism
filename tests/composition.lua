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
    slot.frame.visible = false
    local glow = client.getSpellGlow()
    local highlight = client.getHighlight()
    assert(glow and highlight and glow.ProcLoop:IsPlaying())
    assert(glow.parent.booleanInput, "The glow has no separate usability condition.")
    assert(slot.candidateFilters.includeSpellIDs[auraID] and not slot.candidateFilters.includeSpellIDs[spellID])
    local mask = glow.ProcLoopFlipbook.masks[1]
    assert(mask.parent == slot.frame and mask.allPoints == glow)
    assert(mask.texture == "Interface\\CharacterFrame\\TempPortraitAlphaMask")
    assert(mask.horizontalWrap == "CLAMPTOBLACKADDITIVE" and mask.verticalWrap == "CLAMPTOBLACKADDITIVE")
    for _, coordinate in ipairs(mask.texCoords) do
        assert(coordinate > 1, "The mask does not sample outside the texture.")
    end
    for _, key in ipairs({ "ProcStartFlipbook", "ProcLoopFlipbook", "ProcAltGlow" }) do
        assert(#glow[key].masks == 1 and glow[key].masks[1] == mask)
    end

    for _, happiness in ipairs({ 1, 2, 3 }) do
        for _, usable in ipairs({ false, true }) do
            for _, inCombat in ipairs({ false, true }) do
                client.petHappiness, client.actions[1].isUsable, client.combatUnits.pet = happiness, usable, inCombat
                client.event("ACTION_USABLE_CHANGED")
                for _, activeAura in ipairs({ false, true }) do
                    slot.frame.visible = activeAura
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
    slot.frame.visible = false
    client.event("PLAYER_REGEN_DISABLED")
    client.refresh()
    assert(client.getSpellGlow() == glow, "Player combat changed the pet combat condition.")
    local frames = #client.frames
    slot.frame.visible = true
    assert(not client.getSpellGlow() and client.alpha(glow) == 1)
    assert(client.alpha(slot.texture) == 1)
    slot.frame.visible = false
    assert(client.getSpellGlow() == glow and #client.frames == frames, "Aura removal required a refresh.")
    client.combatUnits.pet = true
    client.refresh()
    assert(not client.getSpellGlow() and not glow.ProcLoop:IsPlaying())
    slot.frame.visible = true
    assert(client.alpha(slot.texture) == 1, "Pet combat hid the independent aura highlight.")
    client.combatUnits.player = false
    client.event("PLAYER_REGEN_ENABLED")
    client.refresh()
    assert(not client.getSpellGlow())
    slot.frame.visible, client.combatUnits.pet = false, false
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

suite.finish("Composition")
