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

if ! aws s3 ls "s3://$DESTINATION/" >/dev/null 2>&1; then
  echo "$DESTINATION does not exist. Creating now."
  aws s3 mb "s3://$DESTINATION"
fi


if [ "$BCKP_FOLDERNAME" ] 
then
  echo "*****PRODUCTION PUBLISH STARTED*****"
  
  echo "$SOURCE uploading to $DESTINATION"
  aws s3 sync --exclude "index.html" --exclude "index.html.br" "$SOURCE" "s3://$DESTINATION" 
  echo "$SOURCE uploading to $DESTINATION completed"
  
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup started"
  aws s3 cp "$SOURCE/index.html" "s3://$DESTINATION/backup/$BCKP_FOLDERNAME/index.html" 
  aws s3 cp "$SOURCE/index.html.br" "s3://$DESTINATION/backup/$BCKP_FOLDERNAME/index.html.br" 
  echo "$SOURCE uploading $BCKP_FOLDERNAME to $DESTINATION/backup completed"

  echo "*****PRODUCTION PUBLISH ENDED*****"
else
  echo "*****STAGING PUBLISH STARTED*****"

  echo "$SOURCE uploading to $DESTINATION"
  aws s3 sync "$SOURCE" "s3://$DESTINATION"  --delete 
  echo "$SOURCE uploading to $DESTINATION completed"

  echo "*****STAGING PUBLISH ENDED*****"
fi
