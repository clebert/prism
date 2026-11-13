local suite = dofile("tests/scenarios.lua")
local scenario = suite.scenario

-- Synthetic IDs separate action matching from aura matching.
local spellID, auraID, rankID, overrideID = 999101, 999102, 999103, 999104
local action = { spellIDs = { [spellID] = true, [rankID] = true } }

local function assertIDs(actual, expected)
    assert(type(actual) == "table", "The aura filter has no spell ID set.")
    for id in pairs(expected) do
        assert(actual[id], "The filter excludes a declared ID.")
    end
    for id in pairs(actual) do
        assert(expected[id], "The filter includes an unrelated ID.")
    end
end

scenario("Spell selectors and aura identity", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID, isUsable = false }
    client.startRules({
        {
            key = "self", action = { anySpell = true }, visual = "highlight",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", includeActionSpellID = true },
        },
        {
            key = "own", action = action, visual = "highlight",
            condition = {
                mechanic = "aura", unit = "target", filter = "HARMFUL|PLAYER", ownAura = true,
                auraSpellIDs = { [auraID] = true }, includeActionSpellID = true,
            },
        },
        {
            key = "shared", action = action, visual = "highlight",
            condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true } },
        },
    })
    client.refresh()
    local self = client.getContainer("player", "self")
    local own = client.getContainer("target", "own")
    local shared = client.getContainer("target", "shared")
    assert(own ~= shared and own.slots.own.filter == "HARMFUL|PLAYER")
    assert(own.slots.own.candidateFilters.isFromPlayerOrPlayerPet == true)
    assert(shared.slots.shared.filter == "HARMFUL" and shared.slots.shared.candidateFilters.isFromPlayerOrPlayerPet == nil)
    assertIDs(shared.slots.shared.candidateFilters.includeSpellIDs, { [auraID] = true })
    assert(client.alpha(own) == 1, "The aura highlight requires a usable action.")
    client.targetFriendly = true
    client.event("PLAYER_TARGET_CHANGED")
    assert(self.unit == "player" and client.alpha(self) == 1, "Target selection or usability changed the player-only aura.")
    client.baseSpellIDs[overrideID] = rankID

    for _, id in ipairs({ rankID, overrideID, spellID }) do
        client.actions[1].spellID = id
        client.refresh()
        assertIDs(self.slots.self.candidateFilters.includeSpellIDs, { [id] = true })
        assertIDs(own.slots.own.candidateFilters.includeSpellIDs, { [auraID] = true, [id] = true })
        assertIDs(shared.slots.shared.candidateFilters.includeSpellIDs, { [auraID] = true })
        local changes, slotChanges, frames = own.filterChangeCount, own.slotChangeCount, #client.frames
        client.refresh()
        assert(own.filterChangeCount == changes and own.slotChangeCount == slotChanges and #client.frames == frames)
    end

    client.actions[1].spellID = auraID
    client.refresh()
    assert(not own.enabled and not own.slots.own.enabled and client.alpha(own) == 0)
    assert(not shared.enabled, "An aura ID matched the action selector.")
    button.action = 13
    client.actions[13] = { spellID = spellID }
    client.refresh()
    assert(own.enabled and shared.enabled)
    client.actions[13] = nil
    client.refresh()
    assert(not self.enabled and not own.enabled and not shared.enabled)
end)

for _, mechanic in ipairs({ "aura", "aura-stacks" }) do
    scenario(mechanic .. " buff target selection", function(client)
        client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.helpfulSpells[spellID], client.helpfulSpells[rankID] = true, true
        client.selfBuffSpells[rankID] = true
        client.targetFriendly = true
        client.startRules({
            {
                key = "buff", action = action, visual = "highlight",
                condition = {
                    mechanic = mechanic, unit = "buff-target", filter = "HELPFUL|PLAYER", ownAura = true,
                    auraSpellIDs = { [auraID] = true }, includeActionSpellID = true,
                    applications = mechanic == "aura-stacks" and 3 or nil,
                },
            },
        })
        client.refresh()
        local container = client.getContainer("target", "buff")
        assert(container, "The buff target ignored the action spell during initialization.")
        local slot = container.slots.buff
        assert(slot.filter == "HELPFUL|PLAYER" and slot.candidateFilters.isFromPlayerOrPlayerPet)
        local changes, frames = container.filterChangeCount, #client.frames
        client.refresh()
        assert(container.filterChangeCount == changes)
        client.actions[1].spellID = rankID
        client.refresh()
        assert(container.unit == "player", "The self-only buff checks another friendly unit.")
        assertIDs(slot.candidateFilters.includeSpellIDs, { [rankID] = true, [auraID] = true })
        client.actions[1].spellID = spellID
        client.refresh()
        assert(container.unit == "target" and #client.frames == frames)
        assertIDs(slot.candidateFilters.includeSpellIDs, { [spellID] = true, [auraID] = true })
        client.helpfulSpells[spellID] = false
        client.refresh()
        assert(container.unit == "player", "A non-helpful spell selected another friendly unit.")
    end)
end

for _, context in ipairs({
    { visual = "red-blink", requireUsable = true },
    { visual = "glow", requireUsable = true, comboPointsBelow = 3 },
    { visual = "glow", requireUsable = false, comboPointsBelow = 3 },
}) do
    scenario("Secure aura lifecycle with " .. context.visual .. " and usability " .. tostring(context.requireUsable), function(client)
        local button = client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.startRules({
            {
                key = "warning", action = action, visual = context.visual, requireUsable = context.requireUsable,
                condition = {
                    mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true },
                    comboPointsBelow = context.comboPointsBelow,
                },
            },
        })
        client.refresh()
        local container = client.getContainer("target", "warning")
        local slot = container.slots.warning
        assert(container.template == "CustomAuraContainerTemplate" and slot.filter == "HARMFUL")
        local changes, slotChanges, frames = container.filterChangeCount, container.slotChangeCount, #client.frames
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED", "PLAYER_TARGET_CHANGED" }) do
            local refreshes = container.refreshCount
            client.event(event)
            assert(container.refreshCount > refreshes)
            for _, count in ipairs({
                { points = 0, below = true }, { points = 2, below = true },
                { points = 3, below = false }, { points = 4, below = false },
                { points = { secret = true }, below = false }, { points = 0, below = true },
            }) do
                client.comboPoints = count.points
                client.event("PLAYER_TARGET_CHANGED")
                for _, usable in ipairs({ false, true }) do
                    client.actions[1].isUsable = usable
                    client.event("ACTION_USABLE_CHANGED")
                    local allowed = (not context.comboPointsBelow or count.below) and (not context.requireUsable or usable)
                    assert(client.alpha(container) == (allowed and 1 or 0), "The aura ignored its combo-point limit or usability.")
                    for _, present in ipairs({ false, true }) do
                        client.setAuraPresent(slot, present)
                        for _, cooldown in ipairs({ false, true, false }) do
                            client.actions[1].cooldown = cooldown
                            client.actions[1].globalCooldown = true
                            client.refresh()
                            if context.visual == "glow" then
                                assert((client.getSpellGlow() ~= nil) == (allowed and present and not cooldown), "The aura glow ignored its cooldown or checked the global cooldown.")
                            else
                                assert(client.alpha(container) == ((allowed and not cooldown) and 1 or 0), "The red warning ignored its cooldown or checked the global cooldown.")
                            end
                        end
                    end
                    assert(slot.enabled and container.enabled, "A visual condition disabled the secure slot.")
                    assert(container.filterChangeCount == changes and container.slotChangeCount == slotChanges)
                end
            end
        end
        assert(#client.frames == frames, "A condition change replaced the aura frames.")
        button.visible = false
        client.refresh()
        assert(client.alpha(container) == 0)
        button.visible = true
        client.refresh()
        assert(client.alpha(container) == 1)
        local second = client.addActionButton("ActionButton2", 2)
        second.left = 60
        client.actions[1], client.actions[2] = nil, { spellID = spellID }
        client.refresh()
        local moved = client.getContainer("target", "warning")
        assert(moved ~= container and moved.point[4] == 60 and client.alpha(moved) == 1)
        assert(not slot.enabled and not container.enabled)
    end)
end

for _, mechanic in ipairs({ "alive", "full-health" }) do
    scenario(mechanic .. " pet lifecycle", function(client)
        local button = client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID, isUsable = false }
        client.petExists, client.fullHealthUnits.pet = true, true
        client.startRules({
            { key = "pet", action = action, condition = { mechanic = mechanic, unit = "pet" }, visual = "highlight" },
        })
        client.refresh()
        local texture = client.getHighlight()
        assert(texture and client.alpha(texture) == 1, "Usability changed the pet highlight.")
        for _, fullHealth in ipairs({ false, true }) do
            client.fullHealthUnits.pet = fullHealth
            client.refresh()
            assert(client.alpha(texture) == ((mechanic == "alive" or fullHealth) and 1 or 0))
        end
        local queries = client.healthQueryCount.pet
        client.petExists = false
        client.refresh()
        assert(client.alpha(texture) == 0 and client.healthQueryCount.pet == queries)
        client.petExists, client.deadUnits.pet = true, true
        client.refresh()
        assert(client.alpha(texture) == 0 and client.healthQueryCount.pet == queries)
        client.deadUnits.pet, client.fullHealthUnits.pet = false, false
        client.refresh()
        assert(client.alpha(texture) == (mechanic == "alive" and 1 or 0))
        client.fullHealthUnits.pet = true
        client.refresh()
        assert(client.alpha(texture) == 1)
        if mechanic == "alive" then
            assert(client.healthQueryCount.pet == nil, "The alive mechanic queried health.")
        end
        assert(client.healthQueryCount.player == nil and client.healthQueryCount.target == nil)
        button.action = 13
        client.refresh()
        assert(client.alpha(texture) == 0)
    end)
end

scenario("Item use spells and aura identity", function(client)
    client.addActionButton("ActionButton1", 1)
    local itemID, unknownID, noSpellID = 999201, 999202, 999203
    client.actions[1] = { itemID = itemID, spellID = auraID, isUsable = false }
    client.startRules({
        {
            key = "item", action = { anyItem = true }, visual = "highlight", suppressGlow = "item-glow",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", includeItemSpellID = true },
        },
        {
            key = "item-glow", action = { anyItem = true }, visual = "glow",
            condition = { mechanic = "usable" },
        },
        {
            key = "exception", action = { itemIDs = { [itemID] = true } }, visual = "highlight",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [overrideID] = true } },
        },
        {
            key = "spell", action = { anySpell = true }, visual = "highlight",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", includeActionSpellID = true },
        },
    })
    client.refresh()
    local container = client.getContainer("player", "item")
    local layout = client.getLayout("player", "item")
    local exception = client.getContainer("player", "exception")
    local function assertItemIDs(expected)
        assertIDs(container.slots.item.candidateFilters.includeSpellIDs, expected)
        assertIDs(layout.groups.item.candidateFilters.includeSpellIDs, expected)
    end
    assert(container and container.slots.item.filter == "HELPFUL")
    assertItemIDs({})
    assert(client.itemLoadRequests[itemID], "Missing item data did not trigger a load request.")
    assert(not client.getContainer("player", "spell"), "An item matched a spell selector.")
    local frames = #client.frames
    client.items[itemID] = { classID = 0, subClassID = 7, spellID = spellID }
    client.refresh()
    assertItemIDs({ [spellID] = true })
    assertIDs(exception.slots.exception.candidateFilters.includeSpellIDs, { [overrideID] = true })
    assert(client.alpha(container) == 1, "The item buff requires a usable action.")
    assert(#client.frames == frames, "Item data created duplicate aura frames.")
    local changes, slotChanges = container.filterChangeCount, container.slotChangeCount
    client.items[itemID] = nil
    client.targetFriendly = true
    client.event("PLAYER_TARGET_CHANGED")
    assert(container.unit == "player")
    assertItemIDs({ [spellID] = true })
    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        client.refresh()
        assert(container.filterChangeCount == changes and container.slotChangeCount == slotChanges)
        assert(layout.filterChangeCount == changes)
    end
    client.items[itemID] = { spellID = rankID }
    client.refresh()
    assertItemIDs({ [rankID] = true })
    assert(container.filterChangeCount == changes + 1)
    assertIDs(exception.slots.exception.candidateFilters.includeSpellIDs, { [overrideID] = true })
    client.actions[1] = { itemID = unknownID }
    client.refresh()
    assertItemIDs({})
    assert(not exception.enabled, "An unrelated item kept an explicit aura mapping.")
    client.items[unknownID] = { classID = 0, spellID = auraID }
    client.refresh()
    assertItemIDs({ [auraID] = true })
    client.actions[1] = { itemID = noSpellID }
    for _, item in ipairs({ {}, { spellID = 0 }, { spellID = -1 } }) do
        client.items[noSpellID] = item
        client.refresh()
        assertItemIDs({})
    end
    assert(not client.itemLoadRequests[noSpellID], "An item without a use spell triggered a data request.")
    client.actions[1] = { spellID = spellID }
    client.refresh()
    assert(not container.enabled and not container.slots.item.enabled)
    assert(client.getContainer("player", "spell").enabled)
    client.actions[1] = { itemID = unknownID }
    client.refresh()
    assert(container.enabled and container.slots.item.enabled)
    assertItemIDs({ [auraID] = true })
    client.setAuraPresent(container.slots.item, false)
    for _, count in ipairs({ 1, 0, 1 }) do
        client.itemCounts[unknownID] = count
        client.refresh()
        assert((client.getSpellGlow() ~= nil) == (count > 0), "A plain item glow ignored the carried count.")
    end
    client.setAuraPresent(container.slots.item, true)
    client.addActionButton("ActionButton2", 2)
    client.actions[2] = { itemID = unknownID }
    client.refresh()
    local second = client.getContainer("player", "item")
    assert(second ~= container)
    assertIDs(second.slots.item.candidateFilters.includeSpellIDs, { [auraID] = true })
    assertIDs(client.getLayout("player", "item").groups.item.candidateFilters.includeSpellIDs, { [auraID] = true })

    local firstSpell = client.getContainer("player", "spell")
    local macro = { actionType = "macro", subType = "item", actionID = 0, spellID = spellID, isUsable = false }
    local secondMacro = { actionType = "macro", subType = "item", actionID = 1, spellID = spellID }
    client.actions[1], client.actions[2] = macro, secondMacro
    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        macro.subType, macro.actionID, macro.spellID = "item", 0, spellID
        secondMacro.actionID, secondMacro.spellID = 1, spellID
        client.refresh()
        local secondSpell = client.getContainer("player", "spell")
        assert(secondSpell ~= firstSpell and firstSpell.enabled and secondSpell.enabled, "A positive macro ID blocked its resolved spell.")
        assert(not container.enabled and not second.enabled and not exception.enabled, "A raw macro ID became an item ID.")
        assert(not client.itemLoadRequests[0] and not client.itemLoadRequests[1], "A raw macro ID triggered an item load request.")
        assertIDs(firstSpell.slots.spell.candidateFilters.includeSpellIDs, { [spellID] = true })
        assertIDs(secondSpell.slots.spell.candidateFilters.includeSpellIDs, { [spellID] = true })
        macro.actionID, macro.spellID = itemID, rankID
        secondMacro.actionID, secondMacro.spellID = unknownID, auraID
        client.refresh()
        assert(not container.enabled and not second.enabled and not exception.enabled, "A macro ID collision matched an item selector.")
        assertIDs(firstSpell.slots.spell.candidateFilters.includeSpellIDs, { [rankID] = true })
        assertIDs(secondSpell.slots.spell.candidateFilters.includeSpellIDs, { [auraID] = true })
        macro.subType, macro.spellID = "spell", spellID
        client.refresh()
        assert(firstSpell.enabled and not container.enabled and not exception.enabled)
        macro.subType, macro.spellID = nil, 0
        client.refresh()
        assert(not firstSpell.enabled and not container.enabled and not exception.enabled, "An unresolved macro ID became an item ID.")
        assert(secondSpell.enabled, "An unresolved macro changed another button's rule selection.")
    end
end)

scenario("Item categories, delayed data, and heal targets", function(client)
    client.addActionButton("ActionButton1", 1)
    local itemID, unknownID = 999201, 999202
    local category = { itemClassID = 0, itemSubClassID = 7 }
    client.items[itemID] = { classID = 0, subClassID = 7 }
    client.actions[1] = { itemID = itemID, isUsable = false }
    client.fullHealthUnits.player = true
    client.startRules({
        { key = "health", action = category, condition = { mechanic = "full-health", unit = "heal-target" }, visual = "highlight" },
        {
            key = "poison", action = category, visual = "red-blink", requireUsable = true,
            condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelTypes = { Poison = true } },
        },
    })
    client.refresh()
    local health = client.healthTexture
    local poison = client.getContainer("player", "poison")
    assert(client.alpha(health) == 1 and client.alpha(poison) == 0)
    assert(poison.slots.poison.candidateFilters.includeDispelTypes.Poison)
    client.items[itemID] = nil
    client.refresh()
    assert(client.alpha(health) == 1, "Missing data lost the cached category.")
    client.actions[1] = { itemID = unknownID }
    client.refresh()
    assert(client.alpha(health) == 0 and not poison.enabled, "Another item inherited the cached category.")
    for _, categoryData in ipairs({ { classID = 0, subClassID = 0 }, { classID = 1, subClassID = 7 } }) do
        client.items[unknownID] = categoryData
        client.refresh()
        assert(client.alpha(health) == 0 and not poison.enabled)
    end
    client.items[unknownID] = { classID = 0, subClassID = 7 }
    client.refresh()
    assert(client.alpha(health) == 1 and poison.enabled and client.alpha(poison) == 1)

    for _, target in ipairs({
        { exists = false, friendly = true, dead = false, full = true, unit = "player", alpha = 1 },
        { exists = true, friendly = false, dead = false, full = true, unit = "player", alpha = 1 },
        { exists = true, friendly = true, dead = false, full = false, unit = "target", alpha = 0 },
        { exists = true, friendly = true, dead = true, full = true, unit = "target", alpha = 0 },
        { exists = true, friendly = true, dead = false, full = true, unit = "target", alpha = 1 },
    }) do
        client.targetExists, client.targetFriendly = target.exists, target.friendly
        client.deadUnits.target, client.fullHealthUnits.target = target.dead, target.full
        local queries = client.healthQueryCount.target
        client.event("PLAYER_TARGET_CHANGED")
        assert(poison.unit == target.unit and client.alpha(health) == target.alpha)
        if target.alpha == 1 then
            assert(health.alpha.healthUnit == target.unit)
        end
        if not target.exists or target.dead then
            assert(client.healthQueryCount.target == queries)
        end
    end
    client.targetFriendly, client.fullHealthUnits.player = false, false
    client.refresh()
    assert(client.alpha(health) == 0)
end)

for _, mechanic in ipairs({ "full-health", "full-mana" }) do
    scenario(mechanic .. " player-only item highlight", function(client)
        local button = client.addActionButton("ActionButton1", 1)
        local itemID = 999203
        local fullUnits = mechanic == "full-health" and client.fullHealthUnits or client.fullManaUnits
        local queryCount = mechanic == "full-health" and client.healthQueryCount or client.manaQueryCount
        client.actions[1] = { itemID = itemID, isUsable = false }
        client.startRules({
            {
                key = "resource", action = { itemIDs = { [itemID] = true } }, visual = "highlight",
                condition = { mechanic = mechanic, unit = "player" },
            },
        })
        client.refresh()
        local highlight = client.getHighlight()
        assert(highlight and client.alpha(highlight) == 0)
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for _, full in ipairs({ false, true }) do
                fullUnits.player, fullUnits.target = full, not full
                for _, target in ipairs({
                    { exists = true, friendly = true },
                    { exists = true, friendly = false },
                    { exists = false, friendly = false },
                }) do
                    client.targetExists, client.targetFriendly = target.exists, target.friendly
                    client.event("PLAYER_TARGET_CHANGED")
                    assert(client.alpha(highlight) == (full and 1 or 0), "The item checked the target or action usability.")
                    assert(queryCount.target == nil and queryCount.pet == nil)
                end
            end
        end
        local queries = queryCount.player
        client.deadUnits.player = true
        client.refresh()
        assert(client.alpha(highlight) == 0 and queryCount.player == queries)
        client.deadUnits.player = false
        client.refresh()
        assert(client.alpha(highlight) == 1)
        client.actions[1].itemID = itemID + 1
        client.refresh()
        assert(client.alpha(highlight) == 0, "An unrelated item kept the highlight.")
        client.actions[1].itemID = itemID
        client.refresh()
        assert(client.alpha(highlight) == 1)
        button.action = 13
        client.refresh()
        assert(client.alpha(highlight) == 0)
    end)
end

for _, condition in ipairs({
    { percent = 25, requireUsable = true },
    { percent = 37, requireUsable = false },
    { percent = 100, requireUsable = true },
}) do
    scenario("Player low-health threshold " .. condition.percent .. " with usability " .. tostring(condition.requireUsable), function(client)
        local button = client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.maxHealthUnits.player = 100
        client.healthUnits.player = { secret = true, value = 1 }
        client.startRules({
            {
                key = "low", action = action, visual = "glow", requireUsable = condition.requireUsable,
                condition = { mechanic = "low-health", percent = condition.percent },
            },
        })
        client.refresh()
        local glow = assert(client.getSpellGlow(), "The low-health condition has no glow.")
        local frames, curves = #client.frames, #client.curves
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for _, maximum in ipairs({ 100, 103, 137, 1 }) do
                client.maxHealthUnits.player = maximum
                for health = 1, maximum do
                    client.healthUnits.player.value = health
                    for _, usable in ipairs({ false, true }) do
                        client.actions[1].isUsable = usable
                        client.event("ACTION_USABLE_CHANGED")
                        local low = health * 100 <= maximum * condition.percent
                        local expected = low and (not condition.requireUsable or usable)
                        assert((client.getSpellGlow() ~= nil) == expected, "The health threshold or usability has an incorrect boundary.")
                        assert(client.healthTexture.alpha.secret, "The health comparison bypassed the client curve.")
                        assert(client.healthTexture.alpha.healthUnit == "player", "The health check selected another unit.")
                    end
                end
            end
        end
        assert(#client.frames == frames and #client.curves == curves, "Health changes replaced frames or curves.")
        local queries = client.healthQueryCount.player
        for _, maximum in ipairs({ 0, -1, { secret = true } }) do
            client.maxHealthUnits.player = maximum
            client.refresh()
            assert(not client.getSpellGlow() and client.healthQueryCount.player == queries, "Invalid maximum health reached the client curve.")
        end
        client.maxHealthUnits.player = 100
        client.healthUnits.player.value = 1
        client.targetExists, client.targetFriendly = false, true
        client.event("PLAYER_TARGET_CHANGED")
        assert(client.getSpellGlow() == glow and not client.healthQueryCount.target, "Target selection changed the player health check.")
        queries = client.healthMaxQueryCount.player
        client.deadUnits.player = true
        client.healthUnits.player.value = 0
        client.refresh()
        assert(not client.getSpellGlow() and client.healthMaxQueryCount.player == queries, "The health check includes a dead player.")
        client.deadUnits.player = false
        client.healthUnits.player.value = 1
        client.refresh()
        assert(client.getSpellGlow() == glow)
        button.visible = false
        client.refresh()
        assert(not client.getSpellGlow() and not glow.ProcLoop:IsPlaying())
        button.visible = true
        client.refresh()
        assert(client.getSpellGlow() == glow and glow.ProcLoop:IsPlaying())
        button.action = 13
        client.actions[13] = { spellID = rankID }
        client.refresh()
        assert(client.getSpellGlow() == glow and #client.frames == frames)
        client.actions[13] = nil
        client.refresh()
        assert(not client.getSpellGlow() and not glow.ProcLoop:IsPlaying())
    end)
end

for _, condition in ipairs({
    { mechanic = "power-overflow", powerType = Enum.PowerType.Mana, amount = 17 },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 25, excludeFull = false },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Mana, amount = 17, excludeFull = true },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 25, excludeFull = true },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 1, excludeFull = true },
}) do
    scenario("Power overflow " .. condition.powerType .. ", amount " .. condition.amount .. ", exclude full " .. tostring(condition.excludeFull), function(client)
        local button = client.addActionButton("ActionButton1", 1)
        local powerType, amount = condition.powerType, condition.amount
        client.actions[1] = { spellID = spellID }
        client.maxPowers[powerType], client.powers[powerType] = 100, { secret = true, value = 0 }
        client.startRules({
            {
                key = "full", action = action, visual = "highlight",
                condition = { mechanic = "full-power", powerType = powerType },
            },
            {
                key = "overflow", action = action, visual = "red-blink", requireUsable = true,
                condition = condition,
            },
        })
        client.refresh()
        local warning = client.getHighlight()
        assert(warning and client.alpha(warning) == 0)
        local highlight
        for _, frame in ipairs(client.frames) do
            if frame.frameType == "Texture" and frame.texture == warning.texture and not frame.color then
                highlight = frame
            end
        end
        assert(highlight and client.alpha(highlight) == 0)
        local frames = #client.frames
        local curves = #client.curves
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for _, maximum in ipairs({ 100, 120, amount, math.max(1, amount - 5) }) do
                client.maxPowers[powerType] = maximum
                for power = 0, maximum do
                    client.powers[powerType].value = power
                    for _, usable in ipairs({ false, true }) do
                        client.actions[1].isUsable = usable
                        client.event("ACTION_USABLE_CHANGED")
                        local overflows = power + amount > maximum and (not condition.excludeFull or power < maximum)
                        assert(client.alpha(warning) == ((overflows and usable) and 1 or 0), "The warning ignored overflow, full power, or usability.")
                        assert(client.alpha(highlight) == (power == maximum and 1 or 0), "The full-power highlight checked usability or the wrong threshold.")
                        assert(type(highlight.parent.alpha) == "table", "The full-power result bypassed the alpha API.")
                        assert(type(warning.parent.parent.alpha) == "table", "The resource result bypassed the alpha API.")
                        assert(type(warning.parent.booleanInput) == "table", "The warning has no separate usability condition.")
                    end
                end
            end
        end
        assert(#client.frames == frames and #client.curves == curves, "Resource changes replaced frames or curves.")
        local queries = client.powerQueryCount[powerType]
        for _, maximum in ipairs({ 0, { secret = true } }) do
            client.maxPowers[powerType] = maximum
            client.refresh()
            assert(client.alpha(warning) == 0 and client.alpha(highlight) == 0 and client.powerQueryCount[powerType] == queries)
        end
        client.maxPowers[powerType] = 100
        client.powers[powerType].value = 100
        client.targetExists, client.targetFriendly = false, true
        client.event("PLAYER_TARGET_CHANGED")
        local warningAlpha = condition.excludeFull and 0 or 1
        assert(client.alpha(warning) == warningAlpha and client.alpha(highlight) == 1, "Target selection changed the player feedback.")
        queries = client.powerMaxQueryCount[powerType]
        client.deadUnits.player = true
        client.refresh()
        assert(client.alpha(warning) == 0 and client.alpha(highlight) == 0 and client.powerMaxQueryCount[powerType] == queries)
        client.deadUnits.player = false
        client.refresh()
        assert(client.alpha(warning) == warningAlpha and client.alpha(highlight) == 1)
        for _, cooldown in ipairs({ true, false }) do
            client.actions[1].cooldown = cooldown
            client.actions[1].globalCooldown = true
            client.refresh()
            assert(client.alpha(warning) == (cooldown and 0 or warningAlpha), "The red warning ignored its cooldown or checked the global cooldown.")
            assert(client.alpha(highlight) == 1, "The cooldown hid a highlight.")
        end
        button.visible = false
        client.refresh()
        assert(client.alpha(warning) == 0 and client.alpha(highlight) == 0 and not warning.animationGroups[1]:IsPlaying())
        button.visible = true
        client.refresh()
        assert(client.alpha(warning) == warningAlpha and client.alpha(highlight) == 1 and warning.animationGroups[1]:IsPlaying())
        client.actions[1] = nil
        client.refresh()
        assert(client.alpha(warning) == 0 and client.alpha(highlight) == 0 and not warning.animationGroups[1]:IsPlaying())
    end)
end

for _, context in ipairs({
    { powerType = Enum.PowerType.Energy, talentNodeID = 999301, amountPerRank = 2 },
    { powerType = Enum.PowerType.Mana },
}) do
    scenario("Power gain with costs and talent bonuses for " .. context.powerType, function(client)
        client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID, globalCooldown = true }
        client.combatUnits.player = true
        local powerType, amount = context.powerType, 23
        local cost = { type = powerType, cost = 7, requiredAuraID = 0 }
        client.spellPowerCosts[spellID] = {
            { type = 4, cost = 99, requiredAuraID = 0 },
            { type = powerType, cost = 99, requiredAuraID = auraID, hasRequiredAura = false },
            cost,
        }
        client.traitNodes[999301] = { activeRank = 0 }
        client.maxPowers[powerType], client.powers[powerType] = 100, { secret = true, value = 0 }
        client.startRules({
            {
                key = "gain", action = action, visual = "glow", requireUsable = true, requireCombat = true,
                condition = {
                    mechanic = "power-gain", powerType = powerType, amount = amount,
                    talentNodeID = context.talentNodeID, amountPerRank = context.amountPerRank,
                },
            },
        })
        client.refresh()
        local glow = assert(client.getSpellGlow(), "The power gain has no glow.")
        local frames, curves = #client.frames, #client.curves
        for _, maximum in ipairs({ 100, 127, 17 }) do
            client.maxPowers[powerType] = maximum
            for rank = 0, 5 do
                client.traitNodes[999301].activeRank = rank
                for _, powerCost in ipairs({ 0, 7, 24 }) do
                    cost.cost = powerCost
                    for power = 0, maximum do
                        client.powers[powerType].value = power
                        for _, usable in ipairs({ false, true }) do
                            client.actions[1].isUsable = usable
                            client.refresh()
                            local gain = amount + rank * (context.amountPerRank or 0) - powerCost
                            local expected = usable and power + gain <= maximum
                            assert((client.getSpellGlow() ~= nil) == expected, "The power gain ignored its cost, talent rank, or maximum.")
                        end
                    end
                end
            end
        end
        assert(#client.frames == frames and #client.curves == curves, "Power changes replaced frames or curves.")
        client.maxPowers[powerType], client.powers[powerType].value = 100, 0
        client.traitNodes[999301].activeRank, cost.cost = 0, 0
        client.actions[1].isUsable = true
        for _, cooldown in ipairs({ true, false }) do
            client.actions[1].cooldown = cooldown
            client.refresh()
            assert((client.getSpellGlow() ~= nil) == not cooldown)
        end
        client.event("PLAYER_REGEN_ENABLED")
        assert(not client.getSpellGlow(), "The combat restriction kept a glow after combat.")
        client.event("PLAYER_REGEN_DISABLED")
        assert(client.getSpellGlow() == glow, "The combat event did not refresh the glow.")
        client.deadUnits.player = true
        client.refresh()
        assert(not client.getSpellGlow(), "The power gain includes a dead player.")
        client.deadUnits.player = false
        for _, maximum in ipairs({ 0, -1, { secret = true } }) do
            client.maxPowers[powerType] = maximum
            client.refresh()
            assert(not client.getSpellGlow(), "An invalid maximum power activated the gain.")
        end
        client.maxPowers[powerType] = 100
        cost.cost = { secret = true }
        client.refresh()
        assert(not client.getSpellGlow(), "A restricted cost activated the gain.")
        cost.cost = 0
        client.spellPowerCosts[spellID] = nil
        client.refresh()
        assert(not client.getSpellGlow(), "Missing spell data activated the gain.")
        client.cachedSpells[spellID] = true
        client.refresh()
        assert(client.getSpellGlow() == glow, "A cached spell without resource costs lost its gain.")
        client.spellPowerCosts[spellID] = {}
        client.refresh()
        assert(client.getSpellGlow() == glow, "A spell without resource costs lost its gain.")
        if context.talentNodeID then
            for change = 1, 3 do
                client.stagedTraitNodes = { {}, {}, {} }
                client.stagedTraitNodes[change] = { context.talentNodeID }
                client.refresh()
                assert(not client.getSpellGlow(), "A staged talent change changed the gain estimate.")
            end
            client.stagedTraitNodes = { { 999302 }, {}, {} }
            client.refresh()
            assert(client.getSpellGlow() == glow, "An unrelated staged talent disabled the gain.")
            client.activeConfigID = nil
            client.refresh()
            assert(not client.getSpellGlow(), "Missing talent data activated the gain.")
            client.activeConfigID = 2
            client.traitNodes[999301] = nil
            client.refresh()
            assert(not client.getSpellGlow(), "A missing talent node activated the gain.")
            client.traitNodes[999301] = { activeRank = 5 }
            client.powers[powerType].value = 70
            client.refresh()
            assert(not client.getSpellGlow(), "A talent configuration change kept a stale energy limit.")
            client.traitNodes[999301].activeRank = 0
            client.refresh()
            assert(client.getSpellGlow() == glow)
        end
    end)
end

for _, condition in ipairs({
    { points = 2, requireUsable = false },
    { points = 5, requireUsable = true },
    { numberOnly = true },
}) do
    local variant = condition.numberOnly and "a number-only rule" or "usability " .. tostring(condition.requireUsable)
    scenario("Target-bound combo points with " .. variant, function(client)
        local button = client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.startRules({
            {
                key = "finisher", action = action, visual = condition.numberOnly and "none" or "glow",
                requireUsable = condition.requireUsable,
                condition = { mechanic = "combo-points", points = condition.points },
            },
        })
        local shownPoints = condition.points or 3
        client.comboPoints = shownPoints
        local left = button.left
        button.left = nil
        client.refresh()
        button.left = left
        client.refresh()
        local text, unusableText = client.getComboPointTexts()
        assert(text and unusableText and text.parent == unusableText.parent, "The finisher has no combo-point numbers.")
        for _, number in ipairs({ text, unusableText }) do
            assert(number.point[1] == "CENTER" and number.template == "SystemFont_OutlineThick_Huge2", "The number is not centered and outlined.")
        end
        assert(text.textColor[1] == 0 and text.textColor[2] == 1 and text.textColor[3] == 0, "The usable combo-point number is not green.")
        assert(unusableText.textColor[1] == 1 and unusableText.textColor[2] == 0 and unusableText.textColor[3] == 0, "The unusable combo-point number is not red.")
        assert(#text.parent.textures == 0, "A background texture obscures the finisher icon.")
        for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
            client.event(event)
            for points = 0, 6 do
                client.comboPoints = points
                for _, usable in ipairs({ false, true }) do
                    client.actions[1].isUsable = usable
                    for _, cooldown in ipairs({ false, true }) do
                        client.actions[1].cooldown = cooldown
                        client.actions[1].globalCooldown = true
                        client.event("ACTION_USABLE_CHANGED")
                        assert((client.getSpellGlow() ~= nil) == (points == condition.points and (not condition.requireUsable or usable) and not cooldown), "The glow ignored the count, usability, or cooldown.")
                        local visible = points > 0 and not cooldown
                        assert(client.alpha(text) == (visible and usable and 1 or 0), "The green number ignored combo points, usability, or the spell cooldown.")
                        assert(client.alpha(unusableText) == (visible and not usable and 1 or 0), "The red number ignored combo points, usability, or the spell cooldown.")
                        if visible then
                            assert(text.text == tostring(points) and unusableText.text == text.text, "The number does not show the current combo points.")
                        end
                    end
                end
            end
        end
        client.actions[1].cooldown = false
        client.comboPoints = shownPoints
        client.refresh()
        local glow = client.getSpellGlow()
        local function isGlowing()
            return glow ~= nil and glow.ProcLoop:IsPlaying()
        end
        assert(isGlowing() == not condition.numberOnly, "The glow does not follow the rule visual.")
        local frames = #client.frames
        for _, points in ipairs({ 0, shownPoints, { secret = true }, shownPoints }) do
            client.comboPoints = points
            client.event("PLAYER_TARGET_CHANGED")
            assert((client.getSpellGlow() ~= nil) == (points == condition.points), "A target change kept stale combo points.")
            assert(client.alpha(text) == (points == shownPoints and 1 or 0), "The number kept stale or restricted combo points.")
        end
        assert(#client.frames == frames and client.getSpellGlow() == glow)
        for _, usable in ipairs({ false, true }) do
            client.actions[1].isUsable = usable
            for _, alpha in ipairs({ 0, 0.5, 1 }) do
                button.alpha = { secret = true, alpha = alpha }
                client.refresh()
                assert(client.alpha(usable and text or unusableText) == alpha, "The combo-point number did not follow the button opacity.")
            end
        end
        button.alpha = 1
        local fontHeight = text.fontHeight
        button.scale = 1.5
        client.refresh()
        assert(text.fontHeight == fontHeight * 1.5 and unusableText.fontHeight == text.fontHeight, "The number did not follow the button scale.")
        button.visible = false
        client.refresh()
        assert(not client.getSpellGlow() and not isGlowing() and client.alpha(text) == 0)
        button.visible = true
        client.refresh()
        assert(client.getSpellGlow() == glow and client.alpha(text) == 1)
        client.actions[1].spellID = auraID
        client.refresh()
        assert(not client.getSpellGlow() and client.alpha(text) == 0, "A non-finisher kept the number.")
        button.action = 13
        client.actions[13] = { spellID = rankID }
        client.refresh()
        assert(client.alpha(text) == 1 and client.getComboPointTexts() == text and #client.frames == frames, "Action paging replaced or lost the number.")
        client.actions[13] = nil
        client.refresh()
        assert(not client.getSpellGlow() and not isGlowing() and client.alpha(text) == 0)
    end)
end

for _, withNumber in ipairs({ false, true }) do
    scenario("Combo-point warnings without a number and another number rule " .. tostring(withNumber), function(client)
        client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        local rules = {
            {
                key = "builder", action = action, visual = "red-blink", requireUsable = true,
                condition = { mechanic = "combo-points", points = 5, showNumber = false },
            },
        }
        if withNumber then
            rules[2] = { key = "number", action = action, visual = "none", condition = { mechanic = "combo-points" } }
        end
        client.startRules(rules)
        client.refresh()
        local warning = client.getHighlight()
        assert(warning and warning.color, "The combo-point rule has no red warning.")
        for _, points in ipairs({ 0, 4, 5, 6, { secret = true }, 5 }) do
            client.comboPoints = points
            client.event("PLAYER_TARGET_CHANGED")
            for _, usable in ipairs({ false, true }) do
                client.actions[1].isUsable = usable
                client.event("ACTION_USABLE_CHANGED")
                assert(client.alpha(warning) == ((points == 5 and usable) and 1 or 0), "The warning ignored the count or usability.")
                assert((client.getComboPointTexts() ~= nil) == withNumber, "The number ignored the other combo-point rule.")
            end
        end
    end)
end

scenario("Exact item selectors and dispel types", function(client)
    client.addActionButton("ActionButton1", 1)
    client.fullHealthUnits.player = true
    local rules = {}
    local allItems = { itemIDs = {} }
    for index, dispelType in ipairs({ "Poison", "Disease" }) do
        allItems.itemIDs[999210 + index] = true
        rules[index] = {
            key = dispelType, action = { itemIDs = { [999210 + index] = true } }, visual = "glow", requireUsable = index == 2,
            condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelTypes = { [dispelType] = true } },
        }
    end
    local warningDispelTypes = { Poison = true, Curse = true }
    client.startRules({
        rules[1],
        rules[2],
        {
            key = "warning", action = allItems, visual = "red-blink", requireUsable = true,
            condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelTypes = warningDispelTypes },
        },
        {
            key = "highlight", action = allItems, visual = "highlight",
            condition = { mechanic = "full-health", unit = "heal-target" },
        },
    })
    for index, rule in ipairs(rules) do
        client.items[999210 + index] = { classID = Enum.ItemClass.Consumable }
        client.actions[1] = { itemID = 999210 + index }
        client.refresh()
        local container = client.getContainer("player", rule.key)
        assert(container.slots[rule.key].candidateFilters.includeDispelTypes[rule.key])
        assert(client.getSpellGlow())
        for _, cooldown in ipairs({ true, false }) do
            client.actions[1].cooldown = cooldown
            client.actions[1].globalCooldown = true
            client.refresh()
            assert((client.getSpellGlow() ~= nil) == not cooldown, "The item glow ignored its cooldown or checked the global cooldown.")
            assert(container.slots[rule.key].enabled, "The cooldown disabled the secure slot.")
        end
        local warningSlot = client.getContainer("player", "warning").slots.warning
        local warningFilter = warningSlot.candidateFilters.includeDispelTypes
        assert(warningFilter ~= warningDispelTypes, "The dispel filter shares the declaration.")
        assert(warningFilter.Poison and warningFilter.Curse and not warningFilter.Disease, "The dispel filter changed the declared types.")
        local warning = warningSlot.texture
        local highlight = client.getHighlight()
        for _, classID in ipairs({ Enum.ItemClass.Consumable, Enum.ItemClass.Tradegoods }) do
            client.items[999210 + index] = { classID = classID }
            for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
                client.event(event)
                for _, count in ipairs({ 0, 1, 5, 0, 1 }) do
                    client.itemCounts[999210 + index] = count
                    client.refresh()
                    assert((client.getSpellGlow() ~= nil) == (count > 0), "An unavailable item retained its glow.")
                    assert(container.slots[rule.key].enabled, "The item count disabled the secure slot.")
                    assert(client.alpha(warning) == 1, "The item count hid a red warning.")
                    assert(client.alpha(highlight) == 1, "The item count hid a highlight.")
                end
            end
        end
        client.actions[1].isUsable = false
        client.refresh()
        assert((client.getSpellGlow() ~= nil) == not rule.requireUsable, "The item ignored its usability policy.")
        assert(container.slots[rule.key].enabled)
        client.actions[1].isUsable = true
        client.items[999210 + index] = { classID = Enum.ItemClass.Weapon }
        client.itemCounts[999210 + index] = 0
        client.refresh()
        assert(client.getSpellGlow(), "An equipped item used the bag count.")
        client.items[999210 + index] = nil
        client.itemCounts[999210 + index] = nil
    end
    client.actions[1] = { itemID = 999299 }
    client.refresh()
    assert(not client.getSpellGlow())
end)

for _, condition in ipairs({
    { mechanic = "tanking" },
    { mechanic = "tanking", invert = true },
    { mechanic = "tanking", grouped = true },
    { mechanic = "tanking", invert = true, grouped = true },
    { mechanic = "target-cast" },
    { mechanic = "hostile-target" },
}) do
    for _, requireUsable in ipairs({ false, true }) do
        local name = condition.mechanic .. " inverted " .. tostring(condition.invert == true) .. " grouped " .. tostring(condition.grouped == true)
        scenario(name .. " with usability " .. tostring(requireUsable), function(client)
            client.addActionButton("ActionButton1", 1)
            client.actions[1] = { spellID = spellID }
            client.startRules({
                { key = "target", action = action, condition = condition, requireUsable = requireUsable, visual = "glow" },
            })
            for _, group in ipairs({ false, "party", "raid" }) do
                client.groupType = group or nil
                for _, exists in ipairs({ false, true }) do
                    for _, hostile in ipairs({ false, true }) do
                        for _, dead in ipairs({ false, true }) do
                            for _, usable in ipairs({ false, true }) do
                                client.targetExists, client.targetHostile, client.deadUnits.target = exists, hostile, dead
                                client.actions[1].isUsable = usable
                                local allowed = exists and hostile and not dead and (not requireUsable or usable)
                                if condition.mechanic == "target-cast" then
                                    for _, cast in ipairs({ "none", "cast", "channel" }) do
                                        client.targetCasting, client.targetChanneling = cast == "cast", cast == "channel"
                                        client.refresh()
                                        assert((client.getSpellGlow() ~= nil) == (allowed and cast ~= "none"))
                                    end
                                elseif condition.mechanic == "hostile-target" then
                                    client.refresh()
                                    assert((client.getSpellGlow() ~= nil) == allowed)
                                else
                                    for _, tanking in ipairs({ false, true }) do
                                        for _, threat in ipairs({ false, 0, 3 }) do
                                            client.isTanking, client.threatStatus = tanking, threat
                                            if threat == false then
                                                client.threatStatus = nil
                                            end
                                            client.refresh()
                                            local glow = client.getSpellGlow()
                                            local matchesThreat = tanking and threat ~= false
                                            if condition.invert then
                                                matchesThreat = not matchesThreat
                                            end
                                            local matchesGroup = not condition.grouped or group ~= false
                                            assert((glow ~= nil) == (allowed and matchesThreat and matchesGroup), "The threat glow has an incorrect condition.")
                                            if glow and requireUsable and threat ~= false then
                                                assert(type(glow.parent.booleanInput) == "table" and type(glow.parent.parent.booleanInput) == "table", "Tanking and usability share one alpha condition.")
                                            end
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end
        end)
    end
end

for _, requireUsable in ipairs({ false, true }) do
    scenario("Self target with usability " .. tostring(requireUsable), function(client)
        client.addActionButton("ActionButton1", 1)
        client.actions[1] = { spellID = spellID }
        client.startRules({
            { key = "self-target", action = action, condition = { mechanic = "self-target" }, requireUsable = requireUsable, visual = "glow" },
        })
        for _, target in ipairs({
            { exists = false, friendly = false, self = false, expected = true },
            { exists = true, friendly = false, self = false, expected = true },
            { exists = true, friendly = true, self = false, expected = false },
            { exists = true, friendly = true, self = true, expected = true },
        }) do
            client.targetExists, client.targetFriendly, client.targetIsPlayer = target.exists, target.friendly, target.self
            for _, usable in ipairs({ false, true }) do
                client.actions[1].isUsable = usable
                client.event("PLAYER_TARGET_CHANGED")
                local glow = client.getSpellGlow()
                assert((glow ~= nil) == (target.expected and (not requireUsable or usable)))
                if glow then
                    assert(type(glow.parent.booleanInput) == "table", "The identity result bypassed the alpha API.")
                end
            end
        end
    end)
end

for _, mechanic in ipairs({ "aura", "aura-stacks" }) do
    for _, ownAura in ipairs({ false, true }) do
        scenario(mechanic .. " rank filters with ownership " .. tostring(ownAura), function(client)
            local lowerID, middleID, higherID = 999313, 999301, 999307
            local lowerAuraID, higherAuraID, override = 999314, 999308, 999399
            local definitions = {}
            assert(loadfile("Rules.lua"))("Prism", definitions)
            local Rules = definitions.Rules
            local ranks = {
                { spellID = lowerID, auraSpellIDs = { [lowerID] = true, [lowerAuraID] = true } },
                middleID,
                { spellID = higherID, auraSpellIDs = { [higherID] = true, [higherAuraID] = true } },
            }
            local buffRule = Rules.RankedAura("buff", ranks, { unit = "player", filter = "HELPFUL" })
            local rankedRule = Rules.RankedAura("ranked", ranks, {
                unit = "target", filter = "HARMFUL", ownAura = ownAura,
                applications = mechanic == "aura-stacks" and 5 or nil,
            })
            local familyIDs = rankedRule.action.spellIDs
            client.addActionButton("ActionButton1", 1)
            client.actions[1] = { spellID = middleID, isUsable = false }
            client.baseSpellIDs[override] = middleID
            client.startRules({
                buffRule,
                rankedRule,
                {
                    key = "raw", action = { spellIDs = familyIDs }, visual = "highlight",
                    condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = familyIDs },
                },
            })
            client.refresh()
            local buff = client.getContainer("player", "buff")
            local ranked = client.getContainer("target", "ranked")
            local raw = client.getContainer("target", "raw")
            local frames = #client.frames
            for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
                client.event(event)
                for _, id in ipairs({ higherID, middleID, lowerID, override }) do
                    client.actions[1].spellID = id
                    client.refresh()
                    local expected = Rules.Union(rankedRule.condition.auraSpellIDsByAction[id == override and middleID or id])
                    expected[id] = true
                    assertIDs(buff.slots.buff.candidateFilters.includeSpellIDs, expected)
                    assertIDs(ranked.slots.ranked.candidateFilters.includeSpellIDs, expected)
                    assertIDs(raw.slots.raw.candidateFilters.includeSpellIDs, familyIDs)
                    assert(ranked.slots.ranked.candidateFilters.isFromPlayerOrPlayerPet == (ownAura or nil))
                    if mechanic == "aura-stacks" then
                        assert(ranked.slots.ranked.applicationOptions.minApplications == 5)
                        assert(ranked.slots.ranked.applicationOptions.maxApplications == 5)
                    end
                    local changes = ranked.filterChangeCount
                    client.refresh()
                    assert(ranked.filterChangeCount == changes and #client.frames == frames)
                    assert(client.alpha(ranked) == 1, "Action usability changed the rank highlight.")
                end
            end
            assert(not rankedRule.condition.auraSpellIDsByAction[middleID][override], "The core changed the declared aura map.")
            client.actions[1].spellID = 999401
            client.refresh()
            assert(not buff.enabled and not ranked.enabled and not raw.enabled, "An undeclared action kept a rank highlight.")
        end)
    end
end

scenario("Indirect rank maps refresh without action aura IDs", function(client)
    local definitions = {}
    assert(loadfile("Rules.lua"))("Prism", definitions)
    local rule = definitions.Rules.RankedAura("indirect", {
        { spellID = spellID, auraSpellIDs = { [auraID] = true } },
        { spellID = rankID, auraSpellIDs = { [999105] = true } },
    }, { unit = "player", filter = "HELPFUL" })
    assert(not rule.condition.includeActionSpellID)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.baseSpellIDs[overrideID] = rankID
    client.startRules({ rule })
    client.refresh()
    local container = client.getContainer("player", "indirect")
    local frames = #client.frames
    for _, id in ipairs({ spellID, rankID, overrideID, spellID }) do
        client.actions[1].spellID = id
        client.refresh()
        assertIDs(container.slots.indirect.candidateFilters.includeSpellIDs, rule.condition.auraSpellIDsByAction[id == overrideID and rankID or id])
        local changes = container.filterChangeCount
        client.refresh()
        assert(container.filterChangeCount == changes and #client.frames == frames)
    end
end)

scenario("Missing weapon enchantments", function(client)
    local firstEnchantID, secondEnchantID, otherEnchantID = 999501, 999502, 999503
    local weaponID, armorID, uncachedID = 999601, 999602, 999603
    client.items[weaponID] = { classID = Enum.ItemClass.Weapon }
    client.items[armorID] = { classID = Enum.ItemClass.Armor }
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "missing-enchant", action = action, visual = "glow", requireUsable = true,
            condition = {
                mechanic = "missing-weapon-enchant",
                enchantIDs = { [firstEnchantID] = true, [secondEnchantID] = true },
            },
        },
    })

    local function enchant(id, kind, present)
        return { hasEnchant = present ~= false, enchantID = id, enchantType = kind, timeLeft = 1000, charges = 0 }
    end
    local function check(expected)
        client.refresh()
        assert((client.getSpellGlow() ~= nil) == expected, "The missing-enchantment glow has an incorrect condition.")
    end

    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        client.inventory = {}
        client.weaponEnchants = {}
        check(false)
        client.inventory[INVSLOT_RANGED] = weaponID
        check(false)
        client.inventory[INVSLOT_MAINHAND] = weaponID
        check(true)
        client.weaponEnchants[Enum.WeaponSlot.MainHand] = {
            enchant(otherEnchantID, Enum.ItemEnchantType.Permanent),
            enchant(otherEnchantID, Enum.ItemEnchantType.Temporary),
        }
        check(true)
        client.weaponEnchants[Enum.WeaponSlot.MainHand][3] = enchant(firstEnchantID, Enum.ItemEnchantType.Imbue, false)
        check(true)
        client.weaponEnchants[Enum.WeaponSlot.MainHand][3].hasEnchant = true
        check(false)
        client.inventory[INVSLOT_OFFHAND] = armorID
        check(false)
        client.inventory[INVSLOT_OFFHAND] = weaponID
        check(true)
        client.weaponEnchants[Enum.WeaponSlot.OffHand] = {
            enchant(otherEnchantID, Enum.ItemEnchantType.Imbue),
            enchant(secondEnchantID, Enum.ItemEnchantType.Temporary),
        }
        check(false)
        client.weaponEnchants[Enum.WeaponSlot.MainHand][3] = nil
        check(true)
        client.actions[1].isUsable = false
        check(false)
        client.actions[1].isUsable = true
        check(true)
        client.inventory[INVSLOT_MAINHAND] = nil
        check(false)
        client.weaponEnchants[Enum.WeaponSlot.OffHand][2].hasEnchant = false
        check(true)
        client.inventory[INVSLOT_OFFHAND] = uncachedID
        check(false)
        client.items[uncachedID] = { classID = Enum.ItemClass.Weapon }
        check(true)
        client.items[uncachedID] = nil
        client.inventory[INVSLOT_OFFHAND] = nil
        check(false)
    end
end)

suite.finish("Mechanic")
