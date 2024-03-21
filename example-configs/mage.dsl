# https://www.wowhead.com/classic/spells/abilities/mage?filter=13;5;2#0+3+21
# https://www.wowhead.com/classic/spells/talents/mage?filter=13:116;5:2;2:0
# https://www.wowhead.com/classic/spells/talents/mage?filter=13:116;5:1;2:0

####################################################################
# Level 1 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1459/arcane-intellect
spell: "Arcane Intellect"
checked: @target:help{buff(infer)}
enabled: @target:help{!npc}
glowing: @target:help{is(@player)} & @player{!combat & !resting}

# https://www.wowhead.com/classic/spell=168/frost-armor
spell: "Frost Armor"
checked: @player{ownBuff(infer)}
glowing: @player{!resting}

# https://www.wowhead.com/classic/spell=133/fireball
spell: "Fireball"
blocked: @target{dead | !harm}

####################################################################
# Level 4 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5504/conjure-water
# https://www.wowhead.com/classic/item=5350/conjured-water
# https://www.wowhead.com/classic/item=2288/conjured-fresh-water
# https://www.wowhead.com/classic/item=2136/conjured-purified-water
# https://www.wowhead.com/classic/item=3772/conjured-spring-water
# https://www.wowhead.com/classic/item=8077/conjured-mineral-water
# https://www.wowhead.com/classic/item=8078/conjured-sparkling-water
# https://www.wowhead.com/classic/item=8079/conjured-crystal-water
spell: "Conjure Water"
glowing: @player{!combat & !resting & !ownBuff("Drink") & itemCount(5350, 0) & itemCount(2288, 0) & itemCount(2136, 0) & itemCount(3772, 0) & itemCount(8077, 0) & itemCount(8078, 0) & itemCount(8079, 0)}

# https://www.wowhead.com/classic/spell=116/frostbolt
spell: "Frostbolt"
blocked: @target{dead | !harm}

####################################################################
# Level 6 abilities
####################################################################

# https://www.wowhead.com/classic/spell=587/conjure-food
# https://www.wowhead.com/classic/item=5349/conjured-muffin
# https://www.wowhead.com/classic/item=1113/conjured-bread
# https://www.wowhead.com/classic/item=1114/conjured-rye
# https://www.wowhead.com/classic/item=1487/conjured-pumpernickel
# https://www.wowhead.com/classic/item=8075/conjured-sourdough
# https://www.wowhead.com/classic/item=8076/conjured-sweet-roll
# https://www.wowhead.com/classic/item=22895/conjured-cinnamon-roll
spell: "Conjure Food"
glowing: @player{!combat & !resting & !ownBuff("Food") & itemCount(5349, 0) & itemCount(1113, 0) & itemCount(1114, 0) & itemCount(1487, 0) & itemCount(8075, 0) & itemCount(8076, 0) & itemCount(22895, 0)}

# https://www.wowhead.com/classic/spell=2136/fire-blast
spell: "Fire Blast"
blocked: @target{dead | !harm}

####################################################################
# Level 8 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5143/arcane-missiles
spell: "Arcane Missiles"
blocked: @target{dead | !harm}

# https://www.wowhead.com/classic/spell=118/polymorph
spell: "Polymorph"
blocked: @target{dead | !harm | (!creature(beast) & !creature(critter) & !creature(humanoid))}
checked: @target{debuff(infer)}

####################################################################
# Level 10 abilities
####################################################################

# https://www.wowhead.com/classic/spell=122/frost-nova
spell: "Frost Nova"

####################################################################
# Level 12 abilities
####################################################################

# https://www.wowhead.com/classic/spell=604/dampen-magic
spell: "Dampen Magic"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}
glowing: @target:help{is(@player)} & @player{!combat & !grouped & !resting}

# https://www.wowhead.com/classic/spell=130/slow-fall
spell: "Slow Fall"
checked: @player{ownBuff(infer)}
glowing: @player{falling(>1s)}

####################################################################
# Level 14 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1449/arcane-explosion
spell: "Arcane Explosion"

####################################################################
# Level 16 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2855/detect-magic
spell: "Detect Magic"
blocked: @target{dead | !harm}
checked: @target{debuff(infer)}

# https://www.wowhead.com/classic/spell=2120/flamestrike
spell: "Flamestrike"

####################################################################
# Level 18 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1008/amplify-magic
spell: "Amplify Magic"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=475/remove-lesser-curse
spell: "Remove Lesser Curse"
checked: @target:help{!cursed}
glowing: @target:help{always}

####################################################################
# Level 20 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1953/blink
spell: "Blink"
glowing: @player{debuff("Net")} | (@player{running(>3s) & outdoors} & @target{missing | dead | help})

# https://www.wowhead.com/classic/spell=10/blizzard
spell: "Blizzard"

# https://www.wowhead.com/classic/spell=12472/cold-snap
spell: "Cold Snap"

# https://www.wowhead.com/classic/spell=12051/evocation
spell: "Evocation"
checked: @player{mana(100%)}
flashing: @player{ownBuff(infer)}
glowing: @player{mana(<20%) & combat} & @target{missing | !targeting(@player)}

# https://www.wowhead.com/classic/spell=543/fire-ward
spell: "Fire Ward"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=1463/mana-shield
spell: "Mana Shield"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=11366/pyroblast
spell: "Pyroblast"
blocked: @target{dead | !harm}

# https://www.wowhead.com/classic/spell=3562/teleport-ironforge
spell: "Teleport: Ironforge"
blocked: @player{combat}

# https://www.wowhead.com/classic/spell=3567/teleport-orgrimmar
spell: "Teleport: Orgrimmar"
blocked: @player{combat}

# https://www.wowhead.com/classic/spell=3561/teleport-stormwind
spell: "Teleport: Stormwind"
blocked: @player{combat}

# https://www.wowhead.com/classic/spell=3563/teleport-undercity
spell: "Teleport: Undercity"
blocked: @player{combat}

####################################################################
# Level 22 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6143/frost-ward
spell: "Frost Ward"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=2948/scorch
spell: "Scorch"
blocked: @target{dead | !harm}

####################################################################
# Level 24 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2139/counterspell
spell: "Counterspell"
blocked: @target{dead | !harm}
enabled: @target{casting}
glowing: @target{always}

####################################################################
# Level 26 abilities
####################################################################

# https://www.wowhead.com/classic/spell=120/cone-of-cold
spell: "Cone of Cold"

####################################################################
# Level 28 abilities
####################################################################

# https://www.wowhead.com/classic/spell=759/conjure-mana-agate

####################################################################
# Level 30 abilities
####################################################################

# https://www.wowhead.com/classic/spell=11113/blast-wave
# https://www.wowhead.com/classic/spell=7302/ice-armor
# https://www.wowhead.com/classic/spell=11958/ice-block
# https://www.wowhead.com/classic/spell=12043/presence-of-mind
# https://www.wowhead.com/classic/spell=3565/teleport-darnassus
# https://www.wowhead.com/classic/spell=3566/teleport-thunder-bluff

####################################################################
# Level 34 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6117/mage-armor

####################################################################
# Level 38 abilities
####################################################################

# https://www.wowhead.com/classic/spell=3552/conjure-mana-jade

####################################################################
# Level 40 abilities
####################################################################

# https://www.wowhead.com/classic/spell=12042/arcane-power
# https://www.wowhead.com/classic/spell=11129/combustion
# https://www.wowhead.com/classic/spell=11426/ice-barrier
# https://www.wowhead.com/classic/spell=11416/portal-ironforge
# https://www.wowhead.com/classic/spell=11417/portal-orgrimmar
# https://www.wowhead.com/classic/spell=10059/portal-stormwind
# https://www.wowhead.com/classic/spell=11418/portal-undercity

####################################################################
# Level 48 abilities
####################################################################

# https://www.wowhead.com/classic/spell=10053/conjure-mana-citrine

####################################################################
# Level 50 abilities
####################################################################

# https://www.wowhead.com/classic/spell=11419/portal-darnassus
# https://www.wowhead.com/classic/spell=11420/portal-thunder-bluff

####################################################################
# Level 56 abilities
####################################################################

# https://www.wowhead.com/classic/spell=23028/arcane-brilliance

####################################################################
# Level 58 abilities
####################################################################

# https://www.wowhead.com/classic/spell=10054/conjure-mana-ruby
