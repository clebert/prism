local selfBuffAuraSlotKey = "self-buff"
local ownRendAuraSlotKey = "own-rend"
local ownHamstringAuraSlotKey = "own-hamstring"
-- HARMFUL|PLAYER keeps harmful auras cast by the player, the pet, or the vehicle.
local ownDebuffAuraFilter = "HARMFUL|PLAYER"
local demoralizingShoutAuraSlotKey = "demoralizing-shout"
local thunderClapAuraSlotKey = "thunder-clap"
local sunderAuraSlotKey = "sunder-armor"
-- HARMFUL matches any harmful aura. These spells have one shared debuff.
local sharedDebuffAuraFilter = "HARMFUL"
-- The bar appears when the aura has this many applications.
local sunderFullStackCount = 5
-- These IDs glow while the spell is usable. The action button stores one rank.
local usableGlowSpellIDs = {
    -- Overpower
    [7384] = true,
    [7887] = true,
    [11584] = true,
    [11585] = true,
    -- Revenge
    [6572] = true,
    [6574] = true,
    [7379] = true,
    [11600] = true,
    [11601] = true,
    [25288] = true,
}
-- The action button stores one rank. The target aura can use another rank.
local rendSpellIDs = {
    [772] = true,
    [6546] = true,
    [6547] = true,
    [6548] = true,
    [11572] = true,
    [11573] = true,
    [11574] = true,
}
-- The action button stores one rank. The target aura can use another rank.
local demoralizingShoutSpellIDs = {
    [1160] = true,
    [6190] = true,
    [11554] = true,
    [11555] = true,
    [11556] = true,
}
-- The action button stores one rank. The target aura can use another rank.
local thunderClapSpellIDs = {
    [6343] = true,
    [8198] = true,
    [8204] = true,
    [8205] = true,
    [11580] = true,
    [11581] = true,
}
-- The action button stores one rank. The target aura can use another rank.
local sunderSpellIDs = {
    [7386] = true,
    [7405] = true,
    [8380] = true,
    [11596] = true,
    [11597] = true,
}
-- The action button stores one rank. The target aura can use another rank.
local hamstringSpellIDs = {
    [1715] = true,
    [7372] = true,
    [7373] = true,
}
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
-- The retail spell alert frame uses this multiple of the button size.
local usableGlowScale = 1.4
local overlayRefreshIntervalSeconds = 0.1
local actionButtonOverlays = {}
local refreshGeneration = 0

-- The client reports unit health as a secret value, and addon code cannot
-- compare such a value. A step curve moves the comparison into the client.
-- The curve result is 1 at full health and 0 below it.
local fullHealthCurve = C_CurveUtil.CreateCurve()
fullHealthCurve:SetType(Enum.LuaCurveType.Step)
fullHealthCurve:AddPoint(0, 0)
fullHealthCurve:AddPoint(1, 1)

-- The documented full alpha for SetAlphaFromBoolean is 255. Measure a plain
-- true once, because SetAlpha on this client uses the range 0 to 1.
local usableGlowAlpha = 1
local alphaProbeTexture = UIParent:CreateTexture()
alphaProbeTexture:SetAlpha(0)
alphaProbeTexture:SetAlphaFromBoolean(true, 1, 0)

if alphaProbeTexture:GetAlpha() < 0.5 then
    usableGlowAlpha = 255
end

alphaProbeTexture:Hide()

local function initializeAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local highlightTexture = auraButton:CreateTexture(nil, "OVERLAY", nil, 1)
    highlightTexture:SetAllPoints()
    highlightTexture:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    highlightTexture:SetBlendMode("ADD")
    highlightTexture:Show()
end

-- The slot frame appears at the first stack. The bar appears at the full stack count.
-- Addon code does not read that count.
local function initializeSunderAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local applicationBar = CreateFrame("StatusBar", nil, auraButton)
    applicationBar:SetAllPoints()
    applicationBar:EnableMouse(false)
    applicationBar:Hide()

    local highlightTexture = applicationBar:CreateTexture(nil, "OVERLAY", nil, 1)
    highlightTexture:SetAllPoints()
    highlightTexture:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    highlightTexture:SetBlendMode("ADD")
    highlightTexture:Show()

    auraButton:SetApplicationBar(applicationBar, {
        minApplications = sunderFullStackCount,
        maxApplications = sunderFullStackCount,
    })
end

local function isUsableGlowSpell(spellID)
    if usableGlowSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and usableGlowSpellIDs[baseSpellID] == true
end

local function isRendSpell(spellID)
    if rendSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and rendSpellIDs[baseSpellID] == true
end

local function isDemoralizingShoutSpell(spellID)
    if demoralizingShoutSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and demoralizingShoutSpellIDs[baseSpellID] == true
end

local function isThunderClapSpell(spellID)
    if thunderClapSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and thunderClapSpellIDs[baseSpellID] == true
end

local function isSunderSpell(spellID)
    if sunderSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and sunderSpellIDs[baseSpellID] == true
end

local function isHamstringSpell(spellID)
    if hamstringSpellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and hamstringSpellIDs[baseSpellID] == true
end

local function createSpellCandidateFilters(spellID)
    local includeSpellIDs = {}

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createOwnRendCandidateFilters(spellID)
    local includeSpellIDs = {}

    for rendSpellID in pairs(rendSpellIDs) do
        includeSpellIDs[rendSpellID] = true
    end

    if spellID then
        includeSpellIDs[spellID] = true
    end

    -- isFromPlayerOrPlayerPet rejects a Rend aura from another unit.
    return {
        includeSpellIDs = includeSpellIDs,
        isFromPlayerOrPlayerPet = true,
    }
end

local function createDemoralizingShoutCandidateFilters(spellID)
    local includeSpellIDs = {}

    for demoralizingShoutSpellID in pairs(demoralizingShoutSpellIDs) do
        includeSpellIDs[demoralizingShoutSpellID] = true
    end

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createThunderClapCandidateFilters(spellID)
    local includeSpellIDs = {}

    for thunderClapSpellID in pairs(thunderClapSpellIDs) do
        includeSpellIDs[thunderClapSpellID] = true
    end

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createSunderCandidateFilters(spellID)
    local includeSpellIDs = {}

    for sunderSpellID in pairs(sunderSpellIDs) do
        includeSpellIDs[sunderSpellID] = true
    end

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createOwnHamstringCandidateFilters(spellID)
    local includeSpellIDs = {}

    for hamstringSpellID in pairs(hamstringSpellIDs) do
        includeSpellIDs[hamstringSpellID] = true
    end

    if spellID then
        includeSpellIDs[spellID] = true
    end

    -- isFromPlayerOrPlayerPet rejects a Hamstring aura from another unit.
    return {
        includeSpellIDs = includeSpellIDs,
        isFromPlayerOrPlayerPet = true,
    }
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

    local fullHealthTexture = auraContainer:CreateTexture(nil, "OVERLAY", nil, 1)
    fullHealthTexture:SetAllPoints()
    fullHealthTexture:SetTexture("Interface\\Buttons\\CheckButtonHilight")
    fullHealthTexture:SetBlendMode("ADD")
    fullHealthTexture:SetAlpha(0)

    return {
        auraContainer = auraContainer,
        fullHealthTexture = fullHealthTexture,
        isVisible = true,
    }
end

local function refreshAuraStates()
    for _, overlay in pairs(actionButtonOverlays) do
        overlay.auraContainer:UpdateAllAuras()

        if overlay.targetAuraContainer then
            overlay.targetAuraContainer:UpdateAllAuras()
        end
    end
end

-- A second container is required because one container has one unit.
-- Enemy aura values stay in the client. The slot shows the highlight.
local function ensureTargetAuraContainer(overlay)
    local targetAuraContainer = overlay.targetAuraContainer

    if targetAuraContainer then
        return targetAuraContainer
    end

    targetAuraContainer = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    targetAuraContainer:SetFrameStrata("HIGH")
    targetAuraContainer:EnableMouse(false)
    targetAuraContainer:SetUnit("target")
    targetAuraContainer:Show()
    targetAuraContainer:SetEnabled(true)
    overlay.targetAuraContainer = targetAuraContainer
    return targetAuraContainer
end

local function ensureOwnRendSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasOwnRendSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(ownRendAuraSlotKey, ownDebuffAuraFilter, {
        candidateFilters = createOwnRendCandidateFilters(spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasOwnRendSlot = true
    overlay.ownRendSlotEnabled = true
    overlay.ownRendSpellID = spellID
    return targetAuraContainer
end

local function ensureDemoralizingShoutSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasDemoralizingShoutSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(demoralizingShoutAuraSlotKey, sharedDebuffAuraFilter, {
        candidateFilters = createDemoralizingShoutCandidateFilters(spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasDemoralizingShoutSlot = true
    overlay.demoralizingShoutSlotEnabled = true
    overlay.demoralizingShoutSpellID = spellID
    return targetAuraContainer
end

local function ensureThunderClapSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasThunderClapSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(thunderClapAuraSlotKey, sharedDebuffAuraFilter, {
        candidateFilters = createThunderClapCandidateFilters(spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasThunderClapSlot = true
    overlay.thunderClapSlotEnabled = true
    overlay.thunderClapSpellID = spellID
    return targetAuraContainer
end

local function ensureSunderSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasSunderSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(sunderAuraSlotKey, sharedDebuffAuraFilter, {
        candidateFilters = createSunderCandidateFilters(spellID),
        initializeFrame = initializeSunderAuraButton,
    })
    overlay.hasSunderSlot = true
    overlay.sunderSlotEnabled = true
    overlay.sunderSpellID = spellID
    return targetAuraContainer
end

local function ensureOwnHamstringSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasOwnHamstringSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(ownHamstringAuraSlotKey, ownDebuffAuraFilter, {
        candidateFilters = createOwnHamstringCandidateFilters(spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasOwnHamstringSlot = true
    overlay.ownHamstringSlotEnabled = true
    overlay.ownHamstringSpellID = spellID
    return targetAuraContainer
end

local function setTargetAuraSlotEnabled(targetAuraContainer, slotKey, enabled, stateKey, overlay)
    if overlay[stateKey] == enabled then
        return
    end

    targetAuraContainer:SetAuraSlotEnabled(slotKey, enabled)
    overlay[stateKey] = enabled
end

local function setTargetHighlightShown(overlay, isShown)
    local targetAuraContainer = overlay.targetAuraContainer

    if not targetAuraContainer or overlay.isTargetHighlightShown == isShown then
        return
    end

    if isShown then
        targetAuraContainer:SetAlpha(1)
    else
        targetAuraContainer:SetAlpha(0)
    end

    overlay.isTargetHighlightShown = isShown
end

local function disableInactiveTargetSlots(overlay, targetAuraContainer, activeStateKey)
    if activeStateKey ~= "ownRendSlotEnabled" and overlay.ownRendSlotEnabled then
        setTargetAuraSlotEnabled(targetAuraContainer, ownRendAuraSlotKey, false, "ownRendSlotEnabled", overlay)
    end

    if activeStateKey ~= "ownHamstringSlotEnabled" and overlay.ownHamstringSlotEnabled then
        setTargetAuraSlotEnabled(targetAuraContainer, ownHamstringAuraSlotKey, false, "ownHamstringSlotEnabled", overlay)
    end

    if activeStateKey ~= "demoralizingShoutSlotEnabled" and overlay.demoralizingShoutSlotEnabled then
        setTargetAuraSlotEnabled(
            targetAuraContainer,
            demoralizingShoutAuraSlotKey,
            false,
            "demoralizingShoutSlotEnabled",
            overlay
        )
    end

    if activeStateKey ~= "thunderClapSlotEnabled" and overlay.thunderClapSlotEnabled then
        setTargetAuraSlotEnabled(targetAuraContainer, thunderClapAuraSlotKey, false, "thunderClapSlotEnabled", overlay)
    end

    if activeStateKey ~= "sunderSlotEnabled" and overlay.sunderSlotEnabled then
        setTargetAuraSlotEnabled(targetAuraContainer, sunderAuraSlotKey, false, "sunderSlotEnabled", overlay)
    end
end

local function updateTargetAuraHighlight(overlay, spellID)
    local isRend = spellID ~= nil and isRendSpell(spellID)
    local isHamstring = spellID ~= nil and isHamstringSpell(spellID)
    local isDemoralizingShout = spellID ~= nil and isDemoralizingShoutSpell(spellID)
    local isThunderClap = spellID ~= nil and isThunderClapSpell(spellID)
    local isSunder = spellID ~= nil and isSunderSpell(spellID)
    local targetAuraContainer = overlay.targetAuraContainer

    if isRend then
        targetAuraContainer = ensureOwnRendSlot(overlay, spellID)

        if overlay.ownRendSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(ownRendAuraSlotKey, createOwnRendCandidateFilters(spellID))
            overlay.ownRendSpellID = spellID
        end

        setTargetAuraSlotEnabled(targetAuraContainer, ownRendAuraSlotKey, true, "ownRendSlotEnabled", overlay)
        disableInactiveTargetSlots(overlay, targetAuraContainer, "ownRendSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isHamstring then
        targetAuraContainer = ensureOwnHamstringSlot(overlay, spellID)

        if overlay.ownHamstringSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(ownHamstringAuraSlotKey, createOwnHamstringCandidateFilters(spellID))
            overlay.ownHamstringSpellID = spellID
        end

        setTargetAuraSlotEnabled(targetAuraContainer, ownHamstringAuraSlotKey, true, "ownHamstringSlotEnabled", overlay)
        disableInactiveTargetSlots(overlay, targetAuraContainer, "ownHamstringSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isDemoralizingShout then
        targetAuraContainer = ensureDemoralizingShoutSlot(overlay, spellID)

        if overlay.demoralizingShoutSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                demoralizingShoutAuraSlotKey,
                createDemoralizingShoutCandidateFilters(spellID)
            )
            overlay.demoralizingShoutSpellID = spellID
        end

        setTargetAuraSlotEnabled(
            targetAuraContainer,
            demoralizingShoutAuraSlotKey,
            true,
            "demoralizingShoutSlotEnabled",
            overlay
        )
        disableInactiveTargetSlots(overlay, targetAuraContainer, "demoralizingShoutSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isThunderClap then
        targetAuraContainer = ensureThunderClapSlot(overlay, spellID)

        if overlay.thunderClapSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                thunderClapAuraSlotKey,
                createThunderClapCandidateFilters(spellID)
            )
            overlay.thunderClapSpellID = spellID
        end

        setTargetAuraSlotEnabled(
            targetAuraContainer,
            thunderClapAuraSlotKey,
            true,
            "thunderClapSlotEnabled",
            overlay
        )
        disableInactiveTargetSlots(overlay, targetAuraContainer, "thunderClapSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isSunder then
        targetAuraContainer = ensureSunderSlot(overlay, spellID)

        if overlay.sunderSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(sunderAuraSlotKey, createSunderCandidateFilters(spellID))
            overlay.sunderSpellID = spellID
        end

        setTargetAuraSlotEnabled(targetAuraContainer, sunderAuraSlotKey, true, "sunderSlotEnabled", overlay)
        disableInactiveTargetSlots(overlay, targetAuraContainer, "sunderSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if targetAuraContainer then
        disableInactiveTargetSlots(overlay, targetAuraContainer, nil)
    end

    setTargetHighlightShown(overlay, false)
end

local function placeAuraContainer(auraContainer, placement, scaledLeft, scaledBottom, scaledWidth, scaledHeight)
    if placement.left ~= scaledLeft or placement.bottom ~= scaledBottom then
        placement.left = scaledLeft
        placement.bottom = scaledBottom
        auraContainer:ClearAllPoints()
        auraContainer:SetPoint("BOTTOMLEFT", UIParent, "BOTTOMLEFT", scaledLeft, scaledBottom)
    end

    if placement.width ~= scaledWidth or placement.height ~= scaledHeight then
        placement.width = scaledWidth
        placement.height = scaledHeight
        -- The container runs its flow layout after each aura update. That
        -- layout is empty, because Prism adds no aura group. The padding
        -- makes the layout size equal to the action button size.
        auraContainer:SetFlowLayoutPadding(scaledWidth, 0, scaledHeight, 0)
    end

    -- The container sizes itself on each layout pass, so assert the size here.
    auraContainer:SetSize(scaledWidth, scaledHeight)
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

    placeAuraContainer(overlay.auraContainer, overlay, scaledLeft, scaledBottom, scaledWidth, scaledHeight)

    if overlay.targetAuraContainer then
        if not overlay.targetPlacement then
            overlay.targetPlacement = {}
        end

        placeAuraContainer(
            overlay.targetAuraContainer,
            overlay.targetPlacement,
            scaledLeft,
            scaledBottom,
            scaledWidth,
            scaledHeight
        )
    end
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

-- Returns nil while the client holds no data for the item.
local function isBandageAction(actionButton)
    local actionSlotID = actionButton.action

    if not actionSlotID or actionSlotID <= 0 or not C_ActionBar.HasAction(actionSlotID) then
        return false
    end

    local actionType, itemID = GetActionInfo(actionSlotID)

    if actionType ~= "item" or not itemID then
        return false
    end

    local _, _, _, _, _, classID, subClassID = C_Item.GetItemInfoInstant(itemID)

    if not classID then
        return nil
    end

    return classID == Enum.ItemClass.Consumable and subClassID == Enum.ItemConsumableSubclass.Bandage
end

local function getHealTargetUnit()
    if UnitExists("target") and UnitCanAssist("player", "target") then
        return "target"
    end

    return "player"
end

local function ensureUsableGlowFrame(overlay)
    local glowFrame = overlay.usableGlowFrame

    if glowFrame then
        return glowFrame
    end

    glowFrame = CreateFrame("Frame", nil, overlay.auraContainer, "ActionButtonSpellAlertTemplate")
    glowFrame:SetPoint("CENTER")
    glowFrame:EnableMouse(false)
    overlay.usableGlowFrame = glowFrame
    return glowFrame
end

local function hideUsableGlow(overlay)
    local glowFrame = overlay.usableGlowFrame

    if not glowFrame then
        return
    end

    glowFrame.ProcLoop:Stop()
    glowFrame:Hide()
end

local function updateUsableGlow(overlay, actionButton)
    if not overlay.isUsableGlowSpell or not actionButton.action or actionButton.action <= 0 then
        hideUsableGlow(overlay)
        return
    end

    local glowFrame = ensureUsableGlowFrame(overlay)

    if overlay.width and overlay.height then
        local glowWidth = overlay.width * usableGlowScale
        local glowHeight = overlay.height * usableGlowScale

        if overlay.glowWidth ~= glowWidth or overlay.glowHeight ~= glowHeight then
            overlay.glowWidth = glowWidth
            overlay.glowHeight = glowHeight
            glowFrame:SetSize(glowWidth, glowHeight)
        end
    end

    if not glowFrame:IsShown() then
        glowFrame:Show()
    end

    if not glowFrame.ProcLoop:IsPlaying() then
        glowFrame.ProcLoop:Play()
    end

    -- Apply the usable flag in the client. Do not compare that flag in Lua.
    local isUsable = C_ActionBar.IsUsableAction(actionButton.action)
    glowFrame:SetAlphaFromBoolean(isUsable, usableGlowAlpha, 0)
end

local function updateFullHealthAlpha(texture, unit)
    if UnitIsDeadOrGhost(unit) then
        texture:SetAlpha(0)
        return
    end

    texture:SetAlpha(UnitHealthPercent(unit, false, fullHealthCurve))
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

    if overlay.spellID ~= spellID then
        overlay.auraContainer:SetAuraSlotCandidateFilters(selfBuffAuraSlotKey, createSpellCandidateFilters(spellID))
        overlay.spellID = spellID
        overlay.isBandage = nil
        overlay.isUsableGlowSpell = spellID ~= nil and isUsableGlowSpell(spellID)
    end

    updateTargetAuraHighlight(overlay, spellID)
    placeActionButtonOverlay(overlay, actionButton)

    if overlay.isBandage == nil then
        overlay.isBandage = isBandageAction(actionButton)
    end

    if overlay.isBandage then
        updateFullHealthAlpha(overlay.fullHealthTexture, getHealTargetUnit())
    else
        overlay.fullHealthTexture:SetAlpha(0)
    end

    updateUsableGlow(overlay, actionButton)
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
            hideUsableGlow(overlay)
            setTargetHighlightShown(overlay, false)
        end
    end
end

local actionBarController = CreateFrame("Frame")
local elapsedSinceRefresh = overlayRefreshIntervalSeconds

actionBarController:RegisterEvent("PLAYER_ENTERING_WORLD")
actionBarController:RegisterEvent("PLAYER_REGEN_DISABLED")
actionBarController:RegisterEvent("PLAYER_REGEN_ENABLED")
actionBarController:RegisterEvent("ACTION_USABLE_CHANGED")
actionBarController:RegisterEvent("PLAYER_TARGET_CHANGED")

actionBarController:SetScript("OnEvent", function(_, event)
    if event == "ACTION_USABLE_CHANGED" then
        refreshActionButtonOverlays()
        return
    end

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
