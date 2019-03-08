import routes from './routes'
import { Express } from 'express'
import expresso from '@expresso/expresso'
import { IAppConfig } from '../app-config'
import mongodb from '../data/connections/mongodb'
import { UserService } from '../services/UserService'
import { BookService } from '../services/BookService'
import { UserRepository } from '../data/repositories/UserRepository'
import { BookRepository } from '../data/repositories/BookRepository'
import { LoanRepository } from '../data/repositories/LoanRepository';
import { LoanService } from '../services/LoanService';

export const app = expresso(async (app: Express, config: IAppConfig) => {
  const mongodbConnection = await mongodb.createConnection(config.database.mongodb)

  /**
   * Books
   * =====
   */
  const bookRepository = new BookRepository(mongodbConnection)
  const bookService = new BookService(bookRepository)

  /**
   * Users
   * =====
   */
  const userRepository = new UserRepository(mongodbConnection)
  const userService = new UserService(userRepository)

  /**
   * Loans
   * =====
   */
  const loanRepository = new LoanRepository(mongodbConnection)
  const loanService = new LoanService(loanRepository, bookService, userService)

  /**
   * Books
   * =====
   */
  app.post('/books', routes.books.create.factory(bookService))

  /**
   * Users
   * =====
   */
  app.post('/users', routes.users.create.factory(userService))

  /**
   * Loan
   * ====
   */
  app.post('/loans', routes.loans.create.factory(loanService))
})
