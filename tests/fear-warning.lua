local client = dofile("tests/client.lua")
local actions = client.actions
local addActionButton = client.addActionButton
local refresh = client.refresh
local getContainer = client.getContainer
client.items[1251] = { classID = 0, subClassID = 7 }

local button = addActionButton("ActionButton1", 1)
actions[1] = { spellID = 5246 }
client.loadAddon()
refresh()

local container = getContainer("target", "fear-break")
assert(container, "Intimidating Shout has no secure target warning slot.")
assert(container.template == "CustomAuraContainerTemplate")
assert(container.enabled and client.alpha(container) == 1)
local slot = container.slots["fear-break"]
assert(slot.enabled and slot.filter == "HARMFUL", "The warning must include debuffs from any caster.")
assert(slot.candidateFilters.isFromPlayerOrPlayerPet == nil)

local expectedAuraIDs = {
    [772] = true,
    [6546] = true,
    [6547] = true,
    [6548] = true,
    [11572] = true,
    [11573] = true,
    [11574] = true,
    [412609] = true,
}
for spellID in pairs(expectedAuraIDs) do
    assert(slot.candidateFilters.includeSpellIDs[spellID], "The warning filter excludes a required aura.")
end
for spellID in pairs(slot.candidateFilters.includeSpellIDs) do
    assert(expectedAuraIDs[spellID], "The warning filter includes an unrelated spell.")
end
assert(slot.texture.color[1] == 1 and slot.texture.color[2] == 0 and slot.texture.color[3] == 0)
assert(slot.animation.looping == "BOUNCE")
assert(slot.animation.animations[1].animationType == "Alpha")
assert(slot.animation.animations[1].fromAlpha == 0.2)
assert(slot.animation.animations[1].toAlpha == 1)
assert(slot.animation.animations[1].duration == 0.4)

local filterChanges = container.filterChangeCount
local slotChanges = container.slotChangeCount
refresh()
assert(container.filterChangeCount == filterChanges, "An unchanged filter caused an aura refresh.")
assert(container.slotChangeCount == slotChanges, "An unchanged slot caused an aura refresh.")

actions[1].isUsable = false
refresh()
assert(client.alpha(container) == 0, "The warning remained visible while Intimidating Shout was unusable.")
assert(slot.enabled, "Usability disabled the secure aura slot.")
assert(container.filterChangeCount == filterChanges, "A usability change caused an aura refresh.")
assert(container.slotChangeCount == slotChanges, "A usability change caused an aura refresh.")
actions[1].isUsable = true
refresh()
assert(client.alpha(container) == 1, "The warning did not return when Intimidating Shout became usable.")
actions[1].isUsable = false
client.event("ACTION_USABLE_CHANGED")
assert(client.alpha(container) == 0, "The usability event did not hide the warning.")
actions[1].isUsable = true
client.event("ACTION_USABLE_CHANGED")
assert(client.alpha(container) == 1, "The usability event did not restore the warning.")

local refreshCount = container.refreshCount
client.event("PLAYER_TARGET_CHANGED")
assert(container.refreshCount > refreshCount, "A target change did not refresh the secure container.")
client.event("PLAYER_REGEN_DISABLED")
client.event("PLAYER_REGEN_ENABLED")
assert(slot.enabled and client.alpha(container) == 1)

button.scale = 1.5
refresh()
assert(container.width == 54 and container.height == 54)
assert(container.padding[1] == 54 and container.padding[3] == 54)
assert(container.point[4] == 15 and container.point[5] == 30)

actions[1].isUsable = false
refresh()
actions[1] = { spellID = 772 }
refresh()
local rendContainer = getContainer("target", "own-rend")
assert(not slot.enabled and rendContainer.slots["own-rend"].enabled)
assert(rendContainer.slots["own-rend"].filter == "HARMFUL|PLAYER")
assert(client.alpha(rendContainer) == 1, "The unusable shout left the Rend highlight hidden.")
actions[1] = { spellID = 5246, isUsable = false }
refresh()
assert(slot.enabled and not rendContainer.slots["own-rend"].enabled)
assert(client.alpha(container) == 0, "The Rend highlight left the unusable shout warning visible.")
actions[1].isUsable = true
refresh()
assert(client.alpha(container) == 1)
actions[1] = { spellID = 20511 }
refresh()
assert(not slot.enabled and client.alpha(container) == 0, "The fear aura was treated as the action spell.")
actions[1] = nil
refresh()
assert(not slot.enabled and client.alpha(container) == 0)

actions[1] = { spellID = 5246 }
refresh()
button.visible = false
refresh()
assert(client.alpha(container) == 0, "The warning remained visible over a hidden action bar.")
button.visible = true
refresh()
assert(client.alpha(container) == 1)

local secondButton = addActionButton("ActionButton2", 2)
secondButton.left = 60
actions[1] = { spellID = 772 }
actions[2] = { spellID = 5246 }
refresh()
local movedContainer = getContainer("target", "fear-break")
assert(movedContainer ~= container and client.alpha(movedContainer) == 1)
assert(movedContainer.point[4] == 60)
assert(not slot.enabled and movedContainer.slots["fear-break"].enabled)

addActionButton("ActionButton3", 3)
actions[3] = { itemID = 1251 }
refresh()
local bandageContainer = getContainer("player", "bandage-poison")
assert(bandageContainer, "The bandage warning no longer exists.")
local bandageAnimation = bandageContainer.slots["bandage-poison"].animation
assert(bandageAnimation.looping == slot.animation.looping)
local bandageFade = bandageAnimation.animations[1]
local fearFade = slot.animation.animations[1]
assert(bandageFade.fromAlpha == fearFade.fromAlpha)
assert(bandageFade.toAlpha == fearFade.toAlpha)
assert(bandageFade.duration == fearFade.duration)

print("Fear warning tests passed.")
