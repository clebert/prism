# Prism Test

Prism Test checks secure aura-group layout without action buttons or addon aura queries.
The expected result is a visible glow without Mark of the Wild and no glow with the buff.
Addon Lua never reads an aura frame, an aura-owned texture, or the secure layout size.

## Installation

Run this command from the repository:

```bash
bash tests/install-probe.sh
```

The installer puts `PrismTest` beside the Prism directory.
Set `PRISM_ADDON_DIRECTORY` to select another Prism directory.
The regular Prism installer and release package exclude the test addon.

## Client test

1. Restart the client so it discovers the test addon.
2. Enable **Prism Test** and disable **Prism** in the AddOns window.
3. Follow the panel instructions. Observe the glow above the panel.
4. Click **Pass** when the observed glow matches the expected result. Otherwise, click **Fail**.
5. Complete the seven checks, including Mark application and removal during combat.
6. Use `/reload` to save the report after the test.

The panel checks the combat state before it accepts a result.
The panel cannot check the buff or the glow. Each recorded result is a manual observation.
Send the full Lua error and stack if an error appears.

Use `/prismtest` to show the panel and glow.
Use **Hide** to hide the panel and glow.
Use **Reset** or `/prismtest reset` to erase the results and restart the test.
Reset the test after a window size change.

The client stores `PrismTestResults` in the account-level `SavedVariables/PrismTest.lua` file after a reload or logout.
The report records the expected buff, expected glow, observed combat state, and manual result for each check.

## Validation

```bash
luac5.1 -p tests/PrismTest/PrismTest.lua tests/probe.lua
lua5.1 tests/probe.lua
bash tests/install.sh
```

The automated tests check configuration, combat steps, report persistence, and controls.
Only the client can verify the secure layout behavior and combat restrictions.
