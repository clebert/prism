#!/bin/bash

set -e

repository_directory="$(cd "$(dirname "$0")" && pwd)"
addon_directory="${PRISM_ADDON_DIRECTORY:-/Applications/World of Warcraft/_classic_beta_/Interface/AddOns/Prism}"

mkdir -p "$addon_directory"

while IFS= read -r source_file; do
    case "$source_file" in
        ""|\#*) continue ;;
    esac

    mkdir -p "$(dirname "$addon_directory/$source_file")"
    cp "$repository_directory/$source_file" "$addon_directory/$source_file"
done < "$repository_directory/Prism.toc"

cp "$repository_directory/Prism.toc" "$addon_directory/Prism.toc"
echo "Installed Prism in $addon_directory"
