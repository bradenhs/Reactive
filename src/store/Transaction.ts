import { number, optional, readonly, string } from 'fnx'
import { Entity } from '~/store'

export enum TransactionType {
  PAYDAY, TRANSFER, MANUAL
}

export class Transaction extends Entity {
  @readonly envelopeId = string

  amount = number
  @optional note = string

  type: TransactionType = number
  // If type is TRANSFER
  @optional transferEnvelopId = string
}
