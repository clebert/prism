local _, Prism = ...
local Rules = Prism.Rules

local playerBuff = { unit = "player", filter = "HELPFUL" }
local gougeSpellIDs = { [1776] = true }
local sapSpellIDs = { [6770] = true }
local exposeArmorSpellIDs = { [8647] = true }
local exposeArmor = {
    key = "expose-armor",
    action = { spellIDs = exposeArmorSpellIDs },
    condition = Rules.TargetDebuff(Rules.Union(exposeArmorSpellIDs, {
        [8649] = true,
        [8650] = true,
        [11197] = true,
        [11198] = true,
    })),
    visual = "highlight",
    suppressGlow = "expose-armor-finisher",
}
local sliceAndDice = Rules.RankedAura("slice-and-dice", { 5171 }, {
    unit = "player", filter = "HELPFUL", suppressGlow = "slice-and-dice-finisher",
})

Prism.classRules.ROGUE = {
    {
        key = "eviscerate-finisher",
        action = { spellIDs = { [2098] = true, [6760] = true } },
        condition = { mechanic = "combo-points", points = 5 },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "expose-armor-finisher",
        action = exposeArmor.action,
        condition = { mechanic = "combo-points", points = 5 },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "slice-and-dice-finisher",
        action = sliceAndDice.action,
        condition = { mechanic = "combo-points", points = 5 },
        requireUsable = true,
        visual = "glow",
    },
    sliceAndDice,
    Rules.RankedAura("stealth", { 1784 }, playerBuff),
    Rules.RankedAura("sprint", { 2983 }, playerBuff),
    Rules.RankedAura("evasion", { 5277 }, playerBuff),
    Rules.RankedAura("own-garrote", { 703 }, { unit = "target", filter = "HARMFUL", ownAura = true }),
    exposeArmor,
    {
        key = "gouge",
        action = { spellIDs = gougeSpellIDs },
        condition = Rules.TargetDebuff(Rules.Union(gougeSpellIDs, {
            [1777] = true,
            [8629] = true,
            [11285] = true,
            [11286] = true,
        })),
        visual = "highlight",
    },
    {
        key = "sap",
        action = { spellIDs = sapSpellIDs },
        condition = Rules.TargetDebuff(Rules.Union(sapSpellIDs, {
            [2070] = true,
            [11297] = true,
        })),
        visual = "highlight",
    },
    {
        key = "gouge-interrupt",
        action = { spellIDs = gougeSpellIDs },
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "kick-interrupt",
        action = { spellIDs = { [1766] = true } },
        condition = { mechanic = "target-cast" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "feint",
        action = { spellIDs = { [1966] = true } },
        condition = { mechanic = "tanking", grouped = true },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "remorseless",
        action = { spellIDs = { [1752] = true, [1757] = true, [1758] = true, [53] = true, [2589] = true } },
        condition = {
            mechanic = "aura", unit = "player", filter = "HELPFUL", auraSpellIDs = { [14143] = true },
            comboPointsBelow = 5,
        },
        requireUsable = true,
        visual = "glow",
    },
}
