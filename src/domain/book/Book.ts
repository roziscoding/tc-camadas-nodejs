import { ObjectId } from 'mongodb'

export class Book {
  static readonly collection: string = 'books'
  id: ObjectId
  name: string
  year: string
  author: string

  constructor (id: ObjectId, name: string, year: string, author: string) {
    this.id = id
    this.name = name
    this.year = year
    this.author = author
  }
}
