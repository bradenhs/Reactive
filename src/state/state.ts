import { action, boolean, createObservable } from 'fnx'

class State {
  deviceReady = boolean

  setAsReady? = action((root: State) => () => {
    root.deviceReady = true
  })
}

const initialState: State = {
  deviceReady: false,
}

export const state = createObservable(State, initialState)
