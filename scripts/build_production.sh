rm ./build/*
NODE_ENV='production' webpack -p --config webpack/dependencies.config.js
NODE_ENV='production' webpack -p --config webpack/src.config.js