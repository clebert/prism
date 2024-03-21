export type Action = ItemAction | SpellAction;

export interface ItemAction {
  readonly type: "item";
  readonly actionSlotId: number;
  readonly button: UiObject.Button;
  readonly itemId: number;
  readonly itemSpellId: number | undefined;
  readonly itemSpellName: string | undefined;
}

export interface SpellAction {
  readonly type: "spell";
  readonly actionSlotId: number;
  readonly button: UiObject.Button;
  readonly spellId: number;
  readonly spellName: string;
}

// biome-ignore lint/suspicious/noExplicitAny: WoW global object requires this pattern
const global = _G as any as Record<string, UiObject.Button | undefined>;

let cache: { readonly actions: Action[]; readonly time: number } | undefined;

export function getActions(): Action[] {
  if (cache?.time === GetTime()) {
    return cache.actions;
  }

  const buttons: (UiObject.Button | undefined)[] = [];

  for (let index = 1; index <= 12; index += 1) {
    buttons.push(global[`ActionButton${index}`]);
    buttons.push(global[`MultiBarRightButton${index}`]);
    buttons.push(global[`MultiBarLeftButton${index}`]);
    buttons.push(global[`MultiBarBottomRightButton${index}`]);
    buttons.push(global[`MultiBarBottomLeftButton${index}`]);

    buttons.push(global[`BT4Button${index}`]);
    buttons.push(global[`BT4Button${index + 12}`]);
    buttons.push(global[`BT4Button${index + 24}`]);
    buttons.push(global[`BT4Button${index + 36}`]);
    buttons.push(global[`BT4Button${index + 48}`]);
    buttons.push(global[`BT4Button${index + 60}`]);
    buttons.push(global[`BT4Button${index + 72}`]);
    buttons.push(global[`BT4Button${index + 84}`]);
    buttons.push(global[`BT4Button${index + 96}`]);
    buttons.push(global[`BT4Button${index + 108}`]);

    buttons.push(global[`DominosActionButton${index}`]);
    buttons.push(global[`DominosActionButton${index + 12}`]);
    buttons.push(global[`DominosActionButton${index + 24}`]);
    buttons.push(global[`DominosActionButton${index + 36}`]);
    buttons.push(global[`DominosActionButton${index + 48}`]);
    buttons.push(global[`DominosActionButton${index + 60}`]);
    buttons.push(global[`DominosActionButton${index + 72}`]);
    buttons.push(global[`DominosActionButton${index + 84}`]);
    buttons.push(global[`DominosActionButton${index + 96}`]);
    buttons.push(global[`DominosActionButton${index + 108}`]);
    buttons.push(global[`DominosActionButton${index + 120}`]);
    buttons.push(global[`DominosActionButton${index + 132}`]);
    buttons.push(global[`DominosActionButton${index + 144}`]);
    buttons.push(global[`DominosActionButton${index + 156}`]);
  }

  const actions: Action[] = [];

  for (const button of buttons) {
    if (button?.IsVisible()) {
      const action = getAction(button);

      if (action) {
        actions.push(action);
      }
    }
  }

  cache = { actions, time: GetTime() };

  return actions;
}

function getAction(button: UiObject.Button): Action | undefined {
  const actionSlotId = getActionSlotId(button);

  if (actionSlotId !== undefined) {
    const [actionType, actionId] = GetActionInfo(actionSlotId);

    if (actionType === "item") {
      const [itemSpellName, itemSpellId] = GetItemSpell(actionId);

      return { actionSlotId, button, itemId: actionId, itemSpellId, itemSpellName, type: "item" };
    }

    if (actionType === "macro") {
      const spellId = GetMacroSpell(actionId);

      if (spellId !== undefined) {
        const [spellName] = GetSpellInfo(spellId);

        if (spellName !== undefined) {
          return { actionSlotId, button, spellId, spellName, type: "spell" };
        }
      } else {
        const [itemName] = GetMacroItem(actionId);

        if (itemName !== undefined) {
          const [itemId] = GetItemInfoInstant(itemName);

          if (itemId !== undefined) {
            const [itemSpellName, itemSpellId] = GetItemSpell(itemName);

            return { actionSlotId, button, itemId, itemSpellId, itemSpellName, type: "item" };
          }
        }
      }
    } else if (actionType === "spell") {
      const [spellName] = GetSpellInfo(actionId);

      if (spellName !== undefined) {
        return { actionSlotId, button, spellId: actionId, spellName, type: "spell" };
      }
    }
  }

  return;
}

function getActionSlotId(button: UiObject.Frame): number | undefined {
  const actionSlotId =
    "_state_action" in button && typeof button._state_action === "number"
      ? button._state_action
      : ActionButton_GetPagedID(button);

  return actionSlotId !== undefined && actionSlotId > 0 ? actionSlotId : undefined;
}
