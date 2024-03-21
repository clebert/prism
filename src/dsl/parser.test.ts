import { deepEqual, throws } from "node:assert/strict";
import { describe, test } from "node:test";
import { type Configuration, Parser } from "./parser";
import { success } from "./result";

describe("Parser", () => {
  describe("spell configurations", () => {
    test("parses multiple configurations", () => {
      const parser = new Parser('spell: "Fire"\nenabled: @target{alive}\n\nspell: "Ice"');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Fire",
            type: "spell",
            visualStates: {
              enabled: {
                condition: { args: [], predicateName: "alive", type: "predicate" },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
          { spellName: "Ice", type: "spell", visualStates: {} },
        ] satisfies Configuration[]),
      );
    });

    test("parses minimal spell configuration", () => {
      const parser = new Parser('spell: "Fireball"');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          { spellName: "Fireball", type: "spell", visualStates: {} },
        ] satisfies Configuration[]),
      );
    });

    test("parses spell with single visual state", () => {
      const parser = new Parser('spell: "Heal"\nenabled: @target:help{alive}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Heal",
            type: "spell",
            visualStates: {
              enabled: {
                condition: { args: [], predicateName: "alive", type: "predicate" },
                type: "scope",
                unit: { modifier: "help", unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses spell with all visual states", () => {
      const parser = new Parser(
        'spell: "Test Spell"\n' +
          "blocked: @player{indoors}\n" +
          "depleted: @player{mana(<20%)}\n" +
          "checked: @player{buff(infer)}\n" +
          "enabled: @target{alive & harm}\n" +
          "flashing: @player{rage(>90)}\n" +
          "glowing: @target{casting}",
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test Spell",
            type: "spell",
            visualStates: {
              blocked: {
                condition: { args: [], predicateName: "indoors", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
              checked: {
                condition: { args: ["infer"], predicateName: "buff", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
              depleted: {
                condition: {
                  args: [
                    {
                      operator: "<",
                      threshold: { type: "percentage", value: 20 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "mana",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
              enabled: {
                condition: {
                  conditions: [
                    { args: [], predicateName: "alive", type: "predicate" },
                    { args: [], predicateName: "harm", type: "predicate" },
                  ],
                  type: "and",
                },
                type: "scope",
                unit: { unitId: "target" },
              },
              flashing: {
                condition: {
                  args: [{ operator: ">", threshold: 90, type: "comparison" }],
                  predicateName: "rage",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
              glowing: {
                condition: { args: [], predicateName: "casting", type: "predicate" },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("item configurations", () => {
    test("parses single item ID", () => {
      const parser = new Parser("item: 118");
      const result = parser.parse();

      deepEqual(
        result,
        success([{ itemIds: [118], type: "item", visualStates: {} }] satisfies Configuration[]),
      );
    });

    test("parses multiple item IDs", () => {
      const parser = new Parser("item: 118, 858, 929");
      const result = parser.parse();

      deepEqual(
        result,
        success([
          { itemIds: [118, 858, 929], type: "item", visualStates: {} },
        ] satisfies Configuration[]),
      );
    });

    test("parses item with visual states", () => {
      const parser = new Parser("item: 118\nglowing: @player{health(<30%)}");
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            itemIds: [118],
            type: "item",
            visualStates: {
              glowing: {
                condition: {
                  args: [
                    {
                      operator: "<",
                      threshold: { type: "percentage", value: 30 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "health",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("comments", () => {
    test("ignores comments in all positions between visual states", () => {
      const parser = new Parser(
        'spell: "Test"\n' +
          "# Line comment after spell\n" +
          "blocked: @player{dead} # inline after visual state\n" +
          "# Line comment between states\n" +
          "depleted: @player{mana(<10)} # another inline\n" +
          "enabled: @target{exists} # inline before next state\n" +
          "glowing: @player{combat}",
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              blocked: {
                condition: { args: [], predicateName: "dead", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
              depleted: {
                condition: {
                  args: [{ operator: "<", threshold: 10, type: "comparison" }],
                  predicateName: "mana",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
              enabled: {
                condition: { args: [], predicateName: "exists", type: "predicate" },
                type: "scope",
                unit: { unitId: "target" },
              },
              glowing: {
                condition: { args: [], predicateName: "combat", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("ignores comments between configs", () => {
      const parser = new Parser(
        '# First comment\nspell: "Fire"\n# Between configs\nspell: "Ice" # inline',
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          { spellName: "Fire", type: "spell", visualStates: {} },
          { spellName: "Ice", type: "spell", visualStates: {} },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("units", () => {
    describe("basic units", () => {
      test("parses @player unit", () => {
        const parser = new Parser('spell: "Test"\nenabled: @player{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "player" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });

      test("parses @target unit", () => {
        const parser = new Parser('spell: "Test"\nenabled: @target{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "target" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });

      test("parses @pet unit", () => {
        const parser = new Parser('spell: "Test"\nenabled: @pet{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "pet" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });

      test("parses @mouseover unit", () => {
        const parser = new Parser('spell: "Test"\nenabled: @mouseover{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "mouseover" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });

      test("parses @focus unit", () => {
        const parser = new Parser('spell: "Test"\nenabled: @focus{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "focus" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });
    });

    describe("party and raid units", () => {
      test("parses @party units", () => {
        const parser = new Parser('spell: "Test"\nenabled: @party1{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "party1" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });

      test("parses @raid units", () => {
        const parser = new Parser('spell: "Test"\nenabled: @raid10{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { unitId: "raid10" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });
    });

    describe("unit modifiers", () => {
      test("parses :help modifier", () => {
        const parser = new Parser('spell: "Test"\nenabled: @target:help{alive}');
        const result = parser.parse();

        deepEqual(
          result,
          success([
            {
              spellName: "Test",
              type: "spell",
              visualStates: {
                enabled: {
                  condition: { args: [], predicateName: "alive", type: "predicate" },
                  type: "scope",
                  unit: { modifier: "help", unitId: "target" },
                },
              },
            },
          ] satisfies Configuration[]),
        );
      });
    });
  });

  describe("special values", () => {
    test("parses infer keyword", () => {
      const parser = new Parser('spell: "Test"\nchecked: @player{buff(infer)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              checked: {
                condition: { args: ["infer"], predicateName: "buff", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses always keyword", () => {
      const parser = new Parser('spell: "Test"\nglowing: @target:help{always}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              glowing: {
                condition: { args: [], predicateName: "always", type: "predicate" },
                type: "scope",
                unit: { modifier: "help", unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("boolean operators", () => {
    test("parses AND operator", () => {
      const parser = new Parser('spell: "Test"\nenabled: @target:help{alive & !casting}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  conditions: [
                    { args: [], predicateName: "alive", type: "predicate" },
                    {
                      condition: { args: [], predicateName: "casting", type: "predicate" },
                      type: "not",
                    },
                  ],
                  type: "and",
                },
                type: "scope",
                unit: { modifier: "help", unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses OR operator", () => {
      const parser = new Parser('spell: "Test"\nenabled: @pet{dead | missing}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  conditions: [
                    { args: [], predicateName: "dead", type: "predicate" },
                    { args: [], predicateName: "missing", type: "predicate" },
                  ],
                  type: "or",
                },
                type: "scope",
                unit: { unitId: "pet" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses NOT operator", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{!combat}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  condition: { args: [], predicateName: "combat", type: "predicate" },
                  type: "not",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses parentheses for grouping", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{(alive & combat) | resting}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  conditions: [
                    {
                      conditions: [
                        { args: [], predicateName: "alive", type: "predicate" },
                        { args: [], predicateName: "combat", type: "predicate" },
                      ],
                      type: "and",
                    },
                    { args: [], predicateName: "resting", type: "predicate" },
                  ],
                  type: "or",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("handles operator precedence (AND before OR)", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{alive & combat | resting}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  conditions: [
                    {
                      conditions: [
                        { args: [], predicateName: "alive", type: "predicate" },
                        { args: [], predicateName: "combat", type: "predicate" },
                      ],
                      type: "and",
                    },
                    { args: [], predicateName: "resting", type: "predicate" },
                  ],
                  type: "or",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("numeric values", () => {
    test("parses plain number without comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{comboPoints(5)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: { args: [5], predicateName: "comboPoints", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses plain number with > comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{rage(>50)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ operator: ">", threshold: 50, type: "comparison" }],
                  predicateName: "rage",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses plain number with < comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{energy(<30)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ operator: "<", threshold: 30, type: "comparison" }],
                  predicateName: "energy",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses plain number with >= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{comboPoints(>=4)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ operator: ">=", threshold: 4, type: "comparison" }],
                  predicateName: "comboPoints",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses plain number with <= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{ammo(<=50)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ operator: "<=", threshold: 50, type: "comparison" }],
                  predicateName: "ammo",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses percentage without comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(50%)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ type: "percentage", value: 50 }],
                  predicateName: "health",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses percentage with < comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(<30%)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: "<",
                      threshold: { type: "percentage", value: 30 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "health",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses percentage with > comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{mana(>80%)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: ">",
                      threshold: { type: "percentage", value: 80 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "mana",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses percentage with <= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(<=20%)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: "<=",
                      threshold: { type: "percentage", value: 20 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "health",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses percentage with >= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(>=90%)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: ">=",
                      threshold: { type: "percentage", value: 90 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "health",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses duration without comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{falling(2s)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [{ type: "duration", value: 2 }],
                  predicateName: "falling",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses duration with > comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @target{casting(>2s)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: ">",
                      threshold: { type: "duration", value: 2 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "casting",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses duration with < comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{buff("Shield Wall", <5s)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    "Shield Wall",
                    {
                      operator: "<",
                      threshold: { type: "duration", value: 5 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "buff",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses duration with >= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{falling(>=3s)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    {
                      operator: ">=",
                      threshold: { type: "duration", value: 3 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "falling",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses duration with <= comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @target{debuff("Stun", <=1s)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    "Stun",
                    {
                      operator: "<=",
                      threshold: { type: "duration", value: 1 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "debuff",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("conditions with unit references", () => {
    test("parses condition with @unit argument", () => {
      const parser = new Parser('spell: "Test"\nenabled: @target{targeting(@player)}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: { args: ["player"], predicateName: "targeting", type: "predicate" },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses condition with multiple arguments", () => {
      const parser = new Parser(
        'spell: "Test"\nenabled: @target{ownDebuff("Sunder Armor", 5, >5s)}',
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                condition: {
                  args: [
                    "Sunder Armor",
                    5,
                    {
                      operator: ">",
                      threshold: { type: "duration", value: 5 },
                      type: "comparison",
                    },
                  ],
                  predicateName: "ownDebuff",
                  type: "predicate",
                },
                type: "scope",
                unit: { unitId: "target" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("error cases", () => {
    test("rejects non-canonical visual state order", () => {
      const parser = new Parser('spell: "Test"\nglowing: @player{alive}\nblocked: @player{dead}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected configuration");
    });

    test("rejects missing keyword in unit position", () => {
      const parser = new Parser('spell: "Test"\nenabled: @123{alive}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected keyword");
    });

    test("rejects missing number in comparison", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(>abc)}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected number");
    });

    test("rejects missing string for spell name", () => {
      const parser = new Parser("spell: 123");
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected string");
    });

    test("rejects invalid unit modifier", () => {
      const parser = new Parser('spell: "Test"\nenabled: @target:invalid{alive}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected keyword 'help'");
    });

    test("rejects missing opening brace", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player alive');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol '{'");
    });

    test("rejects missing closing brace", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{alive');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol '}'");
    });

    test("rejects missing closing parenthesis in condition", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{health(50%');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol ')'");
    });

    test("rejects missing @ symbol", () => {
      const parser = new Parser('spell: "Test"\nenabled: player{alive}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol '@'");
    });

    test("rejects missing colon after spell keyword", () => {
      const parser = new Parser('spell "Test"');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol ':'");
    });

    test("rejects missing closing parenthesis in rule", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{alive} & (@target{dead}');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected symbol ')'");
    });

    test("rejects non-integer for item ID", () => {
      const parser = new Parser("item: 123.5");
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Expected integer");
    });

    test("handles tokenizer error for unterminated string", () => {
      const parser = new Parser('spell: "unterminated');
      const result = parser.parse();

      deepEqual(result.success, false);
      deepEqual(result.reason, "Unterminated string - missing closing quote");
    });

    test("handles unexpected errors gracefully", () => {
      const parser = new Parser('spell: "Test"');
      const error = new TypeError("Unexpected error for branch coverage");

      // biome-ignore lint/suspicious/noExplicitAny: override parseConfiguration to throw an unexpected error
      (parser as any).parseConfiguration = () => {
        throw error;
      };

      throws(() => parser.parse(), error);
    });

    test("successfully parses visual states in canonical order", () => {
      const parser = new Parser('spell: "Test"\nblocked: @player{dead}\nglowing: @player{alive}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              blocked: {
                condition: { args: [], predicateName: "dead", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
              glowing: {
                condition: { args: [], predicateName: "alive", type: "predicate" },
                type: "scope",
                unit: { unitId: "player" },
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("handles empty input", () => {
      const parser = new Parser("");
      const result = parser.parse();

      deepEqual(result, success([]));
    });

    test("handles whitespace-only input", () => {
      const parser = new Parser("  \n\t  ");
      const result = parser.parse();

      deepEqual(result, success([]));
    });
  });

  describe("complex rule combinations", () => {
    test("parses parentheses within compound expression", () => {
      const parser = new Parser(
        'spell: "Test"\nenabled: @player{alive} & (@target{exists} | @pet{dead})',
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                rules: [
                  {
                    condition: { args: [], predicateName: "alive", type: "predicate" },
                    type: "scope",
                    unit: { unitId: "player" },
                  },
                  {
                    rules: [
                      {
                        condition: { args: [], predicateName: "exists", type: "predicate" },
                        type: "scope",
                        unit: { unitId: "target" },
                      },
                      {
                        condition: { args: [], predicateName: "dead", type: "predicate" },
                        type: "scope",
                        unit: { unitId: "pet" },
                      },
                    ],
                    type: "or",
                  },
                ],
                type: "and",
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses parentheses around entire rule expression", () => {
      const parser = new Parser('spell: "Test"\nenabled: (@player{alive} & @target{exists})');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                rules: [
                  {
                    condition: { args: [], predicateName: "alive", type: "predicate" },
                    type: "scope",
                    unit: { unitId: "player" },
                  },
                  {
                    condition: { args: [], predicateName: "exists", type: "predicate" },
                    type: "scope",
                    unit: { unitId: "target" },
                  },
                ],
                type: "and",
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });

  describe("multiple scopes", () => {
    test("parses OR of multiple scopes", () => {
      const parser = new Parser(
        'spell: "Test"\nenabled: @target{alive & harm} | @target:help{dead}',
      );

      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                rules: [
                  {
                    condition: {
                      conditions: [
                        { args: [], predicateName: "alive", type: "predicate" },
                        { args: [], predicateName: "harm", type: "predicate" },
                      ],
                      type: "and",
                    },
                    type: "scope",
                    unit: { unitId: "target" },
                  },
                  {
                    condition: { args: [], predicateName: "dead", type: "predicate" },
                    type: "scope",
                    unit: { modifier: "help", unitId: "target" },
                  },
                ],
                type: "or",
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });

    test("parses AND of multiple scopes", () => {
      const parser = new Parser('spell: "Test"\nenabled: @player{alive} & @target{exists}');
      const result = parser.parse();

      deepEqual(
        result,
        success([
          {
            spellName: "Test",
            type: "spell",
            visualStates: {
              enabled: {
                rules: [
                  {
                    condition: { args: [], predicateName: "alive", type: "predicate" },
                    type: "scope",
                    unit: { unitId: "player" },
                  },
                  {
                    condition: { args: [], predicateName: "exists", type: "predicate" },
                    type: "scope",
                    unit: { unitId: "target" },
                  },
                ],
                type: "and",
              },
            },
          },
        ] satisfies Configuration[]),
      );
    });
  });
});
