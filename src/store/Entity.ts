import { boolean, complex, readonly, string } from 'fnx'

export class Entity {
  @readonly id = string
  @readonly created = complex((d: Date) => d.toUTCString(), v => new Date(v))
  lastModified = complex((d: Date) => d.toUTCString(), v => new Date(v))
  syncedWithRemote = boolean
}
