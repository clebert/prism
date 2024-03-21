declare namespace UiObject {
  // https://wowpedia.fandom.com/wiki/UIOBJECT_Button
  interface Button extends Frame {
    readonly icon: Texture;
    readonly overlay: object | undefined;

    Disable(): void;
    Enable(): void;
    GetHighlightTexture(): Texture | undefined;
    GetNormalTexture(): Texture | undefined;
    GetPushedTexture(): Texture | undefined;
    RegisterForClicks(...clickTypes: readonly ClickType[]): void;
    SetChecked(checked?: boolean): void;
    SetEnabled(enabled?: boolean): void;
    SetHighlightTexture(asset: Texture | string | undefined): void;
    SetNormalTexture(asset: Texture | string | undefined): void;
    SetPushedTexture(asset: Texture | string | undefined): void;
    SetText(text: string): void;
  }

  type ClickType =
    | "LeftButtonUp"
    | "RightButtonUp"
    | "MiddleButtonUp"
    | "Button4Up"
    | "Button5Up"
    | "LeftButtonDown"
    | "RightButtonDown"
    | "MiddleButtonDown"
    | "Button4Down"
    | "Button5Down"
    | "AnyUp"
    | "AnyDown";

  // https://wowpedia.fandom.com/wiki/UIOBJECT_EditBox
  interface EditBox extends FontInstance, Frame {
    ClearFocus(): void;
    Disable(): void;
    Enable(): void;
    GetNumber(): number;
    GetText(): string;
    HasFocus(): boolean;
    HighlightText(start?: number, stop?: number): void;
    Insert(text: string): void;
    SetAutoFocus(autoFocus: boolean): void;
    SetCountInvisibleLetters(count: boolean): void;
    SetFocus(): void;
    SetMaxBytes(maxBytes: number): void;
    SetMaxLetters(maxLetters: number): void;
    SetMultiLine(multiLine: boolean): void;
    SetText(text: string): void;
    SetTextInsets(left: number, right: number, top: number, bottom: number): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_FontInstance
  interface FontInstance {
    SetFontObject(fontObject: string): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_GameTooltip
  interface GameTooltip extends Frame {
    SetItemByID(itemId: number): void;
    SetOwner(owner: Frame, anchor: "ANCHOR_BOTTOMRIGHT"): void;
    SetSpellByID(spellId: number): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_ScrollFrame
  interface ScrollFrame extends Frame {
    GetHorizontalScroll(): number;
    GetHorizontalScrollRange(): number;
    GetVerticalScroll(): number;
    GetVerticalScrollRange(): number;
    SetHorizontalScroll(offset: number): void;
    SetScrollChild(frame: Frame): void;
    SetVerticalScroll(offset: number): void;
    UpdateScrollChildRect(): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_Slider
  interface Slider extends Frame {
    GetMinMaxValues(): LuaMultiReturn<[number, number]>;
    GetValue(): number;
    SetMinMaxValues(minimum: number, maximum: number): void;
    SetValue(value: number): void;
    SetValueStep(step: number): void;
    SetWidth(width: number): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_Frame
  interface Frame extends Region, ScriptObject {
    CreateFontString(name?: string, drawLayer?: "BACKGROUND" | "BORDER" | "ARTWORK" | "OVERLAY" | "HIGHLIGHT", templateName?: string): FontString;
    CreateTexture(name?: string, drawLayer?: "BACKGROUND" | "BORDER" | "ARTWORK" | "OVERLAY" | "HIGHLIGHT", templateName?: string, subLevel?: number): Texture;
    EnableMouseWheel(enable: boolean): void;
    GetChildren(): Frame[];
    GetRegions(): ScriptObject[] | undefined;
    RegisterEvent(event: FrameEvent): void;
    RegisterForDrag(button: "LeftButton" | "RightButton"): void;
    SetAttribute(name: string, value: unknown): void;
    SetBackdrop(backdrop: { bgFile?: string; edgeFile?: string; tile?: boolean; tileSize?: number; edgeSize?: number; insets?: { left: number; right: number; top: number; bottom: number } }): void;
    SetBackdropBorderColor(r: number, g: number, b: number, a: number): void;
    SetMovable(movable: boolean): void;
    StartMoving(): void;
    StopMovingOrSizing(): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_FontString
  interface FontString extends Region {
    SetFontObject(font: string | undefined): void;
    SetJustifyH(justify: "LEFT" | "CENTER" | "RIGHT"): void;
    SetJustifyV(justify: "TOP"): void;
    SetText(text: string): void;
    SetTextColor(red: number, green: number, blue: number, alpha?: number): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_Texture
  interface Texture extends TextureBase {}

  // https://wowpedia.fandom.com/wiki/UIOBJECT_TextureBase
  interface TextureBase extends Region {
    GetTexture(): number | undefined;
    SetColorTexture(red: number, green: number, blue: number, alpha?: number): void;
    SetTexCoord(left: number, right: number, top: number, bottom: number): void;
    SetTexture(file: number | string | undefined): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_Region
  interface Region extends ScriptRegion {
    GetBottom(): number;
    GetHeight(): number;
    GetTop(): number;
    GetVertexColor(): LuaMultiReturn<[number, number, number, number]>;
    GetWidth(): number;
    SetAlpha(alpha: number): void;
    SetHeight(height: number): void;
    SetVertexColor(red: number, green: number, blue: number, alpha?: number): void;
    SetWidth(width: number): void;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_ScriptRegion
  interface ScriptRegion extends Object {
    ClearAllPoints(): void;
    EnableMouse(enable: boolean): void;
    GetCenter(): LuaMultiReturn<[left: number, right: number]>;
    GetSize(ignoreRect?: boolean): LuaMultiReturn<[width: number, height: number]>;
    Hide(): void;
    IsShown(): boolean;
    IsVisible(): boolean;
    SetAllPoints(relativeTo?: ScriptRegion): void;
    SetPoint(point: FramePoint, relativeTo?: ScriptRegion, relativePoint?: FramePoint, offsetX?: number, offsetY?: number): void;
    SetSize(width: number, height: number): void;
    Show(): void;
  }

  type FramePoint = "BOTTOM" | "BOTTOMLEFT" | "BOTTOMRIGHT" | "CENTER" | "LEFT" | "RIGHT" | "TOP" | "TOPLEFT" | "TOPRIGHT";

  // https://wowpedia.fandom.com/wiki/UIOBJECT_Object
  interface Object extends FrameScriptObject {
    GetParent(): Object;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_FrameScriptObject
  interface FrameScriptObject {
    GetName(): string;
  }

  // https://wowpedia.fandom.com/wiki/UIOBJECT_ScriptObject
  interface ScriptObject {
    SetScript(type: "OnClick" | "OnDragStart" | "OnDragStop" | "OnEnter" | "OnLeave" | "OnUpdate" | "PostClick", handler: ((this: ScriptObject, event: FrameEvent) => void) | undefined): void;
    SetScript(type: "OnCursorChanged", handler: ((this: ScriptObject, x: number, y: number, width: number, height: number) => void) | undefined): void;
    SetScript(type: "OnEnterPressed" | "OnEscapePressed" | "OnHide" | "OnShow" | "OnTextChanged", handler: ((this: ScriptObject) => void) | undefined): void;
    SetScript(type: "OnEvent", handler: ((this: ScriptObject, event: FrameEvent, ...args: readonly unknown[]) => void) | undefined): void;
    SetScript(type: "OnMouseDown" | "OnMouseUp", handler: ((this: ScriptObject, button: string) => void) | undefined): void;
    SetScript(type: "OnMouseWheel", handler: ((this: ScriptObject, delta: number) => void) | undefined): void;
    SetScript(type: "OnUpdate", handler: ((this: ScriptObject, elapsed: number) => void) | undefined): void;
    SetScript(type: "OnValueChanged", handler: ((this: ScriptObject, value: number) => void) | undefined): void;
  }

  // https://wowpedia.fandom.com/wiki/Events
  type FrameEvent =
    | "ACTIONBAR_HIDEGRID"
    | "ACTIONBAR_PAGE_CHANGED"
    | "ACTIONBAR_SHOWGRID"
    | "ACTIONBAR_SLOT_CHANGED"
    | "ADDON_LOADED"
    | "COMBAT_LOG_EVENT_UNFILTERED"
    | "PLAYER_ENTERING_WORLD"
    | "PLAYER_REGEN_ENABLED"
    | "START_AUTOREPEAT_SPELL"
    | "STOP_AUTOREPEAT_SPELL"
    | "UNIT_AURA"
    | "UNIT_POWER_UPDATE"
    | "UNIT_SPELLCAST_CHANNEL_START"
    | "UNIT_SPELLCAST_CHANNEL_STOP"
    | "UNIT_SPELLCAST_CHANNEL_UPDATE"
    | "UNIT_SPELLCAST_DELAYED"
    | "UNIT_SPELLCAST_FAILED_QUIET"
    | "UNIT_SPELLCAST_FAILED"
    | "UNIT_SPELLCAST_INTERRUPTED"
    | "UNIT_SPELLCAST_SENT"
    | "UNIT_SPELLCAST_START"
    | "UNIT_SPELLCAST_STOP"
    | "UNIT_SPELLCAST_SUCCEEDED";
}
