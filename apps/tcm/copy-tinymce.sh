#!/bin/bash

# Set the source and destination paths
SOURCE="node_modules/@browserstack/bifrost/utils/texteditorSkin"
DESTINATION="dist/assets/texteditorSkin"

# Check if the source folder exists
if [ ! -d "$SOURCE" ]; then
  echo "Source folder does not exist"
  exit 1
fi

# Check if the destination folder exists
if [ -d "$DESTINATION" ]; then
  echo "Destination folder already exists"
  exit 0
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