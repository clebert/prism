# https://www.wowhead.com/classic/spells/abilities/druid?filter=13;5;2#0+3+21
# https://www.wowhead.com/classic/spells/talents/druid?filter=13:116;5:2;2:0
# https://www.wowhead.com/classic/spells/talents/druid?filter=13:116;5:1;2:0

####################################################################
# Level 1 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5185/healing-touch
spell: "Healing Touch"
checked: @target:help{health(100%)}
flashing: @player{combat & !canShiftBackFrom(humanoid)}

# https://www.wowhead.com/classic/spell=1126/mark-of-the-wild
spell: "Mark of the Wild"
checked: @target:help{buff(infer)}
flashing: @player{combat & !canShiftBackFrom(humanoid)}
glowing: @target:help{is(@player)} & @player{!combat & !resting}

# https://www.wowhead.com/classic/spell=5176/wrath
spell: "Wrath"
blocked: @target{dead | !harm}
flashing: @player{!canShiftBackFrom(humanoid)}

####################################################################
# Level 4 abilities
####################################################################

# https://www.wowhead.com/classic/spell=8921/moonfire
spell: "Moonfire"
blocked: @target{dead | !harm}
flashing: @player{!canShiftBackFrom(humanoid)}

# https://www.wowhead.com/classic/spell=774/rejuvenation
spell: "Rejuvenation"
checked: @target:help{health(100%) | ownBuff(infer)}
flashing: @player{combat & !canShiftBackFrom(humanoid)}

####################################################################
# Level 6 abilities
####################################################################

# https://www.wowhead.com/classic/spell=467/thorns
spell: "Thorns"
checked: @target:help{buff(infer)}
flashing: @player{combat & !canShiftBackFrom(humanoid)}
glowing: @target:help{is(@player)} & @player{!combat & !resting}

####################################################################
# Level 8 abilities
####################################################################

# https://www.wowhead.com/classic/spell=339/entangling-roots
spell: "Entangling Roots"
blocked: @player{indoors} | @target{dead | !harm}
checked: @target{debuff(infer)}
flashing: @player{!canShiftBackFrom(humanoid)}

####################################################################
# Level 10 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5487/bear-form
spell: "Bear Form"
checked: @player{ownBuff(infer)}
glowing: @player{debuff("Net")}

# https://www.wowhead.com/classic/spell=99/demoralizing-roar
spell: "Demoralizing Roar"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
checked: @target{debuff(infer)}
flashing: @player{!canShiftBackFrom(bear)}

# https://www.wowhead.com/classic/spell=6795/growl
spell: "Growl"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
checked: @target{ownDebuff(infer) | targeting(@player)}
enabled: @target{!casting}
flashing: @player{!canShiftBackFrom(bear)}
glowing: @player{combat & grouped & druidForm(bear)}

# https://www.wowhead.com/classic/spell=6807/maul
spell: "Maul"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
flashing: @player{!canShiftBackFrom(bear)}

# https://www.wowhead.com/classic/spell=16689/natures-grasp
spell: "Nature's Grasp"
blocked: @player{indoors}
checked: @player{ownBuff(infer)}
flashing: @player{!canShiftBackFrom(humanoid)}

# https://www.wowhead.com/classic/spell=18960/teleport-moonglade
spell: "Teleport: Moonglade"
blocked: @player{combat}

####################################################################
# Level 12 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5229/enrage
spell: "Enrage"
checked: @player{ownBuff(infer)}
enabled: @player{rage(<30)}
glowing: @player{combat & rage(<10)}

# https://www.wowhead.com/classic/spell=8936/regrowth
spell: "Regrowth"
checked: @target:help{health(100%) | ownBuff(infer)}
flashing: @player{combat & !canShiftBackFrom(humanoid)}

####################################################################
# Level 14 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5211/bash
spell: "Bash"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
checked: @target{debuff(infer)}
flashing: @player{!canShiftBackFrom(bear)}
glowing: @target{casting}

# https://www.wowhead.com/classic/spell=8946/cure-poison
spell: "Cure Poison"
checked: @target:help{!poisoned}
flashing: @player{combat & !canShiftBackFrom(humanoid)}
glowing: @target:help{is(@player) & poisoned}

####################################################################
# Level 16 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1066/aquatic-form
spell: "Aquatic Form"
blocked: @player{!swimming}
checked: @player{ownBuff(infer)}
glowing: @player{debuff("Net")}

# https://www.wowhead.com/classic/spell=779/swipe
spell: "Swipe"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
flashing: @player{!canShiftBackFrom(bear)}

####################################################################
# Level 18 abilities
####################################################################

# https://www.wowhead.com/classic/spell=770/faerie-fire
spell: "Faerie Fire"
blocked: @target{dead | !harm}
checked: @target{debuff(infer)}
flashing: @player{!canShiftBackFrom(humanoid)}

# https://www.wowhead.com/classic/spell=2637/hibernate
spell: "Hibernate"
blocked: @target{dead | !harm | (!creature(beast) & !creature(dragonkin))}
checked: @target{debuff(infer)}
flashing: @player{!canShiftBackFrom(humanoid)}
glowing: @player{health(<30%)}

####################################################################
# Level 20 abilities
####################################################################

# https://www.wowhead.com/classic/spell=768/cat-form
spell: "Cat Form"
checked: @player{buff(infer)}
glowing: @player{debuff("Net")}

# https://www.wowhead.com/classic/spell=1082/claw
spell: "Claw"
blocked: @player{!canShiftInto(cat)} | @target{dead | !harm}
flashing: @player{!canShiftBackFrom(cat)}

# https://www.wowhead.com/classic/spell=5215/prowl
spell: "Prowl"
blocked: @player{combat | !canShiftInto(cat)}
checked: @player{stealthed}
flashing: @player{!canShiftBackFrom(cat)}

# https://www.wowhead.com/classic/spell=20484/rebirth
spell: "Rebirth"
blocked: @target{harm | !existing}
enabled: @target:help{dead}
flashing: @player{!canShiftBackFrom(humanoid)}

# https://www.wowhead.com/classic/spell=1079/rip
spell: "Rip"
blocked: @player{!canShiftInto(cat)} | @target{dead | !harm}
depleted: @target{comboPoints(0)}
flashing: @player{!canShiftBackFrom(cat)}
glowing: @target{comboPoints(5)}

# https://www.wowhead.com/classic/spell=2912/starfire
spell: "Starfire"
blocked: @target{dead | !harm}
flashing: @player{!canShiftBackFrom(humanoid)}
