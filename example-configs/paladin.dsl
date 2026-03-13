# https://www.wowhead.com/classic/spells/abilities/paladin?filter=13;5;2#0+3+21
# https://www.wowhead.com/classic/spells/talents/paladin?filter=13:116;5:2;2:0
# https://www.wowhead.com/classic/spells/talents/paladin?filter=13:116;5:1;2:0

################################################################
# Level 1 abilities
################################################################

# https://www.wowhead.com/classic/spell=635/holy-light
spell: "Holy Light"
blocked: @target:help{dead}
checked: @target:help{health(100%)}
glowing: @target:help{is(@player) & health(<50%) & !buff("Food") & !combat} | @player{ownBuff("Divine Favor")}

# https://www.wowhead.com/classic/spell=21084/seal-of-righteousness
spell: "Seal of Righteousness"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed}
glowing: @target{harm & !dead & ((!elite & level(<44)) | ownDebuff("Judgement of the Crusader"))}

# https://www.wowhead.com/classic/spell=465/devotion-aura
spell: "Devotion Aura"
checked: @player{ownBuff(infer)}

################################################################
# Level 4 abilities
################################################################

# https://www.wowhead.com/classic/spell=20271/judgement
spell: "Judgement"
blocked: @target{dead | !harm} | @player{!sealed}
flashing: @target{judged}
glowing: @player{!ownBuff("Seal of Righteousness")} & (@player{!ownBuff("Seal of Command")} | @target{debuff("Hammer of Justice")})

# https://www.wowhead.com/classic/spell=19740/blessing-of-might
spell: "Blessing of Might"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}
glowing: @target:help{is(@player)} & @player{!combat & !resting & !blessed & !talent("Blessing of Kings")}

################################################################
# Level 6 abilities
################################################################

# https://www.wowhead.com/classic/spell=498/divine-protection
spell: "Divine Protection"
blocked: @player{debuff("Forbearance")}
checked: @player{ownBuff(infer)}
enabled: @player{combat}
glowing: @player{health(<20%)}

# https://www.wowhead.com/classic/spell=21082/seal-of-the-crusader
spell: "Seal of the Crusader"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed | ownBuff("Seal of Righteousness")} & @target{!debuff("Judgement of the Crusader")}
glowing: @target{harm & !dead & health(>50%) & (elite | level(>=44))}

################################################################
# Level 8 abilities
################################################################

# https://www.wowhead.com/classic/spell=853/hammer-of-justice
spell: "Hammer of Justice"
blocked: @target{dead | !harm}
checked: @target{debuff(infer)}
glowing: @target{casting}

# https://www.wowhead.com/classic/spell=1152/purify
spell: "Purify"
checked: @target:help{!diseased & !poisoned}
glowing: @target:help{always}

################################################################
# Level 10 abilities
################################################################

# https://www.wowhead.com/classic/spell=1022/blessing-of-protection
spell: "Blessing of Protection"
blocked: @target:help{dead | (!is(@player) & !partyMember) | debuff("Forbearance")}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=633/lay-on-hands
spell: "Lay on Hands"
blocked: @target:help{dead}
checked: @target:help{health(100%)}
glowing: @target:help{health(<20%) & combat}

################################################################
# Level 12 abilities
################################################################

# https://www.wowhead.com/classic/spell=7328/redemption
spell: "Redemption"
blocked: @target:help{alive} | @player{combat}

################################################################
# Level 14 abilities
################################################################

# https://www.wowhead.com/classic/spell=19742/blessing-of-wisdom
spell: "Blessing of Wisdom"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}

################################################################
# Level 16 abilities
################################################################

# https://www.wowhead.com/classic/spell=7294/retribution-aura
spell: "Retribution Aura"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=25780/righteous-fury
spell: "Righteous Fury"
checked: @player{ownBuff(infer)}
glowing: @player{grouped}

################################################################
# Level 18 abilities
################################################################

# https://www.wowhead.com/classic/spell=1044/blessing-of-freedom
spell: "Blessing of Freedom"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}
glowing: @target:help{is(@player) & (debuff("Frost Nova") | debuff("Net"))}

################################################################
# Level 20 abilities
################################################################

# https://www.wowhead.com/classic/spell=20217/blessing-of-kings
spell: "Blessing of Kings"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}
glowing: @target:help{is(@player)} & @player{!combat & !resting & !blessed}

# https://www.wowhead.com/classic/spell=26573/consecration
spell: "Consecration"

# https://www.wowhead.com/classic/spell=879/exorcism
spell: "Exorcism"
blocked: @target{dead | !harm | (!creature(demon) & !creature(undead))}
glowing: @player{!combat}

# https://www.wowhead.com/classic/spell=19750/flash-of-light
spell: "Flash of Light"
blocked: @target:help{dead}
checked: @target:help{health(100%)}
glowing: @player{ownBuff("Divine Favor")}

# https://www.wowhead.com/classic/spell=20375/seal-of-command
spell: "Seal of Command"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed | ownBuff("Seal of Righteousness")}

# https://www.wowhead.com/classic/spell=5502/sense-undead
spell: "Sense Undead"
checked: @player{ownBuff(infer)}

################################################################
# Level 22 abilities
################################################################

# https://www.wowhead.com/classic/spell=19746/concentration-aura
spell: "Concentration Aura"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=20164/seal-of-justice
spell: "Seal of Justice"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed | ownBuff("Seal of Righteousness")} & @target{!debuff("Judgement of Justice")}

################################################################
# Level 24 abilities
################################################################

# https://www.wowhead.com/classic/spell=2878/turn-undead
spell: "Turn Undead"
blocked: @target{dead | !harm | (!creature(demon) & !creature(undead))}
checked: @target{debuff(infer)}

################################################################
# Level 26 abilities
################################################################

# https://www.wowhead.com/classic/spell=1038/blessing-of-salvation
spell: "Blessing of Salvation"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

################################################################
# Level 28 abilities
################################################################

# https://www.wowhead.com/classic/spell=19876/shadow-resistance-aura
spell: "Shadow Resistance Aura"
checked: @player{ownBuff(infer)}

################################################################
# Level 30 abilities
################################################################

# https://www.wowhead.com/classic/spell=20911/blessing-of-sanctuary
spell: "Blessing of Sanctuary"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=20216/divine-favor
spell: "Divine Favor"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=19752/divine-intervention
spell: "Divine Intervention"
blocked: @target:help{dead | is(@player) | !partyMember}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=20218/sanctity-aura
spell: "Sanctity Aura"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=20165/seal-of-light
spell: "Seal of Light"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed | ownBuff("Seal of Righteousness")}

################################################################
# Level 32 abilities
################################################################

# https://www.wowhead.com/classic/spell=19888/frost-resistance-aura
spell: "Frost Resistance Aura"
checked: @player{ownBuff(infer)}

################################################################
# Level 34 abilities
################################################################

# https://www.wowhead.com/classic/spell=642/divine-shield
spell: "Divine Shield"
blocked: @player{debuff("Forbearance")}
checked: @player{ownBuff(infer)}
glowing: @player{health(<20%) | falling(>1s)}

################################################################
# Level 36 abilities
################################################################

# https://www.wowhead.com/classic/spell=19891/fire-resistance-aura
spell: "Fire Resistance Aura"
checked: @player{ownBuff(infer)}

################################################################
# Level 38 abilities
################################################################

# https://www.wowhead.com/classic/spell=20166/seal-of-wisdom
spell: "Seal of Wisdom"
checked: @player{ownBuff(infer)}
enabled: @player{!sealed | ownBuff("Seal of Righteousness")}

################################################################
# Level 40 abilities
################################################################

# https://www.wowhead.com/classic/spell=19977/blessing-of-light
spell: "Blessing of Light"
blocked: @target:help{dead}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=20925/holy-shield
spell: "Holy Shield"
checked: @player{ownBuff(infer)}

# https://www.wowhead.com/classic/spell=20473/holy-shock
spell: "Holy Shock"
checked: @target:help{health(100%)}
glowing: @player{ownBuff("Divine Favor")}

# https://www.wowhead.com/classic/spell=20066/repentance
spell: "Repentance"
blocked: @target{dead | !harm | !creature(humanoid)}
checked: @target{debuff(infer)}

# https://www.wowhead.com/classic/spell=13819/summon-warhorse
spell: "Summon Warhorse"
blocked: @player{combat | indoors}

################################################################
# Level 42 abilities
################################################################

# https://www.wowhead.com/classic/spell=4987/cleanse
spell: "Cleanse"
checked: @target:help{!diseased & !magicDebuff & !poisoned}
glowing: @target:help{always}

################################################################
# Level 44 abilities
################################################################

# https://www.wowhead.com/classic/spell=24275/hammer-of-wrath
spell: "Hammer of Wrath"
blocked: @target{dead | !harm | health(>20%)}
glowing: @target{always}

################################################################
# Level 46 abilities
################################################################

# https://www.wowhead.com/classic/spell=6940/blessing-of-sacrifice
spell: "Blessing of Sacrifice"
blocked: @target:help{dead | is(@player) | !partyMember}
checked: @target:help{ownBuff(infer)}

################################################################
# Level 50 abilities
################################################################

# https://www.wowhead.com/classic/spell=2812/holy-wrath
spell: "Holy Wrath"

################################################################
# Level 52 abilities
################################################################

# https://www.wowhead.com/classic/spell=25782/greater-blessing-of-might
spell: "Greater Blessing of Might"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

################################################################
# Level 54 abilities
################################################################

# https://www.wowhead.com/classic/spell=25894/greater-blessing-of-wisdom
spell: "Greater Blessing of Wisdom"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

################################################################
# Level 60 abilities
################################################################

# https://www.wowhead.com/classic/spell=25898/greater-blessing-of-kings
spell: "Greater Blessing of Kings"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=25890/greater-blessing-of-light
spell: "Greater Blessing of Light"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=25895/greater-blessing-of-salvation
spell: "Greater Blessing of Salvation"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=25899/greater-blessing-of-sanctuary
spell: "Greater Blessing of Sanctuary"
blocked: @target:help{dead | (!is(@player) & !partyMember)}
checked: @target:help{buff(infer)}

# https://www.wowhead.com/classic/spell=23214/summon-charger
spell: "Summon Charger"
blocked: @player{combat | indoors}
