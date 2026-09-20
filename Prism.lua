local selfBuffAuraSlotKey = "self-buff"
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
local overlayRefreshIntervalSeconds = 0.1
local dimAlpha = 0.55
local actionButtonOverlays = {}
local refreshGeneration = 0

local function initializeAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local dimTexture = auraButton:CreateTexture(nil, "ARTWORK", nil, 0)
    dimTexture:SetAllPoints()
    dimTexture:SetColorTexture(0, 0, 0, dimAlpha)
    dimTexture:Show()

    local highlightTexture = auraButton:CreateTexture(nil, "OVERLAY", nil, 1)
    highlightTexture:SetAllPoints()
    highlightTexture:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    highlightTexture:SetBlendMode("ADD")
    highlightTexture:Show()
end

local function createSpellCandidateFilters(spellID)
    local includeSpellIDs = {}

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createActionButtonOverlay()
    local auraContainer = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    auraContainer:SetFrameStrata("HIGH")
    auraContainer:EnableMouse(false)
    auraContainer:SetUnit("player")
    auraContainer:AddAuraSlot(selfBuffAuraSlotKey, "HELPFUL", {
        candidateFilters = createSpellCandidateFilters(nil),
        initializeFrame = initializeAuraButton,
    })
    auraContainer:Show()
    auraContainer:SetEnabled(true)

    return {
        auraContainer = auraContainer,
        isVisible = true,
    }
end

local function refreshAuraStates()
    for _, overlay in pairs(actionButtonOverlays) do
        overlay.auraContainer:UpdateAllAuras()
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
    local auraContainer = overlay.auraContainer

    if overlay.left ~= scaledLeft or overlay.bottom ~= scaledBottom then
        overlay.left = scaledLeft
        overlay.bottom = scaledBottom
        auraContainer:ClearAllPoints()
        auraContainer:SetPoint("BOTTOMLEFT", UIParent, "BOTTOMLEFT", scaledLeft, scaledBottom)
    end

    if overlay.width ~= scaledWidth or overlay.height ~= scaledHeight then
        overlay.width = scaledWidth
        overlay.height = scaledHeight
        -- The container runs its flow layout after each aura update. That
        -- layout is empty, because Prism adds no aura group. The padding
        -- makes the layout size equal to the action button size.
        auraContainer:SetFlowLayoutPadding(scaledWidth, 0, scaledHeight, 0)
    end

    -- The container sizes itself on each layout pass, so assert the size here.
    auraContainer:SetSize(scaledWidth, scaledHeight)
end

local function getActionSpellID(actionButton)
    local actionSlotID = actionButton.action

    if not actionSlotID or actionSlotID <= 0 or not C_ActionBar.HasAction(actionSlotID) then
        return nil
    end

    local spellID = C_ActionBar.GetSpell(actionSlotID)

    if spellID and spellID > 0 then
        return spellID
    end

    return nil
end

local function updateActionButtonOverlay(actionButton)
    local actionButtonName = actionButton:GetName()
    local spellID = getActionSpellID(actionButton)
    local overlay = actionButtonOverlays[actionButtonName]

    if not overlay and not spellID then
        return
    end

    if not overlay then
        overlay = createActionButtonOverlay()
        actionButtonOverlays[actionButtonName] = overlay
    end

    overlay.lastRefreshGeneration = refreshGeneration

    if not overlay.isVisible then
        overlay.auraContainer:SetAlpha(1)
        overlay.isVisible = true
    end

    placeActionButtonOverlay(overlay, actionButton)

    if overlay.spellID ~= spellID then
        overlay.auraContainer:SetAuraSlotCandidateFilters(selfBuffAuraSlotKey, createSpellCandidateFilters(spellID))
        overlay.spellID = spellID
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
            overlay.auraContainer:SetAlpha(0)
            overlay.isVisible = false
        end
    end
end

local actionBarController = CreateFrame("Frame")
local elapsedSinceRefresh = overlayRefreshIntervalSeconds

actionBarController:RegisterEvent("PLAYER_ENTERING_WORLD")
actionBarController:RegisterEvent("PLAYER_REGEN_DISABLED")
actionBarController:RegisterEvent("PLAYER_REGEN_ENABLED")

actionBarController:SetScript("OnEvent", function()
    refreshAuraStates()
end)

actionBarController:SetScript("OnUpdate", function(_, elapsed)
    elapsedSinceRefresh = elapsedSinceRefresh + elapsed

    if elapsedSinceRefresh < overlayRefreshIntervalSeconds then
        return
    end

    elapsedSinceRefresh = elapsedSinceRefresh % overlayRefreshIntervalSeconds
    refreshActionButtonOverlays()
end)
