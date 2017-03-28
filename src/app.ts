import { createObservable } from 'fnx'
import { AppState, EnvelopeSort, Mode } from '~/model'

const initialAppState: AppState = {
  menu: {
    isOpen: false
  },
  mode: Mode.MANUAL_MODE,
  envelopeSort: EnvelopeSort.ALPHABETICAL,
  envelopes: { },
  transactions: { }
}

export const app = createObservable(AppState, initialAppState)
