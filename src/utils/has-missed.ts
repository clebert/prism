const blockTimestampByUnitGuids = new Map<string, number>();
const dodgeTimestampByUnitGuids = new Map<string, number>();
const parryTimestampByUnitGuids = new Map<string, number>();

export function hasMissed(unitId: string, missType: "block" | "dodge" | "parry"): boolean {
  const unitGuid = UnitGUID(unitId);

  if (unitGuid === undefined) {
    return false;
  }

  const timestampByUnitGuids =
    missType === "block"
      ? blockTimestampByUnitGuids
      : missType === "dodge"
        ? dodgeTimestampByUnitGuids
        : parryTimestampByUnitGuids;

  const timestamp = timestampByUnitGuids.get(unitGuid);

  return timestamp !== undefined && GetTime() - timestamp < 5;
}

const frame = CreateFrame("Frame");

frame.RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED");
frame.RegisterEvent("PLAYER_REGEN_ENABLED");

frame.SetScript("OnEvent", (event) => {
  if (event === "PLAYER_REGEN_ENABLED") {
    blockTimestampByUnitGuids.clear();
    dodgeTimestampByUnitGuids.clear();
    parryTimestampByUnitGuids.clear();

    return;
  }

  const [, eventType, , sourceGUID, , , , targetGUID, , , , missType] =
    CombatLogGetCurrentEventInfo();

  if (eventType !== "SWING_MISSED") {
    return;
  }

  // biome-ignore lint/style/noNonNullAssertion: never null
  const playerGUID = UnitGUID("player")!;

  if ((sourceGUID === playerGUID || targetGUID === playerGUID) && typeof targetGUID === "string") {
    if (missType === "BLOCK") {
      blockTimestampByUnitGuids.set(targetGUID, GetTime());
    } else if (missType === "DODGE") {
      dodgeTimestampByUnitGuids.set(targetGUID, GetTime());
    } else if (missType === "PARRY") {
      parryTimestampByUnitGuids.set(targetGUID, GetTime());
    }
  }
});
