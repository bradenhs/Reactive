import { arrayOf, computed, string } from 'fnx'
import { Entity, State, TransactionType } from '~/store'

export class Envelope extends Entity {
  name = string

  amount = computed((envelope: Envelope) => {
    return envelope.transactions
      .map(t => t.amount)
      .reduce((total, current) => total + current, 0)
  })

  lastPaydayTransactionAmount = computed((envelope: Envelope) => {
    return envelope.transactions
      .filter(t => t.type === TransactionType.PAYDAY)
      .sort((a, b) => a.created.valueOf() > b.created.valueOf() ? 1 : -1)[0]
      .amount
  })

  transactions = computed((envelope: Envelope, root: State) => {
    return Object.keys(root.transactions)
      .filter(id => envelope.transactionIds.indexOf(id) !== -1)
      .map(id => root.transactions[id])
  })

  transactionIds = arrayOf(string)
}
