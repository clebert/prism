import { setButtonOverlay } from "./button-overlay";

export interface SelfBuffAppearance {
  readonly checked: boolean;
  readonly dimmed: boolean;
}

export function selfBuffAppearance(hasPlayerAura: boolean): SelfBuffAppearance | undefined {
  if (!hasPlayerAura) {
    return undefined;
  }

  return { checked: true, dimmed: true };
}

export function applySelfBuffRule(button: ActionButton, spellId: number | undefined): void {
  setButtonOverlay(button, selfBuffAppearance(spellId !== undefined && hasPlayerAura(spellId)));
}

function hasPlayerAura(spellId: number): boolean {
  if (C_UnitAuras.GetPlayerAuraBySpellID(spellId) !== undefined) {
    return true;
  }

  const spellName = C_Spell.GetSpellName(spellId);

  if (spellName === undefined) {
    return false;
  }

  return C_UnitAuras.GetAuraDataBySpellName("player", spellName, "HELPFUL") !== undefined;
}
