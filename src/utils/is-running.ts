export function isRunning(): boolean {
  // Base running speed in WoW Classic is 7 yd/s
  // Exclude mounted and taxi states to detect actual running/autorun
  if (IsMounted() || UnitOnTaxi("player")) {
    return false;
  }

  return GetUnitSpeed("player") >= 7;
}
