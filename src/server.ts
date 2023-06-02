import 'colorts/lib/string'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected successfully.'.green)
    app.listen(config.port, () => {
      logger.info(`Application listening on ${config.port}`.yellow)
    })
  } catch (err) {
    errorLogger.error('Failed to connect.', err)
  }
}
connectToDatabase()
