#!/bin/bash
set -e

# Define an array of project directories
projects=(
  "packages/utils"
  "packages/hooks"
  "packages/bifrost"
  "packages/services"
  "packages/integrations"
  "packages/growth"
  "packages/webex"
)

# Set default value for master_pull to true
master_pull=${1:-true}

# Check if master_pull is true
if [ "$master_pull" == "true" ]; then
  echo "Taking current master pull..."
  # git pull origin master
  echo "Pull completed..."
fi

echo "Installing packages started..."
pnpm install
echo "Installing packages completed..."

# Loop through each project and build the React app
for project in "${projects[@]}"
do
  echo "Building $project..."
  cd "$project" || exit
  pnpm run build
 cd ../..
done

echo "All projects built!"
