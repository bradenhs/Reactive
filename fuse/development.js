const express = require('express')
const path = require('path')
const fuse = require('./config')

fuse
  .devServer('>index.tsx')
  .httpServer.app.use(
    express.static(path.join('clients', 'website'))
  )
