import ReactiveComponent from 'fnx/react'
import * as MUI from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as C from '~/components'
import { state } from '~/state'
import { getTheme, mobileAppBar } from '~/styles'

export const App = ReactiveComponent(() =>
  <MuiThemeProvider muiTheme={ getTheme() }>
    <div>
      <MUI.AppBar
        title='Envelopes'
        onLeftIconButtonTouchTap={ state.menu.toggle }
        className={ ENVIRONMENT === 'mobile-app' && mobileAppBar }
      />
      <C.Menu/>
    </div>
  </MuiThemeProvider>
)
