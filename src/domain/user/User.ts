import { ObjectId } from 'mongodb'

export class User {
  public static readonly collection: string = 'users'

  id: ObjectId
  name: string
  email: string
  phone: string

  constructor (id: ObjectId, name: string, email: string, phone: string) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
  }
}
