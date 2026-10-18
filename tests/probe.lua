local suite = dofile("tests/scenarios.lua")
local scenario = suite.scenario

local function frameNamed(client, name)
    for _, frame in ipairs(client.frames) do
        if rawget(frame, "name") == name then
            return frame
        end
    end
    error("The probe frame is missing: " .. name)
end

local function loadProbe(client, results)
    SlashCmdList = {}
    PrismTestResults = results
    assert(loadfile("tests/PrismTest/PrismTest.lua"))()
    client.event("PLAYER_LOGIN")
end

local function click(client, name)
    local button = frameNamed(client, name)
    button.scripts.OnClick(button)
end

scenario("The probe configures native layout without aura queries", function(client)
    loadProbe(client)
    local container = frameNamed(client, "PrismTestLayout")
    local glow = frameNamed(client, "PrismTestGlow")
    local group = container.groups.mark
    assert(container.unit == "player" and container.enabled)
    assert(group.filter == "HELPFUL" and group.maxFrameCount == 1)
    assert(next(group.candidateFilters.includeSpellIDs) and not group.candidateFilters.isFromPlayerOrPlayerPet)
    assert(group.layout.elementWidth == UIParent:GetWidth() * 2 and group.layout.elementHeight == 1)
    assert(container.point[1] == "TOPLEFT" and container.point[4] == -1)
    assert(glow.parent == UIParent and glow.point[2] == container and glow.point[3] == "TOPRIGHT")
    assert(glow.template:find("DisableUntrustedLayoutScriptsTemplate", 1, true))
    assert(glow.visible and glow.ProcLoop:IsPlaying())
    assert(next(container.slots) == nil and not container.layoutQueryCount)
    assert(SLASH_PRISMTEST1 == "/prismtest")
    local frames = #client.frames
    client.event("PLAYER_LOGIN")
    assert(#client.frames == frames, "The probe initialized twice.")
end)

scenario("The probe moves its glow outside the viewport for an active aura", function(client)
    loadProbe(client)
    local container = frameNamed(client, "PrismTestLayout")
    local glow = frameNamed(client, "PrismTestGlow")
    for _, inCombat in ipairs({ false, true }) do
        client.combatUnits.player = inCombat
        client.setAuraPresent(container.groups.mark, false)
        assert(client.getSpellGlow() == glow)
        client.setAuraPresent(container.groups.mark, true)
        assert(not client.getSpellGlow(), "The native layout did not move the glow outside the viewport.")
        client.setAuraPresent(container.groups.mark, false)
        assert(client.getSpellGlow() == glow)
    end
    assert(not container.layoutQueryCount)
end)

scenario("The probe records manual results and enforces combat steps", function(client)
    loadProbe(client)
    click(client, "PrismTestPass")
    click(client, "PrismTestFail")
    assert(#PrismTestResults.checks == 2)
    assert(PrismTestResults.checks[1].key == "outside-missing" and PrismTestResults.checks[1].passed)
    assert(not PrismTestResults.checks[1].expectedMark and PrismTestResults.checks[1].expectedGlow)
    assert(not PrismTestResults.checks[2].passed)
    click(client, "PrismTestPass")
    assert(#PrismTestResults.checks == 2, "The probe accepted a combat step outside combat.")
    assert(frameNamed(client, "PrismTestHelp").text == "Enter combat before this check.")
    client.event("PLAYER_REGEN_DISABLED")
    assert(frameNamed(client, "PrismTestCombat").text == "In combat.")
    for _ = 1, 3 do
        click(client, "PrismTestPass")
    end
    assert(#PrismTestResults.checks == 5 and PrismTestResults.checks[4].inCombat)
    assert(PrismTestResults.checks[4].key == "combat-missing" and PrismTestResults.checks[4].expectedGlow)
    click(client, "PrismTestPass")
    assert(#PrismTestResults.checks == 5, "The probe accepted an outside-combat step during combat.")
    client.event("PLAYER_REGEN_ENABLED")
    click(client, "PrismTestPass")
    click(client, "PrismTestPass")
    assert(PrismTestResults.complete and #PrismTestResults.checks == 7)
    assert(frameNamed(client, "PrismTestInstruction").text == "Checks: 7. Failures: 1.")
    click(client, "PrismTestFail")
    assert(#PrismTestResults.checks == 7)
    assert(not frameNamed(client, "PrismTestLayout").layoutQueryCount)
end)

scenario("The probe keeps saved results and supports hide and reset", function(client)
    local saved = { schema = 1, checks = { { key = "outside-missing", passed = true } }, complete = false }
    loadProbe(client, saved)
    assert(PrismTestResults == saved)
    assert(frameNamed(client, "PrismTestStep").text == "Step 2 of 7.")
    local panel = frameNamed(client, "PrismTestPanel")
    local glow = frameNamed(client, "PrismTestGlow")
    click(client, "PrismTestHide")
    assert(not panel.visible and not glow.visible and not glow.ProcLoop:IsPlaying())
    SlashCmdList.PRISMTEST("")
    assert(panel.visible and glow.visible and glow.ProcLoop:IsPlaying())
    local frames = #client.frames
    UIParent:SetSize(400, 300)
    SlashCmdList.PRISMTEST("reset")
    assert(PrismTestResults ~= saved and #PrismTestResults.checks == 0 and not PrismTestResults.complete)
    assert(frameNamed(client, "PrismTestLayout").groups.mark.layout.elementWidth == 800)
    assert(#client.frames == frames)
    click(client, "PrismTestPass")
    click(client, "PrismTestReset")
    assert(#PrismTestResults.checks == 0)
end)

suite.finish("Probe")
