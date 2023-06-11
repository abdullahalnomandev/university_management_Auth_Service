import 'colorts/lib/string';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully.'.green);

    server = app.listen(config.port, () => {
      logger.info(`Application listening on ${config.port}`.yellow);
    });
  } catch (err) {
    errorLogger.error('Failed to connect.', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
connectToDatabase();

process.on('SIGALRM', () => {
  logger.info('SIGALRM is received');
  if (server) {
    server.close();
  }
});
