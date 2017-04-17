import fnx from 'fnx'
import { AppModel } from '~/model'

export class MenuModel extends fnx.Model<AppModel> {
  isOpen = fnx.boolean

  @fnx.action
  setOpen?(value: boolean) {
    this.isOpen = value
  }
}
