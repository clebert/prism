import { equal } from "node:assert/strict";
import { describe, test } from "node:test";
import { getPercentage } from "./get-percentage";

describe("getPercentage", () => {
  test("returns 0 when maxValue is 0", () => {
    equal(getPercentage(100, 0), 0);
  });

  test("returns 100 when value equals maxValue", () => {
    equal(getPercentage(100, 100), 100);
  });

  test("returns 0 when value is 0", () => {
    equal(getPercentage(0, 100), 0);
  });

  test("rounds up to match WoW percentage calculation", () => {
    equal(getPercentage(1, 10000), 1);
    equal(getPercentage(2050, 10000), 21);
    equal(getPercentage(2001, 10000), 21);
    equal(getPercentage(2000, 10000), 20);
    equal(getPercentage(9901, 10000), 100);
  });

  test("handles various percentage values", () => {
    equal(getPercentage(50, 100), 50);
    equal(getPercentage(33, 100), 33);
    equal(getPercentage(1, 100), 1);
    equal(getPercentage(99, 100), 99);
  });
});
