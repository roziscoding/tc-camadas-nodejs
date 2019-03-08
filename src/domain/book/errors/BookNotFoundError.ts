import { BookError } from './BookError'

export class BookNotFoundError extends BookError {
  constructor (id: string) {
    super(`Book with id "${id} was not found"`)
  }
}
