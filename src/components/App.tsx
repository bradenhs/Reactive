import ReactiveComponent from 'fnx/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import { getTheme } from '~/styles'

export const App = ReactiveComponent(() =>
  <MuiThemeProvider muiTheme={ getTheme() }>
    <div>Reactive Jello</div>
  </MuiThemeProvider>
)
