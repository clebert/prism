export function getPercentage(value: number, maxValue: number): number {
  return maxValue === 0 ? 0 : Math.ceil((value / maxValue) * 100);
}
