const rescue = require('express-rescue')
const { validate } = require('@expresso/expresso')
import { BookService } from '../../../services/BookService'
import { RequestHandler, Request, Response } from 'express'

export function factory (service: BookService): RequestHandler[] {
  return [
    validate({
      type: 'object',
      properties: {
        name: { type: 'string' },
        year: { type: 'string' },
        author: { type: 'string' }
      },
      required: ['name', 'year', 'author'],
      additionalProperties: false
    }),
    rescue(async (req: Request, res: Response) => {
      const { name, year, author } = req.body

      const book = await service.create(name, year, author)

      res.status(201)
        .json({ id: book.id, name: book.name, year: book.year, author: book.author })
    })
  ]
}
