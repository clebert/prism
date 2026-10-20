local client = {
    frames = {},
    actions = {},
    actionQueryCount = {},
    items = {},
    baseSpellIDs = {},
    helpfulSpells = {},
    selfBuffSpells = {},
    class = arg[1] or "UNSUPPORTED",
    targetExists = true,
    targetFriendly = false,
    targetHostile = true,
    targetIsPlayer = false,
    petExists = false,
    petHappiness = 3,
    happinessQueryCount = 0,
    combatUnits = {},
    deadUnits = {},
    fullHealthUnits = {},
    healthQueryCount = {},
    fullManaUnits = {},
    manaQueryCount = {},
    powers = {},
    maxPowers = {},
    powerQueryCount = {},
    powerMaxQueryCount = {},
    curves = {},
    comboPoints = 0,
    threatStatus = 3,
    isTanking = true,
}
local frameMethods = {}
local animationMethods = {}

local function updateLayout(container)
    local width, height = 1, 1
    for _, group in pairs(container.groups) do
        local active = group.enabled and group.auraPresent and container.enabled ~= false
        group.frame.visible = active
        if active then
            width = math.max(width, group.layout.elementWidth)
            height = math.max(height, group.layout.elementHeight)
        end
    end
    container.width, container.height = width, height
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
        groups = {},
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
            local owner = rawget(self, "auraOwner") or rawget(self, "parent")
            while client.combatUnits.player and owner do
                assert(not rawget(owner, "restricted"), "Addon code accessed a forbidden aura-owned object during combat.")
                owner = rawget(owner, "parent")
            end
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

function frameMethods:SetTexture(texture, horizontalWrap, verticalWrap)
    self.texture = texture
    self.horizontalWrap = horizontalWrap
    self.verticalWrap = verticalWrap
end

function frameMethods:SetColorTexture(red, green, blue, alpha)
    self.color = { red, green, blue, alpha }
end

function frameMethods:SetText(text)
    self.text = text
end

function frameMethods:SetJustifyH(justification)
    self.justification = justification
end

function frameMethods:SetTexCoord(left, right, bottom, top)
    self.texCoords = { left, right, bottom, top }
end

function frameMethods:AddMaskTexture(mask)
    self.masks = self.masks or {}
    self.masks[#self.masks + 1] = mask
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

function frameMethods:IsShown()
    if self.secretShown then
        return { boolean = self.visible }
    end
    return self.visible
end

function frameMethods:GetParent()
    return self.parent
end

function frameMethods:SetParent(parent)
    self.parent = parent
end

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
    if self.secureLayout then
        self.layoutQueryCount = (self.layoutQueryCount or 0) + 1
    end
    return self.width
end

function frameMethods:GetHeight()
    if self.secureLayout then
        self.layoutQueryCount = (self.layoutQueryCount or 0) + 1
    end
    return self.height
end

function frameMethods:GetFrameLevel()
    return self.frameLevel or 0
end

function frameMethods:SetFrameLevel(level)
    self.frameLevel = level
end

function frameMethods:SetPoint(...)
    local relative = select(2, ...)
    if type(relative) == "table" and rawget(relative, "secureLayout") then
        assert(self.secureLayout or (self.template and self.template:find("DisableUntrustedLayoutScriptsTemplate", 1, true)), "The secure layout anchor requires its template.")
    end
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

function frameMethods:CreateFontString(name, layer, template)
    local label = newFrame("FontString", name, self, template)
    label.drawLayer = layer
    return label
end

function frameMethods:CreateTexture(name, layer, template, subLevel)
    local texture = newFrame("Texture", name, self, template)
    texture.drawLayer = layer
    texture.subLevel = subLevel
    self.textures[#self.textures + 1] = texture
    return texture
end

function frameMethods:CreateMaskTexture(name, layer, template, subLevel)
    local mask = newFrame("MaskTexture", name, self, template)
    mask.drawLayer = layer
    mask.subLevel = subLevel
    self.maskTextures = self.maskTextures or {}
    self.maskTextures[#self.maskTextures + 1] = mask
    return mask
end

function frameMethods:CreateAnimationGroup()
    local animation = newAnimationGroup()
    self.animationGroups[#self.animationGroups + 1] = animation
    return animation
end

function frameMethods:AddAuraShownAnimation(animation)
    self.auraAnimation = animation
end

function frameMethods:AddDispelTypeTexture(texture, options)
    assert(options.showAlways and options.style == Enum.CustomAuraButtonDispelTypeTextureStyle.PreserveAsset)
    assert(texture.parent == self and not texture.texture, "The presence texture must have no asset.")
    texture.secretShown = true
    texture.auraOwner = self
    self.presenceTexture = texture
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
    if self.secureLayout then
        updateLayout(self)
    end
end

function frameMethods:UpdateAllAuras()
    self.refreshCount = self.refreshCount + 1
end

function frameMethods:AddAuraGroup(key, filter, options)
    assert(not self.groups[key], "The aura group already exists.")
    local marker = newFrame("AuraButton", nil, self)
    if options.initializeFrame then
        options.initializeFrame(marker)
    end
    marker.restricted = true
    self.groups[key] = {
        key = key,
        container = self,
        frame = marker,
        filter = filter,
        candidateFilters = options.candidateFilters,
        maxFrameCount = options.maxFrameCount,
        layout = options.layout,
        enabled = true,
        auraPresent = true,
    }
    self.secureLayout = true
    updateLayout(self)
end

function frameMethods:SetAuraGroupLayout(key, layout)
    self.groups[key].layout = layout
    self.layoutChangeCount = (self.layoutChangeCount or 0) + 1
    updateLayout(self)
end

function frameMethods:SetAuraGroupEnabled(key, enabled)
    self.groups[key].enabled = enabled
    self.groupChangeCount = (self.groupChangeCount or 0) + 1
    updateLayout(self)
end

function frameMethods:SetAuraGroupCandidateFilters(key, filters)
    self.groups[key].candidateFilters = filters
    self.filterChangeCount = self.filterChangeCount + 1
end

function frameMethods:AddAuraSlot(key, filter, options)
    assert(not self.slots[key], "The aura slot already exists.")
    local auraFrame = newFrame("AuraButton", nil, self)
    options.initializeFrame(auraFrame)
    local visualTexture
    for _, texture in ipairs(auraFrame.textures) do
        if texture.texture then
            visualTexture = texture
            break
        end
    end
    self.slots[key] = {
        key = key,
        container = self,
        frame = auraFrame,
        filter = filter,
        candidateFilters = options.candidateFilters,
        texture = visualTexture,
        presenceTexture = auraFrame.presenceTexture,
        animation = auraFrame.auraAnimation,
        applicationBar = auraFrame.applicationBar,
        applicationOptions = auraFrame.applicationOptions,
        enabled = true,
    }
    client.setAuraPresent(self.slots[key], true)
    auraFrame.restricted = true
end

function frameMethods:SetAuraSlotCandidateFilters(key, filters)
    self.slots[key].candidateFilters = filters
    self.filterChangeCount = self.filterChangeCount + 1
end

function frameMethods:SetAuraSlotEnabled(key, enabled)
    local slot = self.slots[key]
    slot.enabled = enabled
    client.setAuraPresent(slot, slot.auraPresent)
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
    if template and template:find("ActionButtonSpellAlertTemplate", 1, true) then
        frame.ProcLoop = newAnimationGroup()
        -- Template regions are not addon-created frames.
        for _, key in ipairs({ "ProcStartFlipbook", "ProcLoopFlipbook", "ProcAltGlow" }) do
            frame[key] = setmetatable({
                frameType = "Texture",
                parent = frame,
                alpha = 1,
                visible = key == "ProcLoopFlipbook",
            }, { __index = frameMethods })
        end
    elseif frameType == "Frame" and not parent then
        client.controller = frame
    end
    return frame
end

UIParent = newFrame("Frame", "UIParent")
UIParent.left, UIParent.bottom, UIParent.width, UIParent.height = 0, 0, 1920, 1080
Enum = {
    CustomAuraButtonDispelTypeTextureStyle = { PreserveAsset = 3 },
    LuaCurveType = { Step = 1 },
    ItemClass = { Consumable = 0 },
    ItemConsumableSubclass = { Bandage = 7 },
    PowerType = { Mana = 0, Energy = 3 },
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
        function curve:ClearPoints()
            self.points = {}
        end
        client.curves[#client.curves + 1] = curve
        return curve
    end,
}
C_Spell = {
    GetBaseSpell = function(spellID) return client.baseSpellIDs[spellID] or spellID end,
    IsSpellHelpful = function(spellID)
        assert(type(spellID) == "number", "The helpful spell check requires a spell ID.")
        return client.helpfulSpells[spellID] == true
    end,
    IsSelfBuff = function(spellID)
        assert(type(spellID) == "number", "The self buff check requires a spell ID.")
        return client.selfBuffSpells[spellID] == true
    end,
}
C_PetInfo = {
    GetPetHappiness = function()
        client.happinessQueryCount = client.happinessQueryCount + 1
        return client.petHappiness
    end,
}
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

function UnitIsUnit(unit1, unit2)
    assert(unit2 == "player")
    return { boolean = unit1 == "player" or (unit1 == "target" and client.targetIsPlayer) }
end

function UnitCanAttack()
    return client.targetHostile
end

function UnitIsDeadOrGhost(unit)
    return client.deadUnits[unit] == true
end

function UnitAffectingCombat(unit)
    return client.combatUnits[unit] == true
end

function UnitHealthPercent(unit, usePredicted, curve)
    client.healthQueryCount[unit] = (client.healthQueryCount[unit] or 0) + 1
    assert(usePredicted == false)
    assert(curve.curveType == Enum.LuaCurveType.Step)
    assert(curve.points[1][1] == 0 and curve.points[1][2] == 0)
    assert(curve.points[2][1] == 1 and curve.points[2][2] == 1)
    return { healthUnit = unit, alpha = client.fullHealthUnits[unit] and 1 or 0 }
end

function UnitPowerMax(unit, powerType, unmodified)
    assert(unit == "player" and unmodified == false)
    client.powerMaxQueryCount[powerType] = (client.powerMaxQueryCount[powerType] or 0) + 1
    return client.maxPowers[powerType] or 0
end

function UnitPowerPercent(unit, powerType, unmodified, curve)
    if client.maxPowers[powerType] ~= nil then
        assert(unit == "player" and unmodified == false)
        assert(curve.curveType == Enum.LuaCurveType.Step and #curve.points > 0)
        client.powerQueryCount[powerType] = (client.powerQueryCount[powerType] or 0) + 1
        local power = client.powers[powerType]
        if type(power) == "table" then
            power = power.value
        end
        local percent = power / client.maxPowers[powerType]
        local alpha = curve.points[1][2]
        for _, point in ipairs(curve.points) do
            if percent >= point[1] then
                alpha = point[2]
            end
        end
        return { secret = true, powerType = powerType, alpha = alpha }
    end

    client.manaQueryCount[unit] = (client.manaQueryCount[unit] or 0) + 1
    assert(powerType == Enum.PowerType.Mana, "The mana check used another power type.")
    assert(unmodified == false)
    assert(curve.curveType == Enum.LuaCurveType.Step)
    assert(curve.points[1][1] == 0 and curve.points[1][2] == 0)
    assert(curve.points[2][1] == 1 and curve.points[2][2] == 1)
    return { manaUnit = unit, alpha = client.fullManaUnits[unit] and 1 or 0 }
end

function GetComboPoints(unit, target)
    assert(unit == "player" and target == "target", "The combo-point check requires the current target.")
    return client.comboPoints
end

function issecretvalue(value)
    return type(value) == "table" and value.secret == true
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

function IsInGroup()
    return client.groupType ~= nil
end

function UnitThreatSituation()
    return client.threatStatus
end

function UnitDetailedThreatSituation()
    if client.threatStatus ~= nil then
        return { boolean = client.isTanking }
    end
end

function client.addActionButton(name, action)
    local button = newFrame("CheckButton", name)
    button.action = action
    _G[name] = button
    return button
end

function client.startRules(rules)
    local namespace = {}
    assert(loadfile("Rules.lua"))("Prism", namespace)
    assert(loadfile("Core.lua"))("Prism", namespace)
    namespace.Start(rules)
    return namespace
end

function client.setAuraPresent(slot, present)
    slot.auraPresent = present
    if slot.frame then
        slot.frame.visible = present and slot.enabled
    end
    if slot.presenceTexture then
        slot.presenceTexture.visible = present and slot.enabled
    end
    for _, container in ipairs(client.frames) do
        local group = container.groups[slot.key]
        if group and container.unit == slot.container.unit then
            group.auraPresent = present
            updateLayout(container)
        end
    end
end

function client.getHighlight()
    for index = #client.frames, 1, -1 do
        local frame = client.frames[index]
        if frame.frameType == "Texture" and frame.texture == "Interface\\Buttons\\CheckButtonHilight" and frame.parent.frameType == "Frame" then
            return frame
        end
    end
end

function client.refresh(elapsed)
    client.controller.scripts.OnUpdate(client.controller, elapsed or 0.1)
end

function client.event(event)
    assert(client.controller.events[event], "The controller did not register " .. event .. ".")
    if event == "PLAYER_REGEN_DISABLED" then
        client.combatUnits.player = true
    elseif event == "PLAYER_REGEN_ENABLED" then
        client.combatUnits.player = false
    end
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

function client.getLayout(unit, key)
    for index = #client.frames, 1, -1 do
        local frame = client.frames[index]
        if frame.frameType == "AuraContainer" and frame.unit == unit and frame.groups[key] then
            return frame
        end
    end
end

local function anchorOffset(anchor, width, height)
    local x = anchor:find("LEFT", 1, true) and 0 or (anchor:find("RIGHT", 1, true) and width or width / 2)
    local y = anchor:find("BOTTOM", 1, true) and 0 or (anchor:find("TOP", 1, true) and height or height / 2)
    return x, y
end

function client.rectangle(frame)
    if frame == UIParent then
        return 0, 0, frame.width, frame.height
    end
    local allPoints = rawget(frame, "allPoints")
    if allPoints then
        return client.rectangle(allPoints)
    end
    local width, height = frame.width, frame.height
    local point = rawget(frame, "point")
    if not point then
        return frame.left or 0, frame.bottom or 0, width, height
    end
    local relative, relativeAnchor, offsetX, offsetY = point[2], point[3], point[4] or 0, point[5] or 0
    if type(relative) ~= "table" then
        relative, relativeAnchor, offsetX, offsetY = frame.parent, point[1], point[2] or 0, point[3] or 0
    end
    local left, bottom, relativeWidth, relativeHeight = client.rectangle(relative)
    local relativeX, relativeY = anchorOffset(relativeAnchor, relativeWidth, relativeHeight)
    local anchorX, anchorY = anchorOffset(point[1], width, height)
    return left + relativeX + offsetX - anchorX, bottom + relativeY + offsetY - anchorY, width, height
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
        alpha = alpha * client.alpha(frame.parent)
    end
    for _, mask in ipairs(rawget(frame, "masks") or {}) do
        if mask.visible then
            local coordinates = mask.texCoords
            if mask.horizontalWrap == "CLAMPTOBLACKADDITIVE" and coordinates[1] > 1 and coordinates[2] > 1 then
                return 0
            end
            if mask.verticalWrap == "CLAMPTOBLACKADDITIVE" and coordinates[3] > 1 and coordinates[4] > 1 then
                return 0
            end
        end
    end
    return alpha
end

function client.getSpellGlow()
    for index = #client.frames, 1, -1 do
        local frame = client.frames[index]
        local template = rawget(frame, "template")
        if template and template:find("ActionButtonSpellAlertTemplate", 1, true) and client.alpha(frame.ProcLoopFlipbook) > 0 then
            local left, bottom, width, height = client.rectangle(frame)
            if left + width > 0 and left < UIParent.width and bottom + height > 0 and bottom < UIParent.height then
                return frame
            end
        end
    end
end

return client
