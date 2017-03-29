import { action, computed, mapOf, number, object, optional, string } from 'fnx'
import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as uuid from 'uuid'
import { model } from '~/index'

export const enum EnvelopeSort {
  MOST_RECENT_TRANSACTION, AMOUNT_LEFT_ASCENDING, AMOUNT_LEFT_DESCENDING,
  ALPHABETICAL, REVERSE_ALPHABETICAL
}

export const enum Mode {
  PAYDAY_MODE, TRANSFER_MODE, MANUAL_MODE
}

export class AppState {
  menu = object(model.Menu)

  mode: Mode = number

  activeEnvelope? = computed((appState: AppState) => appState.envelopes[appState.activeEnvelopeId])

  @optional
  activeEnvelopeId? = string

  hideFab? = computed((appState: AppState) => appState.activeEnvelopeId != undefined)

  theme? = computed((appState: AppState) => getTheme(appState.mode))

  sortedEnvelopes? = computed((appState: AppState) => sortEnvelopes(appState))

  envelopeSort: EnvelopeSort = number

  envelopes = mapOf(object(model.Envelope))
  transactions = mapOf(object(model.Transaction))

  createEnvelope? = action((appState: AppState) => () => {
    const envelope: model.Envelope = {
      id: uuid.v4(),
      created: new Date(),
      view: model.EnvelopeView.NAMING,
      name: '',
      transactionIds: [ ]
    }

    appState.activeEnvelopeId = envelope.id

    appState.envelopes[envelope.id] = envelope
  })
}

function sortEnvelopes(appState: AppState) {
  const envelopeArray = Object.keys(appState.envelopes).map(id => appState.envelopes[id])

  if (appState.envelopeSort === EnvelopeSort.MOST_RECENT_TRANSACTION) {
    return envelopeArray.sort((a, b) => {
      if (a.mostRecentTransaction && b.mostRecentTransaction) {
        return a.mostRecentTransaction.created.valueOf() >
                b.mostRecentTransaction.created.valueOf() ? 1 : -1
      } else if (a.mostRecentTransaction) {
        return 1
      } else if (b.mostRecentTransaction) {
        return -1
      } else {
        return 0
      }
    })
  } else if (appState.envelopeSort === EnvelopeSort.ALPHABETICAL) {
    return envelopeArray.sort((a, b) => a.name.localeCompare(b.name))
  } else if (appState.envelopeSort === EnvelopeSort.REVERSE_ALPHABETICAL) {
    return envelopeArray.sort((a, b) => b.name.localeCompare(a.name))
  } else if (appState.envelopeSort === EnvelopeSort.AMOUNT_LEFT_ASCENDING) {
    return envelopeArray.sort((a, b) => a.amount > b.amount ? 1 : -1)
  } else if (appState.envelopeSort === EnvelopeSort.AMOUNT_LEFT_DESCENDING) {
    return envelopeArray.sort((a, b) => a.amount > b.amount ? -1 : 1)
  } else {
    return envelopeArray
  }
}

function getTheme(mode: Mode) {
  let primary1Color: string
  let primary2Color: string
  const accent1Color = colors.deepOrange500

  if (mode === Mode.MANUAL_MODE) {
    primary1Color = colors.blue500
    primary2Color = colors.blue700
  } else if (mode === Mode.PAYDAY_MODE) {
    primary1Color = colors.green600
    primary2Color = colors.green800
  } else { // mode === Mode.TRANSFER_MODE
    primary1Color = colors.purple500
    primary2Color = colors.purple700
  }

  return getMuiTheme({
    palette: {
      primary1Color,
      primary2Color,
      accent1Color,
    },
    drawer: {
      width: 280,
    },
  })
}
