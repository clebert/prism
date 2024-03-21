import { createDocument, deleteDocument } from "./document";
import { DocumentListItem } from "./document-list-item";
import { Signal } from "./signal";
import { UiState } from "./ui-state";

export function renderDocumentList(parentFrame: UiObject.Frame): UiObject.Frame {
  const containerFrame = createContainerFrame(parentFrame);
  const topBarFrame = createTopBarFrame(containerFrame);
  const addButton = createAddButton(topBarFrame);
  const listScrollFrame = createListScrollFrame(containerFrame, topBarFrame);
  const listFrame = createListFrame(listScrollFrame);

  const visibleItems: DocumentListItem[] = [];
  const invisibleItems: DocumentListItem[] = [];

  addButton.SetScript("OnClick", () => {
    const document = createDocument({
      content: "",
      title: `Document ${UiState.default.$documents.peek().length + 1}`,
    });

    Signal.batch(() => {
      UiState.default.$documents.publish([...UiState.default.$documents.peek(), document]);
      UiState.default.$selectedDocumentId.publish(document.id);
    });

    scrollToBottom(listScrollFrame);
  });

  Signal.track(() => {
    const documents = UiState.default.$documents.subscribe();
    const selectedDocumentId = UiState.default.$selectedDocumentId.subscribe();

    for (const item of visibleItems) {
      item.render();
      invisibleItems.push(item);
    }

    visibleItems.length = 0;

    for (let index = 0; index < documents.length; index++) {
      const document = documents[index];

      if (!document) {
        continue;
      }

      const item = invisibleItems.pop() ?? new DocumentListItem(listFrame);

      visibleItems.push(item);

      item.render({
        onDelete: () => {
          const newDocuments = deleteDocument(UiState.default.$documents.peek(), document.id);

          if (newDocuments) {
            Signal.batch(() => UiState.default.$documents.publish(newDocuments));
          }
        },

        onSelect: () =>
          Signal.batch(() => UiState.default.$selectedDocumentId.publish(document.id)),

        previousItem: visibleItems[index - 1],
        selected: document.id === selectedDocumentId,
        title: document.title,
      });
    }
  });

  return containerFrame;
}

function createContainerFrame(parentFrame: UiObject.Frame): UiObject.Frame {
  const containerFrame = CreateFrame("Frame", undefined, parentFrame);

  containerFrame.SetAllPoints(parentFrame);

  return containerFrame;
}

function createTopBarFrame(containerFrame: UiObject.Frame): UiObject.Frame {
  const topBarFrame = CreateFrame("Frame", undefined, containerFrame);

  topBarFrame.SetPoint("TOPLEFT", containerFrame, "TOPLEFT", 0, 0);
  topBarFrame.SetPoint("TOPRIGHT", containerFrame, "TOPRIGHT", 0, 0);
  topBarFrame.SetHeight(27);

  return topBarFrame;
}

function createAddButton(topBarFrame: UiObject.Frame): UiObject.Button {
  const addButton = CreateFrame("Button", undefined, topBarFrame, "UIPanelButtonTemplate");

  addButton.SetPoint("TOPLEFT", topBarFrame, "TOPLEFT", 0, -2);
  addButton.SetPoint("TOPRIGHT", topBarFrame, "TOPRIGHT", 0, -2);
  addButton.SetHeight(21);
  addButton.SetText("New Document");

  return addButton;
}

function createListScrollFrame(
  containerFrame: UiObject.Frame,
  topBarFrame: UiObject.Frame,
): UiObject.ScrollFrame {
  const listScrollFrame = CreateFrame(
    "ScrollFrame",
    undefined,
    containerFrame,
    "UIPanelScrollFrameTemplate",
  );

  listScrollFrame.SetPoint("TOPLEFT", topBarFrame, "BOTTOMLEFT", 0, 0);
  listScrollFrame.SetPoint("BOTTOMRIGHT", containerFrame, "BOTTOMRIGHT", 0, 0);

  return listScrollFrame;
}

function createListFrame(listScrollFrame: UiObject.ScrollFrame): UiObject.Frame {
  const listFrame = CreateFrame("Frame", undefined, listScrollFrame);

  listFrame.SetWidth(listScrollFrame.GetWidth());
  listFrame.SetHeight(listScrollFrame.GetHeight());
  listScrollFrame.SetScrollChild(listFrame);

  return listFrame;
}

function scrollToBottom(scrollFrame: UiObject.ScrollFrame): void {
  scrollFrame.UpdateScrollChildRect();
  scrollFrame.SetVerticalScroll(scrollFrame.GetVerticalScrollRange());
}
