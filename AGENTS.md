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

Run `luac -p Rules.lua Core.lua Shared.lua Prism.lua Classes/*.lua tests/*.lua tests/PrismTest/PrismTest.lua` with a compatible Lua parser.

Use `luac5.1` when the Lua 5.1 parser has that name.

Run `tests/rules.lua`, `tests/mechanics.lua`, `tests/composition.lua`, `tests/runtime.lua`, and `tests/probe.lua` with Lua 5.1.

Test mechanics and distinct interactions with synthetic IDs and rule declarations.

Load real class declarations only in the generic rule-selection and validation tests.

Do not keep class-specific, spell-specific, or racial-specific automated behavior tests in the repository.

Do not duplicate production spell lists, rank lists, or class support policies in tests.

A declaration that uses tested mechanics needs no new behavior test.

Extend existing mechanic or helper tests when coverage is incomplete. Do not add another scenario for covered behavior.

Keep a persistent regression test only when it adds missing mechanic or helper coverage with synthetic data.

Use a temporary test outside the repository to reproduce a declaration-only bug.
It must fail before the fix and pass after it. Remove it after validation.

Verify spell data against exact client data. Check concrete spell behavior in the client.

Run `bash tests/install.sh` to test the installation.

Run `./install.sh` to install Prism in the default macOS Forever client.

Set `PRISM_ADDON_DIRECTORY` to use another directory.

Use `/reload`, then test the changed behavior in the client.
