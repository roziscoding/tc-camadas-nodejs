import { Loan } from '../Loan'
import { ObjectId } from 'mongodb'
import { Event } from '@nxcd/paradox'

interface ILoanCreationParams {
  id: ObjectId | null
  bookId: ObjectId | null
  userId: ObjectId | null
  returnDate: Date | null
}

export class LoanWasCreatedEvent extends Event<ILoanCreationParams> {
  static readonly eventName: string = 'loan-was-created'

  constructor (params: ILoanCreationParams) {
    super(LoanWasCreatedEvent.eventName, params)
  }

  static commit (state: Loan, event: LoanWasCreatedEvent): Loan {
    state.id = event.data.id
    state.bookId = event.data.bookId
    state.userId = event.data.userId
    state.createdAt = event.timestamp
    state.returnDate = event.data.returnDate

    return state
  }
}
