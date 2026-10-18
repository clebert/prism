#!/bin/bash

set -e

repository_directory="$(cd "$(dirname "$0")/.." && pwd)"
temporary_directory="$(mktemp -d)"
trap 'rm -rf "$temporary_directory"' EXIT
addon_directory="$temporary_directory/Prism"

PRISM_ADDON_DIRECTORY="$addon_directory" "$repository_directory/install.sh"
cmp "$repository_directory/Prism.toc" "$addon_directory/Prism.toc"

while IFS= read -r source_file; do
    case "$source_file" in
        ""|\#*) continue ;;
    esac

    cmp "$repository_directory/$source_file" "$addon_directory/$source_file"
done < "$repository_directory/Prism.toc"

test ! -e "$addon_directory/tests"
PRISM_ADDON_DIRECTORY="$addon_directory" bash "$repository_directory/tests/install-probe.sh"
probe_directory="$temporary_directory/PrismTest"
cmp "$repository_directory/tests/PrismTest/PrismTest.toc" "$probe_directory/PrismTest.toc"
cmp "$repository_directory/tests/PrismTest/PrismTest.lua" "$probe_directory/PrismTest.lua"
test ! -e "$probe_directory/tests"
echo "Installation tests passed."
