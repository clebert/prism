import type { ButtonBehaviorMap } from "../dsl/button-behavior";
import { createButtonBehaviors } from "../dsl/button-behavior";
import type { Configuration } from "../dsl/parser";
import type { PredicateRegistry } from "../dsl/predicate-registry";
import { type Action, getActions } from "./action";
import { type ButtonAppearance, createButtonAppearance } from "./button-appearance";
import { petPredicates } from "./pet-predicates";
import { playerPredicates } from "./player-predicates";
import { universalPredicates } from "./universal-predicates";

export class ActionBarController {
  private readonly predicateRegistry: PredicateRegistry = {
    pet: petPredicates,
    player: playerPredicates,
    universal: universalPredicates,
  };

  private buttonBehaviors: ButtonBehaviorMap = new Map();
  private frame: UiObject.Frame | undefined;

  setConfigurations(...configurations: readonly Configuration[]): void {
    try {
      this.buttonBehaviors = createButtonBehaviors(this.predicateRegistry, ...configurations);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  start(): void {
    if (!this.frame) {
      this.frame = CreateFrame("Frame");

      this.frame.SetScript("OnUpdate", () => this.onUpdate());
    }
  }

  stop(): void {
    if (this.frame) {
      this.frame.SetScript("OnUpdate", undefined);

      this.frame = undefined;
    }
  }

  private onUpdate(): void {
    for (const action of getActions()) {
      this.updateButton(action, createButtonAppearance(this.buttonBehaviors, action));
    }
  }

  private updateButton(action: Action, buttonAppearance: ButtonAppearance): void {
    const { button } = action;

    if (buttonAppearance.enabled) {
      if (buttonAppearance.effect === "flashing") {
        if (!ActionButton_IsFlashing(button)) {
          ActionButton_StartFlash(button);
        }
      } else if (ActionButton_IsFlashing(button)) {
        ActionButton_StopFlash(button);
      }

      if (buttonAppearance.effect === "glowing") {
        ActionButton_ShowOverlayGlow(button);
      } else {
        ActionButton_HideOverlayGlow(button);
      }

      button.icon.SetVertexColor(1.0, 1.0, 1.0);
      button.SetChecked(false);
    } else {
      if (ActionButton_IsFlashing(button)) {
        ActionButton_StopFlash(button);
      }

      ActionButton_HideOverlayGlow(button);

      if (buttonAppearance.color === "blue") {
        button.icon.SetVertexColor(0.0, 0.4, 0.4);
      } else if (buttonAppearance.color === "red") {
        button.icon.SetVertexColor(0.4, 0.0, 0.0);
      } else if (buttonAppearance.color === "violet") {
        button.icon.SetVertexColor(0.4, 0.0, 0.4);
      } else {
        button.icon.SetVertexColor(0.4, 0.4, 0.4);
      }

      button.SetChecked(buttonAppearance.checked ?? false);
    }
  }
}
