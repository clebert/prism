local _, Prism = ...
local Rules = Prism.Rules

local baneOfAgonyAuraSpellIDs = {
    [980] = true,
    [1014] = true,
    [6217] = true,
    [11711] = true,
    [11712] = true,
    [11713] = true,
}
local baneOfDoomAuraSpellIDs = {
    [603] = true,
}
local corruptionAuraSpellIDs = {
    [172] = true,
    [6222] = true,
    [6223] = true,
    [7648] = true,
    [11671] = true,
    [11672] = true,
    [25311] = true,
}
local drainLifeAuraSpellIDs = {
    [689] = true,
    [699] = true,
    [709] = true,
    [7651] = true,
    [11699] = true,
    [11700] = true,
    [403677] = true,
    [403685] = true,
    [403686] = true,
    [403687] = true,
    [403688] = true,
    [403689] = true,
}
local drainSoulAuraSpellIDs = {
    [1120] = true,
    [8288] = true,
    [8289] = true,
    [11675] = true,
}
local immolateAuraSpellIDs = {
    [348] = true,
    [707] = true,
    [1094] = true,
    [2941] = true,
    [11665] = true,
    [11667] = true,
    [11668] = true,
    [25309] = true,
}
local shadowflameAuraSpellIDs = {
    [426320] = true,
    [426325] = true,
}
local siphonLifeAuraSpellIDs = {
    [18265] = true,
    [18879] = true,
    [18880] = true,
    [18881] = true,
}
local wrackAuraSpellIDs = {
    [1316697] = true,
}

Rules.Include(
    Prism.damageOverTimeAuraSpellIDs,
    baneOfAgonyAuraSpellIDs,
    baneOfDoomAuraSpellIDs,
    corruptionAuraSpellIDs,
    drainLifeAuraSpellIDs,
    drainSoulAuraSpellIDs,
    immolateAuraSpellIDs,
    shadowflameAuraSpellIDs,
    siphonLifeAuraSpellIDs,
    wrackAuraSpellIDs
)
