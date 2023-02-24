#!/bin/bash
set -e

# $1 -> BUCKET_NAME $2 -> SOURCE

# Get the local path of the file/folder to be uploaded
SOURCE=$1

# Set bucket name and temporary folder name
DESTINATION=$2

# HTML backup file name
BCKP_FOLDERNAME=$3

# Take html file name

if [ -d "$SOURCE" ]; then
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
else
  echo "Error: $SOURCE is not a valid file or directory."
fi

