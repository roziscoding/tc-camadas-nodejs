import { ObjectId } from 'mongodb'
import { Book } from '../domain/book/Book'
import { BookRepository } from '../data/repositories/BookRepository'
import { BookNotFoundError } from '../domain/book/errors/BookNotFoundError'

export class BookService {
  private readonly repository: BookRepository

  constructor (repository: BookRepository) {
    this.repository = repository
  }

  async create (name: string, year: string, author: string): Promise<Book> {
    const book = new Book(new ObjectId(), name, year, author)

    await this.repository.save(book)

    return book
  }

  async find (id: string | ObjectId): Promise<Book> {
    const book = await this.repository.findById(id)

    if (!book) {
      throw new BookNotFoundError(id as string)
    }

    return book
  }
}
