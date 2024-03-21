import type { ButtonBehaviorMap } from "../dsl/button-behavior";
import type { RuleFunctionContext } from "../dsl/rule-function";
import type { Action } from "./action";

export interface CustomButtonState {
  readonly blocked: boolean;
  readonly checked: boolean;
  readonly depleted: boolean;
  readonly enabled: boolean;
  readonly flashing: boolean;
  readonly glowing: boolean;
}

export function createCustomButtonState(
  buttonBehaviors: ButtonBehaviorMap,
  action: Action,
): CustomButtonState | undefined {
  const { actionSlotId } = action;

  const buttonBehavior = buttonBehaviors.get(
    action.type === "spell" ? action.spellName : action.itemId,
  );

  if (!buttonBehavior) {
    return;
  }

  const context: RuleFunctionContext = {
    actionSlotId,
    spellName: action.type === "item" ? action.itemSpellName : action.spellName,
  };

  return {
    blocked: buttonBehavior.blocked?.(context) ?? false,
    checked: buttonBehavior.checked?.(context) ?? false,
    depleted: buttonBehavior.depleted?.(context) ?? false,
    enabled: buttonBehavior.enabled?.(context) ?? true,
    flashing: buttonBehavior.flashing?.(context) ?? false,
    glowing: buttonBehavior.glowing?.(context) ?? false,
  };
}
