import { match } from "node:assert/strict";
import { describe, test } from "node:test";
import { createApiDocument } from "./api-model.ts";
import { generateDeclarations } from "./declaration-generator.ts";
import { parseLuaDocumentationTable } from "./lua-table-parser.ts";

describe("generateDeclarations", () => {
  test("creates namespaced functions, structures, enums, and events", () => {
    const source = `
      local Example = {
        Name = "Example",
        Type = "System",
        Namespace = "C_Example",
        Functions = {
          {
            Name = "GetRecord",
            Type = "Function",
            Arguments = {
              { Name = "recordID", Type = "number", Nilable = false },
              { Name = "includeHidden", Type = "bool", Nilable = false, Default = false },
            },
            Returns = {
              { Name = "record", Type = "ExampleRecord", Nilable = true },
            },
          },
        },
        Events = {
          {
            Name = "RecordChanged",
            Type = "Event",
            LiteralName = "EXAMPLE_RECORD_CHANGED",
            Payload = {
              { Name = "recordID", Type = "number", Nilable = false },
            },
          },
        },
        Tables = {
          {
            Name = "ExampleState",
            Type = "Enumeration",
            Fields = {
              { Name = "Ready", Type = "ExampleState", EnumValue = 1 },
            },
          },
          {
            Name = "ExampleRecord",
            Type = "Structure",
            Fields = {
              { Name = "state", Type = "ExampleState", Nilable = false },
              { Name = "label", Type = "cstring", Nilable = true },
            },
          },
        },
      };
    `;
    const document = createApiDocument(
      parseLuaDocumentationTable(source, "ExampleDocumentation.lua"),
      "ExampleDocumentation.lua",
    );
    const files = new Map(
      generateDeclarations([document]).map((file) => [file.name, file.content]),
    );

    match(
      requireFile(files, "functions.d.ts"),
      /declare namespace C_Example \{\n {2}function GetRecord\(this: void, recordID: number, includeHidden\?: boolean\): WowApi\.ExampleRecord \| undefined;/u,
    );
    match(
      requireFile(files, "structures.d.ts"),
      /type ExampleRecord = \{ readonly "state": WowApi\.ExampleState; readonly "label"\?: string \| undefined \};/u,
    );
    match(
      requireFile(files, "enums.d.ts"),
      /readonly "Ready": 1;[\s\S]*type ExampleState = \(typeof Enum\.ExampleState\)/u,
    );
    match(
      requireFile(files, "events.d.ts"),
      /readonly "EXAMPLE_RECORD_CHANGED": readonly \[recordID: number\];/u,
    );
  });

  test("creates a visible fallback for an undocumented type", () => {
    const source = `
      local Example = {
        Name = "Example",
        Type = "System",
        Functions = {
          {
            Name = "GetOpaqueValue",
            Type = "Function",
            Returns = {
              { Name = "value", Type = "OpaqueValue", Nilable = false },
            },
          },
        },
      };
    `;
    const document = createApiDocument(
      parseLuaDocumentationTable(source, "ExampleDocumentation.lua"),
      "ExampleDocumentation.lua",
    );
    const files = new Map(
      generateDeclarations([document]).map((file) => [file.name, file.content]),
    );

    match(requireFile(files, "fallback-types.d.ts"), /type OpaqueValue = unknown;/u);
  });
});

function requireFile(files: ReadonlyMap<string, string>, name: string): string {
  const content = files.get(name);
  if (content === undefined) {
    throw new Error(`${name} is missing.`);
  }
  return content;
}
