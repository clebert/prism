import { equal } from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { loadDocumentationSource } from "./source-loader.ts";

test("loadDocumentationSource reads a local interface export", async () => {
  const sourceRoot = await mkdtemp(join(tmpdir(), "prism-wow-api-test-"));
  try {
    const documentationPath = join(
      sourceRoot,
      "Interface",
      "AddOns",
      "Blizzard_APIDocumentationGenerated",
    );
    await mkdir(documentationPath, { recursive: true });
    await writeFile(join(sourceRoot, "version.txt"), "1.2.3.4\n", "utf8");
    await writeFile(
      join(documentationPath, "Blizzard_APIDocumentationGenerated.toc"),
      "# Start documentation files here\nExampleDocumentation.lua\n",
      "utf8",
    );
    await writeFile(
      join(documentationPath, "ExampleDocumentation.lua"),
      'local Example = { Name = "Example", Type = "System" };\n',
      "utf8",
    );

    const source = await loadDocumentationSource({
      branch: "unused",
      clientPath: undefined,
      sourcePath: sourceRoot,
    });

    equal(source.metadata.version, "1.2.3.4");
    equal(source.documents.length, 1);
    equal(source.documents[0]?.name, "ExampleDocumentation.lua");
  } finally {
    await rm(sourceRoot, { force: true, recursive: true });
  }
});
