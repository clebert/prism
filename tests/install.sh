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
echo "Installation tests passed."
