// This file comes from Blizzard API documentation.
// Run npm run sync:wow-api to replace it.

declare namespace WowApi {
  type CraftingOrderRequestCallback = (result: WowApi.CraftingOrderResult, orderType: WowApi.CraftingOrderType, displayBuckets: boolean, expectMoreRows: boolean, offset: number, isSorted: boolean) => void;
  type CraftingOrderRequestMyOrdersCallback = (result: WowApi.CraftingOrderResult, expectMoreRows: boolean, offset: number, isSorted: boolean) => void;
  type EventCallbackType = () => void;
  type FixturePointUpdatedCallback = () => void;
  type FrameEventCallbackType = () => void;
  type GetTitleIconTextureCallback = (success: boolean, texture: number) => void;
  type HousingCatalogSearchResultsUpdatedCallback = () => void;
  type InputCommandCallback = (keystate: string) => void;
  type MacroExecuteLineCallback = (macroLine: string) => void;
  type PendingPingOffScreenCallback = () => void;
  type PingCooldownStartedCallback = (info: WowApi.PingCooldownInfo) => void;
  type PingPinFrameAddedCallback = (region: WowApi.SimpleScriptRegion, uiTextureKit: string, isWorldPoint: boolean, actionInfo?: WowApi.PingActionUIInfo | undefined) => void;
  type PingPinFrameRemovedCallback = (region: WowApi.SimpleScriptRegion) => void;
  type PingPinFrameScreenClampStateUpdatedCallback = (region: WowApi.SimpleScriptRegion, state: boolean) => void;
  type PingRadialWheelCreatedCallback = (region: WowApi.SimpleScriptRegion) => void;
  type PinUpdatedCallback = () => void;
  type SendMacroPingCallback = (macroInfo: WowApi.PingMacroInfo) => void;
  type TickerCallback = (cb: WowApi.TimerCallback) => void;
  type TimedSignalMapCallback = (key: number) => void;
  type TimerCallback = () => void;
  type TogglePingListenerCallback = (down: boolean) => void;
}
