#!/bin/bash
set -e

# Define an array of project directories
projects=(
  "packages/utils"
  "packages/hooks"
  "packages/bifrost"
)

# Loop through each project and build the React app
for project in "${projects[@]}"
do
  echo "Building $project..."
  cd "$project" || exit
  pnpm run build
  cd ../..
done

#Generate Product path and run pnpm build 
export PRODUCT_NAME=$1
export PRODUCT_PATH="apps/${PRODUCT_NAME}"

echo "$PRODUCT_PATH"
cd "$PRODUCT_PATH"
pnpm run build

echo "Product projects built!"
