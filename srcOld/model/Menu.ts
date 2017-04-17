import { action, boolean } from 'fnx'

export class Menu {
  isOpen = boolean

  toggle? = action((menu: Menu) => () => {
    menu.isOpen = !menu.isOpen
  })

  open? = action((menu: Menu) => () => {
    menu.isOpen = true
  })

  close? = action((menu: Menu) => () => {
    menu.isOpen = false
  })
}
