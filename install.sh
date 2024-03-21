#!/bin/bash

set -e # Terminates script at the first error

npm run compile:emit

if [ "${1:-}" == "--ptr" ]; then
    addon_directory="/Applications/World of Warcraft/_ptr2_/Interface/AddOns/Prism"
else
    addon_directory="/Applications/World of Warcraft/_classic_era_/Interface/AddOns/Prism"
fi

echo "Update: $addon_directory"

rm -rf "$addon_directory"
mkdir -p "$addon_directory"

paths_to_copy=("lib" "Prism.toc")

for path in "${paths_to_copy[@]}"; do
    rsync -a "./$path" "$addon_directory"
done
