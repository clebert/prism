import type { Document } from "./document";
import { Signal } from "./signal";

export class UiState {
  static readonly default = new UiState();

  readonly $documents = Signal.createSource<readonly Document[]>([]);
  readonly $selectedDocumentId = Signal.createSource<string | undefined>(undefined);
  readonly $windowVisible = Signal.createSource(false);

  readonly $selectedDocument = Signal.createComputation(() => {
    const selectedDocumentId = this.$selectedDocumentId.subscribe();

    return this.$documents.subscribe().find(({ id }) => id === selectedDocumentId);
  });
}
