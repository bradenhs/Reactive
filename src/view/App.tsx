import { important } from 'csx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as AnimatedNumber from 'react-animated-number'
import { classes } from 'typestyle'
import { app, icons, model, styles, utils, view } from '~/index'

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
        { renderAppBar() }
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

function renderAppBar() {
  let paycheckEl: __MaterialUI.TextField
  return <div>
    <MUI.AppBar
      title={ {
        [model.Mode.MANUAL_MODE]: 'Envelopes',
        [model.Mode.PAYDAY_MODE]: <AnimatedNumber
          value={ app.unallocated }
          formatValue={ v => utils.formatCurrency(v) + ' left' }
          duration={ 750 }
        />,
        [model.Mode.PAYCHECK_ENTER_MODE]: ''
      }[app.mode] }
      className={ getAppBarClassName() }
      onLeftIconButtonTouchTap={ {
        [model.Mode.MANUAL_MODE]: app.menu.toggle,
        [model.Mode.PAYCHECK_ENTER_MODE]: () => app.setMode(model.Mode.MANUAL_MODE),
        [model.Mode.PAYDAY_MODE]: () => app.setMode(model.Mode.MANUAL_MODE)
      }[app.mode] }
      iconElementLeft={
        app.mode === model.Mode.MANUAL_MODE ? <MUI.IconButton><icons.MenuIcon/></MUI.IconButton> :
        <MUI.IconButton><icons.CloseIcon/></MUI.IconButton>
      }
      iconElementRight={ {
        [model.Mode.MANUAL_MODE]: <MUI.FlatButton label='Payday'/>,
        [model.Mode.PAYCHECK_ENTER_MODE]:
          <MUI.IconButton
            disabled={ Math.round(parseFloat(app.paycheckInputValue || '0') * 100) === 0 }
          ><icons.DoneIcon/></MUI.IconButton>,
        [model.Mode.PAYDAY_MODE]: <div/>,
      }[app.mode] }
      onRightIconButtonTouchTap={ {
        [model.Mode.MANUAL_MODE]: () => {
          app.setMode(model.Mode.PAYCHECK_ENTER_MODE)
          setTimeout(() => {
            (document.querySelector('#paycheck-enter') as HTMLInputElement).focus()
          })
        },
        [model.Mode.PAYCHECK_ENTER_MODE]: () => {
          app.setUnallocated(app.unallocated + parseFloat(app.paycheckInputValue))
          app.setMode(model.Mode.PAYDAY_MODE)
        },
      }[app.mode] }
    />
    { app.mode === model.Mode.PAYCHECK_ENTER_MODE && <div
      onTouchTap={ e => {
        e.stopPropagation()
        paycheckEl && paycheckEl.focus()
      } }
    >
      <span className={ getPlaceholderClassName() }>
        { getPlaceholderText() }
        <span style={ { color: 'white' } }>{
          app.paycheckInputValue
        }</span>
      </span>
      <MUI.TextField
        id='paycheck-enter'
        value={ app.paycheckInputValue || '' }
        className={ getPaydayWageInputClassName() }
        ref={ c => paycheckEl = c }
        hintText='Paycheck'
        pattern='[0-9]*'
        hintStyle={ { fontWeight: 400 } }
        type={ getInputType() }
        onKeyPress={ onKeyPress }
        onChange={ (e: any) => {
          e.preventDefault()
          app.setPaycheckInputValue(e.target.value)
        } }
        underlineShow={ false }
      />
    </div> }
  </div>
}

function getPlaceholderClassName() {
  return utils.style({
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 3000,
    fontSize: '20px',
    fontWeight: 300,
    right: '64px',
    top: '21px',
    fontFamily: 'Roboto',
    textAlign: 'right',
    color: app.theme.palette.accent3Color,
    $nest: {
      '&::before': {
        content: `'$'`,
        position: 'absolute',
        marginLeft: '-17px'
      }
    }
  })
}

function getPlaceholderText() {
  const value = app.paycheckInputValue
  if (value == undefined) {
    return '0.00'
  }
  if (value.length > 4) {
    return ''
  }
  return '0.00'.slice(0, 4 - value.length)
}

function onKeyPress(e: React.KeyboardEvent<{}>) {
  if (!/\d/.test(String.fromCharCode(e.which))) {
    e.preventDefault()
  }
}

function getInputType() {
  if (typeof device === 'object' && device.platform === 'Android') {
    return 'number'
  } else {
    return 'text'
  }
}

function getPaydayWageInputClassName() {
  return utils.style({
    position: important('absolute'),
    left: '64px',
    $nest: {
      '& > *': {
        textAlign: important('right')
      }
    },
    top: '8px',
    fontSize: important('20px'),
    width: important('calc(100% - 128px)'),
    zIndex: 9000
  })
}

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
  if (app.hideFab || app.loading || app.mode === model.Mode.PAYCHECK_ENTER_MODE) {
    return classes(fab, hideFab)
  } else {
    return fab
  }
}
