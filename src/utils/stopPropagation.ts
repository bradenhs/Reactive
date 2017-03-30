import { utils } from '~/index'

export function stopPropagation(e: __MaterialUI.TouchTapEvent) {
  utils.blurAll()
  e.stopPropagation()
}
