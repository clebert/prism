# https://www.wowhead.com/classic/spells/abilities/warrior?filter=13;5;2#0+3+21
# https://www.wowhead.com/classic/spells/talents/warrior?filter=13:116;5:2;2:0
# https://www.wowhead.com/classic/spells/talents/warrior?filter=13:116;5:1;2:0

####################################################################
# Level 1 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6673/battle-shout
spell: "Battle Shout"
# Intentionally buff instead of ownBuff to count buffs from other warriors
checked: @player{buff(infer, 1, >10s)}
glowing: @player{always}

# https://www.wowhead.com/classic/spell=2457/battle-stance
spell: "Battle Stance"
flashing: @player{!stance(1) & !rageSafe}

# https://www.wowhead.com/classic/spell=78/heroic-strike
spell: "Heroic Strike"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}

####################################################################
# Level 4 abilities
####################################################################

# https://www.wowhead.com/classic/spell=100/charge
spell: "Charge"
blocked: @target{dead | !harm} | @player{combat}
flashing: @player{!stance(1) & !rageSafe}
glowing: @target{always}

# https://www.wowhead.com/classic/spell=772/rend
spell: "Rend"
blocked: @target{dead | !harm | !bleedable} | @player{stance(3) & talent("Tactical Mastery", <2)}
depleted: @player{!equipped("meleeWeapon")}
checked: @target{ownDebuff(infer)}
flashing: @player{stance(3) & !rageSafe}

####################################################################
# Level 6 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6343/thunder-clap
spell: "Thunder Clap"
blocked: @player{!stance(1) & talent("Tactical Mastery", <4)}
checked: @target{debuff(infer)}
enabled: @player{combat}
flashing: @player{!stance(1) & !rageSafe}

####################################################################
# Level 8 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1715/hamstring
spell: "Hamstring"
blocked: @target{dead | !harm} | @player{stance(2) & talent("Tactical Mastery", <2)}
depleted: @player{!equipped("meleeWeapon")}
checked: @target{debuff(infer)}
flashing: @player{stance(2) & !rageSafe}

####################################################################
# Level 10 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2687/bloodrage
spell: "Bloodrage"
checked: @player{ownBuff(infer)}
enabled: @player{rage(<30)}
flashing: @player{health(<20%)}
glowing: @player{combat & health(>50%) & rage(<10)}

# https://www.wowhead.com/classic/spell=71/defensive-stance
spell: "Defensive Stance"
flashing: @player{!stance(2) & !rageSafe}

# https://www.wowhead.com/classic/spell=7386/sunder-armor
spell: "Sunder Armor"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}
checked: @target{debuff(infer, 5, >=5s)}
glowing: @target{debuff(infer, >0, <5s)}

# https://www.wowhead.com/classic/spell=355/taunt
spell: "Taunt"
blocked: @target{dead | !harm}
checked: @target{ownDebuff(infer) | targeting(@player)}
enabled: @target{!targeting(@player) & !casting}
flashing: @player{!stance(2) & !rageSafe}
glowing: @player{combat & grouped & equipped(shield)}

####################################################################
# Level 12 abilities
####################################################################

# https://www.wowhead.com/classic/spell=7384/overpower
spell: "Overpower"
blocked: @target{dead | !harm | !dodged} | @player{!stance(1) & talent("Tactical Mastery", 0)}
depleted: @player{!equipped("meleeWeapon")}
flashing: @player{!stance(1) & !rageSafe}
glowing: @player{stance(1) | (stance(3) & talent("Improved Overpower", >0))}

# https://www.wowhead.com/classic/spell=72/shield-bash
spell: "Shield Bash"
blocked: @target{dead | !harm} | @player{stance(3) & talent("Tactical Mastery", <2)}
depleted: @player{!equipped(shield)}
enabled: @target{casting}
flashing: @player{stance(3) & !rageSafe}
glowing: @player{!stance(3)}

####################################################################
# Level 14 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1160/demoralizing-shout
spell: "Demoralizing Shout"
checked: @target{debuff(infer)}
enabled: @player{combat}

# https://www.wowhead.com/classic/spell=6572/revenge
spell: "Revenge"
blocked: @target{dead | !harm} | @player{(!stance(1) & talent("Tactical Mastery", 0)) | (!blocked & !dodged & !parried)}
depleted: @player{!equipped("meleeWeapon")}
flashing: @player{!stance(2) & !rageSafe}
glowing: @player{stance(2)}

####################################################################
# Level 16 abilities
####################################################################

# https://www.wowhead.com/classic/spell=694/mocking-blow
spell: "Mocking Blow"
blocked: @target{dead | !harm} | @player{!stance(1) & talent("Tactical Mastery", <2)}
depleted: @player{!equipped("meleeWeapon")}
checked: @target{ownDebuff(infer) | targeting(@player)}
enabled: @target{!targeting(@player) & !casting}
flashing: @player{!stance(1) & !rageSafe}

# https://www.wowhead.com/classic/spell=2565/shield-block
spell: "Shield Block"
blocked: @player{!stance(2) & talent("Tactical Mastery", <2)}
depleted: @player{!equipped(shield)}
enabled: @player{combat}
flashing: @player{!stance(2) & !rageSafe}
glowing: @player{stance(2)} & @target{targeting(@player) & !casting}

####################################################################
# Level 18 abilities
####################################################################

# https://www.wowhead.com/classic/spell=676/disarm
spell: "Disarm"
blocked: @target{dead | !harm | creature(beast) | creature(elemental)} | @player{!stance(2) & talent("Tactical Mastery", <4)}
checked: @target{debuff(infer)}
flashing: @player{!stance(2) & !rageSafe}

####################################################################
# Level 20 abilities
####################################################################

# https://www.wowhead.com/classic/spell=845/cleave
spell: "Cleave"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}

# https://www.wowhead.com/classic/spell=12975/last-stand
spell: "Last Stand"
checked: @player{ownBuff(infer)}
enabled: @player{combat}
glowing: @player{health(<30%)}

# https://www.wowhead.com/classic/spell=12323/piercing-howl
spell: "Piercing Howl"
checked: @player{ownBuff(infer)}
enabled: @player{combat}

# https://www.wowhead.com/classic/spell=20230/retaliation
spell: "Retaliation"
depleted: @player{!equipped("meleeWeapon")}
enabled: @player{combat}
flashing: @player{!stance(1) & !rageSafe}

####################################################################
# Level 22 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5246/intimidating-shout
spell: "Intimidating Shout"
blocked: @target{dead | !harm | creature(elemental) | creature(mechanical) | creature(undead)}
checked: @target{debuff(infer)}
flashing: @target{debuff("Deep Wounds") | debuff("Rend")}

####################################################################
# Level 24 abilities
####################################################################

# https://www.wowhead.com/classic/spell=5308/execute
spell: "Execute"
blocked: @target{dead | !harm | health(>20%)} | @player{stance(2) & talent("Tactical Mastery", <3)}
depleted: @player{!equipped("meleeWeapon")}
flashing: @player{stance(2) & !rageSafe}
glowing: @player{!stance(2)}

####################################################################
# Level 26 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1161/challenging-shout
spell: "Challenging Shout"
enabled: @player{combat}

####################################################################
# Level 28 abilities
####################################################################

# https://www.wowhead.com/classic/spell=871/shield-wall
spell: "Shield Wall"
depleted: @player{!equipped(shield)}
checked: @player{ownBuff(infer)}
enabled: @player{combat}
glowing: @player{health(<30%)}

####################################################################
# Level 30 abilities
####################################################################

# https://www.wowhead.com/classic/spell=2458/berserker-stance
spell: "Berserker Stance"
flashing: @player{!stance(3) & !rageSafe}

# https://www.wowhead.com/classic/spell=12809/concussion-blow
spell: "Concussion Blow"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}
checked: @target{debuff(infer)}

# https://www.wowhead.com/classic/spell=12328/death-wish
spell: "Death Wish"
checked: @player{ownDebuff(infer)}
enabled: @player{combat}

# https://www.wowhead.com/classic/spell=20252/intercept
spell: "Intercept"
blocked: @target{dead | !harm} | @player{!stance(3) & talent("Tactical Mastery", <2)}
enabled: @target{!ownDebuff("Charge Stun")}
flashing: @player{!stance(3) & !rageSafe}
glowing: @player{combat}

# https://www.wowhead.com/classic/spell=1464/slam
spell: "Slam"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}

# https://www.wowhead.com/classic/spell=12292/sweeping-strikes
spell: "Sweeping Strikes"
checked: @player{ownBuff(infer)}
enabled: @player{combat}

####################################################################
# Level 32 abilities
####################################################################

# https://www.wowhead.com/classic/spell=18499/berserker-rage
spell: "Berserker Rage"
checked: @player{ownBuff(infer)}
enabled: @player{combat}
flashing: @player{!stance(3) & !rageSafe}
glowing: @player{!stance(2)}

####################################################################
# Level 36 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1680/whirlwind
spell: "Whirlwind"
blocked: @player{!stance(3) & talent("Tactical Mastery", <5)}
depleted: @player{!equipped("meleeWeapon")}
enabled: @player{combat}
flashing: @player{!stance(3) & !rageSafe}

####################################################################
# Level 38 abilities
####################################################################

# https://www.wowhead.com/classic/spell=6552/pummel
spell: "Pummel"
blocked: @target{dead | !harm} | @player{!stance(3) & talent("Tactical Mastery", <2)}
enabled: @target{casting}
flashing: @player{!stance(3) & !rageSafe}
glowing: @player{!stance(2)}

####################################################################
# Level 40 abilities
####################################################################

# https://www.wowhead.com/classic/spell=23881/bloodthirst
spell: "Bloodthirst"
blocked: @target{dead | !harm}
glowing: @player{always}

# https://www.wowhead.com/classic/spell=12294/mortal-strike
spell: "Mortal Strike"
blocked: @target{dead | !harm}
depleted: @player{!equipped("meleeWeapon")}
glowing: @player{always}

# https://www.wowhead.com/classic/spell=23922/shield-slam
spell: "Shield Slam"
blocked: @target{dead | !harm}
depleted: @player{!equipped(shield)}
glowing: @player{always}

####################################################################
# Level 50 abilities
####################################################################

# https://www.wowhead.com/classic/spell=1719/recklessness
spell: "Recklessness"
checked: @player{ownBuff(infer)}
enabled: @player{combat}
flashing: @player{!stance(3) & !rageSafe}
