const fsbx = require('fuse-box')
const config = require('./config')

config.plugins = [ fsbx.UglifyJSPlugin() ]

const fuse = fsbx.FuseBox.init(config)

fuse.bundle('>index.tsx')