import { model } from '~/index'

export function createApp() {
  return new model.AppState({
    menu: {
      isOpen: false
    },
    topPadding: 0,
    mode: model.Mode.MANUAL_MODE,
    envelopeSort: model.EnvelopeSort.CREATED,
    envelopes: { },
    transactions: { },
    loading: true
  })
}
