import { type Failure, failure, type Result, success } from "./result";
import { type Token, Tokenizer } from "./tokenizer";

export type Configuration = SpellConfiguration | ItemConfiguration;

export interface SpellConfiguration {
  readonly type: "spell";
  readonly spellName: string;
  readonly visualStates: VisualStates;
}

export interface ItemConfiguration {
  readonly type: "item";
  readonly itemIds: readonly number[];
  readonly visualStates: VisualStates;
}

export interface VisualStates {
  readonly blocked?: Rule;
  readonly depleted?: Rule;
  readonly checked?: Rule;
  readonly enabled?: Rule;
  readonly flashing?: Rule;
  readonly glowing?: Rule;
}

export type Rule = RuleOr | RuleAnd | Scope;

export interface RuleOr {
  readonly type: "or";
  readonly rules: readonly Rule[];
}

export interface RuleAnd {
  readonly type: "and";
  readonly rules: readonly Rule[];
}

export interface Scope {
  readonly type: "scope";
  readonly unit: Unit;
  readonly condition: Condition;
}

export interface Unit {
  readonly unitId: string;
  readonly modifier?: "help";
}

export type Condition = ConditionOr | ConditionAnd | ConditionNot | Predicate;

export interface ConditionOr {
  readonly type: "or";
  readonly conditions: readonly Condition[];
}

export interface ConditionAnd {
  readonly type: "and";
  readonly conditions: readonly Condition[];
}

export interface ConditionNot {
  readonly type: "not";
  readonly condition: Condition;
}

export interface Predicate {
  readonly type: "predicate";
  readonly predicateName: string;
  readonly args: readonly Argument[];
}

export type Argument = number | string | Comparison | Duration | Percentage;

export interface Comparison {
  readonly type: "comparison";
  readonly operator: ComparisonOperator;
  readonly threshold: number | Duration | Percentage;
}

export type ComparisonOperator = "<" | "<=" | ">" | ">=";

export interface Duration {
  readonly type: "duration";
  readonly value: number;
}

export interface Percentage {
  readonly type: "percentage";
  readonly value: number;
}

export class Parser {
  private readonly tokenizer: Tokenizer;

  private currentToken: Token | undefined;

  constructor(input: string) {
    this.tokenizer = new Tokenizer(input);

    this.consumeAny();
  }

  parse(): Result<Configuration[]> {
    try {
      const configurations: Configuration[] = [];

      while (this.currentToken) {
        configurations.push(this.parseConfiguration());
      }

      return success(configurations);
    } catch (error) {
      if (error instanceof ParseError) {
        return error.result;
      }

      throw error;
    }
  }

  private parseConfiguration(): Configuration {
    const configuration = this.parseSpellConfiguration() ?? this.parseItemConfiguration();

    if (!configuration) {
      throw new ParseError(failure("Expected configuration", this.currentToken?.position));
    }

    return configuration;
  }

  private parseSpellConfiguration(): SpellConfiguration | undefined {
    if (!this.tryConsumeKeyword("spell")) {
      return;
    }

    this.consumeSymbol(":");

    const spellName = this.consumeAnyString();

    return { spellName, type: "spell", visualStates: this.parseVisualStates() };
  }

  private parseItemConfiguration(): ItemConfiguration | undefined {
    if (!this.tryConsumeKeyword("item")) {
      return;
    }

    this.consumeSymbol(":");

    const itemIds = [this.consumeAnyInteger()];

    while (this.tryConsumeSymbol(",")) {
      itemIds.push(this.consumeAnyInteger());
    }

    return { itemIds, type: "item", visualStates: this.parseVisualStates() };
  }

  private parseVisualStates(): VisualStates {
    const visualStates: Partial<Record<keyof VisualStates, Rule>> = {};

    for (const keyword of [
      "blocked",
      "depleted",
      "checked",
      "enabled",
      "flashing",
      "glowing",
    ] as const) {
      if (this.tryConsumeKeyword(keyword)) {
        this.consumeSymbol(":");

        visualStates[keyword] = this.parseRule();
      }
    }

    return visualStates;
  }

  private parseRule(): Rule {
    return this.parseRuleOr();
  }

  private parseRuleOr(): Rule {
    const rules: [Rule, ...Rule[]] = [this.parseRuleAnd()];

    while (this.tryConsumeSymbol("|")) {
      rules.push(this.parseRuleAnd());
    }

    if (rules.length === 1) {
      return rules[0];
    }

    return { rules, type: "or" };
  }

  private parseRuleAnd(): Rule {
    const rules: [Rule, ...Rule[]] = [this.parseRuleUnary()];

    while (this.tryConsumeSymbol("&")) {
      rules.push(this.parseRuleUnary());
    }

    if (rules.length === 1) {
      return rules[0];
    }

    return { rules, type: "and" };
  }

  private parseRuleUnary(): Rule {
    if (this.tryConsumeSymbol("(")) {
      const rule = this.parseRule();

      this.consumeSymbol(")");

      return rule;
    }

    return this.parseScope();
  }

  private parseScope(): Scope {
    this.consumeSymbol("@");

    const unitId = this.consumeAnyKeyword();

    let modifier: "help" | undefined;

    if (this.tryConsumeSymbol(":")) {
      modifier = this.consumeKeyword("help");
    }

    this.consumeSymbol("{");

    const condition = this.parseCondition();

    this.consumeSymbol("}");

    return { condition, type: "scope", unit: modifier ? { modifier, unitId } : { unitId } };
  }

  private parseCondition(): Condition {
    return this.parseConditionOr();
  }

  private parseConditionOr(): Condition {
    const conditions: [Condition, ...Condition[]] = [this.parseConditionAnd()];

    while (this.tryConsumeSymbol("|")) {
      conditions.push(this.parseConditionAnd());
    }

    if (conditions.length === 1) {
      return conditions[0];
    }

    return { conditions, type: "or" };
  }

  private parseConditionAnd(): Condition {
    const conditions: [Condition, ...Condition[]] = [this.parseConditionUnary()];

    while (this.tryConsumeSymbol("&")) {
      conditions.push(this.parseConditionUnary());
    }

    if (conditions.length === 1) {
      return conditions[0];
    }

    return { conditions, type: "and" };
  }

  private parseConditionUnary(): Condition {
    if (this.tryConsumeSymbol("!")) {
      return { condition: this.parseConditionUnary(), type: "not" };
    }

    if (this.tryConsumeSymbol("(")) {
      const condition = this.parseCondition();

      this.consumeSymbol(")");

      return condition;
    }

    return this.parsePredicate();
  }

  private parsePredicate(): Predicate {
    const predicateName = this.consumeAnyKeyword();
    const args: Argument[] = [];

    if (this.tryConsumeSymbol("(")) {
      args.push(this.parseArgument());

      while (this.tryConsumeSymbol(",")) {
        args.push(this.parseArgument());
      }

      this.consumeSymbol(")");
    }

    return { args, predicateName, type: "predicate" };
  }

  private parseArgument(): Argument {
    const operatorResult = this.tryConsumeSymbol("<", "<=", ">", ">=");

    if (operatorResult) {
      const operator = operatorResult.value;
      const value = this.consumeAnyNumber();

      if (this.tryConsumeSymbol("%")) {
        return { operator, threshold: { type: "percentage", value }, type: "comparison" };
      }

      if (this.tryConsumeKeyword("s")) {
        return { operator, threshold: { type: "duration", value }, type: "comparison" };
      }

      return { operator, threshold: value, type: "comparison" };
    }

    const stringResult = this.tryConsumeAnyString();

    if (stringResult) {
      return stringResult.value;
    }

    const numberResult = this.tryConsumeAnyNumber();

    if (numberResult) {
      if (this.tryConsumeSymbol("%")) {
        return { type: "percentage", value: numberResult.value };
      }

      if (this.tryConsumeKeyword("s")) {
        return { type: "duration", value: numberResult.value };
      }

      return numberResult.value;
    }

    if (this.tryConsumeSymbol("@")) {
      return this.consumeAnyKeyword();
    }

    return this.consumeAnyKeyword();
  }

  private consumeAny(): number | string | undefined {
    const value = this.currentToken?.value;

    do {
      const result = this.tokenizer.next();

      this.currentToken = undefined;

      if (!result) {
        break;
      }

      if (!result.success) {
        throw new ParseError(result);
      }

      this.currentToken = result.data;
    } while (this.currentToken.type === "comment");

    return value;
  }

  private consumeAnyInteger(): number {
    if (this.currentToken?.type !== "number" || !Number.isInteger(this.currentToken.value)) {
      throw new ParseError(failure("Expected integer", this.currentToken?.position));
    }

    return this.consumeAny() as number;
  }

  private consumeAnyKeyword(): string {
    if (this.currentToken?.type !== "keyword") {
      throw new ParseError(failure("Expected keyword", this.currentToken?.position));
    }

    return this.consumeAny() as string;
  }

  private consumeAnyNumber(): number {
    if (this.currentToken?.type !== "number") {
      throw new ParseError(failure("Expected number", this.currentToken?.position));
    }

    return this.consumeAny() as number;
  }

  private consumeAnyString(): string {
    if (!this.currentToken || this.currentToken.type !== "string") {
      throw new ParseError(failure("Expected string", this.currentToken?.position));
    }

    return this.consumeAny() as string;
  }

  private consumeKeyword<TValue extends string>(...values: readonly [TValue, ...TValue[]]): TValue {
    if (
      this.currentToken?.type !== "keyword" ||
      !values.includes(this.currentToken.value as TValue)
    ) {
      throw new ParseError(
        failure(
          `Expected keyword ${values.map((value) => `'${value}'`).join(" or ")}`,
          this.currentToken?.position,
        ),
      );
    }

    return this.consumeAny() as TValue;
  }

  private consumeSymbol(value: string): void {
    if (this.currentToken?.type !== "symbol" || this.currentToken.value !== value) {
      throw new ParseError(failure(`Expected symbol '${value}'`, this.currentToken?.position));
    }

    this.consumeAny();
  }

  private tryConsumeAnyNumber(): { value: number } | false {
    return this.currentToken?.type === "number" ? { value: this.consumeAny() as number } : false;
  }

  private tryConsumeAnyString(): { value: string } | false {
    return this.currentToken?.type === "string" ? { value: this.consumeAny() as string } : false;
  }

  private tryConsumeKeyword(value: string): boolean {
    if (this.currentToken?.type !== "keyword" || this.currentToken.value !== value) {
      return false;
    }

    this.consumeAny();

    return true;
  }

  private tryConsumeSymbol<TValue extends string>(
    ...values: readonly [TValue, ...TValue[]]
  ): { value: TValue } | false {
    return this.currentToken?.type === "symbol" &&
      values.includes(this.currentToken.value as TValue)
      ? { value: this.consumeAny() as TValue }
      : false;
  }
}

class ParseError extends Error {
  readonly result: Failure;

  constructor(result: Failure) {
    super();

    this.result = result;
  }
}
