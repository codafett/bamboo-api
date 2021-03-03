/* eslint-disable camelcase */
import mongoose from 'mongoose';
import bluebird from 'bluebird';

import createLogger from '../utils/logger/Logger';

import config from '../config';

import regExUtils from '../utils/regExUtils/RegExUtils';

// Import when required
// import { runVersionScripts } from './versioning';
import v1_0_0 from './versioning/v1.0.0/index';
import { runVersionScripts } from './versioning';

const logger = createLogger('db');

export async function executeReleaseScripts() {
  logger.info('Running executeReleaseScripts...');
  // Run scripts in version order
  // E.G. runVersionScripts(version100);
  runVersionScripts(v1_0_0);
  logger.info('ExecuteReleaseScripts completed!');
}

export default function configureDb() {
  const uri = config.db;
  logger.debug('Got Uri...');

  mongoose.Promise = bluebird;

  mongoose.set('debug', regExUtils.matchWholeWordCaseInsensitive(config.logLevel, 'VERBOSE'));

  const promise = mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  );

  try {
    promise.then(async () => {
      /* Use `db`, for instance `db.model()`
      */
      logger.info(`connected to ${uri}`);

      try {
        await executeReleaseScripts();
      } catch (ex) {
        logException(ex);
        process.exit();
      }
    });
  } catch (ex) {
    logger.error(ex.message);
    process.exit();
  }

  mongoose.connection.on('error', (err) => {
    logger.error(err.message);
  });
}
