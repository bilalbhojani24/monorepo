#!/bin/bash

# Set the source and destination paths
SOURCE="../../packages/bifrost/utils/texteditorSkin"
DESTINATION="dist/assets/css/texteditorSkin"

# Check if the source folder exists
if [ ! -d "$SOURCE" ]; then
  echo "Source folder does not exist"
  exit 1
fi

# Check if the destination folder exists
if [ -d "$DESTINATION" ]; then
  rm -rf "$DESTINATION"
else 
  mkdir -p "$DESTINATION"
fi

# Copy the folder
cp -r "$SOURCE" "$DESTINATION"

# Check if the copy was successful
if [ $? -eq 0 ]; then
  echo "Folder copied successfully"
else
  echo "Failed to copy folder"
  exit 1
fi