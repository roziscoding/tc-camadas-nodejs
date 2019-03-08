import { User } from '../../domain/user/User'
import { Db, Collection, ObjectId } from 'mongodb'

export class UserRepository {
  private readonly _collection: Collection

  constructor (connection: Db) {
    this._collection = connection.collection(User.collection)
  }

  private async update (user: User) {
    await this._collection.update({ _id: user.id }, {
      $set: { name: user.name, email: user.email, phone: user.phone }
    })
  }

  async save (user: User): Promise<void> {
    const existingUser = await this._collection.find({ _id: user.id })
      .limit(1)
      .count()
      .then(count => count > 0)

    if (existingUser) {
      return this.update(user)
    }

    await this._collection.insert({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    })
  }

  async existsByEmail (email: string): Promise<Boolean> {
    return this._collection.find({ email })
      .limit(1)
      .count()
      .then(count => count > 0)
  }

  async findById (id: string | ObjectId): Promise<User | null> {
    return this._collection.findOne({ _id: new ObjectId(id) })
      .then((document) => {
        if (!document) {
          return null
        }

        return new User(document._id, document.name, document.email, document.phone)
      })
  }
}
