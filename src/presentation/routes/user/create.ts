const rescue = require('express-rescue')
const { validate, HttpError } = require('@expresso/expresso')
import { UserService } from '../../../services/UserService'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { UserExistsError } from '../../../domain/user/errors/UserExistsError'

export function factory (service: UserService): RequestHandler[] {
  return [
    validate({
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' }
      },
      required: ['name', 'email', 'phone'],
      additionalProperties: false
    }),
    rescue(async (req: Request, res: Response) => {
      const { name, email, phone } = req.body

      const user = await service.create(name, email, phone)

      res.status(201)
        .json({ id: user.id, name: user.name, email: user.email, phone: user.phone })
    }),
    (error: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (error instanceof UserExistsError) {
        return next(new HttpError.Conflict({ message: error.message, code: 'user_already_exists' }))
      }

      next(error)
    }
  ]
}
