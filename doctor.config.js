const { Loan } = require('./dist/domain/loan/Loan')

module.exports = {
  mongodb: {
    uri: process.env.DATABASE_MONGODB_URI,
    dbName: process.env.DATABASE_MONGODB_DBNAME
  },
  entities: {
    loan: {
      entity: Loan,
      collection: 'loans'
    }
  }
}
