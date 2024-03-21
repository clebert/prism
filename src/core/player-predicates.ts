import type { PlayerPredicates } from "../dsl/predicate-registry";
import { getDruidFormIndex } from "../utils/get-druid-form-index";
import { getDruidFormManaCost } from "../utils/get-druid-form-mana-cost";
import { getFallingDuration } from "../utils/get-falling-duration";
import { getRunningDuration } from "../utils/get-running-duration";
import { getSpellManaCost } from "../utils/get-spell-mana-cost";
import { getTalentRank } from "../utils/get-talent-rank";
import { isRunning } from "../utils/is-running";
import { getAuraState } from "./aura-state";

export const playerPredicates: PlayerPredicates = {
  ammo(amount): boolean {
    const ammoItemId = GetInventoryItemID("player", 0);
    const ammoCount = ammoItemId !== undefined ? GetItemCount(ammoItemId) : 0;

    return amount?.(ammoCount) ?? ammoCount > 0;
  },

  autoShooting(): boolean {
    return IsAutoRepeatSpell(75); // https://www.wowhead.com/classic/spell=75/auto-shot
  },

  canShiftBackFrom(actionSlotId, target): boolean {
    const targetIndex = getDruidFormIndex(target);

    if (targetIndex === undefined) {
      return false;
    }

    const currentIndex = GetShapeshiftForm();
    const currentMana = UnitPower("player", Enum.PowerType.Mana);

    let actionManaCost = 0;

    const [actionType, actionId] = GetActionInfo(actionSlotId);

    if (actionType === "spell") {
      actionManaCost = getSpellManaCost(actionId);
    } else if (actionType === "macro") {
      const spellId = GetMacroSpell(actionId);

      if (spellId !== undefined) {
        actionManaCost = getSpellManaCost(spellId);
      }
    }

    if (currentIndex === targetIndex) {
      return currentMana >= actionManaCost;
    }

    const roundTripManaCost =
      getDruidFormManaCost(targetIndex) + actionManaCost + getDruidFormManaCost(currentIndex);

    return currentMana >= roundTripManaCost;
  },

  canShiftInto(actionSlotId, target): boolean {
    const targetIndex = getDruidFormIndex(target);

    if (targetIndex === undefined) {
      return false;
    }

    const currentIndex = GetShapeshiftForm();
    const currentMana = UnitPower("player", Enum.PowerType.Mana);

    let actionManaCost = 0;

    const [actionType, actionId] = GetActionInfo(actionSlotId);

    if (actionType === "spell") {
      actionManaCost = getSpellManaCost(actionId);
    } else if (actionType === "macro") {
      const spellId = GetMacroSpell(actionId);

      if (spellId !== undefined) {
        actionManaCost = getSpellManaCost(spellId);
      }
    }

    if (currentIndex === targetIndex) {
      return currentMana >= actionManaCost;
    }

    const oneWayManaCost = getDruidFormManaCost(targetIndex) + actionManaCost;

    return currentMana >= oneWayManaCost;
  },

  druidForm(target): boolean {
    const targetIndex = getDruidFormIndex(target);

    if (targetIndex === undefined) {
      return false;
    }

    return GetShapeshiftForm() === targetIndex;
  },

  equipped(type): boolean {
    if (type === "meleeWeapon") {
      const mainHandItemId = GetInventoryItemID("player", 16);

      if (mainHandItemId === undefined) {
        return false;
      }

      const [, , , , , , , , , , , classId] = GetItemInfo(mainHandItemId);

      if (classId !== 2) {
        return false;
      }

      const auraState = getAuraState("player");

      const isDiarmed =
        // https://www.wowhead.com/classic/spell=676/disarm
        auraState.debuffs.has(676) ||
        // https://www.wowhead.com/classic/spell=6713/disarm
        auraState.debuffs.has(6713) ||
        // https://www.wowhead.com/classic/spell=8379/disarm
        auraState.debuffs.has(8379) ||
        // https://www.wowhead.com/classic/spell=22691/disarm
        auraState.debuffs.has(22691) ||
        // https://www.wowhead.com/classic/spell=27581/disarm
        auraState.debuffs.has(27581);

      return !isDiarmed;
    }

    return IsEquippedItemType(type);
  },

  falling(duration): boolean {
    return duration ? duration({ type: "duration", value: getFallingDuration() }) : IsFalling();
  },

  form(number): boolean {
    return number(GetShapeshiftForm());
  },

  grouped(): boolean {
    return IsInGroup();
  },

  indoors(): boolean {
    return IsIndoors();
  },

  itemCount(itemId, amount): boolean {
    return amount(GetItemCount(itemId));
  },

  meleeAttacking(): boolean {
    return IsCurrentSpell(6603); // https://www.wowhead.com/classic/spell=6603/attack
  },

  mounted(): boolean {
    return IsMounted();
  },

  outdoors(): boolean {
    return IsOutdoors();
  },

  rageSafe(): boolean {
    const rank = getTalentRank("Tactical Mastery");
    const rage = UnitPower("player", Enum.PowerType.Rage);

    return rage <= rank * 5;
  },

  resting(): boolean {
    return IsResting();
  },

  running(duration): boolean {
    return duration ? duration({ type: "duration", value: getRunningDuration() }) : isRunning();
  },

  stance(number): boolean {
    return number(GetShapeshiftForm());
  },

  stealthed(): boolean {
    return IsStealthed();
  },

  submerged(): boolean {
    return IsSubmerged();
  },

  swimming(): boolean {
    return IsSwimming();
  },

  talent(talentName, rank): boolean {
    if (
      talentName !== "Improved Mend Pet" &&
      talentName !== "Improved Overpower" &&
      talentName !== "Tactical Mastery"
    ) {
      return false;
    }

    const currentRank = getTalentRank(
      talentName as "Improved Mend Pet" | "Improved Overpower" | "Tactical Mastery",
    );

    return rank?.(currentRank) ?? currentRank > 0;
  },

  usable(actionSlotId): boolean {
    const [isUsable] = IsUsableAction(actionSlotId);

    return isUsable;
  },
};
