import { createObservable } from 'fnx'
import { State } from '~/state'

const initialState: State = {
  deviceReady: false,
  menu: {
    isOpen: false
  }
}

export const state = createObservable(State, initialState)
