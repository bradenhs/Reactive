const express = require('express')
const path = require('path')
const fsbx = require('fuse-box')
const config = require('./config')
const TypeCheckPlugin = require('fuse-box-typechecker').TypeCheckPlugin

config.plugins = [ TypeCheckPlugin(), fsbx.SourceMapPlainJsPlugin() ]
config.sourceMap = {
  bundleReference: "sourcemaps.js.map",
  outFile: "sourcemaps.js.map",
}


const fuse = fsbx.FuseBox.init(config)

fuse
  .devServer('>index.tsx')
  .httpServer.app.use(
    express.static(path.join('clients', 'website'))
  )
