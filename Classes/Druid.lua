local _, Prism = ...
local Rules = Prism.Rules

local entanglingRootsSpellIDs = {
    [339] = true,
    [1062] = true,
    [5195] = true,
    [5196] = true,
    [9852] = true,
    [9853] = true,
}
local markOfTheWildSpellIDs = {
    [1126] = true,
    [5232] = true,
    [6756] = true,
    [5234] = true,
    [8907] = true,
    [9884] = true,
    [9885] = true,
}
local moonfireSpellIDs = {
    [8921] = true,
    [8924] = true,
    [8925] = true,
    [8926] = true,
    [8927] = true,
    [8928] = true,
    [8929] = true,
    [9833] = true,
    [9834] = true,
    [9835] = true,
}
local thornsSpellIDs = {
    [467] = true,
    [782] = true,
    [1075] = true,
    [8914] = true,
    [9756] = true,
    [9910] = true,
}
-- Nature's Grasp applies separate Entangling Roots auras.
local entanglingRootsAuraSpellIDs = Rules.Union({
    [19975] = true,
    [19974] = true,
    [19973] = true,
    [19972] = true,
    [19971] = true,
    [19970] = true,
}, entanglingRootsSpellIDs)

Prism.classRules.DRUID = {
    {
        key = "own-moonfire",
        action = { spellIDs = moonfireSpellIDs },
        condition = Rules.TargetDebuff(moonfireSpellIDs, { ownAura = true, includeActionSpellID = true }),
        visual = "highlight",
    },
    {
        key = "entangling-roots",
        action = { spellIDs = entanglingRootsSpellIDs },
        condition = Rules.TargetDebuff(entanglingRootsAuraSpellIDs, { includeActionSpellID = true }),
        visual = "highlight",
    },
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
