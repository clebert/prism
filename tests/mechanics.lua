local suite = dofile("tests/scenarios.lua")
local scenario = suite.scenario

-- Synthetic IDs separate action matching from aura matching.
local spellID, auraID, rankID, overrideID = 999101, 999102, 999103, 999104
local action = { spellIDs = { [spellID] = true, [rankID] = true } }

local function assertIDs(actual, expected)
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

scenario("Secure aura usability and lifecycle", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "warning", action = action, visual = "red-blink", requireUsable = true,
            condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true } },
        },
    })
    client.refresh()
    local container = client.getContainer("target", "warning")
    local slot = container.slots.warning
    assert(container.template == "CustomAuraContainerTemplate" and slot.filter == "HARMFUL")
    local changes, slotChanges = container.filterChangeCount, container.slotChangeCount
    for _, usable in ipairs({ false, true }) do
        client.actions[1].isUsable = usable
        client.event("ACTION_USABLE_CHANGED")
        assert(client.alpha(container) == (usable and 1 or 0))
        assert(slot.enabled and container.enabled, "Usability disabled the secure slot.")
        assert(container.filterChangeCount == changes and container.slotChangeCount == slotChanges)
    end
    for _, event in ipairs({ "PLAYER_TARGET_CHANGED", "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        local refreshes = container.refreshCount
        client.event(event)
        assert(container.refreshCount > refreshes)
    end
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
            condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelType = "Poison" },
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

scenario("Exact item selectors and dispel types", function(client)
    client.addActionButton("ActionButton1", 1)
    local rules = {}
    for index, dispelType in ipairs({ "Poison", "Disease" }) do
        rules[index] = {
            key = dispelType, action = { itemIDs = { [999210 + index] = true } }, visual = "glow", requireUsable = true,
            condition = { mechanic = "dispel-type", unit = "heal-target", filter = "HARMFUL", dispelType = dispelType },
        }
    end
    client.startRules(rules)
    for index, rule in ipairs(rules) do
        client.actions[1] = { itemID = 999210 + index }
        client.refresh()
        local container = client.getContainer("player", rule.key)
        assert(container.slots[rule.key].candidateFilters.includeDispelTypes[rule.key])
        assert(client.getSpellGlow())
        client.actions[1].isUsable = false
        client.refresh()
        assert(not client.getSpellGlow() and container.slots[rule.key].enabled)
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

suite.finish("Mechanic")
