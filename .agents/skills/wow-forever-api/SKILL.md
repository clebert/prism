---
name: wow-forever-api
description: Verify World of Warcraft Forever APIs against version-matched client interface source before changing Prism Lua code. Covers secret aura restrictions and secure aura container use.
---

# WoW Forever API

Use this process for every WoW API, FrameXML, template, action-button, or secure-aura change.

## Source selection

Prefer a local interface export from the installed client. Enter this command in the client:

```text
/console ExportInterfaceFiles code
```

Use the resulting `BlizzardInterfaceCode` directory. Compare its `version.txt` with the installed client entry in `.build.info`.

Use the Forever source mirror only when its version matches the target client:

```bash
git clone --depth 1 --branch forever https://github.com/Gethe/wow-ui-source.git
```

When `.build.info` is absent, read `CFBundleVersion` from the client app `Info.plist`. The mirror `version.txt` must match that build.

Do not use a different build. Do not infer an API from memory, web examples, or another WoW product.

When a UI system has `Camelot` and `Mainline` files, read both. `Camelot` is the Forever flavor.

## Evidence

Search `Blizzard_APIDocumentationGenerated` for documented functions, events, structures, and script-object methods.

Search the implementation when the generated documentation omits a global, template, mixin, field, or security rule.

Inspect these files for the secure aura overlay:

```text
Blizzard_AuraContainer/Blizzard_AuraContainer.toc
Blizzard_AuraContainer/Blizzard_AuraContainer.lua
Blizzard_AuraContainer/Blizzard_AuraContainerFrameProviders.lua
Blizzard_AuraContainer/Blizzard_AuraContainerShared.lua
Blizzard_AuraContainer/Blizzard_AuraContainerSlots.lua
Blizzard_AuraContainer/Blizzard_AuraContainerUtil.lua
Blizzard_AuraContainer/Blizzard_CustomAuraButton.xml
Blizzard_AuraContainer/Blizzard_CustomAuraContainer.lua
Blizzard_AuraContainer/Blizzard_CustomAuraContainer.xml
Blizzard_AuraContainer/Blizzard_ManagedAuraContainer.lua
```

Also open these files before an aura or secret-value change:

```text
Blizzard_APIDocumentationGenerated/UnitAuraDocumentation.lua
Blizzard_APIDocumentationGenerated/SecretPredicatesDocumentation.lua
Blizzard_FrameXMLUtil/AuraUtil.lua
Blizzard_AuraContainer/Blizzard_AuraContainerSources.lua
```

Inspect these files for action buttons:

```text
Blizzard_ActionBar/Shared/ActionButton.lua
Blizzard_ActionBar/Mainline/ActionButtonTemplate.xml
```

Trace the complete implementation path. Verify template loading, mixins, filters, callbacks, access restrictions, and visibility changes.

Treat the client as the authority for secure behavior. Source inspection proves structure, but it does not prove engine restrictions.

## Restrictions

Forever uses the mainline secret-value rules. Combat, an encounter, a challenge mode, or a PvP match makes aura results secret. A never-secret or always-secret spell flag overrides that rule.

Do not compare a secret value in addon Lua. Do not branch on it. Pass the value to a client API. Use a curve or `SetAlphaFromBoolean`.

`C_UnitAuras.GetUnitAuraBySpellID` returns no values while the aura is secret. The call does not raise a blocked-action error. A nil result does not prove that the aura is absent.

Use the same secure path in combat and out of combat. Do not add a direct aura read for the out-of-combat case.

Unit health can be secret. Compare it with a step curve in `UnitHealthPercent`. Do not compare the raw value in Lua.

`C_ActionBar.IsUsableAction` can be secret. Pass it to `SetAlphaFromBoolean`. Do not branch on it.

## Aura containers

Use `CustomAuraContainerTemplate` for an aura-driven highlight. One container has one unit. Call `SetUnit` with one unit token.

Add one slot with `AddAuraSlot`. The secure container filters the aura and shows the slot frame. Build the visual in `initializeFrame`. Do not read the slot frame after that.

The slot frame denies tainted access while auras are secret. `IsShown` and `GetAlpha` can expose the aura or fail.

Hide a container from the action spell or from button visibility. Do not hide it from an aura result.

`SetUnit("target")` does not refresh the slot on a target change. Register `PLAYER_TARGET_CHANGED`. Call `UpdateAllAuras`.

Call `SetAuraSlotCandidateFilters` and `SetAuraSlotEnabled` only when the value changes. Each call refreshes all auras.

A slot is not part of the flow layout. Set flow padding and `SetSize` so the container keeps the button size. Anchor the slot frame with `SetAllPoints`.

Use a filter string from `AuraUtil.AuraFilters`. Join parts with `|`. A leading `!` negates one part.

`HELPFUL` keeps buffs. `HARMFUL` keeps debuffs. `PLAYER` keeps auras from the player, the player's pet, or the player's vehicle.

`includeSpellIDs` matches the exact spell ID. A rank does not match another rank. List every rank when any rank must count.

A spell ID filter is allowed for a helpful aura on an assistable unit. It is allowed for a harmful aura on a unit the player cannot assist. A never-secret spell is also allowed. A helpful aura on the player or a group member is also allowed.

A harmful aura on a friendly unit does not pass a spell ID filter. A helpful aura on an enemy does not pass it. When `includeSpellIDs` is set and the filter is not allowed, the slot rejects every aura.

A spell ID alone also matches another player's copy of that spell. Add `PLAYER` to the filter string for an own aura. Set `isFromPlayerOrPlayerPet` to true as a second caster check.

Do not write action-button state, icon, or cooldown. Draw feedback on a separate frame.

## Changes

Keep `Prism.lua` compatible with the Lua syntax accepted by the client. Follow the style already present in the file.

Keep API use narrow. Do not add a fallback from another WoW product without matching source evidence.

State the source version and relevant source files in the final response after an API change.

## Validation

Run this syntax check when a compatible parser exists:

```bash
luac -p Prism.lua
```

Use `luac5.1 -p Prism.lua` when the Lua 5.1 parser has that name.

Run `./install.sh` to install Prism in the default macOS Forever client.

Set `PRISM_ADDON_DIRECTORY` to use another directory.

Reload the client after each change.

Test the affected behavior in and out of combat. Test action paging, bar visibility, UI scaling, and spell movement when relevant.
