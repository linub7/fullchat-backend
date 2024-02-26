import mongoose from 'mongoose';
import Logger from 'bunyan';

import { config } from './config';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = async () => {
    try {
      await mongoose.connect(`${config.DATABASE_URL}`);
      log.info('DB Connected');
    } catch (error) {
      log.error(error);
      log.error('Error connecting to DB');
      return process.exit(1);
    }
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
// "dev": "nodemon -r tsconfig-paths/register src/app.ts | ./node_modules/.bin/bunyan"
