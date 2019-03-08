import moment from 'moment'
import { ObjectId } from 'mongodb'
import { EventEntity } from '@nxcd/paradox'
import { LoanWasCreatedEvent } from './events/LoanWasCreatedEvent'

export class Loan extends EventEntity<Loan> {
  static readonly collection: string = 'loans'
  public id: ObjectId | null = null
  public bookId: ObjectId | null = null
  public userId: ObjectId | null = null
  public createdAt: Date | null = null
  public returnDate: Date | null = null

  constructor () {
    super({
      [LoanWasCreatedEvent.eventName]: LoanWasCreatedEvent.commit
    })
  }

  create (id: ObjectId, bookId: ObjectId, userId: ObjectId) {
    const returnDate = moment().add('d', 1).toDate()

    this.pushNewEvents([
      new LoanWasCreatedEvent({
        id,
        bookId: bookId,
        userId: userId,
        returnDate
      })
    ])

    return this
  }

  get state () {
    const currentState = this.reducer.reduce(new Loan(), this.events)

    return {
      id: currentState.id,
      bookId: currentState.bookId,
      userId: currentState.userId,
      createdAt: currentState.createdAt,
      returnDate: currentState.returnDate
    }
  }
}
