import { getVisibleActionButtons } from "./action-buttons";
import { beginOverlayUpdate, endOverlayUpdate } from "./button-overlay";
import { applySelfBuffRule } from "./self-buff-rule";

export function startActionBarController(): void {
  const frame = CreateFrame("Frame");

  frame.SetScript("OnUpdate", () => {
    beginOverlayUpdate();

    for (const actionButton of getVisibleActionButtons()) {
      applySelfBuffRule(actionButton.button, actionButton.spellId);
    }

    endOverlayUpdate();
  });
}
