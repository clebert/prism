export interface LuaTable {
  readonly fields: ReadonlyMap<string, LuaValue>;
  readonly items: readonly LuaValue[];
}

export interface LuaReference {
  readonly expression: string;
  readonly type: "reference";
}

export type LuaValue = boolean | LuaReference | LuaTable | null | number | string;

interface Token {
  readonly offset: number;
  readonly type: "identifier" | "number" | "string" | "symbol";
  readonly value: string;
}

export function isLuaTable(value: LuaValue | undefined): value is LuaTable {
  return typeof value === "object" && value !== null && "fields" in value;
}

export function parseLuaDocumentationTable(source: string, sourceName: string): LuaTable {
  return new LuaTableParser(tokenize(source, sourceName), sourceName).parse();
}

class LuaTableParser {
  private position = 0;
  private readonly sourceName: string;
  private readonly tokens: readonly Token[];

  public constructor(tokens: readonly Token[], sourceName: string) {
    this.tokens = tokens;
    this.sourceName = sourceName;
  }

  public parse(): LuaTable {
    while (this.current() !== undefined) {
      if (this.current()?.value === "=" && this.peek()?.value === "{") {
        this.position += 1;
        return this.parseTable();
      }
      this.position += 1;
    }

    throw new Error(`${this.sourceName}: The documentation table assignment is missing.`);
  }

  private parseTable(): LuaTable {
    this.expect("{");
    const fields = new Map<string, LuaValue>();
    const items: LuaValue[] = [];

    while (this.current()?.value !== "}") {
      const token = this.current();
      if (token === undefined) {
        throw new Error(`${this.sourceName}: The documentation table is not closed.`);
      }

      if (token.type === "identifier" && this.peek()?.value === "=") {
        this.position += 2;
        fields.set(token.value, this.parseValue());
      } else {
        items.push(this.parseValue());
      }

      if (this.current()?.value === "," || this.current()?.value === ";") {
        this.position += 1;
      } else if (this.current()?.value !== "}") {
        this.fail("Expected a table separator.");
      }
    }

    this.expect("}");
    return { fields, items };
  }

  private parseValue(): LuaValue {
    const token = this.current();
    if (token === undefined) {
      this.fail("Expected a value.");
    }

    if (token.value === "{") {
      return this.parseTable();
    }

    if (token.type === "string") {
      this.position += 1;
      return token.value;
    }

    if (token.type === "number") {
      this.position += 1;
      return parseNumber(token.value, this.sourceName, token.offset);
    }

    if (token.value === "-" && this.peek()?.type === "number") {
      this.position += 1;
      const numberToken = this.current();
      if (numberToken === undefined) {
        this.fail("Expected a number after the minus sign.");
      }
      this.position += 1;
      return -parseNumber(numberToken.value, this.sourceName, numberToken.offset);
    }

    if (token.type === "identifier") {
      if (token.value === "false") {
        this.position += 1;
        return false;
      }
      if (token.value === "nil") {
        this.position += 1;
        return null;
      }
      if (token.value === "true") {
        this.position += 1;
        return true;
      }
    }

    return this.parseReference();
  }

  private parseReference(): LuaReference {
    const expressionTokens: Token[] = [];
    let parenthesisDepth = 0;
    let bracketDepth = 0;

    while (true) {
      const token = this.current();
      if (token === undefined) {
        break;
      }

      const isSeparator = token.value === "," || token.value === ";" || token.value === "}";
      if (isSeparator && parenthesisDepth === 0 && bracketDepth === 0) {
        break;
      }

      if (token.value === "(") {
        parenthesisDepth += 1;
      } else if (token.value === ")") {
        parenthesisDepth -= 1;
      } else if (token.value === "[") {
        bracketDepth += 1;
      } else if (token.value === "]") {
        bracketDepth -= 1;
      }

      expressionTokens.push(token);
      this.position += 1;
    }

    if (expressionTokens.length === 0) {
      this.fail("Expected a value.");
    }

    return {
      expression: expressionTokens.map((token) => token.value).join(""),
      type: "reference",
    };
  }

  private current(): Token | undefined {
    return this.tokens[this.position];
  }

  private peek(): Token | undefined {
    return this.tokens[this.position + 1];
  }

  private expect(value: string): void {
    if (this.current()?.value !== value) {
      this.fail(`Expected ${value}.`);
    }
    this.position += 1;
  }

  private fail(message: string): never {
    const token = this.current();
    const location = token === undefined ? "at the end of the file" : `at offset ${token.offset}`;
    throw new Error(`${this.sourceName}: ${message} The error is ${location}.`);
  }
}

function tokenize(source: string, sourceName: string): readonly Token[] {
  const tokens: Token[] = [];
  let offset = 0;

  while (offset < source.length) {
    const character = source.charAt(offset);

    if (/\s/u.test(character)) {
      offset += 1;
      continue;
    }

    if (source.startsWith("--[[", offset)) {
      const commentEnd = source.indexOf("]]", offset + 4);
      if (commentEnd === -1) {
        throw new Error(`${sourceName}: A block comment at offset ${offset} is not closed.`);
      }
      offset = commentEnd + 2;
      continue;
    }

    if (source.startsWith("--", offset)) {
      const lineEnd = source.indexOf("\n", offset + 2);
      offset = lineEnd === -1 ? source.length : lineEnd + 1;
      continue;
    }

    if (character === '"' || character === "'") {
      const result = readString(source, offset, sourceName);
      tokens.push({ offset, type: "string", value: result.value });
      offset = result.nextOffset;
      continue;
    }

    const numberMatch = /^(?:0[xX][0-9a-fA-F]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/u.exec(
      source.slice(offset),
    );
    if (numberMatch !== null) {
      const value = numberMatch[0];
      if (value === undefined) {
        throw new Error(`${sourceName}: A number at offset ${offset} is invalid.`);
      }
      tokens.push({ offset, type: "number", value });
      offset += value.length;
      continue;
    }

    const identifierMatch = /^[A-Za-z_][A-Za-z0-9_]*/u.exec(source.slice(offset));
    if (identifierMatch !== null) {
      const value = identifierMatch[0];
      if (value === undefined) {
        throw new Error(`${sourceName}: An identifier at offset ${offset} is invalid.`);
      }
      tokens.push({ offset, type: "identifier", value });
      offset += value.length;
      continue;
    }

    if ("{}[]=,;:().+-*/^%#<>~".includes(character)) {
      tokens.push({ offset, type: "symbol", value: character });
      offset += 1;
      continue;
    }

    throw new Error(`${sourceName}: The character at offset ${offset} is not supported.`);
  }

  return tokens;
}

function readString(
  source: string,
  startOffset: number,
  sourceName: string,
): { readonly nextOffset: number; readonly value: string } {
  const quote = source.charAt(startOffset);
  let offset = startOffset + 1;
  let value = "";

  while (offset < source.length) {
    const character = source.charAt(offset);
    if (character === quote) {
      return { nextOffset: offset + 1, value };
    }

    if (character !== "\\") {
      value += character;
      offset += 1;
      continue;
    }

    const escapeCharacter = source.charAt(offset + 1);
    if (escapeCharacter === "") {
      break;
    }

    const escapeValues: Readonly<Record<string, string>> = {
      "\\": "\\",
      '"': '"',
      "'": "'",
      a: "\u0007",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t",
      v: "\u000b",
    };
    const escapeValue = escapeValues[escapeCharacter];
    if (escapeValue !== undefined) {
      value += escapeValue;
      offset += 2;
      continue;
    }

    if (/\d/u.test(escapeCharacter)) {
      const decimalMatch = /^\d{1,3}/u.exec(source.slice(offset + 1));
      const decimalValue = decimalMatch?.[0];
      if (decimalValue === undefined) {
        throw new Error(`${sourceName}: A decimal escape at offset ${offset} is invalid.`);
      }
      value += String.fromCharCode(Number.parseInt(decimalValue, 10));
      offset += decimalValue.length + 1;
      continue;
    }

    if (escapeCharacter === "x") {
      const hexadecimalValue = source.slice(offset + 2, offset + 4);
      if (!/^[0-9a-fA-F]{2}$/u.test(hexadecimalValue)) {
        throw new Error(`${sourceName}: A hexadecimal escape at offset ${offset} is invalid.`);
      }
      value += String.fromCharCode(Number.parseInt(hexadecimalValue, 16));
      offset += 4;
      continue;
    }

    if (escapeCharacter === "z") {
      offset += 2;
      while (/\s/u.test(source.charAt(offset))) {
        offset += 1;
      }
      continue;
    }

    if (escapeCharacter === "\n") {
      value += "\n";
      offset += 2;
      continue;
    }

    value += escapeCharacter;
    offset += 2;
  }

  throw new Error(`${sourceName}: A string at offset ${startOffset} is not closed.`);
}

function parseNumber(value: string, sourceName: string, offset: number): number {
  const result = /^0[xX]/u.test(value)
    ? Number.parseInt(value.slice(2), 16)
    : Number.parseFloat(value);
  if (!Number.isFinite(result)) {
    throw new Error(`${sourceName}: The number at offset ${offset} is invalid.`);
  }
  return result;
}
