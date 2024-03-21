import type { Action } from "./action";

export interface DefaultButtonState {
  readonly blocked: boolean;
  readonly depleted: boolean;
  readonly checked: boolean;
  readonly enabled: boolean;
}

const globalCooldownThreshold = 1.5;

export function createDefaultButtonState(action: Action): DefaultButtonState {
  const { actionSlotId } = action;
  const [, cooldownDuration] = GetActionCooldown(actionSlotId);

  const defaultButtonState: Record<keyof DefaultButtonState, boolean> = {
    blocked:
      UnitOnTaxi("player") ||
      (ActionHasRange(actionSlotId) && IsActionInRange(actionSlotId) === false),

    checked: IsCurrentAction(actionSlotId) || IsAutoRepeatAction(actionSlotId),
    depleted: false,
    enabled: cooldownDuration <= globalCooldownThreshold,
  };

  if (!defaultButtonState.checked) {
    if (action.type === "spell") {
      defaultButtonState.checked = IsCurrentSpell(action.spellId);
    } else if (action.itemSpellId !== undefined) {
      defaultButtonState.checked = IsCurrentSpell(action.itemSpellId);
    }
  }

  if (IsConsumableAction(actionSlotId)) {
    defaultButtonState.depleted = GetActionCount(actionSlotId) === 0;
  }

  if (!defaultButtonState.depleted) {
    defaultButtonState.depleted = !hasEnoughPower(action);
  }

  return defaultButtonState;
}

function hasEnoughPower(action: Action): boolean {
  if (action.type === "item") {
    return true;
  }

  const costs = GetSpellPowerCost(action.spellId);

  if (costs) {
    for (const cost of costs) {
      const currentPower = UnitPower("player", cost.type);

      if (currentPower < cost.minCost) {
        return false;
      }
    }
  }

  return true;
}
