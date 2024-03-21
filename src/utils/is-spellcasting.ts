const unitGuids = new Set<string>();

export function isSpellcasting(unitId: string): boolean {
  const unitGuid = UnitGUID(unitId);

  return unitGuid !== undefined && unitGuids.has(unitGuid);
}

const frame = CreateFrame("Frame");

frame.RegisterEvent("PLAYER_REGEN_ENABLED");
frame.RegisterEvent("UNIT_SPELLCAST_FAILED");
frame.RegisterEvent("UNIT_SPELLCAST_FAILED_QUIET");
frame.RegisterEvent("UNIT_SPELLCAST_INTERRUPTED");
frame.RegisterEvent("UNIT_SPELLCAST_START");
frame.RegisterEvent("UNIT_SPELLCAST_STOP");
frame.RegisterEvent("UNIT_SPELLCAST_SUCCEEDED");

frame.SetScript("OnEvent", (event, ...args) => {
  if (event === "PLAYER_REGEN_ENABLED") {
    unitGuids.clear();

    return;
  }

  const [unitId] = args as string[];
  const unitGuid = unitId !== undefined ? UnitGUID(unitId) : undefined;

  if (unitGuid) {
    if (event === "UNIT_SPELLCAST_START") {
      unitGuids.add(unitGuid);
    } else {
      unitGuids.delete(unitGuid);
    }
  }
});
