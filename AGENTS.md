# Prism

## Design

Prism is a World of Warcraft Forever addon. Keep all addon code in `Prism.lua`.

Keep the addon direct and small. Do not add a build step, dependency, generated file, or configuration UI.

Use the secure aura container for aura state. Do not read restricted aura data or change action-button state directly.

Do not write comments in source code.

## WoW API

Read `.agents/skills/wow-forever-api/SKILL.md` before an API change. Verify every undocumented API against version-matched interface source.

Do not infer an API from memory or from a TypeScript declaration.

## Validation

Run `luac -p Prism.lua` when a compatible Lua parser is available.

Install `Prism.toc` and `Prism.lua` in the client. Use `/reload`, then test the changed behavior.
