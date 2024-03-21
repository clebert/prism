import type { ComparisonOperator, Duration, Percentage } from "./parser";

export type ComparisonFunction<TValue extends number | Duration | Percentage> = (
  value: TValue,
) => boolean;

export function createComparisonFunction<TType extends "number" | "duration" | "percentage">(
  expectedType: TType,
  operator: ComparisonOperator | "==",
  threshold: number | Duration | Percentage,
):
  | ComparisonFunction<
      TType extends "number"
        ? number
        : TType extends "duration"
          ? Duration
          : TType extends "percentage"
            ? Percentage
            : never
    >
  | undefined {
  const actualType = typeof threshold === "number" ? "number" : threshold.type;

  if (actualType !== expectedType) {
    return;
  }

  const thresholdValue = toNumber(threshold);

  switch (operator) {
    case "<":
      return (value) => toNumber(value) < thresholdValue;
    case "<=":
      return (value) => toNumber(value) <= thresholdValue;
    case ">":
      return (value) => toNumber(value) > thresholdValue;
    case ">=":
      return (value) => toNumber(value) >= thresholdValue;
    case "==":
      return (value) => toNumber(value) === thresholdValue;
  }
}

function toNumber(value: number | Duration | Percentage): number {
  if (typeof value === "number") {
    return value;
  }

  return value.value;
}
