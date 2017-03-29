import * as _React from 'react'
import * as _MUI from 'material-ui'
import _ReactiveComponent from 'fnx/react'

// Make sure anything added to this list is also added to the webpack/autoImport.js file

declare global {
  const React: typeof _React
  const MUI: typeof _MUI
  const ReactiveComponent: typeof _ReactiveComponent
  const ENVIRONMENT: 'website' | 'mobile-app'
}
