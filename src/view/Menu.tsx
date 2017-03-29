import { style } from 'typestyle'
import { app, icons, view } from '~/index'

const img = style({
  width: '64px',
  margin: '50px'
})

export const Menu = ReactiveComponent(() =>
  <MUI.Drawer
    docked={ false }
    open={ app.menu.isOpen }
    onRequestChange={ app.menu.toggle }
  >
    <header
      className={ style({ background: app.theme.palette.primary1Color, textAlign: 'center' }) }
    >
      <img className={ img } src='assets/icon.png'/>
    </header>
    <view.MenuItem
      icon={ <icons.EnvelopeIcon/> }
      text='Envelopes'
      onTouchTap={ app.menu.close }
    />
    <view.MenuItem
      icon={ <icons.HistoryIcon/> }
      text='History'
      onTouchTap={ app.menu.close }
    />
    <view.MenuItem
      icon={ <icons.AnalyzeIcon/> }
      text='Analyze'
      onTouchTap={ app.menu.close }
    />
    <view.MenuItem
      icon={ <icons.CollaborateIcon/> }
      text='Collaborate'
      onTouchTap={ app.menu.close }
    />
    <MUI.Divider/>
    <view.MenuItem
      icon={ <icons.FeedbackIcon/> }
      text='Feedback'
      onTouchTap={ app.menu.close }
    />
    <view.MenuItem
      icon={ <icons.CodeIcon/> }
      text='Source Code'
      onTouchTap={ app.menu.close }
    />
  </MUI.Drawer>
)
