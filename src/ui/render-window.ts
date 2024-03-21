import { renderDocumentEditor } from "./render-document-editor";
import { renderDocumentList } from "./render-document-list";
import { Signal } from "./signal";
import { UiState } from "./ui-state";

export function renderWindow(): UiObject.Frame {
  const windowFrame = createWindowFrame();
  const containerFrame = createContainerFrame(windowFrame);
  const leftPanelFrame = createLeftPanelFrame(containerFrame);
  const rightPanelFrame = createRightPanelFrame(containerFrame, leftPanelFrame);

  windowFrame.TitleText.SetText("Prism");

  renderDocumentList(leftPanelFrame);
  renderDocumentEditor(rightPanelFrame);

  windowFrame.SetScript("OnShow", () => {
    C_Timer.After(0, () => Signal.batch(() => UiState.default.$windowVisible.publish(true)));
  });

  windowFrame.SetScript("OnHide", () => {
    C_Timer.After(0, () => Signal.batch(() => UiState.default.$windowVisible.publish(false)));
  });

  Signal.track(() => {
    if (UiState.default.$windowVisible.subscribe()) {
      windowFrame.Show();
    } else {
      windowFrame.Hide();
    }
  });

  return windowFrame;
}

function createWindowFrame(): UiObject.Frame & { readonly TitleText: UiObject.FontString } {
  const windowFrame = CreateFrame(
    "Frame",
    undefined,
    UIParent,
    "BasicFrameTemplateWithInset",
  ) as UiObject.Frame & { readonly TitleText: UiObject.FontString };

  windowFrame.Hide();
  windowFrame.EnableMouse(true);
  windowFrame.EnableMouseWheel(true);
  windowFrame.RegisterForDrag("LeftButton");
  windowFrame.SetMovable(true);
  windowFrame.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
  windowFrame.SetScript("OnDragStart", windowFrame.StartMoving);
  windowFrame.SetScript("OnDragStop", windowFrame.StopMovingOrSizing);
  windowFrame.SetSize(800, 600);

  return windowFrame;
}

function createContainerFrame(windowFrame: UiObject.Frame): UiObject.Frame {
  const containerFrame = CreateFrame("Frame", undefined, windowFrame);

  containerFrame.SetPoint("TOPLEFT", windowFrame, "TOPLEFT", 7, -27);
  containerFrame.SetPoint("BOTTOMRIGHT", windowFrame, "BOTTOMRIGHT", -9, 6);

  return containerFrame;
}

function createLeftPanelFrame(containerFrame: UiObject.Frame): UiObject.Frame {
  const leftPanelFrame = CreateFrame("Frame", undefined, containerFrame);

  leftPanelFrame.SetPoint("TOPLEFT", containerFrame, "TOPLEFT", 5, -5);
  leftPanelFrame.SetPoint("BOTTOMLEFT", containerFrame, "BOTTOMLEFT", 5, 5);
  leftPanelFrame.SetWidth(200);

  const background = leftPanelFrame.CreateTexture(undefined, "BACKGROUND");

  background.SetAllPoints(leftPanelFrame);
  background.SetTexture("Interface\\DialogFrame\\UI-DialogBox-Background");

  return leftPanelFrame;
}

function createRightPanelFrame(
  containerFrame: UiObject.Frame,
  leftPanelFrame: UiObject.Frame,
): UiObject.Frame {
  const rightPanelFrame = CreateFrame("Frame", undefined, containerFrame);

  rightPanelFrame.SetPoint("TOPLEFT", leftPanelFrame, "TOPRIGHT", 17 + 5 + 5, 0);
  rightPanelFrame.SetPoint("BOTTOMRIGHT", containerFrame, "BOTTOMRIGHT", -(17 + 5 + 5), 5);

  const background = rightPanelFrame.CreateTexture(undefined, "BACKGROUND");

  background.SetAllPoints(rightPanelFrame);
  background.SetTexture("Interface\\DialogFrame\\UI-DialogBox-Background");

  return rightPanelFrame;
}
