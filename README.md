# Prism

A World of Warcraft Classic addon that makes action buttons visually respond to gameplay situations.

Optimal play requires tracking cooldowns, resources, buffs, debuffs, and enemy casts simultaneously - mental overhead that pulls attention away from positioning and split-second decisions. Prism moves that tracking to your peripheral vision: buttons glow when abilities should be used, turn red when blocked, or show a golden border when already active.

All action buttons benefit from automatic visual feedback (range, resources, cooldowns) without any configuration. Custom rules let you add ability-specific logic on top.

## Installation

1. Download Prism from [CurseForge](https://www.curseforge.com/wow/addons/prism) (link coming soon)
2. Extract to your `World of Warcraft/_classic_/Interface/AddOns/` folder
3. Restart WoW or type `/reload` if already in-game

To configure Prism in-game, type `/prism` to open the configuration window.

## Example

Here's a practical example - configuring the Druid's Growl ability with a macro that automatically shifts into bear form:

```
#showtooltip Growl
/cast [noform:1] Bear Form
/cast Growl
/startattack
```

```dsl
spell: "Growl"
blocked: @player{!canShiftInto(bear)} | @target{dead | !harm}
checked: @target{ownDebuff(infer) | targeting(@player)}
enabled: @target{!casting}
flashing: @player{!canShiftBackFrom(bear)}
glowing: @player{combat & grouped & druidForm(bear)}
```

This makes Growl:

- **Red** when lacking mana to shift into bear form or target is dead/friendly/missing
- **Golden border** when Growl debuff is active or target is already attacking the player
- **Grayed out** when target is casting
- **Flashing** when lacking mana to shift back from bear form after using Growl
- **Glowing** during combat when in a group

## State Hierarchy and Rules

The visual state system follows a strict hierarchy:

1. **Default state** - buttons are enabled by default unless a rule explicitly disables them
2. **Cascading effect** - if an ability is blocked, depleted, or checked, it becomes disabled and cannot glow or flash
3. **Precedence** - default rules always win - if the game determines that an ability is blocked, depleted, or checked, custom rules cannot override this

### Default Behavior

Even without custom rules, Prism applies these defaults to all action buttons based on game mechanics:

- **Out of range** → Blocked (red, disabled)
- **On taxi/flight path** → Blocked (red, disabled)
- **Out of mana/rage/energy** → Depleted (blue, disabled)
- **Currently casting/channeling** → Checked (golden border, disabled)
- **Auto-repeating actions** → Checked (e.g., Attack, Auto Shot, Shoot)
- **On cooldown** → Disabled (grayed out, but only for cooldowns longer than the global cooldown)

**Note on cooldowns**: Abilities on cooldown are automatically disabled and grayed out, but only when the cooldown is longer than the global cooldown (1.5s). This preserves visual states (glowing, flashing) during the GCD so important cues aren't lost when global cooldown activates.

**Combined states**: When an ability is both blocked and depleted, the overlays combine to show purple (red + blue), giving immediate visual feedback about multiple issues.

### Understanding Cascading Effects

The cascading system prevents conflicting visual states:

1. **Disabled states** (blocked, depleted, checked) prevent flashing and glowing
2. **Flashing takes priority** over glowing when both conditions are met

For example, with Aspect of the Hawk:

```dsl
spell: "Aspect of the Hawk"
checked: @player{buff(infer)}     # Shows golden border when buff is active
glowing: @player{autoShooting}    # Glows when auto-shooting
```

One might think `glowing: @player{autoShooting & !buff(infer)}` is needed to prevent glowing when the buff is already active. But that's unnecessary! When `checked` is true (buff is active), the button becomes disabled and cannot glow anyway. The cascading effect handles this automatically, making configurations cleaner and easier to write.

## DSL Basics

The Prism configuration language is built around a simple pattern: defining **rules** that evaluate **predicates** within **scopes** to control how action buttons appear.

### Quick Terminology

- **Predicate** - the atomic check: `combat`
- **Condition** - combine predicates with logic: `combat & health(<20%)`
- **Scope** - evaluate conditions on specific units: `@player{combat}`
- **Rule** - combine scopes to control visual states: `@player{combat} & @pet{dead}`

### Spell Configuration

Each spell configuration starts with the spell name, followed by optional visual state rules:

```dsl
spell: "Aspect of the Hawk"
blocked: <rule>    # Optional
depleted: <rule>   # Optional
checked: <rule>    # Optional
enabled: <rule>    # Optional
flashing: <rule>   # Optional
glowing: <rule>    # Optional
```

Each configuration handles one spell only. **Spell names must match the game's language - use "Aspect of the Hawk" for English clients, "Aspekt des Falken" for German, etc.**

### Item Configuration

Items use their item IDs instead of names:

```dsl
# Healing Potions
item: 118, 858, 929
blocked: <rule>    # Optional
depleted: <rule>   # Optional
checked: <rule>    # Optional
enabled: <rule>    # Optional
flashing: <rule>   # Optional
glowing: <rule>    # Optional
```

Items use IDs for language compatibility (IDs work across all game languages), to handle multiple variants (many different healing potions can share one configuration), and for easier maintenance.

### Finding Item IDs

Use [Wowhead Classic](https://www.wowhead.com/classic) - the ID is in the URL:

- `https://www.wowhead.com/classic/item=118/minor-healing-potion` → ID is `118`
- `https://www.wowhead.com/classic/item=858/lesser-healing-potion` → ID is `858`
- `https://www.wowhead.com/classic/item=929/healing-potion` → ID is `929`

### Minimal Configurations

Only the states that need customization need to be specified. All action buttons already benefit from Prism's default behaviors - custom rules add specific conditions on top:

```dsl
spell: "Aspect of the Beast"
checked: @player{buff(infer)}
```

This simple configuration benefits from all the default addon rules (cooldown visualization, out of range indication, missing resource alerts) while adding just one custom rule to show when the aspect is active.

### Boolean Operators

These operators combine predicates into conditions:

- `&` - AND (both must be true)
- `|` - OR (either can be true)
- `!` - NOT (inverts the result)
- `()` - parentheses for grouping

## Units

Units tell the game who to check - the player, the player's current target, the player's pet, etc.

### Unit IDs

- `@player` - the player character
- `@target` - the player's current target
- `@pet` - the player's pet (Hunter, Warlock)
- `@mouseover` - unit under the mouse cursor
- `@focus` - the player's focus target (if supported)
- `@party1` through `@party4` - party members
- `@raid1` through `@raid40` - raid members

### Unit Modifier

Units can have the `:help` modifier to enable smart targeting:

- `:help` - automatically targets yourself when holding self-cast modifier keys, when target doesn't exist, or when target can't be assisted

```dsl
# Smart targeting, e.g. for bandages and healing spells
@target:help{health(<50%)}
```

## Special Values

### infer

The `infer` keyword automatically determines the appropriate buff/debuff name:

- **Spell configurations**: Uses the spell name
- **Item configurations**: Uses the item's spell effect name

```dsl
spell: "Serpent Sting"
checked: @target{ownDebuff(infer)}  # Checks for "Serpent Sting" debuff

item: 8766  # Morning Glory Dew
checked: @player{buff(infer)}  # Checks for "Drink" buff
```

### always

The `always` predicate is unconditionally true - useful for "always glow":

```dsl
glowing: @target{always}  # Always glows when there is a hostile target
```

### Numeric Values

- **Percentages**: `50%`, `100%`
- **Durations**: `2s`, `10s`
- **Comparisons**: `>`, `<`, `>=`, `<=`

When no comparison operator is specified, values check for equality. For "not equal", omit the operator and use the `!` negation instead.

```dsl
@player{health(<30%)}        # Health below 30%
@player{health(100%)}        # Health at full
@player{!health(100%)}       # Health not full (damaged)
@target{comboPoints(>=4)}    # Target has 4 or more combo points
```

## Available Predicates

Predicates are the individual checks that evaluate to true or false. They're used within scopes to test specific properties of units.

### Universal Predicates (any unit)

#### Existence

- `alive` - unit is alive
- `dead` - unit is dead
- `existing` - unit exists
- `missing` - unit doesn't exist

```dsl
@pet{dead | missing}
```

#### Auras

- `buff(name, count?, duration?)` - unit has buff with optional stack count and remaining duration
- `ownBuff(name, count?, duration?)` - unit has buff cast by the player
- `debuff(name, count?, duration?)` - unit has debuff with optional stack count and remaining duration
- `ownDebuff(name, count?, duration?)` - unit has debuff cast by the player

```dsl
@target:help{buff(infer)}
@target{ownDebuff("Sunder Armor", 5, >5s)}
```

#### Dispellable Auras

- `cursed` - unit has curse debuff
- `diseased` - unit has disease debuff
- `magicBuff` - unit has magic buff
- `magicDebuff` - unit has magic debuff
- `poisoned` - unit has poison debuff

```dsl
@pet{!cursed & !diseased & !magicDebuff & !poisoned}
```

#### Resources

- `energy(amount)` - energy level
- `health(percentage)` - health percentage
- `mana(percentage)` - mana percentage
- `rage(amount)` - rage level

```dsl
@player{mana(<20%) | health(<30%)}
```

#### Combat State

- `attacking(@unit)` - unit has highest threat on specified unit
- `casting` - unit is casting any spell
- `combat` - unit is in combat
- `comboPoints(number)` - unit has combo points
- `targeting(@unit)` - unit is targeting specified unit
- `trivial` - unit is too low level to award experience or honor

```dsl
@target{targeting(@player) & !casting}
@target{!trivial}    # Target is worth experience/honor
```

#### Recent Actions

- `blocked` - unit blocked the last attack
- `dodged` - unit dodged the last attack
- `parried` - unit parried the last attack

```dsl
@player{dodged}
```

#### Unit Type

- `bleedable` - unit can be affected by bleed effects
- `creature(type)` - unit is specific creature type (`beast`, `critter`, `demon`, `dragonkin`, `elemental`, `giant`, `humanoid`, `mechanical`, `totem`, `undead`)
- `elite` - unit is elite, rare elite, or world boss
- `harm` - unit is hostile
- `help` - unit is friendly
- `is(@unit)` - unit is the same as specified unit
- `level(number)` - unit's level
- `npc` - unit is an NPC (not a player)
- `partyMember` - unit is in the player's party

```dsl
@target{creature(beast)}
@target{elite & level(>=59)}
```

### Player-Only Predicates (@player)

#### Movement

- `falling(duration?)` - player is falling with optional duration check
- `mounted` - player is mounted
- `running(duration?)` - player is running (7+ yd/s, excluding mounted and taxi) with optional duration check
- `swimming` - player is swimming
- `submerged` - player is underwater

```dsl
@player{falling(>2s)}
@player{running(>3s)}
```

#### Environment

- `grouped` - player is in a group
- `indoors` - player is indoors
- `outdoors` - player is outdoors
- `resting` - player is resting

```dsl
@player{outdoors & !grouped}
```

#### Equipment & Form

- `equipped(type)` - player has equipment type equipped (`dagger`, `meleeWeapon`, `shield`)
- `form(number)` - player is in specific form
- `stance(number)` - player is in specific stance
- `stealthed` - player is stealthed

```dsl
@player{stance(1) & equipped("shield")}
@player{equipped("meleeWeapon")}  # Checks if a usable melee weapon is equipped in main hand
```

#### Talents

- `talent(name, rank?)` - player has talent with optional rank check

```dsl
@player{talent("Tactical Mastery", >=2)}
```

#### Combat Actions

- `autoShooting` - player is auto-shooting
- `meleeAttacking` - player is melee attacking

```dsl
@player{autoShooting}
```

#### Resources

- `ammo(amount?)` - player has ammo with optional amount check

```dsl
@player{ammo}           # Has any ammo
@player{ammo(>200)}     # Has more than 200 ammo
@player{ammo(<50)}      # Has less than 50 ammo (warning)
```

#### Inventory

- `itemCount(itemId, amount)` - item count in player's inventory

```dsl
@player{itemCount(6265, >2)}    # Has any soul shards (Warlock)
@player{itemCount(8544, >0)}    # Has any Mageweave Bandages
```

#### Class-Specific

- `canShiftInto(target)` - player has enough mana to shift into target form and use ability (Druid)
  - `target`: druid form keyword (`aquatic`, `bear`, `cat`, `humanoid`, `moonkin`, `travel`)
  - if current form equals target form: only checks ability mana cost
  - if forms differ: checks target form cost + ability cost

- `canShiftBackFrom(target)` - player has enough mana for round-trip: shift to target form, use ability, and return to current form (Druid)
  - `target`: druid form keyword (`aquatic`, `bear`, `cat`, `humanoid`, `moonkin`, `travel`)
  - if current form equals target form: only checks ability mana cost
  - if forms differ: checks target form cost + ability cost + current form re-entry cost

- `druidForm(target)`
- `rageSafe` - player can switch stances without losing rage (Warrior)

```dsl
@player{canShiftInto(bear)}
@player{canShiftBackFrom(bear)}
@player{druidForm(bear)}
@player{rageSafe}
```

#### Ability State

- `usable(infer)` - player's inferred ability is usable

```dsl
@player{usable(infer)}
```

### Pet-Only Predicates (@pet)

#### Happiness

- `happy` - pet is happy

```dsl
@pet{!happy}
```
