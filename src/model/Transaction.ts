import { complex, computed, number, optional, readonly, string } from 'fnx'
import { AppState } from '~/model'

export const enum TransactionType {
  PAYDAY, TRANSFER, MANUAL
}

export class Transaction {
  @readonly id = string
  @readonly created = complex.date

  amount = number

  @optional note? = string

  type? = computed((transaction: Transaction) => {
    if (transaction.sourceId === 'PAYDAY') {
      return TransactionType.PAYDAY
    } else if (transaction.sourceId === 'MANUAL') {
      return TransactionType.MANUAL
    } else {
      return TransactionType.TRANSFER
    }
  })

  destination? = computed((transaction: Transaction, root: AppState) => {
    return root.envelopes[transaction.destinationId]
  })

  source? = computed((transaction: Transaction, root: AppState) => {
    return root.envelopes[transaction.sourceId]
  })

  destinationId = string
  sourceId: 'PAYDAY' | 'MANUAL' | string = string
}
