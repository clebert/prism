import { getSpellManaCost } from "./get-spell-mana-cost";

export function getDruidFormManaCost(index: number): number {
  if (index === 0) {
    return 0;
  }

  const [, , , spellId] = GetShapeshiftFormInfo(index);

  return getSpellManaCost(spellId);
}
