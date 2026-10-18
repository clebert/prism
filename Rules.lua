local _, Prism = ...

local Rules = {}
Prism.Rules = Rules

local auraFields = { mechanic = true, unit = true, filter = true, auraSpellIDs = true, includeActionSpellID = true, ownAura = true }
local stackFields = { mechanic = true, unit = true, filter = true, auraSpellIDs = true, includeActionSpellID = true, ownAura = true, applications = true }
local unitFields = { mechanic = true, unit = true }
local mechanicFields = {
    aura = auraFields,
    ["aura-stacks"] = stackFields,
    ["dispel-type"] = { mechanic = true, unit = true, filter = true, dispelType = true },
    alive = unitFields,
    ["full-health"] = unitFields,
    ["pet-happiness"] = { mechanic = true, happiness = true, below = true, outOfCombat = true },
    usable = { mechanic = true },
    ["target-cast"] = { mechanic = true },
    tanking = { mechanic = true },
}
local auraMechanics = { aura = true, ["aura-stacks"] = true, ["dispel-type"] = true }
local units = { player = true, pet = true, target = true, ["heal-target"] = true }
local visuals = { highlight = true, ["red-blink"] = true, glow = true }
local filters = { HELPFUL = true, HARMFUL = true, ["HELPFUL|PLAYER"] = true, ["HARMFUL|PLAYER"] = true }
local dispelTypes = { Magic = true, Curse = true, Disease = true, Poison = true, Bleed = true, None = true }
local actionFields = { anySpell = true, spellIDs = true, itemIDs = true, itemClassID = true, itemSubClassID = true }
local ruleFields = { key = true, action = true, condition = true, visual = true, requireUsable = true, suppressGlow = true }
local debuffOptions = { ownAura = true, includeActionSpellID = true, applications = true }

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
            check(condition.auraSpellIDs ~= nil or condition.includeActionSpellID == true, "An aura needs declared IDs or the action spell ID.", context)

            if condition.auraSpellIDs ~= nil then
                checkIDs(condition.auraSpellIDs, context .. ".auraSpellIDs")
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
