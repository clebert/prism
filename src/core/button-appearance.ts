import type { ButtonBehaviorMap } from "../dsl/button-behavior";
import type { Action } from "./action";
import { createCustomButtonState } from "./custom-button-state";
import { createDefaultButtonState } from "./default-button-state";

export type ButtonAppearance = DisabledButtonAppearance | EnabledButtonAppearance;

export interface DisabledButtonAppearance {
  readonly enabled: false;
  readonly checked: boolean;
  readonly color: "blue" | "red" | "violet" | undefined;
}

export interface EnabledButtonAppearance {
  readonly enabled: true;
  readonly effect: "flashing" | "glowing" | undefined;
}

export function createButtonAppearance(
  buttonBehaviors: ButtonBehaviorMap,
  action: Action,
): ButtonAppearance {
  const defaultButtonState = createDefaultButtonState(action);
  const customButtonState = createCustomButtonState(buttonBehaviors, action);

  const blocked = (defaultButtonState.blocked || customButtonState?.blocked) ?? false;
  const depleted = (defaultButtonState.depleted || customButtonState?.depleted) ?? false;
  const checked = (defaultButtonState.checked || customButtonState?.checked) ?? false;

  if (blocked || depleted || checked || !defaultButtonState.enabled) {
    return {
      checked,
      color: blocked && depleted ? "violet" : blocked ? "red" : depleted ? "blue" : undefined,
      enabled: false,
    };
  }

  if (!customButtonState) {
    return { effect: undefined, enabled: true };
  }

  if (!customButtonState.enabled) {
    return { checked: false, color: undefined, enabled: false };
  }

  return {
    effect: customButtonState.flashing
      ? "flashing"
      : customButtonState.glowing
        ? "glowing"
        : undefined,

    enabled: true,
  };
}
