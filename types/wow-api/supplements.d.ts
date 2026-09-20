declare function CreateFrame(
  frameType: "Frame",
  name?: string | undefined,
  parent?: OverlayFrame | undefined,
): OverlayFrame;

declare function InCombatLockdown(): boolean;

declare function rawget(table: typeof globalThis, index: string): unknown;

declare const UIParent: OverlayFrame;

interface ActionButton {
  readonly action?: number | undefined;
  GetBottom(): number | undefined;
  GetEffectiveScale(): number;
  GetHeight(): number;
  GetLeft(): number | undefined;
  GetName(): string;
  GetWidth(): number;
  IsVisible(): boolean;
}

interface OverlayFrame {
  ClearAllPoints(): void;
  CreateTexture(
    name?: string | undefined,
    drawLayer?: string | undefined,
    templateName?: string | undefined,
    subLevel?: number | undefined,
  ): OverlayTexture | undefined;
  EnableMouse(enable: boolean): void;
  GetEffectiveScale(): number;
  RegisterEvent(eventName: string): boolean;
  SetAlpha(alpha: number): void;
  SetFrameLevel(level: number): void;
  SetFrameStrata(strata: string): void;
  SetPoint(
    point: "BOTTOMLEFT",
    relativeTo: OverlayFrame,
    relativePoint: "BOTTOMLEFT",
    offsetX: number,
    offsetY: number,
  ): void;
  SetScript(
    scriptTypeName: "OnEvent",
    script: ((eventFrame: OverlayFrame, event: string, ...payload: unknown[]) => void) | undefined,
  ): void;
  SetScript(
    scriptTypeName: "OnUpdate",
    script: ((eventFrame: OverlayFrame, elapsed: number) => void) | undefined,
  ): void;
  SetSize(width: number, height: number): void;
  Show(): void;
}

interface OverlayTexture {
  SetAllPoints(): void;
  SetAlpha(alpha: number): void;
  SetBlendMode(blendMode: "ADD"): void;
  SetColorTexture(red: number, green: number, blue: number, alpha?: number | undefined): void;
  SetTexture(file: string): void;
  Show(): void;
}
