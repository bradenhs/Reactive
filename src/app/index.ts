import { createObservable } from 'fnx'
import { model } from '~/index'

export function createApp() {
  const initialAppState: model.AppState = {
    menu: {
      isOpen: false
    },
    topPadding: 0,
    mode: model.Mode.MANUAL_MODE,
    envelopeSort: model.EnvelopeSort.CREATED,
    envelopes: { },
    transactions: { }
  }

  return createObservable(model.AppState, initialAppState)
}
