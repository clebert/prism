import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

export interface DocumentationSource {
  readonly documents: readonly DocumentationSourceFile[];
  readonly metadata: SourceMetadata;
}

export interface DocumentationSourceFile {
  readonly name: string;
  readonly source: string;
}

export interface SourceMetadata {
  readonly branch: string | undefined;
  readonly commit: string | undefined;
  readonly product: string | undefined;
  readonly version: string | undefined;
}

export interface LoadSourceOptions {
  readonly branch: string;
  readonly clientPath: string | undefined;
  readonly sourcePath: string | undefined;
}

interface ClientBuild {
  readonly product: string;
  readonly version: string;
}

const documentationDirectoryName = "Blizzard_APIDocumentationGenerated";
const documentationTableOfContents = "Blizzard_APIDocumentationGenerated.toc";
const repositoryUrl = "https://github.com/Gethe/wow-ui-source.git";

export async function loadDocumentationSource(
  options: LoadSourceOptions,
): Promise<DocumentationSource> {
  const clientBuild =
    options.clientPath === undefined ? undefined : await readClientBuild(options.clientPath);

  if (options.sourcePath !== undefined) {
    const sourceRoot = resolve(options.sourcePath);
    const documentationPath = await findDocumentationPath(sourceRoot);
    const version = await findVersion(sourceRoot);
    verifyClientVersion(clientBuild, version);
    return {
      documents: await readDocumentationFiles(documentationPath),
      metadata: {
        branch: undefined,
        commit: undefined,
        product: clientBuild?.product,
        version: version ?? clientBuild?.version,
      },
    };
  }

  return loadRemoteSource(options.branch, clientBuild);
}

async function loadRemoteSource(
  branch: string,
  clientBuild: ClientBuild | undefined,
): Promise<DocumentationSource> {
  if (!/^[A-Za-z0-9._/-]+$/u.test(branch)) {
    throw new Error(`The branch name ${branch} is invalid.`);
  }

  const temporaryPath = await mkdtemp(join(tmpdir(), "prism-wow-api-"));
  try {
    const archivePath = join(temporaryPath, "source.tar.gz");
    const extractedPath = join(temporaryPath, "source");
    const archiveUrl = `https://github.com/Gethe/wow-ui-source/archive/refs/heads/${encodeURIComponent(branch)}.tar.gz`;
    const response = await fetch(archiveUrl);
    if (!response.ok) {
      throw new Error(`The source archive request failed with HTTP ${response.status}.`);
    }

    await writeFile(archivePath, Buffer.from(await response.arrayBuffer()));
    await run("mkdir", ["-p", extractedPath]);
    await run("tar", ["-xzf", archivePath, "--strip-components=1", "-C", extractedPath]);

    const version = await findVersion(extractedPath);
    verifyClientVersion(clientBuild, version);
    const documentationPath = await findDocumentationPath(extractedPath);

    return {
      documents: await readDocumentationFiles(documentationPath),
      metadata: {
        branch,
        commit: await readRemoteCommit(branch),
        product: clientBuild?.product,
        version: version ?? clientBuild?.version,
      },
    };
  } finally {
    await rm(temporaryPath, { force: true, recursive: true });
  }
}

async function findDocumentationPath(sourceRoot: string): Promise<string> {
  const candidates = [
    sourceRoot,
    join(sourceRoot, documentationDirectoryName),
    join(sourceRoot, "Interface", "AddOns", documentationDirectoryName),
    join(sourceRoot, "BlizzardInterfaceCode", "Interface", "AddOns", documentationDirectoryName),
  ];

  for (const candidate of candidates) {
    if (await isFile(join(candidate, documentationTableOfContents))) {
      return candidate;
    }
  }

  throw new Error(
    `The source path ${sourceRoot} does not contain ${documentationTableOfContents}.`,
  );
}

async function readDocumentationFiles(
  documentationPath: string,
): Promise<readonly DocumentationSourceFile[]> {
  const tableOfContents = await readFile(
    join(documentationPath, documentationTableOfContents),
    "utf8",
  );
  const fileNames = tableOfContents
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.endsWith(".lua") && !line.startsWith("#"));

  return Promise.all(
    fileNames.map(async (name) => ({
      name,
      source: await readFile(join(documentationPath, name), "utf8"),
    })),
  );
}

async function findVersion(sourceRoot: string): Promise<string | undefined> {
  let candidate = sourceRoot;
  for (let depth = 0; depth < 6; depth += 1) {
    const versionPath = join(candidate, "version.txt");
    if (await isFile(versionPath)) {
      return (await readFile(versionPath, "utf8")).trim();
    }
    const parent = dirname(candidate);
    if (parent === candidate) {
      break;
    }
    candidate = parent;
  }
  return undefined;
}

async function readRemoteCommit(branch: string): Promise<string> {
  const output = await run("git", ["ls-remote", repositoryUrl, `refs/heads/${branch}`]);
  const commit = output.trim().split(/\s+/u)[0];
  if (commit === undefined || !/^[0-9a-f]{40}$/u.test(commit)) {
    throw new Error(`Git did not return a commit for the ${branch} branch.`);
  }
  return commit;
}

async function readClientBuild(clientPath: string): Promise<ClientBuild> {
  const flavorPath = join(clientPath, ".flavor.info");
  const flavor = (await readFile(flavorPath, "utf8")).trim().split(/\r?\n/u).at(-1);
  if (flavor === undefined || flavor === "") {
    throw new Error(`The client flavor file ${flavorPath} is empty.`);
  }

  const buildPath = join(dirname(resolve(clientPath)), ".build.info");
  const lines = (await readFile(buildPath, "utf8")).trim().split(/\r?\n/u);
  const header = lines[0]?.split("|").map((field) => field.split("!")[0] ?? field);
  if (header === undefined) {
    throw new Error(`The client build file ${buildPath} has no header.`);
  }

  const productIndex = header.indexOf("Product");
  const versionIndex = header.indexOf("Version");
  if (productIndex === -1 || versionIndex === -1) {
    throw new Error(`The client build file ${buildPath} has no product or version column.`);
  }

  for (const line of lines.slice(1)) {
    const fields = line.split("|");
    if (fields[productIndex] === flavor) {
      const version = fields[versionIndex];
      if (version === undefined || version === "") {
        throw new Error(`The ${flavor} client has no version in ${buildPath}.`);
      }
      return { product: flavor, version };
    }
  }

  throw new Error(`The client build file ${buildPath} has no ${flavor} entry.`);
}

function verifyClientVersion(
  clientBuild: ClientBuild | undefined,
  sourceVersion: string | undefined,
): void {
  if (
    clientBuild !== undefined &&
    sourceVersion !== undefined &&
    clientBuild.version !== sourceVersion
  ) {
    throw new Error(
      `The source version ${sourceVersion} does not match the client version ${clientBuild.version}.`,
    );
  }
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function run(command: string, arguments_: readonly string[]): Promise<string> {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, arguments_, { stdio: ["ignore", "pipe", "pipe"] });
    let standardOutput = "";
    let standardError = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      standardOutput += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      standardError += chunk;
    });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise(standardOutput);
      } else {
        rejectPromise(
          new Error(`${command} failed with code ${code ?? "unknown"}: ${standardError.trim()}`),
        );
      }
    });
  });
}
