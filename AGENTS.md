# Prism

## Design

Prism is a World of Warcraft Forever addon that adds visual feedback to action buttons.

Keep the runtime direct and small. Use Lua source directly.

Do not add a build step, generated code, or an external runtime dependency.

Split source files only when the separation makes distinct features easier to maintain.

Use secure aura containers for aura-driven features.

Do not read restricted aura data or change action-button state directly.

## WoW API

Read `.agents/skills/wow-forever-api/SKILL.md` before an API change.

Verify every undocumented API against version-matched interface source.

Do not infer an API from memory or from source for another game version.

## Validation

Run `luac -p Prism.lua` with a compatible Lua parser.

Use `luac5.1 -p Prism.lua` when the Lua 5.1 parser has that name.

Run `./install.sh` to install Prism in the default macOS Forever client.

Set `PRISM_ADDON_DIRECTORY` to use another directory.

Use `/reload`, then test the changed behavior in the client.
