import { equal, throws } from "node:assert/strict";
import { describe, test } from "node:test";
import type { Condition, Predicate, Rule, Unit } from "./parser";
import { createMockRegistry } from "./predicate-registry";
import type { RuleFunctionContext } from "./rule-function";
import {
  createConditionFunction,
  createPredicateFunction,
  createRuleFunction,
} from "./rule-function";

const mockContext: RuleFunctionContext = {
  actionSlotId: 1,
  spellName: "Test Spell",
};

describe("RuleFunction", () => {
  describe("createRuleFunction", () => {
    describe("OR rules", () => {
      test("returns true when at least one rule evaluates to true", () => {
        const registry = createMockRegistry({
          player: { indoors: () => false, outdoors: () => true },
        });

        const rule: Rule = {
          rules: [
            {
              condition: { args: [], predicateName: "outdoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
            {
              condition: { args: [], predicateName: "indoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
          ],
          type: "or",
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), true);
      });

      test("returns false when all rules evaluate to false", () => {
        const registry = createMockRegistry();

        const rule: Rule = {
          rules: [
            {
              condition: { args: [], predicateName: "indoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
            {
              condition: { args: [], predicateName: "mounted", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
          ],
          type: "or",
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), false);
      });

      test("handles empty rules array", () => {
        const registry = createMockRegistry();
        const rule: Rule = { rules: [], type: "or" };
        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), false);
      });
    });

    describe("AND rules", () => {
      test("returns true when all rules evaluate to true", () => {
        const registry = createMockRegistry({
          player: { outdoors: () => true, rageSafe: () => true },
        });

        const rule: Rule = {
          rules: [
            {
              condition: { args: [], predicateName: "outdoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
            {
              condition: { args: [], predicateName: "rageSafe", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
          ],
          type: "and",
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), true);
      });

      test("returns false when at least one rule evaluates to false", () => {
        const registry = createMockRegistry();

        const rule: Rule = {
          rules: [
            {
              condition: { args: [], predicateName: "outdoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
            {
              condition: { args: [], predicateName: "indoors", type: "predicate" },
              type: "scope",
              unit: { unitId: "player" },
            },
          ],
          type: "and",
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), false);
      });

      test("handles empty rules array", () => {
        const registry = createMockRegistry();
        const rule: Rule = { rules: [], type: "and" };
        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), true);
      });
    });

    describe("scope rules", () => {
      test("evaluates condition within unit scope", () => {
        const registry = createMockRegistry({ player: { outdoors: () => true } });

        const rule: Rule = {
          condition: { args: [], predicateName: "outdoors", type: "predicate" },
          type: "scope",
          unit: { unitId: "player" },
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), true);
      });

      test("handles complex nested conditions", () => {
        const registry = createMockRegistry({
          universal: { alive: () => true, combat: () => true },
        });

        const rule: Rule = {
          condition: {
            conditions: [
              { args: [], predicateName: "alive", type: "predicate" },
              { args: [], predicateName: "combat", type: "predicate" },
            ],
            type: "and",
          },
          type: "scope",
          unit: { unitId: "target" },
        };

        const ruleFunction = createRuleFunction(registry, rule);

        equal(ruleFunction(mockContext), true);
      });
    });
  });

  describe("createConditionFunction", () => {
    const unit: Unit = { unitId: "player" };

    describe("OR conditions", () => {
      test("returns true when at least one condition evaluates to true", () => {
        const registry = createMockRegistry({
          player: { indoors: () => false, outdoors: () => true },
        });

        const condition: Condition = {
          conditions: [
            { args: [], predicateName: "outdoors", type: "predicate" },
            { args: [], predicateName: "indoors", type: "predicate" },
          ],
          type: "or",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), true);
      });

      test("returns false when all conditions evaluate to false", () => {
        const registry = createMockRegistry();

        const condition: Condition = {
          conditions: [
            { args: [], predicateName: "indoors", type: "predicate" },
            { args: [], predicateName: "mounted", type: "predicate" },
          ],
          type: "or",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), false);
      });
    });

    describe("AND conditions", () => {
      test("returns true when all conditions evaluate to true", () => {
        const registry = createMockRegistry({
          player: { outdoors: () => true, rageSafe: () => true },
        });

        const condition: Condition = {
          conditions: [
            { args: [], predicateName: "outdoors", type: "predicate" },
            { args: [], predicateName: "rageSafe", type: "predicate" },
          ],
          type: "and",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), true);
      });

      test("returns false when at least one condition evaluates to false", () => {
        const registry = createMockRegistry();

        const condition: Condition = {
          conditions: [
            { args: [], predicateName: "outdoors", type: "predicate" },
            { args: [], predicateName: "indoors", type: "predicate" },
          ],
          type: "and",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), false);
      });
    });

    describe("NOT conditions", () => {
      test("inverts true to false", () => {
        const registry = createMockRegistry({ player: { outdoors: () => true } });

        const condition: Condition = {
          condition: { args: [], predicateName: "outdoors", type: "predicate" },
          type: "not",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), false);
      });

      test("inverts false to true", () => {
        const registry = createMockRegistry();

        const condition: Condition = {
          condition: { args: [], predicateName: "indoors", type: "predicate" },
          type: "not",
        };

        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), true);
      });
    });

    describe("predicate conditions", () => {
      test("delegates to createPredicateFunction", () => {
        const registry = createMockRegistry({ player: { outdoors: () => true } });
        const condition: Condition = { args: [], predicateName: "outdoors", type: "predicate" };
        const conditionFunction = createConditionFunction(registry, condition, unit);

        equal(conditionFunction(mockContext), true);
      });
    });
  });

  describe("createPredicateFunction", () => {
    describe("special predicates", () => {
      test("always predicate returns true", () => {
        const registry = createMockRegistry();
        const predicate: Predicate = { args: [], predicateName: "always", type: "predicate" };
        const unit: Unit = { unitId: "player" };
        const predicateFunction = createPredicateFunction(registry, predicate, unit);

        equal(predicateFunction(mockContext), true);
      });
    });

    describe("pet predicates", () => {
      test("happy predicate returns true", () => {
        const registry = createMockRegistry({ pet: { happy: () => true } });
        const predicate: Predicate = { args: [], predicateName: "happy", type: "predicate" };
        const unit: Unit = { unitId: "pet" };
        const predicateFunction = createPredicateFunction(registry, predicate, unit);

        equal(predicateFunction(mockContext), true);
      });

      test("happy predicate returns false", () => {
        const registry = createMockRegistry({ pet: { happy: () => false } });
        const predicate: Predicate = { args: [], predicateName: "happy", type: "predicate" };
        const unit: Unit = { unitId: "pet" };
        const predicateFunction = createPredicateFunction(registry, predicate, unit);

        equal(predicateFunction(mockContext), false);
      });

      test("throws error when pet predicate used with non-pet unit", () => {
        const registry = createMockRegistry();
        const predicate: Predicate = { args: [], predicateName: "happy", type: "predicate" };
        const unit: Unit = { unitId: "player" };

        throws(
          () => createPredicateFunction(registry, predicate, unit),
          /Predicate 'happy' requires @pet unit scope/,
        );
      });

      test("throws error when happy has arguments", () => {
        const registry = createMockRegistry();

        const predicate: Predicate = {
          args: ["unexpected"],
          predicateName: "happy",
          type: "predicate",
        };

        const unit: Unit = { unitId: "pet" };

        throws(
          () => createPredicateFunction(registry, predicate, unit),
          /Predicate 'happy' takes no arguments/,
        );
      });
    });

    describe("player predicates", () => {
      describe("ammo predicate", () => {
        test("returns configured value", () => {
          const registry = createMockRegistry({ player: { ammo: () => true } });
          const predicate: Predicate = { args: [50], predicateName: "ammo", type: "predicate" };
          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with duration argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: [{ type: "duration", value: 5 }],
            predicateName: "ammo",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'ammo' got invalid argument 'amount'/,
          );
        });

        test("throws error with percentage argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: [{ type: "percentage", value: 50 }],
            predicateName: "ammo",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'ammo' got invalid argument 'amount'/,
          );
        });
      });

      describe("itemCount predicate", () => {
        test("returns configured value", () => {
          const registry = createMockRegistry({ player: { itemCount: () => true } });

          const predicate: Predicate = {
            args: [6265, 2],
            predicateName: "itemCount",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("works with comparison operators", () => {
          const registry = createMockRegistry({ player: { itemCount: () => false } });

          const predicate: Predicate = {
            args: [6265, { operator: ">", threshold: 2, type: "comparison" }],
            predicateName: "itemCount",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), false);
        });

        test("throws error without arguments", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [], predicateName: "itemCount", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'itemCount' got invalid argument 'itemId'/,
          );
        });

        test("throws error with invalid amount argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: [6265, { type: "percentage", value: 50 }],
            predicateName: "itemCount",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'itemCount' got invalid argument 'amount'/,
          );
        });
      });

      describe("no-argument predicates", () => {
        const noArgPredicates = [
          "autoShooting",
          "grouped",
          "indoors",
          "meleeAttacking",
          "mounted",
          "outdoors",
          "rageSafe",
          "resting",
          "stealthed",
          "submerged",
          "swimming",
        ];

        for (const predicateName of noArgPredicates) {
          test(`${predicateName} predicate returns true`, () => {
            const registry = createMockRegistry({ player: { [predicateName]: () => true } });
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), true);
          });

          test(`${predicateName} predicate returns false`, () => {
            const registry = createMockRegistry({ player: { [predicateName]: () => false } });
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} throws error with arguments`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["unexpected"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' takes no arguments`),
            );
          });
        }
      });

      describe("canShiftBackFrom and canShiftInto and druidForm predicates", () => {
        const shiftPredicates = ["canShiftBackFrom", "canShiftInto", "druidForm"];

        for (const predicateName of shiftPredicates) {
          test(`${predicateName} with valid druid form`, () => {
            const registry = createMockRegistry({ player: { [predicateName]: () => true } });
            const predicate: Predicate = { args: ["bear"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), true);
          });

          test(`${predicateName} throws error with invalid druid form`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["invalid"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'target'`),
            );
          });

          test(`${predicateName} throws error without argument`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "player" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'target'`),
            );
          });
        }
      });

      describe("usable predicate", () => {
        test("usable with infer argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["infer"],
            predicateName: "usable",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), false);
        });

        test("usable throws error with non-infer argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["other"],
            predicateName: "usable",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'usable' got invalid argument 'infer'/,
          );
        });

        test("usable throws error without argument", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [], predicateName: "usable", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'usable' got invalid argument 'infer'/,
          );
        });
      });

      describe("equipped predicate", () => {
        test("with shield argument", () => {
          const registry = createMockRegistry({ player: { equipped: () => true } });

          const predicate: Predicate = {
            args: ["shield"],
            predicateName: "equipped",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("with dagger argument", () => {
          const registry = createMockRegistry({ player: { equipped: () => true } });

          const predicate: Predicate = {
            args: ["dagger"],
            predicateName: "equipped",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("with meleeWeapon argument", () => {
          const registry = createMockRegistry({ player: { equipped: () => true } });

          const predicate: Predicate = {
            args: ["meleeWeapon"],
            predicateName: "equipped",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with invalid argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["weapon"],
            predicateName: "equipped",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'equipped' got invalid argument 'type'/,
          );
        });
      });

      describe("falling predicate", () => {
        test("returns configured value", () => {
          const registry = createMockRegistry({ player: { falling: () => true } });

          const predicate: Predicate = {
            args: [{ type: "duration", value: 2 }],
            predicateName: "falling",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with number argument", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [50], predicateName: "falling", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'falling' got invalid argument 'duration'/,
          );
        });

        test("throws error with percentage argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: [{ type: "percentage", value: 50 }],
            predicateName: "falling",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'falling' got invalid argument 'duration'/,
          );
        });
      });

      describe("running predicate", () => {
        test("returns configured value", () => {
          const registry = createMockRegistry({ player: { running: () => true } });

          const predicate: Predicate = {
            args: [{ type: "duration", value: 3 }],
            predicateName: "running",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with number argument", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [50], predicateName: "running", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'running' got invalid argument 'duration'/,
          );
        });

        test("throws error with percentage argument", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: [{ type: "percentage", value: 50 }],
            predicateName: "running",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'running' got invalid argument 'duration'/,
          );
        });
      });

      describe("form and stance predicates", () => {
        test("form returns configured value", () => {
          const registry = createMockRegistry({ player: { form: () => true } });
          const predicate: Predicate = { args: [1], predicateName: "form", type: "predicate" };
          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("stance returns configured value", () => {
          const registry = createMockRegistry({ player: { stance: () => false } });
          const predicate: Predicate = { args: [2], predicateName: "stance", type: "predicate" };
          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), false);
        });

        test("form throws error with string argument", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: ["bear"], predicateName: "form", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'form' got invalid argument 'number'/,
          );
        });
      });

      describe("talent predicate", () => {
        test("returns configured value", () => {
          const registry = createMockRegistry({ player: { talent: () => true } });

          const predicate: Predicate = {
            args: ["Improved Rend", 2],
            predicateName: "talent",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with non-string name", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [123], predicateName: "talent", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'talent' got invalid argument 'name'/,
          );
        });

        test("throws error with duration for rank", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["Improved Rend", { type: "duration", value: 5 }],
            predicateName: "talent",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'talent' got invalid argument 'rank'/,
          );
        });

        test("throws error with percentage for rank", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["Improved Rend", { type: "percentage", value: 50 }],
            predicateName: "talent",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'talent' got invalid argument 'rank'/,
          );
        });
      });

      test("throws error when player predicate used with non-player unit", () => {
        const registry = createMockRegistry();
        const predicate: Predicate = { args: [], predicateName: "outdoors", type: "predicate" };
        const unit: Unit = { unitId: "target" };

        throws(
          () => createPredicateFunction(registry, predicate, unit),
          /Predicate 'outdoors' requires @player unit scope/,
        );
      });
    });

    describe("universal predicates", () => {
      describe("no-argument predicates", () => {
        const noArgPredicates = [
          "alive",
          "bleedable",
          "blocked",
          "casting",
          "combat",
          "cursed",
          "dead",
          "diseased",
          "dodged",
          "elite",
          "existing",
          "harm",
          "help",
          "magicBuff",
          "magicDebuff",
          "missing",
          "npc",
          "parried",
          "partyMember",
          "poisoned",
          "trivial",
        ];

        for (const predicateName of noArgPredicates) {
          test(`${predicateName} predicate returns true`, () => {
            const registry = createMockRegistry({ universal: { [predicateName]: () => true } });
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), true);
          });

          test(`${predicateName} predicate returns false`, () => {
            const registry = createMockRegistry({ universal: { [predicateName]: () => false } });
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} throws error with arguments`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["unexpected"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' takes no arguments`),
            );
          });
        }
      });

      describe("unit reference predicates", () => {
        const unitReferencePredicates = ["attacking", "is", "targeting"];

        for (const predicateName of unitReferencePredicates) {
          test(`${predicateName} with @unit argument`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["@player"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} throws error without argument`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: [], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument '@unit'`),
            );
          });
        }
      });

      describe("aura predicates", () => {
        const auraPredicates = ["buff", "debuff", "ownBuff", "ownDebuff"];

        for (const predicateName of auraPredicates) {
          test(`${predicateName} with name`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: ["Power Word: Shield"],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} with infer`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["infer"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} with infer returns false when no spell name in context`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: ["infer"], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);
            const contextNoSpell = { ...mockContext, spellName: undefined };

            equal(predicateFunction(contextNoSpell), false);
          });

          test(`${predicateName} with multiple arguments returns configured value`, () => {
            const registry = createMockRegistry({ universal: { [predicateName]: () => true } });

            const predicate: Predicate = {
              args: [
                "Sunder Armor",
                { operator: ">=", threshold: 3, type: "comparison" },
                { operator: ">", threshold: { type: "duration", value: 5 }, type: "comparison" },
              ],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), true);
          });

          test(`${predicateName} throws error with non-string name`, () => {
            const registry = createMockRegistry();
            const predicate: Predicate = { args: [123], predicateName, type: "predicate" };
            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'name'`),
            );
          });

          test(`${predicateName} throws error with duration for count`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: ["Rend", { type: "duration", value: 5 }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'count'`),
            );
          });

          test(`${predicateName} throws error with percentage for count`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: ["Rend", { type: "percentage", value: 50 }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'count'`),
            );
          });

          test(`${predicateName} throws error with number for duration`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: ["Rend", 5, 10],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'duration'`),
            );
          });

          test(`${predicateName} throws error with percentage for duration`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: ["Rend", 5, { type: "percentage", value: 50 }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => {
                createPredicateFunction(registry, predicate, unit);
              },
              new RegExp(`Predicate '${predicateName}' got invalid argument 'duration'`),
            );
          });
        }
      });

      describe("comboPoints and level predicates", () => {
        const numberPredicates = ["comboPoints", "level"];

        for (const predicateName of numberPredicates) {
          test(`${predicateName} returns configured value`, () => {
            const registry = createMockRegistry({ universal: { [predicateName]: () => true } });

            const predicate: Predicate = {
              args: [3],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), true);
          });

          test(`${predicateName} works with comparison operators`, () => {
            const registry = createMockRegistry({ universal: { [predicateName]: () => false } });

            const predicate: Predicate = {
              args: [{ operator: ">=", threshold: 60, type: "comparison" }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };
            const predicateFunction = createPredicateFunction(registry, predicate, unit);

            equal(predicateFunction(mockContext), false);
          });

          test(`${predicateName} throws error without argument`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: [],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => createPredicateFunction(registry, predicate, unit),
              new RegExp(`Predicate '${predicateName}' got invalid argument`),
            );
          });

          test(`${predicateName} throws error with percentage argument`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: [{ type: "percentage", value: 50 }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => createPredicateFunction(registry, predicate, unit),
              new RegExp(`Predicate '${predicateName}' got invalid argument`),
            );
          });

          test(`${predicateName} throws error with duration argument`, () => {
            const registry = createMockRegistry();

            const predicate: Predicate = {
              args: [{ type: "duration", value: 5 }],
              predicateName,
              type: "predicate",
            };

            const unit: Unit = { unitId: "target" };

            throws(
              () => createPredicateFunction(registry, predicate, unit),
              new RegExp(`Predicate '${predicateName}' got invalid argument`),
            );
          });
        }
      });

      describe("creature predicate", () => {
        test("with valid creature type", () => {
          const registry = createMockRegistry({ universal: { creature: () => true } });

          const predicate: Predicate = {
            args: ["beast"],
            predicateName: "creature",
            type: "predicate",
          };

          const unit: Unit = { unitId: "target" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("throws error with invalid creature type", () => {
          const registry = createMockRegistry();

          const predicate: Predicate = {
            args: ["invalid"],
            predicateName: "creature",
            type: "predicate",
          };

          const unit: Unit = { unitId: "target" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'creature' got invalid argument 'type'/,
          );
        });
      });

      describe("resource predicates", () => {
        test("energy returns configured value", () => {
          const registry = createMockRegistry({ universal: { energy: () => true } });
          const predicate: Predicate = { args: [40], predicateName: "energy", type: "predicate" };
          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("rage returns configured value", () => {
          const registry = createMockRegistry({ universal: { rage: () => false } });
          const predicate: Predicate = { args: [30], predicateName: "rage", type: "predicate" };
          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), false);
        });

        test("health returns configured value", () => {
          const registry = createMockRegistry({ universal: { health: () => true } });

          const predicate: Predicate = {
            args: [{ type: "percentage", value: 50 }],
            predicateName: "health",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), true);
        });

        test("mana returns configured value", () => {
          const registry = createMockRegistry({ universal: { mana: () => false } });

          const predicate: Predicate = {
            args: [{ type: "percentage", value: 50 }],
            predicateName: "mana",
            type: "predicate",
          };

          const unit: Unit = { unitId: "player" };
          const predicateFunction = createPredicateFunction(registry, predicate, unit);

          equal(predicateFunction(mockContext), false);
        });

        test("energy throws error without argument", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [], predicateName: "energy", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'energy' got invalid argument 'amount'/,
          );
        });

        test("health throws error with non-percentage", () => {
          const registry = createMockRegistry();
          const predicate: Predicate = { args: [50], predicateName: "health", type: "predicate" };
          const unit: Unit = { unitId: "player" };

          throws(
            () => createPredicateFunction(registry, predicate, unit),
            /Predicate 'health' got invalid argument 'percentage'/,
          );
        });
      });
    });

    describe("unknown predicates", () => {
      test("throws error for unknown predicate", () => {
        const registry = createMockRegistry();

        const predicate: Predicate = {
          args: [],
          predicateName: "unknownPredicate",
          type: "predicate",
        };

        const unit: Unit = { unitId: "player" };

        throws(
          () => createPredicateFunction(registry, predicate, unit),
          /Unknown condition: 'unknownPredicate'/,
        );
      });
    });
  });
});
