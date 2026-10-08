local _, Prism = ...

Prism.classRules = {}

local actionButtonNamePrefixes = {
    "ActionButton",
    "MultiBarBottomLeftButton",
    "MultiBarBottomRightButton",
    "MultiBarRightButton",
    "MultiBarLeftButton",
    "MultiBar5Button",
    "MultiBar6Button",
    "MultiBar7Button",
}
local actionButtonsPerBar = 12
-- The client spell alert uses this multiple of the button size.
local spellGlowScale = 1.4
local redBlinkMinimumAlpha = 0.2
local redBlinkDurationSeconds = 0.4
local overlayRefreshIntervalSeconds = 0.1
local actionButtonOverlays = {}
local refreshGeneration = 0
local activeRules
local auraMechanics = {
    aura = true,
    ["aura-stacks"] = true,
    ["dispel-type"] = true,
}

-- A step curve keeps the full-health comparison inside the client.
local fullHealthCurve = C_CurveUtil.CreateCurve()
fullHealthCurve:SetType(Enum.LuaCurveType.Step)
fullHealthCurve:AddPoint(0, 0)
fullHealthCurve:AddPoint(1, 1)

-- Measure a plain boolean because the documented alpha range differs from the client range.
local booleanTrueAlpha = 1
local alphaProbeTexture = UIParent:CreateTexture()
alphaProbeTexture:SetAlpha(0)
alphaProbeTexture:SetAlphaFromBoolean(true, 1, 0)

if alphaProbeTexture:GetAlpha() < 0.5 then
    booleanTrueAlpha = 255
end

alphaProbeTexture:Hide()

local function createHighlightTexture(parent)
    local texture = parent:CreateTexture(nil, "OVERLAY", nil, 1)
    texture:SetAllPoints()
    texture:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    texture:SetBlendMode("ADD")
    texture:Show()
    return texture
end

local function createVisual(parent, visual)
    if visual == "glow" then
        local glowFrame = CreateFrame("Frame", nil, parent, "ActionButtonSpellAlertTemplate")
        glowFrame:SetPoint("CENTER")
        glowFrame:EnableMouse(false)
        return glowFrame, glowFrame.ProcLoop
    end

    local texture = createHighlightTexture(parent)

    if visual == "red-blink" then
        texture:SetVertexColor(1, 0, 0)

        local blink = texture:CreateAnimationGroup()
        blink:SetLooping("BOUNCE")

        local fade = blink:CreateAnimation("Alpha")
        fade:SetFromAlpha(redBlinkMinimumAlpha)
        fade:SetToAlpha(1)
        fade:SetDuration(redBlinkDurationSeconds)
        return texture, blink
    end

    return texture
end

local function resolveUnit(unit)
    if unit ~= "heal-target" then
        return unit
    end

    if UnitExists("target") and UnitCanAssist("player", "target") then
        return "target"
    end

    return "player"
end

local function createAuraCandidateFilters(condition, actionSpellID)
    local filters = { isFromPlayerOrPlayerPet = condition.ownAura }

    if condition.auraSpellIDs or condition.includeActionSpellID then
        local includeSpellIDs = {}

        for spellID in pairs(condition.auraSpellIDs or {}) do
            includeSpellIDs[spellID] = true
        end

        if condition.includeActionSpellID and actionSpellID then
            includeSpellIDs[actionSpellID] = true
        end

        filters.includeSpellIDs = includeSpellIDs
    end

    if condition.dispelType then
        filters.includeDispelTypes = { [condition.dispelType] = true }
    end

    return filters
end

local function createRuleState(overlay, rule, spellID)
    local condition = rule.condition
    local state = { rule = rule, active = true, actionSpellID = spellID }

    if not auraMechanics[condition.mechanic] then
        -- Keep condition alpha separate from visual animation alpha.
        local frame = CreateFrame("Frame", nil, overlay.frame)
        frame:EnableMouse(false)
        frame:SetAllPoints()
        frame:SetAlpha(0)
        frame:Show()
        state.region = frame
        state.visualRegion, state.animation = createVisual(frame, rule.visual)

        if rule.visual == "glow" then
            state.glowFrame = state.visualRegion
        end

        return state
    end

    local container = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    container:SetFrameStrata("HIGH")
    container:EnableMouse(false)
    state.unit = resolveUnit(condition.unit)
    container:SetUnit(state.unit)
    state.region = container
    state.auraContainer = container

    container:AddAuraSlot(rule.key, condition.filter, {
        candidateFilters = createAuraCandidateFilters(condition, spellID),
        initializeFrame = function(auraButton)
            auraButton:EnableMouse(false)
            auraButton:SetAllPoints()

            local visualParent = auraButton

            if condition.mechanic == "aura-stacks" then
                local applicationBar = CreateFrame("StatusBar", nil, auraButton)
                applicationBar:SetAllPoints()
                applicationBar:EnableMouse(false)
                applicationBar:Hide()
                auraButton:SetApplicationBar(applicationBar, {
                    minApplications = condition.applications,
                    maxApplications = condition.applications,
                })
                visualParent = applicationBar
            end

            local region, animation = createVisual(visualParent, rule.visual)

            if animation then
                auraButton:AddAuraShownAnimation(animation)
            end

            if rule.visual == "glow" then
                -- Store only the glow for size updates. The aura slot remains restricted.
                state.glowFrame = region
                region:Show()
            end
        end,
    })
    container:Show()
    container:SetEnabled(true)
    return state
end

local function hideRuleVisual(state)
    state.region:SetAlpha(0)

    if not state.auraContainer and state.animation then
        state.animation:Stop()
        state.visualRegion:Hide()
    end
end

local function setRuleStateActive(state, active)
    if state.active == active then
        return
    end

    state.active = active

    if state.auraContainer then
        state.auraContainer:SetAuraSlotEnabled(state.rule.key, active)
        state.auraContainer:SetEnabled(active)
    end

    if not active then
        hideRuleVisual(state)
    end
end

local function showRuleVisual(state)
    if not state.visualRegion:IsShown() then
        state.visualRegion:Show()
    end

    if state.animation and not state.animation:IsPlaying() then
        state.animation:Play()
    end
end

local function setUsableAlpha(region, actionSlotID)
    local isUsable = C_ActionBar.IsUsableAction(actionSlotID)
    region:SetAlphaFromBoolean(isUsable, booleanTrueAlpha, 0)
end

local function isLivingHostileTarget()
    return UnitExists("target") and UnitCanAttack("player", "target") and not UnitIsDeadOrGhost("target")
end

local function isTargetCastingOrChanneling()
    local _, _, _, _, _, isTradeSkill = UnitCastingInfo("target")

    if isTradeSkill ~= nil then
        return true
    end

    local _, _, _, _, _, isChannelTradeSkill = UnitChannelInfo("target")
    return isChannelTradeSkill ~= nil
end

local mechanicHandlers = {
    ["full-health"] = function(state)
        local unit = resolveUnit(state.rule.condition.unit)

        if UnitIsDeadOrGhost(unit) then
            hideRuleVisual(state)
            return
        end

        showRuleVisual(state)
        state.region:SetAlpha(UnitHealthPercent(unit, false, fullHealthCurve))
    end,
    usable = function(state, actionSlotID)
        showRuleVisual(state)
        setUsableAlpha(state.region, actionSlotID)
    end,
    ["target-cast"] = function(state, actionSlotID)
        if not isLivingHostileTarget() or not isTargetCastingOrChanneling() then
            hideRuleVisual(state)
            return
        end

        showRuleVisual(state)
        setUsableAlpha(state.region, actionSlotID)
    end,
    tanking = function(state)
        if not isLivingHostileTarget() or UnitThreatSituation("player", "target") == nil then
            hideRuleVisual(state)
            return
        end

        showRuleVisual(state)
        local isTanking = UnitDetailedThreatSituation("player", "target")
        state.region:SetAlphaFromBoolean(isTanking, booleanTrueAlpha, 0)
    end,
}

local function updateRuleState(state, spellID, actionSlotID)
    local rule = state.rule
    local condition = rule.condition
    local container = state.auraContainer

    if not container then
        mechanicHandlers[condition.mechanic](state, actionSlotID)
        return
    end

    local unit = resolveUnit(condition.unit)

    if state.unit ~= unit then
        container:SetUnit(unit)
        state.unit = unit
    end

    if condition.includeActionSpellID and state.actionSpellID ~= spellID then
        container:SetAuraSlotCandidateFilters(rule.key, createAuraCandidateFilters(condition, spellID))
        state.actionSpellID = spellID
    end

    if rule.requireUsable then
        setUsableAlpha(container, actionSlotID)
    else
        container:SetAlpha(1)
    end
end

local function matchesAction(action, spellID, baseSpellID, itemID, classID, subClassID)
    if action.anySpell then
        return spellID ~= nil
    end

    if action.spellIDs then
        return spellID ~= nil and (action.spellIDs[spellID] == true or action.spellIDs[baseSpellID] == true)
    end

    if action.itemIDs then
        return itemID ~= nil and action.itemIDs[itemID] == true
    end

    return itemID ~= nil and classID == action.itemClassID and subClassID == action.itemSubClassID
end

local function updateActionRules(overlay, spellID, itemID, classID, subClassID)
    local baseSpellID = spellID and C_Spell.GetBaseSpell(spellID)
    local selectedRules = {}
    local activeStates = {}

    for _, rule in ipairs(activeRules) do
        if matchesAction(rule.action, spellID, baseSpellID, itemID, classID, subClassID) then
            selectedRules[rule.key] = true
            local state = overlay.states[rule.key]

            if not state then
                state = createRuleState(overlay, rule, spellID)
                overlay.states[rule.key] = state
            else
                setRuleStateActive(state, true)
            end

            activeStates[#activeStates + 1] = state
        end
    end

    for _, state in ipairs(overlay.activeStates) do
        if not selectedRules[state.rule.key] then
            setRuleStateActive(state, false)
        end
    end

    overlay.activeStates = activeStates
    overlay.spellID = spellID
    overlay.itemID = itemID
    overlay.itemClassID = classID
    overlay.itemSubClassID = subClassID
    overlay.hasActionMatch = true
end

local function placeRegion(region, placement, left, bottom, width, height, isAuraContainer)
    if placement.left ~= left or placement.bottom ~= bottom then
        placement.left = left
        placement.bottom = bottom
        region:ClearAllPoints()
        region:SetPoint("BOTTOMLEFT", UIParent, "BOTTOMLEFT", left, bottom)
    end

    if placement.width ~= width or placement.height ~= height then
        placement.width = width
        placement.height = height

        if isAuraContainer then
            -- Empty flow layouts need padding to retain the button size.
            region:SetFlowLayoutPadding(width, 0, height, 0)
        end
    end

    -- Aura containers reset their size after a layout pass.
    region:SetSize(width, height)
end

local function placeGlow(glowFrame, state, width, height)
    local glowWidth = width * spellGlowScale
    local glowHeight = height * spellGlowScale

    if state.glowWidth ~= glowWidth or state.glowHeight ~= glowHeight then
        glowFrame:SetSize(glowWidth, glowHeight)
        state.glowWidth = glowWidth
        state.glowHeight = glowHeight
    end
end

local function placeActionButtonOverlay(overlay, actionButton)
    local left = actionButton:GetLeft()
    local bottom = actionButton:GetBottom()

    if not left or not bottom then
        return
    end

    local scale = actionButton:GetEffectiveScale() / UIParent:GetEffectiveScale()
    local scaledLeft = left * scale
    local scaledBottom = bottom * scale
    local scaledWidth = actionButton:GetWidth() * scale
    local scaledHeight = actionButton:GetHeight() * scale
    placeRegion(overlay.frame, overlay, scaledLeft, scaledBottom, scaledWidth, scaledHeight, false)

    for _, state in ipairs(overlay.activeStates) do
        if state.auraContainer then
            placeRegion(state.auraContainer, state, scaledLeft, scaledBottom, scaledWidth, scaledHeight, true)
        end

        if state.glowFrame then
            placeGlow(state.glowFrame, state, scaledWidth, scaledHeight)
        end
    end
end

local function getActionSpellID(actionSlotID)
    local spellID = C_ActionBar.GetSpell(actionSlotID)

    if spellID and spellID > 0 then
        return spellID
    end
end

local function getActionItem(actionSlotID, overlay)
    local actionType, itemID = GetActionInfo(actionSlotID)

    if actionType ~= "item" or not itemID then
        return nil
    end

    local _, _, _, _, _, classID, subClassID = C_Item.GetItemInfoInstant(itemID)

    -- Retain a known category while the client holds no data for the same item.
    if not classID and overlay and overlay.itemID == itemID then
        classID = overlay.itemClassID
        subClassID = overlay.itemSubClassID
    end

    return itemID, classID, subClassID
end

local function createActionButtonOverlay()
    local frame = CreateFrame("Frame", nil, UIParent)
    frame:SetFrameStrata("HIGH")
    frame:EnableMouse(false)
    frame:Show()
    return { frame = frame, states = {}, activeStates = {} }
end

local function updateActionButtonOverlay(actionButton)
    local actionButtonName = actionButton:GetName()
    local overlay = actionButtonOverlays[actionButtonName]
    local actionSlotID = actionButton.action
    local spellID, itemID, classID, subClassID

    if actionSlotID and actionSlotID > 0 and C_ActionBar.HasAction(actionSlotID) then
        spellID = getActionSpellID(actionSlotID)
        itemID, classID, subClassID = getActionItem(actionSlotID, overlay)
    end

    if not overlay and not spellID and not itemID then
        return
    end

    if not overlay then
        overlay = createActionButtonOverlay()
        actionButtonOverlays[actionButtonName] = overlay
    end

    if
        not overlay.hasActionMatch
        or overlay.spellID ~= spellID
        or overlay.itemID ~= itemID
        or overlay.itemClassID ~= classID
        or overlay.itemSubClassID ~= subClassID
    then
        updateActionRules(overlay, spellID, itemID, classID, subClassID)
    end

    overlay.lastRefreshGeneration = refreshGeneration
    overlay.frame:SetAlpha(1)
    overlay.isVisible = true
    placeActionButtonOverlay(overlay, actionButton)

    for _, state in ipairs(overlay.activeStates) do
        updateRuleState(state, spellID, actionSlotID)
    end
end

local function refreshActionButtonOverlays()
    refreshGeneration = refreshGeneration + 1

    for _, namePrefix in ipairs(actionButtonNamePrefixes) do
        for buttonIndex = 1, actionButtonsPerBar do
            local actionButton = rawget(_G, namePrefix .. buttonIndex)

            if actionButton and actionButton:IsVisible() then
                updateActionButtonOverlay(actionButton)
            end
        end
    end

    for _, overlay in pairs(actionButtonOverlays) do
        if overlay.lastRefreshGeneration ~= refreshGeneration and overlay.isVisible then
            overlay.frame:SetAlpha(0)
            overlay.isVisible = false

            for _, state in ipairs(overlay.activeStates) do
                hideRuleVisual(state)
            end
        end
    end
end

local function refreshAuraStates()
    for _, overlay in pairs(actionButtonOverlays) do
        for _, state in ipairs(overlay.activeStates) do
            if state.auraContainer then
                state.auraContainer:UpdateAllAuras()
            end
        end
    end
end

function Prism.Start(rules)
    activeRules = rules
    local controller = CreateFrame("Frame")
    local elapsedSinceRefresh = overlayRefreshIntervalSeconds

    controller:RegisterEvent("PLAYER_ENTERING_WORLD")
    controller:RegisterEvent("PLAYER_REGEN_DISABLED")
    controller:RegisterEvent("PLAYER_REGEN_ENABLED")
    controller:RegisterEvent("ACTION_USABLE_CHANGED")
    controller:RegisterEvent("PLAYER_TARGET_CHANGED")

    controller:SetScript("OnEvent", function(_, event)
        if event == "ACTION_USABLE_CHANGED" then
            refreshActionButtonOverlays()
            return
        end

        if event == "PLAYER_TARGET_CHANGED" then
            refreshActionButtonOverlays()
        end

        refreshAuraStates()
    end)

    controller:SetScript("OnUpdate", function(_, elapsed)
        elapsedSinceRefresh = elapsedSinceRefresh + elapsed

        if elapsedSinceRefresh < overlayRefreshIntervalSeconds then
            return
        end

        elapsedSinceRefresh = elapsedSinceRefresh % overlayRefreshIntervalSeconds
        refreshActionButtonOverlays()
    end)
end
