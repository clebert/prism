import { deepEqual, equal } from "node:assert/strict";
import { describe, test } from "node:test";
import { selfBuffAppearance } from "./self-buff-rule";

describe("selfBuffAppearance", () => {
  test("checks and dims when the player has the matching aura", () => {
    deepEqual(selfBuffAppearance(true), { checked: true, dimmed: true });
  });

  test("clears the look when the aura is missing", () => {
    equal(selfBuffAppearance(false), undefined);
  });
});
