local _, Prism = ...
local Rules = Prism.Rules

local flameShockAuraSpellIDs = {
    [8050] = true,
    [8052] = true,
    [8053] = true,
    [10447] = true,
    [10448] = true,
    [29228] = true,
}

Rules.Include(
    Prism.damageOverTimeAuraSpellIDs,
    flameShockAuraSpellIDs
)
