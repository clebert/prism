local client = dofile("tests/client.lua")
local Prism = {}
assert(loadfile("Core.lua"))("Prism", Prism)
assert(loadfile("Shared.lua"))("Prism", Prism)
assert(loadfile("Classes/Warrior.lua"))("Prism", Prism)

local start = Prism.Start
local selectedRules
Prism.Start = function(rules)
    selectedRules = rules
end

assert(loadfile("Prism.lua"))("Prism", Prism)
assert(#selectedRules == #Prism.sharedRules + #Prism.classRules.WARRIOR)
local keys = {}
for _, rule in ipairs(selectedRules) do
    assert(not keys[rule.key], "Two rules have the same key.")
    keys[rule.key] = true
end
assert(keys["self-buff"] and keys["own-rend"])
client.class = "MAGE"
assert(loadfile("Prism.lua"))("Prism", Prism)
assert(#selectedRules == #Prism.sharedRules)
for index, rule in ipairs(selectedRules) do
    assert(rule == Prism.sharedRules[index], "Another class selected Warrior rules.")
end
assert(Prism.classRules.MAGE == nil)
assert(client.controller == nil, "The core started before the main file selected the rules.")

-- Synthetic IDs separate the action from its aura.
local spellIDs = { [999003] = true }
local rules = {
    {
        key = "test-full-health",
        action = { spellIDs = spellIDs },
        condition = { mechanic = "full-health", unit = "player" },
        visual = "glow",
    },
    {
        key = "test-usable",
        action = { spellIDs = spellIDs },
        condition = { mechanic = "usable" },
        visual = "red-blink",
    },
    {
        key = "test-stacks",
        action = { spellIDs = spellIDs },
        condition = {
            mechanic = "aura-stacks",
            unit = "target",
            filter = "HARMFUL",
            auraSpellIDs = { [999004] = true },
            applications = 3,
        },
        visual = "highlight",
    },
}
Prism.Start = start
Prism.Start(rules)
client.addActionButton("ActionButton1", 1)
client.actions[1] = { spellID = 999003 }
client.fullHealthUnits.player = true
client.refresh()
local glow = client.getSpellGlow()
assert(glow and glow.ProcLoop:IsPlaying(), "The full-health mechanic did not start its glow.")
local redBlink
for _, frame in ipairs(client.frames) do
    if frame.frameType == "Texture" and frame.color and frame.color[1] == 1 then
        redBlink = frame
    end
end
assert(redBlink and redBlink.parent.booleanInput, "The blink animation shares its alpha with the usability condition.")
client.actions[1].isUsable = false
client.refresh()
assert(client.alpha(redBlink) == 0)
assert(client.alpha(glow) == 1, "Usability changed an independent full-health rule.")
local container = client.getContainer("target", "test-stacks")
local slot = container.slots["test-stacks"]
assert(slot.candidateFilters.includeSpellIDs[999004])
assert(not slot.candidateFilters.includeSpellIDs[999003], "The core confused the action ID with the aura ID.")
assert(slot.applicationOptions.minApplications == 3)
assert(slot.applicationOptions.maxApplications == 3)

client.fullHealthUnits.player = false
client.refresh()
assert(client.alpha(glow) == 0)
client.actions[1] = nil
client.refresh()
assert(not slot.enabled and not container.enabled)
assert(not client.getSpellGlow())

print("Rule tests passed.")
