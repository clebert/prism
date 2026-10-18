local suite = dofile("tests/scenarios.lua")
local scenario = suite.scenario

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
    local slot = containers[1].slots["spell-buff"]
    assert(slot.candidateFilters.includeSpellIDs[auraID], "The usability event did not refresh the action match.")
    assert(not slot.candidateFilters.includeSpellIDs[spellID])
end)

scenario("Shared buff highlights select the spell target", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    local otherSpellID = 999103
    client.actions[1] = { spellID = spellID, isUsable = false }
    client.helpfulSpells[spellID], client.helpfulSpells[auraID] = true, true
    client.selfBuffSpells[auraID] = true
    client.targetFriendly = true
    client.loadAddon()
    client.refresh()
    local container = client.getContainer("target", "spell-buff")
    assert(container, "The targetable buff highlight checks the player instead of the helpful target.")
    local slot = container.slots["spell-buff"]
    local frames = #client.frames

    for _, event in ipairs({ "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED" }) do
        client.event(event)
        for _, target in ipairs({
            { exists = true, friendly = true, unit = "target" },
            { exists = true, friendly = false, unit = "player" },
            { exists = false, friendly = false, unit = "player" },
            { exists = true, friendly = true, unit = "target" },
        }) do
            client.targetExists, client.targetFriendly = target.exists, target.friendly
            local refreshes = container.refreshCount
            client.event("PLAYER_TARGET_CHANGED")
            assert(container.refreshCount > refreshes, "The target change did not refresh the buff highlight.")
            for _, id in ipairs({ spellID, auraID, otherSpellID, spellID }) do
                client.actions[1].spellID = id
                client.event("ACTION_USABLE_CHANGED")
                local expectedUnit = id == spellID and target.unit or "player"
                assert(container.unit == expectedUnit, "The buff highlight selected the wrong unit for the action.")
                assert(slot.candidateFilters.includeSpellIDs[id])
                assert(client.alpha(container) == 1, "Usability changed the buff highlight.")
                for _, present in ipairs({ false, true }) do
                    client.setAuraPresent(slot, present)
                    assert(client.alpha(slot.texture) == (present and 1 or 0))
                end
            end
        end
    end
    assert(#client.frames == frames, "A target or action change replaced the buff highlight.")
    button.visible = false
    client.refresh()
    assert(client.alpha(container) == 0)
    button.visible = true
    client.refresh()
    assert(client.alpha(container) == 1)
    client.actions[1] = nil
    client.refresh()
    assert(not container.enabled)
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
    client.startRules(rules)
    client.refresh()
    local textureCount = 0
    local blink, glow
    for _, frame in ipairs(client.frames) do
        if frame.frameType == "Texture" and frame.parent ~= UIParent then
            assertHighlight(frame)
            textureCount = textureCount + 1
            if frame.color then
                assert(frame.color[1] == 1 and frame.color[2] == 0 and frame.color[3] == 0)
                local animation = frame.animationGroups[1]
                local fade = animation.animations[1]
                assert(animation.looping == "BOUNCE" and fade.animationType == "Alpha")
                assert(fade.fromAlpha == 0.2 and fade.toAlpha == 1 and fade.duration == 0.4)
                if frame.parent.frameType ~= "AuraButton" then
                    blink = frame
                end
            end
        elseif rawget(frame, "template") and frame.template:find("ActionButtonSpellAlertTemplate", 1, true) then
            assert(frame.allPoints or (frame.point and frame.point[1] == "CENTER"), "The glow is not centered.")
            assert(frame.mouseEnabled == false, "The glow intercepts mouse input.")
            local _, _, width, height = client.rectangle(frame)
            assertClose(width, 50.4, "The glow has the wrong width.")
            assertClose(height, 50.4, "The glow has the wrong height.")
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
    client.startRules({
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
    client.startRules({
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
        elseif rawget(frame, "template") and frame.template:find("ActionButtonSpellAlertTemplate", 1, true) then
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

scenario("A false ownership flag keeps every caster", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "shared-aura",
            action = action,
            condition = {
                mechanic = "aura", unit = "target", filter = "HARMFUL",
                auraSpellIDs = { [auraID] = true }, ownAura = false,
            },
            visual = "highlight",
        },
    })
    client.refresh()
    local slot = client.getContainer("target", "shared-aura").slots["shared-aura"]
    assert(slot.candidateFilters.isFromPlayerOrPlayerPet == nil, "A false ownership flag excludes the player's aura.")
end)

scenario("An aura glow follows button size changes during combat", function(client)
    local button = client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "aura-glow", action = action, visual = "glow",
            condition = { mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [auraID] = true } },
        },
    })
    client.refresh()
    local glow = client.getSpellGlow()
    assert(glow)
    client.event("PLAYER_REGEN_DISABLED")
    button.scale = 1.5
    client.refresh()
    local _, _, width, height = client.rectangle(glow)
    assertClose(width, 75.6, "The aura glow did not resize during combat.")
    assertClose(height, 75.6, "The aura glow has an incorrect height.")
    assert(client.getSpellGlow() == glow)
end)

scenario("An aura-owned texture denies visibility access during combat", function(client)
    local container = CreateFrame("AuraContainer", nil, UIParent, "CustomAuraContainerTemplate")
    local presenceTexture
    container:AddAuraSlot("presence", "HELPFUL", {
        initializeFrame = function(auraButton)
            presenceTexture = auraButton:CreateTexture()
            auraButton:AddDispelTypeTexture(presenceTexture, {
                showAlways = true,
                style = Enum.CustomAuraButtonDispelTypeTextureStyle.PreserveAsset,
            })
        end,
    })
    assert(type(presenceTexture:IsShown()) == "table")
    client.combatUnits.player = true
    local ok, message = pcall(function() return presenceTexture:IsShown() end)
    assert(not ok, "The mock allowed visibility access to an aura-owned texture during combat.")
    assert(tostring(message):find("forbidden", 1, true), "The visibility query failed for another reason.")
    client.combatUnits.player = false
    assert(type(presenceTexture:IsShown()) == "table")
end)

scenario("A hidden parent does not disable a texture mask", function(client)
    local parent = CreateFrame("Frame", nil, UIParent)
    local texture = UIParent:CreateTexture()
    local mask = parent:CreateMaskTexture()
    mask:SetAllPoints(texture)
    mask:SetTexture("Interface\\CharacterFrame\\TempPortraitAlphaMask", "CLAMPTOBLACKADDITIVE", "CLAMPTOBLACKADDITIVE")
    mask:SetTexCoord(2, 3, 2, 3)
    mask:Show()
    texture:AddMaskTexture(mask)
    parent:Hide()
    assert(client.alpha(texture) == 0, "A hidden parent disabled the mask.")
end)

scenario("Aura suppression ignores declaration order", function(client)
    client.addActionButton("ActionButton1", 1)
    client.actions[1] = { spellID = spellID }
    client.startRules({
        {
            key = "suppressor",
            action = action,
            condition = { mechanic = "aura", unit = "pet", filter = "HELPFUL", auraSpellIDs = { [auraID] = true } },
            visual = "highlight",
            suppressGlow = "suppressed-glow",
        },
        {
            key = "suppressed-glow",
            action = action,
            condition = { mechanic = "usable" },
            visual = "glow",
        },
    })
    client.refresh()
    local slot = client.getContainer("pet", "suppressor").slots.suppressor
    client.setAuraPresent(slot, false)
    client.refresh()
    local glow = client.getSpellGlow()
    assert(glow, "The dependency has no glow.")
    client.setAuraPresent(slot, true)
    client.refresh()
    assert(not client.getSpellGlow(), "The aura did not suppress the glow.")
    client.setAuraPresent(slot, false)
    client.refresh()
    assert(client.getSpellGlow() == glow, "Aura removal did not restore the glow.")
end)

suite.finish("Runtime")
