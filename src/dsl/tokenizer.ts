import { failure, type Position, type Result, success } from "./result";

export type Token = Readonly<
  { position: Position } & (
    | { type: "comment"; value: string }
    | { type: "keyword"; value: string }
    | { type: "number"; value: number }
    | { type: "string"; value: string }
    | { type: "symbol"; value: (typeof symbols)[number] }
  )
>;

export const symbols = [
  ",",
  ":",
  "!",
  "(",
  ")",
  "{",
  "}",
  "@",
  "&",
  "%",
  "<=",
  "<",
  ">=",
  ">",
  "|",
] as const;

export class Tokenizer {
  readonly input: string;

  private position: Position = { column: 1, index: 0, line: 1 };

  constructor(input: string) {
    this.input = input.replaceAll("\r\n", "\n");
  }

  next(): Result<Token> | undefined {
    let char = this.getCurrentChar();

    while (isWhitespace(char)) {
      char = this.advance();
    }

    if (char === "") {
      return;
    }

    return (
      this.readComment(this.position) ??
      this.readKeyword(this.position) ??
      this.readNumber(this.position) ??
      this.readString(this.position) ??
      this.readSymbol(this.position) ??
      failure(`Invalid character: ${char}`, this.position)
    );
  }

  private advance(): string {
    const { column, line, index } = this.position;

    if (this.getCurrentChar() === "\n") {
      this.position = { column: 1, index: index + 1, line: line + 1 };
    } else {
      this.position = { column: column + 1, index: index + 1, line };
    }

    return this.getCurrentChar();
  }

  private getCurrentChar(): string {
    return this.input[this.position.index] || "";
  }

  private readComment(position: Position): Result<Token> | undefined {
    let char = this.getCurrentChar();

    if (char !== "#") {
      return;
    }

    char = this.advance(); // Skip hashtag

    let value = "";

    while (char !== "" && char !== "\n") {
      value += char;

      char = this.advance();
    }

    return success({ position, type: "comment", value });
  }

  private readKeyword(position: Position): Result<Token> | undefined {
    let char = this.getCurrentChar();

    if (!isAlpha(char)) {
      return;
    }

    let value = "";

    do {
      value += char;

      char = this.advance();
    } while (isAlphaNumeric(char));

    return success({ position, type: "keyword", value });
  }

  private readNumber(position: Position): Result<Token> | undefined {
    let char = this.getCurrentChar();

    if (!isDigit(char)) {
      return;
    }

    let value = "";

    if (char === "0") {
      value += char;

      char = this.advance();

      if (isDigit(char)) {
        return failure("Malformed number - leading zero not allowed", position);
      }
    } else {
      do {
        value += char;

        char = this.advance();
      } while (isDigit(char));
    }

    if (char === ".") {
      value += char;

      char = this.advance();

      if (!isDigit(char)) {
        return failure("Malformed number - decimal point must be followed by digits", position);
      }

      do {
        value += char;

        char = this.advance();
      } while (isDigit(char));

      if (char === ".") {
        return failure("Malformed number - multiple decimal points", position);
      }
    }

    return success({ position, type: "number", value: Number.parseFloat(value) });
  }

  private readString(position: Position): Result<Token> | undefined {
    let char = this.getCurrentChar();

    if (char !== '"') {
      return;
    }

    char = this.advance(); // Skip opening quote

    let value = "";

    while (char !== "" && char !== '"') {
      if (char === "\n") {
        return failure("Unterminated string - newlines are not allowed in strings", position);
      }

      if (char === "\\") {
        char = this.advance(); // Skip backslash

        if (char === '"') {
          value += char;

          char = this.advance();
        } else if (char === "") {
          return failure("Unterminated string escape sequence", position);
        } else {
          return failure(`Unsupported string escape sequence: \\${char}`, position);
        }
      } else {
        value += char;

        char = this.advance();
      }
    }

    if (char !== '"') {
      return failure("Unterminated string - missing closing quote", position);
    }

    this.advance(); // Skip closing quote

    return success({ position, type: "string", value });
  }

  private readSymbol(position: Position): Result<Token> | undefined {
    const { column, index, line } = position;

    for (const value of symbols) {
      if (this.input.slice(index, index + value.length) === value) {
        this.position = { column: column + value.length, index: index + value.length, line };

        return success({ position, type: "symbol", value });
      }
    }

    return;
  }
}

function isAlpha(char: string): boolean {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

function isAlphaNumeric(char: string): boolean {
  return isAlpha(char) || isDigit(char);
}

function isDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}

function isWhitespace(char: string): boolean {
  return char === " " || char === "\n" || char === "\t";
}
