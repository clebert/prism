local client = dofile("tests/client.lua")
client.class = "HUNTER"
local actions = client.actions
local button = client.addActionButton("ActionButton1", 1)
local Prism = client.loadAddon()
assert(Prism.classRules.HUNTER, "The Hunter class rules are missing.")

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
        warningKey = "serpent-sting-replacement",
        warningAuraIDs = { 3034, 14279, 14280, 3043 },
    },
    {
        key = "viper-sting",
        actionIDs = { 3034, 14279, 14280 },
        auraIDs = { 3034, 14279, 14280 },
        warningKey = "viper-sting-replacement",
        warningAuraIDs = { 1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295, 3043 },
    },
    {
        key = "scorpid-sting",
        actionIDs = { 3043 },
        auraIDs = { 3043 },
        warningKey = "scorpid-sting-replacement",
        warningAuraIDs = { 1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295, 3034, 14279, 14280 },
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
        assert(container and container.template == "CustomAuraContainerTemplate", "The Hunter aura rule is missing: " .. rule.key .. ".")
        assert(container.enabled and client.alpha(container) == 1)
        local slot = container.slots[rule.key]
        assert(slot.enabled and slot.texture)
        assert(slot.filter == (rule.own and "HARMFUL|PLAYER" or "HARMFUL"), "The Hunter highlight uses the wrong caster filter.")
        assert(slot.candidateFilters.isFromPlayerOrPlayerPet == (rule.own or nil))
        assertIDs(slot.candidateFilters.includeSpellIDs, rule.auraIDs)
        assert(not client.getSpellGlow(), "A target debuff rule created a spell glow.")

        if rule.warningKey then
            local warningContainer = client.getContainer("target", rule.warningKey)
            assert(warningContainer and warningContainer.template == "CustomAuraContainerTemplate", "The sting replacement warning is missing.")
            assert(warningContainer ~= container, "The warning shares its container with the normal highlight.")
            local warningSlot = warningContainer.slots[rule.warningKey]
            assert(warningSlot.enabled and warningContainer.enabled)
            assert(warningSlot.filter == "HARMFUL|PLAYER", "Another hunter's sting can activate the replacement warning.")
            assert(warningSlot.candidateFilters.isFromPlayerOrPlayerPet == true)
            assertIDs(warningSlot.candidateFilters.includeSpellIDs, rule.warningAuraIDs)
            assert(not warningSlot.candidateFilters.includeSpellIDs[spellID], "The matching sting activates its own replacement warning.")
            assert(warningSlot.texture.color[1] == 1 and warningSlot.texture.color[2] == 0 and warningSlot.texture.color[3] == 0)
            assert(warningSlot.animation.looping == "BOUNCE")
            local fade = warningSlot.animation.animations[1]
            assert(fade.animationType == "Alpha" and fade.fromAlpha == 0.2 and fade.toAlpha == 1 and fade.duration == 0.4)
            assert(client.alpha(warningContainer) == 0, "An unusable sting retained its replacement warning.")

            local warningFilterChanges = warningContainer.filterChangeCount
            local warningSlotChanges = warningContainer.slotChangeCount
            actions[button.action].isUsable = true
            client.event("ACTION_USABLE_CHANGED")
            assert(client.alpha(warningContainer) == 1, "A usable sting has no replacement warning.")
            assert(client.alpha(container) == 1, "The warning changed the normal highlight.")
            actions[button.action].isUsable = false
            client.event("ACTION_USABLE_CHANGED")
            assert(client.alpha(warningContainer) == 0)
            assert(warningContainer.filterChangeCount == warningFilterChanges)
            assert(warningContainer.slotChangeCount == warningSlotChanges)
            local warningRefreshCount = warningContainer.refreshCount
            client.event("PLAYER_TARGET_CHANGED")
            assert(warningContainer.refreshCount > warningRefreshCount)
            client.event("PLAYER_REGEN_DISABLED")
            client.event("PLAYER_REGEN_ENABLED")
            assert(warningSlot.enabled and client.alpha(warningContainer) == 0)
        end

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

setAction({ spellID = 18545 })
local scorpidContainer = client.getContainer("target", "scorpid-sting")
assert(not scorpidContainer.slots["scorpid-sting"].enabled, "The unrelated Scorpid Sting effect selected the player rule.")
assert(not scorpidContainer.enabled and client.alpha(scorpidContainer) == 0)
assert(not client.getSpellGlow())

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

local serpentWarningContainer = client.getContainer("target", "serpent-sting-replacement")
local serpentWarningSlot = serpentWarningContainer.slots["serpent-sting-replacement"]
assertIDs(serpentWarningSlot.candidateFilters.includeSpellIDs, { 3034, 14279, 14280, 3043 })
assert(client.alpha(serpentWarningContainer) == 1)
assert(serpentWarningContainer.width == 54 and serpentWarningContainer.height == 54)
assert(serpentWarningContainer.padding[1] == 54 and serpentWarningContainer.padding[3] == 54)
assert(serpentWarningContainer.point[4] == 15 and serpentWarningContainer.point[5] == 30)
local warningFrameCount = #client.frames
local warningFilterChanges = serpentWarningContainer.filterChangeCount
local warningSlotChanges = serpentWarningContainer.slotChangeCount
client.refresh()
assert(#client.frames == warningFrameCount)
assert(serpentWarningContainer.filterChangeCount == warningFilterChanges)
assert(serpentWarningContainer.slotChangeCount == warningSlotChanges)
button.visible = false
client.refresh()
assert(client.alpha(serpentWarningContainer) == 0)
button.visible = true
client.refresh()
assert(client.alpha(serpentWarningContainer) == 1)
button.action = 13
setAction({ spellID = 3034, isUsable = false })
local viperWarningContainer = client.getContainer("target", "viper-sting-replacement")
assert(not serpentWarningSlot.enabled and not serpentWarningContainer.enabled and client.alpha(serpentWarningContainer) == 0)
assert(viperWarningContainer.slots["viper-sting-replacement"].enabled and client.alpha(viperWarningContainer) == 0)
actions[13].isUsable = true
client.event("ACTION_USABLE_CHANGED")
assert(client.alpha(viperWarningContainer) == 1)
setAction({ spellID = 3043 })
local scorpidWarningContainer = client.getContainer("target", "scorpid-sting-replacement")
assert(not viperWarningContainer.slots["viper-sting-replacement"].enabled and not viperWarningContainer.enabled)
assert(client.alpha(scorpidWarningContainer) == 1)
setAction({ spellID = 5116 })
assert(not scorpidWarningContainer.slots["scorpid-sting-replacement"].enabled)
assert(not scorpidWarningContainer.enabled and client.alpha(scorpidWarningContainer) == 0)
setAction({ spellID = 1978 })
setAction(nil)
assert(not serpentWarningSlot.enabled and not serpentWarningContainer.enabled and client.alpha(serpentWarningContainer) == 0)
button.action = 1

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

for _, spellID in ipairs({ 19306, 1242634, 20909, 20910 }) do
    setAction({ spellID = spellID, isUsable = false })
    assert(not client.getSpellGlow(), "An unusable Counterattack rank has a glow.")
    actions[button.action].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    local counterattackGlow = client.getSpellGlow()
    assert(counterattackGlow and counterattackGlow.ProcLoop:IsPlaying(), "A Counterattack rank has no glow.")
    assert(math.abs(counterattackGlow.width - 75.6) < 0.001)
    assert(not client.getContainer("target", "counterattack"), "Counterattack created a target aura rule.")
    client.event("PLAYER_REGEN_DISABLED")
    client.event("PLAYER_REGEN_ENABLED")
    assert(client.getSpellGlow() == counterattackGlow)
    actions[button.action].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow(), "An unusable Counterattack retained its glow.")
    actions[button.action].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(client.getSpellGlow() == counterattackGlow)
    button.visible = false
    client.refresh()
    assert(not client.getSpellGlow())
    button.visible = true
    client.refresh()
    assert(client.getSpellGlow() == counterattackGlow)
end

for _, spellID in ipairs({ 781, 14272, 14273 }) do
    setAction({ spellID = spellID, isUsable = false })
    assert(not client.getSpellGlow(), "An unusable Disengage rank has a glow.")
    actions[button.action].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    local disengageGlow = client.getSpellGlow()
    assert(disengageGlow and disengageGlow.ProcLoop:IsPlaying(), "A usable Disengage rank has no tanking glow.")
    assert(math.abs(disengageGlow.width - 75.6) < 0.001)
    assert(not client.getContainer("target", "disengage"), "Disengage created a target aura rule.")

    client.isTanking = false
    client.refresh()
    assert(not client.getSpellGlow(), "Disengage glows without tanking.")
    client.isTanking = true
    client.threatStatus = nil
    client.refresh()
    assert(not client.getSpellGlow(), "Disengage glows without target threat.")
    client.threatStatus = 3
    client.targetExists = false
    client.event("PLAYER_TARGET_CHANGED")
    assert(not client.getSpellGlow(), "Disengage glows without a target.")
    client.targetExists = true
    client.targetHostile = false
    client.targetFriendly = true
    client.event("PLAYER_TARGET_CHANGED")
    assert(not client.getSpellGlow(), "A friendly target activated the Disengage glow.")
    client.targetHostile = true
    client.targetFriendly = false
    client.deadUnits.target = true
    client.refresh()
    assert(not client.getSpellGlow(), "A dead target activated the Disengage glow.")
    client.deadUnits.target = false
    client.refresh()
    assert(client.getSpellGlow() == disengageGlow)
    client.event("PLAYER_REGEN_DISABLED")
    client.event("PLAYER_REGEN_ENABLED")
    assert(client.getSpellGlow() == disengageGlow)

    actions[button.action].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow(), "An unusable Disengage retained its tanking glow.")
    client.isTanking = false
    client.refresh()
    actions[button.action].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow(), "Usability replaced the tanking condition.")
    client.isTanking = true
    client.refresh()
    assert(client.getSpellGlow() == disengageGlow)
    button.visible = false
    client.refresh()
    assert(not client.getSpellGlow())
    button.visible = true
    client.refresh()
    assert(client.getSpellGlow() == disengageGlow)
end

setAction({ spellID = 14344 })
assert(not client.getSpellGlow(), "The Disengage teaching spell selected the action rule.")
client.baseSpellIDs[999011] = 781
setAction({ spellID = 999011 })
local disengageGlow = client.getSpellGlow()
assert(disengageGlow, "A Disengage override has no tanking glow.")
button.action = 13
actions[13] = { spellID = 781, isUsable = false }
client.refresh()
assert(not client.getSpellGlow(), "Action paging retained the Disengage usability condition.")
actions[13].isUsable = true
client.event("ACTION_USABLE_CHANGED")
assert(client.getSpellGlow() == disengageGlow)
setAction({ spellID = 5116 })
assert(not client.getSpellGlow(), "A replacement action retained the Disengage glow.")
setAction(nil)
assert(not client.getSpellGlow())
button.action = 1

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

button.action = 1
client.petExists = true
client.petHappiness = 3
local previousFrameCount = #client.frames
setAction({ spellID = 6991, isUsable = false })
local happinessFrame
for index = previousFrameCount + 1, #client.frames do
    local frame = client.frames[index]
    if frame.frameType == "Frame" and frame.textures[1] then
        happinessFrame = frame
    end
end
assert(happinessFrame, "Feed Pet has no happiness highlight.")
assert(client.alpha(happinessFrame) == 1, "A happy pet has no Feed Pet highlight when the action is unusable.")
assert(happinessFrame.textures[1].texture == "Interface\\Buttons\\CheckButtonHilight")
assert(not client.getSpellGlow(), "A Happy pet activated the Feed Pet glow.")
local feedingContainer = client.getContainer("pet", "feed-pet-active")
assert(feedingContainer and feedingContainer.template == "CustomAuraContainerTemplate", "Feed Pet has no secure pet aura rule.")
local feedingSlot = feedingContainer.slots["feed-pet-active"]
assert(feedingSlot.enabled and feedingSlot.texture and feedingSlot.filter == "HELPFUL")
assertIDs(feedingSlot.candidateFilters.includeSpellIDs, { 1539 })
assert(client.alpha(feedingContainer) == 1, "The active Feed Pet highlight requires a usable action.")

local feedingGlow
for _, happiness in ipairs({ 1, 2, 3 }) do
    client.petHappiness = happiness
    client.refresh()
    for _, usable in ipairs({ false, true }) do
        actions[button.action].isUsable = usable
        client.event("ACTION_USABLE_CHANGED")
        for _, inCombat in ipairs({ false, true }) do
            client.combatUnits.pet = inCombat
            client.refresh()
            for _, feeding in ipairs({ false, true }) do
                feedingSlot.frame.visible = feeding
                local glow = client.getSpellGlow()
                local expectGlow = usable and happiness < 3 and not inCombat and not feeding
                assert((glow ~= nil) == expectGlow, "Feed Pet glows while its buff is active or another glow condition is false.")
                if glow then
                    assert(glow.ProcLoop:IsPlaying(), "The Feed Pet glow animation did not start.")
                    assert(math.abs(glow.width - 75.6) < 0.001)
                    assert(glow.parent.booleanInput, "The Feed Pet glow has no separate usability condition.")
                    assert(not feedingGlow or glow == feedingGlow, "Feed Pet did not reuse its glow.")
                    feedingGlow = glow
                end
                assert(client.alpha(happinessFrame) == (happiness == 3 and 1 or 0), "Pet combat changed the happiness highlight.")
                assert(client.alpha(feedingSlot.texture) == (feeding and 1 or 0), "The feeding highlight does not follow the secure aura slot.")
                local highlighted = client.alpha(happinessFrame) > 0 or client.alpha(feedingSlot.texture) > 0
                assert(highlighted == (happiness == 3 or feeding), "Feed Pet does not combine happiness and feeding with OR.")
            end
        end
        client.combatUnits.pet = false
        client.refresh()
    end
end
client.petHappiness = nil
client.refresh()
assert(client.alpha(happinessFrame) == 0, "Missing happiness data activated the Feed Pet highlight.")
assert(client.alpha(feedingSlot.texture) == 1, "Missing happiness data hid the active Feed Pet aura highlight.")
assert(not client.getSpellGlow(), "Missing happiness data activated the Feed Pet glow.")
client.petHappiness = 3
client.refresh()
assert(client.alpha(happinessFrame) == 1)

local happinessQueries = client.happinessQueryCount
client.petExists = false
client.refresh()
assert(client.alpha(happinessFrame) == 0, "An absent pet retained the happiness highlight.")
assert(client.happinessQueryCount == happinessQueries, "The core queried happiness for an absent pet.")
client.petExists = true
client.deadUnits.pet = true
client.refresh()
assert(client.alpha(happinessFrame) == 0, "A dead pet activated the happiness highlight.")
assert(client.happinessQueryCount == happinessQueries, "The core queried happiness for a dead pet.")
client.deadUnits.pet = false
client.petHappiness = 1
client.refresh()
assert(client.alpha(happinessFrame) == 0, "A replacement pet retained the previous pet's happiness highlight.")
client.petHappiness = 3
client.refresh()
assert(client.alpha(happinessFrame) == 1)

local frameCount = #client.frames
local filterChanges = feedingContainer.filterChangeCount
local slotChanges = feedingContainer.slotChangeCount
client.refresh()
assert(#client.frames == frameCount, "An unchanged Feed Pet action created another overlay.")
assert(feedingContainer.filterChangeCount == filterChanges and feedingContainer.slotChangeCount == slotChanges)
for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
    local refreshCount = feedingContainer.refreshCount
    client.event(event)
    client.refresh()
    assert(feedingContainer.refreshCount > refreshCount and client.alpha(happinessFrame) == 1)
    assert(client.alpha(feedingContainer) == 1)
end
button.scale = 2
client.refresh()
assert(feedingContainer.width == 72 and feedingContainer.height == 72)
assert(happinessFrame.parent.width == 72 and happinessFrame.parent.height == 72)
button.visible = false
client.refresh()
assert(client.alpha(happinessFrame) == 0 and client.alpha(feedingContainer) == 0)
button.visible = true
client.refresh()
assert(client.alpha(happinessFrame) == 1 and client.alpha(feedingContainer) == 1)

client.baseSpellIDs[999012] = 6991
setAction({ spellID = 999012, isUsable = false })
assert(client.alpha(happinessFrame) == 1 and feedingSlot.enabled)
assertIDs(feedingSlot.candidateFilters.includeSpellIDs, { 1539 })
for _, spellID in ipairs({ 1539, 1584, 23354, 23355 }) do
    setAction({ spellID = spellID })
    assert(client.alpha(happinessFrame) == 0, "A Feed Pet effect or teaching spell selected the action rule.")
    assert(not feedingSlot.enabled and not feedingContainer.enabled and client.alpha(feedingContainer) == 0)
end
setAction({ spellID = 6991 })
assert(client.alpha(happinessFrame) == 1 and feedingSlot.enabled)
button.action = 13
actions[13] = { spellID = 1495, isUsable = false }
client.refresh()
assert(client.alpha(happinessFrame) == 0 and client.alpha(feedingContainer) == 0)
setAction({ spellID = 6991, isUsable = false })
assert(client.alpha(happinessFrame) == 1 and client.alpha(feedingContainer) == 1)
setAction(nil)
assert(client.alpha(happinessFrame) == 0 and client.alpha(feedingContainer) == 0 and not client.getSpellGlow())

client.petHappiness = 2
feedingSlot.frame.visible = false
setAction({ spellID = 6991 })
assert(client.getSpellGlow() == feedingGlow)
assert(client.alpha(happinessFrame) == 0 and client.alpha(feedingSlot.texture) == 0)
local suppressionMask = feedingGlow.ProcLoopFlipbook.masks[1]
assert(suppressionMask.parent == feedingSlot.frame, "The glow mask is not part of the secure pet aura slot.")
assert(suppressionMask.allPoints == feedingGlow, "The aura mask does not cover the glow.")
assert(suppressionMask.texture == "Interface\\CharacterFrame\\TempPortraitAlphaMask")
assert(suppressionMask.horizontalWrap == "CLAMPTOBLACKADDITIVE" and suppressionMask.verticalWrap == "CLAMPTOBLACKADDITIVE")
for _, coordinate in ipairs(suppressionMask.texCoords) do
    assert(coordinate > 1, "The glow mask does not sample outside the texture.")
end
for _, key in ipairs({ "ProcStartFlipbook", "ProcLoopFlipbook", "ProcAltGlow" }) do
    assert(#feedingGlow[key].masks == 1 and feedingGlow[key].masks[1] == suppressionMask, "A glow texture has no shared aura mask.")
end
local buffFrameCount = #client.frames
feedingSlot.frame.visible = true
assert(not client.getSpellGlow(), "The active Feed Pet buff did not suppress the glow without a refresh.")
assert(client.alpha(feedingGlow) == 1, "The aura mask replaced a non-aura glow condition.")
assert(client.alpha(feedingSlot.texture) == 1, "The glow mask hid the active feeding highlight.")
feedingSlot.frame.visible = false
assert(client.getSpellGlow() == feedingGlow, "Buff removal did not restore the glow without a refresh.")
assert(#client.frames == buffFrameCount)
client.combatUnits.player = true
client.event("PLAYER_REGEN_DISABLED")
client.refresh()
assert(client.getSpellGlow() == feedingGlow, "Player combat hid the Feed Pet glow while the pet was out of combat.")
client.combatUnits.pet = true
client.refresh()
assert(not client.getSpellGlow(), "Pet combat did not hide the Feed Pet glow.")
assert(not feedingGlow.ProcLoop:IsPlaying(), "Pet combat did not stop the Feed Pet glow animation.")
feedingSlot.frame.visible = true
assert(client.alpha(feedingSlot.texture) == 1, "Pet combat hid the active feeding highlight.")
client.combatUnits.player = false
client.event("PLAYER_REGEN_ENABLED")
client.refresh()
assert(not client.getSpellGlow(), "The player's combat exit restored the glow while the pet was in combat.")
feedingSlot.frame.visible = false
client.combatUnits.pet = false
client.refresh()
assert(client.getSpellGlow() == feedingGlow, "The pet's combat exit did not restore the Feed Pet glow.")
assert(feedingGlow.ProcLoop:IsPlaying())
local glowHappinessQueries = client.happinessQueryCount
client.petExists = false
client.refresh()
assert(not client.getSpellGlow(), "An absent pet retained the Feed Pet glow.")
assert(not feedingGlow.ProcLoop:IsPlaying())
assert(client.happinessQueryCount == glowHappinessQueries, "The core queried happiness for an absent pet.")
client.petExists = true
client.deadUnits.pet = true
client.refresh()
assert(not client.getSpellGlow(), "A dead pet activated the Feed Pet glow.")
assert(client.happinessQueryCount == glowHappinessQueries, "The core queried happiness for a dead pet.")
client.deadUnits.pet = false
client.petHappiness = 3
client.refresh()
assert(not client.getSpellGlow(), "A replacement Happy pet retained the Feed Pet glow.")
client.petHappiness = 1
client.refresh()
assert(client.getSpellGlow() == feedingGlow)
for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
    client.event(event)
    client.refresh()
    assert(client.getSpellGlow() == feedingGlow)
end
button.visible = false
client.refresh()
assert(not client.getSpellGlow() and not feedingGlow.ProcLoop:IsPlaying())
button.visible = true
button.scale = 1
client.refresh()
assert(client.getSpellGlow() == feedingGlow and math.abs(feedingGlow.width - 50.4) < 0.001)
setAction({ spellID = 999012 })
assert(client.getSpellGlow() == feedingGlow, "A Feed Pet override has no happiness glow.")
for _, spellID in ipairs({ 1539, 1584, 23354, 23355 }) do
    setAction({ spellID = spellID })
    assert(not client.getSpellGlow(), "A Feed Pet effect or teaching spell activated the happiness glow.")
end
setAction({ spellID = 6991 })
assert(client.getSpellGlow() == feedingGlow)
button.action = 1
actions[1] = { spellID = 1495, isUsable = false }
client.refresh()
assert(not client.getSpellGlow(), "Action paging retained the Feed Pet glow.")
assert(not feedingGlow.ProcLoop:IsPlaying())
setAction({ spellID = 6991, isUsable = false })
assert(not client.getSpellGlow(), "An unusable Feed Pet action retained the happiness glow.")
actions[button.action].isUsable = true
client.event("ACTION_USABLE_CHANGED")
assert(client.getSpellGlow() == feedingGlow)
setAction(nil)
assert(not client.getSpellGlow() and not feedingGlow.ProcLoop:IsPlaying())

client.petExists = true
client.deadUnits.pet = false
client.fullHealthUnits.pet = false
local reviveFrameCount = #client.frames
local reviveHealthQueries = client.healthQueryCount.pet
setAction({ spellID = 982, isUsable = false })
local reviveFrame
for index = reviveFrameCount + 1, #client.frames do
    local frame = client.frames[index]
    if frame.frameType == "Frame" and frame.textures[1] then
        reviveFrame = frame
    end
end
assert(reviveFrame, "Revive Pet has no living-pet highlight.")
assert(client.alpha(reviveFrame) == 1, "A living pet with partial health has no Revive Pet highlight.")
assert(reviveFrame.textures[1].texture == "Interface\\Buttons\\CheckButtonHilight")
assert(not client.getSpellGlow(), "Revive Pet created a spell glow.")
client.fullHealthUnits.pet = true
client.refresh()
assert(client.alpha(reviveFrame) == 1, "Pet health changed the Revive Pet highlight.")
assert(client.healthQueryCount.pet == reviveHealthQueries, "Revive Pet queried pet health.")
client.deadUnits.pet = true
client.refresh()
assert(client.alpha(reviveFrame) == 0, "A dead pet activated the Revive Pet highlight.")
client.deadUnits.pet = false
client.petExists = false
client.refresh()
assert(client.alpha(reviveFrame) == 0, "An absent pet activated the Revive Pet highlight.")
client.petExists = true
client.refresh()
assert(client.alpha(reviveFrame) == 1, "A replacement living pet has no Revive Pet highlight.")
for _, usable in ipairs({ true, false }) do
    actions[button.action].isUsable = usable
    client.event("ACTION_USABLE_CHANGED")
    assert(client.alpha(reviveFrame) == 1, "Action usability changed the Revive Pet highlight.")
end
for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
    client.event(event)
    client.refresh()
    assert(client.alpha(reviveFrame) == 1)
end
button.scale = 1.5
client.refresh()
assert(reviveFrame.parent.width == 54 and reviveFrame.parent.height == 54)
button.visible = false
client.refresh()
assert(client.alpha(reviveFrame) == 0, "A hidden button retained the Revive Pet highlight.")
button.visible = true
client.refresh()
assert(client.alpha(reviveFrame) == 1)
client.baseSpellIDs[999013] = 982
setAction({ spellID = 999013, isUsable = false })
assert(client.alpha(reviveFrame) == 1, "A Revive Pet override has no living-pet highlight.")
for _, spellID in ipairs({ 23499, 439956 }) do
    setAction({ spellID = spellID })
    assert(client.alpha(reviveFrame) == 0, "An unrelated Revive Pet spell selected the player rule.")
end
setAction({ spellID = 982, isUsable = false })
assert(client.alpha(reviveFrame) == 1)
button.action = 1
actions[1] = { spellID = 1495, isUsable = false }
client.refresh()
assert(client.alpha(reviveFrame) == 0, "Action paging retained the Revive Pet highlight.")
setAction({ spellID = 982, isUsable = false })
assert(client.alpha(reviveFrame) == 1)
setAction(nil)
assert(client.alpha(reviveFrame) == 0 and not client.getSpellGlow())

client.items[1251] = { classID = 0, subClassID = 7 }
client.targetFriendly = false
setAction({ itemID = 1251 })
local bandageContainer = client.getContainer("player", "bandage-poison")
local bandageAnimation = bandageContainer.slots["bandage-poison"].animation
local bandageFade = bandageAnimation.animations[1]
for _, container in ipairs({ serpentWarningContainer, viperWarningContainer, scorpidWarningContainer }) do
    for _, slot in pairs(container.slots) do
        assert(not slot.enabled and not container.enabled and client.alpha(container) == 0)
        assert(slot.animation.looping == bandageAnimation.looping)
        local fade = slot.animation.animations[1]
        assert(fade.fromAlpha == bandageFade.fromAlpha and fade.toAlpha == bandageFade.toAlpha and fade.duration == bandageFade.duration)
    end
end

assert(#Prism.classRules.HUNTER == 17, "The Hunter class rules are incomplete.")
print("Hunter tests passed.")
