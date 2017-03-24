const FuseBox = require('fuse-box').FuseBox

const fuse = FuseBox.init({
  homeDir: 'src',
  outFile: 'build/bundle.js',
  autoImport: {
    'React': 'react'
  },
})

module.exports = fuse
