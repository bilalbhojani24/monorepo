#!/bin/bash
set -e

# $1 -> BUCKET_NAME $2 -> SOURCE

# Get the local path of the file/folder to be uploaded
SOURCE=$1

# Set bucket name and temporary folder name
DESTINATION=$2

# Check if the temporary folder exists in the bucket
if ! aws s3 ls "s3://$DESTINATION/" >/dev/null 2>&1; then
  # Create temporary folder in the bucket
  aws s3 cp --recursive --content-type "application/x-directory" /dev/null "s3://$DESTINATION/"
fi

if [ -f "$SOURCE" ]; then
  # Upload file to temporary folder in the bucket
  aws s3 cp "$SOURCE" "s3://$DESTINATION/$(basename "$SOURCE")"
  echo "$SOURCE uploaded to $DESTINATION as $(basename "$SOURCE")"
elif [ -d "$SOURCE" ]; then
  # Upload folder and its contents to temporary folder in the bucket
  aws s3 cp --recursive "$SOURCE" "s3://$DESTINATION/"
  echo "$SOURCE uploaded to $DESTINATION"
else
  echo "Error: $SOURCE is not a valid file or directory."
fi
