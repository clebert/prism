local _, Prism = ...

local Rules = {}
Prism.Rules = Rules

local auraFields = { mechanic = true, unit = true, filter = true, auraSpellIDs = true, auraSpellIDsByAction = true, includeActionSpellID = true, ownAura = true }
local stackFields = { mechanic = true, unit = true, filter = true, auraSpellIDs = true, auraSpellIDsByAction = true, includeActionSpellID = true, ownAura = true, applications = true }
local unitFields = { mechanic = true, unit = true }
local mechanicFields = {
    aura = auraFields,
    ["aura-stacks"] = stackFields,
    ["dispel-type"] = { mechanic = true, unit = true, filter = true, dispelType = true },
    alive = unitFields,
    ["full-health"] = unitFields,
    ["full-mana"] = unitFields,
    ["pet-happiness"] = { mechanic = true, happiness = true, below = true, outOfCombat = true },
    usable = { mechanic = true },
    ["self-target"] = { mechanic = true },
    ["target-cast"] = { mechanic = true },
    ["hostile-target"] = { mechanic = true },
    tanking = { mechanic = true, invert = true, grouped = true },
}
local auraMechanics = { aura = true, ["aura-stacks"] = true, ["dispel-type"] = true }
local units = { player = true, pet = true, target = true, ["heal-target"] = true, ["buff-target"] = true }
local visuals = { highlight = true, ["red-blink"] = true, glow = true, none = true }
local filters = { HELPFUL = true, HARMFUL = true, ["HELPFUL|PLAYER"] = true, ["HARMFUL|PLAYER"] = true }
local dispelTypes = { Magic = true, Curse = true, Disease = true, Poison = true, Bleed = true, None = true }
local actionFields = { anySpell = true, spellIDs = true, itemIDs = true, itemClassID = true, itemSubClassID = true }
local ruleFields = { key = true, action = true, condition = true, visual = true, requireUsable = true, suppressGlow = true }
local debuffOptions = { ownAura = true, includeActionSpellID = true, applications = true }
local rankedAuraOptions = { unit = true, filter = true, ownAura = true, applications = true, visual = true, requireUsable = true, suppressGlow = true }
local rankFields = { spellID = true, auraSpellIDs = true }

local function check(value, message, context)
    assert(value, "Prism rule " .. context .. ": " .. message)
end

local function checkFields(value, fields, context)
    check(type(value) == "table", "Expected a table.", context)

    for field in pairs(value) do
        check(fields[field], "Unknown field " .. tostring(field) .. ".", context)
    end
end

local function isInteger(value, minimum)
    return type(value) == "number" and value >= minimum and value < math.huge and value == math.floor(value)
end

local function checkIDs(ids, context)
    check(type(ids) == "table" and next(ids) ~= nil, "The ID set must not be empty.", context)

    for id, included in pairs(ids) do
        check(isInteger(id, 1) and included == true, "The ID set must contain positive integer keys with true values.", context)
    end
end

local function checkBoolean(value, context)
    check(value == nil or type(value) == "boolean", "Expected a boolean or nil.", context)
end

local function checkAction(action, context)
    checkFields(action, actionFields, context)
    local selectors = 0

    if action.anySpell ~= nil then
        check(action.anySpell == true, "anySpell must be true.", context)
        selectors = selectors + 1
    end

    for _, field in ipairs({ "spellIDs", "itemIDs" }) do
        if action[field] ~= nil then
            checkIDs(action[field], context .. "." .. field)
            selectors = selectors + 1
        end
    end

    if action.itemClassID ~= nil or action.itemSubClassID ~= nil then
        check(isInteger(action.itemClassID, 0) and isInteger(action.itemSubClassID, 0), "An item category needs two non-negative integers.", context)
        selectors = selectors + 1
    end

    check(selectors == 1, "Exactly one action selector is required.", context)
end

local function checkCondition(condition, action, context)
    check(type(condition) == "table", "Expected a condition table.", context)
    local mechanic = condition.mechanic
    check(mechanicFields[mechanic], "Unknown mechanic " .. tostring(mechanic) .. ".", context)
    checkFields(condition, mechanicFields[mechanic], context)

    if mechanicFields[mechanic].unit then
        check(units[condition.unit], "Unknown unit.", context)
    end

    if condition.unit == "buff-target" then
        check((mechanic == "aura" or mechanic == "aura-stacks") and (condition.filter == "HELPFUL" or condition.filter == "HELPFUL|PLAYER"), "A buff target requires a helpful aura.", context)
        check(action.anySpell or action.spellIDs, "A buff target requires a spell selector.", context)
    end

    if auraMechanics[mechanic] then
        check(filters[condition.filter], "Unknown aura filter.", context)

        if mechanic == "dispel-type" then
            check(condition.filter == "HARMFUL", "A dispel condition requires HARMFUL.", context)
            check(dispelTypes[condition.dispelType], "Unknown dispel type.", context)
        else
            checkBoolean(condition.ownAura, context .. ".ownAura")
            checkBoolean(condition.includeActionSpellID, context .. ".includeActionSpellID")
            local hasPlayerFilter = condition.filter == "HELPFUL|PLAYER" or condition.filter == "HARMFUL|PLAYER"
            check(hasPlayerFilter == (condition.ownAura == true), "The ownership checks must agree.", context)
            check(condition.auraSpellIDs ~= nil or condition.auraSpellIDsByAction ~= nil or condition.includeActionSpellID == true, "An aura needs declared IDs or the action spell ID.", context)

            if condition.auraSpellIDs ~= nil then
                checkIDs(condition.auraSpellIDs, context .. ".auraSpellIDs")
            end

            if condition.auraSpellIDsByAction ~= nil then
                check(condition.auraSpellIDs == nil, "An aura must use one ID selector.", context)
                check(action.spellIDs ~= nil, "Action-specific aura IDs require a spell ID selector.", context)
                check(type(condition.auraSpellIDsByAction) == "table", "Expected action-specific aura IDs.", context)
                for spellID, auraSpellIDs in pairs(condition.auraSpellIDsByAction) do
                    check(action.spellIDs[spellID], "The aura map includes an undeclared action.", context)
                    checkIDs(auraSpellIDs, context .. ".auraSpellIDsByAction")
                end
                for spellID in pairs(action.spellIDs) do
                    check(condition.auraSpellIDsByAction[spellID] ~= nil, "The aura map must cover every action.", context)
                end
            end

            if condition.includeActionSpellID then
                check(action.anySpell or action.spellIDs, "The action spell ID requires a spell selector.", context)
            end
        end
    end

    if mechanic == "aura-stacks" then
        check(isInteger(condition.applications, 1), "The application count must be a positive integer.", context)
    elseif mechanic == "pet-happiness" then
        check(isInteger(condition.happiness, 1) and condition.happiness <= 3, "The happiness state must be 1, 2, or 3.", context)
        checkBoolean(condition.below, context .. ".below")
        checkBoolean(condition.outOfCombat, context .. ".outOfCombat")
    elseif mechanic == "tanking" then
        checkBoolean(condition.invert, context .. ".invert")
        checkBoolean(condition.grouped, context .. ".grouped")
    end
end

local function coversAction(cover, action)
    if cover.anySpell then
        return action.anySpell or action.spellIDs ~= nil
    end

    for _, field in ipairs({ "spellIDs", "itemIDs" }) do
        if cover[field] and action[field] then
            for id in pairs(action[field]) do
                if not cover[field][id] then
                    return false
                end
            end

            return true
        end
    end

    return action.itemClassID ~= nil and cover.itemClassID == action.itemClassID and cover.itemSubClassID == action.itemSubClassID
end

function Rules.Union(...)
    local ids = {}

    for index = 1, select("#", ...) do
        local source = select(index, ...)
        checkIDs(source, "Union")

        for id in pairs(source) do
            ids[id] = true
        end
    end

    return ids
end

function Rules.RankedAura(key, ranks, options)
    local context = tostring(key)
    check(type(key) == "string" and key ~= "", "A non-empty key is required.", context)
    check(type(ranks) == "table", "Expected an ordered rank list.", context)
    options = options or {}
    checkFields(options, rankedAuraOptions, context)
    check(options.filter == "HELPFUL" or options.filter == "HARMFUL", "A ranked aura needs HELPFUL or HARMFUL.", context)
    checkBoolean(options.ownAura, context)
    checkBoolean(options.requireUsable, context)
    check(options.visual == nil or visuals[options.visual], "Unknown visual.", context)
    check(options.suppressGlow == nil or (type(options.suppressGlow) == "string" and options.suppressGlow ~= ""), "Expected a glow key.", context)

    local count = 0
    for index in pairs(ranks) do
        check(isInteger(index, 1), "A rank list must use integer indices.", context)
        count = count + 1
    end
    check(count > 0, "A rank list must not be empty.", context)
    local normalized = {}
    local spellIDs = {}
    local seenAuraIDs = {}
    local includeActionSpellID = true
    for index = 1, count do
        local rank = ranks[index]
        check(rank ~= nil, "A rank list must be dense.", context)
        if type(rank) == "table" then
            checkFields(rank, rankFields, context)
        else
            check(isInteger(rank, 1), "A spell ID must be positive.", context)
            rank = { spellID = rank, auraSpellIDs = { [rank] = true } }
        end
        check(isInteger(rank.spellID, 1) and not spellIDs[rank.spellID], "An action ID must be positive and unique.", context)
        checkIDs(rank.auraSpellIDs, context)
        spellIDs[rank.spellID] = true
        for auraSpellID in pairs(rank.auraSpellIDs) do
            check(not seenAuraIDs[auraSpellID], "An aura ID must belong to one rank.", context)
            seenAuraIDs[auraSpellID] = true
        end
        if not rank.auraSpellIDs[rank.spellID] then
            includeActionSpellID = false
        end
        normalized[index] = rank
    end

    local byAction = {}
    local auraSpellIDs = {}
    for index = count, 1, -1 do
        local rank = normalized[index]
        for auraSpellID in pairs(rank.auraSpellIDs) do
            auraSpellIDs[auraSpellID] = true
        end
        byAction[rank.spellID] = Rules.Union(auraSpellIDs)
    end
    local action = { spellIDs = spellIDs }
    local condition = {
        mechanic = options.applications and "aura-stacks" or "aura",
        unit = options.unit,
        filter = options.filter .. (options.ownAura and "|PLAYER" or ""),
        ownAura = options.ownAura,
        applications = options.applications,
        auraSpellIDsByAction = byAction,
        includeActionSpellID = includeActionSpellID or nil,
    }
    checkCondition(condition, action, context)
    return {
        key = key, action = action, condition = condition,
        visual = options.visual or "highlight", requireUsable = options.requireUsable, suppressGlow = options.suppressGlow,
    }
end

function Rules.TargetDebuff(auraSpellIDs, options)
    options = options or {}
    checkFields(options, debuffOptions, "TargetDebuff")
    return {
        mechanic = options.applications and "aura-stacks" or "aura",
        unit = "target",
        filter = options.ownAura and "HARMFUL|PLAYER" or "HARMFUL",
        auraSpellIDs = auraSpellIDs,
        includeActionSpellID = options.includeActionSpellID,
        ownAura = options.ownAura,
        applications = options.applications,
    }
end

function Rules.UsableGlow(key, spellIDs)
    return {
        key = key,
        action = { spellIDs = spellIDs },
        condition = { mechanic = "usable" },
        visual = "glow",
    }
end

function Rules.Prepare(rules)
    check(type(rules) == "table", "Expected a rule list.", "list")
    local count = 0

    for index in pairs(rules) do
        check(isInteger(index, 1), "The rule list must be a dense array.", "list")
        count = count + 1
    end

    local byKey = {}

    for index = 1, count do
        local rule = rules[index]
        local context = type(rule) == "table" and tostring(rule.key) or tostring(index)
        checkFields(rule, ruleFields, context)
        check(type(rule.key) == "string" and rule.key ~= "", "A non-empty key is required.", context)
        check(not byKey[rule.key], "The key is not unique.", context)
        check(visuals[rule.visual], "Unknown visual.", context)
        check(rule.visual ~= "none" or rule.suppressGlow ~= nil, "A rule without a visual must suppress a glow.", context)
        checkBoolean(rule.requireUsable, context .. ".requireUsable")
        checkAction(rule.action, context .. ".action")
        checkCondition(rule.condition, rule.action, context .. ".condition")
        byKey[rule.key] = rule
    end

    for _, rule in ipairs(rules) do
        if rule.suppressGlow ~= nil then
            local glow = byKey[rule.suppressGlow]
            check(rule.condition.mechanic == "aura", "Only a plain aura condition can suppress a glow.", rule.key)
            check(glow and glow.visual == "glow" and not auraMechanics[glow.condition.mechanic], "The dependency must be a non-aura glow rule.", rule.key)
            check(coversAction(glow.action, rule.action), "The glow selector must cover the suppressor selector.", rule.key)
        end
    end

    local ordered, added = {}, {}
    local function add(rule)
        if not added[rule.key] then
            ordered[#ordered + 1] = rule
            added[rule.key] = true
        end
    end

    for _, rule in ipairs(rules) do
        if rule.suppressGlow then
            add(byKey[rule.suppressGlow])
        end

        add(rule)
    end

    return ordered
end
