local _, Prism = ...
local Rules = Prism.Rules

local fireballAuraSpellIDs = {
    [133] = true,
    [143] = true,
    [145] = true,
    [3140] = true,
    [8400] = true,
    [8401] = true,
    [8402] = true,
    [10148] = true,
    [10149] = true,
    [10150] = true,
    [10151] = true,
    [25306] = true,
}
local frostfireBoltAuraSpellIDs = {
    [401502] = true,
    [1237312] = true,
    [1237313] = true,
}
local livingBombAuraSpellIDs = {
    [400613] = true,
}
local pyroblastAuraSpellIDs = {
    [11366] = true,
    [12505] = true,
    [12522] = true,
    [12523] = true,
    [12524] = true,
    [12525] = true,
    [12526] = true,
    [18809] = true,
}

Rules.Include(
    Prism.damageOverTimeAuraSpellIDs,
    fireballAuraSpellIDs,
    frostfireBoltAuraSpellIDs,
    livingBombAuraSpellIDs,
    pyroblastAuraSpellIDs
)
