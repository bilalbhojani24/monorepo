#!/bin/bash
set -e

# $1 -> AWS_ACCESS_KEY_ID $2 -> AWS_SECRET_ACCESS_KEY $3 -> BUCKET_NAME $4  ->  LOCAL_PATH
# Set AWS credentials
export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
export AWS_DEFAULT_REGION='us-east-1'

# Set bucket name and temporary folder name
export BUCKET_NAME=$3
export TEMP_FOLDER_NAME='temp'

# Check if the temporary folder exists in the bucket
if ! aws s3 ls "s3://$BUCKET_NAME/$TEMP_FOLDER_NAME/" >/dev/null 2>&1; then
  # Create temporary folder in the bucket
  aws s3 cp --recursive --content-type "application/x-directory" /dev/null "s3://$BUCKET_NAME/$TEMP_FOLDER_NAME/"
fi

# Get the local path of the file/folder to be uploaded
export LOCAL_PATH=$4

if [ -f "$LOCAL_PATH" ]; then
  # Upload file to temporary folder in the bucket
  aws s3 cp "$LOCAL_PATH" "s3://$BUCKET_NAME/$TEMP_FOLDER_NAME/$(basename "$LOCAL_PATH")"
  echo "$LOCAL_PATH uploaded to $BUCKET_NAME/$TEMP_FOLDER_NAME as $(basename "$LOCAL_PATH")"
elif [ -d "$LOCAL_PATH" ]; then
  # Upload folder and its contents to temporary folder in the bucket
  aws s3 cp --recursive "$LOCAL_PATH" "s3://$BUCKET_NAME/$TEMP_FOLDER_NAME/"
  echo "$LOCAL_PATH uploaded to $BUCKET_NAME/$TEMP_FOLDER_NAME"
else
  echo "Error: $LOCAL_PATH is not a valid file or directory."
fi
