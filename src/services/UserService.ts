import { ObjectId } from 'mongodb'
import { User } from '../domain/user/User'
import { UserRepository } from '../data/repositories/UserRepository'
import { UserExistsError } from '../domain/user/errors/UserExistsError'
import { UserNotFoundError } from '../domain/user/errors/BookNotFoundError'

export class UserService {
  private readonly repository: UserRepository

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async create (name: string, email: string, phone: string): Promise<User> {
    if (await this.repository.existsByEmail(email)) {
      throw new UserExistsError(email)
    }

    const user = new User(new ObjectId(), name, email, phone)

    await this.repository.save(user)

    return user
  }

  async find (id: string | ObjectId): Promise<User> {
    const book = await this.repository.findById(id)

    if (!book) {
      throw new UserNotFoundError(id as string)
    }

    return book
  }
}
