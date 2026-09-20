import { deepEqual, equal, throws } from "node:assert/strict";
import { describe, test } from "node:test";
import { isLuaTable, parseLuaDocumentationTable } from "./lua-table-parser.ts";

describe("parseLuaDocumentationTable", () => {
  test("parses a generated documentation table", () => {
    const source = `
      local Example =
      {
        Name = "Example",
        Enabled = true,
        Count = 0x10,
        Offset = -2,
        Functions =
        {
          {
            Name = "GetValue",
            Arguments = {},
          },
        },
        Reference = Enum.Example.Value + 1,
      };

      APIDocumentation:AddDocumentationTable(Example);
    `;

    const table = parseLuaDocumentationTable(source, "example.lua");
    equal(table.fields.get("Name"), "Example");
    equal(table.fields.get("Enabled"), true);
    equal(table.fields.get("Count"), 16);
    equal(table.fields.get("Offset"), -2);
    deepEqual(table.fields.get("Reference"), {
      expression: "Enum.Example.Value+1",
      type: "reference",
    });

    const functions = table.fields.get("Functions");
    equal(isLuaTable(functions), true);
    if (!isLuaTable(functions)) {
      throw new Error("The function list is missing.");
    }
    equal(functions.items.length, 1);
    const apiFunction = functions.items[0];
    equal(isLuaTable(apiFunction), true);
    if (!isLuaTable(apiFunction)) {
      throw new Error("The function is missing.");
    }
    equal(apiFunction.fields.get("Name"), "GetValue");
  });

  test("decodes Lua string escapes", () => {
    const table = parseLuaDocumentationTable(
      String.raw`local Example = { Text = "line\nquote: \"\x41\065" };`,
      "example.lua",
    );

    equal(table.fields.get("Text"), 'line\nquote: "AA');
  });

  test("rejects a missing table assignment", () => {
    throws(
      () => parseLuaDocumentationTable("local Example", "example.lua"),
      /documentation table assignment is missing/u,
    );
  });
});
