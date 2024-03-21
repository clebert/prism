# Anti-Venom

# - https://www.wowhead.com/classic/item=6452/anti-venom
# - https://www.wowhead.com/classic/item=6453/strong-anti-venom
# - https://www.wowhead.com/classic/item=19440/powerful-anti-venom

item: 6452, 6453, 19440
checked: @target:help{!poisoned}
glowing: @target:help{is(@player) & poisoned}

# Bandage

# - https://www.wowhead.com/classic/item=1251/linen-bandage
# - https://www.wowhead.com/classic/item=2581/heavy-linen-bandage
# - https://www.wowhead.com/classic/item=3530/wool-bandage
# - https://www.wowhead.com/classic/item=3531/heavy-wool-bandage
# - https://www.wowhead.com/classic/item=6450/silk-bandage
# - https://www.wowhead.com/classic/item=6451/heavy-silk-bandage
# - https://www.wowhead.com/classic/item=8544/mageweave-bandage
# - https://www.wowhead.com/classic/item=8545/heavy-mageweave-bandage
# - https://www.wowhead.com/classic/item=14529/runecloth-bandage
# - https://www.wowhead.com/classic/item=14530/heavy-runecloth-bandage

item: 1251, 2581, 3530, 3531, 6450, 6451, 8544, 8545, 14529, 14530
blocked: @target:help{debuff("Recently Bandaged")}
checked: @target:help{buff(infer) | health(100%)}
enabled: @player{!buff("Feign Death")}
flashing: @target:help{poisoned | debuff("Rend")}
glowing: @target:help{is(@player) & health(<50%) & !buff("Food") & !combat}

# Chronoboon Displacer

# - https://www.wowhead.com/classic/item=184937/chronoboon-displacer

item: 184937
checked: @player{buff("Supercharged Chronoboon Displacer")}

# Elixir of Poison Resistance

# - https://www.wowhead.com/classic/item=3386/elixir-of-poison-resistance

item: 3386
checked: @player{!poisoned}
glowing: @player{always}

# Elixir

# - https://www.wowhead.com/classic/item=2454/elixir-of-lions-strength
# - https://www.wowhead.com/classic/item=2458/elixir-of-minor-fortitude
# - https://www.wowhead.com/classic/item=3383/elixir-of-wisdom
# - https://www.wowhead.com/classic/item=3391/elixir-of-ogres-strength
# - https://www.wowhead.com/classic/item=3825/elixir-of-fortitude
# - https://www.wowhead.com/classic/item=5996/elixir-of-water-breathing
# - https://www.wowhead.com/classic/item=5997/elixir-of-minor-defense
# - https://www.wowhead.com/classic/item=8529/noggenfogger-elixir
# - https://www.wowhead.com/classic/item=8949/elixir-of-agility
# - https://www.wowhead.com/classic/item=8951/elixir-of-greater-defense
# - https://www.wowhead.com/classic/item=18294/elixir-of-greater-water-breathing

item: 2454, 2458, 3383, 3391, 3825, 5996, 5997, 8529, 8949, 8951, 18294
checked: @player{buff(infer)}

# Flask of Petrification

# - https://www.wowhead.com/classic/item=13506/flask-of-petrification

item: 13506
checked: @player{buff(infer)}
glowing: @player{health(<20%)}

# Food with buff

# - https://www.wowhead.com/classic/item=724/goretusk-liver-pie
# - https://www.wowhead.com/classic/item=1017/seasoned-wolf-kabob
# - https://www.wowhead.com/classic/item=1082/redridge-goulash
# - https://www.wowhead.com/classic/item=2070/darnassian-bleu
# - https://www.wowhead.com/classic/item=2684/coyote-steak
# - https://www.wowhead.com/classic/item=2687/dry-pork-ribs
# - https://www.wowhead.com/classic/item=2888/beer-basted-boar-ribs
# - https://www.wowhead.com/classic/item=3220/blood-sausage
# - https://www.wowhead.com/classic/item=3663/murloc-fin-soup
# - https://www.wowhead.com/classic/item=3664/crocolisk-gumbo
# - https://www.wowhead.com/classic/item=3665/curiously-tasty-omelet
# - https://www.wowhead.com/classic/item=3666/gooey-spider-cake
# - https://www.wowhead.com/classic/item=3728/tasty-lion-steak
# - https://www.wowhead.com/classic/item=3729/soothing-turtle-bisque
# - https://www.wowhead.com/classic/item=5472/kaldorei-spider-kabob
# - https://www.wowhead.com/classic/item=5525/boiled-clams
# - https://www.wowhead.com/classic/item=5527/goblin-deviled-clams
# - https://www.wowhead.com/classic/item=12210/roast-raptor
# - https://www.wowhead.com/classic/item=12212/jungle-stew
# - https://www.wowhead.com/classic/item=13934/mightfish-steak
# - https://www.wowhead.com/classic/item=16971/clamlette-surprise
# - https://www.wowhead.com/classic/item=17222/spider-sausage

item: 724, 1017, 1082, 2070, 2684, 2687, 2888, 3220, 3663, 3664, 3665, 3666, 3728, 3729, 5472, 5525, 5527, 12210, 12212, 13934, 16971, 17222
blocked: @player{combat | swimming}
checked: @player{buff("Well Fed") | buff("Increased Stamina")}
enabled: @player{!buff("Feign Death")}
flashing: @player{buff(infer)}

# Food

# - https://www.wowhead.com/classic/item=117/tough-jerky
# - https://www.wowhead.com/classic/item=414/dalaran-sharp
# - https://www.wowhead.com/classic/item=733/westfall-stew
# - https://www.wowhead.com/classic/item=1113/conjured-bread
# - https://www.wowhead.com/classic/item=1114/conjured-rye
# - https://www.wowhead.com/classic/item=1487/conjured-pumpernickel
# - https://www.wowhead.com/classic/item=2287/haunch-of-meat
# - https://www.wowhead.com/classic/item=2679/charred-wolf-meat
# - https://www.wowhead.com/classic/item=2681/roasted-boar-meat
# - https://www.wowhead.com/classic/item=3770/mutton-chop
# - https://www.wowhead.com/classic/item=3771/wild-hog-shank
# - https://www.wowhead.com/classic/item=4538/snapvine-watermelon
# - https://www.wowhead.com/classic/item=4541/freshly-baked-bread
# - https://www.wowhead.com/classic/item=4542/moist-cornbread
# - https://www.wowhead.com/classic/item=4544/mulgore-spice-bread
# - https://www.wowhead.com/classic/item=4593/bristle-whisker-catfish
# - https://www.wowhead.com/classic/item=4599/cured-ham-steak
# - https://www.wowhead.com/classic/item=4601/soft-banana-bread
# - https://www.wowhead.com/classic/item=5349/conjured-muffin
# - https://www.wowhead.com/classic/item=8950/homemade-cherry-pie
# - https://www.wowhead.com/classic/item=8952/roasted-quail
# - https://www.wowhead.com/classic/item=16766/undermine-clam-chowder
# - https://www.wowhead.com/classic/item=17119/deeprun-rat-kabob

item: 117, 414, 733, 1113, 1114, 1487, 2287, 2679, 2681, 3770, 3771, 4538, 4541, 4542, 4544, 4593, 4599, 4601, 5349, 8950, 8952, 16766, 17119
blocked: @player{combat | swimming}
checked: @player{health(100%)}
enabled: @player{!buff("Feign Death")}
flashing: @player{buff(infer)}

# Healing Potion

# - https://www.wowhead.com/classic/item=118/minor-healing-potion
# - https://www.wowhead.com/classic/item=858/lesser-healing-potion
# - https://www.wowhead.com/classic/item=929/healing-potion
# - https://www.wowhead.com/classic/item=1710/greater-healing-potion
# - https://www.wowhead.com/classic/item=3928/superior-healing-potion
# - https://www.wowhead.com/classic/item=13446/major-healing-potion

item: 118, 858, 929, 1710, 3928, 13446
checked: @player{health(100%)}
enabled: @player{!buff("Feign Death")}
glowing: @player{health(<30%)}

# Healthstone

# - https://www.wowhead.com/classic/item=5512/minor-healthstone
# - https://www.wowhead.com/classic/item=19005/minor-healthstone

item: 5512, 19005
checked: @player{health(100%)}
enabled: @player{!buff("Feign Death")}
glowing: @player{health(<30%)}

# Jungle Remedy

# - https://www.wowhead.com/classic/item=2633/jungle-remedy

item: 2633
checked: @player{!diseased & !poisoned}
glowing: @player{always}

# Light of Elune

# - https://www.wowhead.com/classic/item=5816/light-of-elune

item: 5816
checked: @player{buff(infer)}
glowing: @player{health(<20%)}

# Limited Invulnerability Potion

# - https://www.wowhead.com/classic/item=3387/limited-invulnerability-potion

item: 3387
checked: @player{buff(infer)}
glowing: @player{falling(>1s)}

# Mana Potion

# - https://www.wowhead.com/classic/item=2455/minor-mana-potion
# - https://www.wowhead.com/classic/item=3385/lesser-mana-potion
# - https://www.wowhead.com/classic/item=3827/mana-potion
# - https://www.wowhead.com/classic/item=6149/greater-mana-potion
# - https://www.wowhead.com/classic/item=13443/superior-mana-potion

item: 2455, 3385, 3827, 6149, 13443
checked: @player{mana(100%)}
enabled: @player{!buff("Feign Death")}

# Mana Stone

# - https://www.wowhead.com/classic/item=5514/mana-agate

item: 5514
checked: @player{mana(100%)}

# Moist Towelette

# - https://www.wowhead.com/classic/item=5951/moist-towelette

item: 5951
checked: @player{!magicDebuff}
glowing: @player{always}

# Mount

# - https://www.wowhead.com/classic/item=2411/black-stallion-bridle
# - https://www.wowhead.com/classic/item=8631/reins-of-the-striped-frostsaber

item: 2411, 8631
blocked: @player{indoors | swimming}
checked: @player{buff(infer)}

# Potion

# - https://www.wowhead.com/classic/item=2459/swiftness-potion
# - https://www.wowhead.com/classic/item=3382/weak-trolls-blood-potion
# - https://www.wowhead.com/classic/item=3388/strong-trolls-blood-potion
# - https://www.wowhead.com/classic/item=3826/mighty-trolls-blood-potion
# - https://www.wowhead.com/classic/item=5634/free-action-potion
# - https://www.wowhead.com/classic/item=6372/swim-speed-potion
# - https://www.wowhead.com/classic/item=13457/greater-fire-protection-potion

item: 2459, 3382, 3388, 3826, 5634, 6372, 13457
checked: @player{buff(infer)}

# Purification Potion

# - https://www.wowhead.com/classic/item=13462/purification-potion

item: 13462
checked: @player{!cursed & !diseased & !poisoned}

# Rage Potion

# - https://www.wowhead.com/classic/item=5631/rage-potion
# - https://www.wowhead.com/classic/item=5633/great-rage-potion
# - https://www.wowhead.com/classic/item=13442/mighty-rage-potion

item: 5631, 5633, 13442
enabled: @player{combat & rage(<30)}

# Restorative Potion

# - https://www.wowhead.com/classic/item=9030/restorative-potion

item: 9030
checked: @player{buff(infer) | (!cursed & !diseased & !magicDebuff & !poisoned)}

# Thistle Tea

# - https://www.wowhead.com/classic/item=7676/thistle-tea

item: 7676
checked: @player{energy(100)}
enabled: @player{combat & rage(<50)}

# Water

# - https://www.wowhead.com/classic/item=159/refreshing-spring-water
# - https://www.wowhead.com/classic/item=1179/ice-cold-milk
# - https://www.wowhead.com/classic/item=1205/melon-juice
# - https://www.wowhead.com/classic/item=1645/moonberry-juice
# - https://www.wowhead.com/classic/item=1708/sweet-nectar
# - https://www.wowhead.com/classic/item=2136/conjured-purified-water
# - https://www.wowhead.com/classic/item=2288/conjured-fresh-water
# - https://www.wowhead.com/classic/item=3772/conjured-spring-water
# - https://www.wowhead.com/classic/item=5350/conjured-water
# - https://www.wowhead.com/classic/item=8766/morning-glory-dew

item: 159, 1179, 1205, 1645, 1708, 2136, 2288, 3772, 5350, 8766
blocked: @player{combat | swimming}
checked: @player{mana(100%)}
enabled: @player{!buff("Feign Death")}
flashing: @player{buff(infer)}
