import env from 'sugar-env'
import IMongoParams from './data/structures/IMongoParams'

export interface IAppConfig {
  cors: {
    exposedHeaders: string[]
  }
  database: {
    mongodb: IMongoParams
  }
}

export const config: IAppConfig = {
  cors: {
    exposedHeaders: ['x-content-range']
  },
  database: {
    mongodb: {
      uri: env.get('DATABASE_MONGODB_URI'),
      dbName: env.get('DATABASE_MONGODB_DBNAME'),
      options: {}
    }
  }
}
