# https://www.wowhead.com/classic/spells/abilities/rogue?filter=13;5;2#0+3+21
# https://www.wowhead.com/classic/spells/talents/rogue?filter=13:116;5:2;2:0
# https://www.wowhead.com/classic/spells/talents/rogue?filter=13:116;5:1;2:0

####################################################################
# Level 1 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2098/eviscerate
spell: "Eviscerate"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}
depleted: @target{comboPoints(0)}
glowing: @target{comboPoints(5) | (health(<20%) & !elite)}

# https://www.wowhead.com/classic/spell=1752/sinister-strike
spell: "Sinister Strike"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}

# https://www.wowhead.com/classic/spell=1784/stealth
spell: "Stealth"
blocked: @player{combat}
checked: @player{stealthed}

####################################################################
# Level 4 abilities
####################################################################

# https://www.wowhead.com/classic/spell=53/backstab
spell: "Backstab"
blocked: @player{!equipped(dagger)} | @target{dead | !harm}

# https://www.wowhead.com/classic/spell=921/pick-pocket
spell: "Pick Pocket"
blocked: @player{!stealthed} | @target{dead | !harm}

####################################################################
# Level 6 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1776/gouge
spell: "Gouge"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm | creature(mechanical)}
checked: @target{debuff(infer)}

####################################################################
# Level 8 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5277/evasion
spell: "Evasion"
checked: @player{buff(infer)}
enabled: @player{combat}

####################################################################
# Level 10 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6770/sap
spell: "Sap"
blocked: @player{!equipped(meleeWeapon) | !stealthed} | @target{combat | dead | !harm | !creature(humanoid)}

# https://www.wowhead.com/classic/spell=5171/slice-and-dice
spell: "Slice and Dice"
blocked: @target{dead | !harm}
depleted: @target{comboPoints(0)}
checked: @player{buff(infer, 1, >1s)}
glowing: @player{level(>=42)} & @target{comboPoints(<5) & (health(>=20%) | elite)}

# https://www.wowhead.com/classic/spell=2983/sprint
spell: "Sprint"
checked: @player{buff(infer)}

####################################################################
# Level 12 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1766/kick
spell: "Kick"
blocked: @target{dead | !harm}
enabled: @target{casting}
glowing: @target{always}

####################################################################
# Level 14 abilities
####################################################################

# https://www.wowhead.com/classic/spell=8647/expose-armor
spell: "Expose Armor"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}
depleted: @target{comboPoints(0)}
checked: @target{debuff(infer)}

# https://www.wowhead.com/classic/spell=703/garrote
spell: "Garrote"
blocked: @player{!stealthed} | @target{dead | !harm}
checked: @target{ownDebuff(infer)}

####################################################################
# Level 16 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1966/feint
spell: "Feint"
blocked: @target{dead | !harm}
enabled: @player{combat}
glowing: @player{grouped} & @target{attacking(@player) | targeting(@player)}

# https://www.wowhead.com/classic/spell=1804/pick-lock
spell: "Pick Lock"

####################################################################
# Level 18 abilities
####################################################################

# https://www.wowhead.com/classic/spell=8676/ambush
spell: "Ambush"
blocked: @player{!equipped(dagger) | !stealthed} | @target{dead | !harm}

####################################################################
# Level 20 abilities
####################################################################

# https://www.wowhead.com/classic/spell=3420/crippling-poison
spell: "Crippling Poison"
blocked: @player{!usable(infer)}

# https://www.wowhead.com/classic/spell=14278/ghostly-strike
spell: "Ghostly Strike"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}

# https://www.wowhead.com/classic/spell=8681/instant-poison
spell: "Instant Poison"
blocked: @player{!usable(infer)}

# https://www.wowhead.com/classic/spell=14251/riposte
spell: "Riposte"
blocked: @player{!usable(infer)} | @target{dead | !harm}
checked: @target{ownDebuff(infer)}
glowing: @player{always}

# https://www.wowhead.com/classic/spell=1943/rupture
spell: "Rupture"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm | !bleedable}
depleted: @target{comboPoints(0)}
checked: @target{debuff(infer)}

####################################################################
# Level 22 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1725/distract
spell: "Distract"
blocked: @target{combat}
enabled: @player{stealthed}

# https://www.wowhead.com/classic/spell=1856/vanish
spell: "Vanish"
blocked: @player{!usable(infer)}
enabled: @player{combat}
flashing: @player{poisoned | debuff("Rend")}
glowing: @player{health(<15%)}

####################################################################
# Level 24 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5763/mind-numbing-poison
spell: "Mind-numbing Poison"
blocked: @player{!usable(infer)}

####################################################################
# Level 26 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1833/cheap-shot
spell: "Cheap Shot"
blocked: @player{!equipped(meleeWeapon) | !stealthed} | @target{dead | !harm}
checked: @target{debuff(infer)}

####################################################################
# Level 30 abilities
####################################################################

# https://www.wowhead.com/classic/spell=13877/blade-flurry
spell: "Blade Flurry"
blocked: @target{dead | !harm}
checked: @player{buff(infer)}
enabled: @player{combat}

# https://www.wowhead.com/classic/spell=14177/cold-blood
spell: "Cold Blood"

# https://www.wowhead.com/classic/spell=2835/deadly-poison
spell: "Deadly Poison"
blocked: @player{!usable(infer)}

# https://www.wowhead.com/classic/spell=1842/disarm-trap
spell: "Disarm Trap"
blocked: @player{!usable(infer)}

# https://www.wowhead.com/classic/spell=16511/hemorrhage
spell: "Hemorrhage"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}

# https://www.wowhead.com/classic/spell=408/kidney-shot
spell: "Kidney Shot"
blocked: @player{!equipped(meleeWeapon)} | @target{dead | !harm}
depleted: @target{comboPoints(0)}
checked: @target{debuff(infer)}

# https://www.wowhead.com/classic/spell=14185/preparation
spell: "Preparation"

####################################################################
# Level 32 abilities
####################################################################

# https://www.wowhead.com/classic/spell=13220/wound-poison
spell: "Wound Poison"
blocked: @player{!usable(infer)}

####################################################################
# Level 34 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2094/blind
spell: "Blind"
blocked: @player{!usable(infer)} | @target{dead | !harm}
checked: @target{debuff(infer)}
enabled: @player{combat}

####################################################################
# Level 40 abilities
####################################################################

# https://www.wowhead.com/classic/spell=13750/adrenaline-rush
spell: "Adrenaline Rush"
checked: @player{buff(infer)}
enabled: @player{combat}

# https://www.wowhead.com/classic/spell=14183/premeditation
spell: "Premeditation"
blocked: @player{!stealthed}
