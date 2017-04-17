import * as MUI from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as controller from '~/controller'
import { app } from '~/index'
import * as utils from '~/utils'
import * as view from '~/view'

export const App = ReactiveComponent(() => {
  return <MuiThemeProvider muiTheme={ app.getTheme() }>
    <div className={ getAppClassName() }>
      <MUI.AppBar
        onLeftIconButtonTouchTap={ controller.menu.toggle }
      />
      <view.Menu/>
    </div>
  </MuiThemeProvider>
})

function getAppClassName() {
  return utils.style({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: '#eee'
  })
}
