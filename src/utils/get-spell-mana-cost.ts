export function getSpellManaCost(spellId: number): number {
  const costs = GetSpellPowerCost(spellId);

  if (costs) {
    for (const cost of costs) {
      if (cost.type === Enum.PowerType.Mana) {
        return cost.minCost;
      }
    }
  }

  return 0;
}
