import { equal, throws } from "node:assert/strict";
import { describe, test } from "node:test";
import { createButtonBehaviors } from "./button-behavior";
import type { Configuration } from "./parser";
import { createMockRegistry } from "./predicate-registry";

describe("ButtonBehavior", () => {
  describe("spell configs", () => {
    test("creates spell with no visual states", () => {
      const registry = createMockRegistry();

      const configuration: Configuration = {
        spellName: "Fireball",
        type: "spell",
        visualStates: {},
      };

      const buttonBehaviors = createButtonBehaviors(registry, configuration);

      equal(buttonBehaviors.size, 1);

      const buttonBehavior = buttonBehaviors.get("Fireball");

      equal(buttonBehavior?.blocked, undefined);
      equal(buttonBehavior?.checked, undefined);
      equal(buttonBehavior?.depleted, undefined);
      equal(buttonBehavior?.enabled, undefined);
      equal(buttonBehavior?.flashing, undefined);
      equal(buttonBehavior?.glowing, undefined);
    });

    test("creates spell with all visual states", () => {
      const registry = createMockRegistry();

      const configuration: Configuration = {
        spellName: "Frostbolt",
        type: "spell",
        visualStates: {
          blocked: {
            condition: { args: [], predicateName: "combat", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
          checked: {
            condition: { args: [], predicateName: "mounted", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
          depleted: {
            condition: { args: [], predicateName: "swimming", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
          enabled: {
            condition: { args: [], predicateName: "outdoors", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
          flashing: {
            condition: { args: [], predicateName: "resting", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
          glowing: {
            condition: { args: [], predicateName: "stealthed", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
        },
      };

      const buttonBehaviors = createButtonBehaviors(registry, configuration);
      const buttonBehavior = buttonBehaviors.get("Frostbolt");

      equal(typeof buttonBehavior?.blocked, "function");
      equal(typeof buttonBehavior?.checked, "function");
      equal(typeof buttonBehavior?.depleted, "function");
      equal(typeof buttonBehavior?.enabled, "function");
      equal(typeof buttonBehavior?.flashing, "function");
      equal(typeof buttonBehavior?.glowing, "function");
    });

    test("handles multiple spell configs", () => {
      const registry = createMockRegistry();

      const configuration1: Configuration = {
        spellName: "Fireball",
        type: "spell",
        visualStates: {},
      };

      const configuration2: Configuration = {
        spellName: "Frostbolt",
        type: "spell",
        visualStates: {},
      };

      const buttonBehaviors = createButtonBehaviors(registry, configuration1, configuration2);

      equal(buttonBehaviors.size, 2);
      equal(buttonBehaviors.has("Fireball"), true);
      equal(buttonBehaviors.has("Frostbolt"), true);
    });

    test("throws error for duplicate spell names", () => {
      const registry = createMockRegistry();

      const configuration1: Configuration = {
        spellName: "Fireball",
        type: "spell",
        visualStates: {},
      };

      const configuration2: Configuration = {
        spellName: "Fireball",
        type: "spell",
        visualStates: {},
      };

      throws(
        () => createButtonBehaviors(registry, configuration1, configuration2),
        /Duplicate spell declaration: 'Fireball'/,
      );
    });
  });

  describe("item configs", () => {
    test("creates item with single id", () => {
      const registry = createMockRegistry();
      const configuration: Configuration = { itemIds: [1], type: "item", visualStates: {} };
      const buttonBehaviors = createButtonBehaviors(registry, configuration);

      equal(buttonBehaviors.size, 1);

      const buttonBehavior = buttonBehaviors.get(1);

      equal(buttonBehavior?.blocked, undefined);
      equal(buttonBehavior?.checked, undefined);
      equal(buttonBehavior?.depleted, undefined);
      equal(buttonBehavior?.enabled, undefined);
      equal(buttonBehavior?.flashing, undefined);
      equal(buttonBehavior?.glowing, undefined);
    });

    test("creates item with multiple ids", () => {
      const registry = createMockRegistry();

      const configuration: Configuration = {
        itemIds: [1, 2, 3],
        type: "item",
        visualStates: {
          glowing: {
            condition: { args: [], predicateName: "combat", type: "predicate" },
            type: "scope",
            unit: { unitId: "player" },
          },
        },
      };

      const buttonBehaviors = createButtonBehaviors(registry, configuration);

      equal(buttonBehaviors.size, 3);

      // All item IDs should point to the same buttonBehavior instance
      const buttonBehavior1 = buttonBehaviors.get(1);
      const buttonBehavior2 = buttonBehaviors.get(2);
      const buttonBehavior3 = buttonBehaviors.get(3);

      equal(buttonBehavior1, buttonBehavior2);
      equal(buttonBehavior2, buttonBehavior3);
      equal(typeof buttonBehavior1?.glowing, "function");
    });

    test("handles multiple item configs", () => {
      const registry = createMockRegistry();
      const configuration1: Configuration = { itemIds: [1, 2], type: "item", visualStates: {} };
      const configuration2: Configuration = { itemIds: [3, 4], type: "item", visualStates: {} };
      const buttonBehaviors = createButtonBehaviors(registry, configuration1, configuration2);

      equal(buttonBehaviors.size, 4);
      equal(buttonBehaviors.has(1), true);
      equal(buttonBehaviors.has(2), true);
      equal(buttonBehaviors.has(3), true);
      equal(buttonBehaviors.has(4), true);

      // Items 1 and 2 share the same buttonBehavior instance
      equal(buttonBehaviors.get(1), buttonBehaviors.get(2));

      // Items 3 and 4 share the same buttonBehavior instance
      equal(buttonBehaviors.get(3), buttonBehaviors.get(4));

      // But 1 and 3 are different
      equal(buttonBehaviors.get(1) !== buttonBehaviors.get(3), true);
    });

    test("throws error for duplicate item id", () => {
      const registry = createMockRegistry();
      const configuration1: Configuration = { itemIds: [1, 2], type: "item", visualStates: {} };
      const configuration2: Configuration = { itemIds: [2, 3], type: "item", visualStates: {} };

      throws(
        () => createButtonBehaviors(registry, configuration1, configuration2),
        /Duplicate item declaration: 2/,
      );
    });

    test("throws error for duplicate item id within same configuration", () => {
      const registry = createMockRegistry();
      const configuration: Configuration = { itemIds: [1, 2, 1], type: "item", visualStates: {} };

      throws(() => createButtonBehaviors(registry, configuration), /Duplicate item declaration: 1/);
    });
  });
});
