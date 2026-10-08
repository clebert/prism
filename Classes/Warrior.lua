local _, Prism = ...

local challengingShoutSpellIDs = {
    [1161] = true,
}
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
local intimidatingShoutSpellIDs = {
    [5246] = true,
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
-- Deep Wound uses the target aura ID, not the talent or the damage effect.
local fearBreakAuraSpellIDs = {
    [412609] = true,
}

for spellID in pairs(rendSpellIDs) do
    fearBreakAuraSpellIDs[spellID] = true
end

Prism.classRules.WARRIOR = {
    {
        key = "own-rend",
        action = { spellIDs = rendSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = rendSpellIDs,
            includeActionSpellID = true,
            ownAura = true,
        },
        visual = "highlight",
    },
    {
        key = "hamstring",
        action = { spellIDs = hamstringSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = hamstringSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "demoralizing-shout",
        action = { spellIDs = demoralizingShoutSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = demoralizingShoutSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "thunder-clap",
        action = { spellIDs = thunderClapSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = thunderClapSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "sunder-armor",
        action = { spellIDs = sunderArmorSpellIDs },
        condition = {
            mechanic = "aura-stacks",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = sunderArmorSpellIDs,
            includeActionSpellID = true,
            applications = 5,
        },
        visual = "highlight",
    },
    {
        key = "fear-break",
        action = { spellIDs = intimidatingShoutSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = fearBreakAuraSpellIDs,
        },
        requireUsable = true,
        visual = "red-blink",
    },
    {
        key = "taunt",
        action = { spellIDs = tauntSpellIDs },
        condition = { mechanic = "tanking" },
        visual = "highlight",
    },
    {
        key = "mocking-blow",
        action = { spellIDs = mockingBlowSpellIDs },
        condition = { mechanic = "tanking" },
        visual = "highlight",
    },
    {
        key = "challenging-shout",
        action = { spellIDs = challengingShoutSpellIDs },
        condition = { mechanic = "tanking" },
        visual = "highlight",
    },
    {
        key = "execute",
        action = { spellIDs = executeSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "overpower",
        action = { spellIDs = overpowerSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "revenge",
        action = { spellIDs = revengeSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "victory-rush",
        action = { spellIDs = victoryRushSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "shield-bash",
        action = { spellIDs = shieldBashSpellIDs },
        condition = { mechanic = "target-cast" },
        visual = "glow",
    },
}
