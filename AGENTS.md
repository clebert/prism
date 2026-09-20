# Prism

## Design

Prism is a World of Warcraft Forever addon. The core changes action buttons from code.

The addon has no window and no saved settings. Each rule is TypeScript.

The addon has no grammar and no document language. Client spell data keeps every locale working.

The first rule is this. When a self-buff spell is on an action button and the player has that buff,
the button is checked and dimmed.

Add a later rule in code.

Use the native checked state of the action button. Do not add a configuration UI.

Do not write comments in source files.

## Commands

After a code change, run this command:

```bash
npm run ci
```

Refresh Blizzard API declarations with this command:

```bash
npm run sync:wow-api
```

## TypeScript

The project uses `exactOptionalPropertyTypes`. Optional properties use `?: T | undefined`.

Production types come from `types/wow-api/generated`. FrameXML declarations that the documentation
omits live in `types/wow-api/supplements.d.ts`.
