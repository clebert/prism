import { ActionBarController } from "./core/action-bar-controller";
import { type Configuration, Parser } from "./dsl/parser";
import { type Document, validateDocuments } from "./ui/document";
import { renderWindow } from "./ui/render-window";
import { Signal } from "./ui/signal";
import { UiState } from "./ui/ui-state";

interface SavedVariablesPerCharacter {
  readonly documents: readonly Document[];
}

declare global {
  let PrismSavedVariables: undefined;
  let PrismSavedVariablesPerCharacter: SavedVariablesPerCharacter | undefined;
}

const frame = CreateFrame("Frame");

frame.RegisterEvent("ADDON_LOADED");

// biome-ignore lint/suspicious/noExplicitAny: WoW global object requires this pattern
const global = _G as any as Record<string, string>;

frame.SetScript("OnEvent", (event, addonName) => {
  if (event === "ADDON_LOADED" && addonName === "Prism") {
    Signal.batch(() =>
      UiState.default.$documents.publish(
        validateDocuments(PrismSavedVariablesPerCharacter?.documents ?? []),
      ),
    );

    const actionBarController = new ActionBarController();

    Signal.track(() => {
      const documents = UiState.default.$documents.subscribe();

      PrismSavedVariablesPerCharacter = { documents };

      const configurations: Configuration[] = [];

      for (const document of documents) {
        const result = new Parser(document.content).parse();

        if (result.success) {
          configurations.push(...result.data);
        } else {
          const position = result.position
            ? `at line ${result.position.line}, column ${result.position.column}`
            : "at unknown position";

          console.error(
            `Parse error in document "${document.title}": ${result.reason} ${position}`,
          );
        }
      }

      actionBarController.setConfigurations(...configurations);
    });

    actionBarController.start();

    renderWindow();

    SlashCmdList["PRISM"] = () =>
      Signal.batch(() =>
        UiState.default.$windowVisible.publish(!UiState.default.$windowVisible.peek()),
      );

    global["SLASH_PRISM1"] = "/prism";
  }
});
