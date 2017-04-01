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
    <div onTouchTap={ utils.closeKeyboard }>
      <div onTouchTap={ app.closeAllEnvelopes }>
        <MUI.AppBar
          title='Envelopes'
          className={ getAppBarClassName() }
          onLeftIconButtonTouchTap={ app.menu.toggle }
          iconElementRight={ <MUI.FlatButton label='Payday'/> }
        />
      </div>
      <view.Menu/>
      <view.Animated
        willEnter={ { opacity: 0, transform: 'translateY(50px) !important' } }
        didEnter={ { opacity: 1, transform: 'translateY(0px) !important' } }
        didLeave={ { opacity: 0, transform: 'translateY(-50px) !important' } }
        delay
      >
        { app.sortedEnvelopes.length > 0 ?
          <view.EnvelopeList key='list'/> :
          <view.EmptyList key='empty-list'/> }
      </view.Animated>
      <MUI.FloatingActionButton
        onTouchTap={ createEnvelope }
        className={ getFABClassName() }
        secondary
      >
        <icons.AddIcon/>
      </MUI.FloatingActionButton>
    </div>
  </MuiThemeProvider>
)

function createEnvelope() {
  app.createEnvelope()
  setTimeout(() => {
    const input = document.querySelector('#id-' + app.sortedEnvelopes[0].id) as HTMLInputElement
    if (input && input.focus) {
      input.focus()
    }
  }, 300)
}

function getAppBarClassName() {
  return utils.style({
    paddingTop: app.topPadding + 'px',
    $nest: {
      '& > *': {
        transform: `translateY(${app.loading ? -32 : 0}px)`,
        opacity: app.loading ? 0 : 1,
        transition: styles.transition,
      },
      '& > *:nth-child(2)': {
        transitionDelay: '50ms'
      },
      '& > *:nth-child(3)': {
        transitionDelay: '100ms'
      }
    }
  })
}

function getFABClassName() {
  if (app.hideFab || app.loading) {
    return classes(fab, hideFab)
  } else {
    return fab
  }
}
