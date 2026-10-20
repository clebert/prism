local _, Prism = ...
local Rules = Prism.Rules

local healTargetBuff = { unit = "heal-target", filter = "HELPFUL" }
local playerBuff = { unit = "player", filter = "HELPFUL" }
local targetDebuff = { unit = "target", filter = "HARMFUL" }
local ownTargetDebuff = { unit = "target", filter = "HARMFUL", ownAura = true }
local markOfTheWildRanks = { 1126, 5232, 6756, 5234, 8907, 9884, 9885 }
local thornsRanks = { 467, 782, 1075, 8914, 9756, 9910 }
local markOfTheWild = Rules.RankedAura("mark-of-the-wild", markOfTheWildRanks, healTargetBuff)
local thorns = Rules.RankedAura("thorns", thornsRanks, healTargetBuff)
local regrowth = Rules.RankedAura("regrowth", { 8936, 8938, 8939, 8940, 8941, 9750, 9856, 9857, 9858 }, healTargetBuff)
local rejuvenation = Rules.RankedAura("rejuvenation", { 774, 1058, 1430, 2090, 2091, 3627, 8910, 9839, 9840, 9841, 25299 }, healTargetBuff)
local abolishPoisonBuff = Rules.RankedAura("abolish-poison-buff", { 2893 }, healTargetBuff)
local bash = Rules.RankedAura("bash", { 5211, 6798, 8983 }, targetDebuff)
local rip = Rules.RankedAura("own-rip", { 1079, 9492, 9493, 9752, 9894, 9896 }, ownTargetDebuff)
local faerieFire = Rules.RankedAura("faerie-fire", { 770, 778, 9749, 9907 }, {
    unit = "target", filter = "HARMFUL", suppressGlow = "faerie-fire-missing",
})
local challengingRoarSpellIDs = {
    [5209] = true,
}
local cowerSpellIDs = {
    [8998] = true,
    [9000] = true,
    [9892] = true,
}
local growlSpellIDs = {
    [6795] = true,
}
local healingTouchSpellIDs = {
    [5185] = true,
    [5186] = true,
    [5187] = true,
    [5188] = true,
    [5189] = true,
    [6778] = true,
    [8903] = true,
    [9758] = true,
    [9888] = true,
    [9889] = true,
    [25297] = true,
}
local removeCurseSpellIDs = {
    [2782] = true,
}
local shiftingPowerSpellIDs = {
    [1322605] = true,
}

Prism.classRules.DRUID = {
    Rules.RankedAura("own-moonfire", { 8921, 8924, 8925, 8926, 8927, 8928, 8929, 9833, 9834, 9835 }, ownTargetDebuff),
    rip,
    {
        key = "rip-finisher",
        action = rip.action,
        condition = { mechanic = "combo-points", points = 5 },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "shifting-power-full-energy",
        action = { spellIDs = shiftingPowerSpellIDs },
        condition = { mechanic = "full-power", powerType = Enum.PowerType.Energy },
        visual = "highlight",
    },
    {
        key = "shifting-power-overflow",
        action = { spellIDs = shiftingPowerSpellIDs },
        condition = { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 40, excludeFull = true },
        requireUsable = true,
        visual = "red-blink",
    },
    Rules.RankedAura("own-rake", { 1822, 1823, 1824, 9904 }, ownTargetDebuff),
    -- Nature's Grasp applies separate auras for each Entangling Roots rank.
    Rules.RankedAura("entangling-roots", {
        { spellID = 339, auraSpellIDs = { [339] = true, [19975] = true } },
        { spellID = 1062, auraSpellIDs = { [1062] = true, [19974] = true } },
        { spellID = 5195, auraSpellIDs = { [5195] = true, [19973] = true } },
        { spellID = 5196, auraSpellIDs = { [5196] = true, [19972] = true } },
        { spellID = 9852, auraSpellIDs = { [9852] = true, [19971] = true } },
        { spellID = 9853, auraSpellIDs = { [9853] = true, [19970] = true } },
    }, targetDebuff),
    bash,
    Rules.RankedAura("demoralizing-roar", { 99, 1735, 9490, 9747, 9898 }, targetDebuff),
    faerieFire,
    {
        key = "faerie-fire-missing",
        action = faerieFire.action,
        condition = { mechanic = "hostile-target" },
        requireUsable = true,
        visual = "glow",
    },
    Rules.RankedAura("hibernate", { 2637, 18657, 18658 }, targetDebuff),
    Rules.RankedAura("soothe-animal", { 2908, 8955, 9901 }, targetDebuff),
    markOfTheWild,
    thorns,
    regrowth,
    rejuvenation,
    abolishPoisonBuff,
    Rules.RankedAura("enrage", { 5229 }, playerBuff),
    Rules.RankedAura("natures-grasp", { 16689, 16810, 16811, 16812, 16813, 17329 }, playerBuff),
    Rules.RankedAura("prowl", { 5215, 6783, 9913 }, playerBuff),
    {
        key = "growl",
        action = { spellIDs = growlSpellIDs },
        condition = { mechanic = "tanking" },
        visual = "highlight",
    },
    {
        key = "growl-not-tanking",
        action = { spellIDs = growlSpellIDs },
        condition = { mechanic = "tanking", invert = true, grouped = true },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "challenging-roar",
        action = { spellIDs = challengingRoarSpellIDs },
        condition = { mechanic = "tanking" },
        visual = "highlight",
    },
    {
        key = "cower",
        action = { spellIDs = cowerSpellIDs },
        condition = { mechanic = "tanking" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "bash-interrupt",
        action = bash.action,
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "healing-full-health",
        action = { spellIDs = Rules.Union(healingTouchSpellIDs, regrowth.action.spellIDs, rejuvenation.action.spellIDs) },
        condition = { mechanic = "full-health", unit = "heal-target" },
        visual = "highlight",
    },
    {
        key = "remove-curse",
        action = { spellIDs = removeCurseSpellIDs },
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Curse",
        },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "remove-curse-no-debuff",
        action = { spellIDs = removeCurseSpellIDs },
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Curse",
            invert = true,
        },
        visual = "highlight",
    },
    {
        key = "abolish-poison",
        action = abolishPoisonBuff.action,
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Poison",
        },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "abolish-poison-no-debuff",
        action = abolishPoisonBuff.action,
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Poison",
            invert = true,
        },
        visual = "highlight",
    },
    {
        key = "mark-of-the-wild-missing",
        action = markOfTheWild.action,
        condition = { mechanic = "self-target" },
        requireUsable = true,
        visual = "glow",
    },
    Rules.RankedAura("mark-of-the-wild-active", markOfTheWildRanks, {
        unit = "player", filter = "HELPFUL", visual = "none", suppressGlow = "mark-of-the-wild-missing",
    }),
    {
        key = "thorns-missing",
        action = thorns.action,
        condition = { mechanic = "self-target" },
        requireUsable = true,
        visual = "glow",
    },
    Rules.RankedAura("thorns-active", thornsRanks, {
        unit = "player", filter = "HELPFUL", visual = "none", suppressGlow = "thorns-missing",
    }),
}
