import type {
  ApiCallback,
  ApiConstants,
  ApiConstantValue,
  ApiDocument,
  ApiEnumeration,
  ApiEnumerationField,
  ApiFunction,
  ApiScriptObject,
  ApiStructure,
  ApiTable,
  ApiValue,
} from "./api-model.ts";
import {
  isDirectType,
  renderApiType,
  renderCallbackSignature,
  renderEventPayload,
  renderFunctionSignature,
  renderNamedType,
  sanitizeIdentifier,
  sanitizeTypeName,
} from "./type-renderer.ts";

export interface GeneratedDeclarationFile {
  readonly content: string;
  readonly name: string;
}

const header =
  "// This file comes from Blizzard API documentation.\n// Run npm run sync:wow-api to replace it.\n\n";

export function generateDeclarations(
  documents: readonly ApiDocument[],
): readonly GeneratedDeclarationFile[] {
  const tables = documents.flatMap((document) => document.tables);
  const scriptObjects = documents.flatMap((document) =>
    document.scriptObject === undefined ? [] : [document.scriptObject],
  );

  verifyTypeKinds(tables, scriptObjects);

  return [
    { content: generateFunctions(documents), name: "functions.d.ts" },
    { content: generateStructures(tables), name: "structures.d.ts" },
    { content: generateEnums(tables), name: "enums.d.ts" },
    { content: generateConstants(tables), name: "constants.d.ts" },
    { content: generateCallbacks(tables), name: "callbacks.d.ts" },
    { content: generateScriptObjects(scriptObjects), name: "script-objects.d.ts" },
    { content: generateEvents(documents), name: "events.d.ts" },
    {
      content: generateFallbackTypes(documents, tables, scriptObjects),
      name: "fallback-types.d.ts",
    },
  ];
}

function generateFunctions(documents: readonly ApiDocument[]): string {
  const groups = new Map<string, Map<string, Set<string>>>();

  for (const document of documents) {
    if (document.scriptObject !== undefined) {
      continue;
    }
    const namespace = document.namespace ?? "";
    const functions = getOrCreate(groups, namespace, () => new Map());
    for (const apiFunction of document.functions) {
      const signatures = getOrCreate(functions, apiFunction.name, () => new Set());
      signatures.add(renderFunctionSignature(apiFunction, namespace !== ""));
    }
  }

  const lines = [header.trimEnd(), ""];
  const globalFunctions = groups.get("");
  if (globalFunctions !== undefined) {
    lines.push(...renderFunctionGroup(globalFunctions, "", "declare "));
  }

  for (const namespace of sorted(groups.keys()).filter((name) => name !== "")) {
    const functions = groups.get(namespace);
    if (functions === undefined) {
      continue;
    }
    lines.push(`declare namespace ${sanitizeIdentifier(namespace)} {`);
    lines.push(...renderFunctionGroup(functions, "  ", ""));
    lines.push("}", "");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function renderFunctionGroup(
  functions: ReadonlyMap<string, ReadonlySet<string>>,
  indentation: string,
  declaration: string,
): readonly string[] {
  const lines: string[] = [];
  for (const name of sorted(functions.keys())) {
    const signatures = functions.get(name);
    if (signatures === undefined) {
      continue;
    }
    for (const signature of sorted(signatures)) {
      lines.push(`${indentation}${declaration}function ${sanitizeIdentifier(name)}${signature};`);
    }
  }
  lines.push("");
  return lines;
}

function generateStructures(tables: readonly ApiTable[]): string {
  const structures = tables.filter((table): table is ApiStructure => table.kind === "structure");
  const groups = groupByName(structures);
  const lines = [header.trimEnd(), "", "declare namespace WowApi {"];

  for (const name of sorted(groups.keys())) {
    const definitions = groups.get(name);
    if (definitions === undefined) {
      continue;
    }
    const shapes = new Set(definitions.map(renderStructureShape));
    lines.push(`  type ${sanitizeTypeName(name)} = ${sorted(shapes).join(" | ")};`);
  }

  lines.push("}", "");
  return lines.join("\n");
}

function renderStructureShape(structure: ApiStructure): string {
  if (structure.fields.length === 0) {
    return "Readonly<Record<PropertyKey, never>>";
  }
  const fields = structure.fields.map(
    (field) =>
      `readonly ${JSON.stringify(field.name)}${field.nilable ? "?" : ""}: ${renderApiType(field)}`,
  );
  return `{ ${fields.join("; ")} }`;
}

function generateEnums(tables: readonly ApiTable[]): string {
  const enumerations = tables.filter(
    (table): table is ApiEnumeration => table.kind === "enumeration",
  );
  const groups = groupByName(enumerations);
  const lines = [header.trimEnd(), "", "declare namespace Enum {"];

  for (const name of sorted(groups.keys())) {
    const definitions = groups.get(name);
    if (definitions === undefined) {
      continue;
    }
    const fields = new Map<string, Set<string>>();
    for (const definition of definitions) {
      for (const field of definition.fields) {
        getOrCreate(fields, field.name, () => new Set()).add(renderEnumValue(field));
      }
    }

    lines.push(`  const ${sanitizeIdentifier(name)}: {`);
    for (const fieldName of sorted(fields.keys())) {
      const values = fields.get(fieldName);
      if (values !== undefined) {
        lines.push(`    readonly ${JSON.stringify(fieldName)}: ${sorted(values).join(" | ")};`);
      }
    }
    lines.push("  };");
  }

  lines.push("}", "", "declare namespace WowApi {");
  for (const name of sorted(groups.keys())) {
    const typeName = sanitizeTypeName(name);
    lines.push(
      `  type ${typeName} = (typeof Enum.${sanitizeIdentifier(name)})[keyof typeof Enum.${sanitizeIdentifier(name)}];`,
    );
  }
  lines.push("}", "");
  return lines.join("\n");
}

function renderEnumValue(field: ApiEnumerationField): string {
  return typeof field.value === "number" ? renderNumber(field.value) : "number";
}

function generateConstants(tables: readonly ApiTable[]): string {
  const constants = tables.filter((table): table is ApiConstants => table.kind === "constants");
  const groups = groupByName(constants);
  const lines = [header.trimEnd(), "", "declare namespace Constants {"];

  for (const name of sorted(groups.keys())) {
    const definitions = groups.get(name);
    if (definitions === undefined) {
      continue;
    }
    const values = new Map<string, Set<string>>();
    for (const definition of definitions) {
      for (const value of definition.values) {
        getOrCreate(values, value.name, () => new Set()).add(renderConstantValue(value));
      }
    }

    lines.push(`  const ${sanitizeIdentifier(name)}: {`);
    for (const valueName of sorted(values.keys())) {
      const types = values.get(valueName);
      if (types !== undefined) {
        lines.push(`    readonly ${JSON.stringify(valueName)}: ${sorted(types).join(" | ")};`);
      }
    }
    lines.push("  };");
  }

  lines.push("}", "");
  return lines.join("\n");
}

function renderConstantValue(value: ApiConstantValue): string {
  if (typeof value.value === "boolean" || typeof value.value === "string") {
    return JSON.stringify(value.value);
  }
  if (typeof value.value === "number") {
    return renderNumber(value.value);
  }
  return renderNamedType(value.type);
}

function generateCallbacks(tables: readonly ApiTable[]): string {
  const callbacks = tables.filter((table): table is ApiCallback => table.kind === "callback");
  const groups = groupByName(callbacks);
  const lines = [header.trimEnd(), "", "declare namespace WowApi {"];

  for (const name of sorted(groups.keys())) {
    const definitions = groups.get(name);
    if (definitions === undefined) {
      continue;
    }
    const signatures = new Set(
      definitions.map((definition) =>
        renderCallbackSignature(definition.arguments, definition.returns),
      ),
    );
    lines.push(`  type ${sanitizeTypeName(name)} = ${sorted(signatures).join(" | ")};`);
  }

  lines.push("}", "");
  return lines.join("\n");
}

function generateScriptObjects(scriptObjects: readonly ApiScriptObject[]): string {
  const groups = groupByName(scriptObjects);
  const lines = [header.trimEnd(), "", "declare namespace WowApi {"];

  for (const name of sorted(groups.keys())) {
    const definitions = groups.get(name);
    if (definitions === undefined) {
      continue;
    }
    const methods = new Map<string, Set<string>>();
    for (const definition of definitions) {
      for (const apiFunction of definition.functions) {
        getOrCreate(methods, apiFunction.name, () => new Set()).add(
          renderFunctionSignature(apiFunction, false),
        );
      }
    }

    lines.push(`  interface ${sanitizeTypeName(name)} {`);
    for (const methodName of sorted(methods.keys())) {
      const signatures = methods.get(methodName);
      if (signatures === undefined) {
        continue;
      }
      for (const signature of sorted(signatures)) {
        lines.push(`    ${JSON.stringify(methodName)}${signature};`);
      }
    }
    lines.push("  }");
  }

  lines.push("}", "");
  return lines.join("\n");
}

function generateEvents(documents: readonly ApiDocument[]): string {
  const events = new Map<string, Set<string>>();
  for (const document of documents) {
    for (const event of document.events) {
      getOrCreate(events, event.literalName, () => new Set()).add(
        renderEventPayload(event.payload),
      );
    }
  }

  const lines = [header.trimEnd(), "", "declare namespace WowApi {", "  interface EventPayloads {"];
  for (const name of sorted(events.keys())) {
    const payloads = events.get(name);
    if (payloads !== undefined) {
      lines.push(`    readonly ${JSON.stringify(name)}: ${sorted(payloads).join(" | ")};`);
    }
  }
  lines.push("  }", "", "  type Event = keyof EventPayloads;", "}", "");
  return lines.join("\n");
}

function generateFallbackTypes(
  documents: readonly ApiDocument[],
  tables: readonly ApiTable[],
  scriptObjects: readonly ApiScriptObject[],
): string {
  const definedTypes = new Set<string>();
  for (const table of tables) {
    if (table.kind !== "constants") {
      definedTypes.add(table.name);
    }
  }
  for (const scriptObject of scriptObjects) {
    definedTypes.add(scriptObject.name);
  }

  const referencedTypes = collectReferencedTypes(documents);
  const fallbackTypes = sorted(referencedTypes).filter(
    (name) => !definedTypes.has(name) && !isDirectType(name),
  );
  const lines = [header.trimEnd(), "", "declare namespace WowApi {"];
  for (const name of fallbackTypes) {
    lines.push(`  type ${sanitizeTypeName(name)} = unknown;`);
  }
  lines.push("}", "");
  return lines.join("\n");
}

function collectReferencedTypes(documents: readonly ApiDocument[]): ReadonlySet<string> {
  const types = new Set<string>();
  for (const document of documents) {
    for (const apiFunction of document.functions) {
      collectFunctionTypes(types, apiFunction);
    }
    for (const event of document.events) {
      collectValueTypes(types, event.payload);
    }
    for (const table of document.tables) {
      if (table.kind === "structure") {
        collectValueTypes(types, table.fields);
      } else if (table.kind === "callback") {
        collectValueTypes(types, table.arguments);
        collectValueTypes(types, table.returns);
      } else if (table.kind === "constants") {
        for (const value of table.values) {
          types.add(value.type);
        }
      }
    }
  }
  return types;
}

function collectFunctionTypes(types: Set<string>, apiFunction: ApiFunction): void {
  collectValueTypes(types, apiFunction.arguments);
  collectValueTypes(types, apiFunction.returns);
}

function collectValueTypes(types: Set<string>, values: readonly ApiValue[]): void {
  for (const value of values) {
    types.add(value.type);
    if (value.innerType !== undefined) {
      types.add(value.innerType);
    }
  }
}

function verifyTypeKinds(
  tables: readonly ApiTable[],
  scriptObjects: readonly ApiScriptObject[],
): void {
  const kinds = new Map<string, string>();
  for (const table of tables) {
    if (table.kind === "constants") {
      continue;
    }
    verifyTypeKind(kinds, table.name, table.kind);
  }
  for (const scriptObject of scriptObjects) {
    verifyTypeKind(kinds, scriptObject.name, "script object");
  }
}

function verifyTypeKind(kinds: Map<string, string>, name: string, kind: string): void {
  const existingKind = kinds.get(name);
  if (existingKind !== undefined && existingKind !== kind) {
    throw new Error(`The ${name} type uses both ${existingKind} and ${kind}.`);
  }
  kinds.set(name, kind);
}

function groupByName<T extends { readonly name: string }>(
  values: readonly T[],
): ReadonlyMap<string, readonly T[]> {
  const groups = new Map<string, T[]>();
  for (const value of values) {
    getOrCreate(groups, value.name, () => []).push(value);
  }
  return groups;
}

function getOrCreate<Key, Value>(map: Map<Key, Value>, key: Key, create: () => Value): Value {
  const existing = map.get(key);
  if (existing !== undefined) {
    return existing;
  }
  const value = create();
  map.set(key, value);
  return value;
}

function sorted(values: Iterable<string>): readonly string[] {
  return [...values].sort((left, right) => left.localeCompare(right, "en"));
}

function renderNumber(value: number): string {
  return Object.is(value, -0) ? "-0" : String(value);
}
