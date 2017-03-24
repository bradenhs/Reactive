# *Note this should be run from the workspace root
# i.e. ./scripts/setup_symlinks.sh

# Setup symbolic links for the mobile-app client
cd clients/mobile-app/www
rm -rf build
rm -rf assets
ln -s ../../../build build
ln -s ../../../assets assets

# Setup symbolic links for the website client
cd ../../website
rm -rf build
rm -rf assets
ln -s ../../build build
ln -s ../../assets assets