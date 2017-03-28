import { style } from 'typestyle'
import { app } from '~/app'
import {
  AnalyzeIcon, CodeIcon, CollaborateIcon, EnvelopeIcon, FeedbackIcon, HistoryIcon,
} from '~/constants'
import * as View from '~/view'

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
    <View.MenuItem
      icon={ <EnvelopeIcon/> }
      text='Envelopes'
      onTouchTap={ app.menu.close }
    />
    <View.MenuItem
      icon={ <HistoryIcon/> }
      text='History'
      onTouchTap={ app.menu.close }
    />
    <View.MenuItem
      icon={ <AnalyzeIcon/> }
      text='Analyze'
      onTouchTap={ app.menu.close }
    />
    <View.MenuItem
      icon={ <CollaborateIcon/> }
      text='Collaborate'
      onTouchTap={ app.menu.close }
    />
    <MUI.Divider/>
    <View.MenuItem
      icon={ <FeedbackIcon/> }
      text='Feedback'
      onTouchTap={ app.menu.close }
    />
    <View.MenuItem
      icon={ <CodeIcon/> }
      text='Source Code'
      onTouchTap={ app.menu.close }
    />
  </MUI.Drawer>
)
