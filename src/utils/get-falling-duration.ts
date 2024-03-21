let fallingStartTime: number | undefined;

export function getFallingDuration(): number {
  if (IsFalling()) {
    if (fallingStartTime === undefined) {
      fallingStartTime = GetTime();
    }

    return GetTime() - fallingStartTime;
  }

  fallingStartTime = undefined;

  return 0;
}
