---
name: wow-forever-api
description: Verify World of Warcraft Forever APIs against version-matched client interface source before changing Prism Lua code.
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

Do not use a different build. Do not infer an API from memory, web examples, or another WoW product.

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

Inspect these files for action buttons:

```text
Blizzard_ActionBar/Shared/ActionButton.lua
Blizzard_ActionBar/Mainline/ActionButtonTemplate.xml
```

Trace the complete implementation path. Verify template loading, mixins, filters, callbacks, access restrictions, and visibility changes.

Treat the client as the authority for secure behavior. Source inspection proves structure, but it does not prove engine restrictions.

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
