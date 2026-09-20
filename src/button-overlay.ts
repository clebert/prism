interface ButtonOverlay {
  readonly checked: OverlayTexture;
  readonly dim: OverlayTexture;
  readonly frame: OverlayFrame;
}

interface OverlayRect {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly width: number;
}

const overlays: { [name: string]: ButtonOverlay | undefined } = {};
const rects: { [name: string]: OverlayRect | undefined } = {};
const seenNames: { [name: string]: true | undefined } = {};

export function beginOverlayUpdate(): void {
  for (const name in overlays) {
    seenNames[name] = undefined;
  }
}

export function endOverlayUpdate(): void {
  for (const name in overlays) {
    if (seenNames[name] === true) {
      continue;
    }

    const overlay = overlays[name];

    if (overlay !== undefined) {
      overlay.frame.SetAlpha(0);
    }
  }
}

export function setButtonOverlay(
  button: ActionButton,
  appearance: { readonly checked: boolean; readonly dimmed: boolean } | undefined,
): void {
  const overlay = getButtonOverlay(button);

  if (overlay === undefined) {
    return;
  }

  const name = button.GetName();
  seenNames[name] = true;
  placeOverlay(overlay.frame, button, name);

  if (appearance === undefined) {
    overlay.frame.SetAlpha(0);
    return;
  }

  overlay.frame.SetAlpha(1);
  overlay.checked.SetAlpha(appearance.checked ? 1 : 0);
  overlay.dim.SetAlpha(appearance.dimmed ? 1 : 0);
}

function getButtonOverlay(button: ActionButton): ButtonOverlay | undefined {
  const name = button.GetName();
  const existing = overlays[name];

  if (existing !== undefined) {
    return existing;
  }

  const frame = CreateFrame("Frame", undefined, UIParent);
  frame.SetFrameStrata("TOOLTIP");
  frame.SetFrameLevel(10000);
  frame.EnableMouse(false);
  frame.Show();

  const dim = frame.CreateTexture(undefined, "ARTWORK", undefined, 0);
  const checked = frame.CreateTexture(undefined, "OVERLAY", undefined, 1);

  if (dim === undefined || checked === undefined) {
    return undefined;
  }

  dim.SetAllPoints();
  dim.SetColorTexture(0, 0, 0, 0.55);
  dim.Show();

  checked.SetAllPoints();
  checked.SetTexture("Interface\\Buttons\\CheckButtonHilight");
  checked.SetBlendMode("ADD");
  checked.Show();

  const overlay = { checked, dim, frame };
  overlays[name] = overlay;
  return overlay;
}

function placeOverlay(frame: OverlayFrame, button: ActionButton, name: string): void {
  const left = button.GetLeft();
  const bottom = button.GetBottom();

  if (left !== undefined && bottom !== undefined) {
    const scale = button.GetEffectiveScale() / UIParent.GetEffectiveScale();
    rects[name] = {
      bottom: bottom * scale,
      height: button.GetHeight() * scale,
      left: left * scale,
      width: button.GetWidth() * scale,
    };
  }

  const rect = rects[name];

  if (rect === undefined) {
    return;
  }

  frame.ClearAllPoints();
  frame.SetPoint("BOTTOMLEFT", UIParent, "BOTTOMLEFT", rect.left, rect.bottom);
  frame.SetSize(rect.width, rect.height);
}
