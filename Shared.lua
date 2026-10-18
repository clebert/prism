local _, Prism = ...

local bandageAction = {
    itemClassID = Enum.ItemClass.Consumable,
    itemSubClassID = Enum.ItemConsumableSubclass.Bandage,
}
local healingPotionItemIDs = {
    [118] = true,
    [858] = true,
    [929] = true,
    [1710] = true,
    [3928] = true,
    [4596] = true,
    [13446] = true,
    [18839] = true,
    [223913] = true,
    [223914] = true,
    [241650] = true,
    [247239] = true,
    [247240] = true,
    [247241] = true,
    [247242] = true,
    [268881] = true,
    [268882] = true,
    [268883] = true,
    [282011] = true,
    [287966] = true,
    [287967] = true,
    [287977] = true,
}
local manaPotionItemIDs = {
    [2455] = true,
    [3385] = true,
    [3827] = true,
    [6149] = true,
    [13443] = true,
    [13444] = true,
    [18841] = true,
    [282013] = true,
    [287968] = true,
    [287969] = true,
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
        key = "spell-buff",
        action = { anySpell = true },
        condition = {
            mechanic = "aura",
            unit = "buff-target",
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
        key = "healing-potion-full-health",
        action = { itemIDs = healingPotionItemIDs },
        condition = { mechanic = "full-health", unit = "player" },
        visual = "highlight",
    },
    {
        key = "mana-potion-full-mana",
        action = { itemIDs = manaPotionItemIDs },
        condition = { mechanic = "full-mana", unit = "player" },
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
