# this should be run from the project root
./scripts/setup_symlinks.sh
yarn run build:production
cd clients/mobile-app
cordova prepare
cd ../../
yarn run generate-icon
yarn run generate-splash
./scripts/reinstall_plugins.sh