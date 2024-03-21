import { createComparisonFunction } from "./comparison-function";
import { isCreatureType } from "./creature-type";
import { isDruidForm } from "./druid-form";
import { isEquipmentType } from "./equipment-type";
import type { Argument, Condition, Predicate, Rule, Unit } from "./parser";
import type {
  PetPredicates,
  PlayerPredicates,
  PredicateRegistry,
  UniversalPredicates,
} from "./predicate-registry";

export type RuleFunction = (context: RuleFunctionContext) => boolean;

export interface RuleFunctionContext {
  readonly actionSlotId: number;
  readonly spellName: string | undefined;
}

export function createRuleFunction(registry: PredicateRegistry, rule: Rule): RuleFunction {
  switch (rule.type) {
    case "or": {
      const ruleFunctions = rule.rules.map((otherRule) => createRuleFunction(registry, otherRule));

      return (context: RuleFunctionContext) =>
        ruleFunctions.some((ruleFunction) => ruleFunction(context));
    }
    case "and": {
      const ruleFunctions = rule.rules.map((otherRule) => createRuleFunction(registry, otherRule));

      return (context: RuleFunctionContext) =>
        ruleFunctions.every((ruleFunction) => ruleFunction(context));
    }
    case "scope": {
      return createConditionFunction(registry, rule.condition, rule.unit);
    }
  }
}

export function createConditionFunction(
  registry: PredicateRegistry,
  condition: Condition,
  unit: Unit,
): RuleFunction {
  switch (condition.type) {
    case "or": {
      const conditionFunctions = condition.conditions.map((otherCondition) =>
        createConditionFunction(registry, otherCondition, unit),
      );

      return (context: RuleFunctionContext) =>
        conditionFunctions.some((conditionFunction) => conditionFunction(context));
    }
    case "and": {
      const conditionFunctions = condition.conditions.map((otherCondition) =>
        createConditionFunction(registry, otherCondition, unit),
      );

      return (context: RuleFunctionContext) =>
        conditionFunctions.every((conditionFunction) => conditionFunction(context));
    }
    case "not": {
      const conditionFunction = createConditionFunction(registry, condition.condition, unit);

      return (context: RuleFunctionContext) => !conditionFunction(context);
    }
    case "predicate": {
      return createPredicateFunction(registry, condition, unit);
    }
  }
}

export function createPredicateFunction(
  registry: PredicateRegistry,
  predicate: Predicate,
  unit: Unit,
): RuleFunction {
  const { args, predicateName } = predicate;

  if (predicateName === "always") {
    return () => true;
  }

  if (predicateName in registry.pet) {
    if (unit.unitId !== "pet") {
      throw new Error(`Predicate '${predicateName}' requires @pet unit scope`);
    }

    return createPetPredicateFunction(registry, predicateName as keyof PetPredicates, args);
  }

  if (predicateName in registry.player) {
    if (unit.unitId !== "player") {
      throw new Error(`Predicate '${predicateName}' requires @player unit scope`);
    }

    return createPlayerPredicateFunction(registry, predicateName as keyof PlayerPredicates, args);
  }

  if (predicateName in registry.universal) {
    return createUniversalPredicateFunction(
      registry,
      predicateName as keyof UniversalPredicates,
      unit,
      args,
    );
  }

  throw new Error(`Unknown condition: '${predicateName}'`);
}

function createPetPredicateFunction(
  registry: PredicateRegistry,
  predicateName: keyof PetPredicates,
  args: readonly Argument[],
): RuleFunction {
  switch (predicateName) {
    case "happy": {
      assertNoArgs(args, predicateName);

      return () => registry.pet[predicateName]();
    }
  }
}

function createPlayerPredicateFunction(
  registry: PredicateRegistry,
  predicateName: keyof PlayerPredicates,
  args: readonly Argument[],
): RuleFunction {
  switch (predicateName) {
    case "ammo": {
      const amount = getOptionalNumericArgument("number", args[0], predicateName, "amount");

      return () => registry.player[predicateName](amount);
    }
    case "autoShooting":
    case "grouped":
    case "indoors":
    case "meleeAttacking":
    case "mounted":
    case "outdoors":
    case "rageSafe":
    case "resting":
    case "stealthed":
    case "submerged":
    case "swimming": {
      assertNoArgs(args, predicateName);

      return () => registry.player[predicateName]();
    }
    case "canShiftBackFrom":
    case "canShiftInto": {
      const target = getRequiredStringArgument(args[0], predicateName, "target");

      if (!isDruidForm(target)) {
        throw new Error(`Predicate '${predicateName}' got invalid argument 'target'`);
      }

      return ({ actionSlotId }) => registry.player[predicateName](actionSlotId, target);
    }
    case "druidForm": {
      const target = getRequiredStringArgument(args[0], predicateName, "target");

      if (!isDruidForm(target)) {
        throw new Error(`Predicate '${predicateName}' got invalid argument 'target'`);
      }

      return () => registry.player[predicateName](target);
    }
    case "usable": {
      const keyword = getRequiredStringArgument(args[0], predicateName, "infer");

      if (keyword !== "infer") {
        throw new Error(`Predicate '${predicateName}' got invalid argument 'infer'`);
      }

      return ({ actionSlotId }) => registry.player[predicateName](actionSlotId);
    }
    case "equipped": {
      const type = getRequiredStringArgument(args[0], predicateName, "type");

      if (!isEquipmentType(type)) {
        throw new Error(`Predicate '${predicateName}' got invalid argument 'type'`);
      }

      return () => registry.player[predicateName](type);
    }
    case "falling":
    case "running": {
      const duration = getOptionalNumericArgument("duration", args[0], predicateName, "duration");

      return () => registry.player[predicateName](duration);
    }
    case "form":
    case "stance": {
      const number = getRequiredNumericArgument("number", args[0], predicateName, "number");

      return () => registry.player[predicateName](number);
    }
    case "itemCount": {
      const itemId = getRequiredNumberValue(args[0], predicateName, "itemId");
      const amount = getRequiredNumericArgument("number", args[1], predicateName, "amount");

      return () => registry.player[predicateName](itemId, amount);
    }
    case "talent": {
      const talentName = getRequiredStringArgument(args[0], predicateName, "name");
      const rank = getOptionalNumericArgument("number", args[1], predicateName, "rank");

      return () => registry.player[predicateName](talentName, rank);
    }
  }
}

function createUniversalPredicateFunction(
  registry: PredicateRegistry,
  predicateName: keyof UniversalPredicates,
  unit: Unit,
  args: readonly Argument[],
): RuleFunction {
  switch (predicateName) {
    case "alive":
    case "bleedable":
    case "blocked":
    case "casting":
    case "combat":
    case "cursed":
    case "dead":
    case "diseased":
    case "dodged":
    case "elite":
    case "existing":
    case "harm":
    case "help":
    case "magicBuff":
    case "magicDebuff":
    case "missing":
    case "npc":
    case "parried":
    case "partyMember":
    case "poisoned":
    case "trivial": {
      assertNoArgs(args, predicateName);

      return () => registry.universal[predicateName](unit);
    }
    case "attacking":
    case "is":
    case "targeting": {
      const targetUnitId = getRequiredStringArgument(args[0], predicateName, "@unit");

      return () => registry.universal[predicateName](unit, targetUnitId);
    }
    case "buff":
    case "debuff":
    case "ownBuff":
    case "ownDebuff": {
      const auraName = getRequiredStringArgument(args[0], predicateName, "name");
      const count = getOptionalNumericArgument("number", args[1], predicateName, "count");
      const duration = getOptionalNumericArgument("duration", args[2], predicateName, "duration");

      return (context) => {
        const { spellName } = context;

        if (auraName === "infer" && spellName === undefined) {
          return false;
        }

        return registry.universal[predicateName](
          unit,
          auraName === "infer" ? (context.spellName as string) : auraName,
          count,
          duration,
        );
      };
    }
    case "comboPoints": {
      const number = getRequiredNumericArgument("number", args[0], predicateName, "number");

      return () => registry.universal[predicateName](unit, number);
    }
    case "creature": {
      const type = getRequiredStringArgument(args[0], predicateName, "type");

      if (!isCreatureType(type)) {
        throw new Error(`Predicate '${predicateName}' got invalid argument 'type'`);
      }

      return () => registry.universal[predicateName](unit, type);
    }
    case "energy":
    case "rage": {
      const amount = getRequiredNumericArgument("number", args[0], predicateName, "amount");

      return () => registry.universal[predicateName](unit, amount);
    }
    case "health":
    case "mana": {
      const percentage = getRequiredNumericArgument(
        "percentage",
        args[0],
        predicateName,
        "percentage",
      );

      return () => registry.universal[predicateName](unit, percentage);
    }
    case "level": {
      const level = getRequiredNumericArgument("number", args[0], predicateName, "level");

      return () => registry.universal[predicateName](unit, level);
    }
  }
}

function assertNoArgs(args: readonly Argument[], predicateName: string): void {
  if (args.length > 0) {
    throw new Error(`Predicate '${predicateName}' takes no arguments`);
  }
}

function getRequiredNumericArgument<TType extends "number" | "duration" | "percentage">(
  expectedType: TType,
  value: Argument | undefined,
  predicateName: string,
  argName: string,
) {
  const comparisonFunction =
    value === undefined || typeof value === "string"
      ? undefined
      : typeof value === "object" && value.type === "comparison"
        ? createComparisonFunction(expectedType, value.operator, value.threshold)
        : createComparisonFunction(expectedType, "==", value);

  if (!comparisonFunction) {
    throw new Error(`Predicate '${predicateName}' got invalid argument '${argName}'`);
  }

  return comparisonFunction;
}

function getOptionalNumericArgument<TType extends "number" | "duration" | "percentage">(
  expectedType: TType,
  value: Argument | undefined,
  predicateName: string,
  argName: string,
) {
  return value !== undefined
    ? getRequiredNumericArgument(expectedType, value, predicateName, argName)
    : undefined;
}

function getRequiredNumberValue(
  value: Argument | undefined,
  predicateName: string,
  argName: string,
): number {
  if (typeof value === "number") {
    return value;
  }

  throw new Error(`Predicate '${predicateName}' got invalid argument '${argName}'`);
}

function getRequiredStringArgument(
  value: Argument | undefined,
  predicateName: string,
  argName: string,
): string {
  if (typeof value === "string") {
    return value;
  }

  throw new Error(`Predicate '${predicateName}' got invalid argument '${argName}'`);
}
