import { createObservable, boolean, action } from 'fnx'

class State {
  deviceReady = boolean

  setAsReady? = action((s: State) => () => {
    s.deviceReady = true
  })
}

const initialState: State = {
  deviceReady: false,
}

export const state = createObservable(State, initialState)
