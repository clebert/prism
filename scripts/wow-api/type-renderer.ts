import type { ApiFunction, ApiValue } from "./api-model.ts";

const directTypes = new Map<string, string>([
  ["any", "unknown"],
  ["BigInteger", "number"],
  ["BigUInteger", "number"],
  ["bool", "boolean"],
  ["CalendarEventID", "number"],
  ["ClubId", "string"],
  ["ClubInvitationId", "string"],
  ["ClubStreamId", "string"],
  ["ConnectionIptype", "number"],
  ["cstring", "string"],
  ["CScriptObject", "WowApi.SimpleFrameScriptObject"],
  ["DiscordID", "string"],
  ["FileAsset", "string"],
  ["fileID", "number"],
  ["FontAsset", "string"],
  ["FrameScriptObject", "WowApi.SimpleFrameScriptObject"],
  ["FrameTime", "number"],
  ["GarrisonFollower", "string"],
  ["IDOrLink", "number | string"],
  ["InventorySlots", "number"],
  ["ItemInfo", "number | string"],
  ["kstringAuroraName", "string"],
  ["KStringDiscordUserName", "string"],
  ["kstringClubMessage", "string"],
  ["kstringLfgListApplicant", "string"],
  ["kstringLfgListChat", "string"],
  ["kstringLfgListSearch", "string"],
  ["LuaFunctionReference", "(...arguments_: unknown[]) => unknown"],
  ["luaIndex", "number"],
  ["LuaInventorySlot", "number"],
  ["LuaValueReference", "unknown"],
  ["LuaValueVariant", "unknown"],
  ["Milliseconds", "number"],
  ["ModelAsset", "string"],
  ["normalizedValue", "number"],
  ["NotificationDbId", "string"],
  ["number", "number"],
  ["RecruitAcceptanceID", "string"],
  ["ScriptObject", "WowApi.SimpleFrameScriptObject"],
  ["ScriptRegion", "WowApi.SimpleScriptRegion"],
  ["Seconds", "number"],
  ["SingleColorValue", "number"],
  ["size", "number"],
  ["SoundHandle", "number"],
  ["SpellIdentifier", "number | string"],
  ["string", "string"],
  ["stringView", "string"],
  ["TextureAssetDisk", "number | string"],
  ["textureAtlas", "string"],
  ["textureKit", "string"],
  ["time_t", "number"],
  ["uiAddon", "number | string"],
  ["uiFontHeight", "number"],
  ["uiUnit", "number"],
  ["UnitToken", "string"],
  ["UnitTokenNamePlate", "string"],
  ["UnitTokenPvPRestrictedForAddOns", "string"],
  ["UnitTokenRestrictedForAddOns", "string"],
  ["UnitTokenVariant", "string"],
  ["Userdata", "object"],
  ["WeeklyRewardItemDBID", "string"],
  ["WOWGUID", "string"],
  ["WOWMONEY", "number"],
]);

const reservedIdentifiers = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
]);

export function renderApiType(value: ApiValue): string {
  let type: string;
  if (value.type === "table") {
    type =
      value.innerType === undefined
        ? "Readonly<Record<PropertyKey, unknown>>"
        : `readonly ${renderNamedType(value.innerType)}[]`;
  } else {
    type = renderNamedType(value.type);
  }

  return value.nilable ? `${type} | undefined` : type;
}

export function renderNamedType(typeName: string): string {
  const directType = directTypes.get(typeName);
  if (directType !== undefined) {
    return directType;
  }
  if (typeName === "table") {
    return "Readonly<Record<PropertyKey, unknown>>";
  }
  if (typeName.startsWith("Enum.")) {
    return `WowApi.${typeName.slice("Enum.".length)}`;
  }
  return `WowApi.${sanitizeTypeName(typeName)}`;
}

export function isDirectType(typeName: string): boolean {
  return directTypes.has(typeName) || typeName === "table" || typeName.startsWith("Enum.");
}

export function renderFunctionSignature(apiFunction: ApiFunction, includeThis: boolean): string {
  const parameters = renderParameters(apiFunction.arguments, includeThis);
  const returnType = renderReturns(apiFunction.returns, apiFunction.mayReturnNothing);
  return `(${parameters}): ${returnType}`;
}

export function renderCallbackSignature(
  arguments_: readonly ApiValue[],
  returns: readonly ApiValue[],
): string {
  return `(${renderParameters(arguments_, false)}) => ${renderReturns(returns, false)}`;
}

export function renderEventPayload(payload: readonly ApiValue[]): string {
  if (payload.length === 0) {
    return "readonly []";
  }
  return `readonly [${payload.map(renderTupleValue).join(", ")}]`;
}

export function sanitizeIdentifier(name: string): string {
  const sanitized = name.replace(/[^A-Za-z0-9_$]/gu, "_");
  const withPrefix = /^[A-Za-z_$]/u.test(sanitized) ? sanitized : `_${sanitized}`;
  return reservedIdentifiers.has(withPrefix) ? `${withPrefix}_` : withPrefix;
}

export function sanitizeTypeName(name: string): string {
  return sanitizeIdentifier(name);
}

function renderParameters(values: readonly ApiValue[], includeThis: boolean): string {
  const rendered: string[] = includeThis ? ["this: void"] : [];
  const lastRequiredIndex = values.findLastIndex(
    (value) =>
      !value.nilable && value.defaultValue === undefined && value.strideIndex === undefined,
  );

  for (const [index, value] of values.entries()) {
    const name = sanitizeIdentifier(value.name);
    const type = renderApiType(value);
    if (value.strideIndex !== undefined) {
      rendered.push(`...${name}: (${type})[]`);
      continue;
    }

    const optional = index > lastRequiredIndex;
    const parameterType =
      value.defaultValue !== undefined && !optional ? `${type} | undefined` : type;
    rendered.push(`${name}${optional ? "?" : ""}: ${parameterType}`);
  }

  return rendered.join(", ");
}

function renderReturns(values: readonly ApiValue[], mayReturnNothing: boolean): string {
  let result: string;
  if (values.length === 0) {
    result = "void";
  } else if (values.length === 1 && values[0]?.strideIndex === undefined) {
    const value = values[0];
    if (value === undefined) {
      throw new Error("The return value is missing.");
    }
    result = renderApiType(value);
  } else {
    const firstStrideIndex = values.findIndex((value) => value.strideIndex !== undefined);
    if (firstStrideIndex === -1) {
      result = `LuaMultiReturn<[${values.map(renderTupleValue).join(", ")}]>`;
    } else {
      const fixedValues = values.slice(0, firstStrideIndex).map(renderTupleValue);
      const strideTypes = new Set(
        values.slice(firstStrideIndex).map((value) => renderApiType(value)),
      );
      const strideValue = `...values: (${[...strideTypes].sort().join(" | ")})[]`;
      result = `LuaMultiReturn<[${[...fixedValues, strideValue].join(", ")}]>`;
    }
  }

  return mayReturnNothing && result !== "void" ? `${result} | undefined` : result;
}

function renderTupleValue(value: ApiValue): string {
  return `${sanitizeIdentifier(value.name)}: ${renderApiType(value)}`;
}
