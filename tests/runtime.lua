local failures = {}

local function scenario(name, callback)
    local client = dofile("tests/client.lua")
    client.class = "MAGE"
    local ok, message = pcall(callback, client)

    for _, frame in ipairs(client.frames) do
        if frame.frameType == "CheckButton" then
            _G[frame.name] = nil
        end
    end

    if ok then
        print(name .. " passed.")
    else
        failures[#failures + 1] = name .. ": " .. tostring(message)
        print(failures[#failures])
    end
end

local function assertClose(actual, expected, message)
    assert(type(actual) == "number" and math.abs(actual - expected) < 0.0001, message)
end

local function assertHighlight(texture)
    assert(texture.texture == "Interface\\Buttons\\CheckButtonHilight", "The highlight texture is missing.")
    assert(texture.allPoints == texture.parent, "The highlight does not cover its parent.")
    assert(texture.blendMode == "ADD", "The highlight has the wrong blend mode.")
    assert(texture.drawLayer == "OVERLAY" and texture.subLevel == 1, "The highlight has the wrong draw layer.")
end

-- Synthetic IDs keep these tests independent of client spell data.
local spellID = 999101
local auraID = 999102
local action = { spellIDs = { [spellID] = true } }

local function startRules(rules)
    local Prism = {}
    assert(loadfile("Core.lua"))("Prism", Prism)
    Prism.Start(rules)
end

scenario("Event registration and dispatch", function(client)
    client.loadAddon()
    local expectedEvents = {
        "PLAYER_ENTERING_WORLD",
        "PLAYER_REGEN_DISABLED",
        "PLAYER_REGEN_ENABLED",
        "ACTION_USABLE_CHANGED",
        "PLAYER_TARGET_CHANGED",
    }
    for _, event in ipairs(expectedEvents) do
        assert(client.controller.events[event], "The controller did not register " .. event .. ".")
    end
    local ok = pcall(client.event, "UNREGISTERED_TEST_EVENT")
    assert(not ok, "The mock dispatched an unregistered event.")
end)

scenario("Lifecycle event refreshes", function(client)
    client.addActionButton("ActionButton1", 1)
    client.addActionButton("ActionButton2", 2)
    client.actions[1] = { spellID = spellID }
    client.actions[2] = { spellID = auraID }
    client.loadAddon()
    client.refresh()
    local containers = {}
    for _, frame in ipairs(client.frames) do
        if frame.frameType == "AuraContainer" then
            containers[#containers + 1] = frame
        end
    end
    assert(#containers == 2)

    for _, event in ipairs({ "PLAYER_ENTERING_WORLD", "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED", "PLAYER_TARGET_CHANGED" }) do
        local counts = {}
        for index, container in ipairs(containers) do
            counts[index] = container.refreshCount
        end
        client.event(event)
        for index, container in ipairs(containers) do
            assert(container.refreshCount == counts[index] + 1, event .. " did not refresh every active aura container.")
        end
    end

    client.actions[1].spellID = auraID
    client.event("ACTION_USABLE_CHANGED")
    local slot = containers[1].slots["self-buff"]
    assert(slot.candidateFilters.includeSpellIDs[auraID], "The usability event did not refresh the action match.")
    assert(not slot.candidateFilters.includeSpellIDs[spellID])
end)

scenario("Refresh intervals", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.loadAddon()
    client.refresh(0)
    local function assertQueries(expected)
        local actual = client.actionQueryCount[1] or 0
        assert(actual == expected, "The refresh performed an unexpected number of action queries.")
    end
    assertQueries(1)
    client.refresh(0.04)
    client.refresh(0.04)
    assertQueries(1)
    client.refresh(0.03)
    assertQueries(2)
    client.refresh(0.25)
    assertQueries(3)
    client.refresh(0.03)
    assertQueries(3)
    client.refresh(0.02)
    assertQueries(4)

    client.actions[1].spellID = auraID
    client.event("PLAYER_TARGET_CHANGED")
    assertQueries(5)
    client.refresh(0)
    assertQueries(5)
end)

scenario("Visual construction and animation", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.fullHealthUnits.player = true
    local rules = {
        {
            key = "plain-highlight",
            action = action,
            condition = { mechanic = "full-health", unit = "player" },
            visual = "highlight",
        },
        {
            key = "plain-blink",
            action = action,
            condition = { mechanic = "usable" },
            visual = "red-blink",
        },
        {
            key = "plain-glow",
            action = action,
            condition = { mechanic = "usable" },
            visual = "glow",
        },
    }
    for _, visual in ipairs({ "highlight", "red-blink", "glow" }) do
        rules[#rules + 1] = {
            key = "aura-" .. visual,
            action = action,
            condition = { mechanic = "aura", unit = "target", filter = "HARMFUL", auraSpellIDs = { [auraID] = true } },
            visual = visual,
        }
    end
    rules[#rules + 1] = {
        key = "stacks",
        action = action,
        condition = {
            mechanic = "aura-stacks",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = { [auraID] = true },
            applications = 3,
        },
        visual = "highlight",
    }
    startRules(rules)
    client.refresh()
    local textureCount = 0
    local blink, glow
    for _, frame in ipairs(client.frames) do
        if frame.frameType == "Texture" and frame.parent ~= UIParent then
            assertHighlight(frame)
            textureCount = textureCount + 1
            if frame.color and frame.parent.frameType ~= "AuraButton" then
                blink = frame
            end
        elseif rawget(frame, "template") == "ActionButtonSpellAlertTemplate" then
            assert(frame.point[1] == "CENTER", "The glow is not centered.")
            assert(frame.mouseEnabled == false, "The glow intercepts mouse input.")
            assertClose(frame.width, 50.4, "The glow has the wrong width.")
            assertClose(frame.height, 50.4, "The glow has the wrong height.")
            if frame.parent.frameType ~= "AuraButton" then
                glow = frame
            end
        end
    end
    assert(textureCount == 5)
    assert(client.healthTexture.allPoints == client.healthTexture.parent)
    assert(blink and blink.animationGroups[1]:IsPlaying(), "The usable blink animation did not start.")
    assert(glow and glow.ProcLoop:IsPlaying(), "The usable glow animation did not start.")

    for _, key in ipairs({ "aura-highlight", "aura-red-blink", "aura-glow", "stacks" }) do
        local container = client.getContainer("target", key)
        local slot = container.slots[key]
        assert(container.strata == "HIGH" and container.mouseEnabled == false, "The aura container has incorrect frame settings.")
        assert(slot.frame and rawget(slot.frame, "allPoints") == container, "The aura slot does not cover its container.")
        assert(rawget(slot.frame, "mouseEnabled") == false, "The aura slot intercepts mouse input.")
        if key == "aura-red-blink" or key == "aura-glow" then
            assert(slot.animation, "The aura visual has no registered animation.")
        end
    end
    local stackSlot = client.getContainer("target", "stacks").slots.stacks
    assert(stackSlot.applicationBar.allPoints == stackSlot.frame, "The application bar does not cover its aura slot.")
    assert(stackSlot.applicationOptions.minApplications == 3 and stackSlot.applicationOptions.maxApplications == 3)

    client.actions[1].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(client.alpha(blink) == 0 and client.alpha(glow) == 0)
    assert(client.alpha(client.healthTexture) == 1, "Usability changed the independent health highlight.")
    client.actions[1].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(client.alpha(blink) == 1 and client.alpha(glow) == 1)
    client.actions[1] = nil
    client.refresh()
    assert(not blink.animationGroups[1]:IsPlaying(), "The removed action retained its blink animation.")
    assert(not glow.ProcLoop:IsPlaying(), "The removed action retained its glow animation.")
end)

scenario("Tanking usability", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID, isUsable = false }
    startRules({
        {
            key = "usable-tanking",
            action = action,
            condition = { mechanic = "tanking" },
            requireUsable = true,
            visual = "glow",
        },
    })
    client.refresh()
    assert(not client.getSpellGlow(), "An unusable tanking action activated the glow.")
    client.actions[1].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    local glow = client.getSpellGlow()
    assert(glow and glow.ProcLoop:IsPlaying(), "A usable tanking action has no glow.")
    assert(glow.parent.booleanInput and glow.parent.parent.booleanInput, "Tanking and usability share one alpha condition.")
    client.isTanking = false
    client.refresh()
    assert(not client.getSpellGlow(), "A usable action activated the glow without tanking.")
    client.actions[1].isUsable = false
    client.event("ACTION_USABLE_CHANGED")
    assert(not client.getSpellGlow())
    client.isTanking = true
    client.refresh()
    assert(not client.getSpellGlow(), "Tanking replaced the unusable action condition.")
    client.actions[1].isUsable = true
    client.event("ACTION_USABLE_CHANGED")
    assert(client.getSpellGlow() == glow)
end)

scenario("Bar discovery, placement, and reuse", function(client)
    local prefixes = {
        "ActionButton",
        "MultiBarBottomLeftButton",
        "MultiBarBottomRightButton",
        "MultiBarRightButton",
        "MultiBarLeftButton",
        "MultiBar5Button",
        "MultiBar6Button",
        "MultiBar7Button",
    }
    local buttons = {}
    for _, prefix in ipairs(prefixes) do
        for _, index in ipairs({ 1, 12 }) do
            local slot = #buttons + 1
            local button = client.addActionButton(prefix .. index, slot)
            button.left = slot * 40
            button.bottom = slot * 10
            button.scale = 1.5
            button.height = 24
            buttons[#buttons + 1] = button
            client.actions[slot] = { spellID = spellID }
        end
        client.addActionButton(prefix .. "13", 1)
    end
    client.addActionButton("UnsupportedButton1", 1)
    UIParent.scale = 0.75
    startRules({
        {
            key = "bar-aura",
            action = action,
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", includeActionSpellID = true },
            visual = "highlight",
        },
        {
            key = "bar-glow",
            action = action,
            condition = { mechanic = "usable" },
            visual = "glow",
        },
    })
    client.refresh()
    local containers, glows = {}, {}
    for _, frame in ipairs(client.frames) do
        if frame.frameType == "AuraContainer" then
            containers[#containers + 1] = frame
        elseif rawget(frame, "template") == "ActionButtonSpellAlertTemplate" then
            glows[#glows + 1] = frame
        end
    end
    assert(#containers == #buttons and #glows == #buttons, "The core did not discover exactly the supported buttons.")

    local function assertPlacement(scale, width, height)
        for index, button in ipairs(buttons) do
            local container = containers[index]
            local overlay = glows[index].parent.parent
            for _, region in ipairs({ container, overlay }) do
                assert(region.strata == "HIGH" and region.mouseEnabled == false, "The overlay has incorrect frame settings.")
                assert(region.point[1] == "BOTTOMLEFT" and region.point[2] == UIParent and region.point[3] == "BOTTOMLEFT")
                assertClose(region.point[4], button.left * scale, "The overlay has the wrong horizontal position.")
                assertClose(region.point[5], button.bottom * scale, "The overlay has the wrong vertical position.")
                assertClose(region.width, width, "The overlay has the wrong width.")
                assertClose(region.height, height, "The overlay has the wrong height.")
            end
            assertClose(container.padding[1], width, "The aura container has the wrong horizontal padding.")
            assertClose(container.padding[3], height, "The aura container has the wrong vertical padding.")
            assertClose(glows[index].width, width * 1.4, "The resized glow has the wrong width.")
            assertClose(glows[index].height, height * 1.4, "The resized glow has the wrong height.")
        end
    end
    assertPlacement(2, 72, 48)
    UIParent.scale = 1.25
    for _, button in ipairs(buttons) do
        button.left = button.left + 3
        button.bottom = button.bottom + 4
        button.width = 42
        button.height = 30
    end
    client.refresh()
    assertPlacement(1.2, 50.4, 36)
    local frameCount = #client.frames
    for _, button in ipairs(buttons) do
        button.visible = false
    end
    client.refresh()
    for index, container in ipairs(containers) do
        assert(client.alpha(container) == 0 and client.alpha(glows[index]) == 0, "A hidden bar retained a visual.")
    end
    for _, button in ipairs(buttons) do
        button.visible = true
    end
    client.refresh()
    assert(#client.frames == frameCount, "A visible bar did not reuse its overlays.")
    for index, container in ipairs(containers) do
        assert(client.alpha(container) == 1 and client.alpha(glows[index]) == 1, "A visible bar did not restore its visuals.")
    end
end)

assert(#failures == 0, table.concat(failures, "\n"))
print("Runtime tests passed.")
