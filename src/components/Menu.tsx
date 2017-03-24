import ReactiveComponent from 'fnx/react'
import * as MUI from 'material-ui'
import * as React from 'react'
import { state } from '~/state'
import * as styles from '~/styles'

export const Menu = ReactiveComponent(() =>
  <MUI.Drawer
    docked={ false }
    open={ state.menu.isOpen }
    onRequestChange={ state.menu.toggle }
  >
    <header className={ styles.drawerHeader }>
      <img src='/assets/icon.png'/>
    </header>
  </MUI.Drawer>
)
