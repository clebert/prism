import { isRunning } from "./is-running";

let runningStartTime: number | undefined;

export function getRunningDuration(): number {
  if (isRunning()) {
    if (runningStartTime === undefined) {
      runningStartTime = GetTime();
    }

    return GetTime() - runningStartTime;
  }

  runningStartTime = undefined;

  return 0;
}
