#!/bin/bash

set -e

repository_directory="$(cd "$(dirname "$0")" && pwd)"
addon_directory="${PRISM_ADDON_DIRECTORY:-/Applications/World of Warcraft/_classic_beta_/Interface/AddOns/Prism}"

mkdir -p "$addon_directory"
cp "$repository_directory/Prism.lua" "$repository_directory/Prism.toc" "$addon_directory/"

echo "Installed Prism in $addon_directory"
