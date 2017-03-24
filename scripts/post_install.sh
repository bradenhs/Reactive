# this should be run from the project root
./scripts/setup_symlinks.sh
yarn run build:production
cd clients/mobile-app
cordova prepare
cd ../../
echo "If the following commands fail make sure you have imagemagick installed"
echo "Mac: brew install imagemagick, Debian/Ubuntu: sudo apt-get install imagemagick"
yarn run generate-icon
yarn run generate-splash
./scripts/reinstall_plugins.sh