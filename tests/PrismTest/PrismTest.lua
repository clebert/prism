local markOfTheWildSpellIDs = {
    [1126] = true,
    [5232] = true,
    [6756] = true,
    [5234] = true,
    [8907] = true,
    [9884] = true,
    [9885] = true,
}
local checks = {
    { key = "outside-missing", combat = false, mark = false, glow = true, instruction = "Remove Mark from yourself outside combat." },
    { key = "outside-present", combat = false, mark = true, glow = false, instruction = "Apply Mark to yourself outside combat." },
    { key = "enter-combat", combat = true, mark = true, glow = false, instruction = "Enter combat with Mark active on yourself." },
    { key = "combat-missing", combat = true, mark = false, glow = true, instruction = "Remove Mark from yourself while combat remains active." },
    { key = "combat-present", combat = true, mark = true, glow = false, instruction = "Apply Mark to yourself while combat remains active." },
    { key = "leave-combat", combat = false, mark = true, glow = false, instruction = "Leave combat with Mark active on yourself." },
    { key = "outside-missing-again", combat = false, mark = false, glow = true, instruction = "Remove Mark from yourself outside combat again." },
}
local resultSchema = 1
local container, glow, panel
local combatLabel, stepLabel, instructionLabel, expectedLabel, helpLabel

local function updatePanel()
    local inCombat = UnitAffectingCombat("player")
    combatLabel:SetText(inCombat and "In combat." or "Out of combat.")
    local step = #PrismTestResults.checks + 1
    local check = checks[step]

    if not check then
        local failures = 0
        for _, result in ipairs(PrismTestResults.checks) do
            if not result.passed then
                failures = failures + 1
            end
        end
        stepLabel:SetText("Test complete.")
        instructionLabel:SetText(string.format("Checks: %d. Failures: %d.", #checks, failures))
        expectedLabel:SetText("Use /reload to save the report.")
        helpLabel:SetText("Use Reset to start another test.")
        return
    end

    stepLabel:SetText(string.format("Step %d of %d.", step, #checks))
    instructionLabel:SetText(check.instruction)
    expectedLabel:SetText(check.glow and "The center glow must be visible." or "The center glow must be hidden.")
    if inCombat ~= check.combat then
        helpLabel:SetText(check.combat and "Enter combat before this check." or "Leave combat before this check.")
    else
        helpLabel:SetText("Allow one second after the change. Click Pass or Fail after each check.")
    end
end

local function recordResult(passed)
    local check = checks[#PrismTestResults.checks + 1]
    if not check then
        return
    end

    local inCombat = UnitAffectingCombat("player")
    if inCombat ~= check.combat then
        updatePanel()
        return
    end

    local results = PrismTestResults.checks
    results[#results + 1] = {
        key = check.key,
        inCombat = inCombat,
        expectedMark = check.mark,
        expectedGlow = check.glow,
        passed = passed,
    }
    PrismTestResults.complete = #results == #checks
    updatePanel()
end

local function setVisible(visible)
    if visible then
        panel:Show()
        glow:Show()
        glow.ProcLoop:Play()
    else
        panel:Hide()
        glow:Hide()
        glow.ProcLoop:Stop()
    end
end

local function layoutOptions()
    -- Two viewport widths keep the active glow outside the viewport.
    return { elementWidth = UIParent:GetWidth() * 2, elementHeight = 1 }
end

local function resetResults()
    PrismTestResults = { schema = resultSchema, checks = {}, complete = false }
    container:SetAuraGroupLayout("mark", layoutOptions())
    updatePanel()
    setVisible(true)
end

local function createLabel(name, offsetY, height, text)
    local label = panel:CreateFontString(name, "OVERLAY", "GameFontNormal")
    label:SetPoint("TOP", panel, "TOP", 0, offsetY)
    label:SetSize(420, height)
    label:SetJustifyH("CENTER")
    label:SetText(text or "")
    return label
end

local function createButton(name, text, offsetX, callback)
    local button = CreateFrame("Button", name, panel, "UIPanelButtonTemplate")
    button:SetSize(92, 24)
    button:SetPoint("BOTTOM", panel, "BOTTOM", offsetX, 18)
    button:SetText(text)
    button:SetScript("OnClick", callback)
    button:Show()
end

local function initialize()
    if panel then
        return
    end

    if type(PrismTestResults) ~= "table" or PrismTestResults.schema ~= resultSchema or type(PrismTestResults.checks) ~= "table" then
        PrismTestResults = { schema = resultSchema, checks = {}, complete = false }
    end

    container = CreateFrame("AuraContainer", "PrismTestLayout", UIParent, "CustomAuraContainerTemplate")
    container:EnableMouse(false)
    container:SetUnit("player")
    -- The client keeps an empty layout one unit wide.
    container:SetPoint("TOPLEFT", UIParent, "CENTER", -1, 140)
    container:AddAuraGroup("mark", "HELPFUL", {
        maxFrameCount = 1,
        candidateFilters = { includeSpellIDs = markOfTheWildSpellIDs },
        layout = layoutOptions(),
        initializeFrame = function(marker)
            marker:EnableMouse(false)
        end,
    })
    container:Show()
    container:SetEnabled(true)

    glow = CreateFrame("Frame", "PrismTestGlow", UIParent, "ActionButtonSpellAlertTemplate,DisableUntrustedLayoutScriptsTemplate")
    glow:EnableMouse(false)
    glow:SetFrameStrata("HIGH")
    glow:SetSize(64, 64)
    glow:SetPoint("CENTER", container, "TOPRIGHT")

    panel = CreateFrame("Frame", "PrismTestPanel", UIParent)
    panel:SetFrameStrata("HIGH")
    panel:SetSize(460, 320)
    panel:SetPoint("CENTER", UIParent, "CENTER", 0, -70)

    local background = panel:CreateTexture(nil, "BACKGROUND")
    background:SetAllPoints()
    background:SetColorTexture(0, 0, 0, 0.85)

    createLabel("PrismTestTitle", -15, 24, "Prism Test: Secure layout")
    combatLabel = createLabel("PrismTestCombat", -45, 20)
    stepLabel = createLabel("PrismTestStep", -75, 24)
    instructionLabel = createLabel("PrismTestInstruction", -110, 50)
    expectedLabel = createLabel("PrismTestExpected", -165, 30)
    helpLabel = createLabel("PrismTestHelp", -210, 45)

    createButton("PrismTestPass", "Pass", -150, function() recordResult(true) end)
    createButton("PrismTestFail", "Fail", -50, function() recordResult(false) end)
    createButton("PrismTestReset", "Reset", 50, resetResults)
    createButton("PrismTestHide", "Hide", 150, function() setVisible(false) end)
    updatePanel()
    setVisible(true)
end

SLASH_PRISMTEST1 = "/prismtest"
SlashCmdList.PRISMTEST = function(message)
    if not panel then
        return
    end
    if message == "reset" then
        resetResults()
    else
        setVisible(true)
    end
end

local controller = CreateFrame("Frame")
controller:RegisterEvent("PLAYER_LOGIN")
controller:RegisterEvent("PLAYER_REGEN_DISABLED")
controller:RegisterEvent("PLAYER_REGEN_ENABLED")
controller:SetScript("OnEvent", function(_, event)
    if event == "PLAYER_LOGIN" then
        initialize()
    elseif panel then
        updatePanel()
    end
end)
