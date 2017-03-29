import { createObservable } from 'fnx'
import { model } from '~/index'

export function createApp() {
  const initialAppState: model.AppState = {
    menu: {
      isOpen: false
    },
    mode: model.Mode.MANUAL_MODE,
    envelopeSort: model.EnvelopeSort.ALPHABETICAL,
    envelopes: { },
    transactions: { }
  }

  return createObservable(model.AppState, initialAppState)
}
