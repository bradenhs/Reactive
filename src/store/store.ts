import { createObservable } from 'fnx'
import { State } from '~/store'

const initialState: State = {
  deviceReady: false,
  menu: {
    isOpen: false
  }
}

export const state = createObservable(State, initialState)
