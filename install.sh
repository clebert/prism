#!/bin/bash

set -e

addon_directory="/Applications/World of Warcraft/_classic_beta_/Interface/AddOns/Prism"

rm -rf "$addon_directory"
mkdir -p "$addon_directory"
cp Prism.lua Prism.toc "$addon_directory/"

echo "Installed Prism in $addon_directory"
