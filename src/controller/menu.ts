import { app } from '~/index'

export const menu = {
  toggle() {
    app.menu.setOpen(!app.menu.isOpen)
  },
  close() {
    app.menu.setOpen(false)
  }
}
