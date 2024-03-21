import { equal } from "node:assert/strict";
import { describe, test } from "node:test";
import { createComparisonFunction } from "./comparison-function";
import type { Duration, Percentage } from "./parser";

describe("ComparisonFunction", () => {
  describe("number comparisons", () => {
    test("less than operator", () => {
      const comparison = createComparisonFunction("number", "<", 10);

      equal(comparison?.(5), true);
      equal(comparison?.(10), false);
      equal(comparison?.(15), false);
    });

    test("less than or equal operator", () => {
      const comparison = createComparisonFunction("number", "<=", 10);

      equal(comparison?.(5), true);
      equal(comparison?.(10), true);
      equal(comparison?.(15), false);
    });

    test("greater than operator", () => {
      const comparison = createComparisonFunction("number", ">", 10);

      equal(comparison?.(5), false);
      equal(comparison?.(10), false);
      equal(comparison?.(15), true);
    });

    test("greater than or equal operator", () => {
      const comparison = createComparisonFunction("number", ">=", 10);

      equal(comparison?.(5), false);
      equal(comparison?.(10), true);
      equal(comparison?.(15), true);
    });

    test("equality operator", () => {
      const comparison = createComparisonFunction("number", "==", 10);

      equal(comparison?.(5), false);
      equal(comparison?.(10), true);
      equal(comparison?.(15), false);
    });

    test("returns undefined for type mismatch", () => {
      const durationThreshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("number", "<", durationThreshold);

      equal(comparison, undefined);
    });
  });

  describe("duration comparisons", () => {
    test("less than operator", () => {
      const threshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("duration", "<", threshold);
      const smallerDuration: Duration = { type: "duration", value: 5 };
      const equalDuration: Duration = { type: "duration", value: 10 };
      const largerDuration: Duration = { type: "duration", value: 15 };

      equal(comparison?.(smallerDuration), true);
      equal(comparison?.(equalDuration), false);
      equal(comparison?.(largerDuration), false);
    });

    test("less than or equal operator", () => {
      const threshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("duration", "<=", threshold);
      const smallerDuration: Duration = { type: "duration", value: 5 };
      const equalDuration: Duration = { type: "duration", value: 10 };
      const largerDuration: Duration = { type: "duration", value: 15 };

      equal(comparison?.(smallerDuration), true);
      equal(comparison?.(equalDuration), true);
      equal(comparison?.(largerDuration), false);
    });

    test("greater than operator", () => {
      const threshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("duration", ">", threshold);
      const smallerDuration: Duration = { type: "duration", value: 5 };
      const equalDuration: Duration = { type: "duration", value: 10 };
      const largerDuration: Duration = { type: "duration", value: 15 };

      equal(comparison?.(smallerDuration), false);
      equal(comparison?.(equalDuration), false);
      equal(comparison?.(largerDuration), true);
    });

    test("greater than or equal operator", () => {
      const threshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("duration", ">=", threshold);
      const smallerDuration: Duration = { type: "duration", value: 5 };
      const equalDuration: Duration = { type: "duration", value: 10 };
      const largerDuration: Duration = { type: "duration", value: 15 };

      equal(comparison?.(smallerDuration), false);
      equal(comparison?.(equalDuration), true);
      equal(comparison?.(largerDuration), true);
    });

    test("equality operator", () => {
      const threshold: Duration = { type: "duration", value: 10 };
      const comparison = createComparisonFunction("duration", "==", threshold);
      const smallerDuration: Duration = { type: "duration", value: 5 };
      const equalDuration: Duration = { type: "duration", value: 10 };
      const largerDuration: Duration = { type: "duration", value: 15 };

      equal(comparison?.(smallerDuration), false);
      equal(comparison?.(equalDuration), true);
      equal(comparison?.(largerDuration), false);
    });

    test("returns undefined for type mismatch", () => {
      const comparison = createComparisonFunction("duration", "<", 10);

      equal(comparison, undefined);
    });
  });

  describe("percentage comparisons", () => {
    test("less than operator", () => {
      const threshold: Percentage = { type: "percentage", value: 50 };
      const comparison = createComparisonFunction("percentage", "<", threshold);
      const smallerPercentage: Percentage = { type: "percentage", value: 25 };
      const equalPercentage: Percentage = { type: "percentage", value: 50 };
      const largerPercentage: Percentage = { type: "percentage", value: 75 };

      equal(comparison?.(smallerPercentage), true);
      equal(comparison?.(equalPercentage), false);
      equal(comparison?.(largerPercentage), false);
    });

    test("less than or equal operator", () => {
      const threshold: Percentage = { type: "percentage", value: 50 };
      const comparison = createComparisonFunction("percentage", "<=", threshold);
      const smallerPercentage: Percentage = { type: "percentage", value: 25 };
      const equalPercentage: Percentage = { type: "percentage", value: 50 };
      const largerPercentage: Percentage = { type: "percentage", value: 75 };

      equal(comparison?.(smallerPercentage), true);
      equal(comparison?.(equalPercentage), true);
      equal(comparison?.(largerPercentage), false);
    });

    test("greater than operator", () => {
      const threshold: Percentage = { type: "percentage", value: 50 };
      const comparison = createComparisonFunction("percentage", ">", threshold);
      const smallerPercentage: Percentage = { type: "percentage", value: 25 };
      const equalPercentage: Percentage = { type: "percentage", value: 50 };
      const largerPercentage: Percentage = { type: "percentage", value: 75 };

      equal(comparison?.(smallerPercentage), false);
      equal(comparison?.(equalPercentage), false);
      equal(comparison?.(largerPercentage), true);
    });

    test("greater than or equal operator", () => {
      const threshold: Percentage = { type: "percentage", value: 50 };
      const comparison = createComparisonFunction("percentage", ">=", threshold);
      const smallerPercentage: Percentage = { type: "percentage", value: 25 };
      const equalPercentage: Percentage = { type: "percentage", value: 50 };
      const largerPercentage: Percentage = { type: "percentage", value: 75 };

      equal(comparison?.(smallerPercentage), false);
      equal(comparison?.(equalPercentage), true);
      equal(comparison?.(largerPercentage), true);
    });

    test("equality operator", () => {
      const threshold: Percentage = { type: "percentage", value: 50 };
      const comparison = createComparisonFunction("percentage", "==", threshold);
      const smallerPercentage: Percentage = { type: "percentage", value: 25 };
      const equalPercentage: Percentage = { type: "percentage", value: 50 };
      const largerPercentage: Percentage = { type: "percentage", value: 75 };

      equal(comparison?.(smallerPercentage), false);
      equal(comparison?.(equalPercentage), true);
      equal(comparison?.(largerPercentage), false);
    });

    test("returns undefined for type mismatch", () => {
      const comparison = createComparisonFunction("percentage", "<", 50);

      equal(comparison, undefined);
    });
  });
});
