local auraSlotKey = "self-buff"
local buttonNamePrefixes = {
    "ActionButton",
    "MultiBarBottomLeftButton",
    "MultiBarBottomRightButton",
    "MultiBarRightButton",
    "MultiBarLeftButton",
    "MultiBar5Button",
    "MultiBar6Button",
    "MultiBar7Button",
}
local buttonsPerBar = 12
local overlays = {}
local rects = {}
local seenNames = {}

local function initializeAuraButton(button)
    button:EnableMouse(false)
    button:SetAllPoints()

    local dim = button:CreateTexture(nil, "ARTWORK", nil, 0)
    local checked = button:CreateTexture(nil, "OVERLAY", nil, 1)

    if dim then
        dim:SetAllPoints()
        dim:SetColorTexture(0, 0, 0, 0.55)
        dim:Show()
    end

    if checked then
        checked:SetAllPoints()
        checked:SetTexture("Interface\\Buttons\\CheckButtonHilight")
        checked:SetBlendMode("ADD")
        checked:Show()
    end
end

local function createCandidateFilters(spellID)
    local includeSpellIDs = {}

    if spellID then
        includeSpellIDs[spellID] = true
    end

    return { includeSpellIDs = includeSpellIDs }
end

local function createButtonOverlay()
    local frame = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    frame:SetFrameStrata("TOOLTIP")
    frame:SetFrameLevel(10000)
    frame:EnableMouse(false)
    frame:SetUnit("player")
    frame:AddAuraSlot(auraSlotKey, "HELPFUL", {
        candidateFilters = createCandidateFilters(nil),
        initializeFrame = initializeAuraButton,
    })
    frame:Show()

    return { frame = frame }
end

local function placeOverlay(frame, button, name)
    local left = button:GetLeft()
    local bottom = button:GetBottom()

    if left and bottom then
        local scale = button:GetEffectiveScale() / UIParent:GetEffectiveScale()
        rects[name] = {
            bottom = bottom * scale,
            height = button:GetHeight() * scale,
            left = left * scale,
            width = button:GetWidth() * scale,
        }
    end

    local rect = rects[name]

    if not rect then
        return
    end

    frame:ClearAllPoints()
    frame:SetPoint("BOTTOMLEFT", UIParent, "BOTTOMLEFT", rect.left, rect.bottom)
    frame:SetSize(rect.width, rect.height)
end

local function getActionSpellID(button)
    local actionSlotID = button.action

    if not actionSlotID or actionSlotID <= 0 or not C_ActionBar.HasAction(actionSlotID) then
        return nil
    end

    local spellID = C_ActionBar.GetSpell(actionSlotID)

    if spellID and spellID > 0 then
        return spellID
    end

    return nil
end

local function updateButtonOverlay(button)
    local name = button:GetName()
    local spellID = getActionSpellID(button)
    local overlay = overlays[name]

    if not overlay and not spellID then
        return
    end

    if not overlay then
        overlay = createButtonOverlay()
        overlays[name] = overlay
    end

    seenNames[name] = true
    overlay.frame:SetAlpha(1)
    placeOverlay(overlay.frame, button, name)

    if overlay.spellID ~= spellID then
        overlay.frame:SetAuraSlotCandidateFilters(auraSlotKey, createCandidateFilters(spellID))
        overlay.spellID = spellID
    end
end

local controller = CreateFrame("Frame")
controller:SetScript("OnUpdate", function()
    for name in pairs(overlays) do
        seenNames[name] = nil
    end

    for _, prefix in ipairs(buttonNamePrefixes) do
        for buttonIndex = 1, buttonsPerBar do
            local button = rawget(_G, prefix .. buttonIndex)

            if button and button:IsVisible() then
                updateButtonOverlay(button)
            end
        end
    end

    for name, overlay in pairs(overlays) do
        if not seenNames[name] then
            overlay.frame:SetAlpha(0)
        end
    end
end)
