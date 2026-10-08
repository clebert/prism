local client = {
    frames = {},
    actions = {},
    actionQueryCount = {},
    items = {},
    baseSpellIDs = {},
    class = arg[1] or "WARRIOR",
    targetExists = true,
    targetFriendly = false,
    targetHostile = true,
    petExists = false,
    deadUnits = {},
    fullHealthUnits = {},
    healthQueryCount = {},
    threatStatus = 3,
    isTanking = true,
}
local frameMethods = {}
local animationMethods = {}

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
        animationGroups = {},
        scripts = {},
        events = {},
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
    client.frames[#client.frames + 1] = frame
    return frame
end

local function newAnimationGroup()
    return setmetatable({ animations = {} }, { __index = animationMethods })
end

function frameMethods:EnableMouse(enabled)
    self.mouseEnabled = enabled
end

function frameMethods:SetAllPoints(region)
    self.allPoints = region or self.parent
end

function frameMethods:SetTexture(texture)
    self.texture = texture
end

function frameMethods:SetBlendMode(mode)
    self.blendMode = mode
end

function frameMethods:SetFrameStrata(strata)
    self.strata = strata
end

function frameMethods:ClearAllPoints()
    self.point = nil
    self.allPoints = nil
end

function frameMethods:RegisterEvent(event)
    self.events[event] = true
end

function frameMethods:SetVertexColor(red, green, blue)
    self.color = { red, green, blue }
end

function frameMethods:SetAlpha(alpha)
    assert(self.frameType ~= "CheckButton", "Addon code changed an action button.")
    self.alpha = alpha
    if type(alpha) == "table" and alpha.healthUnit then
        client.healthTexture = self
    end
end

function frameMethods:SetAlphaFromBoolean(value, trueAlpha, falseAlpha)
    self.booleanInput = value
    if type(value) == "table" then
        value = value.boolean
    end
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
    assert(self.frameType ~= "CheckButton", "Addon code resized an action button.")
    self.width = width
    self.height = height
end

function frameMethods:SetFlowLayoutPadding(...)
    self.padding = { ... }
end

function frameMethods:SetScript(script, callback)
    self.scripts[script] = callback
end

function frameMethods:CreateTexture(name, layer, template, subLevel)
    local texture = newFrame("Texture", name, self, template)
    texture.drawLayer = layer
    texture.subLevel = subLevel
    self.textures[#self.textures + 1] = texture
    return texture
end

function frameMethods:CreateAnimationGroup()
    local animation = newAnimationGroup()
    self.animationGroups[#self.animationGroups + 1] = animation
    return animation
end

function frameMethods:AddAuraShownAnimation(animation)
    self.auraAnimation = animation
end

function frameMethods:SetApplicationBar(bar, options)
    self.applicationBar = bar
    self.applicationOptions = options
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
        frame = auraFrame,
        filter = filter,
        candidateFilters = options.candidateFilters,
        texture = auraFrame.textures[1],
        animation = auraFrame.auraAnimation,
        applicationBar = auraFrame.applicationBar,
        applicationOptions = auraFrame.applicationOptions,
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

function animationMethods:Play()
    self.playing = true
end

function animationMethods:Stop()
    self.playing = false
end

function animationMethods:IsPlaying()
    return self.playing == true
end

function CreateFrame(frameType, name, parent, template)
    local frame = newFrame(frameType, name, parent, template)
    if template == "ActionButtonSpellAlertTemplate" then
        frame.ProcLoop = newAnimationGroup()
    elseif frameType == "Frame" and not parent then
        client.controller = frame
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
        local curve = { points = {} }
        function curve:SetType(curveType)
            self.curveType = curveType
        end
        function curve:AddPoint(x, y)
            self.points[#self.points + 1] = { x, y }
        end
        return curve
    end,
}
C_Spell = { GetBaseSpell = function(spellID) return client.baseSpellIDs[spellID] or spellID end }
C_ActionBar = {
    HasAction = function(slot)
        client.actionQueryCount[slot] = (client.actionQueryCount[slot] or 0) + 1
        return client.actions[slot] ~= nil
    end,
    GetSpell = function(slot) return client.actions[slot].spellID end,
    IsUsableAction = function(slot)
        return { boolean = client.actions[slot].isUsable ~= false }
    end,
}
C_Item = {
    GetItemInfoInstant = function(itemID)
        local item = client.items[itemID]
        if item then
            return nil, nil, nil, nil, nil, item.classID, item.subClassID
        end
    end,
}
C_UnitAuras = setmetatable({}, {
    __index = function()
        error("Addon code read aura data directly.")
    end,
})

function GetActionInfo(slot)
    local action = client.actions[slot]
    return action.itemID and "item" or "spell", action.itemID or action.spellID
end

function UnitClass()
    return client.class, client.class
end

function UnitExists(unit)
    if unit == "target" then
        return client.targetExists
    end

    if unit == "pet" then
        return client.petExists
    end

    return true
end

function UnitCanAssist()
    return client.targetFriendly
end

function UnitCanAttack()
    return client.targetHostile
end

function UnitIsDeadOrGhost(unit)
    return client.deadUnits[unit] == true
end

function UnitHealthPercent(unit, usePredicted, curve)
    client.healthQueryCount[unit] = (client.healthQueryCount[unit] or 0) + 1
    assert(usePredicted == false)
    assert(curve.curveType == Enum.LuaCurveType.Step)
    assert(curve.points[1][1] == 0 and curve.points[1][2] == 0)
    assert(curve.points[2][1] == 1 and curve.points[2][2] == 1)
    return { healthUnit = unit, alpha = client.fullHealthUnits[unit] and 1 or 0 }
end

function UnitCastingInfo()
    if client.targetCasting then
        return "Cast", nil, nil, nil, nil, false
    end
end

function UnitChannelInfo()
    if client.targetChanneling then
        return "Channel", nil, nil, nil, nil, false
    end
end

function UnitThreatSituation()
    return client.threatStatus
end

function UnitDetailedThreatSituation()
    return { boolean = client.isTanking }
end

function client.addActionButton(name, action)
    local button = newFrame("CheckButton", name)
    button.action = action
    _G[name] = button
    return button
end

function client.loadAddon()
    local namespace = {}
    for line in io.lines("Prism.toc") do
        if line:match("%.lua$") then
            assert(loadfile(line))("Prism", namespace)
        end
    end
    return namespace
end

function client.refresh(elapsed)
    client.controller.scripts.OnUpdate(client.controller, elapsed or 0.1)
end

function client.event(event)
    assert(client.controller.events[event], "The controller did not register " .. event .. ".")
    client.controller.scripts.OnEvent(client.controller, event)
end

function client.getContainer(unit, slotKey)
    for index = #client.frames, 1, -1 do
        local frame = client.frames[index]
        if frame.frameType == "AuraContainer" and frame.unit == unit and frame.slots[slotKey] then
            return frame
        end
    end
end

function client.alpha(frame)
    local alpha = frame.alpha
    if type(alpha) == "table" then
        alpha = alpha.alpha
    end
    if not frame.visible then
        return 0
    end
    if frame.parent then
        return alpha * client.alpha(frame.parent)
    end
    return alpha
end

function client.getSpellGlow()
    for index = #client.frames, 1, -1 do
        local frame = client.frames[index]
        if rawget(frame, "template") == "ActionButtonSpellAlertTemplate" and client.alpha(frame) > 0 then
            return frame
        end
    end
end

return client
