export interface Props {
  readonly selected: boolean;
  readonly title: string;
  readonly previousItem: DocumentListItem | undefined;

  onDelete(this: void): void;
  onSelect(this: void): void;
}

export class DocumentListItem {
  private readonly frame: UiObject.Button;
  private readonly deleteButton: UiObject.Button;
  private readonly selectedTexture: UiObject.Texture;
  private readonly titleFontString: UiObject.FontString;

  constructor(parent: UiObject.Frame) {
    this.frame = CreateFrame("Button", undefined, parent);
    this.deleteButton = CreateFrame("Button", undefined, this.frame);
    this.selectedTexture = this.frame.CreateTexture(undefined, "ARTWORK");

    this.titleFontString = this.frame.CreateFontString(
      undefined,
      "OVERLAY",
      "GameFontHighlightSmall",
    );

    this.frame.SetHeight(20);

    this.frame.SetScript("OnEnter", () => {
      if (!this.selectedTexture.IsShown()) {
        this.titleFontString.SetFontObject("GameFontHighlight");
      }
    });

    this.frame.SetScript("OnLeave", () => {
      if (!this.selectedTexture.IsShown()) {
        this.titleFontString.SetFontObject("GameFontHighlightSmall");
      }
    });

    this.deleteButton.SetSize(16, 16);
    this.deleteButton.SetPoint("RIGHT", this.frame, "RIGHT", -5, 0);
    this.deleteButton.SetNormalTexture("Interface\\Buttons\\UI-MinusButton-Up");
    this.deleteButton.SetPushedTexture("Interface\\Buttons\\UI-MinusButton-Down");
    this.deleteButton.SetHighlightTexture("Interface\\Buttons\\UI-PlusButton-Hilight");

    this.selectedTexture.SetColorTexture(0.97, 0.83, 0.28, 0.5);
    this.selectedTexture.SetAllPoints(this.frame);
    this.selectedTexture.Hide();

    this.titleFontString.SetPoint("LEFT", this.frame, "LEFT", 5, 0);
    this.titleFontString.SetPoint("RIGHT", this.deleteButton, "LEFT", -5, 0);
    this.titleFontString.SetJustifyH("LEFT");

    const highlightTexture = this.frame.CreateTexture(undefined, "HIGHLIGHT");

    highlightTexture.SetColorTexture(0.38, 0.38, 0.38, 1);
    highlightTexture.SetAllPoints(this.frame);

    this.frame.SetHighlightTexture(highlightTexture);
  }

  render(props?: Props): void {
    if (!props) {
      this.frame.Hide();

      return;
    }

    if (props.selected) {
      this.selectedTexture.Show();
      this.titleFontString.SetFontObject("GameFontHighlight");
    } else {
      this.selectedTexture.Hide();
      this.titleFontString.SetFontObject("GameFontHighlightSmall");
    }

    this.titleFontString.SetText(props.title);
    this.frame.SetScript("OnClick", props.onSelect);
    this.deleteButton.SetScript("OnClick", props.onDelete);

    this.frame.Show();
    this.frame.ClearAllPoints();

    if (props.previousItem) {
      this.frame.SetPoint("TOPLEFT", props.previousItem.frame, "BOTTOMLEFT", 0, 0);
      this.frame.SetPoint("TOPRIGHT", props.previousItem.frame, "BOTTOMRIGHT", 0, 0);
    } else {
      const parent = this.frame.GetParent() as UiObject.ScriptRegion;

      this.frame.SetPoint("TOPLEFT", parent, "TOPLEFT", 0, 0);
      this.frame.SetPoint("TOPRIGHT", parent, "TOPRIGHT", 0, 0);
    }
  }
}
