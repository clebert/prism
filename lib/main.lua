--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        local value = nil
        if (select("#", ...) > 0) then value = module(...) else value = module(file) end
        ____moduleCache[file] = { value = value }
        return value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["action-buttons"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getActionSpellId(button)
    local actionSlotId = button.action
    if actionSlotId == nil or actionSlotId <= 0 or not C_ActionBar.HasAction(actionSlotId) then
        return nil
    end
    local spellId = C_ActionBar.GetSpell(actionSlotId)
    return spellId > 0 and spellId or nil
end
function ____exports.isActionButton(value)
    if type(value) ~= "table" or value == nil then
        return false
    end
    if not (value.GetName ~= nil) or not (value.IsVisible ~= nil) or not (value.SetChecked ~= nil) then
        return false
    end
    return type(value.GetName) == "function" and type(value.IsVisible) == "function" and type(value.SetChecked) == "function"
end
local buttonNamePrefixes = {
    "ActionButton",
    "MultiBarBottomLeftButton",
    "MultiBarBottomRightButton",
    "MultiBarRightButton",
    "MultiBarLeftButton",
    "MultiBar5Button",
    "MultiBar6Button",
    "MultiBar7Button"
}
local buttonsPerBar = 12
local cache
function ____exports.getVisibleActionButtons()
    local time = GetTime()
    local cached = cache
    if cached ~= nil and cached.time == time then
        return cached.buttons
    end
    local buttons = {}
    for ____, prefix in ipairs(buttonNamePrefixes) do
        do
            local index = 1
            while index <= buttonsPerBar do
                local value = rawget(
                    _G,
                    prefix .. tostring(index)
                )
                if ____exports.isActionButton(value) and value:IsVisible() then
                    buttons[#buttons + 1] = {
                        button = value,
                        spellId = ____exports.getActionSpellId(value)
                    }
                end
                index = index + 1
            end
        end
    end
    cache = {buttons = buttons, time = time}
    return buttons
end
return ____exports
 end,
["button-overlay"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getButtonOverlay, placeOverlay, overlays, rects
function getButtonOverlay(button)
    local name = button:GetName()
    local existing = overlays[name]
    if existing ~= nil then
        return existing
    end
    local frame = CreateFrame("Frame", nil, UIParent)
    frame:SetFrameStrata("TOOLTIP")
    frame:SetFrameLevel(10000)
    frame:EnableMouse(false)
    frame:Show()
    local dim = frame:CreateTexture(nil, "ARTWORK", nil, 0)
    local checked = frame:CreateTexture(nil, "OVERLAY", nil, 1)
    if dim == nil or checked == nil then
        return nil
    end
    dim:SetAllPoints()
    dim:SetColorTexture(0, 0, 0, 0.55)
    dim:Show()
    checked:SetAllPoints()
    checked:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    checked:SetBlendMode("ADD")
    checked:Show()
    local overlay = {checked = checked, dim = dim, frame = frame}
    overlays[name] = overlay
    return overlay
end
function placeOverlay(frame, button, name)
    local left = button:GetLeft()
    local bottom = button:GetBottom()
    if left ~= nil and bottom ~= nil then
        local scale = button:GetEffectiveScale() / UIParent:GetEffectiveScale()
        rects[name] = {
            bottom = bottom * scale,
            height = button:GetHeight() * scale,
            left = left * scale,
            width = button:GetWidth() * scale
        }
    end
    local rect = rects[name]
    if rect == nil then
        return
    end
    frame:ClearAllPoints()
    frame:SetPoint(
        "BOTTOMLEFT",
        UIParent,
        "BOTTOMLEFT",
        rect.left,
        rect.bottom
    )
    frame:SetSize(rect.width, rect.height)
end
overlays = {}
rects = {}
local seenNames = {}
function ____exports.beginOverlayUpdate()
    for name in pairs(overlays) do
        seenNames[name] = nil
    end
end
function ____exports.endOverlayUpdate()
    for name in pairs(overlays) do
        do
            local __continue6
            repeat
                if seenNames[name] == true then
                    __continue6 = true
                    break
                end
                local overlay = overlays[name]
                if overlay ~= nil then
                    overlay.frame:SetAlpha(0)
                end
                __continue6 = true
            until true
            if not __continue6 then
                break
            end
        end
    end
end
function ____exports.setButtonOverlay(button, appearance)
    local overlay = getButtonOverlay(button)
    if overlay == nil then
        return
    end
    local name = button:GetName()
    seenNames[name] = true
    placeOverlay(overlay.frame, button, name)
    if appearance == nil then
        overlay.frame:SetAlpha(0)
        return
    end
    overlay.frame:SetAlpha(1)
    overlay.checked:SetAlpha(appearance.checked and 1 or 0)
    overlay.dim:SetAlpha(appearance.dimmed and 1 or 0)
end
return ____exports
 end,
["self-buff-rule"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasPlayerAura
local ____button_2Doverlay = require("button-overlay")
local setButtonOverlay = ____button_2Doverlay.setButtonOverlay
function hasPlayerAura(spellId)
    if C_UnitAuras.GetPlayerAuraBySpellID(spellId) ~= nil then
        return true
    end
    local spellName = C_Spell.GetSpellName(spellId)
    if spellName == nil then
        return false
    end
    return C_UnitAuras.GetAuraDataBySpellName("player", spellName, "HELPFUL") ~= nil
end
function ____exports.selfBuffAppearance(hasPlayerAura)
    if not hasPlayerAura then
        return nil
    end
    return {checked = true, dimmed = true}
end
function ____exports.applySelfBuffRule(button, spellId)
    setButtonOverlay(
        button,
        ____exports.selfBuffAppearance(spellId ~= nil and hasPlayerAura(spellId))
    )
end
return ____exports
 end,
["action-bar-controller"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____action_2Dbuttons = require("action-buttons")
local getVisibleActionButtons = ____action_2Dbuttons.getVisibleActionButtons
local ____button_2Doverlay = require("button-overlay")
local beginOverlayUpdate = ____button_2Doverlay.beginOverlayUpdate
local endOverlayUpdate = ____button_2Doverlay.endOverlayUpdate
local ____self_2Dbuff_2Drule = require("self-buff-rule")
local applySelfBuffRule = ____self_2Dbuff_2Drule.applySelfBuffRule
function ____exports.startActionBarController()
    local frame = CreateFrame("Frame")
    frame:SetScript(
        "OnUpdate",
        function()
            beginOverlayUpdate()
            for ____, actionButton in ipairs(getVisibleActionButtons()) do
                applySelfBuffRule(actionButton.button, actionButton.spellId)
            end
            endOverlayUpdate()
        end
    )
end
return ____exports
 end,
["main"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____action_2Dbar_2Dcontroller = require("action-bar-controller")
local startActionBarController = ____action_2Dbar_2Dcontroller.startActionBarController
startActionBarController()
return ____exports
 end,
}
return require("main", ...)
