import { action, boolean, object } from 'fnx'
import { Menu } from '~/state'

export class State {
  deviceReady = boolean

  menu = object(Menu)

  setAsReady? = action((root: State) => () => {
    root.deviceReady = true
  })
}
