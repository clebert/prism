import type { Configuration, VisualStates } from "./parser";
import type { PredicateRegistry } from "./predicate-registry";
import type { RuleFunction } from "./rule-function";
import { createRuleFunction } from "./rule-function";

export type ButtonBehaviorMap = ReadonlyMap<number | string, ButtonBehavior>;

export interface ButtonBehavior {
  readonly blocked?: RuleFunction | undefined;
  readonly checked?: RuleFunction | undefined;
  readonly depleted?: RuleFunction | undefined;
  readonly enabled?: RuleFunction | undefined;
  readonly flashing?: RuleFunction | undefined;
  readonly glowing?: RuleFunction | undefined;
}

export function createButtonBehaviors(
  registry: PredicateRegistry,
  ...configurations: readonly Configuration[]
): ButtonBehaviorMap {
  const map = new Map<number | string, ButtonBehavior>();

  for (const configuration of configurations) {
    const buttonBehavior = createButtonBehavior(registry, configuration.visualStates);

    if (configuration.type === "item") {
      for (const itemId of configuration.itemIds) {
        if (map.has(itemId)) {
          throw new Error(`Duplicate item declaration: ${itemId}`);
        }

        map.set(itemId, buttonBehavior);
      }
    } else {
      if (map.has(configuration.spellName)) {
        throw new Error(`Duplicate spell declaration: '${configuration.spellName}'`);
      }

      map.set(configuration.spellName, buttonBehavior);
    }
  }

  return map;
}

function createButtonBehavior(
  registry: PredicateRegistry,
  { blocked, checked, depleted, enabled, flashing, glowing }: VisualStates,
): ButtonBehavior {
  return {
    blocked: blocked && createRuleFunction(registry, blocked),
    checked: checked && createRuleFunction(registry, checked),
    depleted: depleted && createRuleFunction(registry, depleted),
    enabled: enabled && createRuleFunction(registry, enabled),
    flashing: flashing && createRuleFunction(registry, flashing),
    glowing: glowing && createRuleFunction(registry, glowing),
  };
}
