import { app, icons, utils, view } from '~/index'

const img = utils.style({
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
      className={ getMenuHeaderClassName() }
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
      onTouchTap={ () => {
        alert('Not yet implemented')
        app.menu.close()
      } }
    />
    <view.MenuItem
      icon={ <icons.AnalyzeIcon/> }
      text='Analyze'
      onTouchTap={ () => {
        alert('Not yet implented')
        app.menu.close()
      } }
    />
    <view.MenuItem
      icon={ <icons.CollaborateIcon/> }
      text='Collaborate'
      onTouchTap={ () => {
        alert('Not yet implented')
        app.menu.close()
      } }
    />
    <MUI.Divider/>
    <view.MenuItem
      icon={ <icons.FeedbackIcon/> }
      text='Feedback'
      onTouchTap={ () => {
        alert('Not yet implemented')
        app.menu.close()
      } }
    />
    <view.MenuItem
      icon={ <icons.CodeIcon/> }
      text='Source Code'
      onTouchTap={ () => {
        alert('Not yet implemented')
        app.menu.close()
      } }
    />
  </MUI.Drawer>
)

function getMenuHeaderClassName() {
  return utils.style({
    background: app.theme.palette.primary1Color,
    textAlign: 'center',
    paddingTop: app.topPadding + 'px'
  })
}
