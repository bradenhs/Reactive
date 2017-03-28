import { arrayOf, complex, computed, number, readonly, string } from 'fnx'
import { AppState, TransactionType } from '~/model'

export const enum EnvelopeView {
  EDIT, TRANSACTION
}

export class Envelope {
  @readonly id = string
  @readonly created = complex.date

  view: EnvelopeView = number

  name = string

  lastPaydayAmount? = computed((envelope: Envelope) => {
    const mostRecentPaydayTransaction = envelope.transactions
      .filter(transaction => transaction.type === TransactionType.PAYDAY)
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

  transactions? = computed((envelope: Envelope, root: AppState) => {
    return Object.keys(root.transactions)
      .filter(id => envelope.transactionIds.indexOf(id) > -1)
      .map(id => root.transactions[id])
  })

  transactionIds = arrayOf(string)
}
