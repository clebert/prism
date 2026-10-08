local client = dofile("tests/client.lua")
client.class = "HUNTER"
local actions = client.actions
local button = client.addActionButton("ActionButton1", 1)
local Prism = client.loadAddon()
assert(Prism.classRules.HUNTER and #Prism.classRules.HUNTER == 6, "The Hunter class rules are missing.")

local function setAction(action)
    actions[button.action] = action
    client.refresh()
end

local function assertIDs(actual, expected)
    local expectedSet = {}
    for _, id in ipairs(expected) do
        expectedSet[id] = true
        assert(actual[id], "The Hunter filter excludes a required aura rank.")
    end
    for id in pairs(actual) do
        assert(expectedSet[id], "The Hunter filter includes an unrelated aura.")
    end
end

local targetRules = {
    {
        key = "own-serpent-sting",
        actionIDs = { 1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295 },
        auraIDs = { 1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295 },
        own = true,
    },
    {
        key = "hunters-mark",
        actionIDs = { 1130, 14323, 14324, 14325 },
        auraIDs = { 1130, 14323, 14324, 14325 },
    },
    {
        key = "concussive-shot",
        actionIDs = { 5116 },
        auraIDs = { 5116 },
    },
    {
        key = "wing-clip",
        actionIDs = { 2974, 14267, 14268 },
        auraIDs = { 2974, 14267, 14268 },
    },
}
local previousContainer, previousKey
for _, rule in ipairs(targetRules) do
    for _, spellID in ipairs(rule.actionIDs) do
        setAction({ spellID = spellID, isUsable = false })
        local container = client.getContainer("target", rule.key)
        assert(container and container.template == "CustomAuraContainerTemplate")
        assert(container.enabled and client.alpha(container) == 1)
        local slot = container.slots[rule.key]
        assert(slot.enabled and slot.texture)
        assert(slot.filter == (rule.own and "HARMFUL|PLAYER" or "HARMFUL"))
        assert(slot.candidateFilters.isFromPlayerOrPlayerPet == (rule.own or nil))
        assertIDs(slot.candidateFilters.includeSpellIDs, rule.auraIDs)
        assert(not client.getSpellGlow(), "A target debuff rule created a spell glow.")

        if previousKey and previousKey ~= rule.key then
            assert(not previousContainer.slots[previousKey].enabled)
            assert(not previousContainer.enabled and client.alpha(previousContainer) == 0)
        end

        local filterChanges = container.filterChangeCount
        local slotChanges = container.slotChangeCount
        local frameCount = #client.frames
        client.refresh()
        assert(container.filterChangeCount == filterChanges)
        assert(container.slotChangeCount == slotChanges)
        assert(#client.frames == frameCount, "An unchanged action created another overlay.")

        local refreshCount = container.refreshCount
        client.event("PLAYER_TARGET_CHANGED")
        assert(container.refreshCount > refreshCount)
        client.event("PLAYER_REGEN_DISABLED")
        client.event("PLAYER_REGEN_ENABLED")
        assert(slot.enabled and client.alpha(container) == 1)
        previousContainer, previousKey = container, rule.key
    end
end

-- A synthetic override tests the existing base-spell match.
client.baseSpellIDs[999007] = 13550
setAction({ spellID = 999007 })
local serpentContainer = client.getContainer("target", "own-serpent-sting")
assert(serpentContainer.slots["own-serpent-sting"].enabled)
assertIDs(serpentContainer.slots["own-serpent-sting"].candidateFilters.includeSpellIDs, {
    1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295, 999007,
})
button.scale = 1.5
client.refresh()
assert(serpentContainer.width == 54 and serpentContainer.height == 54)
assert(serpentContainer.padding[1] == 54 and serpentContainer.padding[3] == 54)
assert(serpentContainer.point[4] == 15 and serpentContainer.point[5] == 30)
button.visible = false
client.refresh()
assert(client.alpha(serpentContainer) == 0)
button.visible = true
client.refresh()
assert(client.alpha(serpentContainer) == 1)

for _, spellID in ipairs({ 1495, 14269, 14270, 14271 }) do
    setAction({ spellID = spellID })
    local mongooseGlow = client.getSpellGlow()
    assert(mongooseGlow and mongooseGlow.ProcLoop:IsPlaying(), "A Mongoose Bite rank has no glow.")
    assert(math.abs(mongooseGlow.width - 75.6) < 0.001)
    assert(not serpentContainer.slots["own-serpent-sting"].enabled)
    actions[button.action].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow(), "An unusable Mongoose Bite retained its glow.")
    actions[button.action].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(client.getSpellGlow() == mongooseGlow)
    button.visible = false
    client.refresh()
    assert(not client.getSpellGlow())
    button.visible = true
    client.refresh()
    assert(client.getSpellGlow() == mongooseGlow)
end

client.petExists = true
client.fullHealthUnits.pet = true
client.targetFriendly = true
client.fullHealthUnits.target = true
local healthFrame
for _, spellID in ipairs({ 136, 3111, 3661, 3662, 13542, 13543, 13544 }) do
    setAction({ spellID = spellID, isUsable = false })
    healthFrame = client.healthTexture
    assert(healthFrame and healthFrame.alpha.healthUnit == "pet")
    assert(client.alpha(healthFrame) == 1, "Mend Pet full-health feedback requires a usable action.")
    assert(healthFrame.textures[1], "Mend Pet has no highlight texture.")
    assert(not client.getSpellGlow())

    client.fullHealthUnits.pet = false
    client.refresh()
    assert(client.alpha(healthFrame) == 0, "A full-health friendly target activated the pet highlight.")
    client.fullHealthUnits.pet = true
    client.refresh()
    assert(client.alpha(healthFrame) == 1)
end
assert(client.healthQueryCount.player == nil and client.healthQueryCount.target == nil)

local healthQueries = client.healthQueryCount.pet
client.petExists = false
client.refresh()
assert(client.alpha(healthFrame) == 0, "An absent pet retained the Mend Pet highlight.")
assert(client.healthQueryCount.pet == healthQueries)
client.petExists = true
client.deadUnits.pet = true
client.refresh()
assert(client.alpha(healthFrame) == 0, "A dead pet activated the Mend Pet highlight.")
assert(client.healthQueryCount.pet == healthQueries)
client.deadUnits.pet = false
client.refresh()
assert(client.alpha(healthFrame) == 1)

client.petExists = false
client.refresh()
client.petExists = true
client.fullHealthUnits.pet = false
client.refresh()
assert(client.alpha(healthFrame) == 0, "A replacement pet retained the previous pet's full-health state.")
client.fullHealthUnits.pet = true
client.refresh()
assert(client.alpha(healthFrame) == 1)
button.visible = false
client.refresh()
assert(client.alpha(healthFrame) == 0)
button.visible = true
client.refresh()
assert(client.alpha(healthFrame) == 1)

button.action = 13
actions[13] = { spellID = 1495, isUsable = false }
client.refresh()
assert(client.alpha(healthFrame) == 0 and not client.getSpellGlow())
actions[13].isUsable = true
client.event("ACTION_USABLE_CHANGED")
assert(client.getSpellGlow())
setAction({ spellID = 772 })
assert(not client.getContainer("target", "own-rend"), "A Hunter selected Warrior rules.")
assert(not client.getSpellGlow())
setAction(nil)
assert(client.alpha(healthFrame) == 0 and not client.getSpellGlow())

print("Hunter tests passed.")
