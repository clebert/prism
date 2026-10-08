local _, Prism = ...

local _, class = UnitClass("player")
local rules = {}

for _, rule in ipairs(Prism.sharedRules) do
    rules[#rules + 1] = rule
end

for _, rule in ipairs(Prism.classRules[class] or {}) do
    rules[#rules + 1] = rule
end

Prism.Start(rules)
