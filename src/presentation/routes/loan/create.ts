const rescue = require('express-rescue')
const { validate, HttpError } = require('@expresso/expresso')
import { LoanService } from '../../../services/LoanService'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { UserNotFoundError } from '../../../domain/user/errors/BookNotFoundError'
import { BookNotFoundError } from '../../../domain/book/errors/BookNotFoundError'

export function factory (service: LoanService): RequestHandler[] {
  return [
    validate({
      type: 'object',
      properties: {
        bookId: { type: 'string' },
        userId: { type: 'string' }
      },
      required: ['bookId', 'userId'],
      additionalProperties: false
    }),
    rescue(async (req: Request, res: Response) => {
      const { bookId, userId } = req.body

      const loan = await service.create(userId, bookId)

      res.status(201)
        .json(loan.state)
    }),
    (error: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (error instanceof UserNotFoundError) {
        return next(new HttpError.NotFound({ message: error.message, code: 'user_not_found' }))
      }

      if (error instanceof BookNotFoundError) {
        return next(new HttpError.NotFound({ message: error.message, code: 'book_bot_found' }))
      }

      next(error)
    }
  ]
}
