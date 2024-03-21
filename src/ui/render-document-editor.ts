import { updateDocument } from "./document";
import { Signal } from "./signal";
import { UiState } from "./ui-state";

export function renderDocumentEditor(parentFrame: UiObject.Frame): UiObject.Frame {
  const containerFrame = createContainerFrame(parentFrame);
  const titleFrame = createTitleFrame(containerFrame);
  const saveButton = createSaveButton(titleFrame);
  const contentScrollFrame = createContentScrollFrame(containerFrame, titleFrame);
  const contentFrame = createContentFrame(contentScrollFrame);
  const contentEditBox = createContentEditBox(contentFrame);
  const titleEditBox = createTitleEditBox(titleFrame, saveButton);

  const $content = Signal.createSource("");
  const $title = Signal.createSource("");

  const $hasUnsavedChanges = Signal.createComputation(() => {
    const selectedDocument = UiState.default.$selectedDocument.subscribe();
    const content = $content.subscribe();
    const title = $title.subscribe();

    return (
      selectedDocument && (selectedDocument.content !== content || selectedDocument.title !== title)
    );
  });

  saveButton.SetScript("OnClick", () => {
    const selectedDocumentId = UiState.default.$selectedDocumentId.peek();

    if (selectedDocumentId !== undefined) {
      const newDocuments = updateDocument(UiState.default.$documents.peek(), {
        content: contentEditBox.GetText().replaceAll("||", "|"),
        id: selectedDocumentId,
        title: titleEditBox.GetText(),
      });

      if (newDocuments) {
        Signal.batch(() => UiState.default.$documents.publish(newDocuments));
      }
    }
  });

  contentEditBox.SetScript("OnCursorChanged", (x, y, width, height) => {
    ScrollingEdit_OnCursorChanged.call(contentEditBox, x, y, width, height);
  });

  contentEditBox.SetScript("OnTextChanged", () => {
    ScrollingEdit_OnTextChanged.call(contentEditBox, contentScrollFrame);
    Signal.batch(() => $content.publish(contentEditBox.GetText().replaceAll("||", "|")));
  });

  contentEditBox.SetScript("OnUpdate", (elapsed) => {
    ScrollingEdit_OnUpdate.call(contentEditBox, elapsed, contentScrollFrame);
  });

  titleEditBox.SetScript("OnTextChanged", () => {
    Signal.batch(() => $title.publish(titleEditBox.GetText()));
  });

  Signal.track(() => {
    const selectedDocument = UiState.default.$selectedDocument.subscribe();

    contentEditBox.SetText(selectedDocument?.content ?? "");
    titleEditBox.SetText(selectedDocument?.title ?? "");

    if (selectedDocument) {
      contentEditBox.Enable();
      titleEditBox.Enable();
      titleEditBox.ClearFocus();
      titleEditBox.SetFocus();
    } else {
      contentEditBox.Disable();
      titleEditBox.Disable();
    }
  });

  Signal.track(() => {
    if ($hasUnsavedChanges.subscribe()) {
      saveButton.Enable();
    } else {
      saveButton.Disable();
    }
  });

  return containerFrame;
}

function createContainerFrame(parentFrame: UiObject.Frame): UiObject.Frame {
  const containerFrame = CreateFrame("Frame", undefined, parentFrame);

  containerFrame.SetAllPoints(parentFrame);

  return containerFrame;
}

function createTitleFrame(containerFrame: UiObject.Frame): UiObject.Frame {
  const titleFrame = CreateFrame("Frame", undefined, containerFrame);

  titleFrame.SetHeight(27);
  titleFrame.SetPoint("TOPLEFT", containerFrame, "TOPLEFT", 0, 0);
  titleFrame.SetPoint("TOPRIGHT", containerFrame, "TOPRIGHT", 0, 0);

  return titleFrame;
}

function createSaveButton(titleFrame: UiObject.Frame): UiObject.Button {
  const saveButton = CreateFrame("Button", undefined, titleFrame, "UIPanelButtonTemplate");

  saveButton.SetPoint("TOPRIGHT", titleFrame, "TOPRIGHT", 0, -2);
  saveButton.SetSize(60, 21);
  saveButton.SetText("Save");

  return saveButton;
}

function createContentScrollFrame(
  containerFrame: UiObject.Frame,
  titleFrame: UiObject.Frame,
): UiObject.ScrollFrame {
  const contentScrollFrame = CreateFrame(
    "ScrollFrame",
    undefined,
    containerFrame,
    "UIPanelScrollFrameTemplate",
  );

  contentScrollFrame.SetPoint("TOPLEFT", titleFrame, "BOTTOMLEFT", 0, 0);
  contentScrollFrame.SetPoint("BOTTOMRIGHT", containerFrame, "BOTTOMRIGHT", 0, 0);

  return contentScrollFrame;
}

function createContentFrame(contentScrollFrame: UiObject.ScrollFrame): UiObject.Frame {
  const contentFrame = CreateFrame("Frame", undefined, contentScrollFrame);

  contentFrame.SetWidth(contentScrollFrame.GetWidth());
  contentFrame.SetHeight(contentScrollFrame.GetHeight());

  contentScrollFrame.SetScrollChild(contentFrame);

  return contentFrame;
}

function createContentEditBox(contentFrame: UiObject.Frame): UiObject.EditBox {
  const contentEditBox = CreateFrame("EditBox", undefined, contentFrame);

  contentEditBox.SetFontObject("GameFontHighlight");
  contentEditBox.SetMultiLine(true);
  contentEditBox.SetPoint("LEFT", contentFrame, "LEFT");
  contentEditBox.SetPoint("RIGHT", contentFrame, "RIGHT");
  contentEditBox.SetPoint("TOP", contentFrame, "TOP");

  return contentEditBox;
}

function createTitleEditBox(
  titleFrame: UiObject.Frame,
  saveButton: UiObject.Button,
): UiObject.EditBox {
  const titleEditBox = CreateFrame("EditBox", undefined, titleFrame, "InputBoxTemplate");

  titleEditBox.SetHeight(24);
  titleEditBox.SetMaxLetters(100);
  titleEditBox.SetPoint("RIGHT", saveButton, "LEFT", -5, 0);
  titleEditBox.SetPoint("TOPLEFT", titleFrame, "TOPLEFT", 5, 0);

  return titleEditBox;
}
