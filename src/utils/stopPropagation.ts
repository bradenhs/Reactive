import { utils } from '~/index'

export function stopPropagation(e: __MaterialUI.TouchTapEvent) {
  utils.closeKeyboard()
  e.stopPropagation()
}
