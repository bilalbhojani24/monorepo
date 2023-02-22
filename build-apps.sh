#!/bin/bash

# Define an array of project directories
projects=(
  "packages/utils"
  "packages/hooks"
  "packages/bifrost"
)

echo "Taking current pre-master pull..."
git pull origin pre-master
echo "Taking pull completed..."

echo "Installing packages started..."
pnpm install
echo "Installing packages completed..."

# Loop through each project and build the React app
for project in "${projects[@]}"
do
  echo "Building $project..."
  cd "$project" || exit
  pnpm run build
  cd ..
  cd ..
done

echo "All projects built!"


echo "copying RTE skin css to dist of bifrost"
# Source folder path
src_folder="packages/bifrost/utils/texteditorSkin"

# Destination folder path
dest_folder="packages/bifrost/dist"

# Copy the folder and its contents to the destination folder
cp -r "$src_folder" "$dest_folder"