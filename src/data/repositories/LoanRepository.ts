import { Db } from 'mongodb'
import { Loan } from '../../domain/loan/Loan'
import { MongodbEventRepository } from '@nxcd/paradox'

export class LoanRepository extends MongodbEventRepository<Loan> {
  constructor (connection: Db) {
    super(connection.collection(Loan.collection), Loan)
  }
}
