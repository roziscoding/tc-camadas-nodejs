import { ObjectId } from 'mongodb'
import { BookService } from './BookService'
import { UserService } from './UserService'
import { Loan } from '../domain/loan/Loan'
import { LoanRepository } from '../data/repositories/LoanRepository'

export class LoanService {
  private readonly repository: LoanRepository
  private readonly userService: UserService
  private readonly bookService: BookService

  constructor (repository: LoanRepository, bookService: BookService, userService: UserService) {
    this.repository = repository
    this.userService = userService
    this.bookService = bookService
  }

  async create (userId: ObjectId, bookId: ObjectId): Promise<Loan> {
    const [ book, user ] = await Promise.all([
      this.bookService.find(bookId),
      this.userService.find(userId)
    ])

    const loan = new Loan().create(new ObjectId(), book.id, user.id)

    await this.repository.save(loan)

    return loan
  }
}
