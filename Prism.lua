local selfBuffAuraSlotKey = "self-buff"
local bandagePoisonAuraSlotKey = "bandage-poison"
local antiVenomPoisonAuraSlotKey = "anti-venom-poison"
local poulticeDiseaseAuraSlotKey = "poultice-disease"
local ownRendAuraSlotKey = "own-rend"
-- HARMFUL|PLAYER keeps harmful auras cast by the player, the pet, or the vehicle.
local ownDebuffAuraFilter = "HARMFUL|PLAYER"
local hamstringAuraSlotKey = "hamstring"
local demoralizingShoutAuraSlotKey = "demoralizing-shout"
local thunderClapAuraSlotKey = "thunder-clap"
local sunderArmorAuraSlotKey = "sunder-armor"
-- HARMFUL matches any harmful aura. These spells have one shared debuff.
local sharedDebuffAuraFilter = "HARMFUL"
-- The bar appears when the aura has this many applications.
local sunderArmorFullStackCount = 5
-- Includes every usable Anti-Venom item.
local antiVenomItemIDs = {
    [6452] = true,
    [6453] = true,
    [19440] = true,
    [255715] = true,
}
-- Includes every usable poultice item.
local poulticeItemIDs = {
    [255716] = true,
    [255717] = true,
    [255718] = true,
    [255719] = true,
}
-- Each table includes every spell rank that an action button can store.
local demoralizingShoutSpellIDs = {
    [1160] = true,
    [6190] = true,
    [11554] = true,
    [11555] = true,
    [11556] = true,
}
local executeSpellIDs = {
    [5308] = true,
    [20658] = true,
    [20660] = true,
    [20661] = true,
    [20662] = true,
}
local hamstringSpellIDs = {
    [1715] = true,
    [7372] = true,
    [7373] = true,
}
local mockingBlowSpellIDs = {
    [694] = true,
    [7400] = true,
    [7402] = true,
    [20559] = true,
    [20560] = true,
}
local overpowerSpellIDs = {
    [7384] = true,
    [7887] = true,
    [11584] = true,
    [11585] = true,
}
local rendSpellIDs = {
    [772] = true,
    [6546] = true,
    [6547] = true,
    [6548] = true,
    [11572] = true,
    [11573] = true,
    [11574] = true,
}
local revengeSpellIDs = {
    [6572] = true,
    [6574] = true,
    [7379] = true,
    [11600] = true,
    [11601] = true,
    [25288] = true,
}
local shieldBashSpellIDs = {
    [72] = true,
    [1671] = true,
    [1672] = true,
}
local sunderArmorSpellIDs = {
    [7386] = true,
    [7405] = true,
    [8380] = true,
    [11596] = true,
    [11597] = true,
}
local tauntSpellIDs = {
    [355] = true,
}
local thunderClapSpellIDs = {
    [6343] = true,
    [8198] = true,
    [8204] = true,
    [8205] = true,
    [11580] = true,
    [11581] = true,
}
local victoryRushSpellIDs = {
    [402927] = true,
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
local spellGlowScale = 1.4
local bandagePoisonMinimumAlpha = 0.2
local bandagePoisonBlinkDurationSeconds = 0.4
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

local function initializeAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()
    createHighlightTexture(auraButton)
end

local function initializeBandagePoisonAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local texture = createHighlightTexture(auraButton)
    texture:SetVertexColor(1, 0, 0)

    local blink = texture:CreateAnimationGroup()
    blink:SetLooping("BOUNCE")

    local fade = blink:CreateAnimation("Alpha")
    fade:SetFromAlpha(bandagePoisonMinimumAlpha)
    fade:SetToAlpha(1)
    fade:SetDuration(bandagePoisonBlinkDurationSeconds)

    auraButton:AddAuraShownAnimation(blink)
end

-- initializeFrame cannot return the glow frame.
local createdCleanseGlowFrame

local function initializeCleanseGlowAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local glowFrame = CreateFrame("Frame", nil, auraButton, "ActionButtonSpellAlertTemplate")
    glowFrame:SetPoint("CENTER")
    glowFrame:EnableMouse(false)
    glowFrame:Show()
    auraButton:AddAuraShownAnimation(glowFrame.ProcLoop)
    createdCleanseGlowFrame = glowFrame
end

local function takeCreatedCleanseGlowFrame()
    local glowFrame = createdCleanseGlowFrame
    createdCleanseGlowFrame = nil
    return glowFrame
end

-- The slot frame appears at the first stack. The bar appears at the full stack count.
-- Addon code does not read that count.
local function initializeSunderArmorAuraButton(auraButton)
    auraButton:EnableMouse(false)
    auraButton:SetAllPoints()

    local applicationBar = CreateFrame("StatusBar", nil, auraButton)
    applicationBar:SetAllPoints()
    applicationBar:EnableMouse(false)
    applicationBar:Hide()

    createHighlightTexture(applicationBar)

    auraButton:SetApplicationBar(applicationBar, {
        minApplications = sunderArmorFullStackCount,
        maxApplications = sunderArmorFullStackCount,
    })
end

local function isSpell(spellID, spellIDs)
    if not spellID then
        return false
    end

    if spellIDs[spellID] then
        return true
    end

    local baseSpellID = C_Spell.GetBaseSpell(spellID)

    return baseSpellID ~= nil and spellIDs[baseSpellID] == true
end

local function isUsableGlowSpell(spellID)
    return isSpell(spellID, executeSpellIDs)
        or isSpell(spellID, overpowerSpellIDs)
        or isSpell(spellID, revengeSpellIDs)
        or isSpell(spellID, victoryRushSpellIDs)
end

local function isAggroHighlightSpell(spellID)
    return isSpell(spellID, tauntSpellIDs) or isSpell(spellID, mockingBlowSpellIDs)
end

local function isCastGlowSpell(spellID)
    return isSpell(spellID, shieldBashSpellIDs)
end

local function createExactSpellCandidateFilters(spellID)
    local includeSpellIDs = {}

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createRankedSpellCandidateFilters(spellIDs, actionSpellID, isFromPlayerOrPlayerPet)
    local includeSpellIDs = {}

    for spellID in pairs(spellIDs) do
        includeSpellIDs[spellID] = true
    end

    if actionSpellID then
        includeSpellIDs[actionSpellID] = true
    end

    return {
        includeSpellIDs = includeSpellIDs,
        isFromPlayerOrPlayerPet = isFromPlayerOrPlayerPet,
    }
end

local function createActionButtonOverlay()
    local auraContainer = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    auraContainer:SetFrameStrata("HIGH")
    auraContainer:EnableMouse(false)
    auraContainer:SetUnit("player")
    auraContainer:AddAuraSlot(selfBuffAuraSlotKey, "HELPFUL", {
        candidateFilters = createExactSpellCandidateFilters(nil),
        initializeFrame = initializeAuraButton,
    })
    auraContainer:Show()
    auraContainer:SetEnabled(true)

    local fullHealthTexture = createHighlightTexture(auraContainer)
    fullHealthTexture:SetAlpha(0)

    local aggroHighlightTexture = createHighlightTexture(auraContainer)
    aggroHighlightTexture:SetAlpha(0)

    return {
        auraContainer = auraContainer,
        fullHealthTexture = fullHealthTexture,
        aggroHighlightTexture = aggroHighlightTexture,
        isVisible = true,
    }
end

local function refreshAuraStates()
    for _, overlay in pairs(actionButtonOverlays) do
        overlay.auraContainer:UpdateAllAuras()

        if overlay.targetAuraContainer then
            overlay.targetAuraContainer:UpdateAllAuras()
        end

        if overlay.cleanseAuraContainerEnabled then
            overlay.cleanseAuraContainer:UpdateAllAuras()
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

local function ensureCleanseAuraContainer(overlay)
    local auraContainer = overlay.cleanseAuraContainer

    if auraContainer then
        return auraContainer
    end

    auraContainer = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    auraContainer:SetFrameStrata("HIGH")
    auraContainer:SetFrameLevel(overlay.auraContainer:GetFrameLevel() + 1)
    auraContainer:EnableMouse(false)
    auraContainer:SetUnit("player")
    auraContainer:SetAlpha(0)
    auraContainer:SetEnabled(false)
    auraContainer:AddAuraSlot(bandagePoisonAuraSlotKey, "HARMFUL", {
        candidateFilters = { includeDispelTypes = { Poison = true } },
        initializeFrame = initializeBandagePoisonAuraButton,
    })
    auraContainer:AddAuraSlot(antiVenomPoisonAuraSlotKey, "HARMFUL", {
        candidateFilters = { includeDispelTypes = { Poison = true } },
        initializeFrame = initializeCleanseGlowAuraButton,
    })
    overlay.antiVenomGlowFrame = takeCreatedCleanseGlowFrame()
    auraContainer:AddAuraSlot(poulticeDiseaseAuraSlotKey, "HARMFUL", {
        candidateFilters = { includeDispelTypes = { Disease = true } },
        initializeFrame = initializeCleanseGlowAuraButton,
    })
    overlay.poulticeGlowFrame = takeCreatedCleanseGlowFrame()
    auraContainer:SetAuraSlotEnabled(bandagePoisonAuraSlotKey, false)
    auraContainer:SetAuraSlotEnabled(antiVenomPoisonAuraSlotKey, false)
    auraContainer:SetAuraSlotEnabled(poulticeDiseaseAuraSlotKey, false)
    auraContainer:Show()
    overlay.cleanseAuraContainer = auraContainer
    overlay.cleanseAuraContainerEnabled = false
    overlay.bandagePoisonAuraSlotEnabled = false
    overlay.antiVenomPoisonAuraSlotEnabled = false
    overlay.poulticeDiseaseAuraSlotEnabled = false
    return auraContainer
end

local function setCleanseAuraContainerEnabled(overlay, enabled)
    if not overlay.cleanseAuraContainer or overlay.cleanseAuraContainerEnabled == enabled then
        return
    end

    overlay.cleanseAuraContainer:SetEnabled(enabled)
    overlay.cleanseAuraContainerEnabled = enabled
end

local function setCleanseAuraSlotEnabled(overlay, slotKey, stateKey, enabled)
    if overlay[stateKey] == enabled then
        return
    end

    overlay.cleanseAuraContainer:SetAuraSlotEnabled(slotKey, enabled)
    overlay[stateKey] = enabled
end

local function ensureOwnRendSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasOwnRendSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(ownRendAuraSlotKey, ownDebuffAuraFilter, {
        candidateFilters = createRankedSpellCandidateFilters(rendSpellIDs, spellID, true),
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
        candidateFilters = createRankedSpellCandidateFilters(demoralizingShoutSpellIDs, spellID),
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
        candidateFilters = createRankedSpellCandidateFilters(thunderClapSpellIDs, spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasThunderClapSlot = true
    overlay.thunderClapSlotEnabled = true
    overlay.thunderClapSpellID = spellID
    return targetAuraContainer
end

local function ensureSunderArmorSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasSunderArmorSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(sunderArmorAuraSlotKey, sharedDebuffAuraFilter, {
        candidateFilters = createRankedSpellCandidateFilters(sunderArmorSpellIDs, spellID),
        initializeFrame = initializeSunderArmorAuraButton,
    })
    overlay.hasSunderArmorSlot = true
    overlay.sunderArmorSlotEnabled = true
    overlay.sunderArmorSpellID = spellID
    return targetAuraContainer
end

local function ensureHamstringSlot(overlay, spellID)
    local targetAuraContainer = ensureTargetAuraContainer(overlay)

    if overlay.hasHamstringSlot then
        return targetAuraContainer
    end

    targetAuraContainer:AddAuraSlot(hamstringAuraSlotKey, sharedDebuffAuraFilter, {
        candidateFilters = createRankedSpellCandidateFilters(hamstringSpellIDs, spellID),
        initializeFrame = initializeAuraButton,
    })
    overlay.hasHamstringSlot = true
    overlay.hamstringSlotEnabled = true
    overlay.hamstringSpellID = spellID
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

    if activeStateKey ~= "hamstringSlotEnabled" and overlay.hamstringSlotEnabled then
        setTargetAuraSlotEnabled(targetAuraContainer, hamstringAuraSlotKey, false, "hamstringSlotEnabled", overlay)
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

    if activeStateKey ~= "sunderArmorSlotEnabled" and overlay.sunderArmorSlotEnabled then
        setTargetAuraSlotEnabled(
            targetAuraContainer,
            sunderArmorAuraSlotKey,
            false,
            "sunderArmorSlotEnabled",
            overlay
        )
    end
end

local function updateTargetAuraHighlight(overlay, spellID)
    local isRend = isSpell(spellID, rendSpellIDs)
    local isHamstring = isSpell(spellID, hamstringSpellIDs)
    local isDemoralizingShout = isSpell(spellID, demoralizingShoutSpellIDs)
    local isThunderClap = isSpell(spellID, thunderClapSpellIDs)
    local isSunderArmor = isSpell(spellID, sunderArmorSpellIDs)
    local targetAuraContainer = overlay.targetAuraContainer

    if isRend then
        targetAuraContainer = ensureOwnRendSlot(overlay, spellID)

        if overlay.ownRendSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                ownRendAuraSlotKey,
                createRankedSpellCandidateFilters(rendSpellIDs, spellID, true)
            )
            overlay.ownRendSpellID = spellID
        end

        setTargetAuraSlotEnabled(targetAuraContainer, ownRendAuraSlotKey, true, "ownRendSlotEnabled", overlay)
        disableInactiveTargetSlots(overlay, targetAuraContainer, "ownRendSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isHamstring then
        targetAuraContainer = ensureHamstringSlot(overlay, spellID)

        if overlay.hamstringSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                hamstringAuraSlotKey,
                createRankedSpellCandidateFilters(hamstringSpellIDs, spellID)
            )
            overlay.hamstringSpellID = spellID
        end

        setTargetAuraSlotEnabled(targetAuraContainer, hamstringAuraSlotKey, true, "hamstringSlotEnabled", overlay)
        disableInactiveTargetSlots(overlay, targetAuraContainer, "hamstringSlotEnabled")
        setTargetHighlightShown(overlay, true)
        return
    end

    if isDemoralizingShout then
        targetAuraContainer = ensureDemoralizingShoutSlot(overlay, spellID)

        if overlay.demoralizingShoutSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                demoralizingShoutAuraSlotKey,
                createRankedSpellCandidateFilters(demoralizingShoutSpellIDs, spellID)
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
                createRankedSpellCandidateFilters(thunderClapSpellIDs, spellID)
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

    if isSunderArmor then
        targetAuraContainer = ensureSunderArmorSlot(overlay, spellID)

        if overlay.sunderArmorSpellID ~= spellID then
            targetAuraContainer:SetAuraSlotCandidateFilters(
                sunderArmorAuraSlotKey,
                createRankedSpellCandidateFilters(sunderArmorSpellIDs, spellID)
            )
            overlay.sunderArmorSpellID = spellID
        end

        setTargetAuraSlotEnabled(
            targetAuraContainer,
            sunderArmorAuraSlotKey,
            true,
            "sunderArmorSlotEnabled",
            overlay
        )
        disableInactiveTargetSlots(overlay, targetAuraContainer, "sunderArmorSlotEnabled")
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

-- Size the stored glow from the button. Do not read the slot frame.
local function placeStoredGlow(overlay, glowFrame, widthKey, heightKey)
    if not glowFrame or not overlay.width or not overlay.height then
        return
    end

    local glowWidth = overlay.width * spellGlowScale
    local glowHeight = overlay.height * spellGlowScale

    if overlay[widthKey] == glowWidth and overlay[heightKey] == glowHeight then
        return
    end

    overlay[widthKey] = glowWidth
    overlay[heightKey] = glowHeight
    glowFrame:SetSize(glowWidth, glowHeight)
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
    placeStoredGlow(overlay, overlay.antiVenomGlowFrame, "antiVenomGlowWidth", "antiVenomGlowHeight")
    placeStoredGlow(overlay, overlay.poulticeGlowFrame, "poulticeGlowWidth", "poulticeGlowHeight")

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

    if overlay.cleanseAuraContainer then
        if not overlay.cleansePlacement then
            overlay.cleansePlacement = {}
        end

        placeAuraContainer(
            overlay.cleanseAuraContainer,
            overlay.cleansePlacement,
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

-- The first result is nil while the client holds no data for the item.
local function isBandageAction(actionButton)
    local actionSlotID = actionButton.action

    if not actionSlotID or actionSlotID <= 0 or not C_ActionBar.HasAction(actionSlotID) then
        return false, nil
    end

    local actionType, itemID = GetActionInfo(actionSlotID)

    if actionType ~= "item" or not itemID then
        return false, nil
    end

    local _, _, _, _, _, classID, subClassID = C_Item.GetItemInfoInstant(itemID)

    if not classID then
        return nil, itemID
    end

    local isBandage = classID == Enum.ItemClass.Consumable
        and subClassID == Enum.ItemConsumableSubclass.Bandage
    return isBandage, itemID
end

local function getHealTargetUnit()
    if UnitExists("target") and UnitCanAssist("player", "target") then
        return "target"
    end

    return "player"
end

local function updateCleanseActionHighlight(overlay, actionButton)
    local auraContainer = overlay.cleanseAuraContainer

    if not overlay.isBandage and not overlay.isAntiVenom and not overlay.isPoultice then
        if auraContainer then
            auraContainer:SetAlphaFromBoolean(false, booleanTrueAlpha, 0)
            setCleanseAuraContainerEnabled(overlay, false)
        end

        return
    end

    auraContainer = ensureCleanseAuraContainer(overlay)
    auraContainer:SetUnit(getHealTargetUnit())
    setCleanseAuraSlotEnabled(
        overlay,
        bandagePoisonAuraSlotKey,
        "bandagePoisonAuraSlotEnabled",
        overlay.isBandage
    )
    setCleanseAuraSlotEnabled(
        overlay,
        antiVenomPoisonAuraSlotKey,
        "antiVenomPoisonAuraSlotEnabled",
        overlay.isAntiVenom
    )
    setCleanseAuraSlotEnabled(
        overlay,
        poulticeDiseaseAuraSlotKey,
        "poulticeDiseaseAuraSlotEnabled",
        overlay.isPoultice
    )
    setCleanseAuraContainerEnabled(overlay, true)

    local isUsable = C_ActionBar.IsUsableAction(actionButton.action)
    auraContainer:SetAlphaFromBoolean(isUsable, booleanTrueAlpha, 0)
end

local function isTargetCastingOrChanneling()
    local _, _, _, _, _, isTradeSkill = UnitCastingInfo("target")

    if isTradeSkill ~= nil then
        return true
    end

    local _, _, _, _, _, isChannelTradeSkill = UnitChannelInfo("target")

    return isChannelTradeSkill ~= nil
end

local function ensureSpellGlowFrame(overlay)
    local glowFrame = overlay.spellGlowFrame

    if glowFrame then
        return glowFrame
    end

    glowFrame = CreateFrame("Frame", nil, overlay.auraContainer, "ActionButtonSpellAlertTemplate")
    glowFrame:SetPoint("CENTER")
    glowFrame:EnableMouse(false)
    overlay.spellGlowFrame = glowFrame
    return glowFrame
end

local function hideSpellGlow(overlay)
    local glowFrame = overlay.spellGlowFrame

    if not glowFrame then
        return
    end

    glowFrame.ProcLoop:Stop()
    glowFrame:Hide()
end

local function updateSpellGlow(overlay, actionButton)
    if
        (not overlay.isUsableGlowSpell and not overlay.isCastGlowSpell)
        or not actionButton.action
        or actionButton.action <= 0
    then
        hideSpellGlow(overlay)
        return
    end

    if overlay.isCastGlowSpell then
        if
            not UnitExists("target")
            or not UnitCanAttack("player", "target")
            or UnitIsDeadOrGhost("target")
            or not isTargetCastingOrChanneling()
        then
            hideSpellGlow(overlay)
            return
        end
    end

    local glowFrame = ensureSpellGlowFrame(overlay)

    if overlay.width and overlay.height then
        local glowWidth = overlay.width * spellGlowScale
        local glowHeight = overlay.height * spellGlowScale

        if overlay.spellGlowWidth ~= glowWidth or overlay.spellGlowHeight ~= glowHeight then
            overlay.spellGlowWidth = glowWidth
            overlay.spellGlowHeight = glowHeight
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
    glowFrame:SetAlphaFromBoolean(isUsable, booleanTrueAlpha, 0)
end

local function updateFullHealthAlpha(texture, unit)
    if UnitIsDeadOrGhost(unit) then
        texture:SetAlpha(0)
        return
    end

    texture:SetAlpha(UnitHealthPercent(unit, false, fullHealthCurve))
end

local function updateAggroHighlight(overlay)
    local texture = overlay.aggroHighlightTexture

    if
        not overlay.isAggroHighlightSpell
        or not UnitExists("target")
        or not UnitCanAttack("player", "target")
        or UnitIsDeadOrGhost("target")
    then
        texture:SetAlpha(0)
        return
    end

    local threatStatus = UnitThreatSituation("player", "target")

    if threatStatus == nil then
        texture:SetAlpha(0)
        return
    end

    local isTanking = UnitDetailedThreatSituation("player", "target")
    texture:SetAlphaFromBoolean(isTanking, booleanTrueAlpha, 0)
end

local function updateActionButtonOverlay(actionButton)
    local actionButtonName = actionButton:GetName()
    local spellID = getActionSpellID(actionButton)
    local overlay = actionButtonOverlays[actionButtonName]
    local isBandage, actionItemID = isBandageAction(actionButton)
    local isAntiVenom = antiVenomItemIDs[actionItemID] == true
    local isPoultice = poulticeItemIDs[actionItemID] == true

    if overlay and isBandage == nil and overlay.actionItemID == actionItemID then
        isBandage = overlay.isBandage
    end

    if not overlay and not spellID and not isBandage and not isAntiVenom and not isPoultice then
        return
    end

    if not overlay then
        overlay = createActionButtonOverlay()
        actionButtonOverlays[actionButtonName] = overlay
    end

    overlay.lastRefreshGeneration = refreshGeneration
    overlay.actionItemID = actionItemID
    overlay.isBandage = isBandage == true
    overlay.isAntiVenom = isAntiVenom
    overlay.isPoultice = isPoultice

    if not overlay.isVisible then
        overlay.auraContainer:SetAlpha(1)
        overlay.isVisible = true
    end

    if overlay.spellID ~= spellID then
        overlay.auraContainer:SetAuraSlotCandidateFilters(
            selfBuffAuraSlotKey,
            createExactSpellCandidateFilters(spellID)
        )
        overlay.spellID = spellID
        overlay.isUsableGlowSpell = isUsableGlowSpell(spellID)
        overlay.isAggroHighlightSpell = isAggroHighlightSpell(spellID)
        overlay.isCastGlowSpell = isCastGlowSpell(spellID)
    end

    updateTargetAuraHighlight(overlay, spellID)
    updateAggroHighlight(overlay)
    updateCleanseActionHighlight(overlay, actionButton)
    placeActionButtonOverlay(overlay, actionButton)

    if overlay.isBandage then
        updateFullHealthAlpha(overlay.fullHealthTexture, getHealTargetUnit())
    else
        overlay.fullHealthTexture:SetAlpha(0)
    end

    updateSpellGlow(overlay, actionButton)
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
            hideSpellGlow(overlay)
            setTargetHighlightShown(overlay, false)

            if overlay.cleanseAuraContainer then
                overlay.cleanseAuraContainer:SetAlphaFromBoolean(false, booleanTrueAlpha, 0)
                setCleanseAuraContainerEnabled(overlay, false)
            end
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

    if event == "PLAYER_TARGET_CHANGED" then
        refreshActionButtonOverlays()
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
