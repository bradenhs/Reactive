import { action, arrayOf, complex, computed, number, optional, readonly, string } from 'fnx'
import * as uuid from 'uuid'
import { model } from '~/index'

export const enum EnvelopeView {
  NAMING, TRANSACTION
}

export class Envelope {
  @readonly id = string
  @readonly created = complex.date

  view: EnvelopeView = number

  @optional newTransactionAmount? = string

  name = string
  @optional proposedName? = string

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
    let yPosition = root.sortedEnvelopes.indexOf(envelope) * 72

    if (root.activeEnvelopeId != undefined &&
        root.sortedEnvelopes.indexOf(root.activeEnvelope) <
        root.sortedEnvelopes.indexOf(envelope)) {
      yPosition += 92
    }

    return yPosition
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

  transactionIds = arrayOf(string)

  setProposedName? = action((envelope: Envelope) => (proposedName: string) => {
    envelope.proposedName = proposedName
  })

  setNewTransactionAmount? = action((envelope: Envelope) => (amount: string) => {
    envelope.newTransactionAmount = amount
  })

  commitProposedNamed? = action((envelope: Envelope, root: model.AppState) => () => {
    root.activeEnvelopeId = undefined
    envelope.name = envelope.proposedName
    envelope.view = EnvelopeView.TRANSACTION
  })

  remove? = action((envelope: Envelope, root: model.AppState) => () => {
    root.activeEnvelopeId = undefined
    delete root.envelopes[envelope.id]
  })

  startRename? = action((envelope: Envelope, root: model.AppState) => () => {
    root.activeEnvelopeId = envelope.id
    envelope.view = EnvelopeView.NAMING
  })

  startTransacting? = action((envelope: Envelope, root: model.AppState) => () => {
    envelope.view = EnvelopeView.TRANSACTION
    root.activeEnvelopeId = envelope.id
  })

  addAmount? = action((envelope: Envelope, root: model.AppState) => () => {
    const transaction: model.Transaction = {
      id: uuid.v4(),
      created: new Date(),
      amount: parseFloat(envelope.newTransactionAmount),
      destinationId: envelope.id,
      sourceId: 'MANUAL'
    }
    envelope.transactionIds.push(transaction.id)
    root.transactions[transaction.id] = transaction
    root.activeEnvelopeId = undefined
  })

  transferAmount? = action((envelope: Envelope, root: model.AppState) => () => {
    const transaction: model.Transaction = {
      id: uuid.v4(),
      created: new Date(),
      amount: -parseFloat(envelope.newTransactionAmount),
      destinationId: envelope.id,
      sourceId: 'MANUAL'
    }
    root.transactions[transaction.id] = transaction
    envelope.transactionIds.push(transaction.id)
    root.activeEnvelopeId = undefined
  })

  minusAmount? = action((envelope: Envelope, root: model.AppState) => () => {
    const transaction: model.Transaction = {
      id: uuid.v4(),
      created: new Date(),
      amount: -parseFloat(envelope.newTransactionAmount),
      destinationId: envelope.id,
      sourceId: 'MANUAL'
    }
    root.transactions[transaction.id] = transaction
    envelope.transactionIds.push(transaction.id)
    root.activeEnvelopeId = undefined
  })
}
