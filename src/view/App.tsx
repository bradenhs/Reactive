import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { classes } from 'typestyle'
import { app, icons, styles, utils, view } from '~/index'

const fab = utils.style({
  position: 'absolute',
  right: '20px',
  bottom: '20px',
  transformOrigin: '28px 28px',
  zIndex: 101,
  transition: styles.transition
})

const hideFab = utils.style({
  pointerEvents: 'none',
  transform: 'scale(0)'
})

export const App = ReactiveComponent(() =>
  <MuiThemeProvider muiTheme={ app.theme }>
    <div onTouchTap={ utils.blurAll }>
      <div onTouchTap={ app.closeAllEnvelopes }>
        <MUI.AppBar
          title='Envelopes'
          className={ getAppBarClassName() }
          onLeftIconButtonTouchTap={ app.menu.toggle }
        />
      </div>
      <view.Menu/>
      <view.Animated
        willEnter={ { opacity: 0, transform: 'translateY(50px)' } }
        didEnter={ { opacity: 1, transform: 'translateY(0px)' } }
        didLeave={ { opacity: 0, transform: 'translateY(-50px)' } }
        delay
      >
        { app.sortedEnvelopes.length > 0 ?
          <view.EnvelopeList key='list'/> :
          <view.EmptyList key='empty-list'/> }
      </view.Animated>
      <MUI.FloatingActionButton
        onTouchTap={ app.createEnvelope }
        className={ getFABClassName() }
        secondary
      >
        <icons.AddIcon/>
      </MUI.FloatingActionButton>
    </div>
  </MuiThemeProvider>
)

function getAppBarClassName() {
  return utils.style({
    paddingTop: app.topPadding + 'px'
  })
}

function getFABClassName() {
  if (app.hideFab) {
    return classes(fab, hideFab)
  } else {
    return fab
  }
}
