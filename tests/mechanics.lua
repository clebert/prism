local client = dofile("tests/client.lua")
local actions = client.actions
local button = client.addActionButton("ActionButton1", 1)
client.items[1251] = { classID = 0, subClassID = 7 }
client.items[6452] = { classID = 0, subClassID = 0 }
client.items[255716] = { classID = 0, subClassID = 0 }
client.loadAddon()

local function setAction(action)
    actions[button.action] = action
    client.refresh()
end

local function assertIDs(actual, expected)
    local expectedSet = {}
    for _, id in ipairs(expected) do
        expectedSet[id] = true
        assert(actual[id], "The filter excludes a required aura.")
    end
    for id in pairs(actual) do
        assert(expectedSet[id], "The filter includes an unrelated aura.")
    end
end

setAction({ spellID = 1160 })
local selfBuff = client.getContainer("player", "self-buff")
assert(selfBuff and selfBuff.slots["self-buff"].filter == "HELPFUL")
assertIDs(selfBuff.slots["self-buff"].candidateFilters.includeSpellIDs, { 1160 })
local changes = selfBuff.filterChangeCount
client.refresh()
assert(selfBuff.filterChangeCount == changes)
setAction({ spellID = 6190 })
assertIDs(selfBuff.slots["self-buff"].candidateFilters.includeSpellIDs, { 6190 })

local targetRules = {
    { key = "own-rend", ids = { 772, 6546, 6547, 6548, 11572, 11573, 11574 }, own = true },
    { key = "hamstring", ids = { 1715, 7372, 7373 } },
    { key = "demoralizing-shout", ids = { 1160, 6190, 11554, 11555, 11556 } },
    { key = "thunder-clap", ids = { 6343, 8198, 8204, 8205, 11580, 11581 } },
    { key = "sunder-armor", ids = { 7386, 7405, 8380, 11596, 11597 } },
}
local previousContainer, previousKey
for _, rule in ipairs(targetRules) do
    for _, spellID in ipairs(rule.ids) do
        setAction({ spellID = spellID, isUsable = false })
        local container = client.getContainer("target", rule.key)
        assert(container and container.enabled and client.alpha(container) == 1)
        local slot = container.slots[rule.key]
        assert(slot.enabled and slot.filter == (rule.own and "HARMFUL|PLAYER" or "HARMFUL"))
        assert(slot.candidateFilters.isFromPlayerOrPlayerPet == (rule.own or nil))
        assertIDs(slot.candidateFilters.includeSpellIDs, rule.ids)
        if previousKey and previousKey ~= rule.key then
            assert(not previousContainer.slots[previousKey].enabled)
        end
        if rule.key == "sunder-armor" then
            assert(slot.applicationBar and slot.applicationBar.textures[1])
            assert(slot.applicationOptions.minApplications == 5)
            assert(slot.applicationOptions.maxApplications == 5)
        end
        local filterChanges = container.filterChangeCount
        local slotChanges = container.slotChangeCount
        client.refresh()
        assert(container.filterChangeCount == filterChanges)
        assert(container.slotChangeCount == slotChanges)
        previousContainer, previousKey = container, rule.key
    end
end

client.baseSpellIDs[999001] = 772
setAction({ spellID = 999001 })
local rendContainer = client.getContainer("target", "own-rend")
assert(rendContainer.slots["own-rend"].enabled)
assert(rendContainer.slots["own-rend"].candidateFilters.includeSpellIDs[999001])
assert(rendContainer.slots["own-rend"].candidateFilters.includeSpellIDs[772])

local usableSpellIDs = {
    5308, 20658, 20660, 20661, 20662,
    7384, 7887, 11584, 11585,
    6572, 6574, 7379, 11600, 11601, 25288,
    402927,
}
for _, spellID in ipairs(usableSpellIDs) do
    setAction({ spellID = spellID })
    local glow = client.getSpellGlow()
    assert(glow and glow.ProcLoop:IsPlaying(), "A usable attack has no spell glow.")
    assert(math.abs(glow.width - 50.4) < 0.001)
    actions[button.action].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow(), "An unusable attack retained its spell glow.")
end
setAction(nil)
assert(not client.getSpellGlow())

for _, spellID in ipairs({ 72, 1671, 1672 }) do
    client.targetCasting = false
    client.targetChanneling = false
    setAction({ spellID = spellID })
    assert(not client.getSpellGlow())
    client.targetCasting = true
    client.refresh()
    assert(client.getSpellGlow())
    client.targetCasting = false
    client.targetChanneling = true
    client.refresh()
    assert(client.getSpellGlow())
    client.targetHostile = false
    client.refresh()
    assert(not client.getSpellGlow())
    client.targetHostile = true
    client.deadUnits.target = true
    client.refresh()
    assert(not client.getSpellGlow())
    client.deadUnits.target = false
    client.targetExists = false
    client.refresh()
    assert(not client.getSpellGlow(), "An absent target activated the interrupt glow.")
    client.targetExists = true
    client.refresh()
    assert(client.getSpellGlow(), "The interrupt glow did not return with the target.")
    actions[button.action].isUsable = false
    client.refresh()
    assert(not client.getSpellGlow())
end
client.targetChanneling = false

local function tankingHighlightShown()
    for _, frame in ipairs(client.frames) do
        if rawget(frame, "booleanInput") and client.alpha(frame) == 1 then
            return true
        end
    end
    return false
end

for _, spellID in ipairs({ 355, 694, 7400, 7402, 20559, 20560, 1161 }) do
    setAction({ spellID = spellID, isUsable = false })
    assert(tankingHighlightShown(), "The tanking highlight requires a usable action.")
    client.isTanking = false
    client.refresh()
    assert(not tankingHighlightShown())
    client.isTanking = true
    client.threatStatus = nil
    client.refresh()
    assert(not tankingHighlightShown())
    client.threatStatus = 3
    client.targetExists = false
    client.refresh()
    assert(not tankingHighlightShown())
    client.targetExists = true
    client.targetHostile = false
    client.targetFriendly = true
    client.refresh()
    assert(not tankingHighlightShown(), "A friendly target activated the tanking highlight.")
    client.targetHostile = true
    client.targetFriendly = false
    client.deadUnits.target = true
    client.refresh()
    assert(not tankingHighlightShown(), "A dead target activated the tanking highlight.")
    client.deadUnits.target = false
    client.refresh()
    assert(tankingHighlightShown(), "The tanking highlight did not return with a living hostile target.")
end

client.fullHealthUnits.player = true
setAction({ itemID = 1251, isUsable = false })
assert(client.healthTexture and client.alpha(client.healthTexture) == 1)
assert(client.healthTexture.alpha.healthUnit == "player")
local poisonContainer = client.getContainer("player", "bandage-poison")
assert(poisonContainer and client.alpha(poisonContainer) == 0)
assert(poisonContainer.slots["bandage-poison"].candidateFilters.includeDispelTypes.Poison)
actions[button.action].isUsable = true
client.refresh()
assert(client.alpha(poisonContainer) == 1)
local healthTexture = client.healthTexture
client.items[1251] = nil
client.refresh()
assert(client.alpha(healthTexture) == 1, "Missing item data lost the cached bandage category.")

-- Synthetic items test unknown data and incorrect item categories.
setAction({ itemID = 999008 })
assert(client.alpha(healthTexture) == 0, "Another item inherited the cached bandage category.")
assert(not poisonContainer.enabled and client.alpha(poisonContainer) == 0)
client.items[999009] = { classID = 0, subClassID = 0 }
client.items[999010] = { classID = 1, subClassID = 7 }
for _, itemID in ipairs({ 999009, 999010 }) do
    setAction({ itemID = itemID })
    assert(client.alpha(healthTexture) == 0, "An incorrect item category activated the bandage highlight.")
    assert(not poisonContainer.enabled, "An incorrect item category activated the bandage warning.")
end
client.items[1251] = { classID = 0, subClassID = 7 }
setAction({ itemID = 1251 })
assert(client.alpha(healthTexture) == 1 and poisonContainer.enabled)
client.targetFriendly = true
client.fullHealthUnits.target = true
client.event("PLAYER_TARGET_CHANGED")
assert(poisonContainer.unit == "target")
assert(client.healthTexture.alpha.healthUnit == "target")
client.deadUnits.target = true
client.refresh()
assert(client.alpha(healthTexture) == 0)
client.deadUnits.target = false
client.targetFriendly = false
client.event("PLAYER_TARGET_CHANGED")
assert(poisonContainer.unit == "player")

local healTargets = {
    { exists = false, friendly = true, dead = false, fullHealth = true, unit = "player", alpha = 1 },
    { exists = true, friendly = false, dead = false, fullHealth = true, unit = "player", alpha = 1 },
    { exists = true, friendly = true, dead = false, fullHealth = false, unit = "target", alpha = 0 },
    { exists = true, friendly = true, dead = true, fullHealth = true, unit = "target", alpha = 0 },
    { exists = true, friendly = true, dead = false, fullHealth = true, unit = "target", alpha = 1 },
}
for _, target in ipairs(healTargets) do
    client.targetExists = target.exists
    client.targetFriendly = target.friendly
    client.targetHostile = not target.friendly
    client.deadUnits.target = target.dead
    client.fullHealthUnits.target = target.fullHealth
    local targetQueries = client.healthQueryCount.target
    client.event("PLAYER_TARGET_CHANGED")
    assert(poisonContainer.unit == target.unit, "The bandage warning selected the wrong heal target.")
    assert(client.alpha(healthTexture) == target.alpha, "The bandage highlight used an incorrect health condition.")
    if target.alpha == 1 then
        assert(healthTexture.alpha.healthUnit == target.unit, "The bandage highlight selected the wrong heal target.")
    end
    if not target.exists or target.dead then
        assert(client.healthQueryCount.target == targetQueries, "The core queried health for an absent or dead target.")
    end
end
client.targetFriendly = false
client.targetHostile = true
client.fullHealthUnits.player = false
client.event("PLAYER_TARGET_CHANGED")
assert(client.alpha(healthTexture) == 0, "A wounded player activated the bandage highlight.")
client.fullHealthUnits.player = true
client.event("PLAYER_TARGET_CHANGED")
assert(client.alpha(healthTexture) == 1)

for _, itemID in ipairs({ 6452, 6453, 19440, 255715, 255716, 255717, 255718, 255719 }) do
    setAction({ itemID = itemID })
    local isPoison = itemID == 6452 or itemID == 6453 or itemID == 19440 or itemID == 255715
    local key = isPoison and "anti-venom-poison" or "poultice-disease"
    local container = client.getContainer("player", key)
    assert(container and container.enabled and client.alpha(container) == 1)
    local slot = container.slots[key]
    assert(slot.enabled and slot.animation)
    assert(slot.candidateFilters.includeDispelTypes[isPoison and "Poison" or "Disease"])
    local glow = client.getSpellGlow()
    assert(glow and math.abs(glow.width - 50.4) < 0.001)
    actions[button.action].isUsable = false
    client.refresh()
    assert(client.alpha(container) == 0)
    assert(slot.enabled, "Usability disabled the secure dispel slot.")
end

setAction({ itemID = 999002 })
assert(not client.getSpellGlow())
assert(client.alpha(healthTexture) == 0)
client.items[999002] = { classID = 0, subClassID = 7 }
client.refresh()
assert(client.alpha(client.healthTexture) == 1, "An item category did not activate after its data arrived.")

setAction({ spellID = 5308 })
button.visible = false
client.refresh()
assert(not client.getSpellGlow())
button.visible = true
client.refresh()
assert(client.getSpellGlow())
button.action = 13
actions[13] = { spellID = 72 }
client.refresh()
assert(not client.getSpellGlow(), "Action paging retained the previous spell glow.")
client.targetCasting = true
client.refresh()
assert(client.getSpellGlow())

print("Mechanics tests passed.")
