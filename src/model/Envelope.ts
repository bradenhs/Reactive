import { action, arrayOf, complex, computed, number, optional, readonly, string } from 'fnx'
import * as uuid from 'uuid'
import { model, styles } from '~/index'

export const enum EnvelopeView {
  NAMING, TRANSACTION
}

export class Envelope {
  // Properties
  @readonly
  id = string

  @readonly
  created = complex.date

  @optional
  nameInputValue? = string

  @optional
  transactionAmountInputValue? = string

  view: EnvelopeView = number

  @optional
  noteInputValue? = string

  name = string

  transactionIds = arrayOf(string)

  // Computed Values
  isTransacting? = computed((envelope: Envelope, root: model.AppState) => {
    return root.activeEnvelopeId === envelope.id && envelope.view === EnvelopeView.TRANSACTION
  })

  isNaming? = computed((envelope: Envelope, root: model.AppState) => {
    return root.activeEnvelopeId === envelope.id && envelope.view === EnvelopeView.NAMING
  })

  isInactive? = computed((envelope: Envelope, root: model.AppState) => {
    return root.activeEnvelopeId != undefined && root.activeEnvelopeId !== envelope.id
  })

  yPosition? = computed((envelope: Envelope, root: model.AppState) => {
    let yPosition = envelope.index * 72

    if (root.activeEnvelopeId != undefined &&
        root.sortedEnvelopes.indexOf(root.activeEnvelope) <
        envelope.index) {
      yPosition += root.activeEnvelope.isNaming ?
                   styles.namingViewHeight :
                   styles.transactingViewHeight
    }

    return yPosition
  })

  index? = computed((envelope: Envelope, root: model.AppState) => {
    return root.sortedEnvelopes.indexOf(envelope)
  })

  lastPaydayAmount? = computed((envelope: Envelope) => {
    const mostRecentPaydayTransaction = envelope.transactions
      .filter(transaction => transaction.type === model.TransactionType.PAYDAY)
      .sort((a, b) => a.amount > b.amount ? 1 : -1)[0]

    if (mostRecentPaydayTransaction != undefined) {
      return mostRecentPaydayTransaction.amount
    }
  })

  mostRecentTransaction? = computed((envelope: Envelope) => {
    return envelope.transactions
      .sort((a, b) => a.created.valueOf() > b.created.valueOf() ? 1 : -1)[0]
  })

  amount? = computed((envelope: Envelope) => {
    return envelope.transactions
      .map(transaction => transaction.amount)
      .reduce((total, current) => total + current, 0)
  })

  transactions? = computed((envelope: Envelope, root: model.AppState) => {
    return Object.keys(root.transactions)
      .filter(id => envelope.transactionIds.indexOf(id) > -1)
      .map(id => root.transactions[id])
  })

  // Actions

  setNameInputValue? = action((envelope: Envelope) => (value: string) => {
    envelope.nameInputValue = value
  })

  setNoteInputValue? = action((envelope: Envelope) => (value: string) => {
    envelope.noteInputValue = value
  })

  setTransactionAmountInputValue? = action((envelope: Envelope) => (value: string) => {
    envelope.transactionAmountInputValue = envelope.transactionAmountInputValue || ''

    if (/\d*\.?\d*/.test(value)) {
      const v = value.split('.').join('').split('')
      if (v.length > 2) {
        v.splice(v.length - 2, 0, '.')
      }
      envelope.transactionAmountInputValue = v.join('')
    }
  })

  setName? = action((envelope: Envelope, root: model.AppState) => (name: string) => {
    root.activeEnvelopeId = undefined
    envelope.name = name
  })

  remove? = action((envelope: Envelope, root: model.AppState) => () => {
    if (root.activeEnvelopeId === envelope.id) {
      root.activeEnvelopeId = undefined
    }
    delete root.envelopes[envelope.id]
  })

  enterRenameView? = action((envelope: Envelope, root: model.AppState) => () => {
    root.activeEnvelopeId = envelope.id
    envelope.nameInputValue = envelope.name
    envelope.view = EnvelopeView.NAMING
  })

  enterNewTransactionView? = action((envelope: Envelope, root: model.AppState) => () => {
    envelope.view = EnvelopeView.TRANSACTION
    envelope.transactionAmountInputValue = ''
    envelope.noteInputValue = ''
    root.activeEnvelopeId = envelope.id
  })

  deposit? = action((envelope: Envelope, root: model.AppState) =>
                    (amount: number, note?: string) => {

    const transaction: model.Transaction = {
      id: uuid.v4(),
      created: new Date(),
      amount,
      destinationId: envelope.id,
      sourceId: 'MANUAL',
      note
    }
    envelope.transactionIds.push(transaction.id)
    root.transactions[transaction.id] = transaction
    root.activeEnvelopeId = undefined
  })

  withdraw? = action((envelope: Envelope, root: model.AppState) =>
                     (amount: number, note?: string) => {

    const transaction: model.Transaction = {
      id: uuid.v4(),
      created: new Date(),
      amount: -amount,
      destinationId: envelope.id,
      sourceId: 'MANUAL',
      note
    }
    envelope.transactionIds.push(transaction.id)
    root.transactions[transaction.id] = transaction
    root.activeEnvelopeId = undefined
  })
}
