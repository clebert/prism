local _, Prism = ...

local markOfTheWildSpellIDs = {
    [1126] = true,
    [5232] = true,
    [6756] = true,
    [5234] = true,
    [8907] = true,
    [9884] = true,
    [9885] = true,
}

local thornsSpellIDs = {
    [467] = true,
    [782] = true,
    [1075] = true,
    [8914] = true,
    [9756] = true,
    [9910] = true,
}

Prism.classRules.DRUID = {
    {
        key = "mark-of-the-wild-missing",
        action = { spellIDs = markOfTheWildSpellIDs },
        condition = { mechanic = "self-target" },
        visual = "glow",
    },
    {
        key = "mark-of-the-wild-active",
        action = { spellIDs = markOfTheWildSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "player",
            filter = "HELPFUL",
            auraSpellIDs = markOfTheWildSpellIDs,
        },
        visual = "none",
        suppressGlow = "mark-of-the-wild-missing",
    },
    {
        key = "thorns-missing",
        action = { spellIDs = thornsSpellIDs },
        condition = { mechanic = "self-target" },
        visual = "glow",
    },
    {
        key = "thorns-active",
        action = { spellIDs = thornsSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "player",
            filter = "HELPFUL",
            auraSpellIDs = thornsSpellIDs,
        },
        visual = "none",
        suppressGlow = "thorns-missing",
    },
}
