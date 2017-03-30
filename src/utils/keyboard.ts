import { utils } from '~/index'

export function closeKeyboardThen(fn: () => any) {
  utils.blurAll()
  setTimeout(fn)
}
