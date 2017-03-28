import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { classes, style } from 'typestyle'
import { app } from '~/app'
import { transition } from '~/styles'
import * as View from '~/view'

const fab = style({
  position: 'absolute',
  right: '20px',
  bottom: '20px',
  transformOrigin: '28px 28px',
  zIndex: 101,
  transition
})

const hideFab = style({
  pointerEvents: 'none',
  transform: 'scale(0)'
})

export const App = ReactiveComponent(() =>
  <MuiThemeProvider muiTheme={ app.theme }>
    <div>
      <MUI.AppBar
        title='Envelopes'
        onLeftIconButtonTouchTap={ app.menu.toggle }
      />
      <View.Menu/>
      <View.EnvelopeList/>
      <MUI.FloatingActionButton
        onTouchTap={ app.createEnvelope }
        className={ getFABClassName() }
        secondary
      >
        <ContentAdd/>
      </MUI.FloatingActionButton>
    </div>
  </MuiThemeProvider>
)

function getFABClassName() {
  if (app.hideFab) {
    return classes(fab, hideFab)
  } else {
    return fab
  }
}
