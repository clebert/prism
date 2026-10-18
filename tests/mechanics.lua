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

for _, mechanic in ipairs({ "tanking", "target-cast" }) do
    for _, requireUsable in ipairs({ false, true }) do
        scenario(mechanic .. " with usability " .. tostring(requireUsable), function(client)
            client.addActionButton("ActionButton1", 1)
            client.actions[1] = { spellID = spellID }
            client.startRules({
                { key = "target", action = action, condition = { mechanic = mechanic }, requireUsable = requireUsable, visual = "glow" },
            })
            for _, exists in ipairs({ false, true }) do
                for _, hostile in ipairs({ false, true }) do
                    for _, dead in ipairs({ false, true }) do
                        for _, usable in ipairs({ false, true }) do
                            client.targetExists, client.targetHostile, client.deadUnits.target = exists, hostile, dead
                            client.actions[1].isUsable = usable
                            local allowed = exists and hostile and not dead and (not requireUsable or usable)
                            if mechanic == "target-cast" then
                                for _, cast in ipairs({ "none", "cast", "channel" }) do
                                    client.targetCasting, client.targetChanneling = cast == "cast", cast == "channel"
                                    client.refresh()
                                    assert((client.getSpellGlow() ~= nil) == (allowed and cast ~= "none"))
                                end
                            else
                                for _, tanking in ipairs({ false, true }) do
                                    for _, threat in ipairs({ false, 0, 3 }) do
                                        client.isTanking, client.threatStatus = tanking, threat
                                        if threat == false then
                                            client.threatStatus = nil
                                        end
                                        client.refresh()
                                        assert((client.getSpellGlow() ~= nil) == (allowed and tanking and threat ~= false))
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

suite.finish("Mechanic")
