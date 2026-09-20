// This file comes from Blizzard API documentation.
// Run npm run sync:wow-api to replace it.

declare function AbbreviateLargeNumbers(number: number, options?: WowApi.NumberAbbrevOptions | undefined): string;
declare function AbbreviateNumbers(number: number, options?: WowApi.NumberAbbrevOptions | undefined): string;
declare function AcceptAreaSpiritHeal(): void;
declare function AcceptGuild(): void;
declare function AcceptResurrect(): void;
declare function AddSourceLocationExclude(fileName: string): void;
declare function Ambiguate(fullName: string, context: string): string;
declare function AreClassRolesSoftSuggestions(): boolean;
declare function AreDangerousScriptsAllowed(): boolean;
declare function AssistUnit(name?: string, exactMatch?: boolean): void;
declare function AttackTarget(): void;
declare function AutoEquipCursorItem(): void;
declare function BeginTrade(): void;
declare function BreakUpLargeNumbers(largeNumber: number, natural?: boolean): string;
declare function CalculateStringEditDistance(firstString: string, secondString: string): number;
declare function canaccessallvalues(...values: (unknown)[]): boolean;
declare function canaccesssecrets(): boolean;
declare function canaccesstable(table: unknown): boolean;
declare function canaccessvalue(value: unknown): boolean;
declare function CanBeRaidTarget(target: string): boolean;
declare function CancelAreaSpiritHeal(): void;
declare function CancelLogout(): void;
declare function CancelPendingEquip(index: number): void;
declare function CancelPreloadingMovie(movieId: number): void;
declare function CancelTrade(): void;
declare function CanChangePlayerDifficulty(): LuaMultiReturn<[canChange: boolean, notOnCooldown: boolean]> | undefined;
declare function CanDualWield(): boolean;
declare function CanEjectPassengerFromSeat(virtualSeatIndex: number): boolean;
declare function CanInspect(targetGUID: string): boolean;
declare function CanLootUnit(targetUnit: string): LuaMultiReturn<[hasLoot: boolean, canLoot: boolean]> | undefined;
declare function CanMapChangeDifficulty(mapID?: number | undefined): boolean;
declare function CanPortGraveyard(): boolean;
declare function CanShowResetInstances(): boolean;
declare function CanShowSetRoleButton(): boolean;
declare function CanSwitchVehicleSeat(): boolean;
declare function CanUpgradeToCurrentExpansion(): boolean;
declare function CaseAccentInsensitiveParse(name: string): string;
declare function CheckInteractDistance(unitGUID: string, distIndex: number): boolean;
declare function CheckTalentMasterDist(): boolean;
declare function CinematicFinished(movieType: WowApi.CinematicType, userCanceled?: boolean, didError?: boolean): void;
declare function CinematicStarted(movieType: WowApi.CinematicType, movieID: number, canCancel?: boolean): void;
declare function ClassicExpansionAtLeast(expansionLevel: number): boolean;
declare function ClassicExpansionAtMost(expansionLevel: number): boolean;
declare function ClearCursor(): void;
declare function ClearCursorHoveredItem(): void;
declare function ClearFocus(): void;
declare function ClearOutage(): void;
declare function ClearPendingBindConversionItem(): void;
declare function ClearRaidMarker(raidMarkerIndex?: number): void;
declare function ClearTarget(): boolean;
declare function ClosestGameObjectPosition(gameObjectID: number): LuaMultiReturn<[xPos: number, yPos: number, distance: number]> | undefined;
declare function ClosestUnitPosition(creatureID: number): LuaMultiReturn<[xPos: number, yPos: number, distance: number]> | undefined;
declare function ConfirmTalentWipe(): void;
declare function ConsoleEcho(command: string, addToHistory?: boolean, prefix?: string | undefined): boolean;
declare function ConsoleExec(command: string, addToHistory?: boolean): boolean;
declare function ConsoleGetAllCommands(): readonly WowApi.ConsoleCommandInfo[];
declare function ConsoleGetColorFromType(colorType: WowApi.ConsoleColorType): WowApi.colorRGB;
declare function ConsoleGetFontHeight(): number;
declare function ConsoleIsActive(): boolean;
declare function ConsolePrintAllMatchingCommands(partialCommandText: string): void;
declare function ConsoleSetFontHeight(fontHeightInPixels: number): void;
declare function ConvertItemToBindToAccount(): void;
declare function CopyToClipboard(text: string, removeMarkup?: boolean): number;
declare function CreateAbbreviateConfig(data: readonly WowApi.NumberAbbreviationBreakpoint[]): WowApi.AbbreviateConfig;
declare function CreateFontFamily(name: string, members: readonly WowApi.CreateFontFamilyMemberInfo[]): WowApi.SimpleFont;
declare function CreateFrameWithOptions(options: WowApi.CreateFrameOptions): WowApi.SimpleFrame;
declare function CreateFromMixins(...mixins: (unknown)[]): unknown;
declare function CreateSecureDelegate(luaFunction: unknown, options?: WowApi.SecureDelegateOptions | undefined): unknown;
declare function CreateUnitHealPredictionCalculator(): WowApi.UnitHealPredictionCalculator;
declare function CreateWindow(popupStyle?: boolean, topMost?: boolean): WowApi.SimpleWindow | undefined;
declare function CursorHasItem(): boolean;
declare function CursorHasMacro(): boolean;
declare function CursorHasMoney(): boolean;
declare function CursorHasSpell(): boolean;
declare function debugprofilestart(): void;
declare function debugprofilestop(): number;
declare function DeclineGuild(): void;
declare function DeclineName(name: string, gender: WowApi.UnitSex | undefined, declensionSet: number, namePartType?: WowApi.NamePartType | undefined): LuaMultiReturn<[...values: (string)[]]>;
declare function DeclineResurrect(): void;
declare function DeleteCursorItem(): void;
declare function DestroyTotem(slot: number): void;
declare function Dismount(): void;
declare function DoesCurrentLocaleSellExpansionLevels(): boolean;
declare function DropCursorMoney(): void;
declare function dropsecretaccess(): void;
declare function dumpobject(value?: unknown | undefined): unknown | undefined;
declare function EjectPassengerFromSeat(virtualSeatIndex: number): void;
declare function EquipCursorItem(slot: number): void;
declare function EquipPendingItem(index: number): void;
declare function FlashClientIcon(briefly?: boolean): void;
declare function FocusUnit(name?: string): void;
declare function FollowUnit(name?: string, exactMatch?: boolean): void;
declare function ForceLogout(): void;
declare function ForceQuit(): void;
declare function GetAccountExpansionLevel(): number;
declare function GetAddOnCPUUsage(name: number | string): number;
declare function GetAddOnMemoryUsage(name: number | string): number;
declare function GetAllowLowLevelRaid(): boolean;
declare function GetAllowRecentAlliesSeeLocation(): boolean;
declare function GetAreaSpiritHealerTime(): number;
declare function GetAreaText(): string;
declare function GetArmorPenetration(): number;
declare function GetAttackPowerForStat(stat: number, value: number): number;
declare function GetAutoDeclineGuildInvites(): boolean;
declare function GetAutoDeclineNeighborhoodInvites(): boolean;
declare function GetAvailableBandwidth(): number;
declare function GetAvailableLocaleInfo(ignoreLocaleRestrictions?: boolean): readonly WowApi.LocaleInfo[];
declare function GetAvailableLocales(ignoreLocaleRestrictions?: boolean): LuaMultiReturn<[...values: (string)[]]>;
declare function GetAvoidance(): number;
declare function GetBackgroundLoadingStatus(): number;
declare function GetBaseDifficultyID(difficultyID: number): number;
declare function GetBillingTimeRested(): number;
declare function GetBindLocation(): string;
declare function GetBlockChance(): number;
declare function GetBuildInfo(): LuaMultiReturn<[buildVersion: string, buildNumber: string, buildDate: string, interfaceVersion: number, localizedVersion: string, buildInfo: string]>;
declare function GetBuildOption(name: string): boolean | undefined;
declare function GetCallstackHeight(): number;
declare function GetCameraFOVDefaults(): LuaMultiReturn<[fieldOfViewDegreesDefault: number, fieldOfViewDegreesPlayerMin: number, fieldOfViewDegreesPlayerMax: number]>;
declare function GetCemeteryPreference(): number;
declare function GetClassicExpansionLevel(): number;
declare function GetClientDisplayExpansionLevel(): number;
declare function GetCollapsingStarCost(): number;
declare function GetCombatRating(ratingIndex: number): number | undefined;
declare function GetCombatRatingBonus(ratingIndex: number): number | undefined;
declare function GetCombatRatingBonusForCombatRatingValue(ratingIndex: number, value: number): number | undefined;
declare function GetComboPoints(unit: string, target: string): number;
declare function GetCorpseRecoveryDelay(): number;
declare function GetCorruption(): number;
declare function GetCorruptionResistance(): number;
declare function GetCritChance(): number;
declare function GetCritChanceFromStat(stat: number, value: number): number;
declare function GetCritChanceProvidesParryEffect(): boolean;
declare function GetCurrentCinematicSummary(): string;
declare function GetCurrentEventID(): number | undefined;
declare function GetCurrentRegion(): number;
declare function GetCurrentRegionName(): string;
declare function GetCurrentTitle(): number;
declare function GetCursorDelta(): LuaMultiReturn<[deltaX: number, deltaY: number]>;
declare function GetCursorInfo(): void;
declare function GetCursorMoney(): number;
declare function GetCursorPosition(): LuaMultiReturn<[posX: number, posY: number]>;
declare function GetDefaultAbbreviationBreakpoints(locale?: WowApi.WowLocale | undefined): readonly WowApi.NumberAbbreviationBreakpoint[];
declare function GetDefaultScale(): number;
declare function GetDifficultyInfo(difficultyID: number): LuaMultiReturn<[name: string, instanceType: string, isHeroic: boolean, isChallengeMode: boolean, displayHeroic: boolean, displayMythic: boolean, toggleDifficultyID: number | undefined, isLFR: boolean, minPlayers: number | undefined, maxPlayers: number | undefined, isUserSelectable: boolean]>;
declare function GetDodgeChance(): number;
declare function GetDodgeChanceFromAttribute(): number;
declare function GetDownloadedPercentage(): number;
declare function GetDungeonDifficultyID(): number;
declare function GetErrorCallstackHeight(): number | undefined;
declare function GetEventCPUUsage(): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetEventTime(eventProfileIndex: number): LuaMultiReturn<[totalElapsedTime: number, numExecutedHandlers: number, slowestHandlerName: string, slowestHandlerTime: number]> | undefined;
declare function GetEvictionTimeRemaining(): number;
declare function GetExpansionDisplayInfo(expansionLevel: number, desiredReleaseType?: WowApi.ReleaseType | undefined): WowApi.ExpansionDisplayInfo | undefined;
declare function GetExpansionForLevel(playerLevel: number): number | undefined;
declare function GetExpansionLevel(): number;
declare function GetExpansionTrialInfo(): LuaMultiReturn<[isExpansionTrialAccount: boolean, expansionTrialRemainingSeconds: number | undefined]>;
declare function GetExpertise(): LuaMultiReturn<[mainhandExpertise: number, offhandExpertise: number, rangedExpertise: number]>;
declare function GetExpertisePercent(): LuaMultiReturn<[mainhandExpertisePercent: number, offhandExpertisePercent: number, rangedExpertisePercent: number]>;
declare function GetFileIDFromPath(filePath: string): number;
declare function GetFileStreamingStatus(): number;
declare function GetFontInfo(fontObject: WowApi.SimpleFont): WowApi.FontScriptInfo | undefined;
declare function GetFonts(): readonly string[];
declare function GetForbiddenObjectTable(object: WowApi.SimpleFrameScriptObject): WowApi.SimpleFrameScriptObject;
declare function GetFrameCPUUsage(frame: WowApi.SimpleFrame, includeChildren?: boolean): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetFramerate(): number;
declare function GetFunctionCPUUsage(): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetGameMessageInfo(gameErrorIndex: number): LuaMultiReturn<[errorName: string, soundKitID: number | undefined, voiceID: number | undefined]> | undefined;
declare function GetGameTime(): LuaMultiReturn<[hour: number, minute: number]>;
declare function GetHaste(): number;
declare function GetHealthRegen(): LuaMultiReturn<[healthRegen: number, combatHealthRegen: number]>;
declare function GetHealthRegenFromSpirit(): LuaMultiReturn<[healthRegen: number, combatHealthRegen: number]>;
declare function GetHitModifier(): number;
declare function GetInstanceBootTimeRemaining(): number;
declare function GetInstanceInfo(): LuaMultiReturn<[name: string, instanceType: string, difficultyID: number, difficultyName: string, maxPlayers: number, dynamicDifficulty: number, isDynamic: boolean | undefined, instanceID: number, instanceGroupSize: number, lfgDungeonID: number | undefined, hasWorldTier: boolean]>;
declare function GetInstanceLockTimeRemaining(): LuaMultiReturn<[timeLeft: number, extending: boolean, encountersTotal: number, encountersCompleted: number]>;
declare function GetInstanceLockTimeRemainingEncounter(encounterIndex: number): LuaMultiReturn<[encounterName: string, texture: string, isKilled: boolean, ineligible: boolean]>;
declare function GetJailersTowerLevel(): number;
declare function GetLegacyRaidDifficultyID(): number | undefined;
declare function GetLifesteal(): number;
declare function GetLocale(): string;
declare function GetLocalGameTime(): LuaMultiReturn<[hour: number, minute: number]>;
declare function GetLootSpecialization(): number;
declare function GetManaRegen(): LuaMultiReturn<[baseManaRegen: number, castingManaRegen: number]>;
declare function GetManaRegenFromSpirit(): LuaMultiReturn<[powerRegen: number, combatPowerRegen: number]>;
declare function GetMastery(): number;
declare function GetMasteryEffect(): LuaMultiReturn<[masteryEffect: number, bonusCoefficient: number]>;
declare function GetMaximumExpansionLevel(): number;
declare function GetMaxLevelForExpansionLevel(expansionLevel: number): number;
declare function GetMaxLevelForLatestExpansion(): number;
declare function GetMaxLevelForPlayerExpansion(): number;
declare function GetMaxPlayerLevel(): number;
declare function GetMeleeHaste(): number;
declare function GetMinimapZoneText(): string;
declare function GetMinimumExpansionLevel(): number;
declare function GetMirrorTimerInfo(timerIndex: number): LuaMultiReturn<[name: string, startValue: number, maxValue: number, scale: number, paused: number, label: string, spellID: number]> | undefined;
declare function GetMirrorTimerProgress(timerName: string): number | undefined;
declare function GetModResilienceDamageReduction(): number;
declare function GetMoney(): number;
declare function GetMouseButtonClicked(): string;
declare function GetMouseButtonName(button: WowApi.mouseButton): string;
declare function GetMouseFoci(): readonly WowApi.SimpleScriptRegion[];
declare function GetMovieDownloadProgress(movieId: number): LuaMultiReturn<[inProgress: boolean, downloaded: number, total: number]>;
declare function GetNativeRealmID(): number;
declare function GetNegativeCorruptionEffectInfo(): readonly WowApi.CorruptionEffectInfo[];
declare function GetNetIpTypes(): LuaMultiReturn<[...values: (number)[]]>;
declare function GetNetStats(): LuaMultiReturn<[in_: number, out: number, ...values: (number)[]]>;
declare function GetNextAvailableRaidTargetMarkerIndex(startIndex: number, reverseSearch?: boolean, wrapSearch?: boolean, treatDeadNonFriendlyAsAvailable?: boolean): number;
declare function GetNormalizedRealmName(): string;
declare function GetNumDeclensionSets(name: string, gender?: WowApi.UnitSex | undefined, namePartType?: WowApi.NamePartType | undefined): number;
declare function GetNumExpansions(): number;
declare function GetNumTitles(): number;
declare function GetNumTotemSlots(): number;
declare function GetOSLocale(): string;
declare function GetOverrideAPBySpellPower(): number;
declare function GetOverrideSpellPowerByAP(): number;
declare function GetParryChance(): number;
declare function GetParryChanceFromAttribute(): number;
declare function GetPetHitChanceModifier(): number;
declare function GetPetMeleeHaste(): number;
declare function GetPetSpellBonusDamage(): number;
declare function GetPetSpellHitChanceModifier(): number;
declare function GetPhysicalScreenSize(): LuaMultiReturn<[sizeX: number, sizeY: number]>;
declare function GetPlayerFacing(): number | undefined;
declare function GetPlayerInfoByGUID(guid: string): LuaMultiReturn<[localizedClass: string, englishClass: string, localizedRace: string, englishRace: string, sex: number, name: string, realmName: string, level: number | undefined]> | undefined;
declare function GetPowerRegen(): LuaMultiReturn<[basePowerRegen: number, castingPowerRegen: number]>;
declare function GetPowerRegenForPowerType(powerType: number): LuaMultiReturn<[basePowerRegen: number, castingPowerRegen: number]>;
declare function GetProtocolTypes(): LuaMultiReturn<[...values: (WowApi.ConnectionProtocol)[]]>;
declare function GetPVPDesired(): boolean;
declare function GetPVPGearStatRules(): boolean;
declare function GetPVPLifetimeStats(): LuaMultiReturn<[lifetimeHonorableKills: number, lifetimeMaxPVPRank: WowApi.PvPRanks]>;
declare function GetPvpPowerDamage(): number;
declare function GetPvpPowerHealing(): number;
declare function GetPVPSessionStats(): LuaMultiReturn<[honorableKills: number, dishonorableKills: number]>;
declare function GetPVPTimer(): number;
declare function GetPVPYesterdayStats(): LuaMultiReturn<[honorableKills: number, dishonorableKills: number]>;
declare function GetRaidDifficultyID(): number | undefined;
declare function GetRaidTargetIndex(target: string): number | undefined;
declare function GetRangedAttackPowerForStat(stat: number, value: number): number;
declare function GetRangedCritChance(): number;
declare function GetRangedHaste(): LuaMultiReturn<[result: number, quiverHaste: number]>;
declare function GetRangedHitModifier(): number;
declare function GetRealmID(): number;
declare function GetRealmName(): string;
declare function GetRealZoneText(mapID?: number | undefined): string;
declare function GetReleaseTimeRemaining(): number;
declare function GetResSicknessDuration(): string | undefined;
declare function GetRestrictedAccountData(): LuaMultiReturn<[maxLevel: number, maxMoney: number, professionCap: number]>;
declare function GetRestState(): LuaMultiReturn<[exhaustionID: number, name: string, factor: number]> | undefined;
declare function GetRuneCooldown(runeIndex: number): LuaMultiReturn<[startTime: number, duration: number, isRuneReady: boolean]> | undefined;
declare function GetRuneCount(runeIndex: number): number | undefined;
declare function GetScreenDPIScale(): number;
declare function GetScreenHeight(): number;
declare function GetScreenWidth(): number;
declare function GetScriptBucketThrottleLimits(): WowApi.ScriptBucketThrottleLimits;
declare function GetScriptCPUUsage(): number;
declare function GetSecondsUntilParentalControlsKick(): number | undefined;
declare function GetServerExpansionLevel(): number;
declare function GetServerTime(): number;
declare function GetSessionTime(): number;
declare function GetSheathState(): number | undefined;
declare function GetShieldBlock(): number;
declare function GetSourceLocation(): string | undefined;
declare function GetSpecializationInfoForClassID(classID: number, index: number, gender?: WowApi.UnitSex | undefined): LuaMultiReturn<[id: number, name: string, description: string, icon: number, role: string, recommended: boolean, allowedForBoost: boolean, masterySpell1: number | undefined, masterySpell2: number | undefined]>;
declare function GetSpecializationInfoForSpecID(specID: number, gender?: WowApi.UnitSex | undefined): LuaMultiReturn<[id: number, name: string, description: string, icon: number, role: string, recommended: boolean, allowedForBoost: boolean, masterySpell1: number | undefined, masterySpell2: number | undefined]>;
declare function GetSpecializationNameForSpecID(specID: number, gender?: WowApi.UnitSex | undefined): string | undefined;
declare function GetSpecializationSystem(): WowApi.SpecializationSystem;
declare function GetSpeed(): number;
declare function GetSpellBonusDamage(school: number): number | undefined;
declare function GetSpellBonusHealing(): number;
declare function GetSpellCritChance(): number;
declare function GetSpellCritChanceFromStat(stat: number, value: number): number;
declare function GetSpellHitModifier(): number;
declare function GetSpellPenetration(): number;
declare function GetStringFromModifiers(modifiers: number): string;
declare function GetSturdiness(): number;
declare function GetSubZoneText(): string;
declare function GetTaxiBenchmarkMode(): boolean;
declare function GetThreatStatusColor(gameErrorIndex: number): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
declare function GetTickTime(): number;
declare function GetTime(): number;
declare function GetTimePreciseSec(): number;
declare function GetTitleName(titleMaskID: number): LuaMultiReturn<[titleString: string, playerTitle: boolean]>;
declare function GetTotemCannotDismiss(slot: number): boolean | undefined;
declare function GetTotemDuration(slot: number): WowApi.LuaDurationObject;
declare function GetTotemInfo(slot: number): LuaMultiReturn<[haveTotem: boolean, totemName: string, startTime: number, duration: number, icon: number, modRate: number, spellID: number]> | undefined;
declare function GetTotemTimeLeft(slot: number): number | undefined;
declare function GetUICameraInfo(uiCameraID: number): LuaMultiReturn<[posX: number, posY: number, posZ: number, lookAtX: number, lookAtY: number, lookAtZ: number, animID: number, animVariation: number, animFrame: number, useModelCenter: boolean]>;
declare function GetUnitChargedPowerPoints(unit: string): readonly number[] | undefined;
declare function GetUnitEmpowerHoldAtMaxTime(unit: string): number;
declare function GetUnitEmpowerMinHoldTime(unit: string): number;
declare function GetUnitEmpowerStageDuration(unit: string, index: number): number;
declare function GetUnitHealthModifier(unit: string): number;
declare function GetUnitMaxHealthModifier(unit: string): number;
declare function GetUnitPowerBarInfo(unitToken: string): WowApi.UnitPowerBarInfo | undefined;
declare function GetUnitPowerBarInfoByID(barID: number): WowApi.UnitPowerBarInfo | undefined;
declare function GetUnitPowerBarStrings(unitToken: string): LuaMultiReturn<[name: string | undefined, tooltip: string | undefined, cost: string | undefined]>;
declare function GetUnitPowerBarStringsByID(barID: number): LuaMultiReturn<[name: string | undefined, tooltip: string | undefined, cost: string | undefined]>;
declare function GetUnitPowerBarTextureInfo(unitToken: string, textureIndex: number, timerIndex?: number | undefined): LuaMultiReturn<[texture: number, colorR: number, colorG: number, colorB: number, colorA: number]>;
declare function GetUnitPowerBarTextureInfoByID(barID: number, textureIndex: number): LuaMultiReturn<[texture: number, colorR: number, colorG: number, colorB: number, colorA: number]>;
declare function GetUnitPowerModifier(unit: string): number;
declare function GetUnitSpeed(unit: string): LuaMultiReturn<[currentSpeed: number, runSpeed: number, flightSpeed: number, swimSpeed: number]>;
declare function GetUnitTotalModifiedMaxHealthPercent(unit: string): number;
declare function GetUpgradeExpansionLevel(): number;
declare function GetVehicleUIIndicator(vehicleIndicatorID: number): LuaMultiReturn<[backgroundTextureID: number, numSeatIndicators: number]> | undefined;
declare function GetVehicleUIIndicatorSeat(vehicleIndicatorID: number, indicatorSeatIndex: number): LuaMultiReturn<[virtualSeatIndex: number, xPos: number, yPos: number]> | undefined;
declare function GetVersatilityBonus(combatRating: number): number;
declare function GetXPExhaustion(): number | undefined;
declare function GetZoneText(): string;
declare function hasanysecretvalues(...values: (unknown)[]): boolean;
declare function HasAPEffectsSpellPower(): boolean;
declare function HasDualWieldPenalty(): boolean;
declare function HasFullControl(): boolean;
declare function HasIgnoreDualWieldWeapon(): boolean;
declare function HasKey(): boolean;
declare function HasLootSpecializations(): boolean;
declare function HasNoReleaseAura(): LuaMultiReturn<[hasCannotReleaseEffect: boolean, longestDuration: number, hasUntilCancelledDuration: boolean]>;
declare function HasSPEffectsAttackPower(): boolean;
declare function InCinematic(): boolean;
declare function InitiateRolePoll(): boolean;
declare function InitiateTrade(guid: string): void;
declare function Is64BitClient(): boolean;
declare function IsAccountSecured(): boolean;
declare function IsAdvancedFlyableArea(): boolean;
declare function IsAltKeyDown(): boolean;
declare function IsBetaBuild(): boolean;
declare function IsCemeterySelectionAvailable(): boolean;
declare function IsCharacterNewlyBoosted(): boolean;
declare function IsCollisionEnabled(): boolean;
declare function IsControlKeyDown(): boolean;
declare function IsCpuBound(): boolean | undefined;
declare function IsDebugBuild(): boolean;
declare function IsDemonHunterAvailable(): boolean;
declare function IsDrivableArea(): boolean;
declare function IsDualWielding(): boolean;
declare function IsEuropeanNumbers(): boolean;
declare function IsExpansionTrial(): boolean;
declare function IsFalling(unit?: string | undefined): boolean;
declare function IsFlyableArea(): boolean;
declare function IsFlying(unit?: string | undefined): boolean;
declare function IsGuildLeader(): boolean;
declare function IsIndoors(): boolean;
declare function IsInGuild(): boolean;
declare function IsInInstance(): LuaMultiReturn<[isInInstance: boolean, instanceType: string]>;
declare function IsInJailersTower(): boolean;
declare function IsInsane(): boolean;
declare function IsItemPreferredArmorType(itemLocation: WowApi.ItemLocation): boolean;
declare function IsJailersTowerLayerTimeLocked(layerLevel: number): string;
declare function IsKeyDown(keyOrMouseName: string, excludeBindingState?: boolean): boolean | undefined;
declare function IsLeftAltKeyDown(): boolean;
declare function IsLeftControlKeyDown(): boolean;
declare function IsLeftMetaKeyDown(): boolean;
declare function IsLeftShiftKeyDown(): boolean;
declare function IsLegacyDifficulty(difficultyID: number): boolean | undefined;
declare function IsLinuxClient(): boolean;
declare function IsLoggedIn(): boolean;
declare function IsMacClient(): boolean;
declare function IsMetaKeyDown(): boolean;
declare function IsModifierKeyDown(): boolean;
declare function IsMounted(): boolean;
declare function IsMouseButtonDown(button?: WowApi.mouseButton | undefined): boolean;
declare function IsMovieLocal(movieId: number): boolean;
declare function IsMoviePlayable(movieId: number): boolean;
declare function IsMovieReadable(movieId: number): boolean;
declare function IsOnGroundFloorInJailersTower(): boolean;
declare function IsOnTournamentRealm(): boolean;
declare function IsOutdoors(): boolean;
declare function IsOutOfBounds(): boolean;
declare function IsPlayerInGuildFromGUID(playerGUID: string): boolean;
declare function IsPlayerInWorld(): boolean;
declare function IsPlayerMoving(): boolean;
declare function IsPublicBuild(): boolean;
declare function IsPublicTestClient(): boolean;
declare function IsPVPTimerRunning(): boolean;
declare function IsRaidMarkerActive(index: number): boolean;
declare function IsRaidMarkerSystemEnabled(): boolean;
declare function IsRangedWeapon(): boolean;
declare function IsResting(): boolean;
declare function IsRestrictedAccount(): boolean;
declare function IsRightAltKeyDown(): boolean;
declare function IsRightControlKeyDown(): boolean;
declare function IsRightMetaKeyDown(): boolean;
declare function IsRightShiftKeyDown(): boolean;
declare function issecrettable(table: unknown): boolean;
declare function issecretvalue(value: unknown): boolean;
declare function IsShiftKeyDown(): boolean;
declare function IsStealthed(): boolean;
declare function IsSubmerged(unit?: string | undefined): boolean;
declare function IsSwimming(unit?: string | undefined): boolean;
declare function IsTargetLoose(): boolean;
declare function IsTestBuild(): boolean;
declare function IsThreatWarningEnabled(): boolean;
declare function IsTitleKnown(titleMaskID: number): boolean;
declare function IsTrialAccount(): boolean;
declare function IsUnitModelReadyForUI(unitToken: string): boolean;
declare function IsUsingFixedTimeStep(): boolean;
declare function IsUsingGamepad(): boolean;
declare function IsUsingMouse(): boolean;
declare function IsVeteranTrialAccount(): boolean;
declare function IsWindowsClient(): boolean;
declare function IsXPUserDisabled(): boolean;
declare function LaunchURL(url: string): void;
declare function LoadURLIndex(index: number, param?: number | undefined): void;
declare function LocalizedClassList(isFemale?: boolean): unknown;
declare function Logout(): void;
declare function MakeModifiers(): number;
declare function mapvalues(func: unknown, ...values: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function Mixin(object: unknown, ...mixins: (unknown)[]): unknown;
declare function MouseOverrideCinematicDisable(doOverride?: boolean): void;
declare function NoPlayTime(): boolean | undefined;
declare function NotifyInspect(targetGUID: string): void;
declare function NotWhileDeadError(): void;
declare function OpeningCinematic(): void;
declare function OutageDetected(): void;
declare function PartialPlayTime(): boolean | undefined;
declare function PickupPlayerMoney(amount: number): void;
declare function PlaceRaidMarker(index: number, token?: string | undefined): void;
declare function PlatformIsHandheld(): boolean;
declare function PlayerCanTeleport(): boolean;
declare function PlayerEffectiveAttackPower(): LuaMultiReturn<[mainHandAttackPower: number, offHandAttackPower: number, rangedAttackPower: number, baseAttackPower: number, baseRangedAttackPower: number]> | undefined;
declare function PlayerGetTimerunningSeasonID(): number | undefined;
declare function PlayerIsInCombat(): boolean;
declare function PlayerIsPVPInactive(unit: string): boolean;
declare function PlayerIsSpellTarget(unit: string): boolean;
declare function PlayerIsTimerunning(): boolean;
declare function PlayerVehicleHasComboPoints(): boolean;
declare function PortGraveyard(): void;
declare function PreloadMovie(movieId: number): void;
declare function Quit(): void;
declare function RandomRoll(min: number, max: number): void;
declare function ReagentsFromBankAllowed(): boolean;
declare function RegionalUniqueNamesEnabled(): boolean;
declare function RegisterEventCallback(eventName: string, callback: WowApi.EventCallbackType): void;
declare function RegisterUnitEventCallback(eventName: string, callback: WowApi.EventCallbackType, unit: string): void;
declare function RemoveRaidTargets(): void;
declare function RepopMe(): void;
declare function ReportBug(description: string): void;
declare function ReportPlayerIsPVPAFK(unit: string): void;
declare function ReportSuggestion(description: string): void;
declare function RequestTimePlayed(): void;
declare function ResetCPUUsage(): void;
declare function ResetCursor(): void;
declare function ResetInstances(): void;
declare function ResistancePercent(resistance: number, casterLevel: number): number;
declare function RespondInstanceLock(acceptLock: boolean): void;
declare function RestartGx(): void;
declare function ResurrectGetOfferer(): string;
declare function ResurrectHasSickness(): boolean;
declare function ResurrectHasTimer(): boolean;
declare function RetrieveCorpse(): void;
declare function RunScript(text: string): void;
declare function Screenshot(): void;
declare function scrub(...values: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function scrubsecretvalues(...values: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function secretunwrap(...values: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function secretwrap(...values: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function securecallmethod(object: unknown, method: string, ...arguments: (unknown)[]): LuaMultiReturn<[...values: (unknown)[]]>;
declare function securecopy(value?: unknown | undefined, options?: WowApi.SecureCopyOptions | undefined): unknown;
declare function SelectedRealmName(): string;
declare function SellCursorItem(): void;
declare function SendSubscriptionInterstitialResponse(response: WowApi.SubscriptionInterstitialResponseType): void;
declare function SetAllowDangerousScripts(allowed?: boolean): void;
declare function SetAllowLowLevelRaid(allow?: boolean): void;
declare function SetAllowRecentAlliesSeeLocation(allowRecentAlliesSeeLocation: boolean): void;
declare function SetAutoDeclineGuildInvites(allow?: boolean): void;
declare function SetAutoDeclineNeighborhoodInvites(allow?: boolean): void;
declare function SetCemeteryPreference(cemetaryID: number): void;
declare function SetConsoleKey(keystring: string): void;
declare function SetCurrentTitle(titleMaskID: number): void;
declare function SetCursor(name?: string | undefined): boolean;
declare function SetCursorByMode(mode: WowApi.Cursormode): boolean;
declare function SetCursorHoveredItem(item: WowApi.ItemLocation): void;
declare function SetCursorHoveredItemTradeItem(enabled: boolean): void;
declare function SetCursorPosition(xPosition: number, yPosition: number): void;
declare function SetCursorVirtualItem(itemInfo: number | string, cursorType: WowApi.UICursorType): void;
declare function SetDungeonDifficultyID(difficultyID: number): void;
declare function SetErrorCallstackHeight(height?: number | undefined): void;
declare function SetEuropeanNumbers(enabled: boolean): void;
declare function SetInWorldUIVisibility(visible: boolean): void;
declare function SetLegacyRaidDifficultyID(difficultyID: number, force?: boolean): void;
declare function SetLootSpecialization(specializationID: number): void;
declare function SetPortraitTexture(textureObject: WowApi.SimpleTexture, unitToken: string, disableMasking?: boolean): void;
declare function SetPortraitTextureFromCreatureDisplayID(textureObject: WowApi.SimpleTexture, creatureDisplayID: number): void;
declare function SetPreferredGamepadInteractTarget(unit?: string | undefined): void;
declare function SetRaidDifficultyID(difficultyID: number, force?: boolean): void;
declare function SetRaidTarget(target: string, userIndex: number): void;
declare function settablesecurity(table: unknown, option: WowApi.TableSecurityOption): void;
declare function SetTaxiBenchmarkMode(enable?: boolean): void;
declare function SetUIVisibility(visible: boolean): void;
declare function SetUnitCursorTexture(textureObject: WowApi.SimpleTexture, unit: string, style?: WowApi.CursorStyle | undefined, includeLowPriority?: boolean | undefined, preferGamepadIcon?: boolean | undefined): boolean;
declare function ShouldDisplayRaidRolesInSocialFrame(): boolean;
declare function ShouldDisplayStoryModeTooltipInSocialFrame(): boolean;
declare function ShouldShowExpansionUpgradeBanner(): boolean;
declare function ShouldShowIslandsWeeklyPOI(): boolean;
declare function ShouldShowSpecialSplashScreen(): boolean;
declare function ShowCloak(show: boolean): void;
declare function ShowHelm(show: boolean): void;
declare function ShowingCloak(): boolean;
declare function ShowingHelm(): boolean;
declare function SimulateMouseClick(button: WowApi.mouseButton): void;
declare function SimulateMouseDown(button: WowApi.mouseButton): void;
declare function SimulateMouseUp(button: WowApi.mouseButton): void;
declare function SimulateMouseWheel(delta: number): void;
declare function SitStandOrDescendStart(): void;
declare function SplashFrameCanBeShown(): boolean;
declare function StartAttack(name?: string, exactMatch?: boolean): void;
declare function StopAttack(): void;
declare function StopCinematic(): void;
declare function Stuck(): void;
declare function SupportsClipCursor(): boolean;
declare function TargetDirectionEnemy(facing: number, coneAngle?: number | undefined): void;
declare function TargetDirectionFinished(): void;
declare function TargetDirectionFriend(facing: number, coneAngle?: number | undefined): void;
declare function TargetLastEnemy(): void;
declare function TargetLastFriend(): void;
declare function TargetLastTarget(): void;
declare function TargetNearest(reverse?: boolean): void;
declare function TargetNearestEnemy(reverse?: boolean): void;
declare function TargetNearestEnemyPlayer(reverse?: boolean): void;
declare function TargetNearestFriend(reverse?: boolean): void;
declare function TargetNearestFriendPlayer(reverse?: boolean): void;
declare function TargetNearestPartyMember(reverse?: boolean): void;
declare function TargetNearestRaidMember(reverse?: boolean): void;
declare function TargetPriorityHighlightEnd(): void;
declare function TargetPriorityHighlightStart(useStartDelay?: boolean): void;
declare function TargetToggle(): void;
declare function TargetTotem(slot: number): void;
declare function TargetUnit(name?: string, exactMatch?: boolean): void;
declare function TimeoutResurrect(): void;
declare function ToggleAnimKitDisplay(): void;
declare function ToggleCollision(): void;
declare function ToggleCollisionDisplay(): void;
declare function ToggleDebugAIDisplay(): void;
declare function ToggleGravity(): void;
declare function TogglePlayerBounds(): void;
declare function TogglePortals(): void;
declare function ToggleSelfHighlight(): boolean;
declare function ToggleSheath(): void;
declare function ToggleSit(): void;
declare function ToggleTris(): void;
declare function UIReload(): void;
declare function UnitAffectingCombat(unit: string): boolean;
declare function UnitAlliedRaceInfo(unit: string): LuaMultiReturn<[isAlliedRace: boolean, hasHeritageArmorUnlocked: boolean]>;
declare function UnitArmor(unit: string): LuaMultiReturn<[base: number, effective: number, real: number, bonus: number]>;
declare function UnitAttackPower(unit: string): LuaMultiReturn<[attackPower: number, posBuff: number, negBuff: number]>;
declare function UnitAttackSpeed(unit: string): LuaMultiReturn<[attackSpeed: number, offhandAttackSpeed: number | undefined, rangedAttackSpeed: number | undefined]>;
declare function UnitBattlePetLevel(unit: string): number | undefined;
declare function UnitBattlePetSpeciesID(unit: string): number | undefined;
declare function UnitBattlePetType(unit: string): number | undefined;
declare function UnitCanAssist(unit: string, target: string, canAssistImmunePC?: boolean, canAssistUninteractable?: boolean): boolean;
declare function UnitCanAttack(unit: string, target: string): boolean;
declare function UnitCanCooperate(unit: string, target: string): boolean;
declare function UnitCanPetBattle(unit: string, target: string): boolean;
declare function UnitCastingDuration(unit: string): WowApi.LuaDurationObject | undefined;
declare function UnitCastingInfo(unit: string): LuaMultiReturn<[name: string, displayName: string, textureID: number, startTimeMs: number, endTimeMs: number, isTradeskill: boolean, castID: string, notInterruptible: boolean | undefined, castingSpellID: number, castBarID: WowApi.UnitCastBarID | undefined, delayTimeMs: number]>;
declare function UnitChannelDuration(unit: string): WowApi.LuaDurationObject | undefined;
declare function UnitChannelInfo(unit: string): LuaMultiReturn<[name: string, displayName: string, textureID: number, startTimeMs: number, endTimeMs: number, isTradeskill: boolean, notInterruptible: boolean | undefined, spellID: number, isEmpowered: boolean, numEmpowerStages: number, castBarID: WowApi.UnitCastBarID | undefined]>;
declare function UnitChromieTimeID(unit: string): number;
declare function UnitClass(unit: string): LuaMultiReturn<[className: string, classFilename: string, classID: number]> | undefined;
declare function UnitClassBase(unit: string): LuaMultiReturn<[classFilename: string, classID: number]> | undefined;
declare function UnitClassFromGUID(unitGUID: string): LuaMultiReturn<[className: string, classFilename: string, classID: number]> | undefined;
declare function UnitClassification(unit: string): string;
declare function UnitControllingVehicle(unit: string): boolean;
declare function UnitCreatureFamily(unit: string): LuaMultiReturn<[name: string, id: number]>;
declare function UnitCreatureID(unit: string): number | undefined;
declare function UnitCreatureType(unit: string): LuaMultiReturn<[name: string, id: number]>;
declare function UnitDamage(unit: string): LuaMultiReturn<[minDamage: number, maxDamage: number, offhandMinDamage: number, offhandMaxDamage: number, posBuff: number, negBuff: number, percent: number]>;
declare function UnitDefenseSkill(unit: string): LuaMultiReturn<[base: number, modifier: number]>;
declare function UnitDetailedThreatSituation(unit: string, mobGUID: string): LuaMultiReturn<[isTanking: boolean, status: number, scaledPercentage: number, rawPercentage: number, rawThreat: number]> | undefined;
declare function UnitDistanceSquared(unit: string): LuaMultiReturn<[distance: number, checkedDistance: boolean]>;
declare function UnitEffectiveLevel(name: string): number;
declare function UnitEmpoweredChannelDuration(unit: string, includeHoldAtMaxTime?: boolean): WowApi.LuaDurationObject | undefined;
declare function UnitEmpoweredStageDurations(unit: string): readonly WowApi.LuaDurationObject[] | undefined;
declare function UnitEmpoweredStagePercentages(unit: string, includeHoldAtMaxTime?: boolean): readonly number[] | undefined;
declare function UnitExists(unit?: string | undefined): boolean;
declare function UnitFactionGroup(unitName: string, checkDisplayRace?: boolean): LuaMultiReturn<[factionGroupTag: string, localized: string]>;
declare function UnitFullName(unit: string): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitGetAvailableRoles(unit: string): LuaMultiReturn<[tank: boolean, healer: boolean, dps: boolean]> | undefined;
declare function UnitGetDetailedHealPrediction(unit: string, healerUnit: string | undefined, healPredictionCalculator: WowApi.UnitHealPredictionCalculator): void;
declare function UnitGetIncomingHeals(unit: string, healerGUID?: string | undefined): number | undefined;
declare function UnitGetTotalAbsorbs(unit: string): number;
declare function UnitGetTotalHealAbsorbs(unit: string): number;
declare function UnitGroupRolesAssigned(unit?: string | undefined): string;
declare function UnitGroupRolesAssignedEnum(unit?: string | undefined): number;
declare function UnitGUID(unit: string): string | undefined;
declare function UnitHasEffectivelyTankAura(unit?: string | undefined): boolean;
declare function UnitHasLootInteraction(unit: string): boolean;
declare function UnitHasMouseoverHighlight(unit: string): boolean;
declare function UnitHasPowerType(unitToken: string, powerType: WowApi.PowerType): boolean;
declare function UnitHasRelicSlot(unit: string): boolean;
declare function UnitHasVehiclePlayerFrameUI(unit?: string | undefined): boolean;
declare function UnitHasVehicleUI(unit?: string | undefined): boolean;
declare function UnitHealth(unit: string, usePredicted?: boolean): number;
declare function UnitHealthMax(unit: string): number;
declare function UnitHealthMissing(unit: string, usePredicted?: boolean): number;
declare function UnitHealthPercent(unit: string, usePredicted?: boolean, curve?: WowApi.LuaCurveObjectBase | undefined): WowApi.LuaCurveEvaluatedResult;
declare function UnitHonor(unit: string): number;
declare function UnitHonorLevel(unit: string): number;
declare function UnitHonorMax(unit: string): number;
declare function UnitHPPerStamina(unit: string): number;
declare function UnitInAnyGroup(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitInBattleground(unit?: string | undefined, partyIndex?: number | undefined): number | undefined;
declare function UnitInOtherParty(unit: string): boolean;
declare function UnitInParty(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitInPartyIsAI(unit?: string | undefined): boolean;
declare function UnitInPartyShard(unit: string): boolean;
declare function UnitInRaid(unit?: string | undefined, partyIndex?: number | undefined): number | undefined;
declare function UnitInRange(unit: string): LuaMultiReturn<[inRange: boolean, checkedRange: boolean]>;
declare function UnitInSubgroup(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitInVehicle(unit: string): boolean;
declare function UnitInVehicleControlSeat(unit?: string | undefined): boolean;
declare function UnitInVehicleHidesPetFrame(unit?: string | undefined): boolean;
declare function UnitIsAFK(unit: string): boolean;
declare function UnitIsBattlePet(unit: string): boolean | undefined;
declare function UnitIsBattlePetCompanion(unit: string): boolean;
declare function UnitIsBossMob(unit: string): boolean;
declare function UnitIsCharmed(unit?: string | undefined): boolean;
declare function UnitIsConnected(unit: string): boolean;
declare function UnitIsControlling(unit: string): boolean;
declare function UnitIsCorpse(unit?: string | undefined): boolean;
declare function UnitIsDead(unit: string): boolean;
declare function UnitIsDeadOrGhost(unit: string): boolean;
declare function UnitIsDND(unit: string): boolean;
declare function UnitIsEnemy(unit: string, target: string): boolean;
declare function UnitIsFeignDeath(unit: string): boolean;
declare function UnitIsFriend(unit: string, target: string): boolean;
declare function UnitIsGameObject(unit?: string | undefined): boolean;
declare function UnitIsGhost(unit: string): boolean;
declare function UnitIsGroupAssistant(unit: string): boolean;
declare function UnitIsGroupLeader(unit: string, partyCategory?: number | undefined): boolean;
declare function UnitIsHumanPlayer(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitIsInInteractRange(unit: string): boolean;
declare function UnitIsInMyGuild(unit: string): boolean;
declare function UnitIsInteractable(unit?: string | undefined): boolean;
declare function UnitIsLieutenant(unit: string): boolean;
declare function UnitIsMercenary(name: string): boolean;
declare function UnitIsMinion(unit: string): boolean;
declare function UnitIsNPCAsPlayer(unit?: string | undefined): boolean;
declare function UnitIsOtherPlayersBattlePet(unit?: string | undefined): boolean;
declare function UnitIsOtherPlayersPet(unit?: string | undefined): boolean;
declare function UnitIsOwnerOrControllerOfUnit(controllingUnit: string, controlledUnit: string): boolean;
declare function UnitIsPlayer(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitIsPlayerControlledOrGroupMember(unit: string): boolean;
declare function UnitIsPossessed(unit?: string | undefined): boolean;
declare function UnitIsPVP(unit: string): boolean;
declare function UnitIsPVPFreeForAll(unit: string): boolean;
declare function UnitIsPVPSanctuary(unit?: string | undefined): boolean;
declare function UnitIsQuestBoss(unit: string): boolean;
declare function UnitIsRaidOfficer(unit?: string | undefined): boolean;
declare function UnitIsSameServer(unitName: string): boolean;
declare function UnitIsTapDenied(unit: string): boolean;
declare function UnitIsTrivial(unit: string): boolean;
declare function UnitIsUnconscious(unit: string): boolean;
declare function UnitIsUnit(unit1: string, unit2: string): boolean;
declare function UnitIsVisible(unit?: string | undefined): boolean;
declare function UnitIsWildBattlePet(unit: string): boolean;
declare function UnitLeadsAnyGroup(unit: string): boolean;
declare function UnitLevel(name: string): number;
declare function UnitName(unit: string): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNameFromGUID(unitGUID: string): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNameplateShowsWidgetsOnly(unit: string): boolean;
declare function UnitNameUnmodified(unit: string): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNumPowerBarTimers(unit: string): number;
declare function UnitOnTaxi(unit: string): boolean;
declare function UnitOwnerGUID(unit: string): string;
declare function UnitPartialPower(unitToken: string, powerType?: WowApi.PowerType | undefined, unmodified?: boolean): number;
declare function UnitPercentHealthFromGUID(unitGUID: string): number | undefined;
declare function UnitPhaseReason(unit: string): WowApi.PhaseReason | undefined;
declare function UnitPlayerControlled(unit?: string | undefined): boolean;
declare function UnitPlayerOrPetInParty(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitPlayerOrPetInRaid(unit?: string | undefined, partyIndex?: number | undefined): boolean;
declare function UnitPosition(unit: string): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number, mapID: number]>;
declare function UnitPower(unitToken: string, powerType?: WowApi.PowerType | undefined, unmodified?: boolean): number;
declare function UnitPowerBarID(unitToken: string): number;
declare function UnitPowerBarTimerInfo(unit: string, index?: number): LuaMultiReturn<[duration: number, expiration: number, barID: number, auraID: number]> | undefined;
declare function UnitPowerDisplayMod(powerType: WowApi.PowerType): number;
declare function UnitPowerMax(unitToken: string, powerType?: WowApi.PowerType | undefined, unmodified?: boolean): number;
declare function UnitPowerMissing(unitToken: string, powerType?: WowApi.PowerType | undefined, unmodified?: boolean): number;
declare function UnitPowerPercent(unitToken: string, powerType?: WowApi.PowerType | undefined, unmodified?: boolean, curve?: WowApi.LuaCurveObjectBase | undefined): WowApi.LuaCurveEvaluatedResult;
declare function UnitPowerType(unit: string, index?: number): LuaMultiReturn<[powerType: WowApi.PowerType, powerTypeToken: string, rgbX: number, rgbY: number, rgbZ: number]> | undefined;
declare function UnitPvpClassification(unit: string): WowApi.PvPUnitClassification | undefined;
declare function UnitPVPName(unit: string): string;
declare function UnitQuestTrivialLevelRange(unit: string): number;
declare function UnitQuestTrivialLevelRangeScaling(unit: string): number;
declare function UnitRace(unit: string): LuaMultiReturn<[localizedRaceName: string, englishRaceName: string, raceID: number]> | undefined;
declare function UnitRangedAttackPower(unit: string): LuaMultiReturn<[attackPower: number, posBuff: number, negBuff: number]>;
declare function UnitRangedDamage(unit: string): LuaMultiReturn<[speed: number, minDamage: number, maxDamage: number, posBuff: number, negBuff: number, percent: number]>;
declare function UnitReaction(unit: string, target: string): number | undefined;
declare function UnitRealmRelationship(unit: string): number | undefined;
declare function UnitResistance(unit: string, damageClass: WowApi.Damageclass): LuaMultiReturn<[baseResistance: number, realResistance: number, effectiveResistance: number, bonusResistance: number]>;
declare function UnitSelectionColor(unit: string, useExtendedColors?: boolean): LuaMultiReturn<[resultR: number, resultG: number, resultB: number, resultA: number]>;
declare function UnitSelectionType(unit: string, useExtendedColors?: boolean): number;
declare function UnitSetRole(unit: string, roleStr?: string | undefined): boolean;
declare function UnitSetRoleEnum(unit: string, role?: WowApi.LFGRole | undefined): boolean;
declare function UnitSex(unit: string): number | undefined;
declare function UnitSexBase(unit: string): WowApi.UnitSex | undefined;
declare function UnitShouldDisplayName(unit: string): boolean;
declare function UnitShouldDisplaySpellTargetName(unit: string): boolean;
declare function UnitSpellHaste(unit: string): number;
declare function UnitSpellTargetClass(unit: string): string;
declare function UnitSpellTargetName(unit: string): string;
declare function UnitStagger(unit: string): number;
declare function UnitStat(unit: string, index: number): LuaMultiReturn<[currentStat: number, effectiveStat: number, statPositiveBuff: number, statNegativeBuff: number]>;
declare function UnitSwitchToVehicleSeat(unit: string, virtualSeatIndex: number): void;
declare function UnitTargetsVehicleInRaidUI(unit?: string | undefined): boolean;
declare function UnitThreatLeadSituation(unit: string, mobGUID: string): number | undefined;
declare function UnitThreatPercentageOfLead(unit: string, mobGUID: string): number | undefined;
declare function UnitThreatSituation(unit: string, mobGUID?: string | undefined): number | undefined;
declare function UnitTokenFromGUID(unitGUID: string): string | undefined;
declare function UnitTreatAsPlayerForDisplay(unit: string): boolean;
declare function UnitTrialBankedLevels(unit: string): LuaMultiReturn<[bankedLevels: number, xpIntoCurrentLevel: number, xpForNextLevel: number]>;
declare function UnitTrialXP(unit: string): number;
declare function UnitUsingVehicle(unit: string): boolean;
declare function UnitVehicleSeatCount(unit: string): number;
declare function UnitVehicleSeatInfo(unit: string, virtualSeatIndex: number): LuaMultiReturn<[controlType: string, occupantName: string, serverName: string, ejectable: boolean, canSwitchSeats: boolean]> | undefined;
declare function UnitVehicleSkin(unit?: string | undefined): number;
declare function UnitWeaponAttackPower(unit: string): LuaMultiReturn<[mainHandWeaponAttackPower: number, offHandWeaponAttackPower: number, rangedWeaponAttackPower: number]>;
declare function UnitWidgetSet(unit: string): number | undefined;
declare function UnitXP(unit: string): number;
declare function UnitXPMax(unit: string): number;
declare function UnregisterEventCallback(eventName: string, callback: WowApi.EventCallbackType): void;
declare function UnregisterUnitEventCallback(eventName: string, callback: WowApi.EventCallbackType, unit: string): void;
declare function UpdateAddOnCPUUsage(): void;
declare function UpdateAddOnMemoryUsage(): void;
declare function UpdateWindow(): void;
declare function WorldLootObjectExists(unit?: string | undefined): boolean;

declare namespace C_AccessibilityOptions {

}

declare namespace C_AccountInfo {
  function GetIDFromBattleNetAccountGUID(this: void, battleNetAccountGUID: string): number;
  function IsGUIDBattleNetAccountType(this: void, guid: string): boolean;
  function IsGUIDRelatedToLocalAccount(this: void, guid: string): boolean;

}

declare namespace C_AccountStore {
  function BeginPurchase(this: void, itemID: number): boolean;
  function GetCategories(this: void, storeFrontID: number): readonly number[];
  function GetCategoryInfo(this: void, categoryID: number): WowApi.AccountStoreCategoryInfo;
  function GetCategoryItems(this: void, categoryID: number): readonly number[];
  function GetCurrencyAvailable(this: void, currencyID: number): number;
  function GetCurrencyIDForStore(this: void, storeFrontID: number): number | undefined;
  function GetCurrencyInfo(this: void, currencyID: number): WowApi.AccountStoreCurrencyInfo;
  function GetItemInfo(this: void, itemID: number): WowApi.AccountStoreItemInfo | undefined;
  function GetStoreFrontState(this: void, storeFrontID: number): WowApi.AccountStoreState;
  function RefundItem(this: void, itemID: number): boolean;
  function RequestStoreFrontInfoUpdate(this: void, storeFrontID: number): void;

}

declare namespace C_AchievementInfo {
  function AreGuildAchievementsEnabled(this: void): boolean;
  function GetRewardItemID(this: void, achievementID: number): number | undefined;
  function GetSupercedingAchievements(this: void, achievementID: number): readonly number[];
  function IsGuildAchievement(this: void, achievementId: number): boolean;
  function IsValidAchievement(this: void, achievementId: number): boolean;
  function SetPortraitTexture(this: void, textureObject: WowApi.SimpleTexture): void;

}

declare namespace C_AchievementTelemetry {
  function LinkAchievementInClub(this: void, achievementID: number): void;
  function LinkAchievementInWhisper(this: void, achievementID: number): void;
  function ShowAchievements(this: void): void;

}

declare namespace C_ActionBar {
  function EnableActionRangeCheck(this: void, actionID: number, enable: boolean): void;
  function FindAssistedCombatActionButtons(this: void, setToSearch?: WowApi.ActionBarSet): readonly number[] | undefined;
  function FindFlyoutActionButtons(this: void, flyoutID: number, setToSearch?: WowApi.ActionBarSet): readonly number[] | undefined;
  function FindPetActionButtons(this: void, petActionID: number, setToSearch?: WowApi.ActionBarSet): readonly number[] | undefined;
  function FindSpellActionButtons(this: void, spellID: number | string, setToSearch?: WowApi.ActionBarSet): readonly number[] | undefined;
  function ForceUpdateAction(this: void, slotID: number, suppressEvents?: boolean): void;
  function GetActionAutocast(this: void, actionID: number): LuaMultiReturn<[autocastAllowed: boolean, autocastEnabled: boolean]>;
  function GetActionBarPage(this: void): number;
  function GetActionChargeDuration(this: void, actionID: number): WowApi.LuaDurationObject;
  function GetActionCharges(this: void, actionID: number): WowApi.SpellChargeInfo;
  function GetActionCooldown(this: void, actionID: number): WowApi.SpellCooldownInfo;
  function GetActionCooldownDuration(this: void, actionID: number, ignoreGCD?: boolean): WowApi.LuaDurationObject;
  function GetActionDisplayCount(this: void, actionID: number, maxDisplayCount?: number, replacementString?: string): string;
  function GetActionLossOfControlCooldownDuration(this: void, actionID: number): WowApi.LuaDurationObject;
  function GetActionLossOfControlCooldownInfo(this: void, actionID: number): WowApi.SpellLossOfControlInfo;
  function GetActionText(this: void, actionID: number): string | undefined;
  function GetActionTexture(this: void, actionID: number): number;
  function GetActionUseCount(this: void, actionID: number): number;
  function GetBonusBarIndex(this: void): number;
  function GetBonusBarIndexForSlot(this: void, slotID: number): number | undefined;
  function GetBonusBarOffset(this: void): number;
  function GetExtraBarIndex(this: void): number;
  function GetItemActionOnEquipSpellID(this: void, actionID: number): number | undefined;
  function GetMultiCastBarIndex(this: void): number;
  function GetOverrideBarIndex(this: void): number;
  function GetOverrideBarSkin(this: void): number | undefined;
  function GetPetActionPetBarIndices(this: void, petActionID: number, setToSearch?: WowApi.ActionBarSet): readonly number[] | undefined;
  function GetProfessionQuality(this: void, actionID: number): number | undefined;
  function GetProfessionQualityInfo(this: void, actionID: number): WowApi.CraftingQualityInfo | undefined;
  function GetSpell(this: void, actionID: number): number;
  function GetTempShapeshiftBarIndex(this: void): number;
  function GetVehicleBarIndex(this: void): number;
  function HasAction(this: void, actionID: number): boolean;
  function HasAssistedCombatActionButtons(this: void, setToSearch?: WowApi.ActionBarSet): boolean;
  function HasBonusActionBar(this: void): boolean;
  function HasExtraActionBar(this: void): boolean;
  function HasFlyoutActionButtons(this: void, flyoutID: number, setToSearch?: WowApi.ActionBarSet): boolean;
  function HasOverrideActionBar(this: void): boolean;
  function HasPetActionButtons(this: void, petActionID: number, setToSearch?: WowApi.ActionBarSet): boolean;
  function HasPetActionPetBarIndices(this: void, petActionID: number, setToSearch?: WowApi.ActionBarSet): boolean;
  function HasRangeRequirements(this: void, actionID: number): boolean;
  function HasSpellActionButtons(this: void, spellID: number | string, setToSearch?: WowApi.ActionBarSet): boolean;
  function HasTempShapeshiftActionBar(this: void): boolean;
  function HasVehicleActionBar(this: void): boolean;
  function IsActionInRange(this: void, actionID: number, target?: string | undefined): boolean | undefined;
  function IsAssistedCombatAction(this: void, slotID: number): boolean;
  function IsAttackAction(this: void, actionID: number): boolean;
  function IsAutoCastPetAction(this: void, slotID: number): boolean;
  function IsAutoRepeatAction(this: void, actionID: number): boolean;
  function IsConsumableAction(this: void, actionID: number): boolean;
  function IsCurrentAction(this: void, actionID: number): boolean;
  function IsEnabledAutoCastPetAction(this: void, slotID: number): boolean;
  function IsEquippedAction(this: void, actionID: number): boolean;
  function IsEquippedGearOutfitAction(this: void, slotID: number): boolean;
  function IsHarmfulAction(this: void, actionID: number, useNeutral: boolean): boolean;
  function IsHelpfulAction(this: void, actionID: number, useNeutral: boolean): boolean;
  function IsInterruptAction(this: void, slotID: number): boolean;
  function IsItemAction(this: void, actionID: number): boolean;
  function IsMacroActionWithShowTooltip(this: void, actionID: number): boolean;
  function IsOnBarOrSpecialBar(this: void, spellID: number | string, setToSearch?: WowApi.ActionBarSet): boolean;
  function IsPossessBarVisible(this: void): boolean;
  function IsStackableAction(this: void, actionID: number): boolean;
  function IsUsableAction(this: void, actionID: number): LuaMultiReturn<[isUsable: boolean, isLackingResources: boolean]>;
  function PutActionInSlot(this: void, slotID: number): void;
  function RegisterActionUIButton(this: void, checkboxFrame: WowApi.SimpleCheckbox, actionID: number, cooldownFrame: WowApi.CooldownFrame): void;
  function SetActionBarPage(this: void, pageIndex: number): void;
  function ShouldOverrideBarShowHealthBar(this: void): boolean;
  function ShouldOverrideBarShowManaBar(this: void): boolean;
  function ShouldShowKeyring(this: void): boolean;
  function ToggleAutoCastPetAction(this: void, slotID: number): void;
  function UnregisterActionUIButton(this: void, checkboxFrame: WowApi.SimpleCheckbox): void;
  function UsesActionText(this: void, actionID: number): boolean;

}

declare namespace C_AddOnProfiler {
  function AddMeasuredCallEvent(this: void, name: string): void;
  function AddPerformanceMessageShown(this: void, msg: WowApi.AddOnPerformanceMessage): void;
  function CheckForPerformanceMessage(this: void): WowApi.AddOnPerformanceMessage | undefined;
  function GetAddOnMetric(this: void, name: string, metric: WowApi.AddOnProfilerMetric): number;
  function GetApplicationMetric(this: void, metric: WowApi.AddOnProfilerMetric): number;
  function GetOverallMetric(this: void, metric: WowApi.AddOnProfilerMetric): number;
  function GetTicksPerSecond(this: void): number;
  function GetTopKAddOnsForMetric(this: void, metric: WowApi.AddOnProfilerMetric, k: number): readonly WowApi.AddOnProfilerResult[];
  function IsEnabled(this: void): boolean;
  function MeasureCall(this: void, func: unknown, ...arguments: (unknown)[]): LuaMultiReturn<[results: WowApi.AddOnProfilerCallResults, ...values: (unknown)[]]>;

}

declare namespace C_AddOns {
  function DisableAddOn(this: void, name: number | string, character?: string): void;
  function DisableAllAddOns(this: void, character?: string | undefined): void;
  function DoesAddOnExist(this: void, name: number | string): boolean;
  function DoesAddOnHaveLoadError(this: void, name: number | string): boolean;
  function EnableAddOn(this: void, name: number | string, character?: string): void;
  function EnableAllAddOns(this: void, character?: string | undefined): void;
  function GetAddOnDependencies(this: void, name: number | string): LuaMultiReturn<[...values: (string)[]]>;
  function GetAddOnEnableState(this: void, name: number | string, character?: string): WowApi.AddOnEnableState;
  function GetAddOnInfo(this: void, name: number | string): LuaMultiReturn<[name: string, title: string, notes: string, loadable: boolean, reason: string, security: string]>;
  function GetAddOnInterfaceVersion(this: void, name: number | string): number;
  function GetAddOnLocalTable(this: void, name: number | string): unknown;
  function GetAddOnMetadata(this: void, name: number | string, variable: string): string;
  function GetAddOnName(this: void, index: number | string): string;
  function GetAddOnNotes(this: void, name: number | string): string;
  function GetAddOnOptionalDependencies(this: void, name: number | string): LuaMultiReturn<[...values: (string)[]]>;
  function GetAddOnSecurity(this: void, name: number | string): WowApi.AddOnSecurityStatus;
  function GetAddOnTitle(this: void, name: number | string): string;
  function GetNumAddOns(this: void): number;
  function GetScriptsDisallowedForBeta(this: void): boolean;
  function IsAddOnDefaultEnabled(this: void, name: number | string): boolean;
  function IsAddOnLoadable(this: void, name: number | string, character?: string, demandLoaded?: boolean): LuaMultiReturn<[loadable: boolean, reason: string]>;
  function IsAddOnLoaded(this: void, name: number | string): LuaMultiReturn<[loadedOrLoading: boolean, loaded: boolean]>;
  function IsAddOnLoadOnDemand(this: void, name: number | string): boolean;
  function IsAddonVersionCheckEnabled(this: void): boolean;
  function LoadAddOn(this: void, name: number | string): LuaMultiReturn<[loaded: boolean | undefined, value: string | undefined]>;
  function ResetAddOns(this: void): void;
  function ResetDisabledAddOns(this: void): void;
  function SaveAddOns(this: void): void;
  function SetAddonVersionCheck(this: void, enabled: boolean): void;

}

declare namespace C_AdventureJournal {

}

declare namespace C_AdventureMap {
  function GetAdventureMapTextureKit(this: void): string;
  function GetQuestPortraitInfo(this: void, questID: number): WowApi.AdventureMapQuestPortraitInfo | undefined;

}

declare namespace C_AlliedRaces {
  function GetAllRacialAbilitiesFromID(this: void, raceID: number): readonly WowApi.AlliedRaceRacialAbility[] | undefined;
  function GetRaceInfoByID(this: void, raceID: number): WowApi.AlliedRaceInfo | undefined;

}

declare namespace C_AnimaDiversion {
  function CloseUI(this: void): void;
  function GetAnimaDiversionNodes(this: void): readonly WowApi.AnimaDiversionNodeInfo[] | undefined;
  function GetOriginPosition(this: void): WowApi.vector2 | undefined;
  function GetReinforceProgress(this: void): number;
  function GetTextureKit(this: void): string;
  function OpenAnimaDiversionUI(this: void): void;
  function SelectAnimaNode(this: void, talentID: number, temporary: boolean): void;

}

declare namespace C_ArdenwealdGardening {
  function GetGardenData(this: void): WowApi.ArdenwealdGardenData;
  function IsGardenAccessible(this: void): boolean;

}

declare namespace C_AreaPoiInfo {
  function GetAreaPOIForMap(this: void, uiMapID: number): readonly number[];
  function GetAreaPOIInfo(this: void, uiMapID: number | undefined, areaPoiID: number): WowApi.AreaPOIInfo | undefined;
  function GetAreaPOISecondsLeft(this: void, areaPoiID: number): number | undefined;
  function GetDelvesForMap(this: void, uiMapID: number): readonly number[];
  function GetDragonridingRacesForMap(this: void, uiMapID: number): readonly number[];
  function GetEventsForMap(this: void, uiMapID: number): readonly number[];
  function GetQuestHubsForMap(this: void, uiMapID: number): readonly number[];
  function IsAreaPOITimed(this: void, areaPoiID: number): LuaMultiReturn<[isTimed: boolean, hideTimerInTooltip: boolean | undefined]>;

}

declare namespace C_ArtifactUI {
  function AddPower(this: void, powerID: number): boolean;
  function ApplyCursorRelicToSlot(this: void, relicSlotIndex: number): void;
  function CanApplyArtifactRelic(this: void, relicItemID: number, onlyUnlocked: boolean): boolean;
  function CanApplyCursorRelicToSlot(this: void, relicSlotIndex: number): boolean;
  function CanApplyRelicItemIDToEquippedArtifactSlot(this: void, relicItemID: number, relicSlotIndex: number): boolean;
  function CanApplyRelicItemIDToSlot(this: void, relicItemID: number, relicSlotIndex: number): boolean;
  function CheckRespecNPC(this: void): boolean;
  function Clear(this: void): void;
  function ClearForgeCamera(this: void): void;
  function ConfirmRespec(this: void): void;
  function DoesEquippedArtifactHaveAnyRelicsSlotted(this: void): boolean;
  function GetAppearanceInfo(this: void, appearanceSetIndex: number, appearanceIndex: number): LuaMultiReturn<[artifactAppearanceID: number, appearanceName: string, displayIndex: number, unlocked: boolean, failureDescription: string | undefined, uiCameraID: number, altHandCameraID: number | undefined, swatchColorR: number, swatchColorG: number, swatchColorB: number, modelOpacity: number, modelSaturation: number, obtainable: boolean]> | undefined;
  function GetAppearanceInfoByID(this: void, artifactAppearanceID: number): LuaMultiReturn<[artifactAppearanceSetID: number, artifactAppearanceID: number, appearanceName: string, displayIndex: number, unlocked: boolean, failureDescription: string | undefined, uiCameraID: number, altHandCameraID: number | undefined, swatchColorR: number, swatchColorG: number, swatchColorB: number, modelOpacity: number, modelSaturation: number, obtainable: boolean]> | undefined;
  function GetAppearanceSetInfo(this: void, appearanceSetIndex: number): LuaMultiReturn<[artifactAppearanceSetID: number, appearanceSetName: string, appearanceSetDescription: string, numAppearances: number]> | undefined;
  function GetArtifactArtInfo(this: void): WowApi.ArtifactArtInfo | undefined;
  function GetArtifactInfo(this: void): LuaMultiReturn<[itemID: number, altItemID: number | undefined, name: string, icon: number, xp: number, pointsSpent: number, quality: number, artifactAppearanceID: number, appearanceModID: number, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean, tier: WowApi.ArtifactTiers]> | undefined;
  function GetArtifactItemID(this: void): number | undefined;
  function GetArtifactTier(this: void): WowApi.ArtifactTiers | undefined;
  function GetArtifactXPRewardTargetInfo(this: void, artifactCategoryID: number): LuaMultiReturn<[name: string, icon: number]> | undefined;
  function GetCostForPointAtRank(this: void, rank: number, tier: WowApi.ArtifactTiers): number;
  function GetEquippedArtifactArtInfo(this: void): WowApi.ArtifactArtInfo | undefined;
  function GetEquippedArtifactInfo(this: void): LuaMultiReturn<[itemID: number, altItemID: number | undefined, name: string, icon: number, xp: number, pointsSpent: number, quality: number, artifactAppearanceID: number, appearanceModID: number, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean, tier: WowApi.ArtifactTiers]> | undefined;
  function GetEquippedArtifactItemID(this: void): number | undefined;
  function GetEquippedArtifactNumRelicSlots(this: void, onlyUnlocked?: boolean): number;
  function GetEquippedArtifactRelicInfo(this: void, relicSlotIndex: number): LuaMultiReturn<[name: string, icon: number, slotTypeName: string, link: string]> | undefined;
  function GetEquippedRelicLockedReason(this: void, relicSlotIndex: number): string | undefined;
  function GetForgeRotation(this: void): LuaMultiReturn<[forgeRotationX: number, forgeRotationY: number, forgeRotationZ: number]>;
  function GetItemLevelIncreaseProvidedByRelic(this: void, itemLinkOrID: number | string): number | undefined;
  function GetMetaPowerInfo(this: void): LuaMultiReturn<[...values: (number)[]]>;
  function GetNumAppearanceSets(this: void): number;
  function GetNumObtainedArtifacts(this: void): number;
  function GetNumRelicSlots(this: void, onlyUnlocked?: boolean): number;
  function GetPointsRemaining(this: void): number;
  function GetPowerHyperlink(this: void, powerID: number): string;
  function GetPowerInfo(this: void, powerID: number): WowApi.ArtifactPowerInfo | undefined;
  function GetPowerLinks(this: void, powerID: number): readonly number[];
  function GetPowers(this: void): readonly number[] | undefined;
  function GetPowersAffectedByRelic(this: void, relicSlotIndex: number): LuaMultiReturn<[...values: (number)[]]>;
  function GetPowersAffectedByRelicItemLink(this: void, relicItemInfo: number | string): LuaMultiReturn<[...values: (number)[]]>;
  function GetPreviewAppearance(this: void): number | undefined;
  function GetRelicInfo(this: void, relicSlotIndex: number): LuaMultiReturn<[name: string, icon: number, slotTypeName: string, link: string]> | undefined;
  function GetRelicInfoByItemID(this: void, itemID: number): LuaMultiReturn<[name: string, icon: number, slotTypeName: string, link: string]> | undefined;
  function GetRelicLockedReason(this: void, relicSlotIndex: number): string | undefined;
  function GetRelicSlotType(this: void, relicSlotIndex: number): string | undefined;
  function GetRespecArtifactArtInfo(this: void): WowApi.ArtifactArtInfo | undefined;
  function GetRespecArtifactInfo(this: void): LuaMultiReturn<[itemID: number, altItemID: number | undefined, name: string, icon: number, xp: number, pointsSpent: number, quality: number, artifactAppearanceID: number, appearanceModID: number, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean, tier: WowApi.ArtifactTiers]> | undefined;
  function GetRespecCost(this: void): number;
  function GetTotalPowerCost(this: void, startingTrait: number, numTraits: number, artifactTier: WowApi.ArtifactTiers): number | undefined;
  function GetTotalPurchasedRanks(this: void): number;
  function IsArtifactDisabled(this: void): boolean;
  function IsArtifactItem(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsAtForge(this: void): boolean;
  function IsEquippedArtifactDisabled(this: void): boolean;
  function IsEquippedArtifactMaxed(this: void): boolean;
  function IsMaxedByRulesOrEffect(this: void): boolean;
  function IsPowerKnown(this: void, powerID: number): boolean;
  function IsViewedArtifactEquipped(this: void): boolean;
  function SetAppearance(this: void, artifactAppearanceID: number): void;
  function SetForgeCamera(this: void): void;
  function SetForgeRotation(this: void, forgeRotationX: number, forgeRotationY: number, forgeRotationZ: number): void;
  function SetPreviewAppearance(this: void, artifactAppearanceID?: number): void;
  function ShouldSuppressForgeRotation(this: void): boolean;

}

declare namespace C_AssistedCombat {
  function GetActionSpell(this: void): number | undefined;
  function GetNextCastSpell(this: void, checkForVisibleButton?: boolean): number | undefined;
  function GetRotationSpells(this: void): readonly number[];
  function IsAvailable(this: void): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;

}

declare namespace C_AuctionHouse {
  function CalculateCommodityDeposit(this: void, itemID: number, duration: number, quantity: number): number | undefined;
  function CalculateItemDeposit(this: void, item: WowApi.ItemLocation, duration: number, quantity: number): number | undefined;
  function CanCancelAuction(this: void, ownedAuctionID: number): boolean;
  function CancelAuction(this: void, ownedAuctionID: number): void;
  function CancelCommoditiesPurchase(this: void): void;
  function CancelSell(this: void): void;
  function CloseAuctionHouse(this: void): void;
  function ConfirmCommoditiesPurchase(this: void, itemID: number, quantity: number): void;
  function ConfirmPostCommodity(this: void, item: WowApi.ItemLocation, duration: number, quantity: number, unitPrice: number): void;
  function ConfirmPostItem(this: void, item: WowApi.ItemLocation, duration: number, quantity: number, bid?: number | undefined, buyout?: number | undefined): void;
  function FavoritesAreAvailable(this: void): boolean;
  function GetAuctionInfoByID(this: void, auctionID: number): WowApi.AuctionInfo | undefined;
  function GetAuctionItemSubClasses(this: void, classID: number): readonly number[];
  function GetAvailablePostCount(this: void, item: WowApi.ItemLocation): number;
  function GetBidInfo(this: void, bidIndex: number): WowApi.BidInfo | undefined;
  function GetBids(this: void): readonly WowApi.BidInfo[];
  function GetBidType(this: void, bidTypeIndex: number): WowApi.ItemKey | undefined;
  function GetBrowseResults(this: void): readonly WowApi.BrowseResultInfo[];
  function GetCancelCost(this: void, ownedAuctionID: number): number;
  function GetCommoditySearchResultInfo(this: void, itemID: number, commoditySearchResultIndex: number): WowApi.CommoditySearchResultInfo | undefined;
  function GetCommoditySearchResultsQuantity(this: void, itemID: number): number;
  function GetExtraBrowseInfo(this: void, itemKey: WowApi.ItemKey): number | undefined;
  function GetFilterGroups(this: void): readonly WowApi.AuctionHouseFilterGroup[];
  function GetItemCommodityStatus(this: void, item: WowApi.ItemLocation): WowApi.ItemCommodityStatus;
  function GetItemKeyFromItem(this: void, item: WowApi.ItemLocation): WowApi.ItemKey;
  function GetItemKeyInfo(this: void, itemKey: WowApi.ItemKey, restrictQualityToFilter?: boolean): WowApi.ItemKeyInfo | undefined;
  function GetItemKeyRequiredLevel(this: void, itemKey: WowApi.ItemKey): number | undefined;
  function GetItemSearchResultInfo(this: void, itemKey: WowApi.ItemKey, itemSearchResultIndex: number): WowApi.ItemSearchResultInfo | undefined;
  function GetItemSearchResultsQuantity(this: void, itemKey: WowApi.ItemKey): number;
  function GetMaxBidItemBid(this: void): number | undefined;
  function GetMaxBidItemBuyout(this: void): number | undefined;
  function GetMaxCommoditySearchResultPrice(this: void, itemID: number): number | undefined;
  function GetMaxItemSearchResultBid(this: void, itemKey: WowApi.ItemKey): number | undefined;
  function GetMaxItemSearchResultBuyout(this: void, itemKey: WowApi.ItemKey): number | undefined;
  function GetMaxOwnedAuctionBid(this: void): number | undefined;
  function GetMaxOwnedAuctionBuyout(this: void): number | undefined;
  function GetNumBids(this: void): number;
  function GetNumBidTypes(this: void): number;
  function GetNumCommoditySearchResults(this: void, itemID: number): number;
  function GetNumItemSearchResults(this: void, itemKey: WowApi.ItemKey): number;
  function GetNumOwnedAuctions(this: void): number;
  function GetNumOwnedAuctionTypes(this: void): number;
  function GetNumReplicateItems(this: void): number;
  function GetOwnedAuctionInfo(this: void, ownedAuctionIndex: number): WowApi.OwnedAuctionInfo | undefined;
  function GetOwnedAuctions(this: void): readonly WowApi.OwnedAuctionInfo[];
  function GetOwnedAuctionType(this: void, ownedAuctionTypeIndex: number): WowApi.ItemKey | undefined;
  function GetQuoteDurationRemaining(this: void): number;
  function GetReplicateItemBattlePetInfo(this: void, index: number): LuaMultiReturn<[creatureID: number, displayID: number]> | undefined;
  function GetReplicateItemInfo(this: void, index: number): LuaMultiReturn<[name: string | undefined, texture: number | undefined, count: number, qualityID: number, usable: boolean | undefined, level: number, levelType: string | undefined, minBid: number, minIncrement: number, buyoutPrice: number, bidAmount: number, highBidder: string | undefined, bidderFullName: string | undefined, owner: string | undefined, ownerFullName: string | undefined, saleStatus: number, itemID: number, hasAllInfo: boolean | undefined]>;
  function GetReplicateItemLink(this: void, index: number): string | undefined;
  function GetReplicateItemTimeLeft(this: void, index: number): number;
  function GetTimeLeftBandInfo(this: void, timeLeftBand: WowApi.AuctionHouseTimeLeftBand): LuaMultiReturn<[timeLeftMinSeconds: number, timeLeftMaxSeconds: number]>;
  function HasFavorites(this: void): boolean;
  function HasFullBidResults(this: void): boolean;
  function HasFullBrowseResults(this: void): boolean;
  function HasFullCommoditySearchResults(this: void, itemID: number): boolean;
  function HasFullItemSearchResults(this: void, itemKey: WowApi.ItemKey): boolean;
  function HasFullOwnedAuctionResults(this: void): boolean;
  function HasMaxFavorites(this: void): boolean;
  function HasSearchResults(this: void, itemKey: WowApi.ItemKey): boolean;
  function IsFavoriteItem(this: void, itemKey: WowApi.ItemKey): boolean;
  function IsSellItemValid(this: void, item: WowApi.ItemLocation, displayError?: boolean): boolean;
  function IsThrottledMessageSystemReady(this: void): boolean;
  function MakeItemKey(this: void, itemID: number, itemLevel?: number, itemSuffix?: number, battlePetSpeciesID?: number): WowApi.ItemKey;
  function PlaceBid(this: void, auctionID: number, bidAmount: number): void;
  function PostCommodity(this: void, item: WowApi.ItemLocation, duration: number, quantity: number, unitPrice: number): boolean;
  function PostItem(this: void, item: WowApi.ItemLocation, duration: number, quantity: number, bid?: number | undefined, buyout?: number | undefined): boolean;
  function QueryBids(this: void, sorts: readonly WowApi.AuctionHouseSortType[], auctionIDs: readonly number[]): void;
  function QueryOwnedAuctions(this: void, sorts: readonly WowApi.AuctionHouseSortType[]): void;
  function RefreshCommoditySearchResults(this: void, itemID: number): void;
  function RefreshItemSearchResults(this: void, itemKey: WowApi.ItemKey, minLevelFilter?: number | undefined, maxLevelFilter?: number | undefined): void;
  function ReplicateItems(this: void): void;
  function RequestMoreBrowseResults(this: void): void;
  function RequestMoreCommoditySearchResults(this: void, itemID: number): boolean;
  function RequestMoreItemSearchResults(this: void, itemKey: WowApi.ItemKey): boolean;
  function RequestOwnedAuctionBidderInfo(this: void, auctionID: number): string;
  function SearchForFavorites(this: void, sorts: readonly WowApi.AuctionHouseSortType[]): void;
  function SearchForItemKeys(this: void, itemKeys: readonly WowApi.ItemKey[], sorts: readonly WowApi.AuctionHouseSortType[]): void;
  function SendBrowseQuery(this: void, query: WowApi.AuctionHouseBrowseQuery): void;
  function SendSearchQuery(this: void, itemKey: WowApi.ItemKey, sorts: readonly WowApi.AuctionHouseSortType[], separateOwnerItems: boolean, minLevelFilter?: number, maxLevelFilter?: number): void;
  function SendSellSearchQuery(this: void, itemKey: WowApi.ItemKey, sorts: readonly WowApi.AuctionHouseSortType[], separateOwnerItems: boolean): void;
  function SetFavoriteItem(this: void, itemKey: WowApi.ItemKey, setFavorite: boolean): void;
  function ShouldAutoPopulatePrice(this: void): boolean;
  function StartCommoditiesPurchase(this: void, itemID: number, quantity: number): void;
  function SupportsCopperValues(this: void): boolean;

}

declare namespace C_AuraContainerUtil {
  function ProcessAuraTooltipBackdropOptions(this: void, options: WowApi.AuraContainerTooltipBackdropOptions): WowApi.AuraContainerTooltipBackdropOptions;
  function ProcessAuraTooltipNineSliceOptions(this: void, options: WowApi.AuraContainerTooltipNineSliceOptions): WowApi.AuraContainerTooltipNineSliceOptions;
  function ProcessAuraTooltipTextureSliceOptions(this: void, options: WowApi.AuraContainerTooltipTextureSliceOptions): WowApi.AuraContainerTooltipTextureSliceOptions;
  function ProcessCustomAuraButtonApplicationBarOptions(this: void, options: WowApi.CustomAuraButtonApplicationBarOptions): WowApi.CustomAuraButtonApplicationBarOptions;
  function ProcessCustomAuraButtonApplicationCountOptions(this: void, options?: WowApi.CustomAuraButtonApplicationCountOptions | undefined): WowApi.CustomAuraButtonApplicationCountOptions;
  function ProcessCustomAuraButtonCasterNameOptions(this: void, options?: WowApi.CustomAuraButtonCasterNameOptions | undefined): WowApi.CustomAuraButtonCasterNameOptions;
  function ProcessCustomAuraButtonDispelTypeTextOptions(this: void, options?: WowApi.CustomAuraButtonDispelTypeTextOptions | undefined): WowApi.CustomAuraButtonDispelTypeTextOptions;
  function ProcessCustomAuraButtonDispelTypeTextureOptions(this: void, options?: WowApi.CustomAuraButtonDispelTypeTextureOptions | undefined): WowApi.CustomAuraButtonDispelTypeTextureOptions;
  function ProcessCustomAuraButtonDurationBarOptions(this: void, options?: WowApi.CustomAuraButtonDurationBarOptions | undefined): WowApi.CustomAuraButtonDurationBarOptions;
  function ProcessCustomAuraButtonDurationTextOptions(this: void, options?: WowApi.CustomAuraButtonDurationTextOptions | undefined): WowApi.CustomAuraButtonDurationTextOptions;

}

declare namespace C_AutoComplete {
  function GetAutoCompletePresenceID(this: void, name: string): number | undefined;
  function GetAutoCompleteRealms(this: void): readonly string[];
  function GetAutoCompleteResults(this: void, name: string, numResults: number, cursorPosition: number, allowFullMatch: boolean, includeFlags: number, excludeFlags: number): readonly WowApi.AutoCompleteResult[];
  function IsRecognizedName(this: void, name: string, includeFlags: number, excludeFlags: number): boolean;

}

declare namespace C_AutoLoot {
  function SetUseAutoLootToggle(this: void, useAutoLootToggle: boolean): void;

}

declare namespace C_AzeriteEmpoweredItem {
  function CanSelectPower(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation, powerID: number): boolean;
  function ConfirmAzeriteEmpoweredItemRespec(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation): void;
  function GetAllTierInfo(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation): readonly WowApi.AzeriteEmpoweredItemTierInfo[];
  function GetAllTierInfoByItemID(this: void, itemInfo: number | string, classID?: number | undefined): readonly WowApi.AzeriteEmpoweredItemTierInfo[];
  function GetAzeriteEmpoweredItemRespecCost(this: void): number;
  function GetPowerInfo(this: void, powerID: number): WowApi.AzeriteEmpoweredItemPowerInfo | undefined;
  function GetPowerText(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation, powerID: number, level: WowApi.AzeritePowerLevel): WowApi.AzeriteEmpoweredItemPowerText | undefined;
  function GetSpecsForPower(this: void, powerID: number): readonly WowApi.AzeriteSpecInfo[] | undefined;
  function HasAnyUnselectedPowers(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation): boolean;
  function HasBeenViewed(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation): boolean;
  function IsAzeriteEmpoweredItem(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsAzeriteEmpoweredItemByID(this: void, itemInfo: number | string): boolean;
  function IsAzeritePreviewSourceDisplayable(this: void, itemInfo: number | string, classID?: number | undefined): boolean;
  function IsHeartOfAzerothEquipped(this: void): boolean;
  function IsPowerAvailableForSpec(this: void, powerID: number, specID: number): boolean;
  function IsPowerSelected(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation, powerID: number): boolean;
  function SelectPower(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation, powerID: number): boolean;
  function SetHasBeenViewed(this: void, azeriteEmpoweredItemLocation: WowApi.AzeriteEmpoweredItemLocation): void;

}

declare namespace C_AzeriteEssence {
  function ActivateEssence(this: void, essenceID: number, milestoneID: number): void;
  function CanActivateEssence(this: void, essenceID: number, milestoneID: number): boolean;
  function CanDeactivateEssence(this: void, milestoneID: number): boolean;
  function CanOpenUI(this: void): boolean;
  function ClearPendingActivationEssence(this: void): void;
  function CloseForge(this: void): void;
  function GetEssenceHyperlink(this: void, essenceID: number, rank: number): string;
  function GetEssenceInfo(this: void, essenceID: number): WowApi.AzeriteEssenceInfo | undefined;
  function GetEssences(this: void): readonly WowApi.AzeriteEssenceInfo[] | undefined;
  function GetMilestoneEssence(this: void, milestoneID: number): number | undefined;
  function GetMilestoneInfo(this: void, milestoneID: number): WowApi.AzeriteMilestoneInfo | undefined;
  function GetMilestones(this: void): readonly WowApi.AzeriteMilestoneInfo[] | undefined;
  function GetMilestoneSpell(this: void, milestoneID: number): number | undefined;
  function GetNumUnlockedEssences(this: void): number;
  function GetNumUsableEssences(this: void): number;
  function GetPendingActivationEssence(this: void): number;
  function HasNeverActivatedAnyEssences(this: void): boolean;
  function HasPendingActivationEssence(this: void): boolean;
  function IsAtForge(this: void): boolean;
  function SetPendingActivationEssence(this: void, essenceID: number): void;
  function UnlockMilestone(this: void, milestoneID: number): void;

}

declare namespace C_AzeriteItem {
  function FindActiveAzeriteItem(this: void): WowApi.AzeriteItemLocation | undefined;
  function GetAzeriteItemXPInfo(this: void, azeriteItemLocation: WowApi.AzeriteItemLocation): LuaMultiReturn<[xp: number, totalLevelXP: number]> | undefined;
  function GetPowerLevel(this: void, azeriteItemLocation: WowApi.AzeriteItemLocation): number;
  function GetUnlimitedPowerLevel(this: void, azeriteItemLocation: WowApi.AzeriteItemLocation): number;
  function HasActiveAzeriteItem(this: void): boolean;
  function IsAzeriteItem(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsAzeriteItemAtMaxLevel(this: void): boolean;
  function IsAzeriteItemByID(this: void, itemInfo: number | string): boolean;
  function IsAzeriteItemEnabled(this: void, azeriteItemLocation: WowApi.AzeriteItemLocation): boolean;
  function IsUnlimitedLevelingUnlocked(this: void): boolean;

}

declare namespace C_Bank {
  function AreAnyBankTypesViewable(this: void): boolean;
  function AutoDepositItemsIntoBank(this: void, bankType: WowApi.BankType): void;
  function BankBagTypeAndIDToInvSlot(this: void, bankType: WowApi.BankType, slotIndex: number): number | undefined;
  function CanDepositMoney(this: void, bankType: WowApi.BankType): boolean;
  function CanPurchaseBankTab(this: void, bankType: WowApi.BankType): boolean;
  function CanUseBank(this: void, bankType: WowApi.BankType): boolean;
  function CanViewBank(this: void, bankType: WowApi.BankType): boolean;
  function CanWithdrawMoney(this: void, bankType: WowApi.BankType): boolean;
  function CloseBankFrame(this: void): void;
  function DepositMoney(this: void, bankType: WowApi.BankType, amount: number): void;
  function DoesBankTypeSupportAutoDeposit(this: void, bankType: WowApi.BankType): boolean;
  function DoesBankTypeSupportMoneyTransfer(this: void, bankType: WowApi.BankType): boolean;
  function FetchBankLockedReason(this: void, bankType: WowApi.BankType): WowApi.BankLockedReason | undefined;
  function FetchDepositedMoney(this: void, bankType: WowApi.BankType): number;
  function FetchMaxNumBankTabs(this: void, bankType: WowApi.BankType): number;
  function FetchNextPurchasableBankTabData(this: void, bankType: WowApi.BankType): WowApi.PurchasableBankTabData | undefined;
  function FetchNumPurchasedBankTabs(this: void, bankType: WowApi.BankType): number;
  function FetchPurchasedBankTabData(this: void, bankType: WowApi.BankType): readonly WowApi.BankTabData[];
  function FetchPurchasedBankTabIDs(this: void, bankType: WowApi.BankType): readonly WowApi.BagIndex[];
  function FetchViewableBankTypes(this: void): readonly WowApi.BankType[];
  function HasMaxBankTabs(this: void, bankType: WowApi.BankType): boolean;
  function IsItemAllowedInBankType(this: void, bankType: WowApi.BankType, itemLocation: WowApi.ItemLocation): boolean;
  function PurchaseBankTab(this: void, bankType: WowApi.BankType): void;
  function ShouldUsePlayerBagsInBank(this: void): boolean;
  function UpdateBankTabSettings(this: void, bankType: WowApi.BankType, tabID: WowApi.BagIndex, tabName: string, tabIcon: string, depositFlags: WowApi.BagSlotFlags): void;
  function WithdrawMoney(this: void, bankType: WowApi.BankType, amount: number): void;

}

declare namespace C_BarberShop {
  function ApplyCustomizationChoices(this: void): boolean;
  function Cancel(this: void): void;
  function ClearPreviewChoices(this: void, clearSavedChoices?: boolean): void;
  function GetAvailableCustomizations(this: void): readonly WowApi.CharCustomizationCategory[] | undefined;
  function GetCurrentCameraZoom(this: void): number;
  function GetCurrentCharacterData(this: void): WowApi.PlayerInfoCharacterData | undefined;
  function GetCurrentCost(this: void): number;
  function GetViewingChrModel(this: void): number | undefined;
  function HasAlteredForm(this: void): boolean;
  function HasAnyChanges(this: void): boolean;
  function HasCustomizationFeature(this: void, featureMask: WowApi.ChrModelFeatureFlags): boolean;
  function IsViewingAlteredForm(this: void): boolean;
  function MarkCustomizationChoiceAsSeen(this: void, choiceID: number): void;
  function MarkCustomizationOptionAsSeen(this: void, optionID: number): void;
  function PreviewCustomizationChoice(this: void, optionID: number, choiceID: number): void;
  function RandomizeCustomizationChoices(this: void): void;
  function ResetCameraRotation(this: void): void;
  function ResetCustomizationChoices(this: void): void;
  function RotateCamera(this: void, diffDegrees: number): void;
  function SaveSeenChoices(this: void): void;
  function SetCameraDistanceOffset(this: void, offset: number): void;
  function SetCameraZoomLevel(this: void, zoomLevel: number, keepCustomZoom?: boolean | undefined): void;
  function SetCustomizationChoice(this: void, optionID: number, choiceID: number): void;
  function SetModelDressState(this: void, dressedState: boolean): void;
  function SetSelectedSex(this: void, sex: WowApi.UnitSex): void;
  function SetViewingAlteredForm(this: void, isViewingAlteredForm: boolean): void;
  function SetViewingChrModel(this: void, chrModelID?: number | undefined, spellShapeshiftFormID?: number | undefined): void;
  function SetViewingShapeshiftForm(this: void, shapeshiftFormID?: number | undefined): void;
  function ZoomCamera(this: void, zoomAmount: number): void;

}

declare namespace C_BarberShopInternal {
  function SetQAMode(this: void, qaModeEnabled: boolean): void;

}

declare namespace C_BattleNet {
  function AreFriendTagsEnabled(this: void): boolean;
  function AreHighResTexturesInstalled(this: void): boolean;
  function AreTitleFriendCustomNamesEnabled(this: void): boolean;
  function AreTitleFriendsEnabled(this: void): boolean;
  function BNCheckBattleTagInviteToRecentAlly(this: void, recentAllyGUID: string): void;
  function BNCheckTitleFriendInviteToUnit(this: void, unit: string): void;
  function CanToggleHighResTexturesWithoutClientReload(this: void): boolean;
  function GetAccountInfoByGUID(this: void, guid: string): WowApi.BNetAccountInfo | undefined;
  function GetAccountInfoByID(this: void, id: number, wowAccountGUID?: string | undefined): WowApi.BNetAccountInfo | undefined;
  function GetCustomTitleFriendName(this: void, id: number): string | undefined;
  function GetFriendAccountInfo(this: void, friendIndex: number, wowAccountGUID?: string | undefined): WowApi.BNetAccountInfo | undefined;
  function GetFriendGameAccountInfo(this: void, friendIndex: number, accountIndex: number): WowApi.BNetGameAccountInfo | undefined;
  function GetFriendInviteInfo(this: void, inviteIndex: number): WowApi.BNetFriendInviteInfo | undefined;
  function GetFriendNumGameAccounts(this: void, friendIndex: number): number;
  function GetGameAccountInfoByGUID(this: void, guid: string): WowApi.BNetGameAccountInfo | undefined;
  function GetGameAccountInfoByID(this: void, id: number): WowApi.BNetGameAccountInfo | undefined;
  function InstallHighResTextures(this: void): void;
  function InviteFriend(this: void, gameAccountID: number): void;
  function IsBattleNetFriendsListEnabled(this: void): boolean;
  function IsBattleNetFriendsListSupported(this: void): boolean;
  function IsFriendTagSupportedForCurrentGameType(this: void, friendTag: WowApi.BattleNetFriendTag): boolean;
  function SearchFriends(this: void, searchInfo: WowApi.AuroraFriendsSearchInfo): readonly number[];
  function SendGameData(this: void, gameAccountID: number, prefix: string, data: string): WowApi.SendAddonMessageResult;
  function SendTitleFriendInviteByName(this: void, name: string): void;
  function SendVerifiedBattleNetFriendInvite(this: void): void;
  function SendWhisper(this: void, bnetAccountID: number, text: string): boolean;
  function SetAFK(this: void, isAFK?: boolean): void;
  function SetAppearOffline(this: void, isAppearOffline?: boolean): void;
  function SetCustomMessage(this: void, text: string): boolean;
  function SetCustomTitleFriendName(this: void, id: number, customName: string): void;
  function SetDND(this: void, isDND?: boolean): void;
  function SetFriendTags(this: void, id: number, friendTags: readonly WowApi.BattleNetFriendTag[]): void;

}

declare namespace C_BattlePet {

}

declare namespace C_BehavioralMessaging {
  function SendNotificationReceipt(this: void, dbId: string, openTimeSeconds: number, readTimeSeconds: number): void;

}

declare namespace C_BlackMarketInfo {

}

declare namespace C_BlizzCon2026 {
  function GetExperience(this: void): WowApi.Bc26Experience;
  function IsActive(this: void): boolean;
  function IsColdSwapFeatureEnabled(this: void): boolean;
  function SetExperience(this: void, experience: WowApi.Bc26Experience): void;

}

declare namespace C_Browser {
  function CloseFullscreenBrowser(this: void): void;

}

declare namespace C_Calendar {
  function AddEvent(this: void): void;
  function AreNamesReady(this: void): boolean;
  function CanAddEvent(this: void): boolean;
  function CanSendInvite(this: void): boolean;
  function CloseEvent(this: void): void;
  function ContextMenuEventCanComplain(this: void, offsetMonths: number, monthDay: number, eventIndex: number): boolean;
  function ContextMenuEventCanEdit(this: void, offsetMonths: number, monthDay: number, eventIndex: number): boolean;
  function ContextMenuEventCanRemove(this: void, offsetMonths: number, monthDay: number, eventIndex: number): boolean;
  function ContextMenuEventClipboard(this: void): boolean;
  function ContextMenuEventCopy(this: void): void;
  function ContextMenuEventGetCalendarType(this: void): string | undefined;
  function ContextMenuEventPaste(this: void, offsetMonths: number, monthDay: number): void;
  function ContextMenuEventRemove(this: void): void;
  function ContextMenuEventSignUp(this: void): void;
  function ContextMenuGetEventIndex(this: void): WowApi.CalendarEventIndexInfo | undefined;
  function ContextMenuInviteAvailable(this: void): void;
  function ContextMenuInviteDecline(this: void): void;
  function ContextMenuInviteRemove(this: void): void;
  function ContextMenuInviteTentative(this: void): void;
  function ContextMenuSelectEvent(this: void, offsetMonths: number, monthDay: number, eventIndex: number): void;
  function CreateCommunitySignUpEvent(this: void): void;
  function CreateGuildAnnouncementEvent(this: void): void;
  function CreateGuildSignUpEvent(this: void): void;
  function CreatePlayerEvent(this: void): void;
  function EventAvailable(this: void): void;
  function EventCanEdit(this: void): boolean;
  function EventClearAutoApprove(this: void): void;
  function EventClearLocked(this: void): void;
  function EventClearModerator(this: void, inviteIndex: number): void;
  function EventDecline(this: void): void;
  function EventGetCalendarType(this: void): string | undefined;
  function EventGetClubId(this: void): string | undefined;
  function EventGetInvite(this: void, eventIndex: number): WowApi.CalendarEventInviteInfo | undefined;
  function EventGetInviteResponseTime(this: void, eventIndex: number): WowApi.CalendarTime | undefined;
  function EventGetInviteSortCriterion(this: void): LuaMultiReturn<[criterion: string, reverse: boolean]>;
  function EventGetSelectedInvite(this: void): number | undefined;
  function EventGetStatusOptions(this: void, eventIndex: number): readonly WowApi.CalendarEventStatusOption[];
  function EventGetTextures(this: void, eventType: WowApi.CalendarEventType): readonly WowApi.CalendarEventTextureInfo[];
  function EventGetTypes(this: void): readonly string[];
  function EventGetTypesDisplayOrdered(this: void): readonly WowApi.CalendarEventTypeDisplayInfo[];
  function EventHasPendingInvite(this: void): boolean;
  function EventHaveSettingsChanged(this: void): boolean;
  function EventInvite(this: void, name: string): void;
  function EventRemoveInvite(this: void, inviteIndex: number): void;
  function EventRemoveInviteByGuid(this: void, guid: string): void;
  function EventSelectInvite(this: void, inviteIndex: number): void;
  function EventSetAutoApprove(this: void): void;
  function EventSetClubId(this: void, clubId?: string | undefined): void;
  function EventSetDate(this: void, month: number, monthDay: number, year: number): void;
  function EventSetDescription(this: void, description: string): void;
  function EventSetInviteStatus(this: void, eventIndex: number, status: WowApi.CalendarStatus): void;
  function EventSetLocked(this: void): void;
  function EventSetModerator(this: void, inviteIndex: number): void;
  function EventSetTextureID(this: void, textureIndex: number): void;
  function EventSetTime(this: void, hour: number, minute: number): void;
  function EventSetTitle(this: void, title: string): void;
  function EventSetType(this: void, typeIndex: WowApi.CalendarEventType): void;
  function EventSignUp(this: void): void;
  function EventSortInvites(this: void, criterion: string, reverse: boolean): void;
  function EventTentative(this: void): void;
  function GetClubCalendarEvents(this: void, clubId: string, startTime: WowApi.CalendarTime, endTime: WowApi.CalendarTime): readonly WowApi.CalendarDayEvent[];
  function GetDayEvent(this: void, monthOffset: number, monthDay: number, index: number): WowApi.CalendarDayEvent | undefined;
  function GetDefaultGuildFilter(this: void): WowApi.CalendarGuildFilterInfo;
  function GetEventIndex(this: void): WowApi.CalendarEventIndexInfo | undefined;
  function GetEventIndexInfo(this: void, eventID: number, monthOffset?: number | undefined, monthDay?: number | undefined): WowApi.CalendarEventIndexInfo | undefined;
  function GetEventInfo(this: void): WowApi.CalendarEventInfo | undefined;
  function GetFirstPendingInvite(this: void, offsetMonths: number, monthDay: number): number | undefined;
  function GetGuildEventInfo(this: void, index: number): WowApi.CalendarGuildEventInfo | undefined;
  function GetGuildEventSelectionInfo(this: void, index: number): WowApi.CalendarEventIndexInfo | undefined;
  function GetHolidayInfo(this: void, monthOffset: number, monthDay: number, index: number): WowApi.CalendarHolidayInfo | undefined;
  function GetMaxCreateDate(this: void): WowApi.CalendarTime;
  function GetMinDate(this: void): WowApi.CalendarTime;
  function GetMonthInfo(this: void, offsetMonths?: number): WowApi.CalendarMonthInfo;
  function GetNextClubId(this: void): string | undefined;
  function GetNumDayEvents(this: void, offsetMonths: number, monthDay: number): number;
  function GetNumGuildEvents(this: void): number;
  function GetNumInvites(this: void): number;
  function GetNumPendingInvites(this: void): number;
  function GetRaidInfo(this: void, offsetMonths: number, monthDay: number, eventIndex: number): WowApi.CalendarRaidInfo | undefined;
  function IsActionPending(this: void): boolean;
  function IsEventOpen(this: void): boolean;
  function MassInviteCommunity(this: void, clubId: string, minLevel: number, maxLevel: number, maxRankOrder?: number | undefined): void;
  function MassInviteGuild(this: void, minLevel: number, maxLevel: number, maxRankOrder: number): void;
  function OpenCalendar(this: void): void;
  function OpenEvent(this: void, offsetMonths: number, monthDay: number, index: number): boolean;
  function RemoveEvent(this: void): void;
  function SetAbsMonth(this: void, month: number, year: number): void;
  function SetMonth(this: void, offsetMonths: number): void;
  function SetNextClubId(this: void, clubId?: string | undefined): void;
  function UpdateEvent(this: void): void;

}

declare namespace C_CampaignInfo {
  function GetAvailableCampaigns(this: void): readonly number[];
  function GetCampaignChapterInfo(this: void, campaignChapterID: number): WowApi.CampaignChapterInfo | undefined;
  function GetCampaignID(this: void, questID: number): number;
  function GetCampaignInfo(this: void, campaignID: number): WowApi.CampaignInfo | undefined;
  function GetChapterIDs(this: void, campaignID: number): readonly number[] | undefined;
  function GetCurrentChapterID(this: void, campaignID: number): number | undefined;
  function GetFailureReason(this: void, campaignID: number): WowApi.CampaignFailureReason | undefined;
  function GetState(this: void, campaignID: number): WowApi.CampaignState;
  function IsCampaignQuest(this: void, questID: number): boolean;
  function SortAsNormalQuest(this: void, campaignID: number): boolean;

}

declare namespace C_CatalogShop {
  function BulkPurchaseProducts(this: void, productIDs: readonly number[]): boolean;
  function BulkRefundDecors(this: void, decorGUIDs: readonly string[]): void;
  function CloseCatalogShopInteraction(this: void): void;
  function ConfirmHousingPurchase(this: void, productIDs: readonly number[]): void;
  function FindBestCurrencyProductForNeededAmount(this: void, vcCurrencyCode: string, amountNeeded: number): number | undefined;
  function GetAvailableCategoryIDs(this: void): readonly number[];
  function GetAvailableTransmogRaceInfos(this: void): readonly WowApi.AvailableRaceInfo[];
  function GetCatalogShopProductDisplayInfo(this: void, catalogShopProductID: number): WowApi.CatalogShopProductDisplayInfo;
  function GetCategoryInfo(this: void, categoryID: number): WowApi.CatalogShopCategoryInfo;
  function GetCategorySectionInfo(this: void, categoryID: number, sectionID: number): WowApi.CatalogShopSectionInfo;
  function GetFailureInfo(this: void): LuaMultiReturn<[errorResultEnum: WowApi.StoreError | undefined, errorResultRaw: number | undefined]>;
  function GetFirstCategoryByProductID(this: void, productID: number): WowApi.CatalogShopCategoryInfo | undefined;
  function GetNewProducts(this: void): readonly number[];
  function GetProductAvailabilityTimeRemainingSecs(this: void, catalogShopProductID: number): number | undefined;
  function GetProductIDsForBundle(this: void, bundleProductID: number): readonly WowApi.CatalogShopBundleChildInfo[];
  function GetProductIDsForCategory(this: void, categoryID: number): readonly number[];
  function GetProductIDsForCategorySection(this: void, categoryID: number, sectionID: number): readonly number[];
  function GetProductInfo(this: void, productID: number): WowApi.CatalogShopProductInfo | undefined;
  function GetProductSortOrder(this: void, categoryID: number, sectionID: number, productID: number): number | undefined;
  function GetRefundableDecors(this: void, productIdFilterOpt?: number | undefined): LuaMultiReturn<[refundableDecorInfos: readonly WowApi.RefundableDecorInfo[], minTimeRemainingSeconds: number]>;
  function GetSectionIDsForCategory(this: void, categoryID: number): readonly number[];
  function GetSpellVisualInfoForMount(this: void, spellVisualID: number): WowApi.CatalogShopSpellVisualInfo;
  function GetVCProductInfos(this: void): readonly WowApi.CatalogShopVCProductInfo[];
  function GetVirtualCurrencyBalance(this: void, currencyCode: string): string | undefined;
  function HasNewProducts(this: void): boolean;
  function IsProductIncludedInAnyBundle(this: void, productID: number): boolean;
  function IsShop2Enabled(this: void): boolean | undefined;
  function OnLegalDisclaimerClicked(this: void, catalogShopProductID: number): void;
  function OnLegalPersonalizedOptOutClicked(this: void): void;
  function OpenCatalogShopInteractionFromHouse(this: void): string;
  function OpenCatalogShopInteractionFromShop(this: void): string;
  function ProductDisplayedTelemetry(this: void, categoryId: number, sectionId: number, catalogShopProductID: number): void;
  function ProductSelectedTelemetry(this: void, categoryId: number, sectionId: number, catalogShopProductID: number, wasCodeSelection: boolean): void;
  function PurchaseProduct(this: void, productID: number): boolean;
  function RefreshRefundableDecors(this: void): void;
  function RefreshVirtualCurrencyBalance(this: void, currencyCode: string): void;
  function ShouldShowHousingWarning(this: void): boolean;
  function StartHousingVCPurchaseConfirmation(this: void, productID: number): void;

}

declare namespace C_ChallengeMode {
  function CanUseKeystoneInCurrentMap(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function ClearKeystone(this: void): void;
  function CloseKeystoneFrame(this: void): void;
  function GetActiveChallengeMapID(this: void): number | undefined;
  function GetActiveKeystoneInfo(this: void): LuaMultiReturn<[activeKeystoneLevel: number, activeAffixIDs: readonly number[], wasActiveKeystoneCharged: boolean]>;
  function GetAffixInfo(this: void, affixID: number): LuaMultiReturn<[name: string, description: string, filedataid: number]> | undefined;
  function GetChallengeCompletionInfo(this: void): WowApi.ChallengeCompletionInfo;
  function GetDeathCount(this: void): LuaMultiReturn<[numDeaths: number, timeLost: number]> | undefined;
  function GetDungeonScoreRarityColor(this: void, dungeonScore: number): WowApi.colorRGB;
  function GetGuildLeaders(this: void): readonly WowApi.ChallengeModeGuildTopAttempt[] | undefined;
  function GetKeystoneLevelRarityColor(this: void, level: number): WowApi.colorRGB;
  function GetLeaverPenaltyWarningTimeLeft(this: void): number;
  function GetMapScoreInfo(this: void): readonly WowApi.MythicPlusRatingLinkInfo[] | undefined;
  function GetMapTable(this: void): readonly number[];
  function GetMapUIInfo(this: void, mapChallengeModeID: number): LuaMultiReturn<[name: string, id: number, timeLimit: number, texture: number | undefined, backgroundTexture: number, mapID: number]> | undefined;
  function GetOverallDungeonScore(this: void): number;
  function GetPowerLevelDamageHealthMod(this: void, powerLevel: number): LuaMultiReturn<[damageMod: number, healthMod: number]> | undefined;
  function GetSlottedKeystoneInfo(this: void): LuaMultiReturn<[mapChallengeModeID: number, affixIDs: readonly number[], keystoneLevel: number]> | undefined;
  function GetSpecificDungeonOverallScoreRarityColor(this: void, specificDungeonOverallScore: number): WowApi.colorRGB;
  function GetSpecificDungeonScoreRarityColor(this: void, specificDungeonScore: number): WowApi.colorRGB;
  function GetStartTime(this: void): number;
  function HasSlottedKeystone(this: void): boolean;
  function IsChallengeModeActive(this: void): boolean;
  function IsChallengeModeResettable(this: void): boolean;
  function RemoveKeystone(this: void): boolean;
  function RequestLeaders(this: void, mapChallengeModeID: number): void;
  function Reset(this: void): void;
  function SlotKeystone(this: void): void;
  function StartChallengeMode(this: void): boolean;

}

declare namespace C_ChatBubbles {
  function GetAllChatBubbles(this: void, includeForbidden?: boolean): readonly WowApi.ChatBubbleFrame[];

}

declare namespace C_ChatInfo {
  function AreOutgoingAddonChatMessagesRestricted(this: void): boolean;
  function CancelEmote(this: void): void;
  function CanPlayerSpeakLanguage(this: void, languageId: number): boolean;
  function DropCautionaryChatMessage(this: void, confirmNumber: number): void;
  function GetChannelInfoFromIdentifier(this: void, channelIdentifier: string): WowApi.ChatChannelInfo | undefined | undefined;
  function GetChannelRosterInfo(this: void, channelIndex: number, rosterIndex: number): LuaMultiReturn<[name: string, owner: boolean, moderator: boolean, guid: string]> | undefined;
  function GetChannelRuleset(this: void, channelIndex: number): WowApi.ChatChannelRuleset;
  function GetChannelRulesetForChannelID(this: void, channelID: number): WowApi.ChatChannelRuleset;
  function GetChannelShortcut(this: void, channelIndex: number): string;
  function GetChannelShortcutForChannelID(this: void, channelID: number): string;
  function GetChatLineSenderGUID(this: void, chatLine: number): string;
  function GetChatLineSenderName(this: void, chatLine: number): string;
  function GetChatLineText(this: void, chatLine: number): string;
  function GetChatTypeName(this: void, typeID: number): string | undefined;
  function GetClubStreamIDs(this: void, clubID: string): readonly string[];
  function GetColorForChatType(this: void, chatType: string): WowApi.colorRGB | undefined;
  function GetGeneralChannelID(this: void): number;
  function GetGeneralChannelLocalID(this: void): number | undefined;
  function GetMentorChannelID(this: void): number;
  function GetNumActiveChannels(this: void): number;
  function GetNumReservedChatWindows(this: void): number;
  function GetRegisteredAddonMessagePrefixes(this: void): readonly string[];
  function InChatMessagingLockdown(this: void): boolean;
  function IsAddonMessagePrefixRegistered(this: void, prefix: string): boolean;
  function IsChannelRegional(this: void, channelIndex: number): boolean;
  function IsChannelRegionalForChannelID(this: void, channelID: number): boolean;
  function IsChatLineCensored(this: void, chatLine: number): boolean;
  function IsLoggingChat(this: void): boolean;
  function IsLoggingCombat(this: void): LuaMultiReturn<[enabled: boolean, advanced: boolean]>;
  function IsPartyChannelType(this: void, channelType: WowApi.ChatChannelType): boolean;
  function IsRegionalServiceAvailable(this: void): boolean;
  function IsTimerunningPlayer(this: void, playerGUID: string): boolean;
  function IsValidChatLine(this: void, chatLine?: number | undefined): boolean;
  function IsValidCombatFilterName(this: void, name: string): boolean;
  function PerformEmote(this: void, emoteName: string, targetName?: string | undefined, suppressMoveError?: boolean): boolean;
  function RegisterAddonMessagePrefix(this: void, prefix: string): WowApi.RegisterAddonMessagePrefixResult;
  function ReplaceIconAndGroupExpressions(this: void, input: string, noIconReplacement?: boolean | undefined, noGroupReplacement?: boolean | undefined): string;
  function RequestCanLocalWhisperTarget(this: void, whisperTarget: string): void;
  function ResetDefaultZoneChannels(this: void): void;
  function SendAddonMessage(this: void, prefix: string, message: string, chatType?: string | undefined, target?: string | undefined): WowApi.SendAddonMessageResult;
  function SendAddonMessageLogged(this: void, prefix: string, message: string, chatType?: string | undefined, target?: string | undefined): WowApi.SendAddonMessageResult | undefined;
  function SendCautionaryChatMessage(this: void, confirmNumber: number): void;
  function SendChatMessage(this: void, message: string, chatType?: WowApi.SendChatMessageType | undefined, languageID?: number | undefined, target?: string | undefined): void;
  function SwapChatChannelsByChannelIndex(this: void, firstChannelIndex: number, secondChannelIndex: number): void;
  function UncensorChatLine(this: void, chatLine: number): void;

}

declare namespace C_ChromieTime {
  function CloseUI(this: void): void;
  function GetChromieTimeExpansionOption(this: void, expansionRecID: number): WowApi.ChromieTimeExpansionInfo | undefined;
  function GetChromieTimeExpansionOptions(this: void): readonly WowApi.ChromieTimeExpansionInfo[];
  function SelectChromieTimeOption(this: void, chromieTimeExpansionInfoId: number): void;

}

declare namespace C_CinematicList {
  function GetUICinematicList(this: void): readonly WowApi.UICinematic[];

}

declare namespace C_ClassColor {
  function GetClassColor(this: void, className: string, tintColor?: WowApi.colorRGB | undefined): WowApi.colorRGB | undefined;

}

declare namespace C_ClassTalents {
  function CanChangeTalents(this: void): LuaMultiReturn<[canChange: boolean, canAdd: boolean, changeError: string | undefined]>;
  function CanCreateNewConfig(this: void): boolean;
  function CanEditTalents(this: void): LuaMultiReturn<[canEdit: boolean, changeError: string]>;
  function CommitConfig(this: void, savedConfigID?: number | undefined): boolean;
  function DeleteConfig(this: void, configID: number): boolean;
  function GetActiveConfigID(this: void): number | undefined;
  function GetActiveHeroTalentSpec(this: void): number | undefined;
  function GetConfigIDsBySpecID(this: void, specID?: number | undefined): readonly number[];
  function GetHasStarterBuild(this: void): boolean;
  function GetHeroTalentSpecsForClassSpec(this: void, configID?: number | undefined, classSpecID?: number | undefined): LuaMultiReturn<[subTreeIDs: readonly number[] | undefined, requiredPlayerLevel: number | undefined]> | undefined;
  function GetLastSelectedSavedConfigID(this: void, specID: number): number | undefined;
  function GetNextStarterBuildPurchase(this: void): LuaMultiReturn<[nodeID: number | undefined, entryID: number | undefined]>;
  function GetStarterBuildActive(this: void): boolean;
  function GetTraitTreeForSpec(this: void, specID: number): number | undefined;
  function HasUnspentHeroTalentPoints(this: void): LuaMultiReturn<[hasUnspentPoints: boolean, numHeroPoints: number]>;
  function HasUnspentTalentPoints(this: void): LuaMultiReturn<[hasUnspentPoints: boolean, numClassPoints: number, numSpecPoints: number]>;
  function ImportLoadout(this: void, configID: number, entries: readonly WowApi.ImportLoadoutEntryInfo[], name: string, importString?: string | undefined): LuaMultiReturn<[success: boolean, importError: string]>;
  function InitializeViewLoadout(this: void, specID: number, level: number): void;
  function IsConfigPopulated(this: void, configID: number): boolean;
  function LoadConfig(this: void, configID: number, autoApply: boolean): LuaMultiReturn<[result: WowApi.LoadConfigResult, changeError: string | undefined, newLearnedNodeIDs: readonly number[]]>;
  function RenameConfig(this: void, configID: number, name: string): boolean;
  function RequestNewConfig(this: void, name: string): boolean;
  function SaveConfig(this: void, configID: number): boolean;
  function SetStarterBuildActive(this: void, active: boolean): WowApi.LoadConfigResult;
  function SetUsesSharedActionBars(this: void, configID: number, usesShared: boolean): void;
  function SwitchToLoadoutByIndex(this: void, loadoutIndex: number): void;
  function SwitchToLoadoutByName(this: void, loadoutName: string): void;
  function SwitchToSpecializationByIndex(this: void, specIndex: number): void;
  function SwitchToSpecializationByName(this: void, specName: string): void;
  function UpdateLastSelectedSavedConfigID(this: void, specID: number, configID?: number | undefined): void;
  function ViewLoadout(this: void, entries: readonly WowApi.ImportLoadoutEntryInfo[], importString?: string | undefined): boolean;

}

declare namespace C_ClassTrial {

}

declare namespace C_ClickBindings {
  function CanSpellBeClickBound(this: void, spellID: number | string): boolean;
  function ExecuteBinding(this: void, targetToken: string, button: string, modifiers: number): void;
  function GetBindingType(this: void, button: string, modifiers: number): WowApi.ClickBindingType;
  function GetEffectiveInteractionButton(this: void, button: string, modifiers: number): string;
  function GetProfileInfo(this: void): readonly WowApi.ClickBindingInfo[];
  function GetTutorialShown(this: void): boolean;
  function ResetCurrentProfile(this: void): void;
  function SetProfileByInfo(this: void, infoVec: readonly WowApi.ClickBindingInfo[]): void;
  function SetTutorialShown(this: void): void;

}

declare namespace C_ClientScene {
  function IsSceneTypeActive(this: void, desiredSceneType?: WowApi.ClientSceneType | undefined): boolean;

}

declare namespace C_Club {
  function AcceptInvitation(this: void, clubId: string): void;
  function AddClubStreamChatChannel(this: void, clubId: string, streamId: string): void;
  function AdvanceStreamViewMarker(this: void, clubId: string, streamId: string): void;
  function AreMembersReady(this: void, clubId: string): boolean;
  function AssignMemberRole(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId, roleId: WowApi.ClubRoleIdentifier): void;
  function CanResolvePlayerLocationFromClubMessageData(this: void, clubId: string, streamId: string, epoch: number, position: number): boolean;
  function ClearAutoAdvanceStreamViewMarker(this: void): void;
  function ClearClubPresenceSubscription(this: void): void;
  function CompareBattleNetDisplayName(this: void, clubId: string, lhsMemberId: number, rhsMemberId: number): number;
  function CreateClub(this: void, name: string, shortName: string | undefined, description: string, clubType: WowApi.ClubType, avatarId: number, isCrossFaction?: boolean | undefined): void;
  function CreateStream(this: void, clubId: string, name: string, subject: string, leadersAndModeratorsOnly: boolean): void;
  function CreateTicket(this: void, clubId: string, allowedRedeemCount?: number | undefined, duration?: number | undefined, defaultStreamId?: string | undefined, isCrossFaction?: boolean | undefined): void;
  function DeclineInvitation(this: void, clubId: string): void;
  function DestroyClub(this: void, clubId: string): void;
  function DestroyMessage(this: void, clubId: string, streamId: string, messageId: WowApi.ClubMessageIdentifier): void;
  function DestroyStream(this: void, clubId: string, streamId: string): void;
  function DestroyTicket(this: void, clubId: string, ticketId: string): void;
  function DoesAnyCommunityHaveUnreadMessages(this: void): boolean;
  function DoesCommunityHaveMembersOfTheOppositeFaction(this: void, clubId: string): boolean;
  function EditClub(this: void, clubId: string, name?: string | undefined, shortName?: string | undefined, description?: string | undefined, avatarId?: number | undefined, broadcast?: string | undefined, crossFaction?: boolean | undefined): void;
  function EditMessage(this: void, clubId: string, streamId: string, messageId: WowApi.ClubMessageIdentifier, message: string): void;
  function EditStream(this: void, clubId: string, streamId: string, name?: string | undefined, subject?: string | undefined, leadersAndModeratorsOnly?: boolean | undefined): void;
  function Flush(this: void): void;
  function FocusCommunityStreams(this: void): void;
  function FocusMembers(this: void, clubId: string): void;
  function FocusStream(this: void, clubId: string, streamId: string): boolean;
  function GetAssignableRoles(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId): readonly WowApi.ClubRoleIdentifier[];
  function GetAvatarIdList(this: void, clubType: WowApi.ClubType): readonly number[] | undefined;
  function GetClubCapacity(this: void): number;
  function GetClubInfo(this: void, clubId: string): WowApi.ClubInfo | undefined;
  function GetClubLimits(this: void, clubType: WowApi.ClubType): WowApi.ClubLimits;
  function GetClubMembers(this: void, clubId: string, streamId?: string | undefined): readonly WowApi.ClubMemberOpaqueId[];
  function GetClubPrivileges(this: void, clubId: string): WowApi.ClubPrivilegeInfo;
  function GetClubStreamNotificationSettings(this: void, clubId: string): readonly WowApi.ClubStreamNotificationSetting[];
  function GetCommunityNameResultText(this: void, result: WowApi.ValidateNameResult): string | undefined;
  function GetGuildClubId(this: void): string | undefined;
  function GetInfoFromLastCommunityChatLine(this: void): LuaMultiReturn<[messageInfo: WowApi.ClubMessageInfo, clubId: string, streamId: string, clubType: WowApi.ClubType]> | undefined;
  function GetInvitationCandidates(this: void, filter: string | undefined, maxResults: number | undefined, cursorPosition: number | undefined, allowFullMatch: boolean | undefined, clubId: string): readonly WowApi.ClubInvitationCandidateInfo[];
  function GetInvitationInfo(this: void, clubId: string): WowApi.ClubSelfInvitationInfo | undefined;
  function GetInvitationsForClub(this: void, clubId: string): readonly WowApi.ClubInvitationInfo[];
  function GetInvitationsForSelf(this: void): readonly WowApi.ClubSelfInvitationInfo[];
  function GetLastTicketResponse(this: void, ticket: string): LuaMultiReturn<[error: WowApi.ClubErrorType, info: WowApi.ClubInfo | undefined, showError: boolean]> | undefined;
  function GetMemberInfo(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId): WowApi.ClubMemberInfo | undefined;
  function GetMemberInfoForSelf(this: void, clubId: string): WowApi.ClubMemberInfo | undefined;
  function GetMessageInfo(this: void, clubId: string, streamId: string, messageId: WowApi.ClubMessageIdentifier): WowApi.ClubMessageInfo | undefined;
  function GetMessageRanges(this: void, clubId: string, streamId: string): readonly WowApi.ClubMessageRange[];
  function GetMessagesBefore(this: void, clubId: string, streamId: string, newest: WowApi.ClubMessageIdentifier, count: number): readonly WowApi.ClubMessageInfo[];
  function GetMessagesInRange(this: void, clubId: string, streamId: string, oldest: WowApi.ClubMessageIdentifier, newest: WowApi.ClubMessageIdentifier): readonly WowApi.ClubMessageInfo[];
  function GetStreamInfo(this: void, clubId: string, streamId: string): WowApi.ClubStreamInfo | undefined;
  function GetStreams(this: void, clubId: string): readonly WowApi.ClubStreamInfo[];
  function GetStreamViewMarker(this: void, clubId: string, streamId: string): number | undefined;
  function GetSubscribedClubs(this: void): readonly WowApi.ClubInfo[];
  function GetTickets(this: void, clubId: string): readonly WowApi.ClubTicketInfo[];
  function IsAccountMuted(this: void, clubId: string): boolean;
  function IsBeginningOfStream(this: void, clubId: string, streamId: string, messageId: WowApi.ClubMessageIdentifier): boolean;
  function IsEnabled(this: void): boolean;
  function IsRestricted(this: void): WowApi.ClubRestrictionReason;
  function IsSubscribedToStream(this: void, clubId: string, streamId: string): boolean;
  function KickMember(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId): void;
  function LeaveClub(this: void, clubId: string): void;
  function RedeemTicket(this: void, ticketId: string): void;
  function RequestInvitationsForClub(this: void, clubId: string): void;
  function RequestMoreMessagesBefore(this: void, clubId: string, streamId: string, messageId?: WowApi.ClubMessageIdentifier | undefined, count?: number | undefined): boolean;
  function RequestTicket(this: void, ticketId: string): void;
  function RequestTickets(this: void, clubId: string): void;
  function RevokeInvitation(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId): void;
  function SendBattleTagFriendRequest(this: void, guildClubId: string, memberId: WowApi.ClubMemberOpaqueId): void;
  function SendCharacterInvitation(this: void, clubId: string, character: string): void;
  function SendInvitation(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId): void;
  function SendMessage(this: void, clubId: string, streamId: string, message: string): void;
  function SendTitleFriendRequest(this: void, guildClubId: string, memberId: WowApi.ClubMemberOpaqueId): void;
  function SetAutoAdvanceStreamViewMarker(this: void, clubId: string, streamId: string): void;
  function SetAvatarTexture(this: void, texture: WowApi.SimpleTexture, avatarId: number, clubType: WowApi.ClubType): void;
  function SetClubMemberNote(this: void, clubId: string, memberId: WowApi.ClubMemberOpaqueId, note: string): void;
  function SetClubPresenceSubscription(this: void, clubId: string): void;
  function SetClubStreamNotificationSettings(this: void, clubId: string, settings: readonly WowApi.ClubStreamNotificationSetting[]): void;
  function SetCommunityID(this: void, communityID: number): void;
  function SetFavorite(this: void, clubId: string, isFavorite: boolean): void;
  function SetSocialQueueingEnabled(this: void, clubId: string, enabled: boolean): void;
  function ShouldAllowClubType(this: void, clubType: WowApi.ClubType): boolean;
  function UnfocusAllStreams(this: void, unsubscribe: boolean): void;
  function UnfocusMembers(this: void, clubId: string): void;
  function UnfocusStream(this: void, clubId: string, streamId: string): void;
  function ValidateText(this: void, clubType: WowApi.ClubType, text: string, clubFieldType: WowApi.ClubFieldType): WowApi.ValidateNameResult;

}

declare namespace C_ClubFinder {
  function ApplicantAcceptClubInvite(this: void, clubFinderGUID: string): void;
  function ApplicantDeclineClubInvite(this: void, clubFinderGUID: string): void;
  function CancelMembershipRequest(this: void, clubFinderGUID: string): void;
  function CheckAllPlayerApplicantSettings(this: void): void;
  function ClearAllFinderCache(this: void): void;
  function ClearClubApplicantsCache(this: void): void;
  function ClearClubFinderPostingsCache(this: void): void;
  function DoesPlayerBelongToClubFromClubGUID(this: void, clubFinderGUID: string): boolean;
  function GetClubFinderDisableReason(this: void): WowApi.ClubFinderDisableReason | undefined;
  function GetClubRecruitmentSettings(this: void): WowApi.ClubSettingsInfo;
  function GetClubTypeFromFinderGUID(this: void, clubFinderGUID: string): WowApi.ClubFinderRequestType | undefined;
  function GetFocusIndexFromFlag(this: void, flags: number): number;
  function GetPlayerApplicantLocaleFlags(this: void): number;
  function GetPlayerApplicantSettings(this: void): WowApi.ClubSettingsInfo;
  function GetPlayerClubApplicationStatus(this: void, clubFinderGUID: string): WowApi.PlayerClubRequestStatus;
  function GetPlayerSettingsFocusFlagsSelectedCount(this: void): number;
  function GetPostingIDFromClubFinderGUID(this: void, clubFinderGUID: string): number | undefined;
  function GetRecruitingClubInfoFromClubID(this: void, clubId: string): WowApi.RecruitingClubInfo | undefined;
  function GetRecruitingClubInfoFromFinderGUID(this: void, clubFinderGUID: string): WowApi.RecruitingClubInfo;
  function GetStatusOfPostingFromClubId(this: void, postingID: string): readonly WowApi.ClubFinderClubPostingStatusFlags[];
  function GetTotalMatchingCommunityListSize(this: void): number;
  function GetTotalMatchingGuildListSize(this: void): number;
  function HasAlreadyAppliedToLinkedPosting(this: void, clubFinderGUID: string): boolean;
  function HasPostingBeenDelisted(this: void, postingID: string): boolean;
  function IsCommunityFinderEnabled(this: void): boolean;
  function IsEnabled(this: void): boolean;
  function IsListingEnabledFromFlags(this: void, flags: number): boolean;
  function IsPostingBanned(this: void, postingID: string): boolean;
  function IsValidSearchString(this: void, name: string): boolean;
  function LookupClubPostingFromClubFinderGUID(this: void, clubFinderGUID: string, isLinkedPosting: boolean): void;
  function PlayerGetClubInvitationList(this: void): readonly WowApi.RecruitingClubInfo[] | undefined;
  function PlayerRequestPendingClubsList(this: void, type: WowApi.ClubFinderRequestType): void;
  function PlayerReturnPendingCommunitiesList(this: void): readonly WowApi.RecruitingClubInfo[];
  function PlayerReturnPendingGuildsList(this: void): readonly WowApi.RecruitingClubInfo[];
  function PostClub(this: void, clubId: string, itemLevelRequirement: number, name: string, description: string, avatarId: number, specs: readonly number[], type: WowApi.ClubFinderRequestType, crossFaction?: boolean): boolean;
  function RequestApplicantList(this: void, type: WowApi.ClubFinderRequestType): void;
  function RequestClubsList(this: void, guildListRequested: boolean, searchString: string, specIDs: readonly number[]): void;
  function RequestMembershipToClub(this: void, clubFinderGUID: string, comment: string, specIDs: readonly number[]): void;
  function RequestNextCommunityPage(this: void, startingIndex: number, pageSize: number): void;
  function RequestNextGuildPage(this: void, startingIndex: number, pageSize: number): void;
  function RequestPostingInformationFromClubId(this: void, clubId: string): boolean;
  function RequestSubscribedClubPostingIDs(this: void): void;
  function ResetClubPostingMapCache(this: void): void;
  function RespondToApplicant(this: void, clubFinderGUID: string, playerGUID: string, shouldAccept: boolean, requestType: WowApi.ClubFinderRequestType, playerName: string, forceAccept: boolean, reported?: boolean | undefined): void;
  function ReturnClubApplicantList(this: void, clubId: string): readonly WowApi.ClubFinderApplicantInfo[];
  function ReturnMatchingCommunityList(this: void): readonly WowApi.RecruitingClubInfo[];
  function ReturnMatchingGuildList(this: void): readonly WowApi.RecruitingClubInfo[];
  function ReturnPendingClubApplicantList(this: void, clubId: string): readonly WowApi.ClubFinderApplicantInfo[];
  function SendChatWhisper(this: void, clubFinderGUID: string, playerGUID: string, applicantType: WowApi.ClubFinderRequestType, name: string): void;
  function SetAllRecruitmentSettings(this: void, value: number): void;
  function SetPlayerApplicantLocaleFlags(this: void, localeFlags: number): void;
  function SetPlayerApplicantSettings(this: void, index: number, checked: boolean): void;
  function SetRecruitmentLocale(this: void, locale: number): void;
  function SetRecruitmentSettings(this: void, index: number, checked: boolean): void;
  function ShouldShowClubFinder(this: void): boolean;

}

declare namespace C_ColorOverrides {
  function ClearColorOverrides(this: void): void;
  function GetColorForQuality(this: void, quality: WowApi.ItemQuality): WowApi.colorRGBA;
  function GetColorOverrideInfo(this: void, overrideType: WowApi.ColorOverride): WowApi.ColorOverrideInfo | undefined;
  function GetDefaultColorForQuality(this: void, quality: WowApi.ItemQuality): WowApi.colorRGBA;
  function RemoveColorOverride(this: void, overrideType: WowApi.ColorOverride): void;
  function SetColorOverride(this: void, overrideType: WowApi.ColorOverride, color: WowApi.colorRGBA): void;

}

declare namespace C_ColorUtil {
  function ConvertHSLToHSV(this: void, hslH: number, hslS: number, hslL: number): LuaMultiReturn<[hsvH: number, hsvS: number, hsvV: number]>;
  function ConvertHSVToHSL(this: void, hsvH: number, hsvS: number, hsvV: number): LuaMultiReturn<[hslH: number, hslS: number, hslL: number]>;
  function ConvertHSVToRGB(this: void, hsvH: number, hsvS: number, hsvV: number): LuaMultiReturn<[rgbR: number, rgbG: number, rgbB: number]>;
  function ConvertRGBToHSV(this: void, rgbR: number, rgbG: number, rgbB: number): LuaMultiReturn<[hsvH: number, hsvS: number, hsvV: number]>;
  function GenerateTextColorCode(this: void, color: WowApi.colorRGB): string;
  function WrapTextInColor(this: void, text: string, color: WowApi.colorRGB): string;
  function WrapTextInColorCode(this: void, text: string, textColorCode: string): string;

}

declare namespace C_CombatAudioAlert {
  function AddToKnownTargetingList(this: void, unit: string): boolean;
  function GetCategoryVoice(this: void, category: WowApi.CombatAudioAlertCategory): number;
  function GetCategoryVolume(this: void, category: WowApi.CombatAudioAlertCategory): number;
  function GetFormatSetting(this: void, unit: WowApi.CombatAudioAlertUnit, alertType: WowApi.CombatAudioAlertType): number;
  function GetSpeakerSpeed(this: void): number;
  function GetSpecSetting(this: void, setting: WowApi.CombatAudioAlertSpecSetting): number;
  function GetThrottle(this: void, throttleType: WowApi.CombatAudioAlertThrottle): number;
  function IsEnabled(this: void): boolean;
  function RemoveFromKnownTargetingList(this: void, unit: string): boolean;
  function SetCategoryVoice(this: void, category: WowApi.CombatAudioAlertCategory, newVal: number): boolean;
  function SetCategoryVolume(this: void, category: WowApi.CombatAudioAlertCategory, newVal: number): boolean;
  function SetFormatSetting(this: void, unit: WowApi.CombatAudioAlertUnit, alertType: WowApi.CombatAudioAlertType, newVal: number): boolean;
  function SetSpeakerSpeed(this: void, newVal: number): boolean;
  function SetSpecSetting(this: void, setting: WowApi.CombatAudioAlertSpecSetting, newVal: number): boolean;
  function SetThrottle(this: void, throttleType: WowApi.CombatAudioAlertThrottle, newVal: number): boolean;
  function SpeakText(this: void, text: string, category: WowApi.CombatAudioAlertCategory, allowOverlap?: boolean): number | undefined;

}

declare namespace C_CombatLog {
  function ApplyFilterSettings(this: void, filterSettings: unknown): void;
  function AreFilteredEventsEnabled(this: void): boolean;
  function ClearEntries(this: void): void;
  function DoesObjectMatchFilter(this: void, mask: WowApi.CombatLogObject, flags: WowApi.CombatLogObject): boolean;
  function GetEntryRetentionTime(this: void): number;
  function GetMessageLimit(this: void): number;
  function IsCombatLogRestricted(this: void): boolean;
  function RefilterEntries(this: void): void;
  function SetEntryRetentionTime(this: void, retentionTime: number): void;
  function SetFilteredEventsEnabled(this: void, enabled: boolean): void;
  function SetMessageLimit(this: void, messageLimit: number): void;

}

declare namespace C_CombatLogInternal {
  function GetCurrentEventInfo(this: void): void;

}

declare namespace C_CombatLogSecure {
  function AddEventFilter(this: void): void;
  function ClearEventFilters(this: void): void;
  function CreateCombatLogMessage(this: void, message: string, colorR: number, colorG: number, colorB: number, order: WowApi.CombatLogMessageOrder): void;
  function GetCurrentEntryInfo(this: void): void;
  function GetCurrentEventInfo(this: void): void;
  function GetEntryCount(this: void, ignoreFilter?: boolean): number;
  function SeekToNewestEntry(this: void, ignoreFilter?: boolean): boolean;
  function SeekToPreviousEntry(this: void, ignoreFilter?: boolean): boolean;
  function ShouldShowCurrentEntry(this: void): boolean;

}

declare namespace C_CombatText {
  function GetActiveUnit(this: void): string | undefined;
  function GetCurrentEventInfo(this: void): void;
  function SetActiveUnit(this: void, unitToken: string): void;

}

declare namespace C_Commentator {
  function AddPlayerOverrideName(this: void, playerName: string, overrideName: string): void;
  function AddTrackedDefensiveAuras(this: void, spellIDs: readonly number[]): void;
  function AddTrackedOffensiveAuras(this: void, spellIDs: readonly number[]): void;
  function AreTeamsSwapped(this: void): boolean;
  function AssignPlayersToTeam(this: void, playerName: readonly string[], teamName: string): void;
  function AssignPlayersToTeamInCurrentInstance(this: void, teamIndex: number, teamName: string): void;
  function AssignPlayerToTeam(this: void, playerName: string, teamName: string): void;
  function CanUseCommentatorCheats(this: void): boolean;
  function ClearCameraTarget(this: void): void;
  function ClearFollowTarget(this: void): void;
  function ClearLookAtTarget(this: void, lookAtIndex?: number | undefined): void;
  function EnterInstance(this: void): void;
  function ExitInstance(this: void): void;
  function FindSpectatedUnit(this: void, unitToken: string): LuaMultiReturn<[playerIndex: number, teamIndex: number, isPet: boolean]> | undefined;
  function FindTeamNameInCurrentInstance(this: void, teamIndex: number): string | undefined;
  function FindTeamNameInDirectory(this: void, playerNames: readonly string[]): string | undefined;
  function FlushCommentatorHistory(this: void): void;
  function FollowPlayer(this: void, factionIndex: number, playerIndex: number, forceInstantTransition?: boolean | undefined): void;
  function FollowUnit(this: void, token: string): void;
  function ForceFollowTransition(this: void): void;
  function GetAdditionalCameraWeight(this: void): LuaMultiReturn<[teamIndex: number, playerIndex: number]>;
  function GetAdditionalCameraWeightByToken(this: void, unitToken: string): number | undefined;
  function GetAllPlayerOverrideNames(this: void): readonly WowApi.NameOverrideEntry[];
  function GetCamera(this: void): LuaMultiReturn<[xPos: number, yPos: number, zPos: number, yaw: number, pitch: number, roll: number, fov: number]> | undefined;
  function GetCameraCollision(this: void): boolean;
  function GetCameraPosition(this: void): LuaMultiReturn<[xPos: number, yPos: number, zPos: number]> | undefined;
  function GetCombatEventInfo(this: void): void;
  function GetCommentatorHistory(this: void): WowApi.CommentatorHistory;
  function GetCommentatorMatchDataState(this: void): WowApi.CommentatorMatchDataState;
  function GetCurrentMapID(this: void): number | undefined;
  function GetDampeningPercent(this: void): number;
  function GetDistanceBeforeForcedHorizontalConvergence(this: void): number;
  function GetDurationToForceHorizontalConvergence(this: void): number;
  function GetExcludeDistance(this: void): number;
  function GetHardlockWeight(this: void): number;
  function GetHorizontalAngleThresholdToSmooth(this: void): number;
  function GetIndirectSpellID(this: void, trackedSpellID: number): number;
  function GetInstanceInfo(this: void, mapIndex: number, instanceIndex: number): LuaMultiReturn<[mapID: number, mapName: string | undefined, status: number, instanceIDLow: number, instanceIDHigh: number]> | undefined;
  function GetLookAtLerpAmount(this: void): number;
  function GetMapInfo(this: void, mapIndex: number): LuaMultiReturn<[teamSize: number, minLevel: number, maxLevel: number, numInstances: number]> | undefined;
  function GetMatchDuration(this: void): number;
  function GetMaxNumPlayersPerTeam(this: void): number;
  function GetMaxNumTeams(this: void): number;
  function GetMode(this: void): number;
  function GetMsToHoldForHorizontalMovement(this: void): number;
  function GetMsToHoldForVerticalMovement(this: void): number;
  function GetMsToSmoothHorizontalChange(this: void): number;
  function GetMsToSmoothVerticalChange(this: void): number;
  function GetNumMaps(this: void): number;
  function GetNumPlayers(this: void, factionIndex: number): number | undefined;
  function GetOrCreateSeries(this: void, teamName1: string, teamName2: string): WowApi.CommentatorSeries;
  function GetPlayerAuraInfo(this: void, teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerAuraInfoByUnit(this: void, token: string, spellID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerCooldownInfo(this: void, teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerCooldownInfoByUnit(this: void, unitToken: string, spellID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerCrowdControlInfo(this: void, teamIndex: number, playerIndex: number): LuaMultiReturn<[spellID: number, expiration: number, duration: number]> | undefined;
  function GetPlayerCrowdControlInfoByUnit(this: void, token: string): LuaMultiReturn<[spellID: number, expiration: number, duration: number]> | undefined;
  function GetPlayerData(this: void, teamIndex: number, playerIndex: number): WowApi.CommentatorPlayerData | undefined;
  function GetPlayerFlagInfo(this: void, teamIndex: number, playerIndex: number): boolean;
  function GetPlayerFlagInfoByUnit(this: void, unitToken: string): boolean;
  function GetPlayerItemCooldownInfo(this: void, teamIndex: number, playerIndex: number, itemID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerItemCooldownInfoByUnit(this: void, unitToken: string, itemID: number): LuaMultiReturn<[startTime: number, duration: number, enable: boolean]> | undefined;
  function GetPlayerOverrideName(this: void, originalName: string): string | undefined;
  function GetPlayerSpellCharges(this: void, teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[charges: number, maxCharges: number, startTime: number, duration: number]> | undefined;
  function GetPlayerSpellChargesByUnit(this: void, unitToken: string, spellID: number): LuaMultiReturn<[charges: number, maxCharges: number, startTime: number, duration: number]> | undefined;
  function GetPositionLerpAmount(this: void): number;
  function GetSmoothFollowTransitioning(this: void): boolean;
  function GetSoftlockWeight(this: void): number;
  function GetSpeedFactor(this: void): number;
  function GetStartLocation(this: void, mapID: number): WowApi.vector3 | undefined;
  function GetTeamColor(this: void, teamIndex: number): WowApi.colorRGB;
  function GetTeamColorByUnit(this: void, unitToken: string): WowApi.colorRGB;
  function GetTimeLeftInMatch(this: void): number | undefined;
  function GetTrackedSpellID(this: void, indirectSpellID: number): number;
  function GetTrackedSpells(this: void, teamIndex: number, playerIndex: number, category: WowApi.TrackedSpellCategory): LuaMultiReturn<[spells: readonly number[] | undefined, result: WowApi.TrackedSpellsResult]>;
  function GetTrackedSpellsByUnit(this: void, unitToken: string, category: WowApi.TrackedSpellCategory): LuaMultiReturn<[spells: readonly number[] | undefined, result: WowApi.TrackedSpellsResult]>;
  function GetUnitData(this: void, unitToken: string): WowApi.CommentatorUnitData;
  function GetWargameInfo(this: void, listID: number): LuaMultiReturn<[name: string, minPlayers: number, maxPlayers: number, isArena: boolean]> | undefined;
  function HasTrackedAuras(this: void, token: string): LuaMultiReturn<[hasOffensiveAura: boolean, hasDefensiveAura: boolean]>;
  function IsSmartCameraLocked(this: void): boolean;
  function IsSpectating(this: void): boolean;
  function IsTrackedDefensiveAura(this: void, spellID: number): boolean;
  function IsTrackedOffensiveAura(this: void, spellID: number): boolean;
  function IsTrackedSpell(this: void, teamIndex: number, playerIndex: number, spellID: number, category: WowApi.TrackedSpellCategory): boolean;
  function IsTrackedSpellByUnit(this: void, unitToken: string, spellID: number, category: WowApi.TrackedSpellCategory): boolean;
  function IsUsingSmartCamera(this: void): boolean;
  function LookAtPlayer(this: void, factionIndex: number, playerIndex: number, lookAtIndex?: number | undefined): void;
  function RemoveAllOverrideNames(this: void): void;
  function RemovePlayerOverrideName(this: void, originalPlayerName: string): void;
  function RequestPlayerCooldownInfo(this: void, teamIndex: number, playerIndex: number): void;
  function ResetFoVTarget(this: void): void;
  function ResetSeriesScores(this: void, teamName1: string, teamName2: string): void;
  function ResetSettings(this: void): void;
  function ResetTrackedAuras(this: void): void;
  function SendAddonMessage(this: void, prefix: string, message: string, chatType?: string | undefined, target?: string | undefined): WowApi.SendAddonMessageResult;
  function SendAddonMessageLogged(this: void, prefix: string, message: string, chatType?: string | undefined, target?: string | undefined): WowApi.SendAddonMessageResult | undefined;
  function SetAdditionalCameraWeight(this: void, teamIndex: number, playerIndex: number, weight: number): void;
  function SetAdditionalCameraWeightByToken(this: void, unitToken: string, weight: number): void;
  function SetBlocklistedAuras(this: void, spellIDs: readonly number[]): void;
  function SetBlocklistedCooldowns(this: void, specID: number, spellIDs: readonly number[]): void;
  function SetBlocklistedItemCooldowns(this: void, itemIDs: readonly number[]): void;
  function SetCamera(this: void, xPos: number, yPos: number, zPos: number, yaw: number, pitch: number, roll: number, fov: number): void;
  function SetCameraCollision(this: void, collide: boolean): void;
  function SetCameraPosition(this: void, xPos: number, yPos: number, zPos: number, snapToLocation: boolean): void;
  function SetCheatsEnabled(this: void, enableCheats: boolean): void;
  function SetCommentatorHistory(this: void, history: WowApi.CommentatorHistory): void;
  function SetDistanceBeforeForcedHorizontalConvergence(this: void, distance: number): void;
  function SetDurationToForceHorizontalConvergence(this: void, ms: number): void;
  function SetExcludeDistance(this: void, excludeDistance: number): void;
  function SetFollowCameraSpeeds(this: void, elasticSpeed: number, minSpeed: number): void;
  function SetHardlockWeight(this: void, weight: number): void;
  function SetHorizontalAngleThresholdToSmooth(this: void, angle: number): void;
  function SetLookAtLerpAmount(this: void, amount: number): void;
  function SetMapAndInstanceIndex(this: void, mapIndex: number, instanceIndex: number): void;
  function SetMouseDisabled(this: void, disabled: boolean): void;
  function SetMoveSpeed(this: void, newSpeed: number): void;
  function SetMsToHoldForHorizontalMovement(this: void, ms: number): void;
  function SetMsToHoldForVerticalMovement(this: void, ms: number): void;
  function SetMsToSmoothHorizontalChange(this: void, ms: number): void;
  function SetMsToSmoothVerticalChange(this: void, ms: number): void;
  function SetPositionLerpAmount(this: void, amount: number): void;
  function SetRequestedDebuffCooldowns(this: void, specID: number, spellIDs: readonly number[]): void;
  function SetRequestedDefensiveCooldowns(this: void, specID: number, spellIDs: readonly number[]): void;
  function SetRequestedItemCooldowns(this: void, itemIDs: readonly number[]): void;
  function SetRequestedOffensiveCooldowns(this: void, specID: number, spellIDs: readonly number[]): void;
  function SetSeriesScore(this: void, teamName1: string, teamName2: string, scoringTeamName: string, score: number): void;
  function SetSeriesScores(this: void, teamName1: string, teamName2: string, score1: number, score2: number): void;
  function SetSmartCameraLocked(this: void, locked: boolean): void;
  function SetSmoothFollowTransitioning(this: void, enabled: boolean): void;
  function SetSoftlockWeight(this: void, weight: number): void;
  function SetSpeedFactor(this: void, factor: number): void;
  function SetTargetHeightOffset(this: void, offset: number): void;
  function SetUseSmartCamera(this: void, useSmartCamera: boolean): void;
  function SnapCameraLookAtPoint(this: void): void;
  function SpellUsesItemCharges(this: void, spellID: number): boolean;
  function StartWargame(this: void, listID: number, teamSize: number, tournamentRules: boolean, teamOneCaptain: string, teamTwoCaptain: string): void;
  function SwapTeamSides(this: void): void;
  function ToggleCheats(this: void): void;
  function UpdateMapInfo(this: void, targetPlayer?: string | undefined): void;
  function UpdatePlayerInfo(this: void): void;
  function ZoomIn(this: void): void;
  function ZoomIn_Position(this: void, zoomAmount?: number | undefined): void;
  function ZoomOut(this: void): void;
  function ZoomOut_Position(this: void, zoomAmount?: number | undefined): void;

}

declare namespace C_CompactUnitFrames {

}

declare namespace C_ConfigurationWarnings {
  function GetConfigurationWarnings(this: void, includeSeenWarnings?: boolean): readonly WowApi.ConfigurationWarning[];
  function GetConfigurationWarningSeen(this: void, configurationWarning: WowApi.ConfigurationWarning): boolean;
  function GetConfigurationWarningString(this: void, configurationWarning: WowApi.ConfigurationWarning): string | undefined;
  function SetConfigurationWarningSeen(this: void, configurationWarning: WowApi.ConfigurationWarning): void;

}

declare namespace C_ConsoleScriptCollection {
  function GetCollectionDataByID(this: void, collectionID: number): WowApi.ConsoleScriptCollectionData | undefined;
  function GetCollectionDataByTag(this: void, collectionTag: string): WowApi.ConsoleScriptCollectionData | undefined;
  function GetElements(this: void, collectionID: number): readonly WowApi.ConsoleScriptCollectionElementData[];
  function GetScriptData(this: void, consoleScriptID: number): WowApi.ConsoleScriptData;

}

declare namespace C_Container {
  function CalculateTotalNumberOfFreeBagSlots(this: void): number;
  function ContainerIDToInventoryID(this: void, containerID: WowApi.BagIndex): number | undefined;
  function ContainerRefundItemPurchase(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, isEquipped?: boolean): void;
  function GetBackpackAutosortDisabled(this: void): boolean;
  function GetBackpackSellJunkDisabled(this: void): boolean;
  function GetBagName(this: void, bagIndex: WowApi.BagIndex): string;
  function GetBagSlotFlag(this: void, bagIndex: WowApi.BagIndex, flag: WowApi.BagSlotFlags): boolean;
  function GetBankAutosortDisabled(this: void): boolean;
  function GetContainerFreeSlots(this: void, containerIndex: WowApi.BagIndex): readonly number[] | undefined;
  function GetContainerItemCooldown(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): LuaMultiReturn<[startTime: number, duration: number, enable: number]>;
  function GetContainerItemDurability(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): LuaMultiReturn<[durability: number, maxDurability: number]> | undefined;
  function GetContainerItemEquipmentSetInfo(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): LuaMultiReturn<[inSet: boolean, setList: string]>;
  function GetContainerItemID(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): number | undefined;
  function GetContainerItemInfo(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): WowApi.ContainerItemInfo | undefined;
  function GetContainerItemLink(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): string;
  function GetContainerItemPurchaseCurrency(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, itemIndex: number, isEquipped: boolean): WowApi.ItemPurchaseCurrency | undefined;
  function GetContainerItemPurchaseInfo(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, isEquipped: boolean): WowApi.ItemPurchaseInfo | undefined;
  function GetContainerItemPurchaseItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, itemIndex: number, isEquipped: boolean): WowApi.ItemPurchaseItem | undefined;
  function GetContainerItemQuestInfo(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): WowApi.ItemQuestInfo;
  function GetContainerNumFreeSlots(this: void, bagIndex: WowApi.BagIndex): LuaMultiReturn<[numFreeSlots: number, bagFamily: number | undefined]>;
  function GetContainerNumSlots(this: void, containerIndex: WowApi.BagIndex): number;
  function GetInsertItemsLeftToRight(this: void): boolean;
  function GetItemCooldown(this: void, itemID: number): LuaMultiReturn<[startTime: number, duration: number, enable: number]> | undefined;
  function GetMaxArenaCurrency(this: void): number;
  function GetSortBagsRightToLeft(this: void): boolean;
  function HasContainerItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): boolean;
  function IsBattlePayItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): boolean;
  function IsContainerFiltered(this: void, containerIndex: WowApi.BagIndex): boolean;
  function PickupContainerItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): void;
  function PlayerHasHearthstone(this: void): number | undefined;
  function SetBackpackAutosortDisabled(this: void, disable: boolean): void;
  function SetBackpackSellJunkDisabled(this: void, disable: boolean): void;
  function SetBagPortraitTexture(this: void, texture: WowApi.SimpleTexture, bagIndex: WowApi.BagIndex): void;
  function SetBagSlotFlag(this: void, bagIndex: WowApi.BagIndex, flag: WowApi.BagSlotFlags, isSet: boolean): void;
  function SetBankAutosortDisabled(this: void, disable: boolean): void;
  function SetInsertItemsLeftToRight(this: void, enable: boolean): void;
  function SetItemSearch(this: void, searchString: string): void;
  function SetSortBagsRightToLeft(this: void, enable: boolean): void;
  function ShowContainerSellCursor(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): void;
  function SocketContainerItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): boolean;
  function SortAccountBankBags(this: void): void;
  function SortBags(this: void): void;
  function SortBank(this: void, bankType: WowApi.BankType): void;
  function SortBankBags(this: void): void;
  function SplitContainerItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, amount: number): void;
  function UseContainerItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number, unitToken?: string | undefined, bankType?: WowApi.BankType | undefined, reagentBankOpen?: boolean): void;
  function UseHearthstone(this: void): boolean;

}

declare namespace C_ContentTracking {
  function GetBestMapForTrackable(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number, ignoreWaypoint?: boolean): LuaMultiReturn<[result: WowApi.ContentTrackingResult, mapID: number | undefined]>;
  function GetCollectableSourceTrackingEnabled(this: void): boolean;
  function GetCollectableSourceTypes(this: void): readonly WowApi.ContentTrackingType[];
  function GetCurrentTrackingTarget(this: void, type: WowApi.ContentTrackingType, id: number): LuaMultiReturn<[targetType: WowApi.ContentTrackingTargetType, targetID: number]> | undefined;
  function GetEncounterTrackingInfo(this: void, journalEncounterID: number): WowApi.EncounterTrackingInfo | undefined;
  function GetNextWaypointForTrackable(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number, uiMapID: number): LuaMultiReturn<[result: WowApi.ContentTrackingResult, mapInfo: WowApi.ContentTrackingMapInfo | undefined]>;
  function GetObjectiveText(this: void, targetType: WowApi.ContentTrackingTargetType, targetID: number, includeHyperlinks?: boolean): string | undefined;
  function GetTitle(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number): string | undefined;
  function GetTrackablesOnMap(this: void, trackableType: WowApi.ContentTrackingType, uiMapID: number): LuaMultiReturn<[result: WowApi.ContentTrackingResult, trackableMapInfos: readonly WowApi.ContentTrackingMapInfo[]]>;
  function GetTrackedIDs(this: void, trackableType: WowApi.ContentTrackingType): readonly number[];
  function GetVendorTrackingInfo(this: void, collectableEntryID: number): WowApi.VendorTrackingInfo | undefined;
  function GetWaypointText(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number): string | undefined;
  function IsNavigable(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number): LuaMultiReturn<[result: WowApi.ContentTrackingResult, isNavigable: boolean]>;
  function IsTrackable(this: void, type: WowApi.ContentTrackingType, id: number): boolean;
  function IsTracking(this: void, type: WowApi.ContentTrackingType, id: number): boolean;
  function StartTracking(this: void, type: WowApi.ContentTrackingType, id: number): WowApi.ContentTrackingError | undefined;
  function StopTracking(this: void, type: WowApi.ContentTrackingType, id: number, stopType: WowApi.ContentTrackingStopType): void;
  function ToggleTracking(this: void, type: WowApi.ContentTrackingType, id: number, stopType: WowApi.ContentTrackingStopType): WowApi.ContentTrackingError | undefined;

}

declare namespace C_ContributionCollector {
  function Close(this: void): void;
  function Contribute(this: void, contributionID: number): void;
  function GetActive(this: void): LuaMultiReturn<[...values: (number)[]]>;
  function GetAtlases(this: void, contributionID: number): readonly string[];
  function GetBuffs(this: void, contributionID: number): LuaMultiReturn<[...values: (number)[]]>;
  function GetContributionAppearance(this: void, contributionID: number, contributionState: WowApi.ContributionState): WowApi.ContributionAppearance | undefined;
  function GetContributionCollectorsForMap(this: void, uiMapID: number): readonly WowApi.ContributionMapInfo[];
  function GetContributionResult(this: void, contributionID: number): WowApi.ContributionResult;
  function GetDescription(this: void, contributionID: number): string;
  function GetManagedContributionsForCreatureID(this: void, creatureID: number): LuaMultiReturn<[...values: (number)[]]>;
  function GetName(this: void, contributionID: number): string;
  function GetOrderIndex(this: void, contributionID: number): number;
  function GetRequiredContributionCurrency(this: void, contributionID: number): LuaMultiReturn<[currencyID: number, currencyAmount: number]> | undefined;
  function GetRequiredContributionItem(this: void, contributionID: number): LuaMultiReturn<[itemID: number, itemCount: number]> | undefined;
  function GetRewardQuestID(this: void, contributionID: number): number;
  function GetState(this: void, contributionID: number): LuaMultiReturn<[contributionState: WowApi.ContributionState, contributionPercentageComplete: number, timeOfNextStateChange: number | undefined, startTime: number]>;
  function HasPendingContribution(this: void, contributionID: number): boolean;
  function IsAwaitingRewardQuestData(this: void, contributionID: number): boolean;

}

declare namespace C_CooldownViewer {
  function GetCooldownViewerCategorySet(this: void, category: WowApi.CooldownViewerCategory, allowUnlearned?: boolean): readonly number[];
  function GetCooldownViewerCooldownInfo(this: void, cooldownID: number): WowApi.CooldownViewerCooldown | undefined;
  function GetGroupBuffItems(this: void): readonly WowApi.GroupBuffItem[];
  function GetLayoutData(this: void): string;
  function GetValidAlertTypes(this: void, cooldownID: number): readonly WowApi.CooldownViewerAlertEventType[];
  function IsCooldownViewerAvailable(this: void): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;
  function SetLayoutData(this: void, data: string): void;

}

declare namespace C_CovenantCallings {
  function AreCallingsUnlocked(this: void): boolean;
  function RequestCallings(this: void): void;

}

declare namespace C_CovenantPreview {
  function CloseFromUI(this: void): void;
  function GetCovenantInfoForPlayerChoiceResponseID(this: void, playerChoiceResponseID: number): WowApi.CovenantPreviewInfo | undefined;

}

declare namespace C_Covenants {
  function GetActiveCovenantID(this: void): number;
  function GetCovenantData(this: void, covenantID: number): WowApi.CovenantData | undefined;
  function GetCovenantIDs(this: void): readonly number[];

}

declare namespace C_CovenantSanctumUI {
  function CanAccessReservoir(this: void): boolean;
  function CanDepositAnima(this: void): boolean;
  function DepositAnima(this: void): void;
  function EndInteraction(this: void): void;
  function GetAnimaInfo(this: void): LuaMultiReturn<[currencyID: number, maxDisplayableValue: number]>;
  function GetCurrentTalentTreeID(this: void): number | undefined;
  function GetFeatures(this: void): readonly WowApi.CovenantSanctumFeatureInfo[];
  function GetRenownLevel(this: void): number;
  function GetRenownLevels(this: void, covenantID: number): readonly WowApi.CovenantSanctumRenownLevelInfo[];
  function GetRenownRewardsForLevel(this: void, covenantID: number, renownLevel: number): readonly WowApi.CovenantSanctumRenownRewardInfo[];
  function GetSanctumType(this: void): WowApi.GarrTalentFeatureSubtype | undefined;
  function GetSoulCurrencies(this: void): readonly number[];
  function HasMaximumRenown(this: void): boolean;
  function IsPlayerInRenownCatchUpMode(this: void): boolean;
  function IsWeeklyRenownCapped(this: void): boolean;
  function RequestCatchUpState(this: void): void;

}

declare namespace C_CraftingOrders {
  function AreOrderNotesDisabled(this: void): boolean;
  function CalculateCraftingOrderPostingFee(this: void, skillLineAbilityID: number, orderType: WowApi.CraftingOrderType, orderDuration: WowApi.CraftingOrderDuration): number;
  function CancelOrder(this: void, orderID: number): void;
  function CanOrderSkillAbility(this: void, skillLineAbilityID: number): boolean;
  function ClaimOrder(this: void, orderID: number, profession: WowApi.Profession): void;
  function CloseCrafterCraftingOrders(this: void): void;
  function CloseCustomerCraftingOrders(this: void): void;
  function FulfillOrder(this: void, orderID: number, crafterNote: string, profession: WowApi.Profession): void;
  function GetClaimedOrder(this: void): WowApi.CraftingOrderInfo | undefined;
  function GetCrafterBuckets(this: void): readonly WowApi.CraftingOrderBucketInfo[];
  function GetCrafterOrders(this: void): readonly WowApi.CraftingOrderInfo[];
  function GetCraftingOrderTime(this: void): number;
  function GetCustomerCategories(this: void): readonly WowApi.CraftingOrderCustomerCategory[];
  function GetCustomerOptions(this: void, params: WowApi.CraftingOrderCustomerSearchParams): WowApi.CraftingOrderCustomerSearchResults;
  function GetCustomerOrders(this: void): readonly WowApi.CraftingOrderInfo[];
  function GetDefaultOrdersSkillLine(this: void): number | undefined;
  function GetMyOrders(this: void): readonly WowApi.CraftingOrderInfo[];
  function GetNumFavoriteCustomerOptions(this: void): number;
  function GetOrderClaimInfo(this: void, profession: WowApi.Profession): WowApi.CraftingOrderClaimsRemainingInfo;
  function GetPersonalOrdersInfo(this: void): readonly WowApi.CraftingOrderPersonalOrdersInfo[];
  function HasFavoriteCustomerOptions(this: void): boolean;
  function IsCustomerOptionFavorited(this: void, recipeID: number): boolean;
  function ListMyOrders(this: void, request: WowApi.CraftingOrderRequestMyOrdersInfo): void;
  function OpenCrafterCraftingOrders(this: void): void;
  function OpenCustomerCraftingOrders(this: void): void;
  function OrderCanBeRecrafted(this: void, orderID: number): boolean;
  function ParseCustomerOptions(this: void): void;
  function PlaceNewOrder(this: void, orderInfo: WowApi.NewCraftingOrderInfo): void;
  function RejectOrder(this: void, orderID: number, crafterNote: string, profession: WowApi.Profession): void;
  function ReleaseOrder(this: void, orderID: number, profession: WowApi.Profession): void;
  function RequestCrafterOrders(this: void, request: WowApi.CraftingOrderRequestInfo): void;
  function RequestCustomerOrders(this: void, request: WowApi.CraftingOrderRequestInfo): void;
  function SetCustomerOptionFavorited(this: void, recipeID: number, favorited: boolean): void;
  function ShouldShowCraftingOrderTab(this: void): boolean;
  function SkillLineHasOrders(this: void, skillLineID: number): boolean;
  function UpdateIgnoreList(this: void): void;

}

declare namespace C_CreatureInfo {
  function GetClassInfo(this: void, classID: number): WowApi.ClassInfo | undefined;
  function GetCreatureFamilyIDs(this: void): readonly number[];
  function GetCreatureFamilyInfo(this: void, creatureFamilyID: number): WowApi.CreatureFamilyInfo | undefined;
  function GetCreatureID(this: void, creatureGUID: string): number | undefined;
  function GetCreatureTypeIDs(this: void): readonly number[];
  function GetCreatureTypeInfo(this: void, creatureTypeID: number): WowApi.CreatureTypeInfo | undefined;
  function GetFactionInfo(this: void, raceID: number): WowApi.FactionInfo | undefined;
  function GetRaceInfo(this: void, raceID: number): WowApi.RaceInfo | undefined;

}

declare namespace C_CurrencyInfo {
  function CanTransferCurrency(this: void, currencyID: number): LuaMultiReturn<[canTransferCurrency: boolean, failureReason: WowApi.AccountCurrencyTransferResult | undefined]>;
  function DoesCurrentFilterRequireAccountCurrencyData(this: void): boolean;
  function DoesWarModeBonusApply(this: void, currencyID: number): LuaMultiReturn<[warModeApplies: boolean | undefined, limitOncePerTooltip: boolean | undefined]>;
  function ExpandCurrencyList(this: void, index: number, expand: boolean): void;
  function FetchCurrencyDataFromAccountCharacters(this: void, currencyID: number): readonly WowApi.CharacterCurrencyData[] | undefined;
  function FetchCurrencyTransferTransactions(this: void): readonly WowApi.CurrencyTransferTransaction[];
  function GetAzeriteCurrencyID(this: void): number;
  function GetBackpackCurrencyInfo(this: void, index: number): WowApi.BackpackCurrencyInfo | undefined;
  function GetBasicCurrencyInfo(this: void, currencyType: number, quantity?: number | undefined): WowApi.CurrencyDisplayInfo | undefined;
  function GetCoinIcon(this: void, amount: number): number;
  function GetCoinText(this: void, amount: number, separator?: string): string;
  function GetCoinTextureString(this: void, amount: number, fontHeight?: number): string;
  function GetCostToTransferCurrency(this: void, currencyID: number, quantity: number): number | undefined;
  function GetCurrencyContainerInfo(this: void, currencyType: number, quantity: number): WowApi.CurrencyDisplayInfo | undefined;
  function GetCurrencyDescription(this: void, type: number): string;
  function GetCurrencyFilter(this: void): WowApi.CurrencyFilterType;
  function GetCurrencyIDFromLink(this: void, currencyLink: string): number;
  function GetCurrencyInfo(this: void, type: number): WowApi.CurrencyInfo | undefined;
  function GetCurrencyInfoFromLink(this: void, link: string): WowApi.CurrencyInfo | undefined;
  function GetCurrencyLink(this: void, type: number, amount?: number | undefined): string;
  function GetCurrencyListInfo(this: void, index: number): WowApi.CurrencyInfo | undefined;
  function GetCurrencyListLink(this: void, index: number): string;
  function GetCurrencyListSize(this: void): number;
  function GetDragonIslesSuppliesCurrencyID(this: void): number;
  function GetFactionGrantedByCurrency(this: void, currencyID: number): number | undefined;
  function GetMaxTransferableAmountFromQuantity(this: void, currencyID: number, requestedQuantity: number): number | undefined;
  function GetPlayerCurrencyCategoryInfo(this: void, categoryID: number, includeAccountWide?: boolean): WowApi.PlayerCurrencyCategoryInfo;
  function GetWarResourcesCurrencyID(this: void): number;
  function IsAccountCharacterCurrencyDataReady(this: void): boolean;
  function IsAccountTransferableCurrency(this: void, currencyID: number): boolean;
  function IsAccountWideCurrency(this: void, currencyID: number): boolean;
  function IsCurrencyContainer(this: void, currencyID: number, quantity: number): boolean;
  function IsCurrencyTransferInProgress(this: void): boolean;
  function IsCurrencyTransferTransactionDataReady(this: void): boolean;
  function PickupCurrency(this: void, type: number): void;
  function PlayerHasMaxQuantity(this: void, currencyID: number): boolean;
  function PlayerHasMaxWeeklyQuantity(this: void, currencyID: number): boolean;
  function RequestCurrencyDataForAccountCharacters(this: void): void;
  function RequestCurrencyFromAccountCharacter(this: void, sourceCharacterGUID: string, currencyID: number, quantity: number): void;
  function SetCurrencyBackpack(this: void, index: number, backpack: boolean): void;
  function SetCurrencyBackpackByID(this: void, currencyType: number, backpack: boolean): void;
  function SetCurrencyFilter(this: void, filterType: WowApi.CurrencyFilterType): void;
  function SetCurrencyUnused(this: void, index: number, unused: boolean): void;

}

declare namespace C_Cursor {
  function GetCursorItem(this: void): WowApi.ItemLocation | undefined;

}

declare namespace C_CursorUtil {

}

declare namespace C_CurveUtil {
  function CreateColorCurve(this: void): WowApi.LuaColorCurveObject;
  function CreateCurve(this: void): WowApi.LuaCurveObject;
  function EvaluateColorFromBoolean(this: void, boolean: boolean, valueIfTrue: WowApi.colorRGBA, valueIfFalse: WowApi.colorRGBA): WowApi.colorRGBA;
  function EvaluateColorValueFromBoolean(this: void, boolean: boolean, valueIfTrue: number, valueIfFalse: number): number;
  function EvaluateGameCurve(this: void, curveID: number, x: number): number;

}

declare namespace C_CVar {
  function AreCVarsLoaded(this: void): boolean;
  function GetCVar(this: void, name: string): string | undefined;
  function GetCVarBitfield(this: void, name: string, index: number): boolean | undefined;
  function GetCVarBool(this: void, name: string): boolean | undefined;
  function GetCVarDefault(this: void, name: string): string | undefined;
  function GetCVarInfo(this: void, name: string): LuaMultiReturn<[value: string, defaultValue: string, isStoredServerAccount: boolean, isStoredServerCharacter: boolean, isLockedFromUser: boolean, isSecure: boolean, isReadOnly: boolean]>;
  function RegisterCVar(this: void, name: string, value?: string | undefined): void;
  function RemoveTempCVar(this: void, name: string): void;
  function ResetTestCVars(this: void): void;
  function SetCVar(this: void, name: string, value?: string | undefined): boolean;
  function SetCVarBitfield(this: void, name: string, index: number, value: boolean): boolean;
  function SetTempCVar(this: void, name: string, value?: string | undefined): void;

}

declare namespace C_DamageMeter {
  function GetAvailableCombatSessions(this: void): readonly WowApi.DamageMeterAvailableCombatSession[];
  function GetCombatSessionFromID(this: void, sessionID: number, type: WowApi.DamageMeterType): WowApi.DamageMeterCombatSession;
  function GetCombatSessionFromType(this: void, sessionType: WowApi.DamageMeterSessionType, type: WowApi.DamageMeterType): WowApi.DamageMeterCombatSession;
  function GetCombatSessionSourceFromID(this: void, sessionID: number, type: WowApi.DamageMeterType, sourceGUID?: string | undefined, sourceCreatureID?: number | undefined): WowApi.DamageMeterCombatSessionSource;
  function GetCombatSessionSourceFromType(this: void, sessionType: WowApi.DamageMeterSessionType, type: WowApi.DamageMeterType, sourceGUID?: string | undefined, sourceCreatureID?: number | undefined): WowApi.DamageMeterCombatSessionSource;
  function GetSessionDurationSeconds(this: void, sessionType: WowApi.DamageMeterSessionType): number | undefined;
  function IsDamageMeterAvailable(this: void): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;
  function ResetAllCombatSessions(this: void): void;

}

declare namespace C_DateAndTime {
  function AdjustTimeByDays(this: void, date: WowApi.CalendarTime, days: number): WowApi.CalendarTime;
  function AdjustTimeByMinutes(this: void, date: WowApi.CalendarTime, minutes: number): WowApi.CalendarTime;
  function AdjustTimeByMonths(this: void, date: WowApi.CalendarTime, months: number): WowApi.CalendarTime;
  function CompareCalendarTime(this: void, lhsCalendarTime: WowApi.CalendarTime, rhsCalendarTime: WowApi.CalendarTime): number;
  function GetCalendarTimeFromEpoch(this: void, epoch: number): WowApi.CalendarTime;
  function GetCurrentCalendarTime(this: void): WowApi.CalendarTime;
  function GetSecondsUntilDailyReset(this: void): number;
  function GetSecondsUntilWeeklyReset(this: void): number;
  function GetServerTimeLocal(this: void): number;
  function GetWeeklyResetStartTime(this: void): number;
  function IsDayTime(this: void): boolean;

}

declare namespace C_DeathAlert {

}

declare namespace C_DeathInfo {
  function GetCorpseMapPosition(this: void, uiMapID: number): WowApi.vector2 | undefined;
  function GetDeathReleasePosition(this: void, uiMapID: number): WowApi.vector2 | undefined;
  function GetGraveyardsForMap(this: void, uiMapID: number): readonly WowApi.GraveyardMapInfo[];
  function GetSelfResurrectOptions(this: void): readonly WowApi.SelfResurrectOption[] | undefined;
  function UseSelfResurrectOption(this: void, optionType: WowApi.SelfResurrectOptionType, id: number): void;

}

declare namespace C_DeathRecap {
  function GetRecapEvents(this: void, recapID?: number | undefined): readonly WowApi.DeathRecapEventInfo[];
  function GetRecapLink(this: void, recapID?: number | undefined): string;
  function GetRecapMaxHealth(this: void, recapID?: number | undefined): number;
  function HasRecapEvents(this: void, recapID?: number | undefined): boolean;

}

declare namespace C_DelvesUI {
  function GetActiveDelveTier(this: void): WowApi.TieredEntranceTierInfo;
  function GetCompanionInfoForActivePlayer(this: void): number;
  function GetCreatureDisplayInfoForCompanion(this: void, companionID?: number | undefined): number;
  function GetCurioLink(this: void, spellID: number | string, rarity: WowApi.CurioRarity): string;
  function GetCurioNodeForCompanion(this: void, curioType: WowApi.CurioType, companionID?: number | undefined): number;
  function GetCurioRarityByTraitCondAccountElementID(this: void, traitCondAccountElementID: number): WowApi.CurioRarity;
  function GetCurrentDelvesSeasonNumber(this: void): number;
  function GetDelveEntranceBackgroundWidgetSetID(this: void): number;
  function GetDelveEntranceDescriptionString(this: void): string | undefined;
  function GetDelveEntranceHeaderString(this: void): string | undefined;
  function GetDelveEntranceMapID(this: void): number;
  function GetDelveEntranceTiers(this: void): readonly WowApi.TieredEntranceTierInfo[];
  function GetDelveEntranceTitleString(this: void): string | undefined;
  function GetDelvesAffixSpellsForSeason(this: void): readonly number[];
  function GetDelvesFactionForSeason(this: void): number;
  function GetDelvesMinRequiredLevel(this: void): number | undefined;
  function GetFactionForCompanion(this: void, companionID?: number | undefined): number;
  function GetFlavorNodeForCompanion(this: void, companionID?: number | undefined): number;
  function GetFlavorNodeNameForCompanion(this: void, companionID?: number | undefined): string;
  function GetLockedTextForCompanion(this: void, companionID?: number | undefined): string;
  function GetModelSceneForCompanion(this: void, companionID?: number | undefined): number;
  function GetPlayerCompanionPDEID(this: void, companionID?: number | undefined): number | undefined;
  function GetRoleNodeForCompanion(this: void, companionID?: number | undefined): number;
  function GetRoleSubtreeForCompanion(this: void, roleType: WowApi.CompanionRoleType, companionID?: number | undefined): number;
  function GetTieredEntranceOptionalAffixTraitTreeID(this: void): number | undefined;
  function GetTieredEntrancePDEID(this: void): number;
  function GetTieredEntranceType(this: void): WowApi.TieredEntranceType;
  function GetTraitTreeForCompanion(this: void, companionID?: number | undefined): number;
  function GetUnseenCuriosBySlotType(this: void, slotType: WowApi.CompanionConfigSlotTypes, ownedCurioNodeIDs: readonly number[]): readonly number[];
  function GetWorldTierDifficultyForActivePlayer(this: void): WowApi.WorldTierDifficulty;
  function HasActiveDelve(this: void): boolean;
  function HasActiveLair(this: void): boolean;
  function HasActiveLFGLair(this: void): boolean;
  function IsDelveEntranceTierEnabled(this: void, tier: number): LuaMultiReturn<[isEnabled: boolean, failureReason: string | undefined]>;
  function IsEligibleForActiveDelveRewards(this: void, unit: string): boolean;
  function IsInLair(this: void): boolean;
  function IsTraitTreeForCompanion(this: void, traitTreeID: number): boolean;
  function RequestPartyEligibilityForDelveTiers(this: void, mapID: number): void;
  function SaveSeenCuriosBySlotType(this: void, slotType: WowApi.CompanionConfigSlotTypes, ownedCurioNodeIDs: readonly number[]): void;
  function SelectDelveEntranceTier(this: void, tier: number): void;

}

declare namespace C_Discord {
  function Authorize(this: void): void;
  function GetDiscordChannelName(this: void, serverIndex: number, channelIndex: number): string;
  function GetDiscordUserID(this: void): string;
  function GetDiscordUserName(this: void, userID: string): string;
  function GetDisplayNameType(this: void): WowApi.DiscordDisplayNameType;
  function GetGuildLinkStatus(this: void): LuaMultiReturn<[isFullyLinked: boolean, linkedChannelName: string, linkedServerName: string]>;
  function GetNumDiscordChannels(this: void, serverIndex: number): LuaMultiReturn<[count: number, valid: boolean]>;
  function GetNumDiscordServers(this: void): number;
  function GetServerLinkableChannels(this: void, index: number): void;
  function GetServerName(this: void, index: number): string;
  function GuildLink(this: void, serverIndex: number, channelIndex: number): void;
  function GuildUnlink(this: void): void;
  function IsEnabled(this: void): boolean;
  function IsGuildChannelLinked(this: void): boolean;
  function IsGuildSettingSet(this: void, setting: WowApi.DiscordGuildSettings): boolean;
  function IsUserOAuthed(this: void): boolean;
  function RefreshAuth(this: void): void;
  function SetGuildSetting(this: void, setting: WowApi.DiscordGuildSettings, set: boolean): void;
  function UpdateDiscordServers(this: void): void;
  function UpdateGuildLobby(this: void): void;

}

declare namespace C_DuelInfo {

}

declare namespace C_DurationUtil {
  function CreateDuration(this: void): WowApi.LuaDurationObject;
  function CreateDurationTextBinding(this: void): WowApi.DurationTextBinding;
  function CreateManualClock(this: void): WowApi.LuaDurationManualClock;

}

declare namespace C_DyeColor {
  function GetAllDyeColorCategories(this: void): readonly number[];
  function GetAllDyeColors(this: void, ownedColorsOnly?: boolean): readonly number[];
  function GetDyeColorCategoryInfo(this: void, dyeColorCategoryID: number): WowApi.DyeColorCategoryDisplayInfo | undefined;
  function GetDyeColorInfo(this: void, dyeColorID: number): WowApi.DyeColorDisplayInfo | undefined;
  function GetDyeColorsForItem(this: void, itemLinkOrID: number | string): readonly number[];
  function GetDyeColorsForItemLocation(this: void, itemLocation: WowApi.ItemLocation): readonly number[];
  function GetDyeColorsInCategory(this: void, dyeColorCategory: number, ownedColorsOnly?: boolean): readonly number[];
  function IsDyeColorOwned(this: void, dyeColorID: number): boolean;

}

declare namespace C_EditMode {
  function ConvertLayoutInfoToString(this: void, layoutInfo: WowApi.EditModeLayoutInfo): string;
  function ConvertStringToLayoutInfo(this: void, layoutInfoAsString: string): WowApi.EditModeLayoutInfo | undefined;
  function GetAccountSettings(this: void): readonly WowApi.EditModeSettingInfo[];
  function GetEditModeDefaultLayout(this: void): number;
  function GetLayouts(this: void): WowApi.EditModeLayouts;
  function IsValidLayoutName(this: void, name: string): boolean;
  function OnEditModeExit(this: void): void;
  function OnLayoutAdded(this: void, addedLayoutIndex: number, activateNewLayout: boolean, isLayoutImported: boolean): void;
  function OnLayoutDeleted(this: void, deletedLayoutIndex: number): void;
  function SaveLayouts(this: void, saveInfo: WowApi.EditModeLayouts): void;
  function SetAccountSetting(this: void, setting: WowApi.EditModeAccountSetting, value: number): void;
  function SetActiveLayout(this: void, activeLayout: number): void;

}

declare namespace C_EncodingUtil {
  function CompressString(this: void, source: string, method?: WowApi.CompressionMethod, level?: WowApi.CompressionLevel): string | undefined;
  function DecodeBase64(this: void, source: string, variant?: WowApi.Base64Variant): string | undefined;
  function DecodeHex(this: void, source: string): string | undefined;
  function DecompressString(this: void, source: string, method?: WowApi.CompressionMethod): string | undefined;
  function DeserializeCBOR(this: void, source: string): unknown | undefined;
  function DeserializeJSON(this: void, source: string): unknown | undefined;
  function EncodeBase64(this: void, source: string, variant?: WowApi.Base64Variant): string | undefined;
  function EncodeHex(this: void, source: string): string | undefined;
  function SerializeCBOR(this: void, value?: unknown | undefined, options?: WowApi.CBORSerializationOptions | undefined): string;
  function SerializeJSON(this: void, value?: unknown | undefined, options?: WowApi.JSONSerializationOptions | undefined): string;

}

declare namespace C_EncounterEvents {
  function GetEventColor(this: void, encounterEventID: number, trigger: WowApi.EncounterEventColorTrigger): WowApi.colorRGBA | undefined;
  function GetEventInfo(this: void, encounterEventID: number): WowApi.EncounterEventInfo | undefined;
  function GetEventList(this: void): readonly number[];
  function GetEventSound(this: void, encounterEventID: number, trigger: WowApi.EncounterEventSoundTrigger): WowApi.EncounterEventSoundInfo | undefined;
  function HasEventInfo(this: void, encounterEventID: number): boolean;
  function PlayEventSound(this: void, encounterEventID: number, trigger: WowApi.EncounterEventSoundTrigger): number;
  function SetEventColor(this: void, encounterEventID: number, trigger: WowApi.EncounterEventColorTrigger, color?: WowApi.colorRGBA | undefined): void;
  function SetEventSound(this: void, encounterEventID: number, trigger: WowApi.EncounterEventSoundTrigger, sound?: WowApi.EncounterEventSoundInfo | undefined): void;

}

declare namespace C_EncounterInfo {

}

declare namespace C_EncounterJournal {
  function GetBaseDifficultyID(this: void, difficultyID: number): number;
  function GetDungeonEntrancesForMap(this: void, uiMapID: number): readonly WowApi.DungeonEntranceMapInfo[];
  function GetEncounterJournalLink(this: void, linkType: WowApi.JournalLinkTypes, ID: number, displayText: string, difficultyID: number): string;
  function GetEncountersOnMap(this: void, uiMapID: number): readonly WowApi.EncounterJournalMapEncounterInfo[];
  function GetInstanceForGameMap(this: void, mapID: number): number | undefined;
  function GetLootInfo(this: void, id: number): WowApi.EncounterJournalItemInfo;
  function GetLootInfoByIndex(this: void, index: number, encounterIndex?: number | undefined): WowApi.EncounterJournalItemInfo | undefined;
  function GetSectionIconFlags(this: void, sectionID: number): readonly number[] | undefined;
  function GetSectionInfo(this: void, sectionID: number): WowApi.EncounterJournalSectionInfo | undefined;
  function GetSlotFilter(this: void): WowApi.ItemSlotFilterType;
  function InitalizeSelectedTier(this: void): void;
  function InstanceHasDifficultyID(this: void, difficultyID: number): boolean;
  function InstanceHasLoot(this: void, instanceID?: number | undefined): boolean;
  function IsEncounterComplete(this: void, journalEncounterID: number): boolean;
  function OnClose(this: void): void;
  function OnOpen(this: void): void;
  function ResetSlotFilter(this: void): void;
  function SetPreviewMythicPlusLevel(this: void, level: number): void;
  function SetPreviewPvpTier(this: void, tier: number): void;
  function SetSlotFilter(this: void, filterSlot: WowApi.ItemSlotFilterType): void;
  function SetTab(this: void, tabIdx: number): void;
  function StartArathiRPE(this: void): void;

}

declare namespace C_EncounterTimeline {
  function AddEditModeEvents(this: void): number;
  function AddScriptEvent(this: void, eventInfo: WowApi.EncounterTimelineScriptEventRequest): WowApi.EncounterTimelineEventID;
  function CancelAllScriptEvents(this: void): void;
  function CancelEditModeEvents(this: void): void;
  function CancelScriptEvent(this: void, eventID: WowApi.EncounterTimelineEventID): void;
  function FinishScriptEvent(this: void, eventID: WowApi.EncounterTimelineEventID): void;
  function GetCurrentTime(this: void): number;
  function GetEventColor(this: void, eventID: WowApi.EncounterTimelineEventID, overrideTrigger?: WowApi.EncounterEventColorTrigger | undefined): WowApi.colorRGBA;
  function GetEventCountBySource(this: void, source: WowApi.EncounterTimelineEventSource): number;
  function GetEventHighlightTime(this: void): number;
  function GetEventInfo(this: void, eventID: WowApi.EncounterTimelineEventID): WowApi.EncounterTimelineEventInfo;
  function GetEventList(this: void): readonly WowApi.EncounterTimelineEventID[];
  function GetEventState(this: void, eventID: WowApi.EncounterTimelineEventID): WowApi.EncounterTimelineEventState;
  function GetEventTimeElapsed(this: void, eventID: WowApi.EncounterTimelineEventID): number;
  function GetEventTimer(this: void, eventID: WowApi.EncounterTimelineEventID): WowApi.LuaDurationObject | undefined;
  function GetEventTimeRemaining(this: void, eventID: WowApi.EncounterTimelineEventID): number;
  function GetEventTrack(this: void, eventID: WowApi.EncounterTimelineEventID): LuaMultiReturn<[track: WowApi.EncounterTimelineTrack, trackSortIndex: number | undefined]>;
  function GetSortedEventList(this: void, maxEventCount?: number | undefined, maxEventDuration?: number | undefined, excludeTerminalStates?: boolean, excludeHiddenEvents?: boolean): readonly WowApi.EncounterTimelineEventID[];
  function GetTrackInfo(this: void, track: WowApi.EncounterTimelineTrack): WowApi.EncounterTimelineTrackInfo;
  function GetTrackList(this: void): readonly WowApi.EncounterTimelineTrackInfo[];
  function GetTrackMaxEventDuration(this: void, track: WowApi.EncounterTimelineTrack): number;
  function GetTrackType(this: void, track: WowApi.EncounterTimelineTrack): WowApi.EncounterTimelineTrackType;
  function GetViewType(this: void): WowApi.EncounterTimelineViewType;
  function HasActiveEvents(this: void): boolean;
  function HasAnyEvents(this: void): boolean;
  function HasPausedEvents(this: void): boolean;
  function HasVisibleEvents(this: void): boolean;
  function IsEventBlocked(this: void, eventID: WowApi.EncounterTimelineEventID): boolean;
  function IsFeatureAvailable(this: void): boolean;
  function IsFeatureEnabled(this: void): boolean;
  function PauseScriptEvent(this: void, eventID: WowApi.EncounterTimelineEventID): void;
  function ResumeScriptEvent(this: void, eventID: WowApi.EncounterTimelineEventID): void;
  function SetEventIconTextures(this: void, eventID: WowApi.EncounterTimelineEventID, includeIcons: WowApi.EncounterEventIconmask, textures: readonly WowApi.SimpleTexture[]): void;
  function SetViewType(this: void, viewType: WowApi.EncounterTimelineViewType): void;

}

declare namespace C_EncounterWarnings {
  function GetColorForSeverity(this: void, severity: WowApi.EncounterEventSeverity): WowApi.colorRGBA;
  function GetEditModeWarningInfo(this: void, severity: WowApi.EncounterEventSeverity): WowApi.EncounterWarningInfo;
  function GetPlayCustomSoundsWhenHidden(this: void): boolean;
  function GetSoundKitForSeverity(this: void, severity: WowApi.EncounterEventSeverity): number;
  function GetWarningsShown(this: void): boolean;
  function IsFeatureAvailable(this: void): boolean;
  function IsFeatureEnabled(this: void): boolean;
  function PlaySound(this: void, severity: WowApi.EncounterEventSeverity): number | undefined;
  function SetPlayCustomSoundsWhenHidden(this: void, play: boolean): void;
  function SetWarningsShown(this: void, shown: boolean): void;

}

declare namespace C_EndOfMatchUI {
  function GetEndOfMatchDetails(this: void): WowApi.MatchDetails | undefined;

}

declare namespace C_EquipmentSet {
  function AssignSpecToEquipmentSet(this: void, equipmentSetID: number, specIndex: number): void;
  function CanUseEquipmentSets(this: void): boolean;
  function ClearIgnoredSlotsForSave(this: void): void;
  function CreateEquipmentSet(this: void, equipmentSetName: string, icon?: string | undefined): void;
  function DeleteEquipmentSet(this: void, equipmentSetID: number): void;
  function EquipmentSetContainsLockedItems(this: void, equipmentSetID: number): boolean;
  function GetEquipmentSetAssignedSpec(this: void, equipmentSetID: number): number | undefined;
  function GetEquipmentSetForSpec(this: void, specIndex: number): number | undefined;
  function GetEquipmentSetID(this: void, equipmentSetName: string): number | undefined;
  function GetEquipmentSetIDs(this: void): readonly number[];
  function GetEquipmentSetInfo(this: void, equipmentSetID: number): LuaMultiReturn<[name: string, iconFileID: number, setID: number, isEquipped: boolean, numItems: number, numEquipped: number, numInInventory: number, numLost: number, numIgnored: number]> | undefined;
  function GetIgnoredSlots(this: void, equipmentSetID: number): readonly boolean[] | undefined;
  function GetItemIDs(this: void, equipmentSetID: number): readonly number[] | undefined;
  function GetItemLocations(this: void, equipmentSetID: number): readonly number[] | undefined;
  function GetNumEquipmentSets(this: void): number;
  function IgnoreSlotForSave(this: void, slot: number): void;
  function IsSlotIgnoredForSave(this: void, slot: number): boolean;
  function ModifyEquipmentSet(this: void, equipmentSetID: number, newName: string, newIcon?: string | undefined): void;
  function PickupEquipmentSet(this: void, equipmentSetID: number): void;
  function SaveEquipmentSet(this: void, equipmentSetID: number, icon?: string | undefined): void;
  function UnassignEquipmentSetSpec(this: void, equipmentSetID: number): void;
  function UnignoreSlotForSave(this: void, slot: number): void;
  function UseEquipmentSet(this: void, equipmentSetID: number): boolean;

}

declare namespace C_EventScheduler {
  function CanShowEvents(this: void): boolean;
  function ClearReminder(this: void, eventKey: string): void;
  function GetActiveContinentName(this: void): string | undefined;
  function GetEventUiMapID(this: void, areaPoiID: number): number | undefined;
  function GetEventZoneName(this: void, areaPoiID: number): string | undefined;
  function GetOngoingEvents(this: void): readonly WowApi.OngoingEventInfo[] | undefined;
  function GetScheduledEvents(this: void): readonly WowApi.ScheduledEventInfo[] | undefined;
  function HasData(this: void): boolean;
  function HasSavedReminders(this: void): boolean;
  function RequestEvents(this: void): void;
  function SetReminder(this: void, eventKey: string): void;

}

declare namespace C_EventToastManager {
  function GetLevelUpDisplayToastsFromLevel(this: void, level: number): readonly WowApi.EventToastInfo[] | undefined;
  function GetNextToastToDisplay(this: void): WowApi.EventToastInfo | undefined;
  function RemoveCurrentToast(this: void): void;

}

declare namespace C_EventUtils {
  function IsCallbackEvent(this: void, eventName: string): boolean;
  function IsEventValid(this: void, eventName: string): boolean;

}

declare namespace C_ExpansionTrial {
  function OnTrialLevelUpDialogClicked(this: void): void;
  function OnTrialLevelUpDialogShown(this: void): void;

}

declare namespace C_ExternalEventURL {
  function HasURL(this: void): boolean;
  function IsNew(this: void): boolean;
  function LaunchURL(this: void): void;

}

declare namespace C_FogOfWar {
  function GetFogOfWarForMap(this: void, uiMapID: number): number | undefined;
  function GetFogOfWarInfo(this: void, fogOfWarID: number): WowApi.FogOfWarInfo | undefined;

}

declare namespace C_FrameManager {
  function GetFrameVisibilityState(this: void, frameType: WowApi.UIFrameType): boolean;

}

declare namespace C_FriendList {
  function AddFriend(this: void, name: string, notes?: string | undefined): void;
  function AddIgnore(this: void, name: string): boolean;
  function AddOrDelIgnore(this: void, name: string): void;
  function AddOrRemoveFriend(this: void, name: string, notes: string): void;
  function DelIgnore(this: void, name: string): boolean;
  function DelIgnoreByIndex(this: void, index: number): void;
  function GetFriendInfo(this: void, name: string): WowApi.FriendInfo | undefined;
  function GetFriendInfoByIndex(this: void, index: number): WowApi.FriendInfo | undefined;
  function GetIgnoreName(this: void, index: number): string | undefined;
  function GetNumFriends(this: void): number;
  function GetNumIgnores(this: void): number;
  function GetNumOnlineFriends(this: void): number;
  function GetNumWhoResults(this: void): LuaMultiReturn<[numWhos: number, totalNumWhos: number]>;
  function GetSelectedFriend(this: void): number | undefined;
  function GetSelectedIgnore(this: void): number | undefined;
  function GetWhoInfo(this: void, index: number): WowApi.WhoInfo | undefined;
  function IsFriend(this: void, guid: string): boolean;
  function IsIgnored(this: void, token: string): boolean;
  function IsIgnoredByGuid(this: void, guid: string): boolean;
  function IsLegacyFriendSystemEnabled(this: void): boolean;
  function IsOnIgnoredList(this: void, token: string): boolean;
  function RemoveFriend(this: void, name: string): boolean;
  function RemoveFriendByIndex(this: void, index: number): void;
  function SendWho(this: void, filter: string, origin?: number | undefined): void;
  function SetFriendNotes(this: void, name: string, notes: string): boolean;
  function SetFriendNotesByIndex(this: void, index: number, notes: string): void;
  function SetSelectedFriend(this: void, index: number): void;
  function SetSelectedIgnore(this: void, index: number): void;
  function SetWhoToUi(this: void, whoToUi: boolean): void;
  function ShowFriends(this: void): void;
  function SortWho(this: void, sorting: string): void;

}

declare namespace C_GamePad {
  function AddSDLMapping(this: void, platform: WowApi.ClientPlatformType, mapping: string): boolean;
  function ApplyConfigs(this: void): void;
  function AxisIndexToConfigName(this: void, axisIndex: number): string | undefined;
  function ButtonBindingToIndex(this: void, bindingName: string): number | undefined;
  function ButtonIndexToBinding(this: void, buttonIndex: number): string | undefined;
  function ButtonIndexToConfigName(this: void, buttonIndex: number): string | undefined;
  function ClearLedColor(this: void): void;
  function DeleteConfig(this: void, configID: WowApi.GamePadConfigID): void;
  function GetActiveDeviceID(this: void): number;
  function GetAllConfigIDs(this: void): readonly WowApi.GamePadConfigID[];
  function GetAllDeviceIDs(this: void): readonly number[];
  function GetAllowHoverEventsWithFreeLook(this: void): boolean;
  function GetCombinedDeviceID(this: void): number;
  function GetConfig(this: void, configID: WowApi.GamePadConfigID): WowApi.GamePadConfig | undefined;
  function GetDeviceMappedState(this: void, deviceID?: number | undefined): WowApi.GamePadMappedState | undefined;
  function GetDeviceRawState(this: void, deviceID: number): WowApi.GamePadRawState | undefined;
  function GetLedColor(this: void): WowApi.colorRGB;
  function GetPowerLevel(this: void, deviceID?: number | undefined): WowApi.GamePadPowerLevel;
  function IsEnabled(this: void): boolean;
  function SetAllowHoverEventsWithFreeLook(this: void, enable: boolean): void;
  function SetConfig(this: void, config: WowApi.GamePadConfig): void;
  function SetLedColor(this: void, color: WowApi.colorRGB): void;
  function SetVibration(this: void, vibrationType: string, intensity: number): void;
  function StickIndexToConfigName(this: void, stickIndex: number): string | undefined;
  function StopVibration(this: void): void;

}

declare namespace C_GamepadTargeting {
  function Disable(this: void): boolean;
  function Enable(this: void): void;
  function HasReticleHoverTarget(this: void): boolean;
  function SetFilter(this: void, filter: WowApi.GamepadTargetingFilters): void;

}

declare namespace C_GamepadUI {
  function GetFirstGamepadActionBarStorageSlotIndexForActiveStance(this: void): number | undefined;
  function GetFirstGamepadActionStorageSlotIndex(this: void): number;
  function GetFirstGamepadPetActionStorageSlotIndex(this: void): number;
  function IsValidGamepadActionStorageSlotIndex(this: void, gamepadActionStorageSlotIndex: number): boolean;
  function IsValidGamepadPossessBarStorageSlotIndex(this: void, gamepadPossessBarStorageSlotIndex: number): boolean;

}

declare namespace C_GameRules {
  function AccountHasSDEnabled(this: void): boolean;
  function AutoConnectToGameModeRealm(this: void, gameModeRecordID: number): void;
  function DoesGameModeHavePromo(this: void, gameModeRecordID: number): boolean;
  function GetActiveGameMode(this: void): WowApi.GameMode;
  function GetCurrentEventRealmQueues(this: void): WowApi.EventRealmQueues;
  function GetCurrentGameModeDisplayInfo(this: void): WowApi.GameModeDisplayInfo | undefined;
  function GetCurrentGameModeRecordID(this: void): number;
  function GetDisplayedGameModeRecordIDAtIndex(this: void, displayIndex: number): number;
  function GetGameModeDisplayInfoByRecordID(this: void, gameModeRecordID: number): WowApi.GameModeDisplayInfo | undefined;
  function GetGameModeGlueScreenName(this: void): string;
  function GetGameModePromoGlobalString(this: void, gameModeRecordID: number): string;
  function GetGameRuleAsFloat(this: void, gameRule: WowApi.GameRule, decimalPlaces?: number): number;
  function GetGameRuleAsFrameStrata(this: void, gameRule: WowApi.GameRule): string;
  function GetNumDisplayedGameModes(this: void): number;
  function IsCharacterlessLoginActive(this: void): boolean;
  function IsClassAllowedForGameMode(this: void, classID: number): boolean;
  function IsGameModeEnabled(this: void, gameModeRecordID: number): boolean;
  function IsGameRuleActive(this: void, gameRule: WowApi.GameRule): boolean;
  function IsHardcoreActive(this: void): boolean;
  function IsMultiActionBarVisibilityForced(this: void): boolean;
  function IsPersonalResourceDisplayEnabled(this: void): boolean;
  function IsPlunderstorm(this: void): boolean;
  function IsSDHDToggleEnabled(this: void): boolean;
  function IsSelfFoundAllowed(this: void): boolean;
  function IsStandard(this: void): boolean;
  function IsWoWHack(this: void): boolean;
  function SelectClassicExperiencePreset(this: void): void;
  function SelectModernExperiencePreset(this: void): void;
  function SetSDHDToggleValue(this: void, setToSD: boolean): void;

}

declare namespace C_Garrison {
  function AddFollowerToMission(this: void, missionID: number, followerID: string, boardIndex?: number | undefined): boolean;
  function GetAutoCombatDamageClassValues(this: void): readonly WowApi.AutoCombatDamageClassString[];
  function GetAutoMissionBoardState(this: void, missionID: number): readonly WowApi.AutoMissionTargetingInfo[];
  function GetAutoMissionEnvironmentEffect(this: void, missionID: number): WowApi.AutoMissionEnvironmentEffect | undefined;
  function GetAutoMissionTargetingInfo(this: void, missionID: number, followerID: string, casterBoardIndex: number): readonly WowApi.AutoMissionTargetingInfo[];
  function GetAutoMissionTargetingInfoForSpell(this: void, missionID: number, autoCombatSpellID: number, casterBoardIndex: number): readonly WowApi.AutoMissionTargetingInfo[];
  function GetAutoTroops(this: void, followerType: number): readonly WowApi.AutoCombatTroopInfo[];
  function GetCombatLogSpellInfo(this: void, autoCombatSpellID: number): WowApi.AutoCombatSpellInfo | undefined;
  function GetCurrentCypherEquipmentLevel(this: void): number;
  function GetCurrentGarrTalentTreeFriendshipFactionID(this: void): number | undefined;
  function GetCurrentGarrTalentTreeID(this: void): number | undefined;
  function GetCyphersToNextEquipmentLevel(this: void): number | undefined;
  function GetFollowerAutoCombatSpells(this: void, garrFollowerID: string, followerLevel: number): LuaMultiReturn<[autoCombatSpells: readonly WowApi.AutoCombatSpellInfo[], autoCombatAutoAttack: WowApi.AutoCombatSpellInfo | undefined]> | undefined;
  function GetFollowerAutoCombatStats(this: void, garrFollowerID: string): WowApi.FollowerAutoCombatStatsInfo | undefined;
  function GetFollowerMissionCompleteInfo(this: void, followerID: string): WowApi.FollowerMissionCompleteInfo;
  function GetGarrisonPlotsInstancesForMap(this: void, uiMapID: number): readonly WowApi.GarrisonPlotInstanceMapInfo[];
  function GetGarrisonTalentTreeCurrencyTypes(this: void, garrTalentTreeID: number): number | undefined;
  function GetGarrisonTalentTreeType(this: void, garrTalentTreeID: number): number;
  function GetMaxCypherEquipmentLevel(this: void): number;
  function GetMissionCompleteEncounters(this: void, missionID: number): readonly WowApi.GarrisonEnemyEncounterInfo[];
  function GetMissionDeploymentInfo(this: void, missionID: number): WowApi.MissionDeploymentInfo;
  function GetMissionEncounterIconInfo(this: void, missionID: number): WowApi.MissionEncounterIconInfo;
  function GetTalentInfo(this: void, talentID: number): WowApi.GarrisonTalentInfo;
  function GetTalentPointsSpentInTalentTree(this: void, garrTalentTreeID: number): number;
  function GetTalentTreeIDsByClassID(this: void, garrType: number, classID: number): readonly number[] | undefined;
  function GetTalentTreeInfo(this: void, treeID: number): WowApi.GarrisonTalentTreeInfo;
  function GetTalentTreeResetInfo(this: void, garrTalentTreeID: number): LuaMultiReturn<[goldCost: number, currencyCosts: readonly WowApi.GarrisonTalentCurrencyCostInfo[]]>;
  function GetTalentTreeTalentPointResearchInfo(this: void, garrTalentID: number, researchRank: number, garrTalentTreeID: number, talentPointIndex: number, isRespec: boolean): LuaMultiReturn<[goldCost: number, currencyCosts: readonly WowApi.GarrisonTalentCurrencyCostInfo[], durationSecs: number]>;
  function GetTalentUnlockWorldQuest(this: void, talentID: number): number | undefined;
  function HasAdventures(this: void): boolean;
  function IsAtGarrisonMissionNPC(this: void): boolean;
  function IsEnvironmentCountered(this: void, missionID: number): boolean;
  function IsFollowerOnCompletedMission(this: void, followerID: string): boolean;
  function IsLandingPageMinimapButtonVisible(this: void, garrType: number): boolean;
  function IsTalentConditionMet(this: void, talentID: number): LuaMultiReturn<[isMet: boolean, failureString: string | undefined]>;
  function RegenerateCombatLog(this: void, missionID: number): boolean;
  function RemoveFollowerFromMission(this: void, missionID: number, followerID: string, boardIndex?: number | undefined): void;
  function RushHealAllFollowers(this: void, followerType: number): void;
  function RushHealFollower(this: void, garrFollowerID: string): void;
  function SetAutoCombatSpellFastForward(this: void, state: boolean): void;

}

declare namespace C_GenericWidgetDisplay {
  function Acknowledge(this: void): void;
  function Close(this: void): void;

}

declare namespace C_Glue {
  function IsFirstLoadThisSession(this: void): boolean;
  function IsOnGlueScreen(this: void): boolean;

}

declare namespace C_GlyphInfo {

}

declare namespace C_GMTicketInfo {

}

declare namespace C_GossipInfo {
  function CloseGossip(this: void): void;
  function ForceGossip(this: void): boolean;
  function GetActiveQuests(this: void): readonly WowApi.GossipQuestUIInfo[];
  function GetAvailableQuests(this: void): readonly WowApi.GossipQuestUIInfo[];
  function GetCompletedOptionDescriptionString(this: void): string | undefined;
  function GetCustomGossipDescriptionString(this: void): string | undefined;
  function GetFriendshipReputation(this: void, friendshipFactionID: number): WowApi.FriendshipReputationInfo | undefined;
  function GetFriendshipReputationRanks(this: void, friendshipFactionID: number): WowApi.FriendshipReputationRankInfo;
  function GetNumActiveQuests(this: void): number;
  function GetNumAvailableQuests(this: void): number;
  function GetOptions(this: void): readonly WowApi.GossipOptionUIInfo[];
  function GetOptionUIWidgetSetsAndTypesByOptionID(this: void, gossipOptionID: number): readonly WowApi.GossipOptionUIWidgetSetAndType[] | undefined;
  function GetPoiForUiMapID(this: void, uiMapID: number): number | undefined;
  function GetPoiInfo(this: void, uiMapID: number, gossipPoiID: number): WowApi.GossipPoiInfo | undefined;
  function GetText(this: void): string;
  function RefreshOptions(this: void): void;
  function SelectActiveQuest(this: void, optionID: number): void;
  function SelectAvailableQuest(this: void, optionID: number): void;
  function SelectOption(this: void, optionID: number, text?: string | undefined, confirmed?: boolean | undefined): void;
  function SelectOptionByIndex(this: void, optionID: number, text?: string | undefined, confirmed?: boolean | undefined): void;

}

declare namespace C_GuildBank {
  function IsGuildBankEnabled(this: void): boolean;

}

declare namespace C_GuildInfo {
  function AreGuildEventsEnabled(this: void): boolean;
  function CanEditOfficerNote(this: void): boolean;
  function CanSpeakInGuildChat(this: void): boolean;
  function CanViewOfficerNote(this: void): boolean;
  function Demote(this: void, name: string): void;
  function Disband(this: void): void;
  function GetGuildNewsInfo(this: void, index: number): WowApi.GuildNewsInfo | undefined;
  function GetGuildRankOrder(this: void, guid: string): number;
  function GetGuildTabardInfo(this: void, unit?: string | undefined): WowApi.GuildTabardInfo | undefined;
  function GetInfoText(this: void): string;
  function GetMOTD(this: void): string;
  function GetPreferredPlaySettings(this: void): LuaMultiReturn<[loaded: boolean, preferredLocaleID: number, preferredDatacenterLocalityID: number, lastPreferredLocaleChangeDate: number, lastPreferredDatacenterLocalityChangeDate: number, changeCooldownDays: number]>;
  function GetPreferredPlaySettingsFeatures(this: void): LuaMultiReturn<[canChangeLocale: boolean, canChangeDatacenterLocality: boolean]>;
  function GuildControlGetRankFlags(this: void, rankOrder: number): readonly boolean[];
  function GuildRoster(this: void): void;
  function Invite(this: void, name: string): void;
  function IsDiscordStreamSeparate(this: void): boolean;
  function IsEncounterGuildNewsEnabled(this: void): boolean;
  function IsGuildOfficer(this: void): boolean;
  function IsGuildRankAssignmentAllowed(this: void, guid: string, rankOrder: number): boolean;
  function IsGuildReputationEnabled(this: void): boolean;
  function Leave(this: void): void;
  function MemberExistsByName(this: void, name: string): boolean;
  function Promote(this: void, name: string): void;
  function QueryGuildMemberRecipes(this: void, guildMemberGUID: string, skillLineID: number): void;
  function QueryGuildMembersForRecipe(this: void, skillLineID: number, recipeSpellID: number, recipeLevel?: number | undefined): number | undefined;
  function RemoveFromGuild(this: void, guid: string): void;
  function RequestGuildRename(this: void, desiredName: string): void;
  function RequestGuildRenameRefund(this: void): void;
  function RequestPreferredPlaySettings(this: void): boolean;
  function RequestRenameNameCheck(this: void, desiredName: string): void;
  function RequestRenameStatus(this: void): boolean;
  function SetGuildRankOrder(this: void, guid: string, rankOrder: number): void;
  function SetInfoText(this: void, infoText: string): void;
  function SetLeader(this: void, name: string): void;
  function SetMOTD(this: void, motd: string): void;
  function SetNote(this: void, guid: string, note: string, isPublic: boolean): void;
  function SetPreferredPlaySettings(this: void, preferredLocaleID?: number, preferredDatacenterLocalityID?: number): boolean;
  function Uninvite(this: void, name: string): void;

}

declare namespace C_HeirloomInfo {
  function AreAllCollectionFiltersChecked(this: void): boolean;
  function AreAllSourceFiltersChecked(this: void): boolean;
  function HeirloomsAvailable(this: void): boolean;
  function IsHeirloomSourceValid(this: void, source: number): boolean;
  function IsUsingDefaultFilters(this: void): boolean;
  function SetAllCollectionFilters(this: void, checked: boolean): void;
  function SetAllSourceFilters(this: void, checked: boolean): void;
  function SetDefaultFilters(this: void): void;

}

declare namespace C_HouseEditor {
  function ActivateHouseEditorMode(this: void, editMode: WowApi.HouseEditorMode): WowApi.HousingResult;
  function EnterHouseEditor(this: void): WowApi.HousingResult;
  function GetActiveHouseEditorMode(this: void): WowApi.HouseEditorMode;
  function GetHouseEditorAvailability(this: void): WowApi.HousingResult;
  function GetHouseEditorModeAvailability(this: void, editMode: WowApi.HouseEditorMode): WowApi.HousingResult;
  function GetHouseEditorPlayerType(this: void): WowApi.HouseEditorPlayerType;
  function IsHouseEditorActive(this: void): boolean;
  function IsHouseEditorModeActive(this: void, editMode: WowApi.HouseEditorMode): boolean;
  function IsHouseEditorStatusAvailable(this: void): boolean;
  function LeaveHouseEditor(this: void): void;

}

declare namespace C_HouseExterior {
  function CancelActiveExteriorEditing(this: void): void;
  function GetCoreFixtureOptionsInfo(this: void, coreFixtureType: WowApi.HousingFixtureType): WowApi.HousingCoreFixtureInfo | undefined;
  function GetCurrentHouseExteriorSize(this: void): WowApi.HousingFixtureSize | undefined;
  function GetCurrentHouseExteriorType(this: void): LuaMultiReturn<[houseExteriorTypeID: number | undefined, houseExteriorTypeName: string | undefined]>;
  function GetHouseExteriorSizeOptions(this: void): WowApi.HouseExteriorSizeOptionsInfo | undefined;
  function GetHouseExteriorTypeOptions(this: void): WowApi.HouseExteriorTypeOptionsInfo | undefined;
  function GetSelectedFixturePointInfo(this: void): WowApi.HousingFixturePointInfo | undefined;
  function HasHoveredFixture(this: void): boolean;
  function HasSelectedFixturePoint(this: void): boolean;
  function IsAnyDecorAttachedToCoreFixture(this: void, coreFixtureType: WowApi.HousingFixtureType): boolean;
  function IsAnyDecorAttachedToDoor(this: void): boolean;
  function IsAnyDecorAttachedToHouseExterior(this: void): boolean;
  function IsAnyDecorAttachedToSelectedFixturePoint(this: void): boolean;
  function IsExteriorDecorHidden(this: void): boolean;
  function RemoveFixtureFromSelectedPoint(this: void, attachedDecorAction?: WowApi.HousingFixtureDecorAction): void;
  function SelectCoreFixtureOption(this: void, fixtureID: number, attachedDecorAction?: WowApi.HousingFixtureDecorAction): void;
  function SelectFixtureOption(this: void, fixtureID: number, attachedDecorAction?: WowApi.HousingFixtureDecorAction): void;
  function SetExteriorDecorHidden(this: void, decorHidden: boolean): void;
  function SetHouseExteriorSize(this: void, size: WowApi.HousingFixtureSize, attachedDecorAction?: WowApi.HousingFixtureDecorAction): void;
  function SetHouseExteriorType(this: void, houseExteriorTypeID: number, attachedDecorAction?: WowApi.HousingFixtureDecorAction): void;

}

declare namespace C_Housing {
  function AcceptNeighborhoodOwnership(this: void): void;
  function CanEditCharter(this: void): boolean;
  function CanTakeReportScreenshot(this: void, plotIndex: number): WowApi.InvalidPlotScreenshotReason;
  function CreateGuildNeighborhood(this: void, neighborhoodName: string): void;
  function CreateNeighborhoodCharter(this: void, neighborhoodName: string): void;
  function DeclineNeighborhoodOwnership(this: void): void;
  function DoesFactionMatchNeighborhood(this: void, neighborhoodGUID: string): boolean;
  function EditNeighborhoodCharter(this: void, neighborhoodName: string): void;
  function GetCurrentHouseInfo(this: void): WowApi.HouseInfo | undefined;
  function GetCurrentHouseLevelFavor(this: void, houseGuid: string): void;
  function GetCurrentHouseRefundAmount(this: void): number;
  function GetCurrentNeighborhoodGUID(this: void): string | undefined;
  function GetHouseLevelFavorForLevel(this: void, level: number): number;
  function GetHouseLevelRewardsForLevel(this: void, level: number): void;
  function GetHousingAccessFlags(this: void): WowApi.HouseSettingFlags;
  function GetMaxHouseLevel(this: void): number;
  function GetNeighborhoodTextureSuffix(this: void, neighborhoodGUID: string): string;
  function GetOthersOwnedHouses(this: void, playerGUID: string | undefined, bnetID: number | undefined, isInPlayersGuild: boolean): void;
  function GetPlayerOwnedHouses(this: void): void;
  function GetTrackedHouseGuid(this: void): string | undefined;
  function GetUIMapIDForNeighborhood(this: void, neighborhoodGuid: string): number | undefined;
  function GetVisitCooldownInfo(this: void): WowApi.SpellCooldownInfo | undefined;
  function HasHousingExpansionAccess(this: void): boolean;
  function HouseFinderDeclineNeighborhoodInvitation(this: void): void;
  function HouseFinderIgnoreNeighborhood(this: void, neighborhoodGuid: string): void;
  function HouseFinderRequestNeighborhoods(this: void): void;
  function HouseFinderRequestReservationAndPort(this: void, neighborhoodGuid: string, plotID: number): void;
  function IsHousingMarketCartFullRemoveEnabled(this: void): boolean;
  function IsHousingMarketEnabled(this: void): boolean;
  function IsHousingMarketShopEnabled(this: void): boolean;
  function IsHousingServiceEnabled(this: void): boolean;
  function IsInsideHouse(this: void): boolean;
  function IsInsideHouseOrPlot(this: void): boolean;
  function IsInsideOwnedHouse(this: void): boolean;
  function IsInsideOwnedHouseOrPlot(this: void): boolean;
  function IsInsideOwnedPlot(this: void): boolean;
  function IsInsidePlot(this: void): boolean;
  function IsOnNeighborhoodMap(this: void): boolean;
  function LeaveHouse(this: void): void;
  function OnCharterConfirmationAccepted(this: void): void;
  function OnCharterConfirmationClosed(this: void): void;
  function OnCreateCharterNeighborhoodClosed(this: void): void;
  function OnCreateGuildNeighborhoodClosed(this: void): void;
  function OnHouseFinderClickPlot(this: void, plotID: number): void;
  function OnRequestSignatureClicked(this: void): void;
  function OnSignCharterClicked(this: void, charterOwnerGUID: string): void;
  function RelinquishHouse(this: void, houseGuid: string): void;
  function RequestCurrentHouseInfo(this: void): void;
  function RequestHouseFinderNeighborhoodData(this: void, neighborhoodGuid: string, neighborhoodName: string): void;
  function RequestPlayerCharacterList(this: void): void;
  function ResetHouse(this: void, resetScope: WowApi.HousingHouseScope): void;
  function ReturnAfterVisitingHouse(this: void): void;
  function SaveHouseSettings(this: void, playerGUID: string, accessFlags: WowApi.HouseSettingFlags): void;
  function SearchBNetFriendNeighborhoods(this: void, bnetName: string): boolean;
  function SearchBNetFriendNeighborhoodsByID(this: void, bnetID: number): boolean;
  function SetTrackedHouseGuid(this: void, trackedHouse?: string | undefined): void;
  function StartTutorial(this: void): void;
  function TeleportHome(this: void, neighborhoodGUID: string, houseGUID: string, plotID: number): void;
  function TryRenameNeighborhood(this: void, neighborhoodName: string): void;
  function ValidateCreateGuildNeighborhoodSize(this: void): void;
  function ValidateNeighborhoodName(this: void, neighborhoodName: string): void;
  function VisitHouse(this: void, neighborhoodGUID: string, houseGUID: string, plotID: number): void;

}

declare namespace C_HousingBasicMode {
  function CancelActiveEditing(this: void): void;
  function CommitDecorMovement(this: void): void;
  function CommitHouseExteriorPosition(this: void): void;
  function FinishPlacingNewDecor(this: void): void;
  function GetHoveredDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetSelectedDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function IsDecorSelected(this: void): boolean;
  function IsFreePlaceEnabled(this: void): boolean;
  function IsGridSnapEnabled(this: void): boolean;
  function IsGridVisible(this: void): boolean;
  function IsHouseExteriorHovered(this: void): boolean;
  function IsHouseExteriorSelected(this: void): boolean;
  function IsHoveringDecor(this: void): boolean;
  function IsPlacingNewDecor(this: void): boolean;
  function RemoveSelectedDecor(this: void): void;
  function RotateDecor(this: void, rotDegrees: number): void;
  function RotateHouseExterior(this: void, rotDegrees: number): void;
  function SetFreePlaceEnabled(this: void, freePlaceEnabled: boolean): void;
  function SetGridSnapEnabled(this: void, isGridSnapEnabled: boolean): void;
  function SetGridVisible(this: void, gridVisible: boolean): void;
  function StartPlacingNewDecor(this: void, catalogEntryVariantID: WowApi.HousingCatalogEntryVariantID): void;
  function StartPlacingPreviewDecor(this: void, decorRecordID: number, bundleCatalogShopProductID?: number | undefined): void;

}

declare namespace C_HousingBlueprint {
  function CanExportRoom(this: void, roomGUID: string): boolean;
  function CanExportTypeFromCurrentLocation(this: void, type: WowApi.HousingBlueprintType): boolean;
  function CanImportTypeFromCurrentLocation(this: void, type: WowApi.HousingBlueprintType): boolean;
  function DeleteBlueprint(this: void, blueprintID: number): void;
  function ExportBlueprint(this: void, type: WowApi.HousingBlueprintType, name: string): void;
  function ExportRoomBlueprint(this: void, name: string, roomGUID: string): void;
  function GetBlueprintHyperlink(this: void, blueprintShareCode: string): string | undefined;
  function GetBlueprintTypeForCode(this: void, shareCode: string): WowApi.HousingBlueprintType;
  function GetExportAvailability(this: void): WowApi.HousingResult;
  function GetFeatureAvailability(this: void): WowApi.HousingResult;
  function GetImportAvailability(this: void): WowApi.HousingResult;
  function ImportBlueprint(this: void, shareCode: string): void;
  function IsShareCodeValid(this: void, shareCode: string): boolean;
  function RenameBlueprint(this: void, blueprintID: number, newName: string): void;
  function RequestBlueprintCollection(this: void): void;
  function RequestBlueprintContents(this: void, shareCode: string): void;
  function RequestBlueprintContentsForContext(this: void, shareCode: string, optionalHouseGUID?: string | undefined): void;
  function StartImportRoomBlueprint(this: void, shareCode: string): void;
  function UpdateBlueprintStringFromInput(this: void, inputShareCode: string): string | undefined;

}

declare namespace C_HousingCatalog {
  function CreateCatalogSearcher(this: void): WowApi.HousingCatalogSearcher;
  function DeletePreviewCartDecor(this: void, decorGUID: string): void;
  function DestroyEntry(this: void, entryVariantID: WowApi.HousingCatalogEntryVariantID, destroyAll: boolean): void;
  function GetAllFilterTagGroups(this: void): readonly WowApi.HousingCatalogFilterTagGroupInfo[];
  function GetAllVariantInfosForEntry(this: void, entryID: WowApi.HousingCatalogEntryID): readonly WowApi.HousingCatalogEntryVariantInfo[];
  function GetBundleInfo(this: void, bundleCatalogShopProductID: number): WowApi.HousingBundleInfo | undefined;
  function GetCartSizeLimit(this: void): number;
  function GetCatalogCategoryAndSubcategoryNames(this: void, subcategoryID: number): LuaMultiReturn<[categoryName: string, subcategoryName: string]> | undefined;
  function GetCatalogCategoryInfo(this: void, categoryID: number): WowApi.HousingCatalogCategoryInfo | undefined;
  function GetCatalogEntryInfo(this: void, entryID: WowApi.HousingCatalogEntryID): WowApi.HousingCatalogEntryInfo | undefined;
  function GetCatalogEntryInfoByItem(this: void, itemInfo: number | string): WowApi.HousingCatalogEntryInfo | undefined;
  function GetCatalogEntryInfoByRecordID(this: void, entryType: WowApi.HousingCatalogEntryType, recordID: number): WowApi.HousingCatalogEntryInfo | undefined;
  function GetCatalogEntryRefundTimeStampByRecordID(this: void, entryType: WowApi.HousingCatalogEntryType, recordID: number): number | undefined;
  function GetCatalogEntryVariantInfo(this: void, entryVariantID: WowApi.HousingCatalogEntryVariantID): WowApi.HousingCatalogEntryVariantInfo | undefined;
  function GetCatalogSubcategoryInfo(this: void, subcategoryID: number): WowApi.HousingCatalogSubcategoryInfo | undefined;
  function GetDecorMaxOwnedCount(this: void): number;
  function GetDecorTotalOwnedCount(this: void): LuaMultiReturn<[totalOwnedCount: number, exemptDecorCount: number]>;
  function GetDestroyableInstanceCount(this: void, entryVariantID: WowApi.HousingCatalogEntryVariantID): number;
  function GetFeaturedBundles(this: void): readonly WowApi.HousingBundleInfo[];
  function GetFeaturedSmallProducts(this: void): readonly WowApi.HousingFeaturedSmallProductInfo[];
  function GetMarketInfoForDecor(this: void, decorID: number): WowApi.HousingMarketInfo | undefined;
  function HasFeaturedEntries(this: void): boolean;
  function HousingMarketActionAddToCart(this: void, productID: number, withPreview: boolean): void;
  function HousingMarketActionClearCart(this: void): void;
  function HousingMarketActionRemoveFromCart(this: void, productID: number): void;
  function HousingMarketActionViewBundle(this: void, productID: number): void;
  function HousingMarketActionViewInStore(this: void, productID: number): void;
  function IsPreviewCartItemShown(this: void, decorGUID: string): boolean;
  function PromotePreviewDecor(this: void, decorID: number, previewDecorGUID: string): boolean;
  function RequestHousingMarketInfoRefresh(this: void): void;
  function RequestHousingMarketRefundInfo(this: void): void;
  function SearchCatalogCategories(this: void, searchParams: WowApi.HousingCategorySearchInfo): readonly number[];
  function SearchCatalogSubcategories(this: void, searchParams: WowApi.HousingCategorySearchInfo): readonly number[];
  function SetPreviewCartItemShown(this: void, decorGUID: string, shown: boolean): void;

}

declare namespace C_HousingCleanupMode {
  function GetHoveredDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function IsHoveringDecor(this: void): boolean;
  function RemoveSelectedDecor(this: void): void;

}

declare namespace C_HousingCustomizeMode {
  function ApplyDyeToSelectedDecor(this: void, dyeSlotID: number, dyeColorID?: number | undefined): void;
  function ApplyPetToSelectedDecor(this: void, petID: string | undefined, petBehavior: WowApi.HousingPetBehaviorType): void;
  function ApplyThemeToRoom(this: void, themeSetID: number): void;
  function ApplyThemeToSelectedRoomComponent(this: void, themeSetID: number): void;
  function ApplyWallpaperToAllWalls(this: void, roomComponentTextureRecID: number): void;
  function ApplyWallpaperToSelectedRoomComponent(this: void, roomComponentTextureRecID: number): void;
  function CancelActiveEditing(this: void): void;
  function ClearDyesForSelectedDecor(this: void): void;
  function ClearTargetRoomComponent(this: void): void;
  function CommitDyesForSelectedDecor(this: void): boolean;
  function GetHoveredDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetHoveredRoomComponentInfo(this: void): WowApi.HousingRoomComponentInstanceInfo | undefined;
  function GetNumDyesToRemoveOnSelectedDecor(this: void): number;
  function GetNumDyesToSpendOnSelectedDecor(this: void): number;
  function GetPreviewDyesOnSelectedDecor(this: void): readonly WowApi.PreviewDyeSlotInfo[];
  function GetRecentlyUsedDyes(this: void): readonly number[];
  function GetRecentlyUsedThemeSets(this: void): readonly number[];
  function GetRecentlyUsedWallpapers(this: void): readonly number[];
  function GetSelectedDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetSelectedDecorPetInfo(this: void): LuaMultiReturn<[petID: string | undefined, petBehavior: WowApi.HousingPetBehaviorType]>;
  function GetSelectedRoomComponentInfo(this: void): WowApi.HousingRoomComponentInstanceInfo | undefined;
  function GetThemeSetInfo(this: void, themeSetID: number): string | undefined;
  function GetWallpapersForRoomComponentType(this: void, type: WowApi.HousingRoomComponentType): readonly WowApi.RoomComponentWallpaper[];
  function IsDecorSelected(this: void): boolean;
  function IsHouseExteriorDoorHovered(this: void): boolean;
  function IsHoveringDecor(this: void): boolean;
  function IsHoveringRoomComponent(this: void): boolean;
  function IsRoomComponentSelected(this: void): boolean;
  function RoomComponentSupportsVariant(this: void, componentID: number, variant: number): boolean;
  function RoomConnectionSupportsDoorType(this: void, roomGUID: string, componentID: number, newDoortype: WowApi.HousingRoomComponentDoorType): boolean;
  function SetRoomComponentCeilingType(this: void, roomGUID: string, componentID: number, ceilingType: WowApi.HousingRoomComponentCeilingType): void;
  function SetRoomComponentDoorType(this: void, roomGUID: string, componentID: number, newDoortype: WowApi.HousingRoomComponentDoorType): void;

}

declare namespace C_HousingDecor {
  function AnyDecorPlacedInRoom(this: void, roomGUID: string): boolean;
  function CancelActiveEditing(this: void): void;
  function CommitDecorMovement(this: void): void;
  function EnterPreviewState(this: void): void;
  function ExitPreviewState(this: void): void;
  function GetAllMaxPlacementBudgets(this: void): LuaMultiReturn<[interiorMaxBudgets: readonly number[] | undefined, exteriorMaxBudgets: readonly number[] | undefined]>;
  function GetAllPlacedDecor(this: void): readonly WowApi.HousingDecorInstanceListEntry[];
  function GetAllSpentPlacementBudgets(this: void): LuaMultiReturn<[interiorSpentBudgets: readonly number[] | undefined, exteriorSpentBudgets: readonly number[] | undefined]>;
  function GetDecorAssignedPetName(this: void, decorGUID: string): string | undefined;
  function GetDecorCanAttachPet(this: void, decorID: number): boolean;
  function GetDecorHyperlink(this: void, decorID: number): string | undefined;
  function GetDecorIcon(this: void, decorID: number): number | undefined;
  function GetDecorInstanceInfoForGUID(this: void, decorGUID: string): WowApi.HousingDecorInstanceInfo | undefined;
  function GetDecorName(this: void, decorID: number): string | undefined;
  function GetHoveredDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetMaxPetPlacementBudget(this: void): number | undefined;
  function GetMaxPlacementBudget(this: void): number | undefined;
  function GetNumDecorPlaced(this: void): number;
  function GetNumPreviewDecor(this: void): number;
  function GetSelectedDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetSpentPetPlacementBudget(this: void): number | undefined;
  function GetSpentPlacementBudget(this: void): number | undefined;
  function HasMaxPlacementBudget(this: void): boolean;
  function IsDecorSelected(this: void): boolean;
  function IsGridVisible(this: void): boolean;
  function IsHouseExteriorDoorHovered(this: void): boolean;
  function IsHouseExteriorHovered(this: void): boolean;
  function IsHoveringDecor(this: void): boolean;
  function IsModeDisabledForPreviewState(this: void, mode: WowApi.HouseEditorMode): boolean;
  function IsPreviewState(this: void): boolean;
  function RemovePlacedDecorEntry(this: void, decorGUID: string): void;
  function RemoveSelectedDecor(this: void): void;
  function SetGridVisible(this: void, gridVisible: boolean): void;
  function SetPlacedDecorEntryHovered(this: void, decorGUID: string, hovered: boolean): void;
  function SetPlacedDecorEntrySelected(this: void, decorGUID: string, selected: boolean): void;

}

declare namespace C_HousingExpertMode {
  function CancelActiveEditing(this: void): void;
  function CommitDecorMovement(this: void): void;
  function CommitHouseExteriorPosition(this: void): void;
  function GetHoveredDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function GetPrecisionSubmode(this: void): WowApi.HousingPrecisionSubmode | undefined;
  function GetPrecisionSubmodeRestriction(this: void, subMode: WowApi.HousingPrecisionSubmode): WowApi.HousingExpertSubmodeRestriction;
  function GetSelectedDecorInfo(this: void): WowApi.HousingDecorInstanceInfo | undefined;
  function IsDecorSelected(this: void): boolean;
  function IsGridVisible(this: void): boolean;
  function IsHouseExteriorHovered(this: void): boolean;
  function IsHouseExteriorSelected(this: void): boolean;
  function IsHoveringDecor(this: void): boolean;
  function RemoveSelectedDecor(this: void): void;
  function ResetPrecisionChanges(this: void, activeSubmodeOnly: boolean): void;
  function SelectNextRotationAxis(this: void): void;
  function SetGridVisible(this: void, gridVisible: boolean): void;
  function SetPrecisionIncrementingActive(this: void, incrementType: WowApi.HousingIncrementType, active: boolean): void;
  function SetPrecisionSubmode(this: void, subMode: WowApi.HousingPrecisionSubmode): void;

}

declare namespace C_HousingInspectMode {
  function EnterInspectMode(this: void): void;
  function ExitInspectMode(this: void): void;
  function GetHoveredDecorGUID(this: void): string;
  function IsHoveringDecor(this: void): boolean;
  function IsInInspectMode(this: void): boolean;

}

declare namespace C_HousingLayout {
  function AnyRoomsOnFloor(this: void, floor: number): boolean;
  function CancelActiveLayoutEditing(this: void): void;
  function CanSetViewedFloor(this: void, floor: number): boolean;
  function ConfirmStairChoice(this: void, choice?: WowApi.HousingLayoutStairDirection | undefined): void;
  function DeselectFloorplan(this: void): void;
  function DeselectRoomOrDoor(this: void): void;
  function GetBaseRoomFloor(this: void): number;
  function GetHighestOccupiedFloorIndex(this: void): number;
  function GetLowestOccupiedFloorIndex(this: void): number;
  function GetNumActiveRooms(this: void): number;
  function GetRoomPlacementBudget(this: void): number | undefined;
  function GetRoomPlayerIsIn(this: void): string | undefined;
  function GetSelectedBlueprintFloorplan(this: void): LuaMultiReturn<[roomID: number, shareCode: string]> | undefined;
  function GetSelectedDoor(this: void): LuaMultiReturn<[selectedDoorComponentID: number, roomGUID: string]> | undefined;
  function GetSelectedFloorplan(this: void): number | undefined;
  function GetSelectedRoom(this: void): string | undefined;
  function GetSelectedStairwellRoomCount(this: void): number;
  function GetSpentPlacementBudget(this: void): number | undefined;
  function GetViewedFloor(this: void): number;
  function HasAnySelections(this: void): boolean;
  function HasRoomPlacementBudget(this: void): boolean;
  function HasSelectedBlueprintFloorplan(this: void): boolean;
  function HasSelectedDoor(this: void): boolean;
  function HasSelectedFloorplan(this: void): boolean;
  function HasSelectedRoom(this: void): boolean;
  function HasStairs(this: void, roomRecordID: number): boolean;
  function HasValidConnection(this: void, roomGUID: string, componentID: number, roomId: number): boolean;
  function IsBaseRoom(this: void, roomGUID: string): boolean;
  function IsDraggingRoom(this: void): LuaMultiReturn<[isDragging: boolean, isAccessibleDrag: boolean]>;
  function MoveDraggedRoom(this: void, sourceDoorIndex: number, destRoom: string, destDoorIndex: number): void;
  function MoveLayoutCamera(this: void, direction: WowApi.HousingLayoutCameraDirection, isPressed: boolean): void;
  function RemoveRoom(this: void, roomGUID: string): void;
  function RoomHasStairs(this: void, roomGUID: string): boolean;
  function RotateFocusedRoom(this: void, isLeft: boolean): void;
  function RotateRoom(this: void, roomGUID: string, isLeft: boolean): void;
  function SelectFloorplan(this: void, roomID: number): void;
  function SetViewedFloor(this: void, floor: number): void;
  function StartDrag(this: void): void;
  function StopDrag(this: void): void;
  function StopDraggingRoom(this: void): void;
  function ZoomLayoutCamera(this: void, zoomIn: boolean): boolean;

}

declare namespace C_HousingNeighborhood {
  function CancelInviteToNeighborhood(this: void, playerName: string): void;
  function CanReturnAfterVisitingHouse(this: void): boolean;
  function DemoteToResident(this: void, playerGUID: string): void;
  function GetCornerstoneHouseInfo(this: void): WowApi.HouseInfo;
  function GetCornerstoneNeighborhoodInfo(this: void): WowApi.NeighborhoodInfo;
  function GetCornerstonePurchaseMode(this: void): WowApi.CornerstonePurchaseMode;
  function GetCurrentNeighborhoodTextureSuffix(this: void): string;
  function GetDiscountedMovePrice(this: void): number;
  function GetMoveCooldownTime(this: void): number;
  function GetNeighborhoodMapData(this: void): readonly WowApi.NeighborhoodPlotMapInfo[];
  function GetNeighborhoodName(this: void): string;
  function GetNeighborhoodPlotName(this: void, plotIndex: number): string;
  function GetPreviousHouseIdentifier(this: void): string;
  function HasPermissionToPurchase(this: void): WowApi.PurchaseHouseDisabledReason;
  function InvitePlayerToNeighborhood(this: void, playerName: string): void;
  function IsNeighborhoodManager(this: void): boolean;
  function IsNeighborhoodOwner(this: void): boolean;
  function IsPlayerInOtherPlayersPlot(this: void): boolean;
  function IsPlotAvailableForPurchase(this: void): boolean;
  function IsPlotOwnedByPlayer(this: void): boolean;
  function OnBulletinBoardClosed(this: void): void;
  function OnCornerstoneClosed(this: void): void;
  function PromoteToManager(this: void, playerGUID: string): void;
  function RequestNeighborhoodInfo(this: void): void;
  function RequestNeighborhoodRoster(this: void): void;
  function RequestPendingNeighborhoodInvites(this: void): void;
  function TransferNeighborhoodOwnership(this: void, playerGUID: string): void;
  function TryEvictPlayer(this: void, plotID: number): void;
  function TryMoveHouse(this: void): void;
  function TryPurchasePlot(this: void): void;

}

declare namespace C_ImmersiveInteraction {
  function HasImmersiveInteraction(this: void): boolean;

}

declare namespace C_IncomingSummon {
  function HasIncomingSummon(this: void, unit: string): boolean;
  function IncomingSummonStatus(this: void, unit: string): WowApi.SummonStatus;

}

declare namespace C_InputInterfaceStyle {
  function GetCurrentStyle(this: void): WowApi.InputDeviceInterfaceType;

}

declare namespace C_InstanceEncounter {
  function IsEncounterInProgress(this: void): boolean;
  function IsEncounterLimitingResurrections(this: void): boolean;
  function IsEncounterSuppressingRelease(this: void): boolean;
  function ShouldShowTimelineForEncounter(this: void): boolean;

}

declare namespace C_InstanceLeaver {
  function IsPlayerLeaver(this: void): boolean;

}

declare namespace C_InterfaceFileManifest {
  function GetInterfaceArtFiles(this: void): readonly string[] | undefined;

}

declare namespace C_Intl {
  function CompareStrings(this: void, left: string, right: string, strength: WowApi.CollationStrength): number | undefined;
  function CreateLocaleContext(this: void, locale: string): WowApi.LuaLocaleContext;
  function FindBreaks(this: void, text: string, breakType: WowApi.BreakType): readonly number[] | undefined;
  function FindStringMatches(this: void, text: string, pattern: string, strength: WowApi.CollationStrength): readonly number[] | undefined;
  function FoldCase(this: void, text: string): string | undefined;
  function FormatCurrency(this: void, number: number, currencyCode: string): string | undefined;
  function FormatDate(this: void, unixTimeSeconds: number, style: WowApi.DateTimeStyle, timeZone: string): string | undefined;
  function FormatDateTime(this: void, unixTimeSeconds: number, dateStyle: WowApi.DateTimeStyle, timeStyle: WowApi.DateTimeStyle, timeZone: string): string | undefined;
  function FormatNumber(this: void, number: number, style: WowApi.NumberStyle): string | undefined;
  function FormatTime(this: void, unixTimeSeconds: number, style: WowApi.DateTimeStyle, timeZone: string): string | undefined;
  function GetCharacterProperties(this: void, text: string): WowApi.CharacterProperties | undefined;
  function GetCurrencyFractionDigits(this: void, currencyCode: string): number | undefined;
  function GetCurrencyName(this: void, currencyCode: string, nameStyle: WowApi.CurrencyNameStyle): string | undefined;
  function GetCurrentLocale(this: void): string;
  function GetDisplayName(this: void, displayLocale: string): string | undefined;
  function GetSortKey(this: void, text: string, strength: WowApi.CollationStrength): string | undefined;
  function IsNormalized(this: void, text: string, form: WowApi.NormalizationForm): boolean;
  function Length(this: void, text: string): number | undefined;
  function Normalize(this: void, text: string, form: WowApi.NormalizationForm): string | undefined;
  function ParseCurrency(this: void, text: string): WowApi.CurrencyParseResult | undefined;
  function ParseNumber(this: void, text: string, style: WowApi.NumberStyle): number | undefined;
  function SelectPlural(this: void, number: number, pluralType: WowApi.PluralType): string | undefined;
  function ToLower(this: void, text: string): string | undefined;
  function ToTitle(this: void, text: string): string | undefined;
  function ToUpper(this: void, text: string): string | undefined;
  function TransformLocale(this: void, transform: WowApi.LocaleTransform): string | undefined;
  function Transliterate(this: void, text: string, transliteratorID: string): string | undefined;

}

declare namespace C_InvasionInfo {
  function AreInvasionsAvailable(this: void): boolean;
  function GetInvasionForUiMapID(this: void, uiMapID: number): number | undefined;
  function GetInvasionInfo(this: void, invasionID: number): WowApi.InvasionMapInfo | undefined;
  function GetInvasionTimeLeft(this: void, invasionID: number): number | undefined;

}

declare namespace C_IslandsInfo {

}

declare namespace C_IslandsQueue {
  function CloseIslandsQueueScreen(this: void): void;
  function GetIslandDifficultyInfo(this: void): readonly WowApi.IslandsQueueDifficultyInfo[];
  function GetIslandsMaxGroupSize(this: void): number;
  function GetIslandsWeeklyQuestID(this: void): number | undefined;
  function QueueForIsland(this: void, difficultyID: number): void;
  function RequestPreloadRewardData(this: void, questId: number): void;

}

declare namespace C_Item {
  function ActionBindsItem(this: void): void;
  function BindEnchant(this: void): void;
  function CanBeRefunded(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function CanItemTransmogAppearance(this: void, itemLoc: WowApi.ItemLocation): LuaMultiReturn<[canTransmog: boolean, errorCode: WowApi.TransmogOutfitSlotError]>;
  function CanScrapItem(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function CanViewItemPowers(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function ConfirmBindOnUse(this: void): void;
  function ConfirmDeleteItem(this: void, itemGUID: string): void;
  function ConfirmNoRefundOnUse(this: void): void;
  function ConfirmOnUse(this: void): void;
  function DeleteItem(this: void, itemGUID: string): void;
  function DoesItemContainSpec(this: void, itemInfo: number | string, classID: number, specID?: number): boolean;
  function DoesItemExist(this: void, emptiableItemLocation: WowApi.EmptiableItemLocation): boolean;
  function DoesItemExistByID(this: void, itemInfo: number | string): boolean;
  function DoesItemMatchBonusTreeReplacement(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function DoesItemMatchSpellItemCondition(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function DoesItemMatchTargetEnchantingSpell(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function DoesItemMatchTrackJump(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function DropItemOnUnit(this: void, unitGUID: string): void;
  function EndBoundTradeable(this: void, type: string): void;
  function EndRefund(this: void, type: number): void;
  function EquipItemByName(this: void, itemInfo: number | string, dstSlot?: number | undefined): void;
  function GetAppliedItemTransmogInfo(this: void, itemLoc: WowApi.ItemLocation): WowApi.ItemTransmogInfo | undefined;
  function GetBaseItemTransmogInfo(this: void, itemLoc: WowApi.ItemLocation): WowApi.ItemTransmogInfo | undefined;
  function GetCurrentItemLevel(this: void, itemLocation: WowApi.ItemLocation): number | undefined;
  function GetCurrentItemTransmogInfo(this: void, itemLoc: WowApi.ItemLocation): WowApi.ItemTransmogInfo | undefined;
  function GetDelvePreviewItemLink(this: void, itemID: number, context: WowApi.ItemCreationContext): string | undefined;
  function GetDelvePreviewItemQuality(this: void, itemID: number, context: WowApi.ItemCreationContext): WowApi.ItemQuality;
  function GetDetailedItemLevelInfo(this: void, itemInfo: number | string): LuaMultiReturn<[actualItemLevel: number, previewLevel: boolean, sparseItemLevel: number]> | undefined;
  function GetFirstTriggeredSpellForItem(this: void, itemID: number, itemQuality: number): number | undefined;
  function GetItemChildInfo(this: void, itemInfo: number | string, slotID?: number | undefined): readonly number[];
  function GetItemClassInfo(this: void, itemClassID: number): string;
  function GetItemConversionOutputIcon(this: void, itemLoc: WowApi.ItemLocation): number | undefined;
  function GetItemCooldown(this: void, itemInfo: number | string): LuaMultiReturn<[startTimeSeconds: number, durationSeconds: number, enableCooldownTimer: boolean]>;
  function GetItemCount(this: void, itemInfo: number | string, includeBank?: boolean, includeUses?: boolean, includeReagentBank?: boolean, includeAccountBank?: boolean): number;
  function GetItemCreationContext(this: void, itemInfo: number | string): LuaMultiReturn<[itemID: number, creationContext: string]>;
  function GetItemFamily(this: void, itemInfo: number | string): number | undefined;
  function GetItemGem(this: void, hyperlink: string, index: number): LuaMultiReturn<[gemName: string, gemLink: string]> | undefined;
  function GetItemGemID(this: void, itemInfo: number | string, index: number): number | undefined;
  function GetItemGUID(this: void, itemLocation: WowApi.ItemLocation): string;
  function GetItemIcon(this: void, itemLocation: WowApi.ItemLocation): number | undefined;
  function GetItemIconByID(this: void, itemInfo: number | string): number | undefined;
  function GetItemID(this: void, itemLocation: WowApi.ItemLocation): number;
  function GetItemIDByGUID(this: void, itemGUID: string): number | undefined;
  function GetItemIDForItemInfo(this: void, itemInfo: number | string): number;
  function GetItemInfo(this: void, itemInfo: number | string): LuaMultiReturn<[itemName: string, itemLink: string, itemQuality: WowApi.ItemQuality, itemLevel: number, itemMinLevel: number, itemType: string, itemSubType: string, itemStackCount: number, itemEquipLoc: string, itemTexture: number, sellPrice: number, classID: number, subclassID: number, bindType: number, expansionID: number, setID: number | undefined, isCraftingReagent: boolean, itemDescription: string]> | undefined;
  function GetItemInfoInstant(this: void, itemInfo: number | string): LuaMultiReturn<[itemID: number, itemType: string, itemSubType: string, itemEquipLoc: string, icon: number, classID: number, subClassID: number]> | undefined;
  function GetItemInventorySlotInfo(this: void, inventorySlot: WowApi.InventoryType): string;
  function GetItemInventorySlotKey(this: void, inventorySlot: WowApi.InventoryType): string;
  function GetItemInventoryType(this: void, itemLocation: WowApi.ItemLocation): WowApi.InventoryType | undefined;
  function GetItemInventoryTypeByID(this: void, itemInfo: number | string): WowApi.InventoryType | undefined;
  function GetItemLearnTransmogSet(this: void, itemInfo: number | string): number | undefined;
  function GetItemLink(this: void, itemLocation: WowApi.ItemLocation): string | undefined;
  function GetItemLinkByGUID(this: void, itemGUID: string): string | undefined;
  function GetItemLocation(this: void, itemGUID: string): WowApi.ItemLocation | undefined;
  function GetItemMaxStackSize(this: void, itemLocation: WowApi.ItemLocation): number | undefined;
  function GetItemMaxStackSizeByID(this: void, itemInfo: number | string): number | undefined;
  function GetItemName(this: void, itemLocation: WowApi.ItemLocation): string | undefined;
  function GetItemNameByID(this: void, itemInfo: number | string): string | undefined;
  function GetItemNumAddedSockets(this: void, itemInfo: number | string): number;
  function GetItemNumSockets(this: void, itemInfo: number | string): number;
  function GetItemQuality(this: void, itemLocation: WowApi.ItemLocation): WowApi.ItemQuality | undefined;
  function GetItemQualityByID(this: void, itemInfo: number | string): WowApi.ItemQuality | undefined;
  function GetItemQualityColor(this: void, quality: WowApi.ItemQuality): LuaMultiReturn<[colorRGBR: number, colorRGBG: number, colorRGBB: number, qualityString: string]>;
  function GetItemSetInfo(this: void, setID: number): string;
  function GetItemSpecInfo(this: void, itemInfo: number | string): readonly number[] | undefined;
  function GetItemSpell(this: void, itemInfo: number | string): LuaMultiReturn<[spellName: string, spellID: number]> | undefined;
  function GetItemStatDelta(this: void, itemLink1: string, itemLink2: string): unknown | undefined;
  function GetItemStats(this: void, itemLink: string): unknown | undefined;
  function GetItemSubClassInfo(this: void, itemClassID: number, itemSubClassID: number): LuaMultiReturn<[subClassName: string, subClassUsesInvType: boolean]> | undefined;
  function GetItemUniqueness(this: void, itemInfo: number | string): LuaMultiReturn<[limitCategory: number, limitMax: number]> | undefined;
  function GetItemUniquenessByID(this: void, itemInfo: number | string): LuaMultiReturn<[isUnique: boolean, limitCategoryName: string | undefined, limitCategoryCount: number | undefined, limitCategoryID: number | undefined]> | undefined;
  function GetItemUpgradeInfo(this: void, itemInfo: number | string): WowApi.ItemUpgradeInfo | undefined;
  function GetLimitedCurrencyItemInfo(this: void, itemInfo: number | string): LuaMultiReturn<[name: string, icon: number, quantity: number, maxQuantity: number, totalEarned: number]> | undefined;
  function GetSetBonusesForSpecializationByItemID(this: void, specID: number, itemID: number): readonly number[] | undefined;
  function GetStackCount(this: void, itemLocation: WowApi.ItemLocation): number;
  function GetWeaponEnchantInfo(this: void, weaponSlot: WowApi.WeaponSlot): readonly WowApi.WeaponEnchantInfo[];
  function IsAnimaItemByID(this: void, itemInfo: number | string): boolean;
  function IsArtifactPowerItem(this: void, itemInfo: number | string): boolean;
  function IsBound(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsBoundToAccountUntilEquip(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsConsumableItem(this: void, itemInfo: number | string): boolean;
  function IsCorruptedItem(this: void, itemInfo: number | string): boolean | undefined;
  function IsCosmeticItem(this: void, itemInfo: number | string): boolean | undefined;
  function IsCurioItem(this: void, itemInfo: number | string): boolean | undefined;
  function IsCurrentItem(this: void, itemInfo: number | string): boolean;
  function IsDecorItem(this: void, itemInfo: number | string): boolean | undefined;
  function IsDressableItemByID(this: void, itemInfo: number | string): boolean;
  function IsEquippableItem(this: void, itemInfo: number | string): boolean;
  function IsEquippedItem(this: void, itemInfo: number | string): boolean;
  function IsEquippedItemType(this: void, type: string): boolean;
  function IsHarmfulItem(this: void, itemInfo: number | string): boolean;
  function IsHelpfulItem(this: void, itemInfo: number | string): boolean;
  function IsItemBindToAccount(this: void, itemInfo: number | string): boolean;
  function IsItemBindToAccountUntilEquip(this: void, itemInfo: number | string): boolean;
  function IsItemConduit(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function IsItemConvertibleAndValidForPlayer(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function IsItemCorrupted(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function IsItemCorruptionRelated(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function IsItemCorruptionResistant(this: void, itemLoc: WowApi.ItemLocation): boolean;
  function IsItemDataCached(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsItemDataCachedByID(this: void, itemInfo: number | string): boolean;
  function IsItemGUIDInInventory(this: void, itemGUID: string): boolean;
  function IsItemInRange(this: void, itemInfo: number | string, targetToken: string): boolean | undefined;
  function IsItemKeystoneByID(this: void, itemInfo: number | string): boolean;
  function IsItemSpecificToPlayerClass(this: void, itemInfo: number | string): boolean;
  function IsLocked(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsRelicItem(this: void, itemInfo: number | string): boolean | undefined;
  function IsUsableItem(this: void, itemInfo: number | string): LuaMultiReturn<[usable: boolean, noMana: boolean]>;
  function ItemHasRange(this: void, itemInfo: number | string): boolean;
  function LockItem(this: void, itemLocation: WowApi.ItemLocation): void;
  function LockItemByGUID(this: void, itemGUID: string): void;
  function PickupItem(this: void, itemInfo: number | string): void;
  function ReplaceEnchant(this: void): void;
  function ReplaceTradeEnchant(this: void): void;
  function ReplaceTradeskillEnchant(this: void): void;
  function RequestLoadItemData(this: void, itemLocation: WowApi.ItemLocation): void;
  function RequestLoadItemDataByID(this: void, itemInfo: number | string): void;
  function UnlockItem(this: void, itemLocation: WowApi.ItemLocation): void;
  function UnlockItemByGUID(this: void, itemGUID: string): void;
  function UseItemByName(this: void, itemInfo: number | string, target?: string | undefined): void;

}

declare namespace C_ItemInteraction {
  function ClearPendingItem(this: void): void;
  function CloseUI(this: void): void;
  function GetChargeInfo(this: void): WowApi.ItemInteractionChargeInfo;
  function GetItemConversionCurrencyCost(this: void, item: WowApi.ItemLocation): WowApi.ConversionCurrencyCost;
  function GetItemInteractionInfo(this: void): WowApi.ItemInteractionFrameInfo | undefined;
  function GetItemInteractionSpellId(this: void): number;
  function InitializeFrame(this: void): void;
  function PerformItemInteraction(this: void): void;
  function Reset(this: void): void;
  function SetPendingItem(this: void, item?: WowApi.ItemLocation | undefined): boolean;

}

declare namespace C_ItemSocketInfo {
  function AcceptSockets(this: void): void;
  function ClickSocketButton(this: void, index: number): void;
  function CloseSocketInfo(this: void): void;
  function CompleteSocketing(this: void): void;
  function GetCurrUIType(this: void): WowApi.ItemSocketInfoUIType;
  function GetExistingSocketInfo(this: void, index: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, gemMatchesSocket: boolean]>;
  function GetExistingSocketLink(this: void, index: number): string | undefined;
  function GetNewSocketInfo(this: void, index: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, gemMatchesSocket: boolean]>;
  function GetNewSocketLink(this: void, index: number): string | undefined;
  function GetNumSockets(this: void): number;
  function GetSocketItemBoundTradeable(this: void): boolean;
  function GetSocketItemInfo(this: void): LuaMultiReturn<[name: string | undefined, icon: number | undefined, quality: WowApi.ItemQuality]>;
  function GetSocketItemRefundable(this: void): boolean;
  function GetSocketTypes(this: void, index: number): string | undefined;
  function HasBoundGemProposed(this: void): boolean;
  function IsArtifactRelicItem(this: void, info: number | string): boolean;

}

declare namespace C_ItemText {

}

declare namespace C_ItemUpgrade {
  function CanUpgradeItem(this: void, baseItem: WowApi.ItemLocation): boolean;
  function ClearItemUpgrade(this: void): void;
  function CloseItemUpgrade(this: void): void;
  function GetHighWatermarkForItem(this: void, itemInfo: number | string): LuaMultiReturn<[characterHighWatermark: number, accountHighWatermark: number]> | undefined;
  function GetHighWatermarkForSlot(this: void, itemRedundancySlot: number): LuaMultiReturn<[characterHighWatermark: number, accountHighWatermark: number]> | undefined;
  function GetHighWatermarkSlotForItem(this: void, itemInfo: number | string): number | undefined;
  function GetItemHyperlink(this: void): string | undefined;
  function GetItemUpgradeCurrentLevel(this: void): LuaMultiReturn<[itemLevel: number, isPvpItemLevel: boolean]> | undefined;
  function GetItemUpgradeEffect(this: void, effectIndex: number, numUpgradeLevels?: number | undefined): LuaMultiReturn<[outBaseEffect: string, outUpgradedEffect: string]> | undefined;
  function GetItemUpgradeItemInfo(this: void): WowApi.ItemUpgradeItemInfo | undefined;
  function GetItemUpgradePvpItemLevelDeltaValues(this: void, numUpgradeLevels: number): LuaMultiReturn<[currentPvPItemLevel: number, upgradedPvPItemLevel: number]> | undefined;
  function GetNumItemUpgradeEffects(this: void): number;
  function IsItemBound(this: void): boolean;
  function SetItemUpgradeFromCursorItem(this: void): void;
  function SetItemUpgradeFromLocation(this: void, itemToSet: WowApi.ItemLocation): void;
  function UpgradeItem(this: void, numUpgrades?: number): void;

}

declare namespace C_KeyBindings {
  function ActivateBindingContext(this: void, newContext: WowApi.BindingContext): void;
  function DeactivateBindingContext(this: void, context: WowApi.BindingContext): void;
  function GetBindingByKey(this: void, action: string, context?: WowApi.BindingContext | undefined): string;
  function GetBindingContextForAction(this: void, action: string): WowApi.BindingContext | undefined;
  function GetBindingIndex(this: void, action: string): number | undefined;
  function GetCustomBindingType(this: void, bindingIndex: number): WowApi.CustomBindingType | undefined;
  function GetSearchTagsForAction(this: void, action: string): readonly string[] | undefined;
  function GetTurnStrafeStyle(this: void): WowApi.TurnStrafeStyle;
  function IsBindingContextActive(this: void, context: WowApi.BindingContext): boolean;
  function SetTurnStrafeStyle(this: void, style: WowApi.TurnStrafeStyle): void;
  function UpdateTurnStrafeBindingsForCharacter(this: void): void;

}

declare namespace C_LegendaryCrafting {
  function CloseRuneforgeInteraction(this: void): void;
  function CraftRuneforgeLegendary(this: void, description: WowApi.RuneforgeLegendaryCraftDescription): void;
  function GetRuneforgeItemPreviewInfo(this: void, baseItem: WowApi.ItemLocation, runeforgePowerID?: number | undefined, modifiers?: readonly number[] | undefined): WowApi.RuneforgeItemPreviewInfo | undefined;
  function GetRuneforgeLegendaryComponentInfo(this: void, runeforgeLegendary: WowApi.ItemLocation): WowApi.RuneforgeLegendaryComponentInfo;
  function GetRuneforgeLegendaryCost(this: void, baseItem: WowApi.ItemLocation): readonly WowApi.CurrencyCost[];
  function GetRuneforgeLegendaryCraftSpellID(this: void): number;
  function GetRuneforgeLegendaryCurrencies(this: void): readonly number[];
  function GetRuneforgeLegendaryUpgradeCost(this: void, runeforgeLegendary: WowApi.ItemLocation, upgradeItem: WowApi.ItemLocation): readonly WowApi.CurrencyCost[];
  function GetRuneforgeModifierInfo(this: void, baseItem: WowApi.ItemLocation, powerID: number | undefined, addedModifierIndex: number, modifiers: readonly number[]): LuaMultiReturn<[name: string, description: readonly string[]]>;
  function GetRuneforgeModifiers(this: void): readonly number[];
  function GetRuneforgePowerInfo(this: void, runeforgePowerID: number): WowApi.RuneforgePower;
  function GetRuneforgePowers(this: void, baseItem?: WowApi.ItemLocation | undefined, filter?: WowApi.RuneforgePowerFilter | undefined): LuaMultiReturn<[primaryRuneforgePowerIDs: readonly number[], otherRuneforgePowerIDs: readonly number[]]>;
  function GetRuneforgePowersByClassSpecAndCovenant(this: void, classID?: number | undefined, specID?: number | undefined, covenantID?: number | undefined, filter?: WowApi.RuneforgePowerFilter | undefined): readonly number[];
  function GetRuneforgePowerSlots(this: void, runeforgePowerID: number): readonly string[];
  function IsRuneforgeLegendary(this: void, item: WowApi.ItemLocation): boolean;
  function IsRuneforgeLegendaryMaxLevel(this: void, runeforgeLegendary: WowApi.ItemLocation): boolean;
  function IsUpgradeItemValidForRuneforgeLegendary(this: void, runeforgeLegendary: WowApi.ItemLocation, upgradeItem: WowApi.ItemLocation): boolean;
  function IsValidRuneforgeBaseItem(this: void, baseItem: WowApi.ItemLocation): boolean;
  function MakeRuneforgeCraftDescription(this: void, baseItem: WowApi.ItemLocation, runeforgePowerID: number, modifiers: readonly number[]): WowApi.RuneforgeLegendaryCraftDescription;
  function UpgradeRuneforgeLegendary(this: void, runeforgeLegendary: WowApi.ItemLocation, upgradeItem: WowApi.ItemLocation): void;

}

declare namespace C_LevelLink {
  function IsActionLocked(this: void, actionID: number): boolean;
  function IsSpellLocked(this: void, spellID: number): boolean;

}

declare namespace C_LevelSquish {
  function ConvertFollowerLevel(this: void, level: number, maxFollowerLevel: number): number;
  function ConvertPlayerLevel(this: void, level: number): number;

}

declare namespace C_LFGInfo {
  function AreCrossFactionGroupQueuesAllowed(this: void, lfgDungeonID: number): boolean;
  function CanPlayerUseGroupFinder(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseLFD(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseLFR(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUsePremadeGroup(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUsePVP(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseScenarioFinder(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function ConfirmLfgExpandSearch(this: void): void;
  function DoesActivePartyMeetPremadeLaunchCount(this: void, lfgDungeonID: number): boolean;
  function DoesCrossFactionQueueRequireFullPremade(this: void, lfgDungeonID: number): boolean;
  function GetActiveLFGDungeonName(this: void): string;
  function GetAllEntriesForCategory(this: void, category: number): readonly number[];
  function GetDungeonInfo(this: void, lfgDungeonID: number): WowApi.LFGDungeonInfo | undefined;
  function GetLevelUpInstances(this: void, currPlayerLevel: number, isRaid: boolean): readonly number[];
  function GetLFDLockStates(this: void): readonly WowApi.LFGLockInfo[];
  function GetRoleCheckDifficultyDetails(this: void): LuaMultiReturn<[maxLevel: number | undefined, isLevelReduced: boolean]>;
  function HideNameFromUI(this: void, dungeonID: number): boolean;
  function IsGroupFinderEnabled(this: void): boolean;
  function IsInLFGFollowerDungeon(this: void): boolean;
  function IsInMatchmadeRaidWithoutRoleRequirements(this: void): boolean;
  function IsLFDEnabled(this: void): boolean;
  function IsLFGFollowerDungeon(this: void, dungeonID: number): boolean;
  function IsLFREnabled(this: void): boolean;

}

declare namespace C_LFGList {
  function CanActiveEntryUseAutoAccept(this: void): boolean;
  function CanCreateQuestGroup(this: void, questID: number): boolean;
  function CanCreateScenarioGroup(this: void, scenarioID: number): boolean;
  function ClearApplicationTextFields(this: void): void;
  function ClearCreationTextFields(this: void): void;
  function ClearSearchTextFields(this: void): void;
  function ConfirmCensoredActiveEntry(this: void): void;
  function CopyActiveEntryInfoToCreationFields(this: void): void;
  function CreateListing(this: void, createData: WowApi.LfgListingCreateData): boolean;
  function CreateScenarioListing(this: void, activityID: number, itemLevel: number, autoAccept: boolean, privateGroup: boolean, scenarioID: number): boolean;
  function DoesCensoredTextMatch(this: void, name: string, comment: string): boolean;
  function DoesEntryTitleMatchPrebuiltTitle(this: void, activityID: number, groupID: number, playstyle?: WowApi.LFGEntryPlaystyle | undefined, generalPlaystyle?: WowApi.LFGEntryGeneralPlaystyle | undefined): boolean;
  function GetActiveEntryInfo(this: void): WowApi.LfgEntryData | undefined;
  function GetActivityFullName(this: void, activityID: number, questID?: number | undefined, showWarmode?: boolean | undefined): string;
  function GetActivityGroupInfo(this: void, groupID: number): LuaMultiReturn<[name: string, orderIndex: number]> | undefined;
  function GetActivityInfoTable(this: void, activityID: number, questID?: number | undefined, showWarmode?: boolean | undefined): WowApi.GroupFinderActivityInfo | undefined;
  function GetAdvancedFilter(this: void): WowApi.AdvancedFilterOptions;
  function GetApplicantBestDungeonScore(this: void, localID: number, applicantIndex: number): WowApi.BestDungeonScoreMapInfo | undefined;
  function GetApplicantDungeonScoreForListing(this: void, localID: number, applicantIndex: number, activityID: number): WowApi.BestDungeonScoreMapInfo | undefined;
  function GetApplicantInfo(this: void, applicantID: number): WowApi.LfgApplicantData | undefined;
  function GetApplicantPvpRatingInfoForListing(this: void, localID: number, applicantIndex: number, activityID: number): WowApi.PvpRatingInfo | undefined;
  function GetAvailableActivityGroups(this: void, categoryID: number, filter?: number): readonly number[];
  function GetFilteredSearchResults(this: void): LuaMultiReturn<[totalResultsFound: number, filteredResults: readonly number[]]>;
  function GetGroupLeaverCountsByRole(this: void): LuaMultiReturn<[tankLeavers: number, healerLeavers: number, damageLeavers: number]>;
  function GetKeystoneForActivity(this: void, activityID: number): number | undefined;
  function GetLfgCategoryInfo(this: void, categoryID: number): WowApi.LfgCategoryData | undefined;
  function GetOwnedKeystoneActivityAndGroupAndLevel(this: void, getTimewalking?: boolean): LuaMultiReturn<[activityID: number, groupID: number, keystoneLevel: number]> | undefined;
  function GetPlaystyleString(this: void, playstyle: WowApi.LFGEntryPlaystyle, generalPlaystyle: WowApi.LFGEntryGeneralPlaystyle, activityInfo: WowApi.GroupFinderActivityInfo): string;
  function GetPremadeGroupFinderStyle(this: void): WowApi.PremadeGroupFinderStyle;
  function GetSearchResultInfo(this: void, searchResultID: number): WowApi.LfgSearchResultData | undefined;
  function GetSearchResultLeaderInfo(this: void, searchResultID: number): WowApi.LfgSearchResultPlayerInfo | undefined;
  function GetSearchResultPlayerInfo(this: void, searchResultID: number, memberIndex: number): WowApi.LfgSearchResultPlayerInfo | undefined;
  function GetSearchResults(this: void): LuaMultiReturn<[totalResultsFound: number, results: readonly number[]]>;
  function HasActiveEntryInfo(this: void): boolean;
  function HasSearchResultInfo(this: void, searchResultID: number): boolean;
  function IsCensoredActiveEntryUnresolved(this: void): boolean;
  function IsPlayerAuthenticatedForLFG(this: void, activityCategoryID?: number | undefined): boolean;
  function IsPlayerValidForEndgameFieldEdits(this: void): boolean;
  function IsPremadeGroupFinderEnabled(this: void): boolean;
  function ListingUsesEndgameEditRestrictions(this: void, activityID: number): boolean;
  function ReportGroupAsAdvertisement(this: void, searchResultID: number): void;
  function RevealCensoredActiveEntry(this: void): void;
  function RevealCensoredSearchResult(this: void, searchResultID: number): void;
  function SaveAdvancedFilter(this: void, options: WowApi.AdvancedFilterOptions): void;
  function Search(this: void, categoryID: number, filter?: number, preferredFilters?: number, languageFilter?: WowApi.WowLocale | undefined, searchCrossFactionListings?: boolean | undefined, advancedFilter?: WowApi.AdvancedFilterOptions | undefined, activityIDsFilter?: readonly number[] | undefined): void;
  function SetEntryTitle(this: void, activityID: number, groupID: number, playstyle?: WowApi.LFGEntryPlaystyle | undefined, generalPlaystyle?: WowApi.LFGEntryGeneralPlaystyle | undefined): void;
  function SetSearchToActivity(this: void, activityID: number): void;
  function SetSearchToQuestID(this: void, questID: number): void;
  function SetSearchToScenarioID(this: void, scenarioID: number): void;
  function UpdateListing(this: void, createData: WowApi.LfgListingCreateData): boolean;
  function ValidateRequiredDungeonScore(this: void, dungeonScore: number): boolean;
  function ValidateRequiredPvpRatingForActivity(this: void, activityID: number, rating: number): boolean;

}

declare namespace C_LFGListRoles {
  function GetRoles(this: void): WowApi.LFGRoles | undefined;
  function GetSavedRoles(this: void): WowApi.LFGRoles | undefined;
  function SetRoles(this: void, roles: WowApi.LFGRoles, limitToClassRoles?: boolean): boolean;

}

declare namespace C_LimitedInput {
  function LimitedInputAllowed(this: void, type: WowApi.LimitedInputType): boolean;

}

declare namespace C_LiveEvent {
  function OnLiveEventBannerClicked(this: void, timerunningSeasonID: number): void;
  function OnLiveEventPopupClicked(this: void, timerunningSeasonID: number): void;

}

declare namespace C_LoadingScreen {

}

declare namespace C_LobbyMatchmakerInfo {
  function AbandonQueue(this: void): void;
  function EnterQueue(this: void, playlistEntry: WowApi.PartyPlaylistEntry): void;
  function GetCurrQueuePlaylistEntry(this: void): WowApi.PartyPlaylistEntry;
  function GetCurrQueueState(this: void): WowApi.PlunderstormQueueState;
  function GetQueueFromMainlineEnabled(this: void): boolean;
  function GetQueueStartTime(this: void): number;
  function IsInQueue(this: void): boolean;
  function RespondToQueuePop(this: void, acceptQueue: boolean): void;

}

declare namespace C_Log {
  function LogErrorMessage(this: void, message: string): void;
  function LogMessage(this: void, message: string): void;
  function LogMessageWithPriority(this: void, priority: WowApi.LogPriority, message: string): void;
  function LogWarningMessage(this: void, message: string): void;

}

declare namespace C_Loot {
  function GetLootRollDuration(this: void, rollID: number): number | undefined;
  function IsLegacyLootModeEnabled(this: void): boolean;

}

declare namespace C_LootFrame {
  function TryAutoLoot(this: void): void;

}

declare namespace C_LootHistory {
  function GetAllEncounterInfos(this: void): readonly WowApi.EncounterLootInfo[];
  function GetInfoForEncounter(this: void, encounterID: number): WowApi.EncounterLootInfo | undefined;
  function GetLootHistoryTime(this: void): number;
  function GetSortedDropsForEncounter(this: void, encounterID: number): readonly WowApi.EncounterLootDropInfo[] | undefined;
  function GetSortedInfoForDrop(this: void, encounterID: number, lootListKey: number): WowApi.EncounterLootDropInfo | undefined;

}

declare namespace C_LootJournal {
  function GetItemSetItems(this: void, setID: number): readonly WowApi.LootJournalItemInfo[] | undefined;
  function GetItemSets(this: void, classID?: number | undefined, specID?: number | undefined): readonly WowApi.LootJournalItemSetInfo[] | undefined;

}

declare namespace C_LoreText {
  function RequestLoreTextForCampaignID(this: void, campaignID: number): void;

}

declare namespace C_LossOfControl {
  function GetActiveLossOfControlData(this: void, index: number): WowApi.LossOfControlData | undefined;
  function GetActiveLossOfControlDataByUnit(this: void, unitToken: string, index: number): WowApi.LossOfControlData | undefined;
  function GetActiveLossOfControlDataCount(this: void): number;
  function GetActiveLossOfControlDataCountByUnit(this: void, unitToken: string): number;
  function GetActiveLossOfControlDuration(this: void, unitToken: string, index: number): WowApi.LuaDurationObject | undefined;

}

declare namespace C_MacOptions {
  function AreOSShortcutsDisabled(this: void): LuaMultiReturn<[osShortcutsDisabledCVar: boolean | undefined, osShortcutsDisabled: boolean]>;
  function GetGameBundleName(this: void): string;
  function HasNewStyleInputMonitoring(this: void): boolean;
  function IsInputMonitoringEnabled(this: void): boolean;
  function IsMicrophoneEnabled(this: void): boolean;
  function IsUniversalAccessEnabled(this: void): boolean;
  function OpenInputMonitoring(this: void): void;
  function OpenMicrophoneRequestDialogue(this: void): void;
  function OpenUniversalAccess(this: void): void;
  function SetOSShortcutsDisabled(this: void, disable: boolean): void;

}

declare namespace C_Macro {
  function GetMacroName(this: void, macroId: number): string | undefined;
  function GetSelectedMacroIcon(this: void, macroId: number): number;
  function RunMacroText(this: void, text: string, button: string): void;
  function SetMacroExecuteLineCallback(this: void, cb: WowApi.MacroExecuteLineCallback): void;

}

declare namespace C_Mail {
  function CanCheckInbox(this: void): LuaMultiReturn<[canCheckInbox: boolean, secondsUntilAllowed: number]>;
  function GetCraftingOrderMailInfo(this: void, inboxIndex: number): WowApi.CraftingOrderMailInfo | undefined;
  function HasInboxMoney(this: void, inboxIndex: number): boolean;
  function IsCommandPending(this: void): boolean;
  function SetOpeningAll(this: void, openingAll: boolean): void;

}

declare namespace C_MajorFactions {
  function GetCurrentRenownLevel(this: void, majorFactionID: number): number;
  function GetMajorFactionData(this: void, majorFactionID: number): WowApi.MajorFactionData | undefined;
  function GetMajorFactionIDs(this: void, expansionID?: number | undefined): readonly number[];
  function GetMajorFactionProgressionInfo(this: void, majorFactionID: number): WowApi.MajorFactionProgressionInfo | undefined;
  function GetMajorFactionRenownInfo(this: void, majorFactionID: number): WowApi.MajorFactionRenownInfo | undefined;
  function GetRenownLevels(this: void, majorFactionID: number): readonly WowApi.MajorFactionRenownLevelInfo[];
  function GetRenownNPCFactionID(this: void): number;
  function GetRenownRewardsForLevel(this: void, majorFactionID: number, renownLevel: number): readonly WowApi.MajorFactionRenownRewardInfo[];
  function GetTotalReputationForRenownLevel(this: void, majorFactionID: number, renownLevel: number): number;
  function HasMaximumRenown(this: void, majorFactionID: number): boolean;
  function IsMajorFactionHiddenFromExpansionPage(this: void, majorFactionID: number): boolean;
  function IsWeeklyRenownCapped(this: void, majorFactionID: number): boolean;
  function ShouldDisplayMajorFactionAsJourney(this: void, majorFactionID: number): boolean;
  function ShouldUseJourneyRewardTrack(this: void, majorFactionID: number): boolean;

}

declare namespace C_Map {
  function CanSetUserWaypointOnMap(this: void, uiMapID: number): boolean;
  function ClearUserWaypoint(this: void): void;
  function CloseWorldMapInteraction(this: void): void;
  function GetAreaInfo(this: void, areaID: number): string;
  function GetBestMapForUnit(this: void, unitToken: string): number | undefined;
  function GetBountySetMaps(this: void, bountySetID: number): readonly number[];
  function GetFallbackWorldMapID(this: void): number;
  function GetMapArtBackgroundAtlas(this: void, uiMapID: number): string;
  function GetMapArtHelpTextPosition(this: void, uiMapID: number): WowApi.MapCanvasPosition;
  function GetMapArtID(this: void, uiMapID: number): number | undefined;
  function GetMapArtLayers(this: void, uiMapID: number): readonly WowApi.UiMapLayerInfo[] | undefined;
  function GetMapArtLayerTextures(this: void, uiMapID: number, layerIndex: number): readonly number[] | undefined;
  function GetMapArtZoneTextPosition(this: void, uiMapID: number): WowApi.MapCanvasPosition;
  function GetMapBannersForMap(this: void, uiMapID: number): readonly WowApi.MapBannerInfo[];
  function GetMapChildrenInfo(this: void, uiMapID: number, mapType?: WowApi.UIMapType | undefined, allDescendants?: boolean | undefined): readonly WowApi.UiMapDetails[] | undefined;
  function GetMapDisplayInfo(this: void, uiMapID: number): boolean | undefined;
  function GetMapGroupID(this: void, uiMapID: number): number | undefined;
  function GetMapGroupMembersInfo(this: void, uiMapGroupID: number): readonly WowApi.UiMapGroupMemberInfo[] | undefined;
  function GetMapHighlightInfoAtPosition(this: void, uiMapID: number, x: number, y: number): LuaMultiReturn<[fileDataID: number, atlasID: string, texturePercentageX: number, texturePercentageY: number, textureX: number, textureY: number, scrollChildX: number, scrollChildY: number]> | undefined;
  function GetMapHighlightPulseInfo(this: void, uiMapID: number): LuaMultiReturn<[fileDataID: number, atlasID: string, texturePercentageX: number, texturePercentageY: number, textureX: number, textureY: number, scrollChildX: number, scrollChildY: number]> | undefined;
  function GetMapInfo(this: void, uiMapID: number): WowApi.UiMapDetails | undefined;
  function GetMapInfoAtPosition(this: void, uiMapID: number, x: number, y: number, ignoreZoneMapPositionData?: boolean | undefined): WowApi.UiMapDetails | undefined;
  function GetMapLevels(this: void, uiMapID: number): LuaMultiReturn<[playerMinLevel: number, playerMaxLevel: number, petMinLevel: number, petMaxLevel: number]> | undefined;
  function GetMapLinksForMap(this: void, uiMapID: number): readonly WowApi.MapLinkInfo[];
  function GetMapPosFromWorldPos(this: void, continentID: number, worldPosition: WowApi.vector2, overrideUiMapID?: number | undefined): LuaMultiReturn<[uiMapID: number, mapPosition: WowApi.vector2]> | undefined;
  function GetMapRectOnMap(this: void, uiMapID: number, topUiMapID: number): LuaMultiReturn<[minX: number, maxX: number, minY: number, maxY: number]> | undefined;
  function GetMapWorldSize(this: void, uiMapID: number): LuaMultiReturn<[width: number, height: number]>;
  function GetPlayerMapPosition(this: void, uiMapID: number, unitToken: string): WowApi.vector2 | undefined;
  function GetUserWaypoint(this: void): WowApi.UiMapPoint | undefined;
  function GetUserWaypointFromHyperlink(this: void, hyperlink: string): WowApi.UiMapPoint | undefined;
  function GetUserWaypointHyperlink(this: void): string | undefined;
  function GetUserWaypointPositionForMap(this: void, uiMapID: number): WowApi.vector2 | undefined;
  function GetWorldPosFromMapPos(this: void, uiMapID: number, mapPosition: WowApi.vector2): LuaMultiReturn<[continentID: number, worldPosition: WowApi.vector2]> | undefined;
  function HasUserWaypoint(this: void): boolean;
  function IsCityMap(this: void, uiMapID: number): boolean;
  function IsMapValidForNavBarDropdown(this: void, uiMapID: number): boolean;
  function MapHasArt(this: void, uiMapID: number): boolean;
  function OpenWorldMap(this: void, uiMapID?: number | undefined): void;
  function RequestPreloadMap(this: void, uiMapID: number): void;
  function SetUserWaypoint(this: void, point: WowApi.UiMapPoint): boolean;

}

declare namespace C_MapExplorationInfo {
  function GetExploredAreaIDsAtPosition(this: void, uiMapID: number, normalizedPosition: WowApi.vector2): readonly number[] | undefined;
  function GetExploredMapTextures(this: void, uiMapID: number): readonly WowApi.UiMapExplorationInfo[] | undefined;

}

declare namespace C_MerchantFrame {
  function GetBuybackItemID(this: void, buybackSlotIndex: number): number | undefined;
  function GetItemInfo(this: void, index: number): WowApi.MerchantItemInfo | undefined;
  function GetMerchantCurrencies(this: void): readonly number[] | undefined;
  function GetNumJunkItems(this: void): number;
  function IsMerchantItemRefundable(this: void, index: number): boolean;
  function IsSellAllJunkEnabled(this: void): boolean;
  function SellAllJunkItems(this: void): void;

}

declare namespace C_Minimap {
  function CanTrackBattlePets(this: void): boolean;
  function ClearAllTracking(this: void): void;
  function ClearMinimapInsetInfo(this: void): void;
  function GetDefaultTrackingValue(this: void, filterType: WowApi.MinimapTrackingFilter): boolean;
  function GetDrawGroundTextures(this: void): boolean;
  function GetNumQuestPOIWorldEffects(this: void): number;
  function GetNumTrackingTypes(this: void): number;
  function GetPOITextureCoords(this: void, index?: number | undefined): LuaMultiReturn<[textureCoordsX: number, textureCoordsY: number, textureCoordsZ: number, textureCoordsW: number]>;
  function GetTrackingFilter(this: void, spellIndex: number): WowApi.MinimapScriptTrackingFilter;
  function GetTrackingInfo(this: void, spellIndex: number): WowApi.MinimapScriptTrackingInfo | undefined;
  function GetUiMapID(this: void): number | undefined;
  function GetViewRadius(this: void): number;
  function IsFilteredOut(this: void, filterType: WowApi.MinimapTrackingFilter): boolean;
  function IsInsideQuestBlob(this: void, questID: number): boolean;
  function IsRotateMinimapIgnored(this: void): boolean;
  function IsTrackingAccountCompletedQuests(this: void): boolean;
  function IsTrackingBattlePets(this: void): boolean;
  function IsTrackingHiddenQuests(this: void): boolean;
  function SetDrawGroundTextures(this: void, draw: boolean): void;
  function SetIgnoreRotateMinimap(this: void, ignore: boolean): void;
  function SetMinimapInsetInfo(this: void, minAngle: number, maxAngle: number, scalar: number): void;
  function SetTracking(this: void, index: number, on: boolean): void;
  function ShouldUseHybridMinimap(this: void): boolean;

}

declare namespace C_ModelInfo {
  function AddActiveModelScene(this: void, modelSceneFrame: WowApi.ModelSceneFrame, modelSceneID: number): void;
  function AddActiveModelSceneActor(this: void, modelSceneFrameActor: WowApi.ModelSceneFrameActor, modelSceneActorID: number): void;
  function ClearActiveModelScene(this: void, modelSceneFrame: WowApi.ModelSceneFrame): void;
  function ClearActiveModelSceneActor(this: void, modelSceneFrameActor: WowApi.ModelSceneFrameActor): void;
  function GetModelSceneActorDisplayInfoByID(this: void, modelActorDisplayID: number): WowApi.UIModelSceneActorDisplayInfo | undefined;
  function GetModelSceneActorInfoByID(this: void, modelActorID: number): WowApi.UIModelSceneActorInfo | undefined;
  function GetModelSceneCameraInfoByID(this: void, modelSceneCameraID: number): WowApi.UIModelSceneCameraInfo | undefined;
  function GetModelSceneInfoByID(this: void, modelSceneID: number): LuaMultiReturn<[modelSceneType: WowApi.ModelSceneType, modelCameraIDs: readonly number[], modelActorsIDs: readonly number[], flags: number]> | undefined;

}

declare namespace C_ModifiedInstance {
  function GetModifiedInstanceInfoFromMapID(this: void, mapID: number): WowApi.ModifiedInstanceInfo | undefined;

}

declare namespace C_MountJournal {
  function ApplyMountEquipment(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function AreMountEquipmentEffectsSuppressed(this: void): boolean;
  function ClearFanfare(this: void, mountID: number): void;
  function ClearRecentFanfares(this: void): void;
  function Dismiss(this: void): void;
  function GetAllCreatureDisplayIDsForMountID(this: void, mountID: number): readonly number[];
  function GetAppliedMountEquipmentID(this: void): number | undefined;
  function GetCollectedDragonridingMounts(this: void): readonly number[];
  function GetCollectedFilterSetting(this: void, filterIndex: number): boolean;
  function GetDisplayedMountAllCreatureDisplayInfo(this: void, mountIndex: number): readonly WowApi.MountCreatureDisplayInfo[] | undefined;
  function GetDisplayedMountID(this: void, displayIndex: number): number;
  function GetDisplayedMountInfo(this: void, displayIndex: number): LuaMultiReturn<[name: string, spellID: number, icon: number, isActive: boolean, isUsable: boolean, sourceType: number, isFavorite: boolean, isFactionSpecific: boolean, faction: WowApi.PvPFaction | undefined, shouldHideOnChar: boolean, isCollected: boolean, mountID: number, isSteadyFlight: boolean]> | undefined;
  function GetDisplayedMountInfoExtra(this: void, mountIndex: number): LuaMultiReturn<[creatureDisplayInfoID: number | undefined, description: string, source: string, isSelfMount: boolean, mountTypeID: number, uiModelSceneID: number, animID: number, spellVisualKitID: number, disablePlayerMountPreview: boolean]> | undefined;
  function GetDynamicFlightModeSpellID(this: void): number;
  function GetIsFavorite(this: void, mountIndex: number): LuaMultiReturn<[isFavorite: boolean, canSetFavorite: boolean]>;
  function GetMountAllCreatureDisplayInfoByID(this: void, mountID: number): readonly WowApi.MountCreatureDisplayInfo[] | undefined;
  function GetMountEquipmentUnlockLevel(this: void): number;
  function GetMountFromItem(this: void, itemID: number): number | undefined;
  function GetMountFromSpell(this: void, spellID: number | string): number | undefined;
  function GetMountIDs(this: void): readonly number[];
  function GetMountInfoByID(this: void, mountID: number): LuaMultiReturn<[name: string, spellID: number, icon: number, isActive: boolean, isUsable: boolean, sourceType: number, isFavorite: boolean, isFactionSpecific: boolean, faction: WowApi.PvPFaction | undefined, shouldHideOnChar: boolean, isCollected: boolean, mountID: number, isSteadyFlight: boolean]> | undefined;
  function GetMountInfoExtraByID(this: void, mountID: number): LuaMultiReturn<[creatureDisplayInfoID: number | undefined, description: string, source: string, isSelfMount: boolean, mountTypeID: number, uiModelSceneID: number, animID: number, spellVisualKitID: number, disablePlayerMountPreview: boolean]> | undefined;
  function GetMountLink(this: void, spellID: number): string | undefined;
  function GetMountUsabilityByID(this: void, mountID: number, checkIndoors: boolean): LuaMultiReturn<[isUsable: boolean, useError: string | undefined]> | undefined;
  function GetNumDisplayedMounts(this: void): number;
  function GetNumMounts(this: void): number;
  function GetNumMountsNeedingFanfare(this: void): number;
  function HasDisplayableMount(this: void): boolean;
  function IsDragonridingUnlocked(this: void): boolean;
  function IsItemMountEquipment(this: void, itemLocation: WowApi.ItemLocation): boolean;
  function IsMountEquipmentApplied(this: void): boolean;
  function IsSourceChecked(this: void, filterIndex: number): boolean;
  function IsTypeChecked(this: void, filterIndex: number): boolean;
  function IsUsingDefaultFilters(this: void): boolean;
  function IsValidSourceFilter(this: void, filterIndex: number): boolean;
  function IsValidTypeFilter(this: void, filterIndex: number): boolean;
  function MountEquipmentAvailable(this: void): boolean;
  function NeedsFanfare(this: void, mountID: number): boolean;
  function Pickup(this: void, displayIndex: number): void;
  function PickupDynamicFlightMode(this: void): void;
  function SetAllSourceFilters(this: void, isChecked: boolean): void;
  function SetAllTypeFilters(this: void, isChecked: boolean): void;
  function SetCollectedFilterSetting(this: void, filterIndex: number, isChecked: boolean): void;
  function SetDefaultFilters(this: void): void;
  function SetIsFavorite(this: void, mountIndex: number, isFavorite: boolean): void;
  function SetSearch(this: void, searchValue: string): void;
  function SetSourceFilter(this: void, filterIndex: number, isChecked: boolean): void;
  function SetTypeFilter(this: void, filterIndex: number, isChecked: boolean): void;
  function SummonByID(this: void, mountID: number): void;
  function SwapDynamicFlightMode(this: void): void;

}

declare namespace C_MythicPlus {
  function GetCurrentAffixes(this: void): readonly WowApi.MythicPlusKeystoneAffix[] | undefined;
  function GetCurrentSeason(this: void): number;
  function GetCurrentSeasonValues(this: void): LuaMultiReturn<[displaySeasonID: number, milestoneSeasonID: number, rewardSeasonID: number]>;
  function GetCurrentUIDisplaySeason(this: void): number | undefined;
  function GetEndOfRunGearSequenceLevel(this: void, keystoneLevel: number): number | undefined;
  function GetLastWeeklyBestInformation(this: void): LuaMultiReturn<[challengeMapId: number, level: number]> | undefined;
  function GetOwnedKeystoneChallengeMapID(this: void): number | undefined;
  function GetOwnedKeystoneLevel(this: void): number | undefined;
  function GetOwnedKeystoneMapID(this: void): number | undefined;
  function GetRewardLevelForDifficultyLevel(this: void, difficultyLevel: number): LuaMultiReturn<[weeklyRewardLevel: number, endOfRunRewardLevel: number]>;
  function GetRewardLevelFromKeystoneLevel(this: void, keystoneLevel: number): number | undefined;
  function GetRunHistory(this: void, includePreviousWeeks?: boolean, includeIncompleteRuns?: boolean, currentSeasonOnly?: boolean): readonly WowApi.MythicPlusRunInfo[];
  function GetSeasonBestAffixScoreInfoForMap(this: void, mapChallengeModeID: number): LuaMultiReturn<[affixScores: readonly WowApi.MythicPlusAffixScoreInfo[], bestOverAllScore: number]> | undefined;
  function GetSeasonBestForMap(this: void, mapChallengeModeID: number): LuaMultiReturn<[intimeInfo: WowApi.MapSeasonBestInfo | undefined, overtimeInfo: WowApi.MapSeasonBestInfo | undefined]>;
  function GetSeasonBestMythicRatingFromThisExpansion(this: void): LuaMultiReturn<[bestSeasonScore: number, bestSeason: number]> | undefined;
  function GetWeeklyBestForMap(this: void, mapChallengeModeID: number): LuaMultiReturn<[durationSec: number, level: number, completionDate: WowApi.CalendarTime, affixIDs: readonly number[], members: readonly WowApi.MythicPlusMember[], dungeonScore: number]> | undefined;
  function GetWeeklyChestRewardLevel(this: void): LuaMultiReturn<[currentWeekBestLevel: number, weeklyRewardLevel: number, nextDifficultyWeeklyRewardLevel: number, nextBestLevel: number]>;
  function IsMythicPlusActive(this: void): boolean;
  function RequestCurrentAffixes(this: void): void;
  function RequestMapInfo(this: void): void;
  function RequestRewards(this: void): void;

}

declare namespace C_NamePlate {
  function GetNamePlateForUnit(this: void, unitToken: string, includeForbidden?: boolean): WowApi.NamePlateFrame;
  function GetNamePlates(this: void): readonly WowApi.NamePlateFrame[];
  function GetNamePlateSize(this: void): LuaMultiReturn<[width: number, height: number]>;
  function SetNamePlateSize(this: void, width: number, height: number): void;

}

declare namespace C_NamePlateManager {
  function GetNamePlateHitTestInsets(this: void, type: WowApi.NamePlateType): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
  function IsNamePlateUnitBehindCamera(this: void, unitToken: string): boolean;
  function SetNamePlateHitTestInsets(this: void, type: WowApi.NamePlateType, left: number, right: number, top: number, bottom: number): void;
  function SetNamePlateSimplified(this: void, unitToken: string, isSimplified: boolean): void;

}

declare namespace C_Navigation {
  function GetDistance(this: void): number;
  function GetFrame(this: void): WowApi.SimpleScriptRegion | undefined;
  function GetNearestPartyMemberToken(this: void): string;
  function GetNextWaypointForMap(this: void, uiMapID: number): LuaMultiReturn<[x: number, y: number, waypointDescription: string]> | undefined;
  function GetTargetState(this: void): WowApi.NavigationState;
  function HasValidScreenPosition(this: void): boolean;
  function WasClampedToScreen(this: void): boolean;

}

declare namespace C_NeighborhoodInitiative {
  function AddTrackedInitiativeTask(this: void, initiativeTaskID: number): void;
  function GetActiveNeighborhood(this: void): string;
  function GetAvailableHouseXP(this: void): number;
  function GetInitiativeActivityLogInfo(this: void): WowApi.InitiativeActivityLogInfo | undefined;
  function GetInitiativeTaskChatLink(this: void, initiativeTaskID: number): string;
  function GetInitiativeTaskInfo(this: void, initiativeTaskID: number): WowApi.InitiativeTaskInfo | undefined;
  function GetInitiativeTaskRewardScaling(this: void, taskID: number, numItems: number): number;
  function GetNeighborhoodInitiativeInfo(this: void): WowApi.NeighborhoodInitiativeInfo | undefined;
  function GetRequiredLevel(this: void): number;
  function GetTrackedInitiativeTasks(this: void): WowApi.InitiativeTasksTracked;
  function IsInitiativeEnabled(this: void): boolean;
  function IsPlayerInNeighborhoodGroup(this: void): boolean;
  function IsViewingActiveNeighborhood(this: void): boolean;
  function PlayerHasInitiativeAccess(this: void): boolean;
  function PlayerMeetsRequiredLevel(this: void): boolean;
  function RemoveTrackedInitiativeTask(this: void, initiativeTaskID: number): void;
  function RequestInitiativeActivityLog(this: void): void;
  function RequestNeighborhoodInitiativeInfo(this: void): void;
  function SetActiveNeighborhood(this: void, neighborhoodGUID: string): void;
  function SetViewingNeighborhood(this: void, neighborhoodGUID: string): void;

}

declare namespace C_NewItems {
  function ClearAll(this: void): void;
  function IsNewItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): boolean;
  function RemoveNewItem(this: void, containerIndex: WowApi.BagIndex, slotIndex: number): void;

}

declare namespace C_PaperDollInfo {
  function AmmoNeeded(this: void): boolean;
  function CanAutoEquipCursorItem(this: void): boolean;
  function CancelTemporaryEnchantment(this: void, slot: number): void;
  function CursorCanGoInSlot(this: void, slotIndex: number): boolean;
  function GetArmorEffectiveness(this: void, armor: number, attackerLevel: number): number;
  function GetArmorEffectivenessAgainstTarget(this: void, armor: number): number | undefined;
  function GetInspectAzeriteItemEmpoweredChoices(this: void, unit: string, equipmentSlotIndex: number): readonly number[] | undefined;
  function GetInspectGuildInfo(this: void, unitString: string): LuaMultiReturn<[achievementPoints: number, numMembers: number, guildName: string, realmName: string]>;
  function GetInspectItemLevel(this: void, unit: string): number;
  function GetInspectRatedBGBlitzData(this: void): WowApi.InspectPVPData;
  function GetInspectRatedBGData(this: void): WowApi.InspectRatedBGData;
  function GetInspectRatedSoloShuffleData(this: void): WowApi.InspectPVPData;
  function GetInventorySlotInfo(this: void, slotName: string): LuaMultiReturn<[invSlot: number, slotTexture: number, checkRelic: boolean]> | undefined;
  function GetInventorySlotInfoForInvSlot(this: void, invSlotValue: number): LuaMultiReturn<[invSlot: number, slotTexture: number, checkRelic: boolean, slotName: string]> | undefined;
  function GetMinItemLevel(this: void): number | undefined;
  function GetStaggerPercentage(this: void, unit: string): LuaMultiReturn<[stagger: number, staggerAgainstTarget: number | undefined]>;
  function GetTemporaryEnchantmentInfo(this: void, slot: number): WowApi.TemporaryItemEnchantInfo | undefined;
  function IsInventorySlotEnabled(this: void, slotName: string): boolean;
  function IsRangedSlotShown(this: void): boolean;
  function OffhandHasShield(this: void): boolean;
  function OffhandHasWeapon(this: void): boolean;

}

declare namespace C_PartyInfo {
  function AllowedToDoPartyConversion(this: void, toRaid: boolean): boolean;
  function CanFormCrossFactionParties(this: void): boolean;
  function CanInvite(this: void): boolean;
  function CanStartInstanceAbandonVote(this: void): boolean;
  function ChallengeModeRestrictionsActive(this: void): boolean;
  function ConfirmConvertToRaid(this: void): void;
  function ConfirmInviteTravelPass(this: void, targetName: string, targetGUID: string): void;
  function ConfirmInviteUnit(this: void, targetName: string): void;
  function ConfirmLeaveParty(this: void, category?: number | undefined): void;
  function ConfirmReadyCheck(this: void, isReady: boolean): void;
  function ConfirmRequestInviteFromUnit(this: void, targetName: string, tank?: boolean | undefined, healer?: boolean | undefined, dps?: boolean | undefined): void;
  function ConvertToParty(this: void): void;
  function ConvertToRaid(this: void): void;
  function DelveTeleportOut(this: void): void;
  function DemoteAssistant(this: void, name: string, exactNameMatch?: boolean | undefined): void;
  function DoCountdown(this: void, seconds: number): boolean;
  function DoReadyCheck(this: void): void;
  function GetActiveCategories(this: void): readonly number[] | undefined;
  function GetAvailableLootMethods(this: void): readonly WowApi.LootMethod[];
  function GetInstanceAbandonShutdownTime(this: void): LuaMultiReturn<[durationSeconds: number, timeLeftSeconds: number]>;
  function GetInstanceAbandonVoteCooldownTime(this: void): LuaMultiReturn<[durationSeconds: number, timeLeftSeconds: number]> | undefined;
  function GetInstanceAbandonVoteRequirements(this: void): LuaMultiReturn<[votesRequired: number, keystoneOwnerVoteWeight: number]>;
  function GetInstanceAbandonVoteResponse(this: void): boolean | undefined;
  function GetInstanceAbandonVoteTime(this: void): LuaMultiReturn<[durationSeconds: number, timeLeftSeconds: number]>;
  function GetInviteConfirmationInvalidQueues(this: void, inviteGUID: string): readonly WowApi.QueueSpecificInfo[] | undefined;
  function GetInviteReferralInfo(this: void, inviteGUID: string): LuaMultiReturn<[outReferredByGuid: string, outReferredByName: string, outRelationType: WowApi.PartyRequestJoinRelation, outIsQuickJoin: boolean, outClubId: string]> | undefined;
  function GetLootMethod(this: void): LuaMultiReturn<[method: WowApi.LootMethod, masterLootPartyID: number | undefined, masterLooterRaidID: number | undefined]>;
  function GetLootMethodStyle(this: void): WowApi.LootMethodStyles;
  function GetMinItemLevel(this: void, avgItemLevelCategory: WowApi.AvgItemLevelCategories): LuaMultiReturn<[minItemLevel: number, playerNameWithLowestItemLevel: string]>;
  function GetMinLevel(this: void, category?: number | undefined): number;
  function GetNumInstanceAbandonGroupVoteResponses(this: void): number;
  function GetRestrictPings(this: void): WowApi.RestrictPingsTo;
  function InviteUnit(this: void, targetName: string): void;
  function IsChallengeModeActive(this: void): boolean;
  function IsChallengeModeKeystoneOwner(this: void): boolean;
  function IsCrossFactionParty(this: void, category?: number | undefined): boolean;
  function IsDelveComplete(this: void): boolean;
  function IsDelveInProgress(this: void): boolean;
  function IsGUIDInGroup(this: void, guid: string, category?: number | undefined): boolean;
  function IsLootMethodAvailable(this: void, method: WowApi.LootMethod): boolean;
  function IsPartyFull(this: void, category?: number | undefined): boolean;
  function IsPartyInJailersTower(this: void): boolean;
  function IsPartyWalkIn(this: void): boolean;
  function IsRaidListEnabled(this: void): boolean;
  function IsRaidListSupported(this: void): boolean;
  function LeaveParty(this: void, category?: number | undefined): void;
  function PromoteToAssistant(this: void, name: string, exactNameMatch?: boolean | undefined): void;
  function PromoteToLeader(this: void, name: string, exactNameMatch?: boolean | undefined): void;
  function RequestInviteFromUnit(this: void, targetName: string, tank?: boolean | undefined, healer?: boolean | undefined, dps?: boolean | undefined): void;
  function SetEveryoneIsAssistant(this: void, isAssistant: boolean): boolean;
  function SetInstanceAbandonVoteResponse(this: void, response: boolean): void;
  function SetLootMethod(this: void, method: WowApi.LootMethod, lootMaster?: string | undefined): boolean;
  function SetRestrictPings(this: void, restrictTo: WowApi.RestrictPingsTo): void;
  function StartInstanceAbandonVote(this: void): void;
  function UninviteUnit(this: void, name: string, reason?: string | undefined, exactNameMatch?: boolean | undefined): void;

}

declare namespace C_PartyPose {
  function ExtraAction(this: void, partyPoseID: number): void;
  function GetPartyPoseInfoByID(this: void, mapID: number): WowApi.PartyPoseInfo | undefined;
  function GetPartyPoseInfoByMapID(this: void, mapID: number): WowApi.PartyPoseInfo | undefined;
  function HasExtraAction(this: void, partyPoseID: number): boolean;

}

declare namespace C_PerksActivities {
  function AddTrackedPerksActivity(this: void, perksActivityID: number): void;
  function ClearPerksActivitiesPendingCompletion(this: void): void;
  function GetAllPerksActivityTags(this: void): WowApi.PerksActivityTags;
  function GetPerksActivitiesInfo(this: void): WowApi.PerksActivitiesInfo;
  function GetPerksActivitiesPendingCompletion(this: void): WowApi.PerksActivitiesPending;
  function GetPerksActivityChatLink(this: void, perksActivityID: number): string;
  function GetPerksActivityInfo(this: void, perksActivityID: number): WowApi.PerksActivityInfo | undefined;
  function GetPerksUIThemePrefix(this: void): string;
  function GetTrackedPerksActivities(this: void): WowApi.PerksActivitiesTracked;
  function RemoveTrackedPerksActivity(this: void, perksActivityID: number): void;

}

declare namespace C_PerksProgram {
  function ClearFrozenPerksVendorItem(this: void): void;
  function CloseInteraction(this: void): void;
  function GetAvailableCategoryIDs(this: void): readonly number[];
  function GetAvailableVendorItemIDs(this: void): readonly number[];
  function GetCategoryInfo(this: void, categoryID: number): WowApi.PerksVendorCategoryInfo;
  function GetCurrencyAmount(this: void): number;
  function GetDraggedPerksVendorItem(this: void): number;
  function GetFrozenPerksVendorItemInfo(this: void): WowApi.PerksVendorItemInfo | undefined;
  function GetPendingChestRewards(this: void): readonly WowApi.PerksProgramPendingChestRewards[];
  function GetPerksProgramItemDisplayInfo(this: void, id: number): WowApi.PerksProgramItemDisplayInfo;
  function GetTimeRemaining(this: void, vendorItemID: number): number;
  function GetVendorItemInfo(this: void, vendorItemID: number): WowApi.PerksVendorItemInfo;
  function GetVendorItemInfoRefundTimeLeft(this: void, vendorItemID: number): number;
  function IsAttackAnimToggleEnabled(this: void): boolean;
  function IsFrozenPerksVendorItem(this: void, perksVendorItemID: number): boolean;
  function IsMountSpecialAnimToggleEnabled(this: void): boolean;
  function ItemSelectedTelemetry(this: void, perksVendorItemID: number): void;
  function PickupPerksVendorItem(this: void, perksVendorItemID: number): void;
  function RequestCartCheckout(this: void, perksVendorItemIDs: readonly number[]): void;
  function RequestPendingChestRewards(this: void): void;
  function RequestPurchase(this: void, perksVendorItemID: number): void;
  function RequestRefund(this: void, perksVendorItemID: number): void;
  function ResetHeldItemDragAndDrop(this: void): void;
  function SetFrozenPerksVendorItem(this: void): void;

}

declare namespace C_PetBattles {
  function GetBreedQuality(this: void, petOwner: WowApi.BattlePetOwner, slot: number): WowApi.BattlePetBreedQuality;
  function GetIcon(this: void, petOwner: WowApi.BattlePetOwner, slot: number): number | undefined;
  function GetName(this: void, petOwner: WowApi.BattlePetOwner, slot: number): LuaMultiReturn<[customName: string, speciesName: string]> | undefined;
  function IsPlayerNPC(this: void): boolean;
  function IsWildBattle(this: void): boolean;

}

declare namespace C_PetInfo {
  function CanPetEatItem(this: void, itemID: number): boolean;
  function GetPetFoodTypes(this: void): readonly string[];
  function GetPetHappiness(this: void): LuaMultiReturn<[happiness: number, damagePercentage: number, loyaltyRate: number]> | undefined;
  function GetPetLoyalty(this: void): string | undefined;
  function GetPetTalentTree(this: void): string | undefined;
  function GetPetTamersForMap(this: void, uiMapID: number): readonly WowApi.PetTamerMapInfo[];
  function GetPetTrainingPoints(this: void): LuaMultiReturn<[totalPoints: number, usedPoints: number]>;
  function GetPetUIModelSceneID(this: void): number;
  function GetSpellForPetAction(this: void, actionID: number): number | undefined;
  function IsPetActionPassive(this: void, actionID: number): boolean;
  function PetAbandon(this: void, petNumber?: number | undefined): void;
  function PetAssistMode(this: void): void;
  function PetRename(this: void, name: string, petNumber?: number | undefined, declensions?: readonly string[] | undefined): void;

}

declare namespace C_PetJournal {
  function ClearHoveredBattlePet(this: void): void;
  function ClearSearchFilter(this: void): void;
  function DismissSummonedPet(this: void, petID: string): void;
  function GetDisplayIDByIndex(this: void, speciesID: number, index: number): number | undefined;
  function GetDisplayProbabilityByIndex(this: void, speciesID: number, index: number): number | undefined;
  function GetNonBattlePetLinkByIndex(this: void, index: number): string;
  function GetNumDisplays(this: void, speciesID: number): number | undefined;
  function GetNumPetsInJournal(this: void, creatureID: number): LuaMultiReturn<[maxAllowed: number, numPets: number]>;
  function GetOwnedPetIDs(this: void): readonly string[];
  function GetPetAbilityInfo(this: void, abilityID: number): LuaMultiReturn<[name: string, icon: number, petType: number]> | undefined;
  function GetPetAbilityListTable(this: void, speciesID: number): readonly WowApi.PetAbilityLevelInfo[] | undefined;
  function GetPetInfoTableByPetID(this: void, petID: string): WowApi.PetJournalPetInfo | undefined;
  function GetPetInfoTableBySpeciesID(this: void, speciesID: number): WowApi.PetJournalPetInfo | undefined;
  function GetPetLoadOutInfo(this: void, slot: number): LuaMultiReturn<[petID: string | undefined, ability1ID: number, ability2ID: number, ability3ID: number, locked: boolean]> | undefined;
  function GetPetSummonInfo(this: void, battlePetGUID: string): LuaMultiReturn<[isSummonable: boolean, error: WowApi.PetJournalError, errorText: string]>;
  function GetSearchFilter(this: void): string;
  function HasFavoritePets(this: void): boolean;
  function IsCurrentlySummoned(this: void, petID: string): boolean;
  function IsUsingDefaultFilters(this: void): boolean;
  function PetIsSummonable(this: void, battlePetGUID: string): boolean;
  function PetUsesRandomDisplay(this: void, speciesID: number): boolean | undefined;
  function SetDefaultFilters(this: void): void;
  function SetHoveredBattlePet(this: void, battlePetGUID: string): void;
  function SetSearchFilter(this: void, filterText: string): void;
  function SpellTargetBattlePet(this: void, battlePetGUID: string): void;

}

declare namespace C_PhotoSharing {
  function BeginAuthorizationFlow(this: void): void;
  function ClearAuthorization(this: void): void;
  function CompleteAuthorizationFlow(this: void, callbackURL: string): void;
  function GetCropRatio(this: void): number;
  function GetPhotoSharingAuthURL(this: void): string;
  function GetStatus(this: void): WowApi.PhotoSharingStatus;
  function IsAuthorized(this: void): boolean;
  function IsEnabled(this: void): boolean;
  function SetScreenshotPreviewTexture(this: void, textureObject: WowApi.SimpleTexture): void;
  function TakePhoto(this: void): void;
  function UploadPhotoToService(this: void, optionalTitle?: string, optionalDescription?: string): void;

}

declare namespace C_Ping {
  function GetCooldownInfo(this: void): WowApi.PingCooldownInfo;
  function GetDefaultPingOptions(this: void): readonly WowApi.PingTypeInfo[];
  function GetTextureKitForType(this: void, type: WowApi.PingSubjectType): string;
  function IsPingSystemEnabled(this: void): boolean;
  function SendMacroPing(this: void, macroInfo: WowApi.PingMacroInfo): void;
  function TogglePingListener(this: void, down: boolean): void;

}

declare namespace C_PingSecure {
  function ClearHitTestPingInfo(this: void): void;
  function CreateFrame(this: void): void;
  function DisplayError(this: void, error: string): void;
  function GetTargetPingReceiver(this: void, mousePosX: number, mousePosY: number): WowApi.SimpleScriptRegion;
  function SendHitTestPing(this: void, type?: WowApi.PingSubjectType | undefined): WowApi.SendPingResult;
  function SendPlayerItemPing(this: void, itemID: number): WowApi.SendPingResult;
  function SendPlayerSpellCategoryPing(this: void, spellCategoryID: number): WowApi.SendPingResult;
  function SendPlayerSpellPing(this: void, spellID: number): WowApi.SendPingResult;
  function SendUnitPing(this: void, target: string, type?: WowApi.PingSubjectType | undefined, isPlayerResource?: boolean | undefined): WowApi.SendPingResult;
  function SetHitTestPingTarget(this: void, mousePosX: number, mousePosY: number, forcePointPing?: boolean | undefined): WowApi.PingSetTargetState;
  function SetHitTestTargetAndSendPing(this: void): WowApi.SendPingResult;
  function SetPendingPingOffScreenCallback(this: void, cb: WowApi.PendingPingOffScreenCallback): void;
  function SetPingCooldownStartedCallback(this: void, cb: WowApi.PingCooldownStartedCallback): void;
  function SetPingPinFrameAddedCallback(this: void, cb: WowApi.PingPinFrameAddedCallback): void;
  function SetPingPinFrameRemovedCallback(this: void, cb: WowApi.PingPinFrameRemovedCallback): void;
  function SetPingPinFrameScreenClampStateUpdatedCallback(this: void, cb: WowApi.PingPinFrameScreenClampStateUpdatedCallback): void;
  function SetPingRadialWheelCreatedCallback(this: void, cb: WowApi.PingRadialWheelCreatedCallback): void;
  function SetSendMacroPingCallback(this: void, cb: WowApi.SendMacroPingCallback): void;
  function SetTogglePingListenerCallback(this: void, cb: WowApi.TogglePingListenerCallback): void;

}

declare namespace C_Platform {

}

declare namespace C_PlayerChoice {
  function GetCurrentPlayerChoiceInfo(this: void): WowApi.PlayerChoiceInfo | undefined;
  function GetNumRerolls(this: void): number;
  function GetRemainingTime(this: void): number | undefined;
  function IsWaitingForPlayerChoiceResponse(this: void): boolean;
  function OnUIClosed(this: void): void;
  function RequestRerollPlayerChoice(this: void): void;
  function SendPlayerChoiceResponse(this: void, responseID: number): void;

}

declare namespace C_PlayerInfo {
  function CanPlayerEnterChromieTime(this: void): boolean;
  function CanPlayerUseAreaLoot(this: void): boolean;
  function CanPlayerUseMountEquipment(this: void): LuaMultiReturn<[canUseMountEquipment: boolean, failureReason: string]>;
  function CanUseItem(this: void, itemID: number): boolean;
  function GetAlternateFormInfo(this: void): LuaMultiReturn<[hasAlternateForm: boolean, inAlternateForm: boolean]>;
  function GetClass(this: void, playerLocation: WowApi.PlayerLocation): LuaMultiReturn<[className: string | undefined, classFilename: string | undefined, classID: number | undefined]>;
  function GetContentDifficultyCreatureForPlayer(this: void, unitToken: string): WowApi.RelativeContentDifficulty;
  function GetContentDifficultyQuestForPlayer(this: void, questID: number): WowApi.RelativeContentDifficulty;
  function GetDisplayID(this: void): number;
  function GetGlidingInfo(this: void): LuaMultiReturn<[isGliding: boolean, canGlide: boolean, forwardSpeed: number]>;
  function GetInstancesUnlockedAtLevel(this: void, level: number, isRaid: boolean): readonly number[] | undefined;
  function GetName(this: void, playerLocation: WowApi.PlayerLocation): string | undefined;
  function GetNativeDisplayID(this: void): number;
  function GetPetStableCreatureDisplayInfoID(this: void, index: number): number;
  function GetPlayerCharacterData(this: void): WowApi.PlayerInfoCharacterData | undefined;
  function GetPlayerMythicPlusRatingSummary(this: void, playerToken: string): WowApi.MythicPlusRatingSummary | undefined;
  function GetRace(this: void, playerLocation: WowApi.PlayerLocation): number | undefined;
  function GetSex(this: void, playerLocation: WowApi.PlayerLocation): WowApi.UnitSex | undefined;
  function GUIDIsPlayer(this: void, guid: string): boolean;
  function HasAccountInventoryLock(this: void): boolean;
  function HasVisibleInvSlot(this: void, slot: number): boolean;
  function IsAccountBankEnabled(this: void): boolean;
  function IsCharacterBankEnabled(this: void): boolean;
  function IsConnected(this: void, playerLocation?: WowApi.PlayerLocation | undefined): boolean | undefined;
  function IsDisplayRaceNative(this: void): boolean;
  function IsExpansionLandingPageUnlockedForPlayer(this: void, expansionID: number): boolean;
  function IsMirrorImage(this: void): boolean;
  function IsPlayerEligibleForNPE(this: void): LuaMultiReturn<[isEligible: boolean, failureReason: string]>;
  function IsPlayerEligibleForNPEv2(this: void): LuaMultiReturn<[isEligible: boolean, failureReason: string]>;
  function IsPlayerInChromieTime(this: void): boolean;
  function IsPlayerInRPE(this: void): boolean;
  function IsPlayerInTimerunningHeroicWorldTier(this: void): boolean;
  function IsPlayerNPERestricted(this: void): boolean;
  function IsReturningCharacter(this: void): boolean;
  function IsSelfFoundActive(this: void): boolean;
  function IsTradingPostAvailable(this: void): boolean;
  function IsTravelersLogAvailable(this: void): boolean;
  function IsTutorialsTabAvailable(this: void): boolean;
  function ShouldDisplaySurname(this: void): boolean;
  function UnitIsSameServer(this: void, playerLocation: WowApi.PlayerLocation): boolean;

}

declare namespace C_PlayerInteractionManager {
  function ClearInteraction(this: void, type?: WowApi.PlayerInteractionType | undefined): void;
  function ConfirmationInteraction(this: void, type?: WowApi.PlayerInteractionType | undefined): void;
  function InteractUnit(this: void, unit: string, exactMatch?: boolean, looseTargeting?: boolean): boolean;
  function IsInteractingWithNpcOfType(this: void, type: WowApi.PlayerInteractionType): boolean;
  function IsReplacingUnit(this: void): boolean;
  function IsValidNPCInteraction(this: void, type: WowApi.PlayerInteractionType): boolean;
  function ReopenInteraction(this: void): void;
  function ShardTransferConfirm(this: void): void;

}

declare namespace C_PlayerMentorship {
  function GetMentorLevelRequirement(this: void): number | undefined;
  function GetMentorRequirements(this: void): LuaMultiReturn<[achievementIDs: readonly number[], optionalAchievementIDs: readonly number[], optionalCompleteAtLeastCount: number]>;
  function GetMentorshipStatus(this: void, playerLocation: WowApi.PlayerLocation): WowApi.PlayerMentorshipStatus;
  function IsActivePlayerConsideredNewcomer(this: void): boolean;
  function IsMentorRestricted(this: void): boolean;

}

declare namespace C_Pony {

}

declare namespace C_ProfSpecs {
  function CanRefundPath(this: void, pathID: number, configID: number): boolean;
  function CanUnlockTab(this: void, tabTreeID: number, configID: number): boolean;
  function GetChildrenForPath(this: void, pathID: number): readonly number[];
  function GetConfigIDForSkillLine(this: void, skillLineID: number): number;
  function GetCurrencyInfoForSkillLine(this: void, skillLineID: number): WowApi.SpecializationCurrencyInfo;
  function GetDefaultSpecSkillLine(this: void): number | undefined;
  function GetDescriptionForPath(this: void, pathID: number): string;
  function GetDescriptionForPerk(this: void, perkID: number): string;
  function GetEntryIDForPerk(this: void, perkID: number): number;
  function GetNewSpecReminderProfName(this: void): string | undefined;
  function GetPerksForPath(this: void, pathID: number): readonly WowApi.SpecPerkInfo[];
  function GetRootPathForTab(this: void, tabTreeID: number): number | undefined;
  function GetSourceTextForPath(this: void, pathID: number, configID: number): string;
  function GetSpecTabIDsForSkillLine(this: void, skillLineID: number): readonly number[];
  function GetSpecTabInfo(this: void): WowApi.SpecializationTabInfo;
  function GetSpendCurrencyForPath(this: void, pathID: number): number | undefined;
  function GetSpendEntryForPath(this: void, pathID: number): number;
  function GetStateForPath(this: void, pathID: number, configID: number): WowApi.ProfessionsSpecPathState;
  function GetStateForPerk(this: void, perkID: number, configID: number): WowApi.ProfessionsSpecPerkState;
  function GetStateForTab(this: void, tabTreeID: number, configID: number): WowApi.ProfessionsSpecTabState;
  function GetTabInfo(this: void, tabTreeID: number): WowApi.ProfTabInfo | undefined;
  function GetUnlockEntryForPath(this: void, pathID: number): number;
  function GetUnlockRankForPerk(this: void, perkID: number): number | undefined;
  function ShouldShowPointsReminder(this: void): boolean;
  function ShouldShowPointsReminderForSkillLine(this: void, skillLineID: number): boolean;
  function ShouldShowSpecTab(this: void): boolean;
  function SkillLineHasSpecialization(this: void, skillLineID: number): boolean;

}

declare namespace C_PvP {
  function ArePvpTalentsUnlocked(this: void): boolean;
  function AreTrainingGroundsEnabled(this: void): boolean;
  function CanDisplayDeaths(this: void): boolean;
  function CanDisplayHonorableKills(this: void): boolean;
  function CanPlayerUseRatedPVPUI(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseTrainingGroundsUI(this: void): LuaMultiReturn<[canUseTrainingGroundsUI: boolean, failureReason: string]>;
  function CanSurrenderArena(this: void): boolean;
  function CanToggleWarMode(this: void, toggle: boolean): boolean;
  function CanToggleWarModeInArea(this: void): boolean;
  function DoesMatchOutcomeAffectRating(this: void): boolean;
  function GetActiveBrawlInfo(this: void): WowApi.PvpBrawlInfo | undefined;
  function GetActiveMatchBracket(this: void): number;
  function GetActiveMatchDuration(this: void): number;
  function GetActiveMatchState(this: void): WowApi.PvPMatchState;
  function GetActiveMatchWinner(this: void): number;
  function GetArenaCrowdControlDuration(this: void, playerToken: string): WowApi.LuaDurationObject;
  function GetArenaCrowdControlInfo(this: void, playerToken: string): LuaMultiReturn<[spellID: number, startTime: number, duration: number]> | undefined;
  function GetArenaRewards(this: void, teamSize: number): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]> | undefined;
  function GetArenaSkirmishRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetAssignedSpecForBattlefieldQueue(this: void, queueID: number): number | undefined;
  function GetAvailableBrawlInfo(this: void): WowApi.PvpBrawlInfo | undefined;
  function GetBattlefieldFlagPosition(this: void, flagIndex: number, uiMapId: number): LuaMultiReturn<[uiPosx: number | undefined, uiPosy: number | undefined, flagTexture: number]>;
  function GetBattlefieldVehicleInfo(this: void, vehicleIndex: number, uiMapID: number): WowApi.BattlefieldVehicleInfo | undefined;
  function GetBattlefieldVehicles(this: void, uiMapID: number): readonly WowApi.BattlefieldVehicleInfo[] | undefined;
  function GetBattlegroundInfo(this: void, battlegroundIndex: number): WowApi.BattlegroundInfo | undefined;
  function GetBrawlRewards(this: void, brawlType: WowApi.BrawlType): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined, hasWon: boolean]> | undefined;
  function GetBrawlSoloRBGMinItemLevel(this: void): number;
  function GetCustomVictoryStatID(this: void): number;
  function GetGlobalPvpScalingInfoForSpecID(this: void, specializationID: number): readonly WowApi.PvpScalingData[] | undefined;
  function GetHonorRewardInfo(this: void, honorLevel: number): WowApi.HonorRewardInfo | undefined;
  function GetLevelUpBattlegrounds(this: void, level: number): readonly WowApi.LevelUpBattlegroundInfo[];
  function GetMatchPVPStatColumn(this: void, pvpStatID: number): WowApi.MatchPVPStatColumn | undefined;
  function GetMatchPVPStatColumns(this: void): readonly WowApi.MatchPVPStatColumn[];
  function GetNextHonorLevelForReward(this: void, honorLevel: number): number | undefined;
  function GetOutdoorPvPWaitTime(this: void, uiMapID: number): number;
  function GetPersonalRatedBGBlitzSpecStats(this: void): WowApi.RatedBGBlitzSpecStats | undefined;
  function GetPersonalRatedSoloShuffleSpecStats(this: void): WowApi.RatedSoloShuffleSpecStats | undefined;
  function GetPostMatchCurrencyRewards(this: void): readonly WowApi.PVPPostMatchCurrencyReward[];
  function GetPostMatchItemRewards(this: void): readonly WowApi.PVPPostMatchItemReward[];
  function GetPVPActiveMatchPersonalRatedInfo(this: void): WowApi.PVPPersonalRatedInfo | undefined;
  function GetPVPActiveRatedMatchDeserterPenalty(this: void): WowApi.RatedMatchDeserterPenalty | undefined;
  function GetPVPSeasonRewardAchievementID(this: void): number | undefined;
  function GetPvpTalentsUnlockedLevel(this: void): number;
  function GetPvpTierID(this: void, tierEnum: number, bracketEnum: number): number | undefined;
  function GetPvpTierInfo(this: void, tierID: number): WowApi.PvpTierInfo | undefined;
  function GetRandomBGInfo(this: void): WowApi.RandomBGInfo;
  function GetRandomBGRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRandomEpicBGInfo(this: void): WowApi.RandomBGInfo;
  function GetRandomEpicBGRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRandomTrainingGroundArenaRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRandomTrainingGroundBGRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRatedBGRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRatedSoloRBGMinItemLevel(this: void): number;
  function GetRatedSoloRBGRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRatedSoloShuffleMinItemLevel(this: void): number;
  function GetRatedSoloShuffleRewards(this: void): LuaMultiReturn<[honor: number, experience: number, itemRewards: readonly WowApi.BattlefieldItemReward[] | undefined, currencyRewards: readonly WowApi.BattlefieldCurrencyReward[] | undefined, roleShortageBonus: WowApi.RoleShortageReward | undefined]>;
  function GetRewardItemLevelsByTierEnum(this: void, pvpTierEnum: number): LuaMultiReturn<[activityItemLevel: number, weeklyItemLevel: number]>;
  function GetScoreInfo(this: void, offsetIndex: number): WowApi.PVPScoreInfo | undefined;
  function GetScoreInfoByPlayerGuid(this: void, guid: string): WowApi.PVPScoreInfo | undefined;
  function GetSeasonBestInfo(this: void): LuaMultiReturn<[tierID: number, nextTierID: number | undefined]>;
  function GetSkirmishInfo(this: void, pvpBracket: number): WowApi.BattlemasterListInfo | undefined;
  function GetSpecialEventBrawlInfo(this: void): WowApi.PvpBrawlInfo | undefined;
  function GetTeamInfo(this: void, factionIndex: number): WowApi.PVPTeamInfo | undefined;
  function GetTrainingGrounds(this: void): readonly WowApi.BattlegroundInfo[];
  function GetUIDisplaySeason(this: void): number;
  function GetWarModeRewardBonus(this: void): number;
  function GetWarModeRewardBonusDefault(this: void): number;
  function GetWeeklyChestInfo(this: void): LuaMultiReturn<[rewardAchieved: boolean, lastWeekRewardAchieved: boolean, lastWeekRewardClaimed: boolean, pvpTierMaxFromWins: number]>;
  function GetZonePVPInfo(this: void): LuaMultiReturn<[pvpType: string, isSubZonePvP: boolean, factionName: string | undefined]> | undefined;
  function HasArenaSkirmishWinToday(this: void): boolean;
  function HasMatchStarted(this: void): boolean;
  function HasRandomTrainingGroundArenaWinToday(this: void): boolean;
  function HasRandomTrainingGroundBGWinToday(this: void): boolean;
  function IsActiveBattlefield(this: void): boolean;
  function IsActiveMatchRegistered(this: void): boolean;
  function IsArena(this: void): boolean;
  function IsBattleground(this: void): boolean;
  function IsBattlegroundEnlistmentBonusActive(this: void): LuaMultiReturn<[battlegroundActive: boolean, brawlActive: boolean]>;
  function IsBrawlSoloRBG(this: void): boolean;
  function IsBrawlSoloShuffle(this: void): boolean;
  function IsInBrawl(this: void): boolean;
  function IsInRatedMatchWithDeserterPenalty(this: void): boolean;
  function IsMatchActive(this: void): boolean;
  function IsMatchComplete(this: void): boolean;
  function IsMatchConsideredArena(this: void): boolean;
  function IsMatchFactional(this: void): boolean;
  function IsPVPMap(this: void): boolean;
  function IsRatedArena(this: void): boolean;
  function IsRatedBattleground(this: void): boolean;
  function IsRatedMap(this: void): boolean;
  function IsRatedSoloRBG(this: void): boolean;
  function IsRatedSoloShuffle(this: void): boolean;
  function IsSoloRBG(this: void): boolean;
  function IsSoloShuffle(this: void): boolean;
  function IsSubZonePVPPOI(this: void): boolean;
  function IsTrainingGroundsArena(this: void, lfgDungeonsID: number): boolean;
  function IsTrainingGroundsBG(this: void, lfgDungeonsID: number): boolean;
  function IsWarModeActive(this: void): boolean;
  function IsWarModeDesired(this: void): boolean;
  function IsWarModeFeatureEnabled(this: void): boolean;
  function JoinBattlefield(this: void, battlemasterListId: number): void;
  function JoinBrawl(this: void, isSpecialBrawl?: boolean): void;
  function JoinRandomTrainingGroundArena(this: void): void;
  function JoinRandomTrainingGroundBG(this: void): void;
  function JoinRatedBGBlitz(this: void): void;
  function JoinTrainingGround(this: void, trainingGroundID: number): void;
  function RequestCrowdControlSpell(this: void, playerToken: string): void;
  function SetPVP(this: void, enablePVP?: boolean): void;
  function SetWarModeDesired(this: void, warModeDesired: boolean): void;
  function StartSoloRBGWarGameByName(this: void, args: string): number;
  function StartSpectatorSoloRBGWarGame(this: void, opaqueID1: number, opaqueID2: number, specifiedMap: string, tournamentRules: boolean): number;
  function TogglePVP(this: void): void;
  function ToggleWarMode(this: void): void;

}

declare namespace C_QuestHub {
  function IsAreaPOICurrentlyRelatedToHub(this: void, areaPoiID: number, hubAreaPoiID: number): boolean;
  function IsQuestCurrentlyRelatedToHub(this: void, questID: number, hubAreaPoiID: number): boolean;

}

declare namespace C_QuestInfoSystem {
  function GetQuestClassification(this: void, questID?: number | undefined, questInfoID?: number | undefined): WowApi.QuestClassification;
  function GetQuestHasShortExpirationWarning(this: void, questID?: number | undefined): boolean;
  function GetQuestLogRewardFavor(this: void, questID?: number | undefined, clampFavorToCycleCap?: boolean | undefined): number;
  function GetQuestRewardCurrencies(this: void, questID?: number | undefined): readonly WowApi.QuestRewardCurrencyInfo[] | undefined;
  function GetQuestRewardSpellInfo(this: void, questID: number | undefined, spellID: number): WowApi.QuestRewardSpellInfo | undefined;
  function GetQuestRewardSpells(this: void, questID?: number | undefined): readonly number[] | undefined;
  function GetQuestShouldToastCompletion(this: void, questID?: number | undefined): boolean;
  function HasQuestRewardCurrencies(this: void, questID?: number | undefined): boolean;
  function HasQuestRewardSpells(this: void, questID?: number | undefined): boolean;

}

declare namespace C_QuestItemUse {
  function CanUseQuestItemOnObject(this: void, item: WowApi.ItemLocation, unit: string, checkRange?: boolean | undefined): boolean;

}

declare namespace C_QuestLine {
  function GetAvailableQuestLines(this: void, uiMapID: number): readonly WowApi.QuestLineInfo[];
  function GetForceVisibleQuests(this: void, uiMapID: number): readonly number[];
  function GetQuestLineInfo(this: void, questID: number, uiMapID?: number | undefined, displayableOnly?: boolean): WowApi.QuestLineInfo | undefined;
  function GetQuestLineQuests(this: void, questLineID: number): readonly number[];
  function IsComplete(this: void, questLineID: number): boolean;
  function QuestLineIgnoresAccountCompletedFiltering(this: void, uiMapID: number, questLineID: number): boolean;
  function RequestQuestLinesForMap(this: void, uiMapID: number): void;

}

declare namespace C_QuestLog {
  function AbandonQuest(this: void): void;
  function AddQuestWatch(this: void, questID: number): boolean;
  function AddWorldQuestWatch(this: void, questID: number, watchType?: WowApi.QuestWatchType | undefined): boolean;
  function CanAbandonQuest(this: void, questID: number): boolean;
  function DoesQuestAwardReputationWithFaction(this: void, questID: number, targetFactionID: number): boolean;
  function GetAbandonQuest(this: void): number;
  function GetAbandonQuestItems(this: void): readonly number[] | undefined;
  function GetActivePreyQuest(this: void): number | undefined;
  function GetActiveThreatMaps(this: void): readonly number[] | undefined;
  function GetAllCompletedQuestIDs(this: void): readonly number[];
  function GetBountiesForMapID(this: void, uiMapID: number): readonly WowApi.BountyInfo[] | undefined;
  function GetBountySetInfoForMapID(this: void, uiMapID: number): LuaMultiReturn<[displayLocation: WowApi.MapOverlayDisplayLocation, lockQuestID: number, bountySetID: number, isActivitySet: boolean]> | undefined;
  function GetDistanceSqToQuest(this: void, questID: number): LuaMultiReturn<[distanceSq: number, onContinent: boolean]> | undefined;
  function GetHeaderIndexForQuest(this: void, questID: number): number | undefined;
  function GetInfo(this: void, questLogIndex: number): WowApi.QuestInfo | undefined;
  function GetLogIndexForQuestID(this: void, questID: number): number | undefined;
  function GetMapForQuestPOIs(this: void): number;
  function GetMaxNumQuests(this: void): number;
  function GetMaxNumQuestsCanAccept(this: void): number;
  function GetNextWaypoint(this: void, questID: number): LuaMultiReturn<[mapID: number, x: number, y: number]> | undefined;
  function GetNextWaypointForMap(this: void, questID: number, uiMapID: number): LuaMultiReturn<[x: number, y: number]> | undefined;
  function GetNextWaypointText(this: void, questID: number): string | undefined;
  function GetNumQuestLogEntries(this: void): LuaMultiReturn<[numShownEntries: number, numQuests: number]>;
  function GetNumQuestObjectives(this: void, questID: number): number;
  function GetNumQuestWatches(this: void): number;
  function GetNumWorldQuestWatches(this: void): number;
  function GetQuestAdditionalHighlights(this: void, questID: number): LuaMultiReturn<[uiMapID: number, worldQuests: boolean, worldQuestsElite: boolean, dungeons: boolean, treasures: boolean]>;
  function GetQuestDetailsTheme(this: void, questID: number): WowApi.QuestTheme | undefined;
  function GetQuestDifficultyLevel(this: void, questID: number): number;
  function GetQuestIDForLogIndex(this: void, questLogIndex: number): number | undefined;
  function GetQuestIDForQuestWatchIndex(this: void, questWatchIndex: number): number | undefined;
  function GetQuestIDForWorldQuestWatchIndex(this: void, questWatchIndex: number): number | undefined;
  function GetQuestLogMajorFactionReputationRewards(this: void, questID: number): readonly WowApi.QuestRewardReputationInfo[] | undefined;
  function GetQuestLogPortraitGiver(this: void, questLogIndex?: number | undefined): LuaMultiReturn<[portraitGiver: number, portraitGiverText: string, portraitGiverName: string, portraitGiverMount: number, portraitGiverModelSceneID: number | undefined]> | undefined;
  function GetQuestObjectives(this: void, questID: number): readonly WowApi.QuestObjectiveInfo[] | undefined;
  function GetQuestRewardCurrencies(this: void, questID: number): readonly WowApi.QuestRewardCurrencyInfo[];
  function GetQuestRewardCurrencyInfo(this: void, questID: number, currencyIndex: number, isChoice: boolean): WowApi.QuestRewardCurrencyInfo | undefined;
  function GetQuestsOnMap(this: void, uiMapID: number): readonly WowApi.QuestPOIMapInfo[] | undefined;
  function GetQuestTagInfo(this: void, questID: number): WowApi.QuestTagInfo | undefined;
  function GetQuestTimers(this: void): readonly WowApi.QuestTimerInfo[];
  function GetQuestType(this: void, questID: number): number | undefined;
  function GetQuestWatchType(this: void, questID: number): WowApi.QuestWatchType | undefined;
  function GetRequiredMoney(this: void, questID?: number | undefined): number;
  function GetSelectedQuest(this: void): number;
  function GetSuggestedGroupSize(this: void, questID: number): number;
  function GetTimeAllowed(this: void, questID: number): LuaMultiReturn<[totalTime: number, elapsedTime: number]> | undefined;
  function GetTitleForLogIndex(this: void, questLogIndex: number): string | undefined;
  function GetTitleForQuestID(this: void, questID: number): string | undefined;
  function GetTrivialRange(this: void): number;
  function GetZoneStoryInfo(this: void, uiMapID: number): LuaMultiReturn<[achievementID: number, storyMapID: number]> | undefined;
  function HasActiveThreats(this: void): boolean;
  function IsAccountQuest(this: void, questID: number): boolean;
  function IsComplete(this: void, questID: number): boolean;
  function IsEliteQuest(this: void, questID: number): boolean;
  function IsFailed(this: void, questID: number): boolean;
  function IsImportantQuest(this: void, questID: number): boolean;
  function IsMetaQuest(this: void, questID: number): boolean;
  function IsOnMap(this: void, questID: number): LuaMultiReturn<[onMap: boolean, hasLocalPOI: boolean]>;
  function IsOnQuest(this: void, questID: number): boolean;
  function IsPushableQuest(this: void, questID: number): boolean;
  function IsQuestBounty(this: void, questID: number): boolean;
  function IsQuestCalling(this: void, questID: number): boolean;
  function IsQuestCriteriaForBounty(this: void, questID: number, bountyQuestID: number): boolean;
  function IsQuestDisabledForSession(this: void, questID: number): boolean;
  function IsQuestFlaggedCompleted(this: void, questID: number): boolean;
  function IsQuestFlaggedCompletedOnAccount(this: void, questID: number): boolean;
  function IsQuestFromContentPush(this: void, questID: number): boolean;
  function IsQuestInvasion(this: void, questID: number): boolean;
  function IsQuestReplayable(this: void, questID: number): boolean;
  function IsQuestReplayedRecently(this: void, questID: number): boolean;
  function IsQuestTask(this: void, questID: number): boolean;
  function IsQuestTrivial(this: void, questID: number): boolean;
  function IsRepeatableQuest(this: void, questID: number): boolean;
  function IsThreatQuest(this: void, questID: number): boolean;
  function IsUnitOnQuest(this: void, unit: string, questID: number): boolean;
  function IsWorldQuest(this: void, questID: number): boolean;
  function QuestCanHaveWarModeBonus(this: void, questID: number): boolean;
  function QuestContainsFirstTimeRepBonusForPlayer(this: void, questID: number): boolean;
  function QuestHasQuestSessionBonus(this: void, questID: number): boolean;
  function QuestHasWarModeBonus(this: void, questID: number): boolean;
  function QuestIgnoresAccountCompletedFiltering(this: void, questID: number): boolean;
  function ReadyForTurnIn(this: void, questID: number): boolean | undefined;
  function RemoveQuestWatch(this: void, questID: number): boolean;
  function RemoveWorldQuestWatch(this: void, questID: number): boolean;
  function RequestLoadQuestByID(this: void, questID: number): void;
  function SetAbandonQuest(this: void): void;
  function SetMapForQuestPOIs(this: void, uiMapID: number): void;
  function SetSelectedQuest(this: void, questID: number): void;
  function ShouldDisplayTimeRemaining(this: void, questID: number): boolean;
  function ShouldShowQuestRewards(this: void, questID: number): boolean;
  function SortQuestWatches(this: void): void;
  function UnitIsRelatedToActiveQuest(this: void, unit: string): boolean;
  function UpdateCampaignHeaders(this: void): void;

}

declare namespace C_QuestOffer {
  function GetHideRequiredItems(this: void): boolean;
  function GetQuestOfferMajorFactionReputationRewards(this: void): readonly WowApi.QuestRewardReputationInfo[] | undefined;
  function GetQuestRequiredCurrencyInfo(this: void, questRewardIndex: number): WowApi.QuestRequiredCurrencyInfo | undefined;
  function GetQuestRewardCurrencyInfo(this: void, questInfoType: string, questRewardIndex: number): WowApi.QuestRewardCurrencyInfo | undefined;

}

declare namespace C_QuestSession {
  function CanStart(this: void): boolean;
  function CanStop(this: void): boolean;
  function Exists(this: void): boolean;
  function GetAvailableSessionCommand(this: void): WowApi.QuestSessionCommand;
  function GetPendingCommand(this: void): WowApi.QuestSessionCommand;
  function GetProposedMaxLevelForSession(this: void): number;
  function GetSessionBeginDetails(this: void): WowApi.QuestSessionPlayerDetails | undefined;
  function GetSuperTrackedQuest(this: void): number | undefined;
  function HasJoined(this: void): boolean;
  function HasPendingCommand(this: void): boolean;
  function RequestSessionStart(this: void): void;
  function RequestSessionStop(this: void): void;
  function SendSessionBeginResponse(this: void, beginSession: boolean): void;
  function SetQuestIsSuperTracked(this: void, questID: number, superTrack: boolean): void;

}

declare namespace C_RaidLocks {
  function GetRedirectedDifficultyID(this: void, mapID: number, difficultyID: number): number;
  function IsEncounterComplete(this: void, mapID: number, encounterID: number, difficultyID?: number | undefined): boolean;
  function IsRaidLockExtendFeatureEnabled(this: void): boolean;
  function IsRaidLockExtendFeatureSupported(this: void): boolean;

}

declare namespace C_RecentAllies {
  function CanSetRecentAllyNote(this: void, characterGUID: string): boolean;
  function GetRecentAllies(this: void): readonly WowApi.RecentAllyData[];
  function GetRecentAllyByFullName(this: void, fullCharacterName: string): WowApi.RecentAllyData | undefined;
  function GetRecentAllyByGUID(this: void, characterGUID: string): WowApi.RecentAllyData | undefined;
  function IsInteractionCategoryFilterSupportedForCurrentGameType(this: void, interactionCategoryFilter: WowApi.RecentAlliesInteractionCategoryFilter): boolean;
  function IsRecentAllyByFullName(this: void, fullCharacterName: string): boolean;
  function IsRecentAllyByGUID(this: void, characterGUID: string): boolean;
  function IsRecentAllyDataReady(this: void): boolean;
  function IsRecentAllyPinned(this: void, characterGUID: string): boolean;
  function IsSystemEnabled(this: void): boolean;
  function IsSystemSupported(this: void): boolean;
  function SearchRecentAllies(this: void, searchInfo: WowApi.RecentAlliesSearchInfo): readonly WowApi.RecentAllyData[];
  function SetRecentAllyNote(this: void, characterGUID: string, note: string): void;
  function SetRecentAllyPinned(this: void, characterGUID: string, isPinned: boolean): void;
  function TryRequestRecentAlliesData(this: void): void;

}

declare namespace C_RecruitAFriend {
  function CanSummonFriend(this: void, guid: string): LuaMultiReturn<[canSummon: boolean, reason: WowApi.RecruitAFriendFailure]> | undefined;
  function ClaimActivityReward(this: void, activityID: number, acceptanceID: string): boolean;
  function ClaimNextReward(this: void, rafVersion?: WowApi.RecruitAFriendRewardsVersion | undefined): boolean;
  function GenerateRecruitmentLink(this: void): boolean;
  function GetRAFInfo(this: void): WowApi.RafInfo;
  function GetRAFSystemInfo(this: void): WowApi.RafSystemInfo;
  function GetRecruitActivityRequirementsText(this: void, activityID: number, acceptanceID: string): readonly string[];
  function GetRecruitInfo(this: void): LuaMultiReturn<[active: boolean, faction: number]>;
  function GetSummonFriendCooldown(this: void): LuaMultiReturn<[startTimeSeconds: number, durationSeconds: number, enableCooldownTimer: boolean]>;
  function IsRecruitAFriendLinked(this: void, guid: string): boolean;
  function IsRecruitingEnabled(this: void): boolean;
  function IsSystemEnabled(this: void): boolean;
  function IsSystemSupported(this: void): boolean;
  function RemoveRAFRecruit(this: void, wowAccountGUID: string): boolean;
  function RequestUpdatedRecruitmentInfo(this: void): boolean;
  function SummonFriend(this: void, target: string, name: string): void;

}

declare namespace C_RemixArtifactUI {
  function ClearRemixArtifactItem(this: void): void;
  function GetAppearanceInfoByID(this: void, artifactAppearanceID: number): LuaMultiReturn<[uiCameraID: number, altHandUICameraID: number | undefined]> | undefined;
  function GetArtifactArtInfo(this: void): WowApi.RemixArtifactArtInfo | undefined;
  function GetArtifactItemInfo(this: void): LuaMultiReturn<[itemID: number, altItemID: number | undefined, artifactAppearanceID: number, appearanceModID: number, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean]> | undefined;
  function GetCurrArtifactItemID(this: void): number | undefined;
  function GetCurrItemSpecIndex(this: void): number | undefined;
  function GetCurrTraitTreeID(this: void): number | undefined;
  function ItemInSlotIsRemixArtifact(this: void, invSlot: number): boolean;

}

declare namespace C_ReportSystem {
  function CanReportPlayer(this: void, playerLocation: WowApi.PlayerLocation): boolean;
  function CanReportPlayerForLanguage(this: void, playerLocation: WowApi.PlayerLocation): boolean;
  function GetMajorCategoriesForReportType(this: void, reportType: WowApi.ReportType): readonly WowApi.ReportMajorCategory[];
  function GetMajorCategoryString(this: void, majorCategory: WowApi.ReportMajorCategory): string;
  function GetMinorCategoriesForReportTypeAndMajorCategory(this: void, reportType: WowApi.ReportType, majorCategory: WowApi.ReportMajorCategory): readonly WowApi.ReportMinorCategory[];
  function GetMinorCategoryString(this: void, minorCategory: WowApi.ReportMinorCategory): string;
  function ReportServerLag(this: void): void;
  function ReportStuckInCombat(this: void): void;
  function RequiresScreenshotForReportType(this: void, reportType: WowApi.ReportType, majorCategory: WowApi.ReportMajorCategory): boolean;
  function SendReport(this: void, reportInfo: WowApi.ReportInfo, playerLocation?: WowApi.PlayerLocation | undefined): void;
  function SetScreenshotPreviewTexture(this: void, textureObject: WowApi.SimpleTexture): void;
  function TakeReportScreenshot(this: void): void;

}

declare namespace C_Reputation {
  function AreLegacyReputationsShown(this: void): boolean;
  function CollapseAllFactionHeaders(this: void): void;
  function CollapseFactionHeader(this: void, factionSortIndex: number): void;
  function ExpandAllFactionHeaders(this: void): void;
  function ExpandFactionHeader(this: void, factionSortIndex: number): void;
  function GetFactionDataByID(this: void, factionID: number): WowApi.FactionData | undefined;
  function GetFactionDataByIndex(this: void, factionSortIndex: number): WowApi.FactionData | undefined;
  function GetFactionParagonInfo(this: void, factionID: number): LuaMultiReturn<[currentValue: number, threshold: number, rewardQuestID: number, hasRewardPending: boolean, tooLowLevelForParagon: boolean, paragonStorageLevel: number]> | undefined;
  function GetGuildFactionData(this: void): WowApi.FactionData | undefined;
  function GetGuildRepExpirationTime(this: void): number | undefined;
  function GetNumFactions(this: void): number;
  function GetReputationSortType(this: void): WowApi.ReputationSortType;
  function GetSelectedFaction(this: void): number;
  function GetWatchedFactionData(this: void): WowApi.FactionData | undefined;
  function IsAccountWideReputation(this: void, factionID: number): boolean;
  function IsFactionActive(this: void, factionSortIndex: number): boolean;
  function IsFactionParagon(this: void, factionID: number): boolean;
  function IsFactionParagonForCurrentPlayer(this: void, factionID: number): boolean;
  function IsMajorFaction(this: void, factionID: number): boolean;
  function RequestFactionParagonPreloadRewardData(this: void, factionID: number): void;
  function SetFactionActive(this: void, factionSortIndex: number, setActive: boolean): void;
  function SetLegacyReputationsShown(this: void, showLegacyReputations: boolean): void;
  function SetReputationSortType(this: void, sortType: WowApi.ReputationSortType): void;
  function SetSelectedFaction(this: void, factionSortIndex: number): void;
  function SetWatchedFactionByID(this: void, factionID: number): void;
  function SetWatchedFactionByIndex(this: void, factionSortIndex: number): void;
  function ToggleFactionAtWar(this: void, factionSortIndex: number): void;

}

declare namespace C_ResearchInfo {
  function GetDigSitesForMap(this: void, uiMapID: number): readonly WowApi.DigSiteMapInfo[];

}

declare namespace C_RestrictedActions {
  function CheckAllowProtectedFunctions(this: void, object: WowApi.SimpleFrameScriptObject, silent?: boolean): boolean;
  function GetAddOnRestrictionState(this: void, type: WowApi.AddOnRestrictionType): WowApi.AddOnRestrictionState;
  function InCombatLockdown(this: void): boolean;
  function IsAddOnRestrictionActive(this: void, type: WowApi.AddOnRestrictionType): boolean;

}

declare namespace C_Roleset {
  function ApplyRolesetFilters(this: void, blockedRolesets: readonly string[], allowedRolesets: readonly string[]): void;
  function GetActiveAllowedRolesets(this: void): readonly string[];
  function GetActiveBlockedRolesets(this: void): readonly string[];

}

declare namespace C_ScenarioInfo {
  function GetCriteriaInfo(this: void, criteriaIndex: number): WowApi.ScenarioCriteriaInfo | undefined;
  function GetCriteriaInfoByStep(this: void, stepID: number, criteriaIndex: number): WowApi.ScenarioCriteriaInfo | undefined;
  function GetDisplayInfo(this: void): WowApi.ScenarioDisplayInfo | undefined;
  function GetJailersTowerTypeString(this: void, runType: WowApi.JailersTowerType): string | undefined;
  function GetScenarioIconInfo(this: void, uiMapID: number): readonly WowApi.ScenarioIconInfo[] | undefined;
  function GetScenarioInfo(this: void): WowApi.ScenarioInformation | undefined;
  function GetScenarioStepInfo(this: void, scenarioStepID?: number | undefined): WowApi.ScenarioStepInfo | undefined;
  function GetTieredEntranceActiveSpells(this: void): readonly number[] | undefined;
  function GetUnitCriteriaProgressValues(this: void, unit: string): LuaMultiReturn<[actualValue: number, percentValue: number, percentValueString: string]> | undefined;
  function IsTieredEntranceScenario(this: void): boolean;

}

declare namespace C_ScrappingMachineUI {
  function CloseScrappingMachine(this: void): void;
  function DropPendingScrapItemFromCursor(this: void, index: number): void;
  function GetCurrentPendingScrapItemLocationByIndex(this: void, index: number): WowApi.ItemLocation | undefined;
  function GetScrappingMachineName(this: void): string | undefined;
  function GetScrapSpellID(this: void): number;
  function HasScrappableItems(this: void): boolean;
  function RemoveAllScrapItems(this: void): void;
  function RemoveCurrentScrappingItem(this: void): void;
  function RemoveItemToScrap(this: void, index: number): void;
  function ScrapItems(this: void): void;
  function ValidateScrappingList(this: void): void;

}

declare namespace C_ScriptedAnimations {
  function GetAllScriptedAnimationEffects(this: void): readonly WowApi.ScriptedAnimationEffect[];

}

declare namespace C_ScriptWarnings {

}

declare namespace C_SeasonInfo {
  function GetCurrentDisplaySeasonExpansion(this: void): number | undefined;
  function GetCurrentDisplaySeasonID(this: void): number;
  function GetTimeUntilCurrentPVPSeasonEnd(this: void): number;

}

declare namespace C_Secrets {
  function CanCompareUnitTokens(this: void, unit1: string, unit2: string): boolean;
  function GetPowerTypeSecrecy(this: void, powerType: WowApi.PowerType): WowApi.SecrecyLevel;
  function GetSpellAuraSecrecy(this: void, spellIdentifier: number | string): WowApi.SecrecyLevel;
  function GetSpellCastSecrecy(this: void, spellIdentifier: number | string): WowApi.SecrecyLevel;
  function GetSpellCooldownSecrecy(this: void, spellIdentifier: number | string): WowApi.SecrecyLevel;
  function HasSecretRestrictions(this: void): boolean;
  function ShouldActionCooldownBeSecret(this: void, actionID: number): boolean;
  function ShouldAurasBeSecret(this: void): boolean;
  function ShouldCooldownsBeSecret(this: void): boolean;
  function ShouldSpellAuraBeSecret(this: void, spellIdentifier: number | string): boolean;
  function ShouldSpellBookItemCooldownBeSecret(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function ShouldSpellCooldownBeSecret(this: void, spellIdentifier: number | string): boolean;
  function ShouldTotemSlotBeSecret(this: void, slot: number): boolean;
  function ShouldTotemSpellBeSecret(this: void, spellID: number): boolean;
  function ShouldUnitAuraIndexBeSecret(this: void, unit: string, index: number, filter?: WowApi.AuraFilters | undefined): boolean;
  function ShouldUnitAuraInstanceBeSecret(this: void, unit: string, auraInstanceID: number): boolean;
  function ShouldUnitAuraSlotBeSecret(this: void, unit: string, slot: number): boolean;
  function ShouldUnitComparisonBeSecret(this: void, unit1: string, unit2: string): boolean;
  function ShouldUnitHealthMaxBeSecret(this: void, unit: string): boolean;
  function ShouldUnitIdentityBeSecret(this: void, unit: string): boolean;
  function ShouldUnitPowerBeSecret(this: void, unit: string, powerType?: WowApi.PowerType | undefined): boolean;
  function ShouldUnitPowerMaxBeSecret(this: void, unit: string, powerType?: WowApi.PowerType | undefined): boolean;
  function ShouldUnitSpellCastBeSecret(this: void, unit: string, spellIdentifier: number | string): boolean;
  function ShouldUnitSpellCastingBeSecret(this: void, unit: string): boolean;
  function ShouldUnitStatsBeSecret(this: void): boolean;
  function ShouldUnitThreatStateBeSecret(this: void, unit: string, mobUnit?: string | undefined): boolean;
  function ShouldUnitThreatValuesBeSecret(this: void, unit: string, mobUnit: string): boolean;

}

declare namespace C_SecureTransfer {
  function AcceptTrade(this: void): void;
  function Cancel(this: void): void;
  function CompleteHousingPurchase(this: void): void;
  function CompleteHousingVCPurchase(this: void): void;
  function GetHousingPurchaseCost(this: void): number;
  function GetHousingPurchaseQuantity(this: void): number;
  function GetHousingVCPurchaseProductID(this: void): number;
  function GetMailInfo(this: void): WowApi.MailInfo;
  function GetTradePartner(this: void): string | undefined;
  function SendMail(this: void): void;
  function ShouldShowTradeOfferWarning(this: void): boolean;

}

declare namespace C_SettingsUtil {
  function NotifySettingsLoaded(this: void): void;
  function OpenSettingsPanel(this: void, openToCategoryID?: number | undefined, scrollToElementName?: string | undefined): void;

}

declare namespace C_SkillInfo {
  function AbandonSkill(this: void, skillLineID: number): void;
  function CollapseSkillHeader(this: void, index: number): void;
  function ExpandSkillHeader(this: void, index: number): void;
  function GetNumSkillLines(this: void): number;
  function GetSelectedSkill(this: void): number;
  function GetSkillLineInfo(this: void, index: number): WowApi.SkillLineAttributes | undefined;
  function GetSkillLineInfoByID(this: void, ID: number): WowApi.SkillLineAttributes | undefined;
  function SetSelectedSkill(this: void, index: number): void;

}

declare namespace C_SocialQueue {
  function GetAllGroups(this: void, allowNonJoinable?: boolean, allowNonQueuedGroups?: boolean): readonly string[];
  function GetConfig(this: void): WowApi.SocialQueueConfig | undefined;
  function GetGroupForPlayer(this: void, playerGUID: string): LuaMultiReturn<[groupGUID: string, isSoloQueueParty: boolean]> | undefined;
  function GetGroupInfo(this: void, groupGUID: string): LuaMultiReturn<[canJoin: boolean, numQueues: number, needTank: boolean, needHealer: boolean, needDamage: boolean, isSoloQueueParty: boolean, questSessionActive: boolean, leaderGUID: string]> | undefined;
  function GetGroupMembers(this: void, groupGUID: string): readonly WowApi.SocialQueuePlayerInfo[] | undefined;
  function GetGroupQueues(this: void, groupGUID: string): readonly WowApi.SocialQueueGroupQueueInfo[] | undefined;
  function IsSystemEnabled(this: void): boolean;
  function IsSystemSupported(this: void): boolean;
  function RequestToJoin(this: void, groupGUID: string, applyAsTank?: boolean, applyAsHealer?: boolean, applyAsDamage?: boolean): boolean;
  function SignalToastDisplayed(this: void, groupGUID: string, priority: number): void;

}

declare namespace C_SocialRestrictions {
  function AcknowledgeRegionalChatDisabled(this: void): void;
  function CanReceiveChat(this: void): boolean;
  function CanSendChat(this: void): boolean;
  function IsChatDisabled(this: void): boolean;
  function IsFriendsDisabled(this: void): boolean;
  function IsMuted(this: void): boolean;
  function IsSilenced(this: void): boolean;
  function IsSquelched(this: void): boolean;
  function SetChatDisabled(this: void, disabled: boolean): void;

}

declare namespace C_SocialUI {
  function IsSystemEnabled(this: void): boolean;

}

declare namespace C_Soulbinds {
  function ActivateSoulbind(this: void, soulbindID: number): void;
  function CanActivateSoulbind(this: void, soulbindID: number): LuaMultiReturn<[result: boolean, errorDescription: string | undefined]>;
  function CanModifySoulbind(this: void): boolean;
  function CanResetConduitsInSoulbind(this: void, soulbindID: number): LuaMultiReturn<[result: boolean, errorDescription: string | undefined]>;
  function CanSwitchActiveSoulbindTreeBranch(this: void): boolean;
  function CloseUI(this: void): void;
  function CommitPendingConduitsInSoulbind(this: void, soulbindID: number): void;
  function FindNodeIDActuallyInstalled(this: void, soulbindID: number, conduitID: number): number;
  function FindNodeIDAppearingInstalled(this: void, soulbindID: number, conduitID: number): number;
  function FindNodeIDPendingInstall(this: void, soulbindID: number, conduitID: number): number;
  function FindNodeIDPendingUninstall(this: void, soulbindID: number, conduitID: number): number;
  function GetActiveSoulbindID(this: void): number;
  function GetConduitCollection(this: void, conduitType: WowApi.SoulbindConduitType): readonly WowApi.ConduitCollectionData[];
  function GetConduitCollectionCount(this: void): number;
  function GetConduitCollectionData(this: void, conduitID: number): WowApi.ConduitCollectionData | undefined;
  function GetConduitCollectionDataAtCursor(this: void): WowApi.ConduitCollectionData | undefined;
  function GetConduitCollectionDataByVirtualID(this: void, virtualID: number): WowApi.ConduitCollectionData | undefined;
  function GetConduitDisplayed(this: void, nodeID: number): number;
  function GetConduitHyperlink(this: void, conduitID: number, rank: number): string;
  function GetConduitIDPendingInstall(this: void, nodeID: number): number;
  function GetConduitQuality(this: void, conduitID: number, rank: number): number;
  function GetConduitRank(this: void, conduitID: number): number;
  function GetConduitSpellID(this: void, conduitID: number, conduitRank: number): number;
  function GetInstalledConduitID(this: void, nodeID: number): number;
  function GetNode(this: void, nodeID: number): WowApi.SoulbindNode;
  function GetSoulbindData(this: void, soulbindID: number): WowApi.SoulbindData;
  function GetSpecsAssignedToSoulbind(this: void, soulbindID: number): readonly number[];
  function GetTree(this: void, treeID: number): WowApi.SoulbindTree;
  function HasAnyInstalledConduitInSoulbind(this: void, soulbindID: number): boolean;
  function HasAnyPendingConduits(this: void): boolean;
  function HasPendingConduitsInSoulbind(this: void, soulbindID: number): boolean;
  function IsConduitInstalled(this: void, nodeID: number): boolean;
  function IsConduitInstalledInSoulbind(this: void, soulbindID: number, conduitID: number): boolean;
  function IsItemConduitByItemInfo(this: void, itemInfo: number | string): boolean;
  function IsNodePendingModify(this: void, nodeID: number): boolean;
  function IsUnselectedConduitPendingInSoulbind(this: void, soulbindID: number): boolean;
  function ModifyNode(this: void, nodeID: number, conduitID: number, type: WowApi.SoulbindConduitTransactionType): void;
  function SelectNode(this: void, nodeID: number): void;
  function UnmodifyNode(this: void, nodeID: number): void;

}

declare namespace C_Sound {
  function GetSoundScaledVolume(this: void, soundHandle: number): number;
  function IsPlaying(this: void, soundHandle: number): boolean;
  function PlayItemSound(this: void, soundType: WowApi.ItemSoundType, itemLocation: WowApi.ItemLocation): void;
  function PlaySound(this: void, soundKitID: number, uiSoundSubType?: WowApi.UISoundSubType, forceNoDuplicates?: boolean, runFinishCallback?: boolean, overridePriority?: number | undefined, volumeOverride?: number | undefined): LuaMultiReturn<[success: boolean, soundHandle: number]> | undefined;
  function PlaySoundWithOptions(this: void, params: WowApi.PlaySoundParams): LuaMultiReturn<[success: boolean, soundHandle: number]> | undefined;
  function PlayVocalErrorSound(this: void, vocalErrorSoundID: WowApi.Vocalerrorsounds): void;

}

declare namespace C_SpecializationInfo {
  function CanPlayerUsePVPTalentUI(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseTalentSpecUI(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function CanPlayerUseTalentUI(this: void): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
  function GetActiveSpecGroup(this: void, isInspect?: boolean | undefined, isPet?: boolean | undefined): number;
  function GetAllClassIDs(this: void): readonly number[];
  function GetAllSelectedPvpTalentIDs(this: void): readonly number[];
  function GetClassIDFromSpecID(this: void, specID: number): number | undefined;
  function GetCombatConfigIDForSpecGroup(this: void, groupIndex: number): number | undefined;
  function GetInspectSelectedPvpTalent(this: void, inspectedUnit: string, talentIndex: number): number | undefined;
  function GetInspectSpecialization(this: void, unit: string): number;
  function GetNumSpecializationsForClassID(this: void, classID: number): number;
  function GetPvpTalentAlertStatus(this: void): LuaMultiReturn<[hasUnspentSlot: boolean, hasNewTalent: boolean]>;
  function GetPvpTalentInfo(this: void, talentID: number): WowApi.PvpTalentInfo | undefined;
  function GetPvpTalentSlotInfo(this: void, talentIndex: number): WowApi.PvpTalentSlotInfo | undefined;
  function GetPvpTalentSlotUnlockLevel(this: void, talentIndex: number): number | undefined;
  function GetPvpTalentUnlockLevel(this: void, talentID: number): number | undefined;
  function GetSpecialization(this: void, isInspect?: boolean | undefined, isPet?: boolean | undefined, specGroupIndex?: number | undefined): number;
  function GetSpecializationInfo(this: void, specializationIndex: number, isInspect?: boolean, isPet?: boolean, inspectTarget?: string | undefined, sex?: number | undefined, groupIndex?: number | undefined, classID?: number | undefined): LuaMultiReturn<[specId: number, name: string | undefined, description: string | undefined, icon: number | undefined, role: string | undefined, primaryStat: number | undefined, pointsSpent: number, background: string | undefined, previewPointsSpent: number, isUnlocked: boolean]>;
  function GetSpecializationMasterySpells(this: void, specializationIndex: number, isInspect?: boolean | undefined, isPet?: boolean | undefined): readonly number[];
  function GetSpecIDs(this: void, specSetID: number): readonly number[];
  function GetSpellsDisplay(this: void, specializationID: number): readonly number[];
  function GetTalentInfo(this: void, query: WowApi.TalentInfoQuery): WowApi.TalentInfoResult | undefined;
  function HasPlayerEarnedATalentPoint(this: void): boolean;
  function IsInitialized(this: void): boolean;
  function IsPvpTalentLocked(this: void, talentID: number): boolean;
  function IsSpecSelectionEnabled(this: void, classID: number): boolean;
  function MatchesCurrentSpecSet(this: void, specSetID: number): boolean;
  function SetActiveSpecGroup(this: void, groupIndex: number): void;
  function SetPetSpecialization(this: void, specIndex: number, petNumber?: number | undefined): void;
  function SetPvpTalentLocked(this: void, talentID: number, locked: boolean): void;
  function SetSpecialization(this: void, specIndex: number): boolean;

}

declare namespace C_Spell {
  function CancelAutoRepeatSpell(this: void): boolean;
  function CancelItemTempEnchantment(this: void, weaponSlot: WowApi.WeaponSlot, enchantmentType: WowApi.ItemEnchantType): void;
  function CancelSpellByID(this: void, spellID: number): void;
  function DoesSpellExist(this: void, spellIdentifier: number | string): boolean;
  function EnableSpellRangeCheck(this: void, spellIdentifier: number | string, enable: boolean): void;
  function GetAuraStatChanges(this: void, spellID: number): LuaMultiReturn<[healthChange: number, powerTypeChanges: readonly WowApi.PowerTypeChange[]]>;
  function GetBaseSpell(this: void, spellIdentifier: number | string, spec?: number): number;
  function GetDeadlyDebuffInfo(this: void, spellIdentifier: number | string): WowApi.DeadlyDebuffInfo | undefined;
  function GetItemModifiedAppearancesApplied(this: void, spellID: number): readonly number[];
  function GetLastCategoryCooldownSource(this: void, spellCategory: number): LuaMultiReturn<[spellID: number | undefined, itemID: number | undefined]> | undefined;
  function GetMawPowerLinkBySpellID(this: void, spellID: number | string): string | undefined;
  function GetMawPowerRarityInfoBySpellID(this: void, spellID: number | string): LuaMultiReturn<[rarityID: number, rarityBorderAtlas: string]> | undefined;
  function GetOverrideSpell(this: void, spellIdentifier: number | string, spec?: number, onlyKnown?: boolean, ignoreOverrideSpellID?: number): number;
  function GetSchoolString(this: void, schoolMask: number): string;
  function GetSpellAutoCast(this: void, spellIdentifier: number | string): LuaMultiReturn<[autoCastAllowed: boolean, autoCastEnabled: boolean]> | undefined;
  function GetSpellCastCount(this: void, spellIdentifier: number | string): number;
  function GetSpellChargeDuration(this: void, spellIdentifier: number | string): WowApi.LuaDurationObject | undefined;
  function GetSpellCharges(this: void, spellIdentifier: number | string): WowApi.SpellChargeInfo | undefined;
  function GetSpellCooldown(this: void, spellIdentifier: number | string): WowApi.SpellCooldownInfo | undefined;
  function GetSpellCooldownDuration(this: void, spellIdentifier: number | string, ignoreGCD?: boolean): WowApi.LuaDurationObject | undefined;
  function GetSpellDescription(this: void, spellIdentifier: number | string): string | undefined;
  function GetSpellDescriptionForItemLocation(this: void, spellIdentifier: number | string, itemLocation: WowApi.ItemLocation): string | undefined;
  function GetSpellDisplayCount(this: void, spellIdentifier: number | string, maxDisplayCount?: number, replacementString?: string): string;
  function GetSpellIDForSpellIdentifier(this: void, spellIdentifier: number | string): number | undefined;
  function GetSpellInfo(this: void, spellIdentifier: number | string): WowApi.SpellInfo | undefined;
  function GetSpellLevelLearned(this: void, spellIdentifier: number | string): number;
  function GetSpellLink(this: void, spellIdentifier: number | string, glyphID?: number | undefined): string | undefined;
  function GetSpellLossOfControlCooldownDuration(this: void, spellIdentifier: number | string): WowApi.LuaDurationObject | undefined;
  function GetSpellLossOfControlCooldownInfo(this: void, spellIdentifier: number | string): WowApi.SpellLossOfControlInfo | undefined;
  function GetSpellMaxCumulativeAuraApplications(this: void, spellID: number | string): number;
  function GetSpellName(this: void, spellIdentifier: number | string): string | undefined;
  function GetSpellPowerCost(this: void, spellIdentifier: number | string): readonly WowApi.SpellPowerCostInfo[] | undefined;
  function GetSpellQueueWindow(this: void): number;
  function GetSpellSkillLineAbilityRank(this: void, spellIdentifier: number | string): number | undefined;
  function GetSpellSubtext(this: void, spellIdentifier: number | string): string | undefined;
  function GetSpellTexture(this: void, spellIdentifier: number | string): LuaMultiReturn<[iconID: number, originalIconID: number, conditionalIconID: number | undefined]> | undefined;
  function GetSpellTradeSkillLink(this: void, spellIdentifier: number | string): string | undefined;
  function GetTargetSpellID(this: void): number;
  function GetVisibilityInfo(this: void, spellID: number, visibilityType: WowApi.SpellAuraVisibilityType): LuaMultiReturn<[hasCustom: boolean, alwaysShowMine: boolean, showForMySpec: boolean]> | undefined;
  function IsActiveSpell(this: void, spellIdentifier: number | string, targetUnit?: string | undefined): boolean;
  function IsAutoAttackSpell(this: void, spellIdentifier: number | string): boolean;
  function IsAutoRepeatSpell(this: void, spellIdentifier: number | string): boolean;
  function IsClassTalentSpell(this: void, spellIdentifier: number | string): boolean;
  function IsConsumableSpell(this: void, spellIdentifier: number | string): boolean;
  function IsCurrentSpell(this: void, spellIdentifier: number | string): boolean;
  function IsExternalDefensive(this: void, spellID: number): boolean;
  function IsPressHoldReleaseSpell(this: void, spellIdentifier: number | string): boolean;
  function IsPriorityAura(this: void, spellID: number): boolean;
  function IsPvPTalentSpell(this: void, spellIdentifier: number | string): boolean;
  function IsRangedAutoAttackSpell(this: void, spellIdentifier: number | string): boolean;
  function IsSelfBuff(this: void, spellID: number): boolean;
  function IsSpellCrowdControl(this: void, spellIdentifier: number | string): boolean;
  function IsSpellDataCached(this: void, spellIdentifier: number | string): boolean;
  function IsSpellDisabled(this: void, spellIdentifier: number | string): boolean;
  function IsSpellHarmful(this: void, spellIdentifier: number | string): boolean;
  function IsSpellHelpful(this: void, spellIdentifier: number | string): boolean;
  function IsSpellImportant(this: void, spellIdentifier: number | string): boolean;
  function IsSpellInRange(this: void, spellIdentifier: number | string, targetUnit?: string | undefined): boolean | undefined;
  function IsSpellPassive(this: void, spellIdentifier: number | string): boolean;
  function IsSpellUsable(this: void, spellIdentifier: number | string): LuaMultiReturn<[isUsable: boolean, insufficientPower: boolean]>;
  function PickupSpell(this: void, spellIdentifier: number | string): void;
  function PlaceTargetingSpellAtCursor(this: void): void;
  function RequestLoadSpellData(this: void, spellIdentifier: number | string): void;
  function SetSpellAutoCastEnabled(this: void, spellIdentifier: number | string, enabled: boolean): void;
  function SpellHasRange(this: void, spellIdentifier: number | string): boolean;
  function TargetSpellChecksItemCondition(this: void): boolean;
  function TargetSpellIsEnchanting(this: void): boolean;
  function TargetSpellJumpsUpgradeTrack(this: void): boolean;
  function TargetSpellReplacesBonusTree(this: void): boolean;
  function ToggleSpellAutoCast(this: void, spellIdentifier: number | string): void;

}

declare namespace C_SpellActivationOverlay {
  function IsSpellOverlayed(this: void, spellID: number): boolean;

}

declare namespace C_SpellBook {
  function AbortSpellIntro(this: void, spellID: number): void;
  function CastSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank, targetSelf?: boolean): void;
  function ContainsAnyDisenchantSpell(this: void): boolean;
  function FindBaseSpellByID(this: void, spellID: number): number | undefined;
  function FindFlyoutSlotBySpellID(this: void, spellID: number): number;
  function FindSpellBookSlotForSpell(this: void, spellIdentifier: number | string, includeHidden?: boolean, includeFlyouts?: boolean, includeFutureSpells?: boolean, includeOffSpec?: boolean): LuaMultiReturn<[spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank]> | undefined;
  function FindSpellOverrideByID(this: void, spellID: number): number | undefined;
  function GetClassSkillLineInfo(this: void): WowApi.SpellBookSkillLineInfo | undefined;
  function GetCurrentLevelSpells(this: void, level: number): readonly number[] | undefined;
  function GetNumSpellBookSkillLines(this: void): number;
  function GetSkillLineIndexByID(this: void, skillLineID: number): number | undefined;
  function GetSpellBookItemAutoCast(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): LuaMultiReturn<[autoCastAllowed: boolean, autoCastEnabled: boolean]> | undefined;
  function GetSpellBookItemCastCount(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): number;
  function GetSpellBookItemChargeDuration(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.LuaDurationObject | undefined;
  function GetSpellBookItemCharges(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.SpellChargeInfo | undefined;
  function GetSpellBookItemCooldown(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.SpellCooldownInfo | undefined;
  function GetSpellBookItemCooldownDuration(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank, ignoreGCD?: boolean): WowApi.LuaDurationObject | undefined;
  function GetSpellBookItemDescription(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): string | undefined;
  function GetSpellBookItemInfo(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.SpellBookItemInfo | undefined;
  function GetSpellBookItemLevelLearned(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): number;
  function GetSpellBookItemLink(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank, glyphID?: number | undefined): string | undefined;
  function GetSpellBookItemLossOfControlCooldownDuration(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.LuaDurationObject | undefined;
  function GetSpellBookItemLossOfControlCooldownInfo(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.SpellLossOfControlInfo | undefined;
  function GetSpellBookItemName(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): LuaMultiReturn<[name: string, subName: string]> | undefined;
  function GetSpellBookItemPowerCost(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): readonly WowApi.SpellPowerCostInfo[] | undefined;
  function GetSpellBookItemSkillLineIndex(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): number | undefined;
  function GetSpellBookItemTexture(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): number | undefined;
  function GetSpellBookItemTradeSkillLink(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): string | undefined;
  function GetSpellBookItemType(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): LuaMultiReturn<[itemType: WowApi.SpellBookItemType, actionID: number, spellID: number | undefined]> | undefined;
  function GetSpellBookSkillLineInfo(this: void, skillLineIndex: number): WowApi.SpellBookSkillLineInfo | undefined;
  function HasPetSpells(this: void): LuaMultiReturn<[numPetSpells: number, petNameToken: string]> | undefined;
  function IsAutoAttackSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsClassTalentSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsPvPTalentSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsRangedAutoAttackSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemHarmful(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemHelpful(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemInRange(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank, targetUnit?: string | undefined): boolean | undefined;
  function IsSpellBookItemLooseFlyoutMember(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemLowRank(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemOffSpec(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemPassive(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function IsSpellBookItemUsable(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): LuaMultiReturn<[isUsable: boolean, insufficientPower: boolean]>;
  function IsSpellInSpellBook(this: void, spellID: number, spellBank?: WowApi.SpellBookSpellBank, includeOverrides?: boolean): boolean;
  function IsSpellKnown(this: void, spellID: number, spellBank?: WowApi.SpellBookSpellBank): boolean;
  function IsSpellKnownOrInSpellBook(this: void, spellID: number, spellBank?: WowApi.SpellBookSpellBank, includeOverrides?: boolean): boolean;
  function PickupSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): void;
  function SetBarSlotFromIntro(this: void, spellID: number, slotIndex: number): void;
  function SetSpellBookItemAutoCastEnabled(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank, enabled: boolean): void;
  function SpellBookItemHasRange(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): boolean;
  function ToggleSpellBookItemAutoCast(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): void;

}

declare namespace C_SpellDiminish {
  function GetAllSpellDiminishCategories(this: void, ruleset?: WowApi.SpellDiminishRuleset | undefined): readonly WowApi.SpellDiminishCategoryInfo[];
  function GetSpellDiminishCategoryInfo(this: void, category: WowApi.SpellDiminishCategory): WowApi.SpellDiminishCategoryInfo | undefined;
  function IsSystemSupported(this: void): boolean;
  function ShouldTrackSpellDiminishCategory(this: void, category: WowApi.SpellDiminishCategory, ruleset: WowApi.SpellDiminishRuleset): boolean;

}

declare namespace C_SplashScreen {
  function AcknowledgeSplash(this: void): void;
  function CanViewSplashScreen(this: void): boolean;
  function RequestLatestSplashScreen(this: void, fromGameMenu: boolean): void;
  function SendSplashScreenActionLaunchedTelem(this: void): void;
  function SendSplashScreenCloseTelem(this: void): void;

}

declare namespace C_StableInfo {
  function BuyStableSlot(this: void): void;
  function ClosePetStables(this: void): void;
  function GetActivePetList(this: void): readonly WowApi.PetInfo[];
  function GetAvailablePetSpecInfos(this: void): readonly WowApi.PetSpecInfo[];
  function GetNextStableSlotCost(this: void): number;
  function GetNumActivePets(this: void): number;
  function GetNumStablePets(this: void): number;
  function GetNumStableSlots(this: void): number;
  function GetStabledPetList(this: void): readonly WowApi.PetInfo[];
  function GetStablePetFoodTypes(this: void, index: number): readonly string[];
  function GetStablePetInfo(this: void, index: number): WowApi.PetInfo | undefined;
  function IsAtStableMaster(this: void): boolean;
  function IsBonusPetSlotAvailable(this: void): boolean;
  function IsPetFavorite(this: void, slot: number): boolean;
  function PickupStablePet(this: void, index: number): void;
  function SetPetFavorite(this: void, slot: number, isFavorite: boolean): void;
  function SetPetSlot(this: void, index: number, slot: number): void;

}

declare namespace C_StorePublic {
  function DoesGroupHavePurchaseableProducts(this: void, groupID: number): boolean;
  function EventStoreUISetShown(this: void, newShown: boolean, contextKey?: string | undefined): void;
  function IsEnabled(this: void): boolean;

}

declare namespace C_StringUtil {
  function CreateAbbreviatedNumberFormatter(this: void): WowApi.AbbreviatedNumberFormatter;
  function CreateNumericRuleFormatter(this: void): WowApi.NumericRuleFormatter;
  function CreateSecondsFormatter(this: void): WowApi.SecondsFormatter;
  function EscapeDecimalNonPrintables(this: void, text: string): string;
  function EscapeLuaFormatString(this: void, text: string): string;
  function EscapeLuaPatterns(this: void, text: string): string;
  function EscapeQuotedCodes(this: void, text: string): string;
  function FloorToNearestString(this: void, number: number): string;
  function RemoveContiguousSpaces(this: void, text: string, maxAllowedSpaces: number): string;
  function RoundToNearestString(this: void, number: number): string;
  function StripHyperlinks(this: void, text: string, maintainColor?: boolean, maintainBrackets?: boolean, stripNewlines?: boolean, maintainAtlases?: boolean, maintainTextures?: boolean): string;
  function StripTextureMarkupForLooseFiles(this: void, text: string): string;
  function TruncateWhenZero(this: void, number: number): string;
  function WrapString(this: void, infix: string, prefix?: string | undefined, suffix?: string | undefined): string;

}

declare namespace C_SummonInfo {
  function CancelSummon(this: void): void;
  function ConfirmSummon(this: void): void;
  function GetSummonConfirmAreaName(this: void): string;
  function GetSummonConfirmSummoner(this: void): string | undefined;
  function GetSummonConfirmTimeLeft(this: void): number;
  function GetSummonReason(this: void): number;
  function IsSummonSkippingStartExperience(this: void): boolean;

}

declare namespace C_SuperTrack {
  function ClearAllSuperTracked(this: void): void;
  function ClearSuperTrackedContent(this: void): void;
  function ClearSuperTrackedMapPin(this: void): void;
  function GetHighestPrioritySuperTrackingType(this: void): WowApi.SuperTrackingType | undefined;
  function GetSuperTrackedContent(this: void): LuaMultiReturn<[trackableType: WowApi.ContentTrackingType, trackableID: number]> | undefined;
  function GetSuperTrackedItemName(this: void): LuaMultiReturn<[name: string, description: string]> | undefined;
  function GetSuperTrackedMapPin(this: void): LuaMultiReturn<[type: WowApi.SuperTrackingMapPinType, typeID: number]> | undefined;
  function GetSuperTrackedQuestID(this: void): number | undefined;
  function GetSuperTrackedVignette(this: void): string | undefined;
  function IsSuperTrackingAnything(this: void): boolean;
  function IsSuperTrackingContent(this: void): boolean;
  function IsSuperTrackingCorpse(this: void): boolean;
  function IsSuperTrackingMapPin(this: void): boolean;
  function IsSuperTrackingQuest(this: void): boolean;
  function IsSuperTrackingUserWaypoint(this: void): boolean;
  function SetSuperTrackedContent(this: void, trackableType: WowApi.ContentTrackingType, trackableID: number): void;
  function SetSuperTrackedMapPin(this: void, type: WowApi.SuperTrackingMapPinType, typeID: number): void;
  function SetSuperTrackedQuestID(this: void, questID: number): void;
  function SetSuperTrackedUserWaypoint(this: void, superTracked: boolean): void;
  function SetSuperTrackedVignette(this: void, vignetteGUID: string): void;

}

declare namespace C_SwingTimer {
  function EnableRangeCheck(this: void, swingType: WowApi.PlayerSwingType, enable: boolean): void;
  function IsTargetWithinSwingRange(this: void, swingType: WowApi.PlayerSwingType): boolean | undefined;

}

declare namespace C_System {
  function GetFrameStack(this: void): readonly WowApi.SimpleScriptRegion[];

}

declare namespace C_SystemVisibilityManager {
  function IsSystemVisible(this: void, system: WowApi.UISystemType): boolean;

}

declare namespace C_TalkingHead {

}

declare namespace C_TaskQuest {
  function DoesMapShowTaskQuestObjectives(this: void, uiMapID: number): boolean;
  function GetQuestInfoByQuestID(this: void, questID: number): LuaMultiReturn<[questTitle: string, factionID: number | undefined, capped: boolean | undefined, displayAsObjective: boolean | undefined]> | undefined;
  function GetQuestLocation(this: void, questID: number, uiMapID: number): LuaMultiReturn<[locationX: number, locationY: number]> | undefined;
  function GetQuestProgressBarInfo(this: void, questID: number): number | undefined;
  function GetQuestsOnMap(this: void, uiMapID: number): readonly WowApi.QuestPOIMapInfo[] | undefined;
  function GetQuestTimeLeftMinutes(this: void, questID: number): number | undefined;
  function GetQuestTimeLeftSeconds(this: void, questID: number): number | undefined;
  function GetQuestUIWidgetSetByType(this: void, questID: number, type: WowApi.MapIconUIWidgetSetType): number | undefined;
  function GetQuestZoneID(this: void, questID: number): number | undefined;
  function GetThreatQuests(this: void): readonly number[];
  function IsActive(this: void, questID: number): boolean;
  function RequestPreloadRewardData(this: void, questID: number): void;

}

declare namespace C_TaxiMap {
  function GetAllTaxiNodes(this: void, uiMapID: number): readonly WowApi.TaxiNodeInfo[];
  function GetTaxiNodesForMap(this: void, uiMapID: number): readonly WowApi.MapTaxiNodeInfo[];
  function ShouldMapShowTaxiNodes(this: void, uiMapID: number): boolean;

}

declare namespace C_Texture {
  function ClearTitleIconTexture(this: void, texture: WowApi.SimpleTexture): void;
  function GetAtlasElementID(this: void, atlas: string): number;
  function GetAtlasElements(this: void): readonly string[];
  function GetAtlasExists(this: void, atlas: string): boolean;
  function GetAtlasID(this: void, atlas: string): number;
  function GetAtlasInfo(this: void, atlas: string): WowApi.AtlasInfo | undefined;
  function GetFilenameFromFileDataID(this: void, fileDataID: number): string;
  function GetTitleIconTexture(this: void, titleID: string, version: WowApi.TitleIconVersion, callback: WowApi.GetTitleIconTextureCallback): void;
  function IsTitleIconTextureReady(this: void, titleID: string, version: WowApi.TitleIconVersion): boolean;
  function SetTitleIconTexture(this: void, texture: WowApi.SimpleTexture, titleID: string, version: WowApi.TitleIconVersion): void;
  function SetURLTexture(this: void, texture: WowApi.SimpleTexture, url: string): void;

}

declare namespace C_Timer {
  function After(this: void, seconds: number, callback: WowApi.TimerCallback): void;
  function NewTicker(this: void, seconds: number, callback: WowApi.TickerCallback, iterations?: number | undefined): WowApi.TickerCallback;
  function NewTimedSignalMap(this: void, callback: WowApi.TimedSignalMapCallback): WowApi.TimedSignalMap;
  function NewTimer(this: void, seconds: number, callback: WowApi.TickerCallback): WowApi.TickerCallback;

}

declare namespace C_TimerunningUI {
  function GetActiveTimerunningSeasonID(this: void): number;

}

declare namespace C_TooltipComparison {
  function CompareItem(this: void, comparisonItem: WowApi.TooltipComparisonItem, tooltip: WowApi.Tooltip, anchorFrame?: WowApi.SimpleFrame | undefined): void;
  function GetItemComparisonDelta(this: void, comparisonItem: WowApi.TooltipComparisonItem, equippedItem: WowApi.TooltipComparisonItem, pairedItem?: WowApi.TooltipComparisonItem | undefined, addPairedStats?: boolean | undefined): readonly string[] | undefined;
  function GetItemComparisonInfo(this: void, comparisonItem: WowApi.TooltipComparisonItem): WowApi.TooltipItemComparisonInfo | undefined;

}

declare namespace C_TooltipInfo {
  function GetAchievementByID(this: void, achievementID: number): WowApi.TooltipData | undefined;
  function GetAction(this: void, actionID: number): WowApi.TooltipData | undefined;
  function GetArtifactItem(this: void): WowApi.TooltipData | undefined;
  function GetArtifactPowerByID(this: void, powerID: number): WowApi.TooltipData | undefined;
  function GetAzeriteEssence(this: void, essenceID: number, rank?: number | undefined): WowApi.TooltipData | undefined;
  function GetAzeriteEssenceSlot(this: void, slot: WowApi.AzeriteEssenceSlot): WowApi.TooltipData | undefined;
  function GetAzeritePower(this: void, itemID: number, itemLevel: number, powerID: number, owningItemLink?: string | undefined): WowApi.TooltipData | undefined;
  function GetBackpackToken(this: void, index: number): WowApi.TooltipData | undefined;
  function GetBagItem(this: void, bagIndex: WowApi.BagIndex, slotIndex: number): WowApi.TooltipData | undefined;
  function GetBagItemChild(this: void, bagIndex: WowApi.BagIndex, slotIndex: number, equipSlotIndex: number): WowApi.TooltipData | undefined;
  function GetBuybackItem(this: void, index: number): WowApi.TooltipData | undefined;
  function GetCompanionPet(this: void, petGUID: string): WowApi.TooltipData | undefined;
  function GetConduit(this: void, conduitID: number, conduitRank: number): WowApi.TooltipData | undefined;
  function GetCurrencyByID(this: void, currencyID: number, amount?: number | undefined): WowApi.TooltipData | undefined;
  function GetCurrencyToken(this: void, tokenIndex: number): WowApi.TooltipData | undefined;
  function GetEnhancedConduit(this: void, conduitID: number, rank: number): WowApi.TooltipData | undefined;
  function GetEquipmentSet(this: void, setID: number): WowApi.TooltipData | undefined;
  function GetExistingSocketGem(this: void, index: number, toDestroy?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetGuildBankItem(this: void, tab: number, slot: number): WowApi.TooltipData | undefined;
  function GetHeirloomByItemID(this: void, itemID: number): WowApi.TooltipData | undefined;
  function GetHyperlink(this: void, hyperlink: string, optionalArg1?: number | undefined, optionalArg2?: number | undefined, hideVendorPrice?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetInboxItem(this: void, messageIndex: number, attachmentIndex?: number | undefined): WowApi.TooltipData | undefined;
  function GetInstanceLockEncountersComplete(this: void, index: number): WowApi.TooltipData | undefined;
  function GetInventoryItem(this: void, unit: string, slot: number, hideUselessStats?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetInventoryItemByID(this: void, itemID: number): WowApi.TooltipData | undefined;
  function GetItemByGUID(this: void, guid: string): WowApi.TooltipData | undefined;
  function GetItemByID(this: void, itemID: number, quality?: number | undefined, itemContext?: number | undefined, treasureContextLevel?: number | undefined): WowApi.TooltipData | undefined;
  function GetItemByItemModifiedAppearanceID(this: void, itemModifiedAppearanceID: number): WowApi.TooltipData | undefined;
  function GetItemInteractionItem(this: void): WowApi.TooltipData | undefined;
  function GetItemKey(this: void, itemID: number, itemLevel: number, itemSuffix: number, requiredLevel?: number | undefined): WowApi.TooltipData | undefined;
  function GetLFGDungeonReward(this: void, dungeonID: number, lootIndex: number): WowApi.TooltipData | undefined;
  function GetLFGDungeonShortageReward(this: void, dungeonID: number, shortageSeverity: number, lootIndex: number): WowApi.TooltipData | undefined;
  function GetLootCurrency(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetLootItem(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetLootRollItem(this: void, id: number): WowApi.TooltipData | undefined;
  function GetMerchantCostItem(this: void, slot: number, costIndex: number): WowApi.TooltipData | undefined;
  function GetMerchantItem(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetMinimapMouseover(this: void): WowApi.TooltipData | undefined;
  function GetMountBySpellID(this: void, spellID: number | string, checkIndoors?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetOutfit(this: void, outfitID: number): WowApi.TooltipData | undefined;
  function GetOwnedItemByID(this: void, itemID: number): WowApi.TooltipData | undefined;
  function GetPetAction(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetPossession(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetPvpBrawl(this: void, isSpecial?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetPvpTalent(this: void, talentID: number, isInspect?: boolean | undefined, groupIndex?: number | undefined, talentIndex?: number | undefined): WowApi.TooltipData | undefined;
  function GetQuestCurrency(this: void, type: string, currencyIndex: number): WowApi.TooltipData | undefined;
  function GetQuestItem(this: void, type: string, itemIndex: number, allowCollectionText?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetQuestLogCurrency(this: void, type: string, currencyIndex: number, questID?: number | undefined): WowApi.TooltipData | undefined;
  function GetQuestLogItem(this: void, type: string, itemIndex: number, questID?: number | undefined, allowCollectionText?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetQuestLogSpecialItem(this: void, questIndex: number): WowApi.TooltipData | undefined;
  function GetQuestPartyProgress(this: void, questID: number, omitTitle?: boolean | undefined, ignoreActivePlayer?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetRecipeRankInfo(this: void, recipeID: number, rank: number): WowApi.TooltipData | undefined;
  function GetRecipeReagentItem(this: void, recipeSpellID: number, dataSlotIndex: number): WowApi.TooltipData | undefined;
  function GetRecipeResultItem(this: void, recipeID: number, reagentInfos?: readonly WowApi.CraftingReagentInfo[] | undefined, recraftItemGUID?: string | undefined, recipeLevel?: number | undefined, overrideQualityID?: number | undefined): WowApi.TooltipData | undefined;
  function GetRecipeResultItemForOrder(this: void, recipeID: number, reagentInfos?: readonly WowApi.CraftingReagentInfo[] | undefined, orderID?: number | undefined, recipeLevel?: number | undefined, overrideQualityID?: number | undefined): WowApi.TooltipData | undefined;
  function GetRuneforgeResultItem(this: void, itemGUID: string, itemLevel: number, powerID?: number | undefined, modifiers?: readonly number[] | undefined): WowApi.TooltipData | undefined;
  function GetSendMailItem(this: void, attachmentIndex?: number | undefined): WowApi.TooltipData | undefined;
  function GetShapeshift(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetSlottedKeystone(this: void): WowApi.TooltipData | undefined;
  function GetSocketedItem(this: void): WowApi.TooltipData | undefined;
  function GetSocketedRelic(this: void, slotIndex: number): WowApi.TooltipData | undefined;
  function GetSocketGem(this: void, index: number): WowApi.TooltipData | undefined;
  function GetSpellBookItem(this: void, spellBookItemSlotIndex: number, spellBookItemSpellBank: WowApi.SpellBookSpellBank): WowApi.TooltipData | undefined;
  function GetSpellByID(this: void, spellID: number | string, isPet?: boolean | undefined, showSubtext?: boolean | undefined, dontOverride?: boolean | undefined, difficultyID?: number | undefined, isLink?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetTalent(this: void, talentID: number, isInspect?: boolean | undefined, groupIndex?: number | undefined): WowApi.TooltipData | undefined;
  function GetTotem(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetToyByItemID(this: void, itemID: number): WowApi.TooltipData | undefined;
  function GetTradePlayerItem(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetTradeTargetItem(this: void, slot: number): WowApi.TooltipData | undefined;
  function GetTrainerService(this: void, serviceIndex: number): WowApi.TooltipData | undefined;
  function GetTraitEntry(this: void, entryID: number, rank?: number | undefined): WowApi.TooltipData | undefined;
  function GetUnit(this: void, unit: string, hideStatus?: boolean | undefined): WowApi.TooltipData | undefined;
  function GetUnitAura(this: void, unitToken: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUnitAuraByAuraInstanceID(this: void, unitToken: string, auraInstanceID: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUnitBuff(this: void, unitToken: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUnitBuffByAuraInstanceID(this: void, unitToken: string, auraInstanceID: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUnitDebuff(this: void, unitToken: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUnitDebuffByAuraInstanceID(this: void, unitToken: string, auraInstanceID: number, filter?: WowApi.AuraFilters | undefined): WowApi.TooltipData | undefined;
  function GetUpgradeItem(this: void): WowApi.TooltipData | undefined;
  function GetWeeklyReward(this: void, itemDBID: string): WowApi.TooltipData | undefined;
  function GetWorldCursor(this: void): WowApi.TooltipData | undefined;
  function GetWorldLootObject(this: void, unitTokenString: string): WowApi.TooltipData | undefined;

}

declare namespace C_ToyBoxInfo {
  function ClearFanfare(this: void, itemID: number): void;
  function HasAnyToy(this: void): boolean;
  function IsToySourceValid(this: void, source: number): boolean;
  function IsUsingDefaultFilters(this: void): boolean;
  function NeedsFanfare(this: void, itemID: number): boolean;
  function SetDefaultFilters(this: void): void;

}

declare namespace C_TradeInfo {
  function AddTradeMoney(this: void): void;
  function PickupTradeMoney(this: void, amount: number): void;
  function SetTradeMoney(this: void, amount: number): void;
  function ShouldShowTradeOfferWarning(this: void): boolean;

}

declare namespace C_TradeSkillUI {
  function CancelProfessionRespec(this: void): void;
  function CanStoreEnchantInItem(this: void, itemGUID: string): boolean;
  function CanTradeSkillShowCraftingUI(this: void, tradeSkillSpellID: number): boolean;
  function CheckRespecNPC(this: void): boolean;
  function CloseTradeSkill(this: void): void;
  function ConfirmProfessionRespec(this: void): void;
  function CraftEnchant(this: void, recipeSpellID: number, numCasts?: number, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined, itemTarget?: WowApi.ItemLocation | undefined, applyConcentration?: boolean | undefined): void;
  function CraftRecipe(this: void, recipeSpellID: number, numCasts?: number, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined, recipeLevel?: number | undefined, orderID?: number | undefined, applyConcentration?: boolean | undefined): void;
  function CraftSalvage(this: void, recipeSpellID: number, numCasts: number | undefined, itemTarget: WowApi.ItemLocation, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined, applyConcentration?: boolean | undefined): void;
  function DoesRecraftingRecipeAcceptItem(this: void, itemLocation: WowApi.ItemLocation, recipeID: number): boolean;
  function GetAllProfessionTradeSkillLines(this: void): readonly number[];
  function GetBaseProfessionInfo(this: void): WowApi.ProfessionInfo;
  function GetChildProfessionInfo(this: void): WowApi.ProfessionInfo;
  function GetChildProfessionInfos(this: void): readonly WowApi.ProfessionInfo[];
  function GetConcentrationCurrencyID(this: void, skillLineID: number): number;
  function GetCraftableCount(this: void, recipeSpellID: number, recipeLevel?: number | undefined): number;
  function GetCraftingOperationInfo(this: void, recipeID: number, craftingReagents: readonly WowApi.CraftingReagentInfo[], allocationItemGUID: string | undefined, applyConcentration: boolean): WowApi.CraftingOperationInfo | undefined;
  function GetCraftingOperationInfoForOrder(this: void, recipeID: number, craftingReagents: readonly WowApi.CraftingReagentInfo[], orderID: number, applyConcentration: boolean): WowApi.CraftingOperationInfo | undefined;
  function GetCraftingReagentBonusText(this: void, recipeSpellID: number, craftingReagentIndex: number, craftingReagents: readonly WowApi.CraftingReagentInfo[], allocationItemGUID?: string | undefined): readonly string[];
  function GetCraftingTargetItems(this: void, itemIDs: readonly number[]): readonly WowApi.CraftingTargetItem[];
  function GetDependentReagents(this: void, reagent: WowApi.CraftingReagent): readonly WowApi.CraftingReagent[];
  function GetEnchantItems(this: void, recipeID: number, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined): readonly string[];
  function GetFactionSpecificOutputItem(this: void, recipeSpellID: number): number | undefined;
  function GetGatheringOperationInfo(this: void, recipeID: number): WowApi.GatheringOperationInfo | undefined;
  function GetHideUnownedFlags(this: void, recipeID: number): LuaMultiReturn<[cannotModifyHideUnowned: boolean, alwaysShowUnowned: boolean]>;
  function GetItemCraftedQualityByItemInfo(this: void, itemInfo: number | string): number | undefined;
  function GetItemCraftedQualityInfo(this: void, itemInfo: number | string): WowApi.CraftingQualityInfo | undefined;
  function GetItemReagentQualityByItemInfo(this: void, itemInfo: number | string): number | undefined;
  function GetItemReagentQualityInfo(this: void, itemInfo: number | string): WowApi.CraftingQualityInfo | undefined;
  function GetItemSlotModifications(this: void, itemGUID: string): readonly WowApi.CraftingItemSlotModification[];
  function GetItemSlotModificationsForOrder(this: void, orderID: number): readonly WowApi.CraftingItemSlotModification[];
  function GetOriginalCraftRecipeID(this: void, itemGUID: string): LuaMultiReturn<[recipeID: number | undefined, skillLineAbilityID: number | undefined]>;
  function GetProfessionByInventorySlot(this: void, slot: number): WowApi.Profession | undefined;
  function GetProfessionChildSkillLineID(this: void): number;
  function GetProfessionForCursorItem(this: void): WowApi.Profession | undefined;
  function GetProfessionInfoByRecipeID(this: void, recipeID: number): WowApi.ProfessionInfo;
  function GetProfessionInfoBySkillLineID(this: void, skillLineID: number): WowApi.ProfessionInfo;
  function GetProfessionInventorySlots(this: void): readonly number[];
  function GetProfessionNameForSkillLineAbility(this: void, skillLineAbilityID: number): string;
  function GetProfessionSkillLineID(this: void, profession: WowApi.Profession): number;
  function GetProfessionSlots(this: void, profession: WowApi.Profession): readonly number[];
  function GetProfessionSpells(this: void, professionID: number, skillLineID?: number | undefined): readonly number[];
  function GetQualitiesForRecipe(this: void, recipeID: number): readonly number[] | undefined;
  function GetReagentDifficultyText(this: void, craftingReagentIndex: number, craftingReagents: readonly WowApi.CraftingReagentInfo[]): string;
  function GetReagentSlotStatus(this: void, mcrSlotID: number, recipeSpellID: number, skillLineAbilityID: number): LuaMultiReturn<[locked: boolean, lockedReason: string]>;
  function GetRecipeDescription(this: void, recipeID: number, craftingReagents: readonly WowApi.CraftingReagentInfo[], allocationItemGUID?: string | undefined): string;
  function GetRecipeInfo(this: void, recipeSpellID: number, recipeLevel?: number | undefined): WowApi.TradeSkillRecipeInfo | undefined;
  function GetRecipeInfoForSkillLineAbility(this: void, skillLineAbilityID: number, recipeLevel?: number | undefined): WowApi.TradeSkillRecipeInfo | undefined;
  function GetRecipeItemQualityInfo(this: void, recipeID: number, quality: number): WowApi.CraftingQualityInfo | undefined;
  function GetRecipeOutputItemData(this: void, recipeSpellID: number, reagents?: readonly WowApi.CraftingReagentInfo[] | undefined, allocationItemGUID?: string | undefined, overrideQualityID?: number | undefined, recraftOrderID?: number | undefined): WowApi.CraftingRecipeOutputInfo;
  function GetRecipeQualityItemIDs(this: void, recipeSpellID: number): readonly number[] | undefined;
  function GetRecipeQualityReagentLink(this: void, recipeID: number, dataSlotIndex: number, qualityIndex: number): string;
  function GetRecipeRequirements(this: void, recipeID: number): readonly WowApi.CraftingRecipeRequirement[];
  function GetRecipeSchematic(this: void, recipeSpellID: number, isRecraft: boolean, recipeLevel?: number | undefined): WowApi.CraftingRecipeSchematic;
  function GetRecipesTracked(this: void, isRecraft: boolean): readonly number[];
  function GetRecraftItems(this: void, recipeID?: number | undefined): readonly string[];
  function GetRecraftRemovalWarnings(this: void, itemGUID: string, replacedReagents: readonly WowApi.CraftingReagent[]): readonly string[];
  function GetRemainingRecasts(this: void): number;
  function GetSalvagableItemIDs(this: void, recipeID: number): readonly number[];
  function GetShowLearned(this: void): boolean;
  function GetShowUnlearned(this: void): boolean;
  function GetSkillLineForGear(this: void, itemInfo: number | string): number | undefined;
  function GetSourceTypeFilter(this: void): number;
  function GetTradeSkillDisplayName(this: void, skillLineID: number): string;
  function HasFavoriteOrderRecipes(this: void): boolean;
  function IsEnchantTargetValid(this: void, recipeID: number, itemGUID: string, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined): boolean;
  function IsGuildTradeSkillsEnabled(this: void): boolean;
  function IsNearProfessionSpellFocus(this: void, profession: WowApi.Profession): boolean;
  function IsNPCCrafting(this: void): boolean;
  function IsOriginalCraftRecipeLearned(this: void, itemGUID: string): boolean;
  function IsRecipeFirstCraft(this: void, recipeID: number): boolean;
  function IsRecipeInBaseSkillLine(this: void, recipeID: number): boolean;
  function IsRecipeInSkillLine(this: void, recipeID: number, skillLineID: number): boolean;
  function IsRecipeProfessionLearned(this: void, recipeID: number): boolean;
  function IsRecipeTracked(this: void, recipeID: number, isRecraft: boolean): boolean;
  function IsRecraftItemEquipped(this: void, recraftItemGUID: string): boolean;
  function IsRecraftReagentValid(this: void, itemGUID: string, reagent: WowApi.CraftingReagent): boolean;
  function IsRuneforging(this: void): boolean;
  function OpenRecipe(this: void, recipeID: number): void;
  function OpenTradeSkill(this: void, skillLineID: number): boolean;
  function RecraftLimitCategoryValid(this: void, reagent: WowApi.CraftingReagent): boolean;
  function RecraftRecipe(this: void, itemGUID: string, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined, removedModifications?: readonly WowApi.CraftingItemSlotModification[] | undefined, applyConcentration?: boolean | undefined): boolean;
  function RecraftRecipeForOrder(this: void, orderID: number, itemGUID: string, craftingReagents?: readonly WowApi.CraftingReagentInfo[] | undefined, removedModifications?: readonly WowApi.CraftingItemSlotModification[] | undefined, applyConcentration?: boolean | undefined): boolean;
  function SetOnlyShowAvailableForOrders(this: void, flag: boolean): void;
  function SetProfessionChildSkillLineID(this: void, skillLineID: number): void;
  function SetRecipeTracked(this: void, recipeID: number, tracked: boolean, isRecraft: boolean): void;
  function SetShowLearned(this: void, flag: boolean): void;
  function SetShowUnlearned(this: void, flag: boolean): void;
  function SetSourceTypeFilter(this: void, sourceTypeFilter: number): void;

}

declare namespace C_Trainer {
  function GetTrainerType(this: void): WowApi.TrainerType;

}

declare namespace C_TraitConfig {

}

declare namespace C_Traits {
  function CanEditConfig(this: void, configID: number): LuaMultiReturn<[canEdit: boolean, errorMessage: string]>;
  function CanPurchaseRank(this: void, configID: number, nodeID: number, nodeEntryID: number): boolean;
  function CanRefundRank(this: void, configID: number, nodeID: number): boolean;
  function CascadeRepurchaseRanks(this: void, configID: number, nodeID: number, entryID?: number | undefined): boolean;
  function ClearCascadeRepurchaseHistory(this: void, configID: number): void;
  function CloseTraitSystemInteraction(this: void): void;
  function CommitConfig(this: void, configID: number): boolean;
  function ConfigHasStagedChanges(this: void, configID: number): boolean;
  function GenerateImportString(this: void, configID: number): string;
  function GenerateInspectImportString(this: void, target: string): string;
  function GetConditionInfo(this: void, configID: number, condID: number): WowApi.TraitCondInfo | undefined;
  function GetConfigIDBySystemID(this: void, systemID: number): number | undefined;
  function GetConfigIDByTreeID(this: void, treeID: number): number | undefined;
  function GetConfigInfo(this: void, configID: number): WowApi.TraitConfigInfo | undefined;
  function GetConfigsByType(this: void, configType: WowApi.TraitConfigType): readonly number[];
  function GetConfigVariationID(this: void, systemID: number): number | undefined;
  function GetDefinitionInfo(this: void, definitionID: number): WowApi.TraitDefinitionInfo | undefined;
  function GetEntryInfo(this: void, configID: number, entryID: number): WowApi.TraitEntryInfo | undefined;
  function GetGroupCurrencyInfo(this: void, configID: number, groupIDs: readonly number[]): readonly WowApi.GroupCurrencyInfo[];
  function GetGroupDisplayInfoByTreeID(this: void, treeID: number): readonly WowApi.TraitGroupDisplayInfo[];
  function GetIncreasedTraitData(this: void, nodeID: number, entryID: number): readonly WowApi.IncreasedTraitData[] | undefined;
  function GetLoadoutSerializationVersion(this: void): number;
  function GetMaxAvailableTraitCurrency(this: void, traitCurrencyID: number, limitBySourcedMax: boolean): number;
  function GetNodeCost(this: void, configID: number, nodeID: number): readonly WowApi.TraitCurrencyCost[];
  function GetNodeInfo(this: void, configID: number, nodeID: number): WowApi.TraitNodeInfo | undefined;
  function GetStagedChanges(this: void, configID: number): LuaMultiReturn<[nodeIDsWithPurchases: readonly number[], nodeIDsWithRefunds: readonly number[], nodeIDsWithSelectionSwaps: readonly number[]]> | undefined;
  function GetStagedChangesCost(this: void, configID: number): readonly WowApi.TraitCurrencyCost[];
  function GetSubTreeInfo(this: void, configID: number, subTreeID: number): WowApi.TraitSubTreeInfo | undefined;
  function GetSystemIDByTreeID(this: void, treeID: number): number | undefined;
  function GetTraitCurrencyForAchievement(this: void, traitCurrencyID: number, achievementID: number): number;
  function GetTraitCurrencyInfo(this: void, traitCurrencyID: number): LuaMultiReturn<[flags: number, type: number, currencyTypesID: number | undefined, icon: number | undefined]>;
  function GetTraitDescription(this: void, entryID: number, rank: number): string | undefined;
  function GetTraitSystemFlags(this: void, configID: number): number | undefined;
  function GetTraitSystemWidgetSetID(this: void, configID: number): number | undefined;
  function GetTreeCurrencyInfo(this: void, configID: number, treeID: number, excludeStagedChanges: boolean): readonly WowApi.TreeCurrencyInfo[];
  function GetTreeHash(this: void, treeID: number): readonly number[];
  function GetTreeInfo(this: void, configID: number, treeID: number): WowApi.TraitTreeInfo | undefined;
  function GetTreeNodes(this: void, treeID: number): readonly number[] | undefined;
  function HasValidInspectData(this: void): boolean;
  function IsReadyForCommit(this: void): boolean;
  function PurchaseAllRanks(this: void, configID: number, nodeID: number, ignoreCost: boolean): boolean;
  function PurchaseRank(this: void, configID: number, nodeID: number): boolean;
  function RefundAllRanks(this: void, configID: number, nodeID: number): boolean;
  function RefundRank(this: void, configID: number, nodeID: number, clearEdges?: boolean | undefined): boolean;
  function ResetTree(this: void, configID: number, treeID: number): boolean;
  function ResetTreeByCurrency(this: void, configID: number, treeID: number, traitCurrencyID: number): boolean;
  function RollbackConfig(this: void, configID: number): boolean;
  function SetSelection(this: void, configID: number, nodeID: number, nodeEntryID?: number | undefined, clearEdges?: boolean | undefined): boolean;
  function StageConfig(this: void, configID: number): boolean;
  function TalentTestUnlearnSpells(this: void): void;
  function TryPurchaseAllRanks(this: void, configID: number, nodeID: number): boolean;
  function TryPurchaseToNode(this: void, configID: number, nodeID: number): boolean;
  function TryRefundToNode(this: void, configID: number, nodeID: number, entryID: number): boolean;

}

declare namespace C_Transmog {
  function CanHaveSecondaryAppearanceForSlotID(this: void, slotID: number): boolean;
  function ExtractTransmogIDList(this: void, input: string): readonly number[];
  function GetAllSetAppearancesByID(this: void, setID: number): readonly WowApi.TransmogSetItemInfo[] | undefined;
  function GetItemIDForSource(this: void, itemModifiedAppearanceID: number): number | undefined;
  function GetSlotForInventoryType(this: void, inventoryType: number): number | undefined;
  function GetSlotVisualInfo(this: void, transmogLocation: WowApi.TransmogLocation): WowApi.TransmogSlotVisualInfo | undefined;
  function IsAtTransmogNPC(this: void): boolean;

}

declare namespace C_TransmogCollection {
  function AccountCanCollectSource(this: void, sourceID: number): LuaMultiReturn<[hasItemData: boolean, canCollect: boolean]>;
  function AreAllCollectionTypeFiltersChecked(this: void): boolean;
  function AreAllSourceTypeFiltersChecked(this: void): boolean;
  function CanAppearanceHaveIllusion(this: void, appearanceID: number): boolean;
  function ClearNewAppearance(this: void, visualID: number): void;
  function ClearSearch(this: void, searchType: WowApi.TransmogSearchType): boolean;
  function DeleteCustomSet(this: void, customSetID: number): void;
  function EndSearch(this: void): void;
  function GetAllAppearanceSources(this: void, itemAppearanceID: number): readonly number[];
  function GetAllFactionsShown(this: void): boolean;
  function GetAllRacesShown(this: void): boolean;
  function GetAppearanceCameraID(this: void, itemAppearanceID: number, variation?: WowApi.TransmogCameraVariation | undefined): number;
  function GetAppearanceCameraIDBySource(this: void, itemModifiedAppearanceID: number, variation?: WowApi.TransmogCameraVariation | undefined): number;
  function GetAppearanceInfoBySource(this: void, itemModifiedAppearanceID: number): WowApi.TransmogAppearanceInfoBySourceData | undefined;
  function GetAppearanceSourceDrops(this: void, itemModifiedAppearanceID: number): readonly WowApi.TransmogAppearanceJournalEncounterInfo[] | undefined;
  function GetAppearanceSourceInfo(this: void, itemModifiedAppearanceID: number): WowApi.TransmogAppearanceSourceInfoData | undefined;
  function GetAppearanceSources(this: void, appearanceID: number, categoryType?: WowApi.TransmogCollectionType | undefined, transmogLocation?: WowApi.TransmogLocation | undefined): readonly WowApi.AppearanceSourceInfo[] | undefined;
  function GetArtifactAppearanceStrings(this: void, appearanceID: number): LuaMultiReturn<[name: string, hyperlink: string]> | undefined;
  function GetCategoryAppearances(this: void, category: WowApi.TransmogCollectionType, transmogLocation?: WowApi.TransmogLocation | undefined, option?: WowApi.TransmogOutfitSlotOption | undefined): readonly WowApi.TransmogCategoryAppearanceInfo[] | undefined;
  function GetCategoryCollectedCount(this: void, category: WowApi.TransmogCollectionType): number;
  function GetCategoryForItem(this: void, itemModifiedAppearanceID: number): WowApi.TransmogCollectionType | undefined;
  function GetCategoryInfo(this: void, category: WowApi.TransmogCollectionType): LuaMultiReturn<[name: string, isWeapon: boolean, canHaveIllusions: boolean, canMainHand: boolean, canOffHand: boolean, canRanged: boolean]> | undefined;
  function GetCategoryTotal(this: void, category: WowApi.TransmogCollectionType): number;
  function GetClassFilter(this: void): number;
  function GetCollectedShown(this: void): boolean;
  function GetCustomSetHyperlinkFromItemTransmogInfoList(this: void, itemTransmogInfoList: readonly WowApi.ItemTransmogInfo[]): string | undefined;
  function GetCustomSetInfo(this: void, customSetID: number): LuaMultiReturn<[name: string, icon: number]> | undefined;
  function GetCustomSetItemTransmogInfoList(this: void, customSetID: number): readonly WowApi.ItemTransmogInfo[] | undefined;
  function GetCustomSets(this: void): readonly number[];
  function GetFallbackWeaponAppearance(this: void): number | undefined;
  function GetFilteredCategoryCollectedCount(this: void, category: WowApi.TransmogCollectionType): number;
  function GetFilteredCategoryTotal(this: void, category: WowApi.TransmogCollectionType): number;
  function GetIllusionInfo(this: void, illusionID: number): WowApi.TransmogIllusionInfo | undefined;
  function GetIllusions(this: void, category?: WowApi.TransmogCollectionType | undefined): readonly WowApi.TransmogIllusionInfo[];
  function GetIllusionStrings(this: void, illusionID: number): LuaMultiReturn<[name: string, hyperlink: string, sourceText: string | undefined]> | undefined;
  function GetInspectItemTransmogInfoList(this: void): readonly WowApi.ItemTransmogInfo[] | undefined;
  function GetIsAppearanceFavorite(this: void, itemAppearanceID: number): boolean;
  function GetItemInfo(this: void, itemInfo: number | string): LuaMultiReturn<[itemAppearanceID: number, itemModifiedAppearanceID: number]> | undefined;
  function GetItemTransmogInfoListFromCustomSetHyperlink(this: void, hyperlink: string): readonly WowApi.ItemTransmogInfo[] | undefined;
  function GetLatestAppearance(this: void): LuaMultiReturn<[visualID: number, category: WowApi.TransmogCollectionType]> | undefined;
  function GetNumMaxCustomSets(this: void): number;
  function GetNumTransmogSources(this: void): number;
  function GetPairedArtifactAppearance(this: void, itemModifiedAppearanceID: number): number | undefined;
  function GetSourceIcon(this: void, itemModifiedAppearanceID: number): number | undefined;
  function GetSourceInfo(this: void, sourceID: number): WowApi.AppearanceSourceInfo | undefined;
  function GetSourceItemID(this: void, itemModifiedAppearanceID: number): number | undefined;
  function GetSourceRequiredHoliday(this: void, itemModifiedAppearanceID: number): string | undefined;
  function GetUncollectedShown(this: void): boolean;
  function GetValidAppearanceSourcesForClass(this: void, appearanceID: number, classID: number, categoryType?: WowApi.TransmogCollectionType | undefined, transmogLocation?: WowApi.TransmogLocation | undefined): readonly WowApi.AppearanceSourceInfo[] | undefined;
  function HasAnyAppearance(this: void): boolean;
  function HasFavorites(this: void): boolean;
  function IsAppearanceHiddenVisual(this: void, appearanceID: number): boolean;
  function IsCategoryValidForItem(this: void, category: WowApi.TransmogCollectionType, itemInfo: number | string): boolean;
  function IsNewAppearance(this: void, visualID: number): boolean;
  function IsSearchDBLoading(this: void): boolean;
  function IsSearchInProgress(this: void, searchType: WowApi.TransmogSearchType): boolean;
  function IsSourceTypeFilterChecked(this: void, index: number): boolean;
  function IsSpellItemEnchantmentHiddenVisual(this: void, spellItemEnchantmentID: number): boolean;
  function IsUsingDefaultFilters(this: void): boolean;
  function IsValidCustomSetName(this: void, name: string): boolean;
  function IsValidTransmogSource(this: void, source: WowApi.TransmogSource): boolean;
  function ModifyCustomSet(this: void, customSetID: number, itemTransmogInfoList: readonly WowApi.ItemTransmogInfo[]): void;
  function NewCustomSet(this: void, name: string, icon: number, itemTransmogInfoList: readonly WowApi.ItemTransmogInfo[]): number | undefined;
  function PlayerCanCollectSource(this: void, sourceID: number): LuaMultiReturn<[hasItemData: boolean, canCollect: boolean]>;
  function PlayerHasTransmog(this: void, itemID: number, itemAppearanceModID?: number): boolean;
  function PlayerHasTransmogByItemInfo(this: void, itemInfo: number | string): boolean;
  function PlayerHasTransmogItemModifiedAppearance(this: void, itemModifiedAppearanceID: number): boolean;
  function PlayerKnowsSource(this: void, sourceID: number): boolean;
  function RenameCustomSet(this: void, customSetID: number, name: string): void;
  function SearchProgress(this: void, searchType: WowApi.TransmogSearchType): number;
  function SearchSize(this: void, searchType: WowApi.TransmogSearchType): number;
  function SetAllCollectionTypeFilters(this: void, checked: boolean): void;
  function SetAllFactionsShown(this: void, shown: boolean): void;
  function SetAllRacesShown(this: void, shown: boolean): void;
  function SetAllSourceTypeFilters(this: void, checked: boolean): void;
  function SetClassFilter(this: void, classID: number): void;
  function SetCollectedShown(this: void, shown: boolean): void;
  function SetDefaultFilters(this: void): void;
  function SetIsAppearanceFavorite(this: void, itemAppearanceID: number, isFavorite: boolean): void;
  function SetSearch(this: void, searchType: WowApi.TransmogSearchType, searchText: string): boolean;
  function SetSearchAndFilterCategory(this: void, category: WowApi.TransmogCollectionType): void;
  function SetSourceTypeFilter(this: void, index: number, checked: boolean): void;
  function SetUncollectedShown(this: void, shown: boolean): void;
  function UpdateUsableAppearances(this: void): void;

}

declare namespace C_TransmogOutfitInfo {
  function AddNewOutfit(this: void, name: string, icon: number): void;
  function CanPlayerTransmogSlot(this: void, slot: WowApi.TransmogOutfitSlot): boolean;
  function ChangeDisplayedOutfit(this: void, outfitID: number, trigger: WowApi.TransmogSituationTrigger, toggleLock: boolean, allowRemoveOutfit: boolean): void;
  function ChangeToOutfit(this: void, playerFacingOutfitIndex: number, allowRemoveOutfit: boolean): void;
  function ChangeViewedOutfit(this: void, outfitID: number): void;
  function ClearAllPendingSituations(this: void): void;
  function ClearAllPendingTransmogs(this: void): void;
  function ClearDisplayedOutfit(this: void, trigger: WowApi.TransmogSituationTrigger, toggleLock: boolean): void;
  function ClearOutfit(this: void): void;
  function CommitAndApplyAllPending(this: void, useAvailableDiscount: boolean): void;
  function CommitOutfitInfo(this: void, outfitID: number, name: string, icon: number): void;
  function CommitPendingSituations(this: void): void;
  function GetActiveOutfitID(this: void): number;
  function GetAllSlotLocationInfo(this: void): LuaMultiReturn<[appearanceSlotInfo: readonly WowApi.TransmogOutfitSlotInfo[], illusionSlotInfo: readonly WowApi.TransmogOutfitSlotInfo[]]> | undefined;
  function GetAllTransmogOutfitOptionSheatheCategoryInfo(this: void, imaID: number): readonly WowApi.TransmogOutfitOptionSheatheCategoryInfo[] | undefined;
  function GetCollectionInfoForSlotAndOption(this: void, slot: WowApi.TransmogOutfitSlot, option: WowApi.TransmogOutfitSlotOption, collectionType: WowApi.TransmogCollectionType): WowApi.TransmogOutfitCollectionInfo | undefined;
  function GetCurrentlyViewedOutfitID(this: void): number;
  function GetEquippedSlotOptionFromTransmogSlot(this: void, slot: WowApi.TransmogOutfitSlot): WowApi.TransmogOutfitSlotOption | undefined;
  function GetIllusionDefaultIMAIDForCollectionType(this: void, collectionType: WowApi.TransmogCollectionType): number | undefined;
  function GetItemModifiedAppearanceEffectiveCategory(this: void, imaID: number): WowApi.TransmogCollectionType;
  function GetLinkedSlotInfo(this: void, slot: WowApi.TransmogOutfitSlot): WowApi.TransmogOutfitLinkedSlotInfo | undefined;
  function GetMaxNumberOfTotalOutfitsForSource(this: void, source: WowApi.TransmogOutfitEntrySource): number;
  function GetMaxNumberOfUsableOutfits(this: void): number;
  function GetNextOutfitCost(this: void): number;
  function GetNumberOfOutfitsUnlockedForSource(this: void, source: WowApi.TransmogOutfitEntrySource): number;
  function GetOptionsForSlot(this: void, slot: WowApi.TransmogOutfitSlot): LuaMultiReturn<[options: readonly WowApi.TransmogOutfitOptionInfo[], artifactOptions: readonly WowApi.TransmogOutfitOptionInfo[] | undefined]> | undefined;
  function GetOutfitInfo(this: void, outfitID: number): WowApi.TransmogOutfitEntryInfo | undefined;
  function GetOutfitInfoByName(this: void, name: string): WowApi.TransmogOutfitEntryInfo | undefined;
  function GetOutfitInfoByPlayerFacingIndex(this: void, playerFacingOutfitIndex: number): WowApi.TransmogOutfitEntryInfo | undefined;
  function GetOutfitsInfo(this: void): readonly WowApi.TransmogOutfitEntryInfo[] | undefined;
  function GetOutfitSituation(this: void, option: WowApi.TransmogSituationOption): boolean;
  function GetOutfitSituationsEnabled(this: void): boolean;
  function GetPendingTransmogCost(this: void): LuaMultiReturn<[cost: number, modifierFlags: number]> | undefined;
  function GetSecondarySlotState(this: void, slot: WowApi.TransmogOutfitSlot): boolean;
  function GetSetSourcesForSlot(this: void, transmogSetID: number, slot: WowApi.TransmogOutfitSlot): readonly WowApi.AppearanceSourceInfo[] | undefined;
  function GetSlotGroupInfo(this: void): readonly WowApi.TransmogOutfitSlotGroup[] | undefined;
  function GetSourceIDsForSlot(this: void, transmogSetID: number, slot: WowApi.TransmogOutfitSlot): readonly number[] | undefined;
  function GetTransmogOutfitSlotForInventoryType(this: void, inventoryType: number): WowApi.TransmogOutfitSlot | undefined;
  function GetTransmogOutfitSlotFromInventorySlot(this: void, inventorySlot: number): WowApi.TransmogOutfitSlot | undefined;
  function GetUISituationCategoriesAndOptions(this: void): readonly WowApi.TransmogSituationCategory[] | undefined;
  function GetUnassignedAtlasForSlot(this: void, slot: WowApi.TransmogOutfitSlot): string | undefined;
  function GetUnassignedDisplayAtlasForSlot(this: void, slot: WowApi.TransmogOutfitSlot): string | undefined;
  function GetViewedOutfitSlotInfo(this: void, slot: WowApi.TransmogOutfitSlot, type: WowApi.TransmogType, option: WowApi.TransmogOutfitSlotOption): WowApi.ViewedTransmogOutfitSlotInfo | undefined;
  function HasPendingOutfitSituations(this: void): boolean;
  function HasPendingOutfitTransmogs(this: void): boolean;
  function InTransmogEvent(this: void): boolean;
  function IsEquippedGearOutfitDisplayed(this: void): boolean;
  function IsEquippedGearOutfitLocked(this: void): boolean;
  function IsLockedOutfit(this: void, outfitID: number): boolean;
  function IsSlotWeaponSlot(this: void, slot: WowApi.TransmogOutfitSlot): boolean;
  function IsTransmogEnabled(this: void): boolean;
  function IsUsableDiscountAvailable(this: void): boolean;
  function IsValidTransmogOutfitName(this: void, name: string): boolean;
  function PickupOutfit(this: void, outfitID: number): void;
  function ResetOutfitSituations(this: void): void;
  function RevertPendingTransmog(this: void, slot: WowApi.TransmogOutfitSlot, type: WowApi.TransmogType, option: WowApi.TransmogOutfitSlotOption): void;
  function SetOutfitSituationsEnabled(this: void, enabled: boolean): void;
  function SetOutfitToCustomSet(this: void, transmogCustomSetID: number): void;
  function SetOutfitToOutfit(this: void, outfitID: number): void;
  function SetOutfitToSet(this: void, transmogSetID: number): void;
  function SetPendingTransmog(this: void, slot: WowApi.TransmogOutfitSlot, type: WowApi.TransmogType, option: WowApi.TransmogOutfitSlotOption, transmogID: number, displayType: WowApi.TransmogOutfitDisplayType): void;
  function SetPendingTransmogSheatheCategory(this: void, slot: WowApi.TransmogOutfitSlot, option: WowApi.TransmogOutfitSlotOption, category: WowApi.TransmogOutfitSlotOptionSheatheCategory): void;
  function SetSecondarySlotState(this: void, slot: WowApi.TransmogOutfitSlot, state: boolean): void;
  function SetViewedOptionForSlot(this: void, slot: WowApi.TransmogOutfitSlot, option: WowApi.TransmogOutfitSlotOption): void;
  function SlotHasSecondary(this: void, slot: WowApi.TransmogOutfitSlot): boolean;
  function TransmogEventActive(this: void): boolean;
  function UpdatePendingSituation(this: void, option: WowApi.TransmogSituationOption, value: boolean): void;

}

declare namespace C_TransmogSets {
  function ClearLatestSource(this: void): void;
  function ClearNewSource(this: void, sourceID: number): void;
  function ClearSetNewSourcesForSlot(this: void, transmogSetID: number, slot: number): void;
  function GetAllSets(this: void): readonly WowApi.TransmogSetInfo[];
  function GetAllSourceIDs(this: void, transmogSetID: number): readonly number[] | undefined;
  function GetAvailableSets(this: void): readonly WowApi.TransmogSetInfo[];
  function GetBaseSetID(this: void, transmogSetID: number): number | undefined;
  function GetBaseSets(this: void): readonly WowApi.TransmogSetInfo[];
  function GetBaseSetsFilter(this: void, index: number): boolean | undefined;
  function GetCameraIDs(this: void): LuaMultiReturn<[detailsCameraID: number | undefined, vendorCameraID: number | undefined]>;
  function GetFilteredBaseSetsCounts(this: void): LuaMultiReturn<[numCollected: number, numTotal: number]>;
  function GetFullBaseSetsCounts(this: void): LuaMultiReturn<[numCollected: number, numTotal: number]>;
  function GetIsFavorite(this: void, transmogSetID: number): LuaMultiReturn<[isFavorite: boolean, isGroupFavorite: boolean]> | undefined;
  function GetLatestSource(this: void): number;
  function GetSetInfo(this: void, transmogSetID: number): WowApi.TransmogSetInfo | undefined;
  function GetSetNewSources(this: void, transmogSetID: number): readonly number[] | undefined;
  function GetSetPrimaryAppearances(this: void, transmogSetID: number): readonly WowApi.TransmogSetPrimaryAppearanceInfo[] | undefined;
  function GetSetsContainingSourceID(this: void, sourceID: number): readonly number[] | undefined;
  function GetSetsFilter(this: void, index: number): boolean | undefined;
  function GetSourceIDsForSlot(this: void, transmogSetID: number, slot: number): readonly number[] | undefined;
  function GetSourcesForSlot(this: void, transmogSetID: number, slot: number): readonly WowApi.AppearanceSourceInfo[] | undefined;
  function GetTransmogSetsClassFilter(this: void): number;
  function GetUsableSets(this: void): readonly WowApi.TransmogSetInfo[];
  function GetValidBaseSetsCountsForCharacter(this: void): LuaMultiReturn<[numCollected: number, numTotal: number]>;
  function GetValidClassForSet(this: void, transmogSetID: number): number | undefined;
  function GetVariantSets(this: void, transmogSetID: number): readonly WowApi.TransmogSetInfo[] | undefined;
  function HasAnyValidSets(this: void): boolean;
  function HasAvailableSets(this: void): boolean;
  function HasUsableSets(this: void): boolean;
  function IsBaseSetCollected(this: void, transmogSetID: number): boolean;
  function IsNewSource(this: void, sourceID: number): boolean;
  function IsSetVisible(this: void, transmogSetID: number): boolean;
  function IsUsingDefaultBaseSetsFilters(this: void): boolean;
  function IsUsingDefaultSetsFilters(this: void): boolean;
  function SetBaseSetsFilter(this: void, index: number, isChecked: boolean): void;
  function SetDefaultBaseSetsFilters(this: void): void;
  function SetDefaultSetsFilters(this: void): void;
  function SetHasNewSources(this: void, transmogSetID: number): boolean;
  function SetHasNewSourcesForSlot(this: void, transmogSetID: number, slot: number): boolean;
  function SetIsFavorite(this: void, transmogSetID: number, isFavorite: boolean): void;
  function SetSetsFilter(this: void, index: number, isChecked: boolean): void;
  function SetTransmogSetsClassFilter(this: void, classID: number): void;

}

declare namespace C_TTSSettings {
  function GetChannelEnabled(this: void, channelInfo: WowApi.ChatChannelInfo): boolean;
  function GetCharacterSettingsSaved(this: void): boolean;
  function GetChatTypeEnabled(this: void, chatName: string): boolean;
  function GetSetting(this: void, setting: WowApi.TtsBoolSetting): boolean;
  function GetSpeechRate(this: void): number;
  function GetSpeechVolume(this: void): number;
  function GetVoiceOptionID(this: void, voiceType: WowApi.TtsVoiceType): number;
  function GetVoiceOptionName(this: void, voiceType: WowApi.TtsVoiceType): string;
  function MarkCharacterSettingsSaved(this: void): void;
  function SetChannelEnabled(this: void, channelInfo: WowApi.ChatChannelInfo, newVal?: boolean): void;
  function SetChannelKeyEnabled(this: void, channelKey: string, newVal?: boolean): void;
  function SetChatTypeEnabled(this: void, chatName: string, newVal?: boolean): void;
  function SetDefaultSettings(this: void): void;
  function SetSetting(this: void, setting: WowApi.TtsBoolSetting, newVal?: boolean): void;
  function SetSpeechRate(this: void, newVal: number): void;
  function SetSpeechVolume(this: void, newVal: number): void;
  function SetVoiceOption(this: void, voiceType: WowApi.TtsVoiceType, voiceID: number): void;
  function SetVoiceOptionName(this: void, voiceType: WowApi.TtsVoiceType, voiceName: string): void;
  function ShouldOverrideMessage(this: void, language: number, messageText: string): boolean;

}

declare namespace C_Tutorial {
  function AbandonTutorialArea(this: void): void;
  function GetCombatEventInfo(this: void): void;
  function ReturnToTutorialArea(this: void): void;

}

declare namespace C_UI {
  function DoesAnyDisplayHaveNotch(this: void): boolean;
  function GetTopLeftNotchSafeRegion(this: void): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
  function GetTopRightNotchSafeRegion(this: void): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
  function GetUIParent(this: void): WowApi.SimpleFrame;
  function GetWorldFrame(this: void): WowApi.SimpleFrame;
  function Reload(this: void): void;
  function ShouldUIParentAvoidNotch(this: void): boolean;

}

declare namespace C_UIActionHandler {

}

declare namespace C_UIColor {
  function GetColors(this: void): readonly WowApi.DBColorExport[];

}

declare namespace C_UIFileAsset {
  function GetFileID(this: void, asset: string): number | undefined;
  function IsKnownFile(this: void, asset: string): boolean;
  function IsLooseFile(this: void, asset: string): boolean;

}

declare namespace C_UIWidgetManager {
  function GetAllWidgetsBySetID(this: void, setID: number): readonly WowApi.UIWidgetInfo[];
  function GetBelowMinimapWidgetSetID(this: void): number;
  function GetBulletTextListWidgetVisualizationInfo(this: void, widgetID: number): WowApi.BulletTextListWidgetVisualizationInfo | undefined;
  function GetButtonHeaderWidgetVisualizationInfo(this: void, widgetID: number): WowApi.ButtonHeaderWidgetVisualizationInfo | undefined;
  function GetCaptureBarWidgetVisualizationInfo(this: void, widgetID: number): WowApi.CaptureBarWidgetVisualizationInfo | undefined;
  function GetCaptureZoneVisualizationInfo(this: void, widgetID: number): WowApi.CaptureZoneVisualizationInfo | undefined;
  function GetDiscreteProgressStepsVisualizationInfo(this: void, widgetID: number): WowApi.DiscreteProgressStepsVisualizationInfo | undefined;
  function GetDoubleIconAndTextWidgetVisualizationInfo(this: void, widgetID: number): WowApi.DoubleIconAndTextWidgetVisualizationInfo | undefined;
  function GetDoubleStateIconRowVisualizationInfo(this: void, widgetID: number): WowApi.DoubleStateIconRowVisualizationInfo | undefined;
  function GetDoubleStatusBarWidgetVisualizationInfo(this: void, widgetID: number): WowApi.DoubleStatusBarWidgetVisualizationInfo | undefined;
  function GetFillUpFramesWidgetVisualizationInfo(this: void, widgetID: number): WowApi.FillUpFramesWidgetVisualizationInfo | undefined;
  function GetHorizontalCurrenciesWidgetVisualizationInfo(this: void, widgetID: number): WowApi.HorizontalCurrenciesWidgetVisualizationInfo | undefined;
  function GetIconAndTextWidgetVisualizationInfo(this: void, widgetID: number): WowApi.IconAndTextWidgetVisualizationInfo | undefined;
  function GetIconTextAndBackgroundWidgetVisualizationInfo(this: void, widgetID: number): WowApi.IconTextAndBackgroundWidgetVisualizationInfo | undefined;
  function GetIconTextAndCurrenciesWidgetVisualizationInfo(this: void, widgetID: number): WowApi.IconTextAndCurrenciesWidgetVisualizationInfo | undefined;
  function GetItemDisplayVisualizationInfo(this: void, widgetID: number): WowApi.ItemDisplayVisualizationInfo | undefined;
  function GetMapPinAnimationWidgetVisualizationInfo(this: void, widgetID: number): WowApi.MapPinAnimationWidgetVisualizationInfo | undefined;
  function GetObjectiveTrackerWidgetSetID(this: void): number;
  function GetPowerBarWidgetSetID(this: void): number;
  function GetPreyHuntProgressWidgetVisualizationInfo(this: void, widgetID: number): WowApi.PreyHuntProgressWidgetVisualizationInfo | undefined;
  function GetScenarioHeaderCurrenciesAndBackgroundWidgetVisualizationInfo(this: void, widgetID: number): WowApi.ScenarioHeaderCurrenciesAndBackgroundWidgetVisualizationInfo | undefined;
  function GetScenarioHeaderDelvesWidgetVisualizationInfo(this: void, widgetID: number): WowApi.ScenarioHeaderDelvesWidgetVisualizationInfo | undefined;
  function GetScenarioHeaderTimerWidgetVisualizationInfo(this: void, widgetID: number): WowApi.ScenarioHeaderTimerWidgetVisualizationInfo | undefined;
  function GetSpacerVisualizationInfo(this: void, widgetID: number): WowApi.SpacerVisualizationInfo | undefined;
  function GetSpellDisplayVisualizationInfo(this: void, widgetID: number): WowApi.SpellDisplayVisualizationInfo | undefined;
  function GetStackedResourceTrackerWidgetVisualizationInfo(this: void, widgetID: number): WowApi.StackedResourceTrackerWidgetVisualizationInfo | undefined;
  function GetStatusBarWidgetVisualizationInfo(this: void, widgetID: number): WowApi.StatusBarWidgetVisualizationInfo | undefined;
  function GetTextColumnRowVisualizationInfo(this: void, widgetID: number): WowApi.TextColumnRowVisualizationInfo | undefined;
  function GetTextureAndTextRowVisualizationInfo(this: void, widgetID: number): WowApi.TextureAndTextRowVisualizationInfo | undefined;
  function GetTextureAndTextVisualizationInfo(this: void, widgetID: number): WowApi.TextureAndTextVisualizationInfo | undefined;
  function GetTextureWithAnimationVisualizationInfo(this: void, widgetID: number): WowApi.TextureWithAnimationVisualizationInfo | undefined;
  function GetTextWithStateWidgetVisualizationInfo(this: void, widgetID: number): WowApi.TextWithStateWidgetVisualizationInfo | undefined;
  function GetTextWithSubtextWidgetVisualizationInfo(this: void, widgetID: number): WowApi.TextWithSubtextWidgetVisualizationInfo | undefined;
  function GetTopCenterWidgetSetID(this: void): number;
  function GetTugOfWarWidgetVisualizationInfo(this: void, widgetID: number): WowApi.TugOfWarWidgetVisualizationInfo | undefined;
  function GetUnitPowerBarWidgetVisualizationInfo(this: void, widgetID: number): WowApi.UnitPowerBarWidgetVisualizationInfo | undefined;
  function GetWidgetSetInfo(this: void, widgetSetID: number): WowApi.UIWidgetSetInfo | undefined;
  function GetZoneControlVisualizationInfo(this: void, widgetID: number): WowApi.ZoneControlVisualizationInfo | undefined;
  function RegisterUnitForWidgetUpdates(this: void, unitToken: string, isGuid?: boolean): void;
  function SetProcessingUnit(this: void, unit?: string | undefined): void;
  function SetProcessingUnitGuid(this: void, unit?: string | undefined): void;
  function UnregisterUnitForWidgetUpdates(this: void, unitToken: string, isGuid?: boolean): void;

}

declare namespace C_UnitAuras {
  function AddAuraSound(this: void, trigger: WowApi.UnitAuraSoundTrigger, sound: WowApi.UnitAuraSoundInfo): number | undefined;
  function AddBlockedAura(this: void, unit: string, auraInstanceID: number): void;
  function AddPrivateAuraAnchor(this: void, args: WowApi.AddPrivateAuraAnchorArgs): number | undefined;
  function AuraIsBigDefensive(this: void, spellID: number | string): boolean;
  function AuraIsPrivate(this: void, spellID: number | string): boolean;
  function CancelAuraByInstanceID(this: void, unit: string, auraInstanceID: number): void;
  function ClearBlockedAuras(this: void, unit: string): void;
  function DoesAuraHaveExpirationTime(this: void, auraInstanceUnit: string, auraInstanceID: number): boolean;
  function GetAuraApplicationDisplayCount(this: void, auraInstanceUnit: string, auraInstanceID: number, minDisplayCount?: number, maxDisplayCount?: number | undefined): string;
  function GetAuraBaseDuration(this: void, auraInstanceUnit: string, auraInstanceID: number, spellID?: number | string | undefined): number | undefined;
  function GetAuraCasterGUID(this: void, auraInstanceUnit: string, auraInstanceID: number): string | undefined;
  function GetAuraDataByAuraInstanceID(this: void, unit: string, auraInstanceID: number): WowApi.AuraData | undefined;
  function GetAuraDataByIndex(this: void, unit: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.AuraData | undefined;
  function GetAuraDataBySlot(this: void, unit: string, slot: number): WowApi.AuraData | undefined;
  function GetAuraDataBySpellName(this: void, unit: string, spellName: string, filter?: WowApi.AuraFilters | undefined): WowApi.AuraData | undefined;
  function GetAuraDispelTypeColor(this: void, auraInstanceUnit: string, auraInstanceID: number, curve: WowApi.LuaColorCurveObject): WowApi.colorRGBA;
  function GetAuraDuration(this: void, auraInstanceUnit: string, auraInstanceID: number): WowApi.LuaDurationObject;
  function GetAuraSlots(this: void, unit: string, filter?: WowApi.AuraFilters | undefined, maxSlots?: number | undefined, continuationToken?: number | undefined): LuaMultiReturn<[outContinuationToken: number | undefined, ...values: (number)[]]>;
  function GetBuffDataByIndex(this: void, unit: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.AuraData | undefined;
  function GetCooldownAuraBySpellID(this: void, spellID: number | string): number | undefined;
  function GetDebuffDataByIndex(this: void, unit: string, index: number, filter?: WowApi.AuraFilters | undefined): WowApi.AuraData | undefined;
  function GetGroupBuffVisualAlerts(this: void): readonly WowApi.GroupBuffVisualAlertInfo[];
  function GetHiddenGroupBuffs(this: void): readonly number[];
  function GetPlayerAuraBySpellID(this: void, spellID: number | string): WowApi.AuraData | undefined;
  function GetRefreshExtendedDuration(this: void, auraInstanceUnit: string, auraInstanceID: number, spellID?: number | string | undefined): number | undefined;
  function GetUnitAuraBySpellID(this: void, unit: string, spellID: number | string): WowApi.AuraData | undefined;
  function GetUnitAuraInstanceIDs(this: void, unit: string, filter: WowApi.AuraFilters, maxCount?: number | undefined, sortRule?: WowApi.UnitAuraSortRule, sortDirection?: WowApi.UnitAuraSortDirection): readonly number[];
  function GetUnitAuras(this: void, unit: string, filter: WowApi.AuraFilters, maxCount?: number | undefined, sortRule?: WowApi.UnitAuraSortRule, sortDirection?: WowApi.UnitAuraSortDirection): readonly WowApi.AuraData[];
  function IsAuraFilteredOutByInstanceID(this: void, unit: string, auraInstanceID: number, filter: WowApi.AuraFilters): boolean;
  function RemoveAuraSound(this: void, auraSoundID: number): void;
  function RemovePrivateAuraAnchor(this: void, anchorID: number): void;
  function ResetAuraDataProvider(this: void): void;
  function SetGroupBuffVisualAlerts(this: void, visualAlerts: readonly WowApi.GroupBuffVisualAlertInfo[]): void;
  function SetHiddenGroupBuffs(this: void, spellIDs: readonly number[]): void;
  function SetPrivateWarningTextAnchor(this: void, parent: WowApi.SimpleFrame, anchor?: WowApi.AnchorBinding | undefined): void;
  function SwitchAuraDataProvider(this: void): void;
  function WantsAlteredForm(this: void, unit: string): boolean;

}

declare namespace C_UserFeedback {
  function SubmitBug(this: void, bugInfo: string, suppressNotification?: boolean): boolean;
  function SubmitSuggestion(this: void, suggestion: string): boolean;

}

declare namespace C_Vehicle {

}

declare namespace C_VideoOptions {
  function AreHighResTexturesAvailable(this: void): boolean;
  function GetCurrentGameWindowSize(this: void): WowApi.vector2;
  function GetDefaultGameWindowSize(this: void, monitor: number): WowApi.vector2;
  function GetGameWindowSizes(this: void, monitor: number, fullscreen: boolean): readonly WowApi.vector2[];
  function GetGxAdapterInfo(this: void): readonly WowApi.GxAdapterInfoDetails[];
  function IsLinearEnabledOnStart(this: void): boolean;
  function IsOutlineModeSupported(this: void): boolean;
  function IsPBRWaterSupported(this: void): boolean;
  function IsSecondaryLightingSupported(this: void): boolean;
  function IsSpellVisualDensitySystemSupported(this: void): boolean;
  function SetGameWindowSize(this: void, x: number, y: number): void;

}

declare namespace C_VignetteInfo {
  function FindBestUniqueVignette(this: void, vignetteGUIDs: readonly string[]): number | undefined;
  function GetHealthPercent(this: void, vignetteGUID: string): number | undefined;
  function GetRecommendedGroupSize(this: void, vignetteGUID: string): LuaMultiReturn<[minGroupSize: number, maxGroupSize: number]> | undefined;
  function GetVignetteInfo(this: void, vignetteGUID: string): WowApi.VignetteInfo | undefined;
  function GetVignettePosition(this: void, vignetteGUID: string, uiMapID: number): LuaMultiReturn<[vignettePosition: WowApi.vector2, vignetteFacing: number | undefined]> | undefined;
  function GetVignettes(this: void): readonly string[];

}

declare namespace C_VoiceChat {
  function ActivateChannel(this: void, channelID: number): void;
  function ActivateChannelTranscription(this: void, channelID: number): void;
  function BeginLocalCapture(this: void, listenToLocalUser: boolean): void;
  function CanAccessSettings(this: void): boolean;
  function CanPlayerUseVoiceChat(this: void): boolean;
  function CreateChannel(this: void, channelDisplayName: string): WowApi.VoiceChatStatusCode;
  function DeactivateChannel(this: void, channelID: number): void;
  function DeactivateChannelTranscription(this: void, channelID: number): void;
  function EndLocalCapture(this: void): void;
  function GetActiveChannelID(this: void): number | undefined;
  function GetActiveChannelType(this: void): WowApi.ChatChannelType | undefined;
  function GetAvailableInputDevices(this: void): readonly WowApi.VoiceAudioDevice[] | undefined;
  function GetAvailableOutputDevices(this: void): readonly WowApi.VoiceAudioDevice[] | undefined;
  function GetChannel(this: void, channelID: number): WowApi.VoiceChatChannel | undefined;
  function GetChannelForChannelType(this: void, channelType: WowApi.ChatChannelType): WowApi.VoiceChatChannel | undefined;
  function GetChannelForCommunityStream(this: void, clubId: string, streamId: string): WowApi.VoiceChatChannel | undefined;
  function GetCommunicationMode(this: void): WowApi.CommunicationMode | undefined;
  function GetCurrentVoiceChatConnectionStatusCode(this: void): WowApi.VoiceChatStatusCode | undefined;
  function GetInputVolume(this: void): number | undefined;
  function GetJoinClubVoiceChannelError(this: void, clubId: string): WowApi.VoiceChannelErrorReason | undefined;
  function GetLocalPlayerActiveChannelMemberInfo(this: void): WowApi.VoiceChatMember | undefined;
  function GetLocalPlayerMemberID(this: void, channelID: number): number | undefined;
  function GetMasterVolumeScale(this: void): number;
  function GetMemberGUID(this: void, memberID: number, channelID: number): string;
  function GetMemberID(this: void, channelID: number, memberGUID: string): number | undefined;
  function GetMemberInfo(this: void, memberID: number, channelID: number): WowApi.VoiceChatMember | undefined;
  function GetMemberName(this: void, memberID: number, channelID: number): string | undefined;
  function GetMemberVolume(this: void, playerLocation: WowApi.PlayerLocation): number | undefined;
  function GetOutputVolume(this: void): number | undefined;
  function GetProcesses(this: void): readonly WowApi.VoiceChatProcess[] | undefined;
  function GetPTTButtonPressedState(this: void): boolean | undefined;
  function GetPushToTalkBinding(this: void): readonly string[] | undefined;
  function GetRemoteTtsVoices(this: void): readonly WowApi.VoiceTtsVoiceType[];
  function GetTtsVoices(this: void): readonly WowApi.VoiceTtsVoiceType[];
  function GetVADSensitivity(this: void): number | undefined;
  function IsChannelJoinPending(this: void, channelType: WowApi.ChatChannelType, clubId?: string | undefined, streamId?: string | undefined): boolean;
  function IsDeafened(this: void): boolean | undefined;
  function IsEnabled(this: void): boolean;
  function IsLoggedIn(this: void): boolean;
  function IsMemberLocalPlayer(this: void, memberID: number, channelID: number): boolean;
  function IsMemberMuted(this: void, playerLocation: WowApi.PlayerLocation): boolean | undefined;
  function IsMemberMutedForAll(this: void, memberID: number, channelID: number): boolean | undefined;
  function IsMemberSilenced(this: void, memberID: number, channelID: number): boolean | undefined;
  function IsMuted(this: void): boolean | undefined;
  function IsParentalDisabled(this: void): boolean;
  function IsParentalMuted(this: void): boolean;
  function IsPlayerUsingVoice(this: void, playerLocation: WowApi.PlayerLocation): boolean;
  function IsSilenced(this: void): boolean | undefined;
  function IsSpeakForMeActive(this: void): boolean;
  function IsSpeakForMeAllowed(this: void): boolean;
  function IsTranscribing(this: void): boolean;
  function IsTranscriptionAllowed(this: void): boolean;
  function IsVoiceChatConnected(this: void): boolean;
  function LeaveChannel(this: void, channelID: number): void;
  function Login(this: void): WowApi.VoiceChatStatusCode;
  function Logout(this: void): WowApi.VoiceChatStatusCode;
  function MarkChannelsDiscovered(this: void): void;
  function RequestJoinAndActivateCommunityStreamChannel(this: void, clubId: string, streamId: string): void;
  function RequestJoinChannelByChannelType(this: void, channelType: WowApi.ChatChannelType, autoActivate?: boolean | undefined): void;
  function SetCommunicationMode(this: void, communicationMode: WowApi.CommunicationMode): void;
  function SetDeafened(this: void, isDeafened: boolean): void;
  function SetInputDevice(this: void, deviceID: string): void;
  function SetInputVolume(this: void, volume: number): void;
  function SetMasterVolumeScale(this: void, scale: number): void;
  function SetMemberMuted(this: void, playerLocation: WowApi.PlayerLocation, muted: boolean): void;
  function SetMemberVolume(this: void, playerLocation: WowApi.PlayerLocation, volume: number): void;
  function SetMuted(this: void, isMuted: boolean): void;
  function SetOutputDevice(this: void, deviceID: string): void;
  function SetOutputVolume(this: void, volume: number): void;
  function SetPortraitTexture(this: void, textureObject: WowApi.SimpleTexture, memberID: number, channelID: number): void;
  function SetPushToTalkBinding(this: void, keys: readonly string[]): void;
  function SetVADSensitivity(this: void, sensitivity: number): void;
  function ShouldDiscoverChannels(this: void): boolean;
  function SpeakRemoteTextSample(this: void, text: string): void;
  function SpeakText(this: void, voiceID: number, text: string, rate: number, volume: number, overlap?: boolean): void;
  function StopSpeakingText(this: void): void;
  function ToggleDeafened(this: void): void;
  function ToggleMemberMuted(this: void, playerLocation: WowApi.PlayerLocation): void;
  function ToggleMuted(this: void): void;

}

declare namespace C_WarbandScene {
  function GetRandomEntryID(this: void): number;
  function GetWarbandSceneEntry(this: void, warbandSceneID: number): WowApi.WarbandSceneEntry | undefined;
  function HasWarbandScene(this: void, warbandSceneID: number): boolean;
  function IsFavorite(this: void, warbandSceneID: number): boolean;
  function SearchWarbandSceneEntries(this: void, searchParams: WowApi.WarbandSceneSearchInfo): readonly number[];
  function SetFavorite(this: void, warbandSceneID: number, favorite: boolean): void;
  function WarbandScenesAvailable(this: void): boolean;

}

declare namespace C_Weather {
  function GetCurrentWeather(this: void): WowApi.WeatherInfo;

}

declare namespace C_WeeklyRewards {
  function AreRewardsForCurrentRewardPeriod(this: void): boolean;
  function CanClaimRewards(this: void): boolean;
  function ClaimReward(this: void, id: number): void;
  function CloseInteraction(this: void): void;
  function GetActivities(this: void, type?: WowApi.WeeklyRewardChestThresholdType | undefined): readonly WowApi.WeeklyRewardActivityInfo[];
  function GetActivityEncounterInfo(this: void, type: WowApi.WeeklyRewardChestThresholdType, index: number): readonly WowApi.WeeklyRewardActivityEncounterInfo[] | undefined;
  function GetConquestWeeklyProgress(this: void): WowApi.ConquestWeeklyProgress;
  function GetDifficultyIDForActivityTier(this: void, activityTierID: number): number | undefined;
  function GetExampleRewardItemHyperlinks(this: void, id: number): LuaMultiReturn<[hyperlink: string, upgradeHyperlink: string]> | undefined;
  function GetItemHyperlink(this: void, itemDBID: string): string | undefined;
  function GetNextActivitiesIncrease(this: void, activityTierID: number, level: number): LuaMultiReturn<[hasSeasonData: boolean, nextActivityTierID: number | undefined, nextLevel: number | undefined, itemLevel: number | undefined]>;
  function GetNextMythicPlusIncrease(this: void, mythicPlusLevel: number): LuaMultiReturn<[hasSeasonData: boolean, nextMythicPlusLevel: number | undefined, itemLevel: number | undefined]>;
  function GetNumCompletedDungeonRuns(this: void): LuaMultiReturn<[numHeroic: number, numMythic: number, numMythicPlus: number]>;
  function GetSortedProgressForActivity(this: void, type: WowApi.WeeklyRewardChestThresholdType, combineSharedDifficulty: boolean): readonly WowApi.WeeklyRewardActivityTierProgress[];
  function HasAvailableRewards(this: void): boolean;
  function HasGeneratedRewards(this: void): boolean;
  function HasInteraction(this: void): boolean;
  function IsWeeklyChestRetired(this: void): boolean;
  function OnUIInteract(this: void): void;
  function ShouldShowFinalRetirementMessage(this: void): boolean;
  function ShouldShowRetirementMessage(this: void): boolean;

}

declare namespace C_WorldLootObject {
  function DoesSlotMatchInventoryType(this: void, slot: number, inventoryType: WowApi.InventoryType): boolean;
  function GetWorldLootObjectDistanceSquared(this: void, unitToken: string): number | undefined;
  function GetWorldLootObjectInfo(this: void, unitToken: string): WowApi.WorldLootObjectInfo | undefined;
  function GetWorldLootObjectInfoByGUID(this: void, objectGUID: string): WowApi.WorldLootObjectInfo | undefined;
  function IsWorldLootObject(this: void, unitToken: string): boolean;
  function IsWorldLootObjectByGUID(this: void, guid: string): boolean;
  function IsWorldLootObjectInRange(this: void, unitToken: string): boolean;
  function OnWorldLootObjectClick(this: void, unitToken: string, isLeftClick: boolean): void;

}

declare namespace C_WorldSafeLocsUIInternal {
  function GetWorldSafeLocs(this: void): readonly WowApi.WorldSafeLocInfo[];

}

declare namespace C_WorldStateInfo {

}

declare namespace C_WowEntitlementInfo {

}

declare namespace C_WowSurvey {
  function OpenSurvey(this: void): void;
  function TriggerSurveyServe(this: void, deliveryMoment: WowApi.SurveyDeliveryMoment): void;

}

declare namespace C_WowTokenUI {
  function ShouldDisplayInAuctionHouse(this: void): boolean;
  function StartTokenSell(this: void, tokenGUID: string): void;

}

declare namespace C_XMLUtil {
  function GetTemplateInfo(this: void, name: string): WowApi.XMLTemplateInfo | undefined;
  function GetTemplates(this: void): readonly WowApi.XMLTemplateListInfo[];

}

declare namespace C_ZoneAbility {
  function GetActiveAbilities(this: void): readonly WowApi.ZoneAbilityInfo[];
  function GetZoneAbilityIcon(this: void, zoneAbilitySpellID: number): number | undefined;

}

declare namespace math {
  function clamp(this: void, value: number, minimum: number, maximum: number): number;
  function isfinite(this: void, value: number): boolean;
  function isinf(this: void, value: number): boolean;
  function isnan(this: void, value: number): boolean;
  function lerp(this: void, startValue: number, endValue: number, amount: number): number;
  function normalize(this: void, value: number, minimum: number, maximum: number): number;
  function remap(this: void, value: number, sourceMinimum: number, sourceMaximum: number, destinationMinimum: number, destinationMaximum: number): number;
  function round(this: void, value: number, decimalPlaces?: number): number;
  function saturate(this: void, value: number): number;
  function sign(this: void, value: number): number;
  function wrap(this: void, value: number, minimum: number, maximum: number): number;

}

declare namespace string {
  function contains(this: void, str: string, substring: string): boolean;
  function endswith(this: void, str: string, suffix: string): boolean;
  function ltrim(this: void, str: string, characters?: string): string;
  function rtrim(this: void, str: string, characters?: string): string;
  function startswith(this: void, str: string, prefix: string): boolean;
  function trim(this: void, str: string, characters?: string): string;

}

declare namespace table {
  function contains(this: void, table: Readonly<Record<PropertyKey, unknown>>, value?: unknown | undefined): boolean;
  function count(this: void, table: Readonly<Record<PropertyKey, unknown>>): number;
  function create(this: void, arraySizeHint: number, nodeSizeHint?: number): Readonly<Record<PropertyKey, unknown>>;
  function freeze(this: void, table: Readonly<Record<PropertyKey, unknown>>): Readonly<Record<PropertyKey, unknown>>;
  function getcountinfo(this: void, table: Readonly<Record<PropertyKey, unknown>>): LuaMultiReturn<[numEntries: number, numPositiveIntegerKeys: number, maxPositiveIntegerKey: number]>;
  function indexof(this: void, table: Readonly<Record<PropertyKey, unknown>>, value?: unknown | undefined): number | undefined;
  function isempty(this: void, table: Readonly<Record<PropertyKey, unknown>>): boolean;
  function isfrozen(this: void, table: Readonly<Record<PropertyKey, unknown>>): boolean;
  function keys(this: void, table: Readonly<Record<PropertyKey, unknown>>): unknown;
  function removeunordered(this: void, table: Readonly<Record<PropertyKey, unknown>>, index?: number | undefined): unknown | undefined;
  function removevalue(this: void, table: Readonly<Record<PropertyKey, unknown>>, value?: unknown | undefined): number;
  function values(this: void, table: Readonly<Record<PropertyKey, unknown>>): unknown;

}
