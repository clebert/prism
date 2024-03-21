import { deepEqual, equal } from "node:assert/strict";
import { describe, test } from "node:test";
import { failure, success } from "./result";
import { symbols, type Token, Tokenizer } from "./tokenizer";

describe("Tokenizer", () => {
  describe("comment tokens", () => {
    test("tokenizes single-line comment", () => {
      const tokenizer = new Tokenizer("# this is a comment");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "comment",
          value: " this is a comment",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("tokenizes comment with special characters", () => {
      const tokenizer = new Tokenizer("# !@#$%^&*()");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "comment",
          value: " !@#$%^&*()",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("tokenizes empty comment", () => {
      const tokenizer = new Tokenizer("#");

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "comment", value: "" }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("tokenizes comment at end of input", () => {
      const tokenizer = new Tokenizer("foo # comment");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 5, index: 4, line: 1 },
          type: "comment",
          value: " comment",
        }),
      );

      equal(tokenizer.next(), undefined);
    });
  });

  describe("keyword tokens", () => {
    test("tokenizes simple keyword", () => {
      const tokenizer = new Tokenizer("spell");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "spell",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("tokenizes keyword with numbers", () => {
      const tokenizer = new Tokenizer("spell123");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "spell123",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("tokenizes single character keyword", () => {
      const tokenizer = new Tokenizer("a");

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "keyword", value: "a" }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("stops keyword at non-alphanumeric", () => {
      const tokenizer = new Tokenizer("spell-cast");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "spell",
        }),
      );

      deepEqual(
        tokenizer.next(),
        failure("Invalid character: -", { column: 6, index: 5, line: 1 }),
      );
    });

    test("stops keyword at underscore", () => {
      const tokenizer = new Tokenizer("spell_cast");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "spell",
        }),
      );

      deepEqual(
        tokenizer.next(),
        failure("Invalid character: _", { column: 6, index: 5, line: 1 }),
      );
    });
  });

  describe("number tokens", () => {
    describe("success cases", () => {
      test("tokenizes single digit", () => {
        const tokenizer = new Tokenizer("5");

        deepEqual(
          tokenizer.next(),
          success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "number", value: 5 }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes multi-digit integer", () => {
        const tokenizer = new Tokenizer("123");

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "number",
            value: 123,
          }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes decimal number", () => {
        const tokenizer = new Tokenizer("123.456");

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "number",
            value: 123.456,
          }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes zero", () => {
        const tokenizer = new Tokenizer("0");

        deepEqual(
          tokenizer.next(),
          success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "number", value: 0 }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes decimal starting with zero", () => {
        const tokenizer = new Tokenizer("0.5");

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "number",
            value: 0.5,
          }),
        );

        equal(tokenizer.next(), undefined);
      });
    });

    describe("error cases", () => {
      test("rejects leading zeros", () => {
        const tokenizer = new Tokenizer("012");

        deepEqual(
          tokenizer.next(),
          failure("Malformed number - leading zero not allowed", { column: 1, index: 0, line: 1 }),
        );
      });

      test("rejects decimal without digits after point", () => {
        const tokenizer = new Tokenizer("123.");

        deepEqual(
          tokenizer.next(),
          failure("Malformed number - decimal point must be followed by digits", {
            column: 1,
            index: 0,
            line: 1,
          }),
        );
      });

      test("rejects multiple decimal points", () => {
        const tokenizer = new Tokenizer("12.3.4");

        deepEqual(
          tokenizer.next(),
          failure("Malformed number - multiple decimal points", { column: 1, index: 0, line: 1 }),
        );
      });
    });
  });

  describe("string tokens", () => {
    describe("success cases", () => {
      test("tokenizes simple string", () => {
        const tokenizer = new Tokenizer('"hello"');

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "string",
            value: "hello",
          }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes empty string", () => {
        const tokenizer = new Tokenizer('""');

        deepEqual(
          tokenizer.next(),
          success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "string", value: "" }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes string with spaces", () => {
        const tokenizer = new Tokenizer('"hello world"');

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "string",
            value: "hello world",
          }),
        );

        equal(tokenizer.next(), undefined);
      });

      test("tokenizes string with escaped quotes", () => {
        const tokenizer = new Tokenizer('"say \\"hello\\""');

        deepEqual(
          tokenizer.next(),
          success<Token>({
            position: { column: 1, index: 0, line: 1 },
            type: "string",
            value: 'say "hello"',
          }),
        );

        equal(tokenizer.next(), undefined);
      });
    });

    describe("error cases", () => {
      test("rejects unterminated string", () => {
        const tokenizer = new Tokenizer('"hello');

        deepEqual(
          tokenizer.next(),
          failure("Unterminated string - missing closing quote", { column: 1, index: 0, line: 1 }),
        );
      });

      test("rejects string with newline", () => {
        const tokenizer = new Tokenizer('"hello\nworld"');

        deepEqual(
          tokenizer.next(),
          failure("Unterminated string - newlines are not allowed in strings", {
            column: 1,
            index: 0,
            line: 1,
          }),
        );
      });

      test("rejects unterminated escape sequence", () => {
        const tokenizer = new Tokenizer('"hello\\');

        deepEqual(
          tokenizer.next(),
          failure("Unterminated string escape sequence", { column: 1, index: 0, line: 1 }),
        );
      });

      test("rejects unsupported escape sequences", () => {
        const tokenizer = new Tokenizer('"hello\\n"');

        deepEqual(
          tokenizer.next(),
          failure("Unsupported string escape sequence: \\n", { column: 1, index: 0, line: 1 }),
        );
      });
    });
  });

  describe("symbol tokens", () => {
    test("tokenizes all symbols", () => {
      for (const value of symbols) {
        const tokenizer = new Tokenizer(value);

        deepEqual(
          tokenizer.next(),
          success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "symbol", value }),
        );

        equal(tokenizer.next(), undefined);
      }
    });

    test("prioritizes longer symbols", () => {
      const tokenizer = new Tokenizer("<=<");

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 1, index: 0, line: 1 }, type: "symbol", value: "<=" }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 3, index: 2, line: 1 }, type: "symbol", value: "<" }),
      );

      equal(tokenizer.next(), undefined);
    });
  });

  describe("whitespace handling", () => {
    test("skips spaces", () => {
      const tokenizer = new Tokenizer("  foo  ");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 3, index: 2, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("skips tabs", () => {
      const tokenizer = new Tokenizer("\tfoo\t");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 2, index: 1, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("skips newlines", () => {
      const tokenizer = new Tokenizer("\nfoo\n");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 1, line: 2 },
          type: "keyword",
          value: "foo",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("skips mixed whitespace", () => {
      const tokenizer = new Tokenizer(" \n\t foo \t\n ");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 3, index: 4, line: 2 },
          type: "keyword",
          value: "foo",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("handles CRLF normalization", () => {
      const tokenizer = new Tokenizer("foo\r\nbar");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 4, line: 2 },
          type: "keyword",
          value: "bar",
        }),
      );

      equal(tokenizer.next(), undefined);
    });
  });

  describe("invalid input", () => {
    test("rejects special characters not in symbols", () => {
      const tokenizer = new Tokenizer("~");

      deepEqual(
        tokenizer.next(),
        failure("Invalid character: ~", { column: 1, index: 0, line: 1 }),
      );
    });
  });

  describe("iterator pattern", () => {
    test("returns undefined at end of input", () => {
      const tokenizer = new Tokenizer("foo");

      tokenizer.next(); // consume "foo"
      equal(tokenizer.next(), undefined);
      equal(tokenizer.next(), undefined); // multiple calls return undefined
    });

    test("tokenizes sequence of tokens", () => {
      const tokenizer = new Tokenizer("foo: 123");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 4, index: 3, line: 1 }, type: "symbol", value: ":" }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 6, index: 5, line: 1 }, type: "number", value: 123 }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("handles empty input", () => {
      const tokenizer = new Tokenizer("");

      equal(tokenizer.next(), undefined);
    });

    test("handles whitespace-only input", () => {
      const tokenizer = new Tokenizer("  \n\t  ");

      equal(tokenizer.next(), undefined);
    });
  });

  describe("integration tests", () => {
    test("tokenizes mixed token types", () => {
      const tokenizer = new Tokenizer('spell: "Fireball" # damage spell');

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "spell",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 6, index: 5, line: 1 }, type: "symbol", value: ":" }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 8, index: 7, line: 1 },
          type: "string",
          value: "Fireball",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 19, index: 18, line: 1 },
          type: "comment",
          value: " damage spell",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("preserves position information", () => {
      const tokenizer = new Tokenizer("foo\n  bar");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "foo",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 3, index: 6, line: 2 },
          type: "keyword",
          value: "bar",
        }),
      );

      equal(tokenizer.next(), undefined);
    });

    test("handles complex expressions", () => {
      const tokenizer = new Tokenizer("health(<=30%)");

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 1, index: 0, line: 1 },
          type: "keyword",
          value: "health",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 7, index: 6, line: 1 }, type: "symbol", value: "(" }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 8, index: 7, line: 1 }, type: "symbol", value: "<=" }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({ position: { column: 10, index: 9, line: 1 }, type: "number", value: 30 }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 12, index: 11, line: 1 },
          type: "symbol",
          value: "%",
        }),
      );

      deepEqual(
        tokenizer.next(),
        success<Token>({
          position: { column: 13, index: 12, line: 1 },
          type: "symbol",
          value: ")",
        }),
      );

      equal(tokenizer.next(), undefined);
    });
  });
});
