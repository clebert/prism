local _, Prism = ...

local bandageAction = {
    itemClassID = Enum.ItemClass.Consumable,
    itemSubClassID = Enum.ItemConsumableSubclass.Bandage,
}
local antiVenomItemIDs = {
    [6452] = true,
    [6453] = true,
    [19440] = true,
    [255715] = true,
}
local poulticeItemIDs = {
    [255716] = true,
    [255717] = true,
    [255718] = true,
    [255719] = true,
}

Prism.sharedRules = {
    {
        key = "self-buff",
        action = { anySpell = true },
        condition = {
            mechanic = "aura",
            unit = "player",
            filter = "HELPFUL",
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "bandage-full-health",
        action = bandageAction,
        condition = { mechanic = "full-health", unit = "heal-target" },
        visual = "highlight",
    },
    {
        key = "bandage-poison",
        action = bandageAction,
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Poison",
        },
        requireUsable = true,
        visual = "red-blink",
    },
    {
        key = "anti-venom-poison",
        action = { itemIDs = antiVenomItemIDs },
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
        key = "poultice-disease",
        action = { itemIDs = poulticeItemIDs },
        condition = {
            mechanic = "dispel-type",
            unit = "heal-target",
            filter = "HARMFUL",
            dispelType = "Disease",
        },
        requireUsable = true,
        visual = "glow",
    },
}
