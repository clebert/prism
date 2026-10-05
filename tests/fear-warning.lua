local frames = {}
local actions = {}
local controller
local frameMethods = {}
local animationMethods = {}

local function ignore()
end

local function newFrame(frameType, name, parent, template)
    local frame = {
        frameType = frameType,
        name = name,
        parent = parent,
        template = template,
        alpha = 1,
        visible = true,
        scale = 1,
        left = 10,
        bottom = 20,
        width = 36,
        height = 36,
        slots = {},
        textures = {},
        scripts = {},
        refreshCount = 0,
        filterChangeCount = 0,
        slotChangeCount = 0,
    }
    setmetatable(frame, {
        __index = function(self, key)
            assert(not rawget(self, "restricted"), "Addon code accessed a restricted aura frame.")
            return frameMethods[key]
        end,
    })
    frames[#frames + 1] = frame
    return frame
end

local function newAnimationGroup()
    return setmetatable({ animations = {} }, { __index = animationMethods })
end

frameMethods.EnableMouse = ignore
frameMethods.SetAllPoints = ignore
frameMethods.SetTexture = ignore
frameMethods.SetBlendMode = ignore
frameMethods.SetFrameStrata = ignore
frameMethods.ClearAllPoints = ignore
frameMethods.RegisterEvent = ignore

function frameMethods:SetVertexColor(red, green, blue)
    self.color = { red, green, blue }
end

function frameMethods:SetAlpha(alpha)
    assert(self.frameType ~= "CheckButton", "Addon code changed an action button.")
    self.alpha = alpha
end

function frameMethods:SetAlphaFromBoolean(value, trueAlpha, falseAlpha)
    self:SetAlpha(value and trueAlpha or falseAlpha)
end

function frameMethods:GetAlpha()
    return self.alpha
end

function frameMethods:Show()
    self.visible = true
end

function frameMethods:Hide()
    self.visible = false
end

function frameMethods:IsVisible()
    return self.visible
end

frameMethods.IsShown = frameMethods.IsVisible

function frameMethods:GetName()
    return self.name
end

function frameMethods:GetEffectiveScale()
    return self.scale
end

function frameMethods:GetLeft()
    return self.left
end

function frameMethods:GetBottom()
    return self.bottom
end

function frameMethods:GetWidth()
    return self.width
end

function frameMethods:GetHeight()
    return self.height
end

function frameMethods:GetFrameLevel()
    return self.frameLevel or 0
end

function frameMethods:SetFrameLevel(level)
    self.frameLevel = level
end

function frameMethods:SetPoint(...)
    self.point = { ... }
end

function frameMethods:SetSize(width, height)
    self.width = width
    self.height = height
end

function frameMethods:SetFlowLayoutPadding(...)
    self.padding = { ... }
end

function frameMethods:SetScript(script, callback)
    self.scripts[script] = callback
end

function frameMethods:CreateTexture()
    local texture = newFrame("Texture", nil, self)
    self.textures[#self.textures + 1] = texture
    return texture
end

function frameMethods:CreateAnimationGroup()
    return newAnimationGroup()
end

function frameMethods:AddAuraShownAnimation(animation)
    self.auraAnimation = animation
end

function frameMethods:SetUnit(unit)
    self.unit = unit
end

function frameMethods:SetEnabled(enabled)
    self.enabled = enabled
end

function frameMethods:UpdateAllAuras()
    self.refreshCount = self.refreshCount + 1
end

function frameMethods:AddAuraSlot(key, filter, options)
    assert(not self.slots[key], "The aura slot already exists.")
    local auraFrame = newFrame("AuraButton", nil, self)
    options.initializeFrame(auraFrame)
    self.slots[key] = {
        filter = filter,
        candidateFilters = options.candidateFilters,
        texture = auraFrame.textures[1],
        animation = auraFrame.auraAnimation,
        enabled = true,
    }
    auraFrame.restricted = true
end

function frameMethods:SetAuraSlotCandidateFilters(key, filters)
    self.slots[key].candidateFilters = filters
    self.filterChangeCount = self.filterChangeCount + 1
end

function frameMethods:SetAuraSlotEnabled(key, enabled)
    self.slots[key].enabled = enabled
    self.slotChangeCount = self.slotChangeCount + 1
end

function animationMethods:SetLooping(mode)
    self.looping = mode
end

function animationMethods:CreateAnimation(animationType)
    local animation = setmetatable({ animationType = animationType }, { __index = animationMethods })
    self.animations[#self.animations + 1] = animation
    return animation
end

function animationMethods:SetFromAlpha(alpha)
    self.fromAlpha = alpha
end

function animationMethods:SetToAlpha(alpha)
    self.toAlpha = alpha
end

function animationMethods:SetDuration(duration)
    self.duration = duration
end

animationMethods.Stop = ignore

function CreateFrame(frameType, name, parent, template)
    local frame = newFrame(frameType, name, parent, template)
    if template == "ActionButtonSpellAlertTemplate" then
        frame.ProcLoop = newAnimationGroup()
    elseif frameType == "Frame" and not parent then
        controller = frame
    end
    return frame
end

UIParent = newFrame("Frame", "UIParent")
Enum = {
    LuaCurveType = { Step = 1 },
    ItemClass = { Consumable = 0 },
    ItemConsumableSubclass = { Bandage = 7 },
}
C_CurveUtil = {
    CreateCurve = function()
        return { SetType = ignore, AddPoint = ignore }
    end,
}
C_Spell = { GetBaseSpell = function(spellID) return spellID end }
C_ActionBar = {
    HasAction = function(slot) return actions[slot] ~= nil end,
    GetSpell = function(slot) return actions[slot].spellID end,
    IsUsableAction = function(slot) return actions[slot].isUsable ~= false end,
}
C_Item = { GetItemInfoInstant = function() return nil, nil, nil, nil, nil, 0, 7 end }
C_UnitAuras = setmetatable({}, {
    __index = function()
        error("Addon code read aura data directly.")
    end,
})

function GetActionInfo(slot)
    local action = actions[slot]
    return action.itemID and "item" or "spell", action.itemID or action.spellID
end

function UnitExists()
    return true
end

function UnitCanAssist()
    return false
end

function UnitIsDeadOrGhost()
    return false
end

function UnitHealthPercent()
    return 0
end

local function addActionButton(name, action)
    local button = newFrame("CheckButton", name)
    button.action = action
    _G[name] = button
    return button
end

local function refresh()
    controller.scripts.OnUpdate(controller, 0.1)
end

local function getContainer(unit, slotKey)
    for index = #frames, 1, -1 do
        local frame = frames[index]
        if frame.frameType == "AuraContainer" and frame.unit == unit and frame.slots[slotKey] then
            return frame
        end
    end
end

local button = addActionButton("ActionButton1", 1)
actions[1] = { spellID = 5246 }
dofile("Prism.lua")
refresh()

local container = getContainer("target", "fear-break")
assert(container, "Intimidating Shout has no secure target warning slot.")
assert(container.template == "CustomAuraContainerTemplate")
assert(container.enabled and container.alpha == 1)
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
assert(container.alpha == 0, "The warning remained visible while Intimidating Shout was unusable.")
assert(slot.enabled, "Usability disabled the secure aura slot.")
assert(container.filterChangeCount == filterChanges, "A usability change caused an aura refresh.")
assert(container.slotChangeCount == slotChanges, "A usability change caused an aura refresh.")
actions[1].isUsable = true
refresh()
assert(container.alpha == 1, "The warning did not return when Intimidating Shout became usable.")
actions[1].isUsable = false
controller.scripts.OnEvent(controller, "ACTION_USABLE_CHANGED")
assert(container.alpha == 0, "The usability event did not hide the warning.")
actions[1].isUsable = true
controller.scripts.OnEvent(controller, "ACTION_USABLE_CHANGED")
assert(container.alpha == 1, "The usability event did not restore the warning.")

local refreshCount = container.refreshCount
controller.scripts.OnEvent(controller, "PLAYER_TARGET_CHANGED")
assert(container.refreshCount > refreshCount, "A target change did not refresh the secure container.")
controller.scripts.OnEvent(controller, "PLAYER_REGEN_DISABLED")
controller.scripts.OnEvent(controller, "PLAYER_REGEN_ENABLED")
assert(slot.enabled and container.alpha == 1)

button.scale = 1.5
refresh()
assert(container.width == 54 and container.height == 54)
assert(container.padding[1] == 54 and container.padding[3] == 54)
assert(container.point[4] == 15 and container.point[5] == 30)

actions[1].isUsable = false
refresh()
actions[1] = { spellID = 772 }
refresh()
assert(not slot.enabled and container.slots["own-rend"].enabled)
assert(container.slots["own-rend"].filter == "HARMFUL|PLAYER")
assert(container.alpha == 1, "The unusable shout left the Rend highlight hidden.")
actions[1] = { spellID = 5246, isUsable = false }
refresh()
assert(slot.enabled and not container.slots["own-rend"].enabled)
assert(container.alpha == 0, "The Rend highlight left the unusable shout warning visible.")
actions[1].isUsable = true
refresh()
assert(container.alpha == 1)
actions[1] = { spellID = 20511 }
refresh()
assert(not slot.enabled and container.alpha == 0, "The fear aura was treated as the action spell.")
actions[1] = nil
refresh()
assert(not slot.enabled and container.alpha == 0)

actions[1] = { spellID = 5246 }
refresh()
button.visible = false
refresh()
assert(container.alpha == 0, "The warning remained visible over a hidden action bar.")
button.visible = true
refresh()
assert(container.alpha == 1)

local secondButton = addActionButton("ActionButton2", 2)
secondButton.left = 60
actions[1] = { spellID = 772 }
actions[2] = { spellID = 5246 }
refresh()
local movedContainer = getContainer("target", "fear-break")
assert(movedContainer ~= container and movedContainer.alpha == 1)
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
