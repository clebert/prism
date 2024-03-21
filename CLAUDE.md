# CLAUDE.md

## Commands

After code changes, always run:

```bash
npm run ci          # compile + check + format + test (all at once)
```

Individual tasks:

```bash
npm run compile     # TypeScript compile only
npm run check:fix   # Biome linter with auto-fix
```

## TypeScript

Uses `exactOptionalPropertyTypes` — optional properties need `?: T | undefined`.
