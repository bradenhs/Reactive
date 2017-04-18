import { action, boolean, computed, mapOf, number, object, optional, parseInto, string } from 'fnx'
import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as uuid from 'uuid'
import { model } from '~/index'

export const enum EnvelopeSort {
  MOST_RECENT_TRANSACTION, AMOUNT_LEFT_ASCENDING, AMOUNT_LEFT_DESCENDING,
  ALPHABETICAL, REVERSE_ALPHABETICAL, CREATED
}

export const enum Mode {
  PAYDAY_MODE, TRANSFER_MODE, MANUAL_MODE, PAYCHECK_ENTER_MODE
}

export class AppState {
  menu = object(model.Menu)

  mode: Mode = number

  loading = boolean

  topPadding = number

  @optional
  paycheckInputValue? = string

  unallocated = number

  activeEnvelope? = computed((appState: AppState) => appState.envelopes[appState.activeEnvelopeId])

  @optional
  activeEnvelopeId? = string

  unallocatedVisible? = computed((appState: AppState) => {
    return appState.mode === Mode.MANUAL_MODE &&
           appState.activeEnvelope == undefined &&
           appState.unallocated > 0
  })

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

  closeAllEnvelopes? = action((appState: AppState) => () => {
    appState.activeEnvelopeId = undefined
  })

  setUnallocated? = action((appState: AppState) => (amount: number) => {
    appState.unallocated = amount
  })

  setTopPadding? = action((appState: AppState) => (topPadding: number) => {
    appState.topPadding = topPadding
  })

  fromObject? = action((appState: AppState) => (object: object) => {
    parseInto(object, appState)
  })

  finishLoading? = action((appState: AppState) => () => {
    appState.loading = false
  })

  setMode? = action((appState: AppState) => (mode: Mode) => {
    appState.mode = mode
    if (mode === Mode.PAYCHECK_ENTER_MODE) {
      appState.paycheckInputValue = ''
    }
  })

  setActiveEnvelope? = action((appState: AppState) => (id: string) => {
    appState.activeEnvelopeId = id
  })

  setPaycheckInputValue? = action((appState: AppState) => (value: string) => {
    appState.paycheckInputValue = appState.paycheckInputValue || ''

    if (/\d*\.?\d*/.test(value)) {
      const v = value.split('.').join('').split('')
      if (v.length > 2) {
        v.splice(v.length - 2, 0, '.')
      }
      appState.paycheckInputValue = v.join('')
    }
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
  } else if (appState.envelopeSort === EnvelopeSort.CREATED) {
    return envelopeArray.sort((a, b) => a.created.valueOf() > b.created.valueOf() ? -1 : 1)
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
  let alternateTextColor: string
  const accent1Color = colors.deepOrange500

  if (mode === Mode.MANUAL_MODE) {
    primary1Color = colors.blue500
    primary2Color = colors.blue700
    alternateTextColor = colors.fullWhite
  } else if (mode === Mode.PAYDAY_MODE) {
    primary1Color = colors.green600
    primary2Color = colors.green800
    alternateTextColor = colors.fullWhite
  } else if (mode === Mode.PAYCHECK_ENTER_MODE) { // mode === Mode.TRANSFER_MODE
    primary1Color = colors.fullWhite
    primary2Color = colors.darkWhite
    alternateTextColor = colors.grey600
  }

  return getMuiTheme({
    palette: {
      primary1Color,
      primary2Color,
      accent1Color,
      alternateTextColor,
    },
    drawer: {
      width: 280,
    },
  })
}
