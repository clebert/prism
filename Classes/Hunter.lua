local _, Prism = ...

local serpentStingSpellIDs = {
    [1978] = true,
    [13549] = true,
    [13550] = true,
    [13551] = true,
    [13552] = true,
    [13553] = true,
    [13554] = true,
    [13555] = true,
    [25295] = true,
}
local viperStingSpellIDs = {
    [3034] = true,
    [14279] = true,
    [14280] = true,
}
local scorpidStingSpellIDs = {
    [3043] = true,
}
local huntersMarkSpellIDs = {
    [1130] = true,
    [14323] = true,
    [14324] = true,
    [14325] = true,
}
local concussiveShotSpellIDs = {
    [5116] = true,
}
local wingClipSpellIDs = {
    [2974] = true,
    [14267] = true,
    [14268] = true,
}
local mongooseBiteSpellIDs = {
    [1495] = true,
    [14269] = true,
    [14270] = true,
    [14271] = true,
}
local counterattackSpellIDs = {
    [19306] = true,
    [20909] = true,
    [20910] = true,
    [1242634] = true,
}
local disengageSpellIDs = {
    [781] = true,
    [14272] = true,
    [14273] = true,
}
local mendPetSpellIDs = {
    [136] = true,
    [3111] = true,
    [3661] = true,
    [3662] = true,
    [13542] = true,
    [13543] = true,
    [13544] = true,
}

Prism.classRules.HUNTER = {
    {
        key = "own-serpent-sting",
        action = { spellIDs = serpentStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = serpentStingSpellIDs,
            includeActionSpellID = true,
            ownAura = true,
        },
        visual = "highlight",
    },
    {
        key = "own-viper-sting",
        action = { spellIDs = viperStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = viperStingSpellIDs,
            includeActionSpellID = true,
            ownAura = true,
        },
        visual = "highlight",
    },
    {
        key = "scorpid-sting",
        action = { spellIDs = scorpidStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = scorpidStingSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "hunters-mark",
        action = { spellIDs = huntersMarkSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = huntersMarkSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "concussive-shot",
        action = { spellIDs = concussiveShotSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = concussiveShotSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "wing-clip",
        action = { spellIDs = wingClipSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = wingClipSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "mongoose-bite",
        action = { spellIDs = mongooseBiteSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "counterattack",
        action = { spellIDs = counterattackSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "disengage",
        action = { spellIDs = disengageSpellIDs },
        condition = { mechanic = "tanking" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "mend-pet-full-health",
        action = { spellIDs = mendPetSpellIDs },
        condition = { mechanic = "full-health", unit = "pet" },
        visual = "highlight",
    },
}
