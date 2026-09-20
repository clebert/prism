// This file comes from Blizzard API documentation.
// Run npm run sync:wow-api to replace it.

declare namespace WowApi {
  interface AbbreviateConfig {
    "GetAbbreviateNumberData"(): readonly WowApi.NumberAbbreviationBreakpoint[];
    "SetAbbreviateNumberData"(data: readonly WowApi.NumberAbbreviationBreakpoint[]): void;
  }
  interface AbbreviatedNumberFormatter {
    "AddBreakpoint"(breakpoint: WowApi.NumberAbbreviationBreakpoint): void;
    "ClearBreakpoints"(): void;
    "Copy"(): WowApi.AbbreviatedNumberFormatter;
    "GetBreakpoints"(): readonly WowApi.NumberAbbreviationBreakpoint[];
    "ResetBreakpoints"(): void;
    "SetBreakpoints"(breakpoints: readonly WowApi.NumberAbbreviationBreakpoint[]): void;
  }
  interface ArchaeologyDigSiteFrame {
  }
  interface Blob {
    "DrawAll"(): void;
    "DrawBlob"(questID: number, draw?: boolean): void;
    "DrawNone"(): void;
    "EnableMerging"(enable?: boolean): void;
    "EnableSmoothing"(enable?: boolean): void;
    "GetMapID"(): number;
    "SetBorderAlpha"(alpha: number): void;
    "SetBorderScalar"(scalar: number): void;
    "SetBorderTexture"(asset: string): void;
    "SetFillAlpha"(alpha: number): void;
    "SetFillTexture"(asset: string): void;
    "SetMapID"(uiMapID: number): void;
    "SetMergeThreshold"(threshold: number): void;
    "SetNumSplinePoints"(numSplinePoints: number): void;
  }
  interface CharacterModelBase {
    "ApplySpellVisualKit"(spellVisualKitID: number, oneShot?: boolean): void;
    "CanSetUnit"(unit: string): void;
    "FreezeAnimation"(anim: WowApi.AnimationDataEnum, variation: number, frame: number): void;
    "GetDisplayInfo"(): number;
    "GetDoBlend"(): boolean;
    "GetKeepModelOnHide"(): boolean;
    "HasAnimation"(anim: WowApi.AnimationDataEnum): boolean;
    "PlayAnimKit"(animKit: number, loop?: boolean): void;
    "RefreshCamera"(): void;
    "RefreshUnit"(): void;
    "SetAnimation"(anim: WowApi.AnimationDataEnum, variation?: number | undefined): void;
    "SetBarberShopAlternateForm"(): void;
    "SetCamDistanceScale"(scale: number): void;
    "SetCreature"(creatureID: number, displayID?: number): void;
    "SetDisplayInfo"(displayID: number, mountDisplayID?: number | undefined): void;
    "SetDoBlend"(doBlend?: boolean): void;
    "SetItem"(itemID: number, appearanceModID?: number | undefined, itemVisualID?: number | undefined): void;
    "SetItemAppearance"(itemAppearanceID: number, itemVisualID?: number | undefined, itemSubclass?: WowApi.ItemWeaponSubclass | undefined): void;
    "SetKeepModelOnHide"(keepModelOnHide: boolean): void;
    "SetPortraitZoom"(zoom: number): void;
    "SetRotation"(radians: number, animate?: boolean): void;
    "SetUnit"(unit: string, blend?: boolean, useNativeForm?: boolean | undefined): boolean;
    "StopAnimKit"(): void;
    "ZeroCachedCenterXY"(): void;
  }
  interface CinematicModel {
    "EquipItem"(itemID: number): void;
    "InitializeCamera"(scaleFactor?: number): void;
    "InitializePanCamera"(scaleFactor?: number): void;
    "RefreshCamera"(): void;
    "SetAnimOffset"(offset: number): void;
    "SetCameraPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetCameraTarget"(positionX: number, positionY: number, positionZ: number): void;
    "SetCreatureData"(creatureID: number): void;
    "SetFacingLeft"(isFacingLeft?: boolean): void;
    "SetFadeTimes"(fadeInSeconds: number, fadeOutSeconds: number): void;
    "SetHeightFactor"(factor: number): void;
    "SetJumpInfo"(jumpLength: number, jumpHeight: number): void;
    "SetPanDistance"(scale: number): void;
    "SetSpellVisualKit"(visualKitID: number): void;
    "SetTargetDistance"(scale: number): void;
    "StartPan"(panType: number, durationSeconds: number, doFade?: boolean, visKitID?: number, startPositionScale?: number, speedMultiplier?: number): void;
    "StopPan"(): void;
    "UnequipItems"(): void;
  }
  interface Cooldown {
    "Clear"(): void;
    "GetCooldownDisplayDuration"(): number;
    "GetCooldownDuration"(): number;
    "GetCooldownTimes"(): LuaMultiReturn<[start: number, duration: number]>;
    "GetCountdownAbbrevThreshold"(): number;
    "GetCountdownFontString"(): WowApi.SimpleFontString;
    "GetCountdownFormatter"(): WowApi.NumericFormatter | undefined;
    "GetCountdownMillisecondsThreshold"(): number;
    "GetDrawBling"(): boolean;
    "GetDrawEdge"(): boolean;
    "GetDrawSwipe"(): boolean;
    "GetEdgeScale"(): number;
    "GetHideCountdownNumbers"(): boolean;
    "GetMinimumCountdownDuration"(): number;
    "GetReverse"(): boolean;
    "GetRotation"(): number;
    "GetUseAuraDisplayTime"(): boolean;
    "IsPaused"(): boolean;
    "Pause"(): void;
    "Resume"(): void;
    "SetBlingTexture"(texture: string, colorR: number, colorG: number, colorB: number, colorA: number): void;
    "SetCooldown"(start: number, duration: number, modRate?: number): void;
    "SetCooldownDuration"(duration: number, modRate?: number): void;
    "SetCooldownFromDurationObject"(duration: WowApi.LuaDurationObject, clearIfZero?: boolean): void;
    "SetCooldownFromExpirationTime"(expirationTime: number, duration: number, modRate?: number): void;
    "SetCooldownUNIX"(start: number, duration: number, modRate?: number): void;
    "SetCountdownAbbrevThreshold"(seconds: number): void;
    "SetCountdownFont"(fontName: string): void;
    "SetCountdownFormatter"(formatter?: WowApi.NumericFormatter | undefined): void;
    "SetCountdownMillisecondsThreshold"(seconds: number): void;
    "SetDrawBling"(drawBling?: boolean): void;
    "SetDrawEdge"(drawEdge?: boolean): void;
    "SetDrawSwipe"(drawSwipe?: boolean): void;
    "SetEdgeColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetEdgeScale"(scale: number): void;
    "SetEdgeTexture"(texture: string, colorR: number, colorG: number, colorB: number, colorA: number): void;
    "SetHideCountdownNumbers"(hideNumbers?: boolean): void;
    "SetMinimumCountdownDuration"(milliseconds: number): void;
    "SetPaused"(paused: boolean): void;
    "SetReverse"(reverse?: boolean): void;
    "SetRotation"(rotationRadians: number): void;
    "SetSwipeColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetSwipeTexture"(texture: string | undefined, colorR: number, colorG: number, colorB: number, colorA: number): void;
    "SetTexCoordRange"(low: WowApi.vector2, high: WowApi.vector2): void;
    "SetUseAuraDisplayTime"(useAuraDisplayTime?: boolean): void;
    "SetUseCircularEdge"(useCircularEdge?: boolean): void;
  }
  interface DressUpModel {
    "Dress"(): void;
    "GetAutoDress"(): boolean;
    "GetItemTransmogInfo"(inventorySlot: number): WowApi.ItemTransmogInfo | undefined;
    "GetItemTransmogInfoList"(): readonly WowApi.ItemTransmogInfo[];
    "GetObeyHideInTransmogFlag"(): boolean;
    "GetSheathed"(): boolean;
    "GetUseTransmogChoices"(): boolean;
    "GetUseTransmogSkin"(): boolean;
    "IsGeoReady"(): boolean;
    "IsSlotAllowed"(slot: number): boolean;
    "IsSlotVisible"(slot: number): boolean;
    "SetAutoDress"(enabled?: boolean): void;
    "SetItemTransmogInfo"(itemTransmogInfo: WowApi.ItemTransmogInfo, inventorySlot?: number | undefined, ignoreChildItems?: boolean): WowApi.ItemTryOnReason;
    "SetObeyHideInTransmogFlag"(enabled?: boolean): void;
    "SetSheathed"(sheathed?: boolean, hideWeapons?: boolean): void;
    "SetUseTransmogChoices"(enabled?: boolean): void;
    "SetUseTransmogSkin"(enabled?: boolean): void;
    "TryOn"(linkOrItemModifiedAppearanceID: number | string, handSlotName?: string | undefined, spellEnchantID?: number | undefined): WowApi.ItemTryOnReason | undefined;
    "Undress"(): void;
    "UndressSlot"(inventorySlot: number): void;
  }
  interface DurationTextBindingObject {
    "Assign"(other: WowApi.DurationTextBinding): void;
    "CanFormatText"(): boolean;
    "CanUpdateFontString"(): boolean;
    "ClearTextColorCurve"(): void;
    "Copy"(): WowApi.DurationTextBinding;
    "Disable"(): void;
    "Enable"(): void;
    "GetDuration"(): WowApi.LuaDurationObject | undefined;
    "GetExpiredText"(): string | undefined;
    "GetFontString"(): WowApi.SimpleFontString | undefined;
    "GetFormattedText"(): string;
    "GetFormattedTextColor"(): WowApi.colorRGBA | undefined;
    "GetTextColorCurve"(): LuaMultiReturn<[curve: WowApi.LuaColorCurveObject, property: WowApi.DurationTextBindingProperty]> | undefined;
    "GetTimeModifier"(): WowApi.DurationTimeModifier;
    "GetUpdateInterval"(): number;
    "GetZeroDurationText"(): string | undefined;
    "HasSecretValues"(): boolean;
    "IsEnabled"(): boolean;
    "SetDuration"(duration: WowApi.LuaDurationObject): void;
    "SetEnabled"(enabled: boolean): void;
    "SetExpiredText"(text?: string | undefined): void;
    "SetFontString"(fontString: WowApi.SimpleFontString): void;
    "SetFormatter"(formatter: WowApi.NumericFormatter): void;
    "SetTextColorCurve"(curve: WowApi.LuaColorCurveObject, property: WowApi.DurationTextBindingProperty): void;
    "SetTextFormat"(formatString: string, components: readonly WowApi.DurationTextBindingFormatComponent[]): void;
    "SetTimeModifier"(modifier: WowApi.DurationTimeModifier): void;
    "SetToDefaults"(): void;
    "SetUpdateInterval"(updateInterval: number): void;
    "SetZeroDurationText"(text?: string | undefined): void;
    "UpdateFontString"(): void;
  }
  interface FogOfWarFrame {
    "GetFogOfWarBackgroundAtlas"(): string;
    "GetFogOfWarBackgroundTexture"(): string | undefined;
    "GetFogOfWarMaskAtlas"(): string;
    "GetFogOfWarMaskTexture"(): string | undefined;
    "GetMaskScalar"(): number;
    "GetUiMapID"(): number;
    "SetFogOfWarBackgroundAtlas"(atlas: string): void;
    "SetFogOfWarBackgroundTexture"(asset: string, horizontalTile: boolean, verticalTile: boolean): void;
    "SetFogOfWarMaskAtlas"(atlas: string): void;
    "SetFogOfWarMaskTexture"(asset: string): void;
    "SetMaskScalar"(scalar: number): void;
    "SetUiMapID"(uiMapID: number): void;
  }
  interface HousingCatalogSearcher {
    "GetAllSearchItems"(): readonly WowApi.HousingCatalogEntryVariantID[];
    "GetCatalogSearchResults"(): readonly WowApi.HousingCatalogEntryVariantID[];
    "GetEditorModeContext"(): WowApi.HouseEditorMode | undefined;
    "GetFilteredCategoryID"(): number | undefined;
    "GetFilteredSubcategoryID"(): number | undefined;
    "GetFilterTagStatus"(groupID: number, tagID: number): boolean;
    "GetNumSearchItems"(): number;
    "GetSearchCount"(): number;
    "GetSearchText"(): string | undefined;
    "GetSortType"(): WowApi.HousingCatalogSortType;
    "IsAllowedIndoorsActive"(): boolean;
    "IsAllowedOutdoorsActive"(): boolean;
    "IsBaseVariantOnlyActive"(): boolean;
    "IsCollectedActive"(): boolean;
    "IsCustomizableOnlyActive"(): boolean;
    "IsFirstAcquisitionBonusOnlyActive"(): boolean;
    "IsSearchInProgress"(): boolean;
    "IsStoredOnlyActive"(): boolean;
    "IsUncollectedActive"(): boolean;
    "RunSearch"(): void;
    "SetAllInFilterTagGroup"(groupID: number, active: boolean): void;
    "SetAllowedIndoors"(isActive: boolean): void;
    "SetAllowedOutdoors"(isActive: boolean): void;
    "SetAutoUpdateOnParamChanges"(autoUpdateActive: boolean): void;
    "SetBaseVariantOnly"(isActive: boolean): void;
    "SetCollected"(isActive: boolean): void;
    "SetCustomizableOnly"(isActive: boolean): void;
    "SetEditorModeContext"(editorModeContext?: WowApi.HouseEditorMode | undefined): void;
    "SetFilteredCategoryID"(categoryID?: number | undefined): void;
    "SetFilteredSubcategoryID"(subcategoryID?: number | undefined): void;
    "SetFilterTagStatus"(groupID: number, tagID: number, active: boolean): void;
    "SetFirstAcquisitionBonusOnly"(isActive: boolean): void;
    "SetResultsUpdatedCallback"(callback: WowApi.HousingCatalogSearchResultsUpdatedCallback): void;
    "SetSearchText"(searchText?: string | undefined): void;
    "SetSortType"(sortType: WowApi.HousingCatalogSortType): void;
    "SetStoredOnly"(isActive: boolean): void;
    "SetUncollected"(isActive: boolean): void;
    "ToggleAllowedIndoors"(): void;
    "ToggleAllowedOutdoors"(): void;
    "ToggleBaseVariantOnly"(): void;
    "ToggleCollected"(): void;
    "ToggleCustomizableOnly"(): void;
    "ToggleFilterTag"(groupID: number, tagID: number): void;
    "ToggleFirstAcquisitionBonusOnly"(): void;
    "ToggleStoredOnly"(): void;
    "ToggleUncollected"(): void;
  }
  interface HousingFixturePointFrame {
    "HasAttachedFixture"(): boolean;
    "IsSelected"(): boolean;
    "IsValid"(): boolean;
    "Select"(): void;
    "SetUpdateCallback"(cb: WowApi.FixturePointUpdatedCallback): void;
  }
  interface HousingLayoutPinFrame {
    "CanMove"(): WowApi.HousingLayoutRestriction;
    "CanRemove"(): WowApi.HousingLayoutRestriction;
    "CanRotate"(): WowApi.HousingLayoutRestriction;
    "Drag"(isAccessible: boolean): void;
    "GetDoorConnectionInfo"(): WowApi.DoorConnectionInfo | undefined;
    "GetPinType"(): WowApi.HousingLayoutPinType;
    "GetRoomGUID"(): string;
    "GetRoomName"(): string | undefined;
    "IsAnyPartOfRoomSelected"(): boolean;
    "IsConnectedToDraggingRoom"(): boolean;
    "IsOccupiedDoor"(): boolean | undefined;
    "IsPartOfDraggingRoom"(): boolean;
    "IsSelected"(): boolean;
    "IsValid"(): boolean;
    "IsValidForSelectedFloorplan"(): boolean;
    "Select"(): void;
    "SetUpdateCallback"(cb: WowApi.PinUpdatedCallback): void;
  }
  interface LuaColorCurveObject {
    "AddPoint"(x: number, y: WowApi.colorRGBA): void;
    "ClearPoints"(): void;
    "Copy"(): WowApi.LuaColorCurveObject;
    "Evaluate"(x: number): WowApi.colorRGBA;
    "EvaluateUnpacked"(x: number): LuaMultiReturn<[yR: number, yG: number, yB: number, yA: number]>;
    "GetPoint"(index: number): WowApi.LuaColorCurvePoint | undefined;
    "GetPointCount"(): number;
    "GetPoints"(): readonly WowApi.LuaColorCurvePoint[];
    "RemovePoint"(index: number): void;
    "SetPoints"(point: readonly WowApi.LuaColorCurvePoint[]): void;
    "SetToDefaults"(): void;
  }
  interface LuaCurveObject {
    "AddPoint"(pointX: number, pointY: number): void;
    "ClearPoints"(): void;
    "Copy"(): WowApi.LuaCurveObject;
    "Evaluate"(x: number): number;
    "GetPoint"(index: number): WowApi.vector2 | undefined;
    "GetPointCount"(): number;
    "GetPoints"(): readonly WowApi.vector2[];
    "RemovePoint"(index: number): void;
    "SetPoints"(point: readonly WowApi.vector2[]): void;
    "SetToDefaults"(): void;
  }
  interface LuaCurveObjectBase {
    "GetType"(): WowApi.LuaCurveType;
    "HasSecretValues"(): boolean;
    "SetType"(type: WowApi.LuaCurveType): void;
  }
  interface LuaDurationClockObject {
    "GetTime"(): number;
  }
  interface LuaDurationManualClock {
    "AdvanceTime"(delta: number): void;
    "ResetTime"(): void;
    "RewindTime"(delta: number): void;
    "SetTime"(time: number): void;
  }
  interface LuaDurationObject {
    "Assign"(other: WowApi.LuaDurationObject): void;
    "Copy"(): WowApi.LuaDurationObject;
    "EvaluateElapsedDuration"(curve: WowApi.LuaCurveObjectBase, modifier?: WowApi.DurationTimeModifier): WowApi.LuaCurveEvaluatedResult;
    "EvaluateElapsedPercent"(curve: WowApi.LuaCurveObjectBase, modifier?: WowApi.DurationTimeModifier): WowApi.LuaCurveEvaluatedResult;
    "EvaluateRemainingDuration"(curve: WowApi.LuaCurveObjectBase, modifier?: WowApi.DurationTimeModifier): WowApi.LuaCurveEvaluatedResult;
    "EvaluateRemainingPercent"(curve: WowApi.LuaCurveObjectBase, modifier?: WowApi.DurationTimeModifier): WowApi.LuaCurveEvaluatedResult;
    "EvaluateTotalDuration"(curve: WowApi.LuaCurveObjectBase, modifier?: WowApi.DurationTimeModifier): WowApi.LuaCurveEvaluatedResult;
    "FormatElapsedDuration"(formatter: WowApi.NumericFormatter, modifier?: WowApi.DurationTimeModifier): string;
    "FormatRemainingDuration"(formatter: WowApi.NumericFormatter, modifier?: WowApi.DurationTimeModifier): string;
    "FormatTotalDuration"(formatter: WowApi.NumericFormatter, modifier?: WowApi.DurationTimeModifier): string;
    "GetClock"(): WowApi.LuaDurationClock | undefined;
    "GetClockTime"(): number;
    "GetElapsedDuration"(modifier?: WowApi.DurationTimeModifier): number;
    "GetElapsedPercent"(modifier?: WowApi.DurationTimeModifier): number;
    "GetEndTime"(modifier?: WowApi.DurationTimeModifier): number;
    "GetModRate"(): number;
    "GetRemainingDuration"(modifier?: WowApi.DurationTimeModifier): number;
    "GetRemainingPercent"(modifier?: WowApi.DurationTimeModifier): number;
    "GetStartTime"(modifier?: WowApi.DurationTimeModifier): number;
    "GetTotalDuration"(modifier?: WowApi.DurationTimeModifier): number;
    "HasExpired"(modifier?: WowApi.DurationTimeModifier): boolean;
    "HasSecretValues"(): boolean;
    "HasStarted"(modifier?: WowApi.DurationTimeModifier): boolean;
    "IsActive"(modifier?: WowApi.DurationTimeModifier): boolean;
    "IsZero"(): boolean;
    "Reset"(): void;
    "SetClock"(clock?: WowApi.LuaDurationClock | undefined): void;
    "SetTimeFromEnd"(endTime: number, duration: number, modRate?: number): void;
    "SetTimeFromStart"(startTime: number, duration: number, modRate?: number): void;
    "SetTimeSpan"(startTime: number, endTime: number): void;
    "SetToDefaults"(): void;
  }
  interface LuaLocaleContext {
    "CompareStrings"(left: string, right: string, strength: WowApi.CollationStrength): number | undefined;
    "FindBreaks"(text: string, breakType: WowApi.BreakType): readonly number[] | undefined;
    "FindStringMatches"(text: string, pattern: string, strength: WowApi.CollationStrength): readonly number[] | undefined;
    "FoldCase"(text: string): string | undefined;
    "FormatCurrency"(number: number, currencyCode: string): string | undefined;
    "FormatDate"(unixTimeSeconds: number, style: WowApi.DateTimeStyle, timeZone: string): string | undefined;
    "FormatDateTime"(unixTimeSeconds: number, dateStyle: WowApi.DateTimeStyle, timeStyle: WowApi.DateTimeStyle, timeZone: string): string | undefined;
    "FormatNumber"(number: number, style: WowApi.NumberStyle): string | undefined;
    "FormatTime"(unixTimeSeconds: number, style: WowApi.DateTimeStyle, timeZone: string): string | undefined;
    "GetCurrencyName"(currencyCode: string, style: WowApi.CurrencyNameStyle): string | undefined;
    "GetDisplayName"(displayLocale: string): string | undefined;
    "GetLocale"(): string;
    "GetSortKey"(text: string, strength: WowApi.CollationStrength): string | undefined;
    "Length"(text: string): number | undefined;
    "ParseCurrency"(text: string): WowApi.CurrencyParseResult | undefined;
    "ParseNumber"(text: string, style: WowApi.NumberStyle): number | undefined;
    "SelectPlural"(number: number, pluralType: WowApi.PluralType): string | undefined;
    "SetLocale"(locale: string): boolean;
    "ToLower"(text: string): string | undefined;
    "ToTitle"(text: string): string | undefined;
    "ToUpper"(text: string): string | undefined;
    "TransformLocale"(transform: WowApi.LocaleTransform): string | undefined;
  }
  interface MinimapFrame {
    "GetPingPosition"(): LuaMultiReturn<[positionX: number, positionY: number]>;
    "GetZoom"(): number;
    "GetZoomLevels"(): number;
    "PingLocation"(locationX: number, locationY: number): void;
    "SetArchBlobInsideAlpha"(alpha: number): void;
    "SetArchBlobInsideTexture"(asset: WowApi.TextureAsset): void;
    "SetArchBlobOutsideAlpha"(alpha: number): void;
    "SetArchBlobOutsideTexture"(asset: WowApi.TextureAsset): void;
    "SetArchBlobRingAlpha"(alpha: number): void;
    "SetArchBlobRingScalar"(scalar: number): void;
    "SetArchBlobRingTexture"(asset: WowApi.TextureAsset): void;
    "SetIconScale"(scale: number): void;
    "SetMaskTexture"(asset: WowApi.TextureAsset): void;
    "SetQuestBlobInsideAlpha"(alpha: number): void;
    "SetQuestBlobInsideTexture"(asset: WowApi.TextureAsset): void;
    "SetQuestBlobOutsideAlpha"(alpha: number): void;
    "SetQuestBlobOutsideTexture"(asset: WowApi.TextureAsset): void;
    "SetQuestBlobRingAlpha"(alpha: number): void;
    "SetQuestBlobRingScalar"(scalar: number): void;
    "SetQuestBlobRingTexture"(asset: WowApi.TextureAsset): void;
    "SetTaskBlobInsideAlpha"(alpha: number): void;
    "SetTaskBlobInsideTexture"(asset: WowApi.TextureAsset): void;
    "SetTaskBlobOutsideAlpha"(alpha: number): void;
    "SetTaskBlobOutsideTexture"(asset: WowApi.TextureAsset): void;
    "SetTaskBlobRingAlpha"(alpha: number): void;
    "SetTaskBlobRingScalar"(scalar: number): void;
    "SetTaskBlobRingTexture"(asset: WowApi.TextureAsset): void;
    "SetUsingSoftCursor"(usingSoftCursor: boolean): void;
    "SetZoom"(zoomFactor: number): void;
    "UpdateBlips"(): void;
    "UpdateMouseoverAtPoint"(pointX: number, pointY: number): void;
  }
  interface ModelSceneFrame {
    "ClearFog"(): void;
    "CreateActor"(name: string, template: string): void;
    "GetActorAtIndex"(index: number): void;
    "GetAllowOverlappedModels"(): boolean;
    "GetCameraFarClip"(): number;
    "GetCameraFieldOfView"(): number;
    "GetCameraForward"(): LuaMultiReturn<[forwardX: number, forwardY: number, forwardZ: number]>;
    "GetCameraNearClip"(): number;
    "GetCameraPosition"(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    "GetCameraRight"(): LuaMultiReturn<[rightX: number, rightY: number, rightZ: number]>;
    "GetCameraUp"(): LuaMultiReturn<[upX: number, upY: number, upZ: number]>;
    "GetDrawLayer"(): LuaMultiReturn<[layer: WowApi.DrawLayer, sublevel: number]>;
    "GetFogColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    "GetFogFar"(): number;
    "GetFogNear"(): number;
    "GetLightAmbientColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    "GetLightDiffuseColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    "GetLightDirection"(): LuaMultiReturn<[directionX: number, directionY: number, directionZ: number]>;
    "GetLightPosition"(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    "GetLightType"(): WowApi.ModelLightType | undefined;
    "GetNumActors"(): number;
    "GetViewInsets"(): WowApi.uiRect;
    "GetViewTranslation"(): LuaMultiReturn<[translationX: number, translationY: number]>;
    "IsLightVisible"(): boolean;
    "Project3DPointTo2D"(pointX: number, pointY: number, pointZ: number): LuaMultiReturn<[point2DX: number, point2DY: number, depth: number]> | undefined;
    "SetAllowOverlappedModels"(allowOverlappedModels: boolean): void;
    "SetCameraFarClip"(farClip: number): void;
    "SetCameraFieldOfView"(fov: number): void;
    "SetCameraNearClip"(nearClip: number): void;
    "SetCameraOrientationByAxisVectors"(forwardX: number, forwardY: number, forwardZ: number, rightX: number, rightY: number, rightZ: number, upX: number, upY: number, upZ: number): void;
    "SetCameraOrientationByYawPitchRoll"(yaw: number, pitch: number, roll: number): void;
    "SetCameraPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetDesaturation"(strength: number): void;
    "SetDrawLayer"(layer: WowApi.DrawLayer): void;
    "SetFogColor"(colorR: number, colorG: number, colorB: number): void;
    "SetFogFar"(far: number): void;
    "SetFogNear"(near: number): void;
    "SetLightAmbientColor"(colorR: number, colorG: number, colorB: number): void;
    "SetLightDiffuseColor"(colorR: number, colorG: number, colorB: number): void;
    "SetLightDirection"(directionX: number, directionY: number, directionZ: number): void;
    "SetLightPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetLightType"(lightType: WowApi.ModelLightType): void;
    "SetLightVisible"(visible?: boolean): void;
    "SetPaused"(paused: boolean, affectsGlobalPause?: boolean): void;
    "SetViewInsets"(insets: WowApi.uiRect): void;
    "SetViewTranslation"(translationX: number, translationY: number): void;
    "TakeActor"(): void;
  }
  interface ModelSceneFrameActor {
    "AttachToMount"(rider: WowApi.ModelSceneFrameActor, animation: WowApi.AnimationDataEnum, spellKitVisualID?: number | undefined): boolean;
    "CalculateMountScale"(rider: WowApi.ModelSceneFrameActor): number;
    "DetachFromMount"(rider: WowApi.ModelSceneFrameActor): boolean;
    "Dress"(): void;
    "DressPlayerSlot"(invSlot: number): void;
    "GetAutoDress"(): boolean;
    "GetItemTransmogInfo"(inventorySlots: number): WowApi.ItemTransmogInfo | undefined | undefined;
    "GetItemTransmogInfoList"(): readonly WowApi.ItemTransmogInfo[];
    "GetObeyHideInTransmogFlag"(): boolean;
    "GetPaused"(): LuaMultiReturn<[paused: boolean, globalPaused: boolean]>;
    "GetSheathed"(): boolean;
    "GetUseTransmogChoices"(): boolean;
    "GetUseTransmogSkin"(): boolean;
    "IsGeoReady"(): boolean;
    "IsSlotAllowed"(inventorySlots: number): boolean;
    "IsSlotVisible"(inventorySlots: number): boolean;
    "ReleaseFrontEndCharacterDisplays"(): boolean;
    "ResetNextHandSlot"(): void;
    "SetAutoDress"(autoDress: boolean): void;
    "SetFrontEndLobbyModelFromDefaultCharacterDisplay"(characterIndex: number): boolean;
    "SetItemTransmogInfo"(transmogInfo: WowApi.ItemTransmogInfo, inventorySlots?: number | undefined, ignoreChildItems?: boolean): WowApi.ItemTryOnReason;
    "SetModelByHyperlink"(link: string): boolean;
    "SetObeyHideInTransmogFlag"(obey: boolean): void;
    "SetPaused"(paused: boolean, affectsGlobalPause?: boolean): void;
    "SetSheathed"(sheathed: boolean, hidden?: boolean): void;
    "SetSheathedCategory"(inventorySlots: number, category: WowApi.TransmogOutfitSlotOptionSheatheCategory): void;
    "SetUseTransmogChoices"(use: boolean): void;
    "SetUseTransmogSkin"(use: boolean): void;
    "Undress"(includeWeapons?: boolean): void;
    "UndressSlot"(inventorySlots: number): void;
    "UseUnitSheatheCategory"(useCategory: boolean): void;
  }
  interface ModelSceneFrameActorBase {
    "ClearModel"(): void;
    "GetActiveBoundingBox"(): LuaMultiReturn<[boxBottom: WowApi.vector3, boxTop: WowApi.vector3]>;
    "GetAlpha"(): number;
    "GetAnimation"(): WowApi.AnimationDataEnum;
    "GetAnimationBlendOperation"(): WowApi.ModelBlendOperation;
    "GetAnimationVariation"(): number;
    "GetDesaturation"(): number;
    "GetMaxBoundingBox"(): LuaMultiReturn<[boxBottom: WowApi.vector3, boxTop: WowApi.vector3]>;
    "GetModelFileID"(): number;
    "GetModelPath"(): string;
    "GetModelUnitGUID"(): string;
    "GetParticleOverrideScale"(): number | undefined;
    "GetPitch"(): number;
    "GetPosition"(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    "GetRoll"(): number;
    "GetScale"(): number;
    "GetSpellVisualKit"(): number;
    "GetYaw"(): number;
    "Hide"(): void;
    "IsLoaded"(): boolean;
    "IsPreferringModelCollisionBounds"(): boolean;
    "IsShown"(): boolean;
    "IsUsingCenterForOrigin"(): LuaMultiReturn<[x: boolean, y: boolean, z: boolean]>;
    "IsVisible"(): boolean;
    "PlayAnimationKit"(animationKit: number, isLooping?: boolean): void;
    "SetAlpha"(alpha: number): void;
    "SetAnimation"(animation: WowApi.AnimationDataEnum, variation?: number | undefined, animSpeed?: number, animOffsetSeconds?: number): void;
    "SetAnimationBlendOperation"(blendOp: WowApi.ModelBlendOperation): void;
    "SetDesaturation"(strength: number): void;
    "SetGradientMask"(gradientIndex0: number, gradientIndex1: number, gradientIndex2: number, gradientIndex3: number): void;
    "SetGradientMaskWithDyes"(grad0DyeColorID?: number | undefined, grad1DyeColorID?: number | undefined, grad2DyeColorID?: number | undefined): void;
    "SetModelByCreatureDisplayID"(creatureDisplayID: number, useActivePlayerCustomizations?: boolean): boolean;
    "SetModelByFileID"(asset: string, useMips?: boolean): boolean;
    "SetModelByPath"(asset: string, useMips?: boolean): boolean;
    "SetModelByUnit"(unit: string, sheatheWeapons?: boolean, autoDress?: boolean, hideWeapons?: boolean, usePlayerNativeForm?: boolean, holdBowString?: boolean, customRaceID?: number | undefined): boolean;
    "SetModelByUnitCreatureDisplayID"(unit: string): boolean;
    "SetParticleOverrideScale"(scale?: number | undefined): void;
    "SetPitch"(pitch: number): void;
    "SetPlayerModelFromGlues"(characterIndex?: number | undefined, sheatheWeapons?: boolean, autoDress?: boolean, hideWeapons?: boolean, usePlayerNativeForm?: boolean, customRaceID?: number | undefined): boolean;
    "SetPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetPreferModelCollisionBounds"(preferCollisionBounds: boolean): void;
    "SetRoll"(roll: number): void;
    "SetScale"(scale: number): void;
    "SetShown"(show?: boolean): void;
    "SetSpellVisualKit"(spellVisualKitID?: number, oneShot?: boolean): void;
    "SetUseCenterForOrigin"(x?: boolean, y?: boolean, z?: boolean): void;
    "SetYaw"(yaw: number): void;
    "Show"(): void;
    "StopAnimationKit"(): void;
    "TryOn"(itemLinkOrItemModifiedAppearanceID: string, handSlotName?: string | undefined, spellEnchantmentID?: number): WowApi.ItemTryOnReason | undefined;
  }
  interface NamePlate {
    "CanChangeHitTestPoints"(): boolean;
    "ClearAllHitTestPoints"(): void;
    "GetHitTestPoints"(): readonly WowApi.AnchorBinding[];
    "SetAllHitTestPoints"(relativeTo: WowApi.SimpleScriptRegion): void;
    "SetHitTestPoints"(anchors: readonly WowApi.AnchorBinding[]): void;
    "SetStackingBoundsFrame"(frame: WowApi.SimpleFrame): void;
  }
  interface NumericFormatter {
    "FormatNumber"(number: number): string;
  }
  interface NumericRuleFormatter {
    "AddBreakpoint"(breakpoint: WowApi.NumericRuleFormatBreakpoint): void;
    "ClearBreakpoints"(): void;
    "Copy"(): WowApi.NumericRuleFormatter;
    "GetBreakpoints"(): readonly WowApi.NumericRuleFormatBreakpoint[];
    "SetBreakpoints"(breakpoints: readonly WowApi.NumericRuleFormatBreakpoint[]): void;
  }
  interface PingPinFrame {
  }
  interface QuestPOI {
    "GetNumTooltips"(): number;
    "GetTooltipIndex"(index: number): number;
    "UpdateMouseOverTooltip"(x: number, y: number): LuaMultiReturn<[questID: number | undefined, numObjectives: number | undefined]>;
  }
  interface ScenarioPOI {
    "GetScenarioTooltipText"(): string | undefined;
    "UpdateMouseOverTooltip"(x: number, y: number): boolean;
  }
  interface SecondsFormatter {
    "CanApproximate"(seconds: number): boolean;
    "CanRoundUpIntervals"(): boolean;
    "CanRoundUpLastUnit"(): boolean;
    "EvaluateDesiredUnitCount"(seconds: number): number;
    "EvaluateMaxInterval"(seconds: number): WowApi.SecondsFormatterInterval;
    "EvaluateMinInterval"(seconds: number): WowApi.SecondsFormatterInterval;
    "Format"(seconds: number, abbreviation?: WowApi.SecondsFormatterAbbreviation | undefined): string;
    "FormatZero"(abbreviation?: WowApi.SecondsFormatterAbbreviation | undefined): string;
    "GetApproximationSeconds"(): number;
    "GetConvertToLower"(): boolean;
    "GetDefaultAbbreviation"(): WowApi.SecondsFormatterAbbreviation | undefined;
    "GetDesiredUnitCount"(): number | undefined;
    "GetDesiredUnitCountCurve"(): WowApi.LuaCurveObject | undefined;
    "GetMaxInterval"(): WowApi.SecondsFormatterInterval | undefined;
    "GetMaxIntervalCurve"(): WowApi.LuaCurveObject | undefined;
    "GetMillisecondsThreshold"(): number;
    "GetMinInterval"(): WowApi.SecondsFormatterInterval | undefined;
    "GetMinIntervalCurve"(): WowApi.LuaCurveObject | undefined;
    "GetRounding"(): WowApi.SecondsFormatterRounding;
    "GetStripIntervalWhitespace"(): WowApi.SecondsFormatterIntervalWhitespace;
    "Reset"(): void;
    "SetApproximationSeconds"(seconds: number): void;
    "SetCanRoundUpIntervals"(canRound: boolean): void;
    "SetCanRoundUpLastUnit"(canRound: boolean): void;
    "SetConvertToLower"(convert: boolean): void;
    "SetDefaultAbbreviation"(abbreviation: WowApi.SecondsFormatterAbbreviation): void;
    "SetDesiredUnitCount"(count: number): void;
    "SetDesiredUnitCountCurve"(curve: WowApi.LuaCurveObject): void;
    "SetMaxInterval"(interval: WowApi.SecondsFormatterInterval): void;
    "SetMaxIntervalCurve"(curve: WowApi.LuaCurveObject): void;
    "SetMillisecondsThreshold"(threshold: number): void;
    "SetMinInterval"(interval: WowApi.SecondsFormatterInterval): void;
    "SetMinIntervalCurve"(curve: WowApi.LuaCurveObject): void;
    "SetRounding"(rounding: WowApi.SecondsFormatterRounding): void;
    "SetStripIntervalWhitespace"(strip: WowApi.SecondsFormatterIntervalWhitespace): void;
  }
  interface SimpleAnim {
    "GetDuration"(): number;
    "GetElapsed"(): number;
    "GetEndDelay"(): number;
    "GetOrder"(): number;
    "GetProgress"(): number;
    "GetRegionParent"(): WowApi.SimpleFrameScriptObject;
    "GetScript"(scriptTypeName: WowApi.ScriptTypeName, bindingType?: WowApi.ScriptBindingType): (...arguments_: unknown[]) => unknown;
    "GetSmoothing"(): WowApi.SmoothingType;
    "GetSmoothProgress"(): number;
    "GetStartDelay"(): number;
    "GetTarget"(): WowApi.SimpleFrameScriptObject;
    "HasScript"(scriptName: string): boolean;
    "HookScript"(scriptTypeName: WowApi.ScriptTypeName, script: (...arguments_: unknown[]) => unknown, bindingType?: WowApi.ScriptBindingType): boolean;
    "IsDelaying"(): boolean;
    "IsDone"(): boolean;
    "IsPaused"(): boolean;
    "IsPlaying"(): boolean;
    "IsStopped"(): boolean;
    "Pause"(): void;
    "Play"(): void;
    "Restart"(): void;
    "SetChildKey"(childKey: string): boolean;
    "SetDuration"(durationSec: number, recomputeGroupDuration?: boolean): void;
    "SetEndDelay"(delaySec: number, recomputeGroupDuration?: boolean): void;
    "SetOrder"(newOrder: number): void;
    "SetParent"(parent: WowApi.SimpleAnimGroup, order?: number | undefined): void;
    "SetPlaying"(play: boolean): void;
    "SetScript"(scriptTypeName: WowApi.ScriptTypeName, script?: (...arguments_: unknown[]) => unknown | undefined): void;
    "SetSmoothing"(weights: WowApi.SmoothingType): void;
    "SetSmoothProgress"(durationSec: number): void;
    "SetStartDelay"(delaySec: number, recomputeGroupDuration?: boolean): void;
    "SetTarget"(target: WowApi.SimpleFrameScriptObject): boolean;
    "SetTargetKey"(key: string): boolean;
    "SetTargetName"(name: string): boolean;
    "SetTargetParent"(): boolean;
    "Stop"(): void;
  }
  interface SimpleAnimAlpha {
    "GetFromAlpha"(): number;
    "GetToAlpha"(): number;
    "SetFromAlpha"(normalizedAlpha: number): void;
    "SetToAlpha"(normalizedAlpha: number): void;
  }
  interface SimpleAnimatableObject {
    "CreateAnimationGroup"(name?: string | undefined, templateName?: string | undefined): WowApi.SimpleAnimGroup;
    "GetAnimationGroups"(): LuaMultiReturn<[...values: (WowApi.SimpleAnimGroup)[]]>;
    "StopAnimating"(): void;
  }
  interface SimpleAnimFlipBook {
    "GetFlipBookColumns"(): number;
    "GetFlipBookFrameHeight"(): number;
    "GetFlipBookFrames"(): number;
    "GetFlipBookFrameWidth"(): number;
    "GetFlipBookRows"(): number;
    "SetFlipBookColumns"(columns: number): void;
    "SetFlipBookFrameHeight"(height: number): void;
    "SetFlipBookFrames"(frames: number): void;
    "SetFlipBookFrameWidth"(width: number): void;
    "SetFlipBookRows"(rows: number): void;
  }
  interface SimpleAnimGroup {
    "CreateAnimation"(animationType?: string | undefined, name?: string | undefined, templateName?: string | undefined): WowApi.SimpleAnim;
    "Finish"(): void;
    "GetAnimations"(): LuaMultiReturn<[...values: (WowApi.SimpleAnim)[]]>;
    "GetAnimationSpeedMultiplier"(): number;
    "GetDuration"(): number;
    "GetElapsed"(): number;
    "GetLooping"(): WowApi.LoopType;
    "GetLoopState"(): string;
    "GetProgress"(): number;
    "GetScript"(scriptTypeName: WowApi.ScriptTypeName, bindingType?: WowApi.ScriptBindingType): (...arguments_: unknown[]) => unknown;
    "HasScript"(scriptName: string): boolean;
    "HookScript"(scriptTypeName: WowApi.ScriptTypeName, script: (...arguments_: unknown[]) => unknown, bindingType?: WowApi.ScriptBindingType): boolean;
    "IsDone"(): boolean;
    "IsPaused"(): boolean;
    "IsPendingFinish"(): boolean;
    "IsPlaying"(): boolean;
    "IsReverse"(): boolean;
    "IsSetToFinalAlpha"(): boolean;
    "Pause"(): void;
    "Play"(reverse?: boolean, offset?: number): void;
    "RemoveAnimations"(): void;
    "Restart"(reverse?: boolean, offset?: number): void;
    "SetAnimationSpeedMultiplier"(animationSpeedMultiplier: number): void;
    "SetLooping"(loopType: WowApi.LoopType): void;
    "SetPlaying"(play: boolean): void;
    "SetScript"(scriptTypeName: WowApi.ScriptTypeName, script?: (...arguments_: unknown[]) => unknown | undefined): void;
    "SetToFinalAlpha"(setToFinalAlpha: boolean): void;
    "Stop"(): void;
  }
  interface SimpleAnimPath {
    "CreateControlPoint"(name?: string | undefined, templateName?: string | undefined, order?: number | undefined): WowApi.SimpleControlPoint;
    "GetControlPoints"(): LuaMultiReturn<[...values: (WowApi.SimpleControlPoint)[]]>;
    "GetCurveType"(): WowApi.CurveType;
    "GetMaxControlPointOrder"(): number;
    "SetCurveType"(curveType: WowApi.CurveType): void;
  }
  interface SimpleAnimRadialProgress {
    "GetFromPercent"(): number;
    "GetToPercent"(): number;
    "SetFromPercent"(percent: number): void;
    "SetToPercent"(percent: number): void;
  }
  interface SimpleAnimRotation {
    "GetDegrees"(): number;
    "GetOrigin"(): LuaMultiReturn<[point: WowApi.FramePoint, originX: number, originY: number]>;
    "GetRadians"(): number;
    "SetDegrees"(angle: number): void;
    "SetOrigin"(point: WowApi.FramePoint, originX: number, originY: number): void;
    "SetRadians"(angle: number): void;
  }
  interface SimpleAnimScale {
    "GetOrigin"(): LuaMultiReturn<[point: WowApi.FramePoint, originX: number, originY: number]>;
    "GetScale"(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    "GetScaleFrom"(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    "GetScaleTo"(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    "SetOrigin"(point: WowApi.FramePoint, originX: number, originY: number): void;
    "SetScale"(scaleX: number, scaleY: number): void;
    "SetScaleFrom"(scaleX: number, scaleY: number): void;
    "SetScaleTo"(scaleX: number, scaleY: number): void;
  }
  interface SimpleAnimScaleLine {
  }
  interface SimpleAnimTextureCoordTranslation {
    "GetOffset"(): LuaMultiReturn<[offsetU: number, offsetV: number]>;
    "SetOffset"(offsetU: number, offsetV: number): void;
  }
  interface SimpleAnimTranslation {
    "GetOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "SetOffset"(offsetX: number, offsetY: number): void;
  }
  interface SimpleAnimTranslationLine {
  }
  interface SimpleAnimVertexColor {
    "GetEndColor"(): WowApi.colorRGBA;
    "GetStartColor"(): WowApi.colorRGBA;
    "SetEndColor"(color: WowApi.colorRGBA): void;
    "SetStartColor"(color: WowApi.colorRGBA): void;
  }
  interface SimpleBrowser {
    "ClearFocus"(): void;
    "CopyExternalLink"(): void;
    "DeleteCookies"(): void;
    "NavigateBack"(): void;
    "NavigateForward"(): void;
    "NavigateHome"(urlType: string): void;
    "NavigateReload"(): void;
    "NavigateStop"(): void;
    "OpenExternalLink"(): void;
    "OpenTicket"(index: number): void;
    "SetFocus"(): void;
    "SetZoom"(zoom: number): void;
  }
  interface SimpleButton {
    "ClearDisabledTexture"(): void;
    "ClearHighlightTexture"(): void;
    "ClearNormalTexture"(): void;
    "ClearPushedTexture"(): void;
    "Click"(button?: string, isDown?: boolean): void;
    "Disable"(): void;
    "Enable"(): void;
    "GetButtonState"(): WowApi.SimpleButtonStateToken;
    "GetDisabledFontObject"(): WowApi.SimpleFont;
    "GetDisabledTexture"(): WowApi.SimpleTexture;
    "GetFontString"(): WowApi.SimpleFontString;
    "GetHighlightFontObject"(): WowApi.SimpleFont;
    "GetHighlightTexture"(): WowApi.SimpleTexture;
    "GetMotionScriptsWhileDisabled"(): boolean;
    "GetNormalFontObject"(): WowApi.SimpleFont;
    "GetNormalTexture"(): WowApi.SimpleTexture;
    "GetPushedTextOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetPushedTexture"(): WowApi.SimpleTexture;
    "GetText"(): string;
    "GetTextHeight"(): number;
    "GetTextWidth"(): number;
    "IsEnabled"(): boolean;
    "RegisterForClicks"(...buttons: (WowApi.ClickButton)[]): void;
    "RegisterForMouse"(...buttons: (WowApi.ClickButton)[]): void;
    "SetButtonState"(buttonState: WowApi.SimpleButtonStateToken, lock?: boolean): void;
    "SetDisabledAtlas"(atlas: string): void;
    "SetDisabledFontObject"(font: WowApi.SimpleFont): void;
    "SetDisabledTexture"(asset: WowApi.TextureAsset): void;
    "SetEnabled"(enabled?: boolean): void;
    "SetFontString"(fontString: WowApi.SimpleFontString): void;
    "SetFormattedText"(text: string): void;
    "SetHighlightAtlas"(atlas: string, blendMode?: WowApi.BlendMode | undefined): void;
    "SetHighlightFontObject"(font: WowApi.SimpleFont): void;
    "SetHighlightTexture"(asset: WowApi.TextureAsset, blendMode?: WowApi.BlendMode | undefined): void;
    "SetMotionScriptsWhileDisabled"(motionScriptsWhileDisabled: boolean): void;
    "SetNormalAtlas"(atlas: string): void;
    "SetNormalFontObject"(font: WowApi.SimpleFont): void;
    "SetNormalTexture"(asset: WowApi.TextureAsset): void;
    "SetPushedAtlas"(atlas: string): void;
    "SetPushedTextOffset"(offsetX: number, offsetY: number): void;
    "SetPushedTexture"(asset: WowApi.TextureAsset): void;
    "SetText"(text?: string): void;
  }
  interface SimpleCheckbox {
    "GetChecked"(): boolean;
    "GetCheckedTexture"(): WowApi.SimpleTexture;
    "GetDisabledCheckedTexture"(): WowApi.SimpleTexture;
    "SetChecked"(checked?: boolean): void;
    "SetCheckedTexture"(asset: WowApi.TextureAsset): void;
    "SetDisabledCheckedTexture"(asset: WowApi.TextureAsset): void;
  }
  interface SimpleCheckout {
    "CancelOpenCheckout"(): void;
    "ClearFocus"(): void;
    "CloseCheckout"(): void;
    "CopyExternalLink"(): void;
    "OpenCheckout"(checkoutID: number): boolean;
    "OpenExternalLink"(): void;
    "SetFocus"(): void;
    "SetZoom"(zoomLevel: number): void;
  }
  interface SimpleColorSelect {
    "ClearColorWheelTexture"(): void;
    "GetColorAlpha"(): number;
    "GetColorAlphaTexture"(): WowApi.SimpleTexture;
    "GetColorAlphaThumbTexture"(): WowApi.SimpleTexture;
    "GetColorHSV"(): LuaMultiReturn<[hsvX: number, hsvY: number, hsvZ: number]>;
    "GetColorRGB"(): LuaMultiReturn<[rgbR: number, rgbG: number, rgbB: number]>;
    "GetColorValueTexture"(): WowApi.SimpleTexture;
    "GetColorValueThumbTexture"(): WowApi.SimpleTexture;
    "GetColorWheelTexture"(): WowApi.SimpleTexture;
    "GetColorWheelThumbTexture"(): WowApi.SimpleTexture;
    "SetColorAlpha"(alpha: number): void;
    "SetColorAlphaTexture"(texture: WowApi.SimpleTexture): void;
    "SetColorAlphaThumbTexture"(texture: WowApi.TextureAsset): void;
    "SetColorHSV"(hsvX: number, hsvY: number, hsvZ: number): void;
    "SetColorRGB"(rgbR: number, rgbG: number, rgbB: number): void;
    "SetColorValueTexture"(texture: WowApi.SimpleTexture): void;
    "SetColorValueThumbTexture"(texture: WowApi.TextureAsset): void;
    "SetColorWheelTexture"(texture: WowApi.SimpleTexture): void;
    "SetColorWheelThumbTexture"(texture: WowApi.TextureAsset): void;
  }
  interface SimpleControlPoint {
    "GetOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetOrder"(): number;
    "SetOffset"(offsetX: number, offsetY: number): void;
    "SetOrder"(order: number): void;
    "SetParent"(parent: WowApi.SimplePathAnim, order?: number | undefined): void;
  }
  interface SimpleEditBox {
    "AddHistoryLine"(text: string): void;
    "ClearFocus"(): void;
    "ClearHighlightText"(): void;
    "ClearHistory"(): void;
    "Disable"(): void;
    "Enable"(): void;
    "GetAltArrowKeyMode"(): boolean;
    "GetBlinkSpeed"(): number;
    "GetCursorPosition"(): number;
    "GetDisplayText"(): string | undefined;
    "GetFont"(): LuaMultiReturn<[name: string, fontHeight: number, flags: WowApi.TBFFlags]>;
    "GetFontObject"(): WowApi.SimpleFont;
    "GetHighlightColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetHistoryLines"(): number;
    "GetIndentedWordWrap"(): boolean;
    "GetInputLanguage"(): string;
    "GetJustifyH"(): WowApi.JustifyHorizontal;
    "GetJustifyV"(): WowApi.JustifyVertical;
    "GetMaxBytes"(): number;
    "GetMaxLetters"(): number;
    "GetNumber"(): number | undefined;
    "GetNumLetters"(): number | undefined;
    "GetNumLines"(): number;
    "GetShadowColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetShadowOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetSpacing"(): number;
    "GetText"(): string;
    "GetTextColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetTextInsets"(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    "GetUTF8CursorPosition"(): number;
    "GetVisibleTextByteLimit"(): number;
    "HasFocus"(): boolean;
    "HasText"(): boolean;
    "HighlightText"(start?: number, stop?: number): void;
    "Insert"(text: string): void;
    "IsAlphabeticOnly"(): boolean;
    "IsAutoFocus"(): boolean;
    "IsCountInvisibleLetters"(): boolean;
    "IsEnabled"(): boolean;
    "IsInIMECompositionMode"(): boolean;
    "IsMultiLine"(): boolean;
    "IsNumeric"(): boolean;
    "IsNumericFullRange"(): boolean;
    "IsPassword"(): boolean;
    "IsSecureText"(): boolean;
    "ResetInputMode"(): void;
    "SetAlphabeticOnly"(enabled?: boolean): void;
    "SetAltArrowKeyMode"(altMode?: boolean): void;
    "SetAutoFocus"(autoFocus?: boolean): void;
    "SetBlinkSpeed"(cursorBlinkSpeedSec: number): void;
    "SetCountInvisibleLetters"(countInvisibleLetters?: boolean): void;
    "SetCursorPosition"(cursorPosition: number): void;
    "SetEnabled"(enabled?: boolean): void;
    "SetFocus"(): void;
    "SetFont"(fontFile: string, height: number, flags: WowApi.TBFFlags): boolean;
    "SetFontObject"(font: WowApi.SimpleFont): void;
    "SetHighlightColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetHistoryLines"(numHistoryLines: number): void;
    "SetIndentedWordWrap"(isIndented?: boolean): void;
    "SetJustifyH"(justifyH: WowApi.JustifyHorizontal): void;
    "SetJustifyV"(justifyV: WowApi.JustifyVertical): void;
    "SetMaxBytes"(maxBytes: number): void;
    "SetMaxLetters"(maxLetters: number): void;
    "SetMultiLine"(multiline?: boolean): void;
    "SetNumber"(number: number): void;
    "SetNumeric"(isNumeric?: boolean): void;
    "SetNumericFullRange"(isNumeric?: boolean): void;
    "SetPassword"(isPassword?: boolean): void;
    "SetSecureText"(isSecure?: boolean): void;
    "SetSecurityDisablePaste"(): void;
    "SetSecurityDisableSetText"(): void;
    "SetShadowColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetShadowOffset"(offsetX: number, offsetY: number): void;
    "SetSpacing"(fontHeight: number): void;
    "SetText"(text: string): void;
    "SetTextColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetTextInsets"(left: number, right: number, top: number, bottom: number): void;
    "SetVisibleTextByteLimit"(maxVisibleBytes: number): void;
    "ToggleInputLanguage"(): void;
  }
  interface SimpleFont {
    "CopyFontObject"(sourceFont: WowApi.SimpleFont): void;
    "GetAlpha"(): number;
    "GetFont"(): LuaMultiReturn<[fontFile: string, height: number, flags: WowApi.TBFFlags]>;
    "GetFontHeight"(): number;
    "GetFontObject"(): WowApi.SimpleFont;
    "GetFontObjectForAlphabet"(alphabet: WowApi.FontAlphabet): WowApi.SimpleFont;
    "GetIndentedWordWrap"(): boolean;
    "GetJustifyH"(): WowApi.JustifyHorizontal;
    "GetJustifyV"(): WowApi.JustifyVertical;
    "GetShadowColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetShadowOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetSpacing"(): number;
    "GetTextColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "SetAlpha"(alpha: number): void;
    "SetFont"(fontFile: string, height: number, flags: WowApi.TBFFlags): void;
    "SetFontHeight"(height: number): void;
    "SetFontObject"(font: WowApi.SimpleFont): void;
    "SetIndentedWordWrap"(wordWrap: boolean): void;
    "SetJustifyH"(justifyH: WowApi.JustifyHorizontal): void;
    "SetJustifyV"(justifyV: WowApi.JustifyVertical): void;
    "SetShadowColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetShadowOffset"(offsetX: number, offsetY: number): void;
    "SetSpacing"(spacing: number): void;
    "SetTextColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
  }
  interface SimpleFontString {
    "CalculateScreenAreaFromCharacterSpan"(leftIndex: number, rightIndex: number): readonly WowApi.uiBoundsRect[] | undefined;
    "CanNonSpaceWrap"(): boolean;
    "CanWordWrap"(): boolean;
    "ClearAlphaGradient"(): void;
    "ClearText"(): void;
    "FindCharacterIndexAtCoordinate"(x: number, y: number): LuaMultiReturn<[characterIndex: number, inside: boolean]> | undefined;
    "GetAlphaGradient"(): LuaMultiReturn<[start: number, length: number]>;
    "GetFieldSize"(): number;
    "GetFont"(): LuaMultiReturn<[fontFile: string | undefined, fontHeight: number, flags: WowApi.TBFFlags]>;
    "GetFontHeight"(calculated?: boolean): number;
    "GetFontObject"(): WowApi.SimpleFont;
    "GetIndentedWordWrap"(): boolean;
    "GetJustifyH"(): WowApi.JustifyHorizontal;
    "GetJustifyV"(): WowApi.JustifyVertical;
    "GetLineHeight"(): number;
    "GetMaxLines"(): number;
    "GetNumLines"(): number;
    "GetRotation"(): number;
    "GetScaleAnimationMode"(): WowApi.FontStringScaleAnimationMode;
    "GetShadowColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetShadowOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetSmoothScaling"(): boolean;
    "GetSpacing"(): number;
    "GetStringHeight"(): number;
    "GetStringWidth"(): number;
    "GetText"(): string;
    "GetTextColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]> | undefined;
    "GetTextScale"(): number;
    "GetUnboundedStringWidth"(): number;
    "GetUnboundedStringWidthForText"(text: string): number;
    "GetWrappedWidth"(): number;
    "IsTruncated"(): boolean;
    "OnColorsUpdated"(): void;
    "SetAlphaGradient"(start: number, length: number): boolean;
    "SetDesaturateEmbeddedTextures"(desaturate: boolean): void;
    "SetFixedColor"(fixedColor: boolean): void;
    "SetFont"(fontFile: string, fontHeight: number, flags?: WowApi.TBFFlags | undefined): boolean;
    "SetFontHeight"(height: number): void;
    "SetFontObject"(font: WowApi.SimpleFont): void;
    "SetFormattedText"(text: string): void;
    "SetIndentedWordWrap"(wrap: boolean): void;
    "SetJustifyH"(justifyH: WowApi.JustifyHorizontal): void;
    "SetJustifyV"(justifyV: WowApi.JustifyVertical): void;
    "SetMaxLines"(maxLines: number): void;
    "SetNonSpaceWrap"(wrap: boolean): void;
    "SetRotation"(radians: number): void;
    "SetScaleAnimationMode"(scaleAnimationMode: WowApi.FontStringScaleAnimationMode): void;
    "SetShadowColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetShadowOffset"(offsetX: number, offsetY: number): void;
    "SetSmoothScaling"(smoothScaling: boolean): void;
    "SetSpacing"(spacing: number): void;
    "SetText"(text?: string): void;
    "SetTextColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetTextHeight"(height: number): void;
    "SetTextScale"(textScale: number): void;
    "SetTextToFit"(text?: string): void;
    "SetWordWrap"(wrap: boolean): void;
  }
  interface SimpleFrame {
    "AbortDrag"(): void;
    "AddRoleset"(roleset: string): void;
    "CanChangeAttribute"(): boolean;
    "ClearAlphaGradient"(): void;
    "ClearAttribute"(attributeName: string): boolean;
    "ClearAttributes"(): void;
    "CreateFontString"(name?: string | undefined, drawLayer?: WowApi.DrawLayer | undefined, templateName?: string | undefined): WowApi.SimpleFontString;
    "CreateLine"(name?: string | undefined, drawLayer?: WowApi.DrawLayer | undefined, templateName?: string | undefined, subLevel?: number | undefined): WowApi.SimpleLine;
    "CreateMaskTexture"(name?: string | undefined, drawLayer?: WowApi.DrawLayer | undefined, templateName?: string | undefined, subLevel?: number | undefined): WowApi.SimpleMaskTexture;
    "CreateTexture"(name?: string | undefined, drawLayer?: WowApi.DrawLayer | undefined, templateName?: string | undefined, subLevel?: number | undefined): WowApi.SimpleTexture;
    "CreateVectorGraphics"(name?: string | undefined, drawLayer?: WowApi.DrawLayer | undefined, templateName?: string | undefined, subLevel?: number | undefined): WowApi.SimpleVectorGraphics;
    "DesaturateHierarchy"(desaturation: number, excludeRoot?: boolean): void;
    "DisableDrawLayer"(layer: WowApi.DrawLayer): void;
    "DoesClipChildren"(): boolean;
    "DoesHyperlinkPropagateToParent"(): boolean;
    "EnableDrawLayer"(layer: WowApi.DrawLayer): void;
    "EnableGamePadButton"(enable?: boolean): void;
    "EnableGamePadStick"(enable?: boolean): void;
    "EnableKeyboard"(enable?: boolean): void;
    "ExecuteAttribute"(attributeName: string, ...arguments: (string | undefined)[]): LuaMultiReturn<[success: boolean, ...values: (string | undefined)[]]>;
    "GetAlpha"(): number;
    "GetAttribute"(attributeName: string): string;
    "GetBoundsRect"(): LuaMultiReturn<[left: number, bottom: number, width: number, height: number]>;
    "GetChildren"(): LuaMultiReturn<[...values: (WowApi.SimpleFrame)[]]>;
    "GetClampRectInsets"(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    "GetDontSavePosition"(): boolean;
    "GetEffectiveAlpha"(): number;
    "GetEffectivelyFlattensRenderLayers"(): boolean;
    "GetEffectiveScale"(): number;
    "GetFlattensRenderLayers"(): boolean;
    "GetFrameLevel"(): number;
    "GetFrameStrata"(): WowApi.FrameStrata;
    "GetHighestFrameLevel"(iterateAllChildren?: boolean): number;
    "GetHitRectInsets"(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    "GetHyperlinksEnabled"(): boolean;
    "GetID"(): number;
    "GetNumChildren"(): number;
    "GetNumRegions"(): number;
    "GetOnUpdateMode"(): WowApi.OnUpdateMode;
    "GetPropagateKeyboardInput"(): boolean;
    "GetRaisedFrameLevel"(): number;
    "GetRegions"(): LuaMultiReturn<[...values: (WowApi.SimpleRegion)[]]>;
    "GetResizeBounds"(): LuaMultiReturn<[minWidth: number, minHeight: number, maxWidth: number, maxHeight: number]>;
    "GetRolesetNames"(): readonly string[];
    "GetScale"(): number;
    "GetWindow"(): WowApi.SimpleWindow;
    "HasAlphaGradient"(): boolean;
    "HasFixedFrameLevel"(): boolean;
    "HasFixedFrameStrata"(): boolean;
    "Hide"(): void;
    "InterceptStartDrag"(delegate: WowApi.SimpleFrame): boolean;
    "IsClampedToScreen"(): boolean;
    "IsDrawLayerEnabled"(layer: WowApi.DrawLayer): boolean;
    "IsEventRegistered"(eventName: string): LuaMultiReturn<[isRegistered: boolean, ...values: (WowApi.UnitTokenType | undefined)[]]>;
    "IsFrameBuffer"(): boolean;
    "IsGamePadButtonEnabled"(): boolean;
    "IsGamePadStickEnabled"(): boolean;
    "IsHighlightLocked"(): boolean;
    "IsIgnoringChildrenForBounds"(): boolean;
    "IsIgnoringParentAlpha"(): boolean;
    "IsIgnoringParentScale"(): boolean;
    "IsKeyboardEnabled"(): boolean;
    "IsMovable"(): boolean;
    "IsObjectLoaded"(): boolean;
    "IsResizable"(): boolean;
    "IsRolesetFiltered"(): boolean;
    "IsShown"(): boolean;
    "IsToplevel"(): boolean;
    "IsUserPlaced"(): boolean;
    "IsUsingParentLevel"(): boolean;
    "IsVisible"(): boolean;
    "LockHighlight"(): void;
    "Lower"(): void;
    "Raise"(): void;
    "RegisterAllEvents"(): void;
    "RegisterEvent"(eventName: string): boolean;
    "RegisterEventCallback"(eventName: string, cb: WowApi.FrameEventCallbackType): boolean;
    "RegisterForDrag"(...buttons: (WowApi.MouseButton)[]): void;
    "RegisterUnitEvent"(eventName: string, ...units: (WowApi.UnitTokenType)[]): boolean;
    "RegisterUnitEventCallback"(eventName: string, cb: WowApi.FrameEventCallbackType, ...units: (WowApi.UnitTokenType)[]): boolean;
    "RemoveRoleset"(roleset: string): void;
    "ResizeToBoundsRect"(): void;
    "RotateTextures"(radians: number, x?: number, y?: number): void;
    "SetAlpha"(alpha: number): void;
    "SetAlphaFromBoolean"(value: boolean, alphaIfTrue?: number, alphaIfFalse?: number): void;
    "SetAlphaGradient"(index: number, gradient: WowApi.vector2): void;
    "SetAttribute"(attributeName: string, value: string): void;
    "SetAttributeNoHandler"(attributeName: string, value: string): void;
    "SetClampedToScreen"(clampedToScreen: boolean): void;
    "SetClampRectInsets"(left: number, right: number, top: number, bottom: number): void;
    "SetClipsChildren"(clipsChildren: boolean): void;
    "SetDontSavePosition"(dontSave: boolean): void;
    "SetDrawLayerEnabled"(layer: WowApi.DrawLayer, isEnabled?: boolean): void;
    "SetFixedFrameLevel"(isFixed: boolean): void;
    "SetFixedFrameStrata"(isFixed: boolean): void;
    "SetFlattensRenderLayers"(flatten: boolean): void;
    "SetFrameLevel"(frameLevel: number): void;
    "SetFrameStrata"(strata: WowApi.FrameStrata): void;
    "SetHighlightLocked"(locked: boolean): void;
    "SetHitRectInsets"(left: number, right: number, top: number, bottom: number): void;
    "SetHyperlinkPropagateToParent"(canPropagate: boolean): void;
    "SetHyperlinksEnabled"(enabled?: boolean): void;
    "SetID"(id: number): void;
    "SetIgnoreParentAlpha"(ignore: boolean): void;
    "SetIgnoreParentScale"(ignore: boolean): void;
    "SetIgnoringChildrenForBounds"(ignore: boolean): void;
    "SetIsFrameBuffer"(isFrameBuffer: boolean): void;
    "SetMovable"(movable: boolean): void;
    "SetOnUpdateMode"(onUpdateMode: WowApi.OnUpdateMode): void;
    "SetPropagateKeyboardInput"(propagate: boolean): void;
    "SetResizable"(resizable: boolean): void;
    "SetResizeBounds"(minWidth: number, minHeight: number, maxWidth?: number | undefined, maxHeight?: number | undefined): void;
    "SetRolesets"(rolesetsString?: string | undefined): void;
    "SetScale"(scale: number): void;
    "SetShown"(shown?: boolean): void;
    "SetToplevel"(topLevel: boolean): void;
    "SetUserPlaced"(userPlaced: boolean): void;
    "SetUsingParentLevel"(usingParentLevel: boolean): void;
    "SetWindow"(window?: WowApi.SimpleWindow | undefined): void;
    "Show"(): void;
    "StartMoving"(alwaysStartFromMouse?: boolean): void;
    "StartSizing"(resizePoint?: WowApi.FramePoint | undefined, alwaysStartFromMouse?: boolean): void;
    "StopMovingOrSizing"(): void;
    "UnlockHighlight"(): void;
    "UnregisterAllEvents"(): void;
    "UnregisterEvent"(eventName: string): boolean;
  }
  interface SimpleFrameScriptObject {
    "AddAccessRestrictions"(restrictions: WowApi.ScriptObjectAccessRestriction): void;
    "AddForbiddenAspects"(aspects: WowApi.ForbiddenAspect): void;
    "AddSecretAspect"(aspect: WowApi.SecretAspect): void;
    "CanBeAccessedInContext"(): boolean;
    "GetAccessRestrictions"(): WowApi.ScriptObjectAccessRestriction;
    "GetForbiddenAspects"(): WowApi.ForbiddenAspect;
    "GetInheritableForbiddenAspects"(path: WowApi.ScriptObjectPropagationPath): WowApi.ForbiddenAspect;
    "GetName"(): string;
    "GetObjectTable"(): WowApi.SimpleFrameScriptObject;
    "GetObjectType"(): string;
    "HasAccessConstraints"(): boolean;
    "HasAnyAccessRestrictions"(restrictions?: WowApi.ScriptObjectAccessRestriction | undefined): boolean;
    "HasAnyForbiddenAspects"(aspects?: WowApi.ForbiddenAspect | undefined): boolean;
    "HasAnySecretAspect"(): boolean;
    "HasSecretAspect"(aspect: WowApi.SecretAspect): boolean;
    "HasSecretValues"(): boolean;
    "IsForbidden"(): boolean;
    "IsObjectType"(objectType: string): boolean;
    "IsPreventingSecretValues"(): boolean;
    "SetForbidden"(): void;
    "SetToDefaults"(): void;
  }
  interface SimpleHTML {
    "GetContentHeight"(): number;
    "GetFont"(textType: WowApi.HTMLTextType): LuaMultiReturn<[fontFile: string, height: number, flags: WowApi.TBFFlags]>;
    "GetFontObject"(textType: WowApi.HTMLTextType): WowApi.SimpleFont;
    "GetHyperlinkFormat"(): string;
    "GetIndentedWordWrap"(textType: WowApi.HTMLTextType): boolean;
    "GetJustifyH"(textType: WowApi.HTMLTextType): WowApi.JustifyHorizontal;
    "GetJustifyV"(textType: WowApi.HTMLTextType): WowApi.JustifyVertical;
    "GetShadowColor"(textType: WowApi.HTMLTextType): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetShadowOffset"(textType: WowApi.HTMLTextType): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetSpacing"(textType: WowApi.HTMLTextType): number;
    "GetTextColor"(textType: WowApi.HTMLTextType): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetTextData"(): readonly WowApi.HTMLContentNode[];
    "SetFont"(textType: WowApi.HTMLTextType, fontFile: string, height: number, flags: WowApi.TBFFlags): void;
    "SetFontObject"(textType: WowApi.HTMLTextType, font: WowApi.SimpleFont): void;
    "SetHyperlinkFormat"(format: string): void;
    "SetIndentedWordWrap"(textType: WowApi.HTMLTextType, wordWrap: boolean): void;
    "SetJustifyH"(textType: WowApi.HTMLTextType, justifyH: WowApi.JustifyHorizontal): void;
    "SetJustifyV"(textType: WowApi.HTMLTextType, justifyV: WowApi.JustifyVertical): void;
    "SetShadowColor"(textType: WowApi.HTMLTextType, colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetShadowOffset"(textType: WowApi.HTMLTextType, offsetX: number, offsetY: number): void;
    "SetSpacing"(textType: WowApi.HTMLTextType, spacing: number): void;
    "SetText"(text: string, ignoreMarkup?: boolean): void;
    "SetTextColor"(textType: WowApi.HTMLTextType, colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
  }
  interface SimpleLine {
    "ClearAllPoints"(): void;
    "GetEndPoint"(): LuaMultiReturn<[relativePoint: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, offsetX: number, offsetY: number]>;
    "GetHitRectThickness"(): number;
    "GetStartPoint"(): LuaMultiReturn<[relativePoint: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, offsetX: number, offsetY: number]>;
    "GetThickness"(): number;
    "SetEndPoint"(relativePoint: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, offsetX?: number, offsetY?: number): void;
    "SetHitRectThickness"(thickness: number): void;
    "SetStartPoint"(relativePoint: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, offsetX?: number, offsetY?: number): void;
    "SetThickness"(thickness: number): void;
  }
  interface SimpleMapScene {
    "GetMaxCharacterSlotCount"(): number;
    "GetModelDrawLayer"(): LuaMultiReturn<[layer: WowApi.DrawLayer, sublayer: number]>;
    "GetViewInsets"(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    "SetModelDrawLayer"(layer: WowApi.DrawLayer): void;
    "SetViewInsets"(left: number, right: number, top: number, bottom: number): void;
  }
  interface SimpleMaskTexture {
  }
  interface SimpleMessageFrame {
    "AddMessage"(text: string, colorR: number, colorG: number, colorB: number, a?: number | undefined, messageID?: number | undefined): void;
    "Clear"(): void;
    "GetFadeDuration"(): number;
    "GetFadePower"(): number;
    "GetFading"(): boolean;
    "GetFont"(): LuaMultiReturn<[fontFile: string, height: number, flags: WowApi.TBFFlags]>;
    "GetFontObject"(): WowApi.SimpleFont;
    "GetFontStringByID"(messageID: number): WowApi.SimpleFontString;
    "GetIndentedWordWrap"(): boolean;
    "GetInsertMode"(): WowApi.InsertMode;
    "GetJustifyH"(): WowApi.JustifyHorizontal;
    "GetJustifyV"(): WowApi.JustifyVertical;
    "GetShadowColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetShadowOffset"(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetSpacing"(): number;
    "GetTextColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetTimeVisible"(): number;
    "HasMessageByID"(messageID: number): boolean;
    "ResetMessageFadeByID"(messageID: number): void;
    "SetFadeDuration"(fadeDurationSeconds: number): void;
    "SetFadePower"(fadePower: number): void;
    "SetFading"(fading: boolean): void;
    "SetFont"(fontFile: string, height: number, flags: WowApi.TBFFlags): void;
    "SetFontObject"(font: WowApi.SimpleFont): void;
    "SetIndentedWordWrap"(wordWrap: boolean): void;
    "SetInsertMode"(mode: WowApi.InsertMode): void;
    "SetJustifyH"(justifyH: WowApi.JustifyHorizontal): void;
    "SetJustifyV"(justifyV: WowApi.JustifyVertical): void;
    "SetShadowColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetShadowOffset"(offsetX: number, offsetY: number): void;
    "SetSpacing"(spacing: number): void;
    "SetTextColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetTimeVisible"(timeVisibleSeconds: number): void;
  }
  interface SimpleModel {
    "AdvanceTime"(): void;
    "ClearFog"(): void;
    "ClearModel"(): void;
    "ClearTransform"(): void;
    "GetCameraDistance"(): number;
    "GetCameraFacing"(): number;
    "GetCameraPosition"(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    "GetCameraRoll"(): number;
    "GetCameraTarget"(): LuaMultiReturn<[targetX: number, targetY: number, targetZ: number]>;
    "GetDesaturation"(): number;
    "GetFacing"(): number;
    "GetFogColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetFogFar"(): number;
    "GetFogNear"(): number;
    "GetLight"(): LuaMultiReturn<[enabled: boolean, light: WowApi.ModelLight]>;
    "GetModelAlpha"(): number;
    "GetModelDrawLayer"(): LuaMultiReturn<[layer: WowApi.DrawLayer, sublayer: number]>;
    "GetModelFileID"(): number;
    "GetModelScale"(): number;
    "GetPaused"(): boolean;
    "GetPitch"(): number;
    "GetPosition"(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    "GetRoll"(): number;
    "GetShadowEffect"(): number;
    "GetViewInsets"(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    "GetViewTranslation"(): LuaMultiReturn<[x: number, y: number]>;
    "GetWorldScale"(): number;
    "HasAttachmentPoints"(): boolean;
    "HasCustomCamera"(): boolean;
    "IsUsingModelCenterToTransform"(): boolean;
    "MakeCurrentCameraCustom"(): void;
    "ReplaceIconTexture"(asset: string): void;
    "SetCamera"(cameraIndex: number): void;
    "SetCameraDistance"(distance: number): void;
    "SetCameraFacing"(radians: number): void;
    "SetCameraPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetCameraRoll"(radians: number): void;
    "SetCameraTarget"(targetX: number, targetY: number, targetZ: number): void;
    "SetCustomCamera"(cameraIndex: number): void;
    "SetDesaturation"(strength: number): void;
    "SetFacing"(facing: number): void;
    "SetFogColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetFogFar"(fogFar: number): void;
    "SetFogNear"(fogNear: number): void;
    "SetGlow"(glow: number): void;
    "SetGradientMask"(grad0: number, grad1: number, grad2: number, grad3: number): void;
    "SetLight"(enabled: boolean, light: WowApi.ModelLight): void;
    "SetModel"(asset: string, noMip?: boolean): void;
    "SetModelAlpha"(alpha: number): void;
    "SetModelDrawLayer"(layer: WowApi.DrawLayer): void;
    "SetModelScale"(scale: number): void;
    "SetParticlesEnabled"(enabled: boolean): void;
    "SetPaused"(paused: boolean): void;
    "SetPitch"(pitch: number): void;
    "SetPosition"(positionX: number, positionY: number, positionZ: number): void;
    "SetRoll"(roll: number): void;
    "SetSequence"(sequence: number): void;
    "SetSequenceTime"(sequence: number, timeOffset: number): void;
    "SetShadowEffect"(strength: number): void;
    "SetTransform"(translation?: WowApi.vector3 | undefined, rotation?: WowApi.vector3 | undefined, scale?: number | undefined): void;
    "SetUseGBuffer"(useGBuffer: boolean): void;
    "SetViewInsets"(left: number, right: number, top: number, bottom: number): void;
    "SetViewTranslation"(x: number, y: number): void;
    "TransformCameraSpaceToModelSpace"(cameraPosition: WowApi.vector3): WowApi.vector3;
    "UseModelCenterToTransform"(useCenter: boolean): void;
  }
  interface SimpleModelFFX {
    "AddCharacterLight"(index: number | undefined, light: WowApi.ModelLight): void;
    "AddLight"(index: number | undefined, light: WowApi.ModelLight): void;
    "AddPetLight"(index: number | undefined, light: WowApi.ModelLight): void;
    "ResetLights"(): void;
  }
  interface SimpleMovie {
    "EnableSubtitles"(enable: boolean): void;
    "StartMovie"(movieID: number, looping?: boolean): LuaMultiReturn<[success: boolean, returnCode: number]>;
    "StartMovieByName"(movieName: string, looping?: boolean, resolution?: number): LuaMultiReturn<[success: boolean, returnCode: number]>;
    "StopMovie"(): void;
  }
  interface SimpleObject {
    "ClearParentKey"(): void;
    "GetDebugName"(preferParentKey?: boolean): string;
    "GetParent"(): WowApi.SimpleFrameScriptObject;
    "GetParentKey"(): string;
    "SetParentKey"(parentKey: string, clearOtherKeys?: boolean): void;
  }
  interface SimpleOffScreenFrame {
    "ApplySnapshot"(texture: WowApi.SimpleTexture, snapshotID: number): boolean;
    "Flush"(): void;
    "GetMaxSnapshots"(): number;
    "IsSnapshotValid"(snapshotID: number): boolean;
    "SetMaxSnapshots"(maxSnapshots: number): void;
    "TakeSnapshot"(): number | undefined;
    "TestPrintToFile"(snapshotID: number, filename: string): boolean;
    "UsesNPOT"(): boolean | undefined;
  }
  interface SimpleRegion {
    "GetAlpha"(): number;
    "GetDrawLayer"(): LuaMultiReturn<[layer: WowApi.DrawLayer, sublayer: number]>;
    "GetEffectiveScale"(): number;
    "GetScale"(): number;
    "GetVertexColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]> | undefined;
    "IsIgnoringParentAlpha"(): boolean;
    "IsIgnoringParentScale"(): boolean;
    "IsObjectLoaded"(): boolean;
    "SetAlpha"(alpha: number): void;
    "SetAlphaFromBoolean"(value: boolean, alphaIfTrue?: number, alphaIfFalse?: number): void;
    "SetDrawLayer"(layer: WowApi.DrawLayer, sublevel?: number): void;
    "SetIgnoreParentAlpha"(ignore: boolean): void;
    "SetIgnoreParentScale"(ignore: boolean): void;
    "SetScale"(scale: number): void;
    "SetVertexColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetVertexColorFromBoolean"(value: boolean, colorIfTrue: WowApi.colorRGBA, colorIfFalse: WowApi.colorRGBA): void;
  }
  interface SimpleScriptRegion {
    "CanChangeProtectedState"(): boolean;
    "CanPropagateMouseClicks"(): boolean;
    "CanPropagateMouseMotion"(): boolean;
    "ClearScripts"(): void;
    "CollapsesLayout"(): boolean;
    "EnableMouse"(enable?: boolean): void;
    "EnableMouseMotion"(enable?: boolean): void;
    "EnableMouseWheel"(enable?: boolean): void;
    "FocusEnter"(fromMouseMotion?: boolean): void;
    "FocusExit"(fromMouseMotion?: boolean): void;
    "GetBottom"(): number | undefined;
    "GetCenter"(): LuaMultiReturn<[x: number, y: number]> | undefined;
    "GetHeight"(ignoreRect?: boolean): number;
    "GetLeft"(): number | undefined;
    "GetRect"(): LuaMultiReturn<[left: number, bottom: number, width: number, height: number]> | undefined;
    "GetRight"(): number | undefined;
    "GetRoundLayoutToNearestPixel"(): boolean;
    "GetScaledRect"(): LuaMultiReturn<[left: number, bottom: number, width: number, height: number]> | undefined;
    "GetScript"(scriptTypeName: WowApi.ScriptTypeName, bindingType?: WowApi.ScriptBindingType): (...arguments_: unknown[]) => unknown;
    "GetSize"(ignoreRect?: boolean): LuaMultiReturn<[width: number, height: number]>;
    "GetSourceLocation"(): string;
    "GetTop"(): number | undefined;
    "GetWidth"(ignoreRect?: boolean): number;
    "HasScript"(scriptName: string): boolean;
    "Hide"(): void;
    "HookScript"(scriptTypeName: WowApi.ScriptTypeName, script: (...arguments_: unknown[]) => unknown, bindingType?: WowApi.ScriptBindingType): boolean;
    "Intersects"(region: WowApi.SimpleScriptRegion): boolean;
    "IsAnchoringRestricted"(): boolean;
    "IsAnchoringSecret"(): boolean;
    "IsCollapsed"(): boolean;
    "IsDragging"(): boolean;
    "IsMouseClickEnabled"(): boolean;
    "IsMouseEnabled"(): boolean;
    "IsMouseMotionEnabled"(): boolean;
    "IsMouseMotionFocus"(): boolean;
    "IsMouseOver"(offsetTop?: number, offsetBottom?: number, offsetLeft?: number, offsetRight?: number): boolean;
    "IsMouseWheelEnabled"(): boolean;
    "IsProtected"(): LuaMultiReturn<[isProtected: boolean, isProtectedExplicitly: boolean]>;
    "IsRectValid"(): boolean;
    "IsShown"(): boolean;
    "IsVisible"(): boolean;
    "MouseDown"(button?: string): void;
    "MouseUp"(button?: string): void;
    "SetCollapsesLayout"(collapsesLayout: boolean): void;
    "SetMouseClickEnabled"(enabled?: boolean): void;
    "SetMouseMotionEnabled"(enabled?: boolean): void;
    "SetParent"(parent?: WowApi.SimpleFrame | undefined): void;
    "SetPassThroughButtons"(...buttons: (WowApi.MouseButton)[]): void;
    "SetPropagateMouseClicks"(propagate: boolean): void;
    "SetPropagateMouseMotion"(propagate: boolean): void;
    "SetRoundLayoutToNearestPixel"(enabled: boolean): void;
    "SetScript"(scriptTypeName: WowApi.ScriptTypeName, script?: (...arguments_: unknown[]) => unknown | undefined): void;
    "SetShown"(show?: boolean): void;
    "ShouldButtonPassThrough"(button: WowApi.MouseButton): boolean;
    "Show"(): void;
  }
  interface SimpleScriptRegionResizing {
    "AdjustPointsOffset"(x: number, y: number): void;
    "ClearAllPoints"(): void;
    "ClearPoint"(point: WowApi.FramePoint): void;
    "ClearPointsOffset"(): void;
    "GetNumPoints"(): number;
    "GetPoint"(anchorIndex?: number, resolveCollapsed?: boolean): LuaMultiReturn<[point: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, relativePoint: WowApi.FramePoint, offsetX: number, offsetY: number]> | undefined;
    "GetPointByName"(point: WowApi.FramePoint, resolveCollapsed?: boolean): LuaMultiReturn<[point: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, relativePoint: WowApi.FramePoint, offsetX: number, offsetY: number]> | undefined;
    "SetAllPoints"(relativeTo: WowApi.SimpleScriptRegion, doResize?: boolean): void;
    "SetHeight"(height: number): void;
    "SetPoint"(point: WowApi.FramePoint, relativeTo: WowApi.SimpleScriptRegion, relativePoint: WowApi.FramePoint, offsetX: number, offsetY: number): void;
    "SetPointsOffset"(x: number, y: number): void;
    "SetSize"(x: number, y: number): void;
    "SetWidth"(width: number): void;
  }
  interface SimpleScrollFrame {
    "GetHorizontalScroll"(): number;
    "GetHorizontalScrollRange"(): number;
    "GetScrollChild"(): WowApi.SimpleFrame;
    "GetVerticalScroll"(): number;
    "GetVerticalScrollRange"(): number;
    "SetHorizontalScroll"(offset: number): void;
    "SetScrollChild"(scrollChild: WowApi.SimpleFrame): void;
    "SetVerticalScroll"(offset: number): void;
    "UpdateScrollChildRect"(): void;
  }
  interface SimpleSlider {
    "Disable"(): void;
    "Enable"(): void;
    "GetMinMaxValues"(): LuaMultiReturn<[minValue: number, maxValue: number]>;
    "GetObeyStepOnDrag"(): boolean;
    "GetOrientation"(): WowApi.Orientation;
    "GetStepsPerPage"(): number;
    "GetThumbTexture"(): WowApi.SimpleTexture;
    "GetValue"(): number;
    "GetValueStep"(): number;
    "IsDraggingThumb"(): boolean;
    "IsEnabled"(): boolean;
    "SetEnabled"(enabled: boolean): void;
    "SetMinMaxValues"(minValue: number, maxValue: number): void;
    "SetObeyStepOnDrag"(obeyStepOnDrag: boolean): void;
    "SetOrientation"(orientation: WowApi.Orientation): void;
    "SetStepsPerPage"(stepsPerPage: number): void;
    "SetThumbTexture"(asset: WowApi.TextureAsset): void;
    "SetValue"(value: number, treatAsMouseEvent?: boolean): void;
    "SetValueStep"(valueStep: number): void;
  }
  interface SimpleStatusBar {
    "GetFillStyle"(): WowApi.StatusBarFillStyle;
    "GetInterpolatedValue"(): number;
    "GetMinMaxValues"(): LuaMultiReturn<[minValue: number, maxValue: number]>;
    "GetOrientation"(): WowApi.Orientation;
    "GetRenderMode"(): WowApi.StatusBarRenderMode;
    "GetReverseFill"(): boolean;
    "GetRotatesTexture"(): boolean;
    "GetStatusBarColor"(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    "GetStatusBarDesaturation"(): number;
    "GetStatusBarTexture"(): WowApi.SimpleTexture;
    "GetTimerDuration"(): WowApi.LuaDurationObject;
    "GetValue"(): number;
    "IsInterpolating"(): boolean;
    "IsStatusBarDesaturated"(): boolean;
    "SetColorFill"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetFillStyle"(fillStyle: WowApi.StatusBarFillStyle): void;
    "SetMinMaxValues"(minValue: number, maxValue: number, interpolation?: WowApi.StatusBarInterpolation): void;
    "SetOrientation"(orientation: WowApi.Orientation): void;
    "SetRenderMode"(renderMode: WowApi.StatusBarRenderMode): void;
    "SetReverseFill"(isReverseFill: boolean): void;
    "SetRotatesTexture"(rotatesTexture: boolean): void;
    "SetStatusBarColor"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetStatusBarDesaturated"(desaturated?: boolean): void;
    "SetStatusBarDesaturation"(desaturation: number): void;
    "SetStatusBarTexture"(asset: WowApi.TextureAsset): boolean;
    "SetTimerDuration"(duration: WowApi.LuaDurationObject, interpolation?: WowApi.StatusBarInterpolation, direction?: WowApi.StatusBarTimerDirection): void;
    "SetToTargetValue"(): void;
    "SetValue"(value: number, interpolation?: WowApi.StatusBarInterpolation): void;
  }
  interface SimpleTexture {
    "AddMaskTexture"(mask: WowApi.SimpleMaskTexture): void;
    "GetMaskTexture"(index: number): WowApi.SimpleMaskTexture;
    "GetNumMaskTextures"(): number;
    "RemoveMaskTexture"(mask: WowApi.SimpleMaskTexture): void;
  }
  interface SimpleTextureBase {
    "ClearRadialProgressBar"(): void;
    "ClearSVG"(): void;
    "ClearTextureSlice"(): void;
    "ClearVertexOffsets"(): void;
    "GetAtlas"(): string;
    "GetBlendMode"(): WowApi.BlendMode;
    "GetDesaturation"(): number;
    "GetHorizTile"(): boolean;
    "GetRadialProgressBarEndOffset"(): number;
    "GetRadialProgressBarFeather"(): number;
    "GetRadialProgressBarPercent"(): number;
    "GetRadialProgressBarReverse"(): boolean;
    "GetRadialProgressBarStartOffset"(): number;
    "GetRotation"(): LuaMultiReturn<[radians: number, normalizedRotationPoint: WowApi.vector2]>;
    "GetTexCoord"(): LuaMultiReturn<[ulX: number, ulY: number, llX: number, llY: number, urX: number, urY: number, lrX: number, lrY: number]>;
    "GetTexelSnappingBias"(): number;
    "GetTexture"(): string | undefined;
    "GetTextureFileID"(): number;
    "GetTextureFilePath"(): string | undefined;
    "GetTextureSliceMargins"(): LuaMultiReturn<[left: number, top: number, right: number, bottom: number]> | undefined;
    "GetTextureSliceMode"(): WowApi.UITextureSliceMode | undefined;
    "GetVertexOffset"(vertexIndex: number): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    "GetVertTile"(): boolean;
    "IsBlockingLoadRequested"(): boolean;
    "IsDesaturated"(): boolean;
    "IsSnappingToPixelGrid"(): boolean;
    "ResetTexCoord"(): void;
    "SetAtlas"(atlas: string, useAtlasSize?: boolean, filterMode?: WowApi.FilterMode | undefined, resetTexCoords?: boolean | undefined, wrapModeHorizontal?: string | undefined, wrapModeVertical?: string | undefined): void;
    "SetBlendMode"(blendMode: WowApi.BlendMode): void;
    "SetBlockingLoadsRequested"(blocking?: boolean): void;
    "SetColorTexture"(colorR: number, colorG: number, colorB: number, a?: number | undefined): void;
    "SetDesaturated"(desaturated?: boolean): void;
    "SetDesaturation"(desaturation: number): void;
    "SetGradient"(orientation: WowApi.Orientation, minColor: WowApi.colorRGBA, maxColor: WowApi.colorRGBA): void;
    "SetHorizTile"(tiling?: boolean): void;
    "SetMask"(file: string): void;
    "SetRadialProgressBarEndOffset"(offset: number): void;
    "SetRadialProgressBarFeather"(feather: number): void;
    "SetRadialProgressBarPercent"(percent: number): void;
    "SetRadialProgressBarReverse"(reverse: boolean): void;
    "SetRadialProgressBarStartOffset"(offset: number): void;
    "SetRotation"(radians: number, normalizedRotationPoint?: WowApi.vector2 | undefined): void;
    "SetSnapToPixelGrid"(snap?: boolean): void;
    "SetSpriteSheetCell"(cell: number, numRows: number, numColumns: number, cellWidth?: number | undefined, cellHeight?: number | undefined): void;
    "SetSVG"(svgAsset: string): boolean;
    "SetTexCoord"(left: number, right: number, bottom: number, top: number): void;
    "SetTexelSnappingBias"(bias: number): void;
    "SetTexture"(textureAsset?: string | undefined, wrapModeHorizontal?: string | undefined, wrapModeVertical?: string | undefined, filterMode?: string | undefined): boolean;
    "SetTextureSliceMargins"(left: number, top: number, right: number, bottom: number): void;
    "SetTextureSliceMode"(sliceMode: WowApi.UITextureSliceMode): void;
    "SetVertexOffset"(vertexIndex: number, offsetX: number, offsetY: number): void;
    "SetVertTile"(tiling?: boolean): void;
  }
  interface SimpleVectorGraphics {
    "ClearSVG"(): void;
    "GetSVGFileID"(): number;
    "HasSVG"(): boolean;
    "SetSVG"(svgAsset: string): boolean;
  }
  interface TabardModel {
    "GetLowerBackgroundFileName"(): number;
    "GetLowerBorderFile"(): number;
    "GetLowerEmblemFile"(): number;
    "GetUpperBackgroundFileName"(): number;
    "GetUpperBorderFile"(): number;
    "GetUpperEmblemFile"(): number;
  }
  interface TabardModelBase {
    "CanSaveTabardNow"(): boolean;
    "CycleVariation"(variationIndex: number, delta: number): void;
    "GetLowerEmblemTexture"(texture: WowApi.SimpleTexture): void;
    "GetUpperEmblemTexture"(texture: WowApi.SimpleTexture): void;
    "InitializeTabardColors"(): void;
    "IsGuildTabard"(): boolean;
    "Save"(): void;
  }
  interface TimedSignalMap {
    "CancelAllSignals"(): void;
    "CancelSignal"(key: number): void;
    "GetNextSignal"(): LuaMultiReturn<[key: number, time: number]>;
    "GetSignalCount"(): number;
    "GetSignalTime"(key: number): number | undefined;
    "HasSignal"(key: number): boolean;
    "SignalAfter"(key: number, secondsFromNow: number): void;
    "SignalAt"(key: number, time: number): void;
  }
  interface Tooltip {
    "AddFontStrings"(leftFontString: WowApi.SimpleFontString, rightFontString: WowApi.SimpleFontString): void;
    "ClearPadding"(): void;
    "GetLeftLine"(line: number): WowApi.SimpleFontString;
    "GetMinimumWidth"(): LuaMultiReturn<[width: number, forced: boolean]>;
    "GetPadding"(): LuaMultiReturn<[right: number, bottom: number, left: number, top: number]>;
    "GetRightLine"(line: number): WowApi.SimpleFontString;
    "SetMinimumWidth"(width: number, force?: boolean): void;
    "SetPadding"(right: number, bottom: number, left?: number | undefined, top?: number | undefined): void;
    "SetText"(text: string, colorR: number, colorG: number, colorB: number, alpha?: number, wrap?: boolean): void;
  }
  interface UnitHealPredictionCalculator {
    "EvaluateCurrentHealthPercent"(curve: WowApi.LuaCurveObjectBase): WowApi.LuaCurveEvaluatedResult;
    "EvaluateMissingHealthPercent"(curve: WowApi.LuaCurveObjectBase): WowApi.LuaCurveEvaluatedResult;
    "GetCurrentHealth"(): number;
    "GetCurrentHealthPercent"(): number;
    "GetDamageAbsorbClampMode"(): WowApi.UnitDamageAbsorbClampMode;
    "GetDamageAbsorbs"(): LuaMultiReturn<[amount: number, clamped: boolean]>;
    "GetHealAbsorbClampMode"(): WowApi.UnitHealAbsorbClampMode;
    "GetHealAbsorbMode"(): WowApi.UnitHealAbsorbMode;
    "GetHealAbsorbs"(): LuaMultiReturn<[amount: number, clamped: boolean]>;
    "GetIncomingHealClampMode"(): WowApi.UnitIncomingHealClampMode;
    "GetIncomingHealOverflowPercent"(): number;
    "GetIncomingHeals"(): LuaMultiReturn<[amount: number, amountFromHealer: number, amountFromOthers: number, clamped: boolean]>;
    "GetMaximumDamageAbsorbs"(): number;
    "GetMaximumHealAbsorbs"(): number;
    "GetMaximumHealth"(): number;
    "GetMaximumHealthMode"(): WowApi.UnitMaximumHealthMode;
    "GetMaximumIncomingHeals"(): number;
    "GetMissingHealth"(): number;
    "GetMissingHealthPercent"(): number;
    "GetPredictedValues"(): WowApi.UnitHealPredictionValues;
    "GetTotalDamageAbsorbs"(): number;
    "GetTotalHealAbsorbs"(): number;
    "GetTotalIncomingHeals"(): number;
    "GetTotalIncomingHealsFromHealer"(): number;
    "HasSecretValues"(): boolean;
    "Reset"(): void;
    "ResetPredictedValues"(): void;
    "SetDamageAbsorbClampMode"(damageAbsorbClampMode: WowApi.UnitDamageAbsorbClampMode): void;
    "SetHealAbsorbClampMode"(healAbsorbClampMode: WowApi.UnitHealAbsorbClampMode): void;
    "SetHealAbsorbMode"(healAbsorbMode: WowApi.UnitHealAbsorbMode): void;
    "SetIncomingHealClampMode"(incomingHealClampMode: WowApi.UnitIncomingHealClampMode): void;
    "SetIncomingHealOverflowPercent"(incomingHealOverflowPercent: number): void;
    "SetMaximumHealthMode"(maximumHealthMode: WowApi.UnitMaximumHealthMode): void;
    "SetPredictedValues"(predictedValues: WowApi.UnitHealPredictionValues): void;
    "SetToDefaults"(): void;
  }
  interface UnitPositionFrame {
    "AddUnit"(unitTokenString: string, asset: number | string, width?: number | undefined, height?: number | undefined, r?: number | undefined, g?: number | undefined, b?: number | undefined, a?: number | undefined, sublayer?: number | undefined, showFacing?: boolean | undefined): void;
    "ClearUnits"(): void;
    "FinalizeUnits"(): void;
    "GetMouseOverUnits"(): LuaMultiReturn<[...values: (WowApi.UnitTokenType)[]]>;
    "GetPlayerPingScale"(): number;
    "GetUiMapID"(): number;
    "SetPlayerPingScale"(scale: number): void;
    "SetPlayerPingTexture"(textureType: WowApi.PingTextureType, asset: string, width?: number, height?: number): void;
    "SetUiMapID"(mapID: number): void;
    "SetUnitColor"(unit: WowApi.UnitTokenType, colorR: number, colorG: number, colorB: number, colorA: number): void;
    "StartPlayerPing"(duration?: number, fadeDuration?: number): void;
    "StopPlayerPing"(): void;
  }
}
