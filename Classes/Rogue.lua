local _, Prism = ...
local Rules = Prism.Rules

local playerBuff = { unit = "player", filter = "HELPFUL" }
local targetDebuff = { unit = "target", filter = "HARMFUL" }
local stealth = Rules.RankedAura("stealth", { 1784, 1785, 1786, 1787 }, playerBuff)
local vanishAction = { spellIDs = { [1856] = true, [1857] = true } }
local flashOfSteelNodeID = 105740
local flashOfSteelEnergyPerRank = 3
local missingPoison = {
    mechanic = "missing-weapon-enchant",
    enchantIDs = {
        [323] = true, [324] = true, [325] = true, [623] = true, [624] = true, [625] = true,
        [7] = true, [8] = true, [626] = true, [627] = true, [2630] = true,
        [22] = true, [603] = true, [35] = true, [23] = true, [643] = true,
        [703] = true, [704] = true, [705] = true, [706] = true,
        [7254] = true, [7255] = true, [7256] = true, [7542] = true, [7651] = true,
    },
}
local gouge = Rules.RankedAura("gouge", { 1776, 1777, 8629, 11285, 11286 }, targetDebuff)
local riposte = Rules.RankedAura("riposte", { 14251 }, targetDebuff)
local exposeArmor = Rules.RankedAura("expose-armor", { 8647, 8649, 8650, 11197, 11198 }, targetDebuff)
local sliceAndDice = Rules.RankedAura("slice-and-dice", { 5171, 6774 }, playerBuff)
local rupture = Rules.RankedAura("own-rupture", { 1943, 8639, 8640, 11273, 11274, 11275 }, {
    unit = "target", filter = "HARMFUL", ownAura = true,
})
local kidneyShotAction = { spellIDs = { [408] = true, [8643] = true } }

local function comboPointNumber(key, action)
    return { key = key, action = action, condition = { mechanic = "combo-points" }, visual = "none" }
end

Prism.classRules.ROGUE = {
    {
        key = "eviscerate-finisher",
        action = { spellIDs = {
            [2098] = true, [6760] = true, [6761] = true, [6762] = true, [8623] = true,
            [8624] = true, [11299] = true, [11300] = true, [31016] = true,
        } },
        condition = { mechanic = "combo-points", points = 5 },
        requireUsable = true,
        visual = "glow",
    },
    comboPointNumber("expose-armor-combo-points", exposeArmor.action),
    comboPointNumber("slice-and-dice-combo-points", sliceAndDice.action),
    comboPointNumber("rupture-combo-points", rupture.action),
    comboPointNumber("kidney-shot-combo-points", kidneyShotAction),
    sliceAndDice,
    stealth,
    {
        key = "vanish",
        action = vanishAction,
        condition = {
            mechanic = "aura", unit = "player", filter = "HELPFUL",
            auraSpellIDs = Rules.Union(stealth.action.spellIDs, { [11327] = true, [11329] = true }),
        },
        visual = "highlight",
    },
    {
        key = "vanish-low-health",
        action = vanishAction,
        condition = { mechanic = "low-health", percent = 20 },
        requireUsable = true,
        requireCombat = true,
        visual = "glow",
    },
    {
        key = "shank-rank-1",
        action = { spellIDs = { [1329283] = true } },
        condition = {
            mechanic = "power-gain", powerType = Enum.PowerType.Energy, amount = 15,
            talentNodeID = flashOfSteelNodeID, amountPerRank = flashOfSteelEnergyPerRank,
        },
        requireUsable = true,
        requireCombat = true,
        visual = "glow",
    },
    {
        key = "shank-rank-2",
        action = { spellIDs = { [1329549] = true } },
        condition = {
            mechanic = "power-gain", powerType = Enum.PowerType.Energy, amount = 25,
            talentNodeID = flashOfSteelNodeID, amountPerRank = flashOfSteelEnergyPerRank,
        },
        requireUsable = true,
        requireCombat = true,
        visual = "glow",
    },
    Rules.RankedAura("sprint", { 2983, 8696, 11305 }, playerBuff),
    Rules.RankedAura("evasion", { 5277 }, playerBuff),
    Rules.RankedAura("own-garrote", { 703, 8631, 8632, 8633, 11289, 11290 }, { unit = "target", filter = "HARMFUL", ownAura = true }),
    rupture,
    exposeArmor,
    gouge,
    Rules.RankedAura("cheap-shot", { 1833 }, targetDebuff),
    {
        key = "kidney-shot",
        action = kidneyShotAction,
        condition = Rules.TargetDebuff(kidneyShotAction.spellIDs),
        visual = "highlight",
    },
    Rules.RankedAura("sap", { 6770, 2070, 11297 }, targetDebuff),
    riposte,
    Rules.UsableGlow("riposte-usable", riposte.action.spellIDs),
    {
        key = "gouge-interrupt",
        action = gouge.action,
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "kidney-shot-interrupt",
        action = kidneyShotAction,
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "kick-interrupt",
        action = { spellIDs = { [1766] = true, [1767] = true, [1768] = true, [1769] = true } },
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "instant-poison-application",
        action = { spellIDs = {
            [8679] = true, [8686] = true, [8688] = true, [11338] = true, [11339] = true, [11340] = true,
        } },
        condition = missingPoison,
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "instant-poison-item",
        action = { itemIDs = {
            [6947] = true, [6949] = true, [6950] = true, [8926] = true, [8927] = true, [8928] = true,
        } },
        condition = missingPoison,
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "feint",
        action = { spellIDs = { [1966] = true, [6768] = true, [8637] = true, [11303] = true, [25302] = true } },
        condition = { mechanic = "tanking", grouped = true },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "remorseless",
        action = { spellIDs = {
            [1752] = true, [1757] = true, [1758] = true, [1759] = true,
            [1760] = true, [8621] = true, [11293] = true, [11294] = true,
            [53] = true, [2589] = true, [2590] = true, [2591] = true, [8721] = true,
            [11279] = true, [11280] = true, [11281] = true, [25300] = true,
        } },
        condition = {
            mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [14143] = true },
            comboPointsBelow = 5,
        },
        requireUsable = true,
        visual = "glow",
    },
}
