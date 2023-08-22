#!/bin/bash
set -e

# Get the local path of the file/folder to be uploaded
SOURCE=$1

# Set S3 Destination
DESTINATION=$2

# HTML backup folder name
BCKP_FOLDERNAME=$3

# App Name
ASSET_PATH=$4

# Sourcemap bucket staging
SOURCEMAP_BUCKET_STAGING="sourcemaps-test"

# Sourcemap bucket production
SOURCEMAP_BUCKET_STAGING="sourcemaps-test"

if [ ! -d "$SOURCE" ]; then
  echo "Error: $SOURCE is not a valid directory."
  exit 1
fi

if [ "$BCKP_FOLDERNAME" ] 
then
  echo "*****PRODUCTION PUBLISH STARTED*****"
  
  echo "$SOURCE uploading to $DESTINATION"
  aws s3 sync --exclude "*.html*" "$SOURCE" "s3://$DESTINATION/live" 
  echo "$SOURCE uploading to $DESTINATION/live completed"

  aws s3 sync --exclude "*.html*" "$SOURCE" "s3://$DESTINATION/$ASSET_PATH" 
  echo "$SOURCE uploading to $DESTINATION/$ASSET_PATH completed"
  
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup started"
  aws s3 cp "$SOURCE" "s3://$DESTINATION/backup/$BCKP_FOLDERNAME/" --recursive --exclude "*" --include "*.html*"
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup completed"

  echo "*****PRODUCTION PUBLISH ENDED*****"
else
  echo "*****STAGING PUBLISH STARTED*****"

  echo "$SOURCE uploading to $DESTINATION"
  aws s3 sync --exclude "*.map" "$SOURCE" "s3://$DESTINATION"  --delete 
  echo "$SOURCE uploading to $DESTINATION completed"

  echo "$SOURCE uploading map files to $SOURCEMAP_BUCKET_STAGING"
  # aws s3 sync "$SOURCE" "s3://$SOURCEMAP_BUCKET_STAGING" --exclude "*" --include "*.map"
  
  aws s3 cp "$SOURCE/assets/js" "s3://$SOURCEMAP_BUCKET_STAGING/" --recursive --exclude "*" --include "*.map"


  echo "$SOURCE uploading map files to $SOURCEMAP_BUCKET_STAGING completed"

  echo "*****STAGING PUBLISH ENDED*****"
fi
