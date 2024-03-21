export interface Document {
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export function createDocument({ title, content }: Omit<Document, "id">): Document {
  return { content, id: `document_${GetTimePreciseSec()}}`, title };
}

export function deleteDocument(documents: readonly Document[], id: string): Document[] | undefined {
  const newDocuments = documents.filter(({ id: otherId }) => otherId !== id);

  return newDocuments.length !== documents.length ? newDocuments : undefined;
}

export function findDocument(documents: readonly Document[], id: string): Document | undefined {
  return documents.find(({ id: otherId }) => otherId === id);
}

export function updateDocument(
  documents: readonly Document[],
  newDocument: Document,
): Document[] | undefined {
  const index = documents.findIndex(({ id }) => id === newDocument.id);
  const document = documents[index];

  if (
    !document ||
    (document.title === newDocument.title && document.content === newDocument.content)
  ) {
    return;
  }

  const newDocuments = [...documents];

  newDocuments[index] = newDocument;

  return newDocuments;
}

export function validateDocuments(documents: readonly object[]): Document[] {
  return documents.filter(
    (document) =>
      "id" in document &&
      typeof document.id === "string" &&
      "title" in document &&
      typeof document.title === "string" &&
      "content" in document &&
      typeof document.content === "string",
  ) as Document[];
}
