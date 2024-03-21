import type { UniversalPredicates } from "../dsl/predicate-registry";
import { getPercentage } from "../utils/get-percentage";
import { hasMissed } from "../utils/has-missed";
import { isSpellcasting } from "../utils/is-spellcasting";
import { resolveUnitId } from "../utils/resolve-unit-id";
import { getAuraState } from "./aura-state";

export const universalPredicates: UniversalPredicates = {
  alive(unit): boolean {
    const unitId = resolveUnitId(unit);

    return UnitExists(unitId) && !UnitIsDeadOrGhost(unitId);
  },

  attacking(unit, targetUnitId): boolean {
    const unitId = resolveUnitId(unit);

    return UnitExists(`${unitId}target`) && UnitIsUnit(`${unitId}target`, targetUnitId);
  },

  bleedable(unit): boolean {
    const unitId = resolveUnitId(unit);
    const creatureType = UnitCreatureType(unitId);

    if (creatureType === undefined) {
      return false; // Corpse (https://www.wowhead.com/classic/npc=48/skeletal-warrior)
    }

    switch (creatureType) {
      case "Elemental":
      case "Mechanical":
      case "Undead": {
        return false;
      }
    }

    return true;
  },

  blocked(unit): boolean {
    return hasMissed(resolveUnitId(unit), "block");
  },

  buff(unit, auraName, count, duration): boolean {
    const aura = getAuraState(resolveUnitId(unit)).buffs.get(auraName);

    return (
      aura !== undefined &&
      (!count || count(aura.count)) &&
      (!duration || duration({ type: "duration", value: aura.remainingTime }))
    );
  },

  casting(unit): boolean {
    return isSpellcasting(resolveUnitId(unit));
  },

  combat(unit): boolean {
    return UnitAffectingCombat(resolveUnitId(unit));
  },

  comboPoints(unit, points): boolean {
    return points(GetComboPoints("player", resolveUnitId(unit)));
  },

  creature(unit, type): boolean {
    const creatureType = UnitCreatureType(resolveUnitId(unit));

    return creatureType ? creatureType.toLowerCase() === type : false;
  },

  cursed(unit): boolean {
    return getAuraState(resolveUnitId(unit)).isCursed;
  },

  dead(unit): boolean {
    return UnitIsDeadOrGhost(resolveUnitId(unit));
  },

  debuff(unit, auraName, count, duration): boolean {
    const aura = getAuraState(resolveUnitId(unit)).debuffs.get(auraName);

    return (
      aura !== undefined &&
      (!count || count(aura.count)) &&
      (!duration || duration({ type: "duration", value: aura.remainingTime }))
    );
  },

  diseased(unit): boolean {
    return getAuraState(resolveUnitId(unit)).isDiseased;
  },

  dodged(unit): boolean {
    return hasMissed(resolveUnitId(unit), "dodge");
  },

  elite(unit): boolean {
    switch (UnitClassification(resolveUnitId(unit))) {
      case "elite":
      case "rareelite":
      case "worldboss":
        return true;
    }

    return false;
  },

  energy(unit, amount): boolean {
    return amount(UnitPower(resolveUnitId(unit), Enum.PowerType.Energy));
  },

  existing(unit): boolean {
    return UnitExists(resolveUnitId(unit));
  },

  harm(unit): boolean {
    return UnitCanAttack("player", resolveUnitId(unit));
  },

  health(unit, percentage): boolean {
    const unitId = resolveUnitId(unit);

    return percentage({
      type: "percentage",
      value: getPercentage(UnitHealth(unitId), UnitHealthMax(unitId)),
    });
  },

  help(unit): boolean {
    return UnitCanAssist("player", resolveUnitId(unit));
  },

  is(unit, targetUnitId): boolean {
    return UnitIsUnit(resolveUnitId(unit), targetUnitId);
  },

  level(unit, level): boolean {
    return level(UnitLevel(resolveUnitId(unit)));
  },

  magicBuff(unit): boolean {
    return getAuraState(resolveUnitId(unit)).hasMagicBuff;
  },

  magicDebuff(unit): boolean {
    return getAuraState(resolveUnitId(unit)).hasMagicDebuff;
  },

  mana(unit, percentage): boolean {
    const unitId = resolveUnitId(unit);

    return percentage({
      type: "percentage",

      value: getPercentage(
        UnitPower(unitId, Enum.PowerType.Mana),
        UnitPowerMax(unitId, Enum.PowerType.Mana),
      ),
    });
  },

  missing(unit): boolean {
    return !UnitExists(resolveUnitId(unit));
  },

  npc(unit): boolean {
    const unitId = resolveUnitId(unit);

    return UnitExists(unitId) && !UnitIsPlayer(unitId);
  },

  ownBuff(unit, auraName, count, duration): boolean {
    const aura = getAuraState(resolveUnitId(unit)).ownBuffs.get(auraName);

    return (
      aura !== undefined &&
      (!count || count(aura.count)) &&
      (!duration || duration({ type: "duration", value: aura.remainingTime }))
    );
  },

  ownDebuff(unit, auraName, count, duration): boolean {
    const aura = getAuraState(resolveUnitId(unit)).ownDebuffs.get(auraName);

    return (
      aura !== undefined &&
      (!count || count(aura.count)) &&
      (!duration || duration({ type: "duration", value: aura.remainingTime }))
    );
  },

  parried(unit): boolean {
    return hasMissed(resolveUnitId(unit), "parry");
  },

  partyMember(unit): boolean {
    return UnitInParty(resolveUnitId(unit));
  },

  poisoned(unit): boolean {
    return getAuraState(resolveUnitId(unit)).isPoisoned;
  },

  rage(unit, amount): boolean {
    return amount(UnitPower(resolveUnitId(unit), Enum.PowerType.Rage));
  },

  targeting(unit, targetUnitId): boolean {
    const unitId = resolveUnitId(unit);

    return UnitExists(`${unitId}target`) && UnitIsUnit(`${unitId}target`, targetUnitId);
  },

  trivial(unit): boolean {
    return UnitIsTrivial(resolveUnitId(unit));
  },
};
