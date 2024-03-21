// https://wowpedia.fandom.com/wiki/API_ActionHasRange
declare function ActionHasRange(actionSlotId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_CombatLogGetCurrentEventInfo
declare function CombatLogGetCurrentEventInfo(): LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;

// https://wowpedia.fandom.com/wiki/API_CreateFrame
declare function CreateFrame<TType extends "Button" | "EditBox" | "Frame" | "ScrollFrame" | "Slider">(
  frameType: TType,
  name?: string,
  parent?: UiObject.Frame,
  template?: string,
  id?: number,
): TType extends "Button"
  ? UiObject.Button
  : TType extends "EditBox"
    ? UiObject.EditBox
    : TType extends "ScrollFrame"
      ? UiObject.ScrollFrame
      : TType extends "Slider"
        ? UiObject.Slider
        : UiObject.Frame;

// https://wowpedia.fandom.com/wiki/API_GetActionBarPage
declare function GetActionBarPage(): number;

// https://wowpedia.fandom.com/wiki/API_GetActionCooldown
declare function GetActionCooldown(actionSlotId: number): LuaMultiReturn<[startTime: number, duration: number, enable: number, modRate: number]>;

// https://wowpedia.fandom.com/wiki/API_GetActionCount
declare function GetActionCount(actionSlotId: number): number;

// https://wowpedia.fandom.com/wiki/API_GetActionInfo
declare function GetActionInfo(actionSlotId: number): LuaMultiReturn<[actionType: string | undefined, actionId: number]>;

// https://wowpedia.fandom.com/wiki/API_GetComboPoints
declare function GetComboPoints(unitId: string, targetUnitId: string): number;

// https://wowpedia.fandom.com/wiki/API_GetCursorPosition
declare function GetCursorPosition(): LuaMultiReturn<[x: number, y: number]>;

// https://wowpedia.fandom.com/wiki/API_GetInventoryItemID
declare function GetInventoryItemID(unitId: "player", slotId: number): number | undefined;

// https://wowpedia.fandom.com/wiki/API_GetItemCooldown
declare function GetItemCooldown(itemId: number): LuaMultiReturn<[startTime: number, duration: number, enable: number]>;

// https://wowpedia.fandom.com/wiki/API_GetItemCount
declare function GetItemCount(itemIdOrName: number | string): number;

// https://wowpedia.fandom.com/wiki/API_GetItemIcon
declare function GetItemIcon(itemId: number): number;

// https://wowpedia.fandom.com/wiki/API_GetItemInfoInstant
declare function GetItemInfoInstant(itemIdOrName: number | string): LuaMultiReturn<[itemId: number | undefined]>;

// https://wowpedia.fandom.com/wiki/API_GetItemInfo
declare function GetItemInfo(
  itemIdOrName: number | string,
): LuaMultiReturn<
  [
    itemName: string | undefined,
    itemLink: string,
    itemQuality: number,
    itemLevel: number,
    itemMinLevel: number,
    itemType: string,
    itemSubType: string,
    itemStackCount: number,
    itemEquipLoc: string,
    iconTexture: string,
    sellPrice: number,
    classId: number,
    subClassId: number,
    bindType: number,
    expacId: number,
    setId: number,
    isCraftingReagent: boolean,
  ]
>;

// https://wowpedia.fandom.com/wiki/API_GetItemSpell
declare function GetItemSpell(itemIdOrName: number | string): LuaMultiReturn<[spellName: string | undefined, spellId: number | undefined]>;

// https://wowpedia.fandom.com/wiki/API_GetMacroInfo
declare function GetMacroInfo(macroSlotId: number): LuaMultiReturn<[macroName: string | undefined, iconTexture: number, body: string]>;

// https://warcraft.wiki.gg/wiki/API_GetMacroItem
declare function GetMacroItem(macroSlotId: number): LuaMultiReturn<[itemName: string | undefined, itemLink: string]>;

// https://wowpedia.fandom.com/wiki/API_GetMacroSpell
declare function GetMacroSpell(macroSlotId: number): number | undefined;

// https://wowpedia.fandom.com/wiki/API_GetMirrorTimerInfo
declare function GetMirrorTimerInfo(id: number): LuaMultiReturn<[timerType: string, initialValue: number, maxValue: number, scale: number, paused: boolean, label: string]>;

// https://warcraft.wiki.gg/wiki/API_GetMouseFoci
declare function GetMouseFoci(): UiObject.ScriptRegion;

// https://wowpedia.fandom.com/wiki/API_GetMouseFocus
declare function GetMouseFocus(): UiObject.Frame;

// https://wowpedia.fandom.com/wiki/API_GetNumGroupMembers
declare function GetNumGroupMembers(): number;

// https://wowpedia.fandom.com/wiki/API_GetNumShapeshiftForms
declare function GetNumShapeshiftForms(): number;

// https://wowpedia.fandom.com/wiki/API_GetNumTalents
declare function GetNumTalents(tabIndex: number): number;

// https://wowpedia.fandom.com/wiki/API_GetPetHappiness
declare function GetPetHappiness(): number | undefined;

// https://warcraft.wiki.gg/wiki/API_GetPowerRegenForPowerType
declare function GetPowerRegenForPowerType(powerType: number): LuaMultiReturn<[basePowerRegen: number, castingPowerRegen: number]>;

// https://wowpedia.fandom.com/wiki/API_GetScreenHeight
declare function GetScreenHeight(): number;

// https://wowpedia.fandom.com/wiki/API_GetScreenWidth
declare function GetScreenWidth(): number;

// https://wowpedia.fandom.com/wiki/API_GetShapeshiftForm
declare function GetShapeshiftForm(flag?: boolean): number;

// https://wowpedia.fandom.com/wiki/API_GetShapeshiftFormInfo
declare function GetShapeshiftFormInfo(index: number): LuaMultiReturn<[icon: string, active: boolean, castable: boolean, spellId: number]>;

// https://wowpedia.fandom.com/wiki/API_GetSpellCooldown
declare function GetSpellCooldown(spellId: number): LuaMultiReturn<[startTime: number, duration: number, enable: number, modRate: number]>;

// https://wowpedia.fandom.com/wiki/API_GetSpellInfo
declare function GetSpellInfo(
  spellIdOrName: number | string,
): LuaMultiReturn<[spellName: string | undefined, rank: undefined, iconTexture: number, castTime: number, minRange: number, maxRange: number, spellId: number, originalIconTexture: number]>;

// https://wowpedia.fandom.com/wiki/API_GetSpellPowerCost
declare function GetSpellPowerCost(spellId: number): readonly { readonly type: number; readonly cost: number; readonly minCost: number }[] | undefined;

// https://wowpedia.fandom.com/wiki/API_GetSpellTexture
declare function GetSpellTexture(spellIdOrName: number | string): number | undefined;

// https://wowpedia.fandom.com/wiki/API_GetTalentInfo/Classic
declare function GetTalentInfo(
  tabIndex: number,
  talentIndex: number,
): LuaMultiReturn<[talentName: string | undefined, iconTexture: number, tier: number, column: number, rank: number, maxRank: number]>;

// https://wowpedia.fandom.com/wiki/API_GetTimePreciseSec
declare function GetTimePreciseSec(): number;

// https://wowpedia.fandom.com/wiki/API_GetTime
declare function GetTime(): number;

// https://wowpedia.fandom.com/wiki/API_GetUnitSpeed
declare function GetUnitSpeed(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_GetWeaponEnchantInfo
declare function GetWeaponEnchantInfo(): LuaMultiReturn<
  [
    hasMainHandEnchant: boolean,
    mainHandExpiration: number,
    mainHandCharges: number,
    mainHandEnchantId: number,
    hasOffHandEnchant: boolean,
    offHandExpiration: number,
    offHandCharges: number,
    offHandEnchantId: number,
  ]
>;

// https://wowpedia.fandom.com/wiki/API_InCombatLockdown
declare function InCombatLockdown(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsActionInRange
declare function IsActionInRange(actionSlotId: number): boolean | undefined;

// https://wowpedia.fandom.com/wiki/API_IsAltKeyDown
declare function IsAltKeyDown(): boolean;

// https://warcraft.wiki.gg/wiki/API_IsAttackAction
declare function IsAttackAction(actionSlotId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_IsAutoRepeatAction
declare function IsAutoRepeatAction(actionSlotId: number): boolean;

// https://warcraft.wiki.gg/wiki/API_C_Spell.IsAutoRepeatSpell
declare function IsAutoRepeatSpell(spellId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_IsConsumableAction
declare function IsConsumableAction(actionSlotId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_IsCurrentAction
declare function IsCurrentAction(actionSlotId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_IsCurrentSpell
declare function IsCurrentSpell(spellId: number): boolean;

// https://wowpedia.fandom.com/wiki/API_IsEquippedItemType
declare function IsEquippedItemType(itemType: string): boolean;

// https://wowpedia.fandom.com/wiki/API_IsFalling
declare function IsFalling(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsInGroup
declare function IsInGroup(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsInInstance
declare function IsInInstance(): LuaMultiReturn<[inInstance: boolean, instanceType: string]>;

// https://wowpedia.fandom.com/wiki/API_IsInRaid
declare function IsInRaid(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsIndoors
declare function IsIndoors(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsItemInRange
declare function IsItemInRange(itemId: number, unitId: string): boolean | undefined;

// https://wowpedia.fandom.com/wiki/API_IsModifiedClick
declare function IsModifiedClick(string: "FOCUSCAST" | "SELFCAST"): boolean;

// https://wowpedia.fandom.com/wiki/API_IsMounted
declare function IsMounted(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsOutdoors
declare function IsOutdoors(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsResting
declare function IsResting(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsSpellInRange
declare function IsSpellInRange(spellName: string, unitId: string): number | undefined;

// https://wowpedia.fandom.com/wiki/API_IsSpellKnown
declare function IsSpellKnown(spellId: number, isPetSpell?: boolean): boolean;

// https://wowpedia.fandom.com/wiki/API_IsStealthed
declare function IsStealthed(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsSubmerged
declare function IsSubmerged(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsSwimming
declare function IsSwimming(): boolean;

// https://wowpedia.fandom.com/wiki/API_IsUsableAction
declare function IsUsableAction(actionSlotId: number): LuaMultiReturn<[isUsable: boolean, notEnoughPower: boolean]>;

// https://wowprogramming.com/docs/api/IsUsableItem.html
declare function IsUsableItem(itemId: number): LuaMultiReturn<[isUsable: boolean, notEnoughPower: boolean]>;

// https://wowpedia.fandom.com/wiki/API_IsUsableSpell
declare function IsUsableSpell(spellIdOrName: number | string): LuaMultiReturn<[isUsable: boolean, notEnoughPower: boolean]>;

// https://wowpedia.fandom.com/wiki/API_UnitAffectingCombat
declare function UnitAffectingCombat(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitAura
declare function UnitAura(
  unitId: string,
  index: number,
  filter?: "HELPFUL" | "HARMFUL",
): LuaMultiReturn<
  [
    auraName: string | undefined,
    iconTexture: number,
    count: number,
    dispelType: "Curse" | "Disease" | "Magic" | "Poison" | undefined,
    duration: number,
    expirationTime: number | undefined,
    sourceUnitId: string,
    isStealable: boolean,
    nameplateShowPersonal: boolean,
    spellId: number,
  ]
>;

// https://wowpedia.fandom.com/wiki/API_UnitCanAssist
declare function UnitCanAssist(unitToAssist: string, unitToBeAssisted: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitCanAttack
declare function UnitCanAttack(attacker: string, targetUnitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitCastingInfo
declare function UnitCastingInfo(unitId: string): string | undefined;

// https://wowpedia.fandom.com/wiki/API_UnitChannelInfo
declare function UnitChannelInfo(unitId: string): string | undefined;

// https://wowpedia.fandom.com/wiki/API_UnitClass
declare function UnitClass(
  unitId: string,
): LuaMultiReturn<[className: string, classFilename: "DRUID" | "HUNTER" | "MAGE" | "PALADIN" | "PRIEST" | "ROGUE" | "SHAMAN" | "WARLOCK" | "WARRIOR", classId: number]>;

// https://wowpedia.fandom.com/wiki/API_UnitClassification
declare function UnitClassification(unitId: string): "elite" | "minus" | "normal" | "rare" | "rareelite" | "trivial" | "worldboss";

// https://wowpedia.fandom.com/wiki/API_UnitCreatureFamily
declare function UnitCreatureFamily(unitId: string): string | undefined;

// https://wowpedia.fandom.com/wiki/API_UnitCreatureType
declare function UnitCreatureType(unitId: string): "Beast" | "Critter" | "Demon" | "Dragonkin" | "Elemental" | "Giant" | "Humanoid" | "Mechanical" | "Totem" | "Undead" | undefined;

// https://wowpedia.fandom.com/wiki/API_UnitDetailedThreatSituation
declare function UnitDetailedThreatSituation(
  unitId: string,
  mobUnitId: string,
): LuaMultiReturn<[isTanking: boolean, status: number | undefined, scaledPercentage: number, rawPercentage: number, threatValue: number]>;

// https://wowpedia.fandom.com/wiki/API_UnitExists
declare function UnitExists(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitGUID
declare function UnitGUID(unitId: string): string | undefined;

// https://wowpedia.fandom.com/wiki/API_UnitHealth
declare function UnitHealth(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_UnitHealthMax
declare function UnitHealthMax(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_UnitInParty
declare function UnitInParty(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitInRaid
declare function UnitInRaid(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsDead
declare function UnitIsDead(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsDeadOrGhost
declare function UnitIsDeadOrGhost(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsEnemy
declare function UnitIsEnemy(unitId1: string, unitId2: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsFriend
declare function UnitIsFriend(unitId1: string, unitId2: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsPlayer
declare function UnitIsPlayer(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsTrivial
declare function UnitIsTrivial(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitIsUnit
declare function UnitIsUnit(unitId1: string, unitId2: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitLevel
declare function UnitLevel(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_UnitOnTaxi
declare function UnitOnTaxi(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitPlayerOrPetInRaid
declare function UnitPlayerOrPetInRaid(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitPlayerOrPetInParty
declare function UnitPlayerOrPetInParty(unitId: string): boolean;

// https://wowpedia.fandom.com/wiki/API_UnitPower
declare function UnitPower(unitId: string, powerType: number): number;

// https://wowpedia.fandom.com/wiki/API_UnitPowerMax
declare function UnitPowerMax(unitId: string, powerType: number): number;

// https://wowpedia.fandom.com/wiki/API_UnitPowerType
declare function UnitPowerType(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_UnitRangedDamage
declare function UnitRangedDamage(unitId: string): number;

// https://wowpedia.fandom.com/wiki/API_UnitXP
declare function UnitXP(unitId: "player"): number;

// https://wowpedia.fandom.com/wiki/API_UnitXPMax
declare function UnitXPMax(unitId: "player"): number;
