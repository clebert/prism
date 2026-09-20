import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { createApiDocument } from "./api-model.ts";
import { generateDeclarations } from "./declaration-generator.ts";
import { parseLuaDocumentationTable } from "./lua-table-parser.ts";
import { loadDocumentationSource } from "./source-loader.ts";

interface CommandOptions {
  readonly branch: string;
  readonly check: boolean;
  readonly clientPath: string | undefined;
  readonly outputPath: string;
  readonly sourcePath: string | undefined;
}

async function main(): Promise<void> {
  const options = parseArguments(process.argv.slice(2));
  const source = await loadDocumentationSource({
    branch: options.branch,
    clientPath: options.clientPath,
    sourcePath: options.sourcePath,
  });
  const documents = source.documents.map((document) =>
    createApiDocument(parseLuaDocumentationTable(document.source, document.name), document.name),
  );
  const declarations = generateDeclarations(documents);
  const files = new Map(declarations.map((file) => [file.name, file.content]));
  files.set(
    "metadata.json",
    `${JSON.stringify(
      {
        branch: source.metadata.branch,
        commit: source.metadata.commit,
        counts: {
          documents: documents.length,
          events: documents.reduce((total, document) => total + document.events.length, 0),
          functions: documents.reduce((total, document) => total + document.functions.length, 0),
          tables: documents.reduce((total, document) => total + document.tables.length, 0),
        },
        product: source.metadata.product,
        version: source.metadata.version,
      },
      undefined,
      2,
    )}\n`,
  );

  if (options.check) {
    await verifyFiles(options.outputPath, files);
    console.log(`The WoW API declarations match version ${source.metadata.version ?? "unknown"}.`);
    return;
  }

  await replaceFiles(options.outputPath, files);
  console.log(
    `Created ${declarations.length} declaration files from ${documents.length} documents for version ${source.metadata.version ?? "unknown"}.`,
  );
}

function parseArguments(arguments_: readonly string[]): CommandOptions {
  let branch = "forever";
  let check = false;
  let clientPath: string | undefined;
  let outputPath = "types/wow-api/generated";
  let sourcePath: string | undefined;

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--check") {
      check = true;
      continue;
    }

    if (
      argument === "--branch" ||
      argument === "--client" ||
      argument === "--output" ||
      argument === "--source"
    ) {
      const value = arguments_[index + 1];
      if (value === undefined) {
        throw new Error(`${argument} requires a value.`);
      }
      index += 1;
      if (argument === "--branch") {
        branch = value;
      } else if (argument === "--client") {
        clientPath = resolve(value);
      } else if (argument === "--output") {
        outputPath = value;
      } else {
        sourcePath = resolve(value);
      }
      continue;
    }

    throw new Error(`The argument ${argument ?? ""} is not supported.`);
  }

  return {
    branch,
    check,
    clientPath,
    outputPath: resolve(outputPath),
    sourcePath,
  };
}

async function replaceFiles(outputPath: string, files: ReadonlyMap<string, string>): Promise<void> {
  const temporaryPath = `${outputPath}.temporary-${process.pid}`;
  await rm(temporaryPath, { force: true, recursive: true });
  await mkdir(temporaryPath, { recursive: true });

  try {
    await Promise.all(
      [...files].map(([name, content]) => writeFile(join(temporaryPath, name), content, "utf8")),
    );
    await mkdir(dirname(outputPath), { recursive: true });
    await rm(outputPath, { force: true, recursive: true });
    await rename(temporaryPath, outputPath);
  } catch (error: unknown) {
    await rm(temporaryPath, { force: true, recursive: true });
    throw error;
  }
}

async function verifyFiles(
  outputPath: string,
  expectedFiles: ReadonlyMap<string, string>,
): Promise<void> {
  let actualNames: readonly string[];
  try {
    actualNames = await readdir(outputPath);
  } catch {
    throw new Error(`The generated declaration directory ${outputPath} does not exist.`);
  }

  const expectedNames = [...expectedFiles.keys()].sort();
  const sortedActualNames = [...actualNames].sort();
  if (JSON.stringify(expectedNames) !== JSON.stringify(sortedActualNames)) {
    throw new Error("The generated declaration file list is stale.");
  }

  for (const name of expectedNames) {
    const expected = expectedFiles.get(name);
    if (expected === undefined) {
      throw new Error(`The expected content for ${name} is missing.`);
    }
    const actual = await readFile(join(outputPath, name), "utf8");
    if (actual !== expected) {
      throw new Error(`The generated declaration file ${name} is stale.`);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
