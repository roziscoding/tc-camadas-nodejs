import { UserError } from './UserError'

export class UserExistsError extends UserError {
  constructor (email: string) {
    super(`User with email ${email} already exists`)
  }
}
