import { equal } from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";
import { Parser } from "./dsl/parser";
import type { Failure } from "./dsl/result";

describe("Example Configs", () => {
  for (const name of ["druid", "hunter", "item", "mage", "rogue", "spell", "warrior"]) {
    test(`${name}.dsl parses without error`, () => {
      const content = readFileSync(`example-configs/${name}.dsl`, { encoding: "utf-8" });
      const parser = new Parser(content);
      const parseResult = parser.parse();

      equal((parseResult as Failure).position, undefined);
    });
  }
});
