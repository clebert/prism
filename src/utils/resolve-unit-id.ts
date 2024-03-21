import type { Unit } from "../dsl/parser";

export function resolveUnitId(unit: Unit): string {
  const { modifier, unitId } = unit;

  if (modifier === "help") {
    return IsModifiedClick("SELFCAST") || !UnitExists(unitId) || !UnitCanAssist("player", unitId)
      ? "player"
      : unitId;
  }

  return unitId;
}
