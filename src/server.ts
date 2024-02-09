import 'colorts/lib/string';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeTOEvents from './app/events';
import config from './config';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  process.exit(1);
});
let server: Server;


const connectToDatabase = async () => {
  try {
    await RedisClient.connect().then(() =>{
      subscribeTOEvents();
    })
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully.'.green);

    server = app.listen(config.port, () => {
      console.log(`Application listening on ${config.port}`.yellow);
    });
  } catch (err) {
    console.log('Failed to connect.', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
connectToDatabase();

process.on('SIGALRM', () => {
  console.log('SIGALRM is received');
  if (server) {
    server.close();
  }
});
