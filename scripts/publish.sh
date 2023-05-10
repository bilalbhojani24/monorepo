#!/bin/bash
set -e

# Get the local path of the file/folder to be uploaded
SOURCE=$1

# Set S3 Destination
DESTINATION=$2

# HTML backup folder name
BCKP_FOLDERNAME=$3

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
  
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup started"
  aws s3 cp "$SOURCE" "s3://$DESTINATION/backup/$BCKP_FOLDERNAME/" --recursive --exclude "*" --include "*.html*"
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup completed"

  echo "*****PRODUCTION PUBLISH ENDED*****"
else
  echo "*****STAGING PUBLISH STARTED*****"

  echo "$SOURCE uploading to $DESTINATION"
  aws s3 sync "$SOURCE" "s3://$DESTINATION"  --delete 
  echo "$SOURCE uploading to $DESTINATION completed"

  echo "*****STAGING PUBLISH ENDED*****"
fi
