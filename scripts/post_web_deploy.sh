# *Note this should be run from the workspace root directory
# i.e. ./scripts/post_web_deploy.sh

# This file is run on the netlify deploy server because it doesn't know how
# to deal with symbolic links

# Run the production build
yarn run build:production

# Remove existing directories
rm -rf clients/website/assets
rm -rf clients/website/build

# Copy build and assets directories over
cp -R assets clients/website/assets
cp -R build clients/website/build