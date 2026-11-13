local _, Prism = ...
local Rules = Prism.Rules

local shadowWordPainAuraSpellIDs = {
    [589] = true,
    [594] = true,
    [970] = true,
    [992] = true,
    [2767] = true,
    [10892] = true,
    [10893] = true,
    [10894] = true,
}
local devouringPlagueAuraSpellIDs = {
    [2944] = true,
    [19276] = true,
    [19277] = true,
    [19278] = true,
    [19279] = true,
    [19280] = true,
}
local holyFireAuraSpellIDs = {
    [14914] = true,
    [15261] = true,
    [15262] = true,
    [15263] = true,
    [15264] = true,
    [15265] = true,
    [15266] = true,
    [15267] = true,
}
local mindFlayAuraSpellIDs = {
    [15407] = true,
    [17311] = true,
    [17312] = true,
    [17313] = true,
    [17314] = true,
    [18807] = true,
}
local starshardsAuraSpellIDs = {
    [10797] = true,
    [19296] = true,
    [19299] = true,
    [19302] = true,
    [19303] = true,
    [19304] = true,
    [19305] = true,
}
local vampiricTouchAuraSpellIDs = {
    [402668] = true,
}
local voidPlagueAuraSpellIDs = {
    [425204] = true,
}

Rules.Include(
    Prism.damageOverTimeAuraSpellIDs,
    shadowWordPainAuraSpellIDs,
    devouringPlagueAuraSpellIDs,
    holyFireAuraSpellIDs,
    mindFlayAuraSpellIDs,
    starshardsAuraSpellIDs,
    vampiricTouchAuraSpellIDs,
    voidPlagueAuraSpellIDs
)
