#!/bin/bash

set -e

repository_directory="$(cd "$(dirname "$0")/.." && pwd)"
addon_directory="${PRISM_ADDON_DIRECTORY:-/Applications/World of Warcraft/_classic_beta_/Interface/AddOns/Prism}"
probe_directory="$(dirname "$addon_directory")/PrismTest"

mkdir -p "$probe_directory"
cp "$repository_directory/tests/PrismTest/PrismTest.toc" "$probe_directory/PrismTest.toc"
cp "$repository_directory/tests/PrismTest/PrismTest.lua" "$probe_directory/PrismTest.lua"
echo "Installed Prism Test in $probe_directory"
