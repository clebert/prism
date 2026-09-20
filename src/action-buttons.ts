const buttonNamePrefixes = [
  "ActionButton",
  "MultiBarBottomLeftButton",
  "MultiBarBottomRightButton",
  "MultiBarRightButton",
  "MultiBarLeftButton",
  "MultiBar5Button",
  "MultiBar6Button",
  "MultiBar7Button",
] as const;

const buttonsPerBar = 12;

export interface VisibleActionButton {
  readonly button: ActionButton;
  readonly spellId: number | undefined;
}

let cache: { readonly buttons: readonly VisibleActionButton[]; readonly time: number } | undefined;

export function getVisibleActionButtons(): readonly VisibleActionButton[] {
  const time = GetTime();
  const cached = cache;

  if (cached !== undefined && cached.time === time) {
    return cached.buttons;
  }

  const buttons: VisibleActionButton[] = [];

  for (const prefix of buttonNamePrefixes) {
    for (let index = 1; index <= buttonsPerBar; index += 1) {
      const value = rawget(_G, `${prefix}${index}`);

      if (isActionButton(value) && value.IsVisible()) {
        buttons.push({ button: value, spellId: getActionSpellId(value) });
      }
    }
  }

  cache = { buttons, time };

  return buttons;
}

export function getActionSpellId(button: ActionButton): number | undefined {
  const actionSlotId = button.action;

  if (actionSlotId === undefined || actionSlotId <= 0 || !C_ActionBar.HasAction(actionSlotId)) {
    return undefined;
  }

  const spellId = C_ActionBar.GetSpell(actionSlotId);

  return spellId > 0 ? spellId : undefined;
}

export function isActionButton(value: unknown): value is ActionButton {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("GetName" in value) || !("IsVisible" in value) || !("SetChecked" in value)) {
    return false;
  }

  return (
    typeof value.GetName === "function" &&
    typeof value.IsVisible === "function" &&
    typeof value.SetChecked === "function"
  );
}
