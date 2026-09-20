# WoW API declarations

The generator reads Blizzard API documentation and writes ambient TypeScript declarations.

## Synchronize from the source mirror

Run this command for the Forever client:

```bash
npm run sync:wow-api -- \
  --client "/Applications/World of Warcraft/_classic_beta_"
```

The client option compares the source version with the installed client version. The command fails
when the versions differ.

The default command reads the `forever` branch from the source mirror. Use `--branch` to select
another product branch.

## Synchronize from a local client export

Enter this command in the game client:

```text
/console ExportInterfaceFiles code
```

Then run the generator against the exported interface code:

```bash
npm run sync:wow-api -- \
  --source "/Applications/World of Warcraft/_classic_beta_/BlizzardInterfaceCode" \
  --client "/Applications/World of Warcraft/_classic_beta_"
```

The source path can also point to `Blizzard_APIDocumentationGenerated`. Use the local export when
the source mirror does not contain the installed version.

## Review an API update

Inspect the generated snapshot after each synchronization:

```bash
git diff -- types/wow-api/generated
```

The diff shows added, removed, and changed API declarations. The metadata file records the product,
version, source branch, and source commit.

Validate the generated declarations:

```bash
npm run compile:wow-api
```

A missing symbol identifies a removed or namespaced API. A type error identifies a changed argument
or return value.

## Generated files

- `functions.d.ts` contains global and namespaced functions.
- `structures.d.ts` contains API table structures.
- `enums.d.ts` contains the `Enum` values and their types.
- `constants.d.ts` contains the `Constants` values.
- `callbacks.d.ts` contains callback types.
- `script-objects.d.ts` contains documented script-object methods.
- `events.d.ts` maps event names to payload tuples.
- `fallback-types.d.ts` exposes undocumented referenced types as `unknown`.
- `metadata.json` identifies the source snapshot.

## Limits

Some client globals and FrameXML helpers do not occur in the generated documentation. The supplement
file contains required declarations for such APIs.

Blizzard documentation does not define the complete widget inheritance tree. Prism keeps a small
handwritten widget contract in the supplement file.
