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

## Game data

Verify every hard-coded spell ID in version-matched `SpellName` and `SpellEffect` data from the exact Forever client build.

Do not use interface comments, tutorial lists, or another game mode as spell-ID evidence.

Distinguish the action spell from its activation aura, teaching spell, and related effects.

## Validation

Run `luac -p Prism.lua Core.lua Shared.lua Classes/*.lua tests/*.lua` with a compatible Lua parser.

Use `luac5.1` when the Lua 5.1 parser has that name.

Run the Lua tests in `tests/fear-warning.lua`, `tests/mechanics.lua`, and `tests/rules.lua` with Lua 5.1.

Run `bash tests/install.sh` to test the installation.

Run `./install.sh` to install Prism in the default macOS Forever client.

Set `PRISM_ADDON_DIRECTORY` to use another directory.

Use `/reload`, then test the changed behavior in the client.
