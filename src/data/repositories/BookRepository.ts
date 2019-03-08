import { Book } from '../../domain/book/Book'
import { Db, Collection, ObjectId } from 'mongodb'

export class BookRepository {
  private readonly _collection: Collection

  constructor (connection: Db) {
    this._collection = connection.collection(Book.collection)
  }

  private async update (book: Book) {
    await this._collection.update({ _id: book.id }, {
      $set: { name: book.name, year: book.year, author: book.author }
    })
  }

  async save (book: Book): Promise<void> {
    const existingBook = await this._collection.find({ _id: book.id })
      .limit(1)
      .count()
      .then(count => count > 0)

    if (existingBook) {
      return this.update(book)
    }

    await this._collection.insert({
      _id: book.id,
      name: book.name,
      year: book.year,
      author: book.author
    })
  }

  async findById (id: string | ObjectId): Promise<Book | null> {
    return this._collection.findOne({ _id: new ObjectId(id) })
      .then((document) => {
        if (!document) {
          return null
        }

        return new Book(document._id, document.name, document.year, document.author)
      })
  }
}
