# Level 1 abilities

spell: "Auto Shot"
depleted: @player{!ammo}
enabled: @target{alive & harm}

spell: "Raptor Strike"
enabled: @target{alive & harm}

spell: "Track Beasts"

# Level 4 abilities

spell: "Aspect of the Monkey"
checked: @player{buff(infer)}
glowing: @player{meleeAttacking | (debuff("Dazed") & combat)}

spell: "Serpent Sting"
depleted: @player{!ammo}
checked: @target{ownDebuff(infer)}
enabled: @target{alive & harm & !creature(elemental) & !creature(mechanical)}
flashing: @player{ammo(<50)}

# Level 6 abilities

spell: "Arcane Shot"
depleted: @player{!ammo}
enabled: @target{alive & harm}
flashing: @player{ammo(<50)}

spell: "Hunter's Mark"
checked: @target{debuff(infer)}
enabled: @target{alive & harm}
glowing: @target{always}

# Level 8 abilities

spell: "Concussive Shot"
depleted: @player{!ammo}
checked: @target{debuff(infer)}
enabled: @target{alive & harm}
flashing: @player{ammo(<50)}
glowing: @target{targeting(@player) & !casting}

# Level 10 abilities

spell: "Aspect of the Hawk"
checked: @player{buff(infer)}
glowing: @player{autoShooting}

spell: "Beast Training"

spell: "Call Pet"
enabled: @pet{missing}

spell: "Dismiss Pet"
enabled: @pet{alive}

spell: "Feed Pet"
blocked: @pet{combat} | @player{combat}
checked: @pet{happy}
enabled: @pet{alive}
flashing: @pet{buff("Feed Pet Effect")}
glowing: @pet{!buff("Feed Pet Effect")}

spell: "Revive Pet"
enabled: @pet{dead | missing}
glowing: @pet{dead}

spell: "Tame Beast"
blocked: @pet{existing}
checked: @target{ownDebuff(infer)}
enabled: @target{alive & harm & creature(beast)}

spell: "Track Humanoids"

# Level 12 abilities

spell: "Distracting Shot"
depleted: @player{!ammo}
checked: @target{ownDebuff(infer) | attacking(@player)}
enabled: @target{alive & harm & !creature(mechanical)}
flashing: @player{ammo(<50)}

spell: "Mend Pet"
checked: @pet{health(100%)} & (@pet{!cursed & !diseased & !magicDebuff & !poisoned} | @player{!talent("Improved Mend Pet")})
enabled: @pet{alive}
flashing: @pet{buff(infer)}
glowing: @pet{(cursed | diseased | magicDebuff | poisoned)} & @player{talent("Improved Mend Pet")}

spell: "Wing Clip"
checked: @target{debuff(infer)}
enabled: @target{alive & harm}
glowing: @target{targeting(@player) & !creature(beast)}

# Level 14 abilities

spell: "Eagle Eye"
blocked: @player{indoors}
checked: @player{buff(infer)}

spell: "Eyes of the Beast"
blocked: @pet{dead | missing}
checked: @player{buff(infer)}

spell: "Scare Beast"
checked: @target{debuff(infer)}
enabled: @target{alive & harm & creature(beast)}
glowing: @target{targeting(@player)}

# Level 16 abilities

spell: "Immolation Trap"
blocked: @player{combat}

spell: "Mongoose Bite"
enabled: @target{alive & harm} & @player{dodged}
glowing: @target{always}

# Level 18 abilities

spell: "Multi-Shot"
depleted: @player{!ammo}
enabled: @target{alive & harm}
flashing: @player{ammo(<50)}

spell: "Track Undead"

# Level 20 abilities

spell: "Aimed Shot"
depleted: @player{!ammo}
enabled: @target{alive & harm}
flashing: @player{ammo(<50)}

spell: "Aspect of the Cheetah"
checked: @player{buff(infer)}
glowing: @player{resting & !combat & !mounted & !buff("Aspect of the Pack")}

spell: "Disengage"
enabled: @target{alive & harm}
glowing: @target{attacking(@player)}

spell: "Freezing Trap"
blocked: @player{combat}

# Level 22 abilities

spell: "Scorpid Sting"
depleted: @player{!ammo}
checked: @target{ownDebuff(infer)}
enabled: @target{alive & harm & !creature(elemental) & !creature(mechanical)}
flashing: @player{ammo(<50)}

# Level 24 abilities

spell: "Beast Lore"
checked: @target{buff(infer) | debuff(infer)}
enabled: @target{alive & creature(beast)}

spell: "Track Hidden"

# Level 26 abilities

spell: "Rapid Fire"
checked: @player{buff(infer)}
enabled: @player{combat}

spell: "Track Elementals"

# Level 28 abilities

spell: "Frost Trap"
blocked: @player{combat}

# Level 30 abilities

spell: "Aspect of the Beast"
checked: @player{buff(infer)}

spell: "Feign Death"
checked: @player{buff(infer)}

spell: "Intimidation"
blocked: @player{combat} & @pet{dead | missing}
checked: @target{debuff(infer)}
enabled: @pet{combat} & @target{alive & harm}
flashing: @pet{!targeting(@target)}
glowing: @target{casting | targeting(@player)}

# Level 32 abilities

spell: "Flare"

spell: "Track Demons"

# Level 34 abilities

spell: "Explosive Trap"
blocked: @player{combat}

# Level 36 abilities

spell: "Viper Sting"
depleted: @player{!ammo}
checked: @target{ownDebuff(infer)}
enabled: @target{alive & harm & mana(>0%) & !creature(elemental) & !creature(mechanical)}
flashing: @player{ammo(<50)}

# Level 40 abilities

spell: "Aspect of the Pack"
checked: @player{buff(infer)}

spell: "Bestial Wrath"
blocked: @player{combat} & @pet{dead | missing}
checked: @pet{buff(infer)}
enabled: @pet{combat} & @target{alive & harm}

spell: "Track Giants"

spell: "Volley"

# Level 46 abilities

spell: "Aspect of the Wild"
checked: @player{buff(infer)}

# Level 50 abilities

spell: "Track Dragonkin"

# Level 60 abilities

spell: "Tranquilizing Shot"
depleted: @player{!ammo}
enabled: @target{alive & harm}
flashing: @player{ammo(<50)}
