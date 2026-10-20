local client = dofile("tests/client.lua")
local Prism = {}

for source in io.lines("Prism.toc") do
    if source:match("%.lua$") and source ~= "Prism.lua" then
        assert(loadfile(source))("Prism", Prism)
    end
end

assert(not client.controller, "The definitions started the core.")
local Rules = Prism.Rules
local start = Prism.Start
local selectedRules
Prism.Start = function(rules)
    selectedRules = rules
end

local function checkClass(class, classRules)
    client.class = class
    assert(loadfile("Prism.lua"))("Prism", Prism)
    local expected = {}

    for _, group in ipairs({ Prism.sharedRules, classRules }) do
        for _, rule in ipairs(group) do
            expected[#expected + 1] = rule
        end
    end

    assert(#selectedRules == #expected, "The class selected an incorrect rule count.")

    for index, rule in ipairs(expected) do
        assert(selectedRules[index] == rule, "The class selected an incorrect rule.")
    end

    assert(#Rules.Prepare(selectedRules) == #expected)
end

checkClass("UNSUPPORTED", {})
for class, rules in pairs(Prism.classRules) do
    checkClass(class, rules)
end
Prism.Start = start

-- Synthetic IDs keep the helper and validator tests independent of game data.
local firstID, secondID, thirdID = 999101, 999102, 999103
local ids = { [firstID] = true, [secondID] = true }
local otherIDs = { [secondID] = true, [thirdID] = true }
local union = Rules.Union(ids, otherIDs)
assert(union[firstID] and union[secondID] and union[thirdID])
union[firstID] = nil
assert(ids[firstID] and not ids[thirdID] and not otherIDs[firstID], "The union changed an input set.")
assert(next(Rules.Union()) == nil)
assert(not pcall(Rules.Union, { [firstID] = false }))

local options = { unit = "target", filter = "HARMFUL", ownAura = true, applications = 5 }
local ranks = { thirdID, { spellID = firstID, auraSpellIDs = { [firstID] = true, [999104] = true } }, secondID }
local ranked = Rules.RankedAura("ranked", ranks, options)
local filtersByAction = ranked.condition.auraSpellIDsByAction
assert(ranked.action.spellIDs[firstID] and not ranked.action.spellIDs[999104])
assert(ranked.condition.mechanic == "aura-stacks" and ranked.condition.applications == 5)
assert(ranked.condition.filter == "HARMFUL|PLAYER" and ranked.condition.ownAura == true)
assert(ranked.condition.includeActionSpellID and ranked.visual == "highlight")
assert(filtersByAction[thirdID][thirdID] and filtersByAction[thirdID][999104] and filtersByAction[thirdID][secondID])
assert(not filtersByAction[firstID][thirdID] and filtersByAction[firstID][firstID] and filtersByAction[firstID][secondID])
assert(filtersByAction[firstID][999104] and not filtersByAction[secondID][999104])
assert(filtersByAction[secondID][secondID] and not filtersByAction[secondID][firstID])
assert(options.filter == "HARMFUL" and ranks[1] == thirdID and not ranks[2].auraSpellIDs[secondID])
Rules.Prepare({ ranked })
local indirect = Rules.RankedAura("indirect", {
    { spellID = firstID, auraSpellIDs = { [thirdID] = true } },
    { spellID = secondID, auraSpellIDs = { [999104] = true } },
}, { unit = "player", filter = "HELPFUL" })
assert(not indirect.condition.includeActionSpellID, "An indirect action ID became an aura selector.")
assert(not indirect.condition.auraSpellIDsByAction[firstID][firstID])
assert(indirect.condition.auraSpellIDsByAction[firstID][thirdID] and indirect.condition.auraSpellIDsByAction[firstID][999104])
Rules.Prepare({ indirect })
for _, invalidRanks in ipairs({
    {}, { [1] = firstID, [3] = secondID }, { firstID, firstID }, { -1 },
    { { spellID = firstID, auraSpellIDs = {} } },
    { { spellID = firstID, auraSpellIDs = { [thirdID] = true } }, thirdID },
    { { spellID = firstID, auraSpellIDs = { [secondID] = true }, typo = true } },
}) do
    local ok, message = pcall(Rules.RankedAura, "invalid-ranks", invalidRanks, { unit = "player", filter = "HELPFUL" })
    assert(not ok and tostring(message):find("Prism rule", 1, true), "The rank helper accepted invalid data.")
end
assert(not pcall(Rules.RankedAura, "invalid", { firstID }, { unit = "player", filter = "HELPFUL", typo = true }))
assert(not pcall(Rules.RankedAura, "invalid", { firstID }, { unit = "player", filter = "HELPFUL|PLAYER" }))
assert(not pcall(Rules.RankedAura, "invalid", { firstID }, { unit = "player", filter = "HELPFUL", visual = false }), "The rank helper accepted a boolean visual.")

local function auraRule()
    return {
        key = "test-aura",
        action = { spellIDs = { [firstID] = true } },
        condition = {
            mechanic = "aura",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = { [secondID] = true },
        },
        visual = "highlight",
    }
end

local function mappedAuraRule()
    local rule = auraRule()
    rule.condition.auraSpellIDs = nil
    rule.condition.auraSpellIDsByAction = { [firstID] = { [secondID] = true } }
    return rule
end
Rules.Prepare({ mappedAuraRule() })

for _, own in ipairs({ false, true }) do
    for _, includeAction in ipairs({ false, true }) do
        local options = { ownAura = own, includeActionSpellID = includeAction }
        local rule = auraRule()
        rule.condition = Rules.TargetDebuff(ids, options)
        assert(rule.condition.unit == "target" and rule.condition.mechanic == "aura")
        assert(rule.condition.filter == (own and "HARMFUL|PLAYER" or "HARMFUL"))
        assert(rule.condition.ownAura == own and rule.condition.includeActionSpellID == includeAction)
        assert(rule.condition.auraSpellIDs == ids and options.applications == nil)
        Rules.Prepare({ rule })
        options.applications = 5
        rule.condition = Rules.TargetDebuff(ids, options)
        assert(rule.condition.mechanic == "aura-stacks" and rule.condition.applications == 5)
        Rules.Prepare({ rule })
    end
end
assert(not pcall(Rules.TargetDebuff, ids, { typo = true }))
local plainDebuff = Rules.TargetDebuff(ids)
assert(plainDebuff.filter == "HARMFUL" and plainDebuff.includeActionSpellID == nil)
local usableGlow = Rules.UsableGlow("test-glow", ids)
assert(usableGlow.key == "test-glow" and usableGlow.action.spellIDs == ids)
assert(usableGlow.condition.mechanic == "usable" and usableGlow.visual == "glow")
Rules.Prepare({ usableGlow })
local maskOnly = auraRule()
maskOnly.visual, maskOnly.suppressGlow = "none", usableGlow.key
local maskRules = Rules.Prepare({ maskOnly, usableGlow })
assert(maskRules[1] == usableGlow and maskRules[2] == maskOnly)

for _, condition in ipairs({
    { mechanic = "hostile-target" },
    { mechanic = "combo-points", points = 2 },
    { mechanic = "combo-points", points = 5 },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 25 },
    { mechanic = "power-overflow", powerType = Enum.PowerType.Mana, amount = 17 },
    { mechanic = "tanking", invert = false, grouped = false },
    { mechanic = "tanking", invert = true, grouped = true },
}) do
    local rule = auraRule()
    rule.condition = condition
    Rules.Prepare({ rule })
end

local invalidCases = {
    { "duplicate key", function(rules) rules[2] = auraRule() end },
    { "sparse list", function(rules) rules[3] = Rules.UsableGlow("glow", ids) end },
    { "list field", function(rules) rules.extra = true end },
    { "missing key", function(rules) rules[1].key = nil end },
    { "empty key", function(rules) rules[1].key = "" end },
    { "unknown rule field", function(rules) rules[1].typo = true end },
    { "unknown visual", function(rules) rules[1].visual = "unknown" end },
    { "no visual or suppression", function(rules) rules[1].visual = "none" end },
    { "invalid usability", function(rules) rules[1].requireUsable = 1 end },
    { "missing action", function(rules) rules[1].action = nil end },
    { "no selector", function(rules) rules[1].action = {} end },
    { "two selectors", function(rules) rules[1].action.itemIDs = ids end },
    { "unknown selector", function(rules) rules[1].action.typo = ids end },
    { "false wildcard", function(rules) rules[1].action = { anySpell = false } end },
    { "incomplete category", function(rules) rules[1].action = { itemClassID = 0 } end },
    { "invalid category", function(rules) rules[1].action = { itemClassID = -1, itemSubClassID = 7 } end },
    { "empty ID set", function(rules) rules[1].action.spellIDs = {} end },
    { "negative ID", function(rules) rules[1].action.spellIDs = { [-1] = true } end },
    { "fractional ID", function(rules) rules[1].action.spellIDs = { [1.5] = true } end },
    { "string ID", function(rules) rules[1].action.spellIDs = { ["999101"] = true } end },
    { "false ID", function(rules) rules[1].action.spellIDs = { [firstID] = false } end },
    { "missing condition", function(rules) rules[1].condition = nil end },
    { "unknown mechanic", function(rules) rules[1].condition = { mechanic = "unknown" } end },
    { "unknown condition field", function(rules) rules[1].condition.typo = true end },
    { "unknown unit", function(rules) rules[1].condition.unit = "unknown" end },
    { "harmful buff target", function(rules) rules[1].condition.unit = "buff-target" end },
    { "item buff target", function(rules)
        rules[1].action = { itemIDs = ids }
        rules[1].condition.unit, rules[1].condition.filter = "buff-target", "HELPFUL"
    end },
    { "non-aura buff target", function(rules)
        rules[1].condition = { mechanic = "alive", unit = "buff-target" }
    end },
    { "unknown filter", function(rules) rules[1].condition.filter = "unknown" end },
    { "missing aura IDs", function(rules) rules[1].condition.auraSpellIDs = nil end },
    { "empty aura IDs", function(rules) rules[1].condition.auraSpellIDs = {} end },
    { "invalid aura map type", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].condition.auraSpellIDsByAction = false
    end },
    { "two aura selectors", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].condition.auraSpellIDs = ids
    end },
    { "aura map without spell IDs", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].action = { anySpell = true }
    end },
    { "undeclared aura map action", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].condition.auraSpellIDsByAction[thirdID] = ids
    end },
    { "incomplete aura map", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].action.spellIDs[thirdID] = true
    end },
    { "empty mapped aura IDs", function(rules)
        rules[1] = mappedAuraRule()
        rules[1].condition.auraSpellIDsByAction[firstID] = {}
    end },
    { "inconsistent ownership", function(rules) rules[1].condition.ownAura = true end },
    { "missing ownership", function(rules) rules[1].condition.filter = "HARMFUL|PLAYER" end },
    { "invalid ownership", function(rules) rules[1].condition.ownAura = "true" end },
    { "invalid action flag", function(rules) rules[1].condition.includeActionSpellID = 1 end },
    { "item aura identity", function(rules)
        rules[1].action = { itemIDs = ids }
        rules[1].condition.includeActionSpellID = true
    end },
    { "invalid applications", function(rules)
        rules[1].condition.mechanic = "aura-stacks"
        rules[1].condition.applications = 0
    end },
    { "unknown dispel", function(rules)
        rules[1].condition = { mechanic = "dispel-type", unit = "player", filter = "HARMFUL", dispelType = "unknown" }
    end },
    { "helpful dispel", function(rules)
        rules[1].condition = { mechanic = "dispel-type", unit = "player", filter = "HELPFUL", dispelType = "Poison" }
    end },
    { "missing combo points", function(rules) rules[1].condition = { mechanic = "combo-points" } end },
    { "zero combo points", function(rules) rules[1].condition = { mechanic = "combo-points", points = 0 } end },
    { "fractional combo points", function(rules) rules[1].condition = { mechanic = "combo-points", points = 1.5 } end },
    { "string combo points", function(rules) rules[1].condition = { mechanic = "combo-points", points = "5" } end },
    { "missing power type", function(rules)
        rules[1].condition = { mechanic = "power-overflow", amount = 25 }
    end },
    { "invalid power type", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = -1, amount = 25 }
    end },
    { "fractional power type", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = 0.5, amount = 25 }
    end },
    { "missing power amount", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = Enum.PowerType.Energy }
    end },
    { "zero power amount", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 0 }
    end },
    { "fractional power amount", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = 1.5 }
    end },
    { "string power amount", function(rules)
        rules[1].condition = { mechanic = "power-overflow", powerType = Enum.PowerType.Energy, amount = "25" }
    end },
    { "invalid happiness", function(rules) rules[1].condition = { mechanic = "pet-happiness", happiness = 4 } end },
    { "invalid below flag", function(rules)
        rules[1].condition = { mechanic = "pet-happiness", happiness = 3, below = 1 }
    end },
    { "invalid combat flag", function(rules)
        rules[1].condition = { mechanic = "pet-happiness", happiness = 3, outOfCombat = "pet" }
    end },
    { "invalid threat inversion", function(rules)
        rules[1].condition = { mechanic = "tanking", invert = 1 }
    end },
    { "invalid group flag", function(rules)
        rules[1].condition = { mechanic = "tanking", grouped = "party" }
    end },
    { "missing dependency", function(rules) rules[1].suppressGlow = "missing" end },
    { "non-glow dependency", function(rules)
        rules[1].suppressGlow = "other-aura"
        rules[2] = auraRule()
        rules[2].key = "other-aura"
    end },
    { "aura glow dependency", function(rules)
        rules[1].suppressGlow = "other-aura"
        rules[2] = auraRule()
        rules[2].key, rules[2].visual = "other-aura", "glow"
    end },
    { "non-aura suppressor", function(rules)
        rules[1] = Rules.UsableGlow("plain", ids)
        rules[1].suppressGlow = "glow"
        rules[2] = Rules.UsableGlow("glow", ids)
    end },
    { "incompatible dependency", function(rules)
        rules[1].suppressGlow = "glow"
        rules[2] = Rules.UsableGlow("glow", { [thirdID] = true })
    end },
    { "stack-gated suppressor", function(rules)
        rules[1].suppressGlow = "glow"
        rules[1].condition.mechanic = "aura-stacks"
        rules[1].condition.applications = 5
        rules[2] = Rules.UsableGlow("glow", ids)
    end },
}

for _, case in ipairs(invalidCases) do
    local rules = { auraRule() }
    case[2](rules)
    local ok, message = pcall(Rules.Prepare, rules)
    assert(not ok, "The validator accepted " .. case[1] .. ".")
    assert(tostring(message):find("Prism rule", 1, true), "The validator failed outside its checks: " .. tostring(message))
end

for _, selector in ipairs({ { spellIDs = ids }, { anySpell = true }, { itemIDs = ids }, { itemClassID = 0, itemSubClassID = 7 } }) do
    local suppressor = auraRule()
    suppressor.action, suppressor.suppressGlow = selector, "glow"
    local glow = Rules.UsableGlow("glow", ids)
    glow.action = {}
    for field, value in pairs(selector) do
        glow.action[field] = type(value) == "table" and Rules.Union(value) or value
    end
    local input = { suppressor, glow }
    local prepared = Rules.Prepare(input)
    assert(prepared[1] == glow and prepared[2] == suppressor)
    assert(input[1] == suppressor, "Dependency resolution changed the declarations.")
end
assert(#Rules.Prepare({}) == 0)
assert(not pcall(Rules.Prepare, "invalid"))

local frameCount = #client.frames
local invalid = auraRule()
invalid.key, invalid.condition = "invalid-mechanic", { mechanic = "unknown" }
local ok, message = pcall(Prism.Start, { invalid })
assert(not ok, "The core accepted an unknown mechanic.")
assert(tostring(message):find("invalid-mechanic", 1, true), "The validation error has no rule key.")
assert(#client.frames == frameCount, "The core created frames before validation.")

print("Rule tests passed.")
