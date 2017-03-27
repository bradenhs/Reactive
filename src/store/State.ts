import { action, boolean, mapOf, object } from 'fnx'
import { Envelope, Menu, Transaction } from '~/store'

export class State {
  deviceReady = boolean

  menu = object(Menu)

  setAsReady? = action((root: State) => () => {
    root.deviceReady = true
  })

  envelopes = mapOf(object(Envelope))
  transactions = mapOf(object(Transaction))
}
