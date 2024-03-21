spell: "Attack"
blocked: @player{!usable(infer)} | @target{dead | !harm}

spell: "Shadowmeld"
blocked: @player{combat}
checked: @player{buff(infer)}

spell: "Shoot"
blocked: @player{!usable(infer)} | @target{dead | !harm}

spell: "Shoot Bow"
blocked: @player{!usable(infer)} | @target{dead | !harm}

spell: "Shoot Crossbow"
blocked: @player{!usable(infer)} | @target{dead | !harm}

spell: "Shoot Gun"
blocked: @player{!usable(infer)} | @target{dead | !harm}

spell: "Stoneform"
checked: @player{!diseased & !poisoned}
glowing: @player{always}

spell: "Throw"
blocked: @player{!usable(infer)} | @target{dead | !harm}
