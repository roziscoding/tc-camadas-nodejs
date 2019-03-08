import { UserError } from './UserError'

export class UserNotFoundError extends UserError {
  constructor (id: string) {
    super(`User with id "${id} was not found"`)
  }
}
