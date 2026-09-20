#!/bin/bash

set -e

npm run compile:emit

addon_directory="/Applications/World of Warcraft/_classic_beta_/Interface/AddOns/Prism"

echo "Update: $addon_directory"

rm -rf "$addon_directory"
mkdir -p "$addon_directory"

paths_to_copy=("lib" "Prism.toc")

for path in "${paths_to_copy[@]}"; do
    rsync -a "./$path" "$addon_directory"
done
