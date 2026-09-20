import type { LuaTable, LuaValue } from "./lua-table-parser.ts";
import { isLuaTable } from "./lua-table-parser.ts";

export interface ApiDocument {
  readonly events: readonly ApiEvent[];
  readonly functions: readonly ApiFunction[];
  readonly name: string | undefined;
  readonly namespace: string | undefined;
  readonly scriptObject: ApiScriptObject | undefined;
  readonly sourceFile: string;
  readonly tables: readonly ApiTable[];
}

export interface ApiFunction {
  readonly arguments: readonly ApiValue[];
  readonly mayReturnNothing: boolean;
  readonly name: string;
  readonly returns: readonly ApiValue[];
}

export interface ApiEvent {
  readonly literalName: string;
  readonly payload: readonly ApiValue[];
}

export interface ApiValue {
  readonly defaultValue: LuaValue | undefined;
  readonly innerType: string | undefined;
  readonly name: string;
  readonly nilable: boolean;
  readonly strideIndex: number | undefined;
  readonly type: string;
}

export interface ApiScriptObject {
  readonly functions: readonly ApiFunction[];
  readonly name: string;
}

export type ApiTable = ApiCallback | ApiConstants | ApiEnumeration | ApiStructure;

export interface ApiCallback {
  readonly arguments: readonly ApiValue[];
  readonly kind: "callback";
  readonly name: string;
  readonly returns: readonly ApiValue[];
}

export interface ApiConstants {
  readonly kind: "constants";
  readonly name: string;
  readonly values: readonly ApiConstantValue[];
}

export interface ApiConstantValue {
  readonly name: string;
  readonly type: string;
  readonly value: LuaValue | undefined;
}

export interface ApiEnumeration {
  readonly fields: readonly ApiEnumerationField[];
  readonly kind: "enumeration";
  readonly name: string;
}

export interface ApiEnumerationField {
  readonly name: string;
  readonly value: LuaValue | undefined;
}

export interface ApiStructure {
  readonly fields: readonly ApiValue[];
  readonly kind: "structure";
  readonly name: string;
}

export function createApiDocument(table: LuaTable, sourceFile: string): ApiDocument {
  const name = optionalString(table, "Name", sourceFile);
  const namespace = optionalString(table, "Namespace", sourceFile);
  const type = optionalString(table, "Type", sourceFile);
  const functions = readFunctions(table, "Functions", sourceFile);

  return {
    events: readEvents(table, sourceFile),
    functions,
    name,
    namespace,
    scriptObject:
      type === "ScriptObject" && name !== undefined
        ? { functions, name: getScriptObjectTypeName(name) }
        : undefined,
    sourceFile,
    tables: readTables(table, sourceFile),
  };
}

function readFunctions(
  owner: LuaTable,
  fieldName: string,
  sourceFile: string,
): readonly ApiFunction[] {
  return tableItems(owner, fieldName, sourceFile).map((table) => ({
    arguments: readValues(table, "Arguments", sourceFile),
    mayReturnNothing: optionalBoolean(table, "MayReturnNothing", sourceFile) ?? false,
    name: requiredString(table, "Name", sourceFile),
    returns: readValues(table, "Returns", sourceFile),
  }));
}

function readEvents(owner: LuaTable, sourceFile: string): readonly ApiEvent[] {
  return tableItems(owner, "Events", sourceFile).map((table) => ({
    literalName: requiredString(table, "LiteralName", sourceFile),
    payload: readValues(table, "Payload", sourceFile),
  }));
}

function readValues(owner: LuaTable, fieldName: string, sourceFile: string): readonly ApiValue[] {
  return tableItems(owner, fieldName, sourceFile).map((table) => ({
    defaultValue: table.fields.get("Default"),
    innerType: optionalString(table, "InnerType", sourceFile),
    name: requiredString(table, "Name", sourceFile),
    nilable: optionalBoolean(table, "Nilable", sourceFile) ?? false,
    strideIndex: optionalNumber(table, "StrideIndex", sourceFile),
    type: requiredString(table, "Type", sourceFile),
  }));
}

function readTables(owner: LuaTable, sourceFile: string): readonly ApiTable[] {
  return tableItems(owner, "Tables", sourceFile).map((table) => {
    const name = requiredString(table, "Name", sourceFile);
    const type = requiredString(table, "Type", sourceFile);

    if (type === "CallbackType") {
      return {
        arguments: readValues(table, "Arguments", sourceFile),
        kind: "callback",
        name,
        returns: readValues(table, "Returns", sourceFile),
      };
    }

    if (type === "Constants") {
      return {
        kind: "constants",
        name,
        values: tableItems(table, "Values", sourceFile).map((value) => ({
          name: requiredString(value, "Name", sourceFile),
          type: requiredString(value, "Type", sourceFile),
          value: value.fields.get("Value"),
        })),
      };
    }

    if (type === "Enumeration") {
      return {
        fields: tableItems(table, "Fields", sourceFile).map((field) => ({
          name: requiredString(field, "Name", sourceFile),
          value: field.fields.get("EnumValue"),
        })),
        kind: "enumeration",
        name,
      };
    }

    if (type === "Structure") {
      return {
        fields: readValues(table, "Fields", sourceFile),
        kind: "structure",
        name,
      };
    }

    throw new Error(`${sourceFile}: The table type ${type} is not supported.`);
  });
}

function tableItems(owner: LuaTable, fieldName: string, sourceFile: string): readonly LuaTable[] {
  const value = owner.fields.get(fieldName);
  if (value === undefined) {
    return [];
  }
  if (!isLuaTable(value)) {
    throw new Error(`${sourceFile}: ${fieldName} must be a table.`);
  }

  return value.items.map((item) => {
    if (!isLuaTable(item)) {
      throw new Error(`${sourceFile}: Each ${fieldName} entry must be a table.`);
    }
    return item;
  });
}

function requiredString(owner: LuaTable, fieldName: string, sourceFile: string): string {
  const value = owner.fields.get(fieldName);
  if (typeof value !== "string") {
    throw new Error(`${sourceFile}: ${fieldName} must be a string.`);
  }
  return value;
}

function optionalString(
  owner: LuaTable,
  fieldName: string,
  sourceFile: string,
): string | undefined {
  const value = owner.fields.get(fieldName);
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "string") {
    throw new Error(`${sourceFile}: ${fieldName} must be a string.`);
  }
  return value;
}

function optionalBoolean(
  owner: LuaTable,
  fieldName: string,
  sourceFile: string,
): boolean | undefined {
  const value = owner.fields.get(fieldName);
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "boolean") {
    throw new Error(`${sourceFile}: ${fieldName} must be a boolean.`);
  }
  return value;
}

function optionalNumber(
  owner: LuaTable,
  fieldName: string,
  sourceFile: string,
): number | undefined {
  const value = owner.fields.get(fieldName);
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "number") {
    throw new Error(`${sourceFile}: ${fieldName} must be a number.`);
  }
  return value;
}

function getScriptObjectTypeName(documentName: string): string {
  if (documentName.startsWith("FrameAPI")) {
    return documentName.slice("FrameAPI".length);
  }
  if (documentName.endsWith("API")) {
    return documentName.slice(0, -"API".length);
  }
  return documentName;
}
