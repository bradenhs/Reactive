import * as MUI from 'material-ui'
import * as controller from '~/controller'
import { app } from '~/index'
import * as view from '~/view'

export const Menu = ReactiveComponent(() => {
  return <MUI.Drawer
    docked={ false }
    open={ app.menu.isOpen }
    onRequestChange={ controller.menu.toggle }
  >
    <view.MenuItem
      icon={ <view.icons.EnvelopeIcon/> }
      text='Envelopes'
      onTouchTap={ controller.menu.close }
    />
    <view.MenuItem
      icon={ <view.icons.HistoryIcon/> }
      text='History'
      onTouchTap={ controller.menu.close }
    />
    <view.MenuItem
      icon={ <view.icons.AnalyzeIcon/> }
      text='Analyze'
      onTouchTap={ controller.menu.close }
    />
    <view.MenuItem
      icon={ <view.icons.CollaborateIcon/> }
      text='Collaborate'
      onTouchTap={ controller.menu.close }
    />
    <MUI.Divider/>
    <view.MenuItem
      icon={ <view.icons.FeedbackIcon/> }
      text='Feedback'
      onTouchTap={ controller.menu.close }
    />
    <view.MenuItem
      icon={ <view.icons.CodeIcon/> }
      text='Source Code'
      onTouchTap={ controller.menu.close }
    />
  </MUI.Drawer>
})
