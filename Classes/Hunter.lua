local _, Prism = ...

local serpentStingSpellIDs = {
    [1978] = true,
    [13549] = true,
    [13550] = true,
    [13551] = true,
    [13552] = true,
    [13553] = true,
    [13554] = true,
    [13555] = true,
    [25295] = true,
}
local viperStingSpellIDs = {
    [3034] = true,
    [14279] = true,
    [14280] = true,
}
local scorpidStingSpellIDs = {
    [3043] = true,
}
local huntersMarkSpellIDs = {
    [1130] = true,
    [14323] = true,
    [14324] = true,
    [14325] = true,
}
local concussiveShotSpellIDs = {
    [5116] = true,
}
local wingClipSpellIDs = {
    [2974] = true,
    [14267] = true,
    [14268] = true,
}
local mongooseBiteSpellIDs = {
    [1495] = true,
    [14269] = true,
    [14270] = true,
    [14271] = true,
}
local counterattackSpellIDs = {
    [19306] = true,
    [20909] = true,
    [20910] = true,
    [1242634] = true,
}
local disengageSpellIDs = {
    [781] = true,
    [14272] = true,
    [14273] = true,
}
local feedPetSpellIDs = {
    [6991] = true,
}
local feedPetAuraSpellIDs = {
    [1539] = true,
}
-- The client uses 3 for the Happy state.
local happyPetHappiness = 3
local mendPetSpellIDs = {
    [136] = true,
    [3111] = true,
    [3661] = true,
    [3662] = true,
    [13542] = true,
    [13543] = true,
    [13544] = true,
}
local revivePetSpellIDs = {
    [982] = true,
}

local function combineSpellIDs(first, second)
    local spellIDs = {}

    for spellID in pairs(first) do
        spellIDs[spellID] = true
    end

    for spellID in pairs(second) do
        spellIDs[spellID] = true
    end

    return spellIDs
end

Prism.classRules.HUNTER = {
    {
        key = "own-serpent-sting",
        action = { spellIDs = serpentStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = serpentStingSpellIDs,
            includeActionSpellID = true,
            ownAura = true,
        },
        visual = "highlight",
    },
    {
        key = "serpent-sting-replacement",
        action = { spellIDs = serpentStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = combineSpellIDs(viperStingSpellIDs, scorpidStingSpellIDs),
            ownAura = true,
        },
        requireUsable = true,
        visual = "red-blink",
    },
    {
        key = "viper-sting",
        action = { spellIDs = viperStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = viperStingSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "viper-sting-replacement",
        action = { spellIDs = viperStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = combineSpellIDs(serpentStingSpellIDs, scorpidStingSpellIDs),
            ownAura = true,
        },
        requireUsable = true,
        visual = "red-blink",
    },
    {
        key = "scorpid-sting",
        action = { spellIDs = scorpidStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = scorpidStingSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "scorpid-sting-replacement",
        action = { spellIDs = scorpidStingSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL|PLAYER",
            auraSpellIDs = combineSpellIDs(serpentStingSpellIDs, viperStingSpellIDs),
            ownAura = true,
        },
        requireUsable = true,
        visual = "red-blink",
    },
    {
        key = "hunters-mark",
        action = { spellIDs = huntersMarkSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = huntersMarkSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "concussive-shot",
        action = { spellIDs = concussiveShotSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = concussiveShotSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "wing-clip",
        action = { spellIDs = wingClipSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = wingClipSpellIDs,
            includeActionSpellID = true,
        },
        visual = "highlight",
    },
    {
        key = "mongoose-bite",
        action = { spellIDs = mongooseBiteSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "counterattack",
        action = { spellIDs = counterattackSpellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    },
    {
        key = "disengage",
        action = { spellIDs = disengageSpellIDs },
        condition = { mechanic = "tanking" },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "feed-pet-happy",
        action = { spellIDs = feedPetSpellIDs },
        condition = { mechanic = "pet-happiness", happiness = happyPetHappiness },
        visual = "highlight",
    },
    {
        key = "feed-pet-not-happy",
        action = { spellIDs = feedPetSpellIDs },
        condition = {
            mechanic = "pet-happiness",
            happiness = happyPetHappiness,
            below = true,
            outOfCombat = true,
        },
        requireUsable = true,
        visual = "glow",
    },
    {
        key = "feed-pet-active",
        action = { spellIDs = feedPetSpellIDs },
        condition = {
            mechanic = "aura",
            unit = "pet",
            filter = "HELPFUL",
            auraSpellIDs = feedPetAuraSpellIDs,
        },
        visual = "highlight",
        suppressGlow = "feed-pet-not-happy",
    },
    {
        key = "mend-pet-full-health",
        action = { spellIDs = mendPetSpellIDs },
        condition = { mechanic = "full-health", unit = "pet" },
        visual = "highlight",
    },
    {
        key = "revive-pet-alive",
        action = { spellIDs = revivePetSpellIDs },
        condition = { mechanic = "alive", unit = "pet" },
        visual = "highlight",
    },
}
