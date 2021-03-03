/**
 * Created by reube on 15/07/2017.
 */
// Hold application config

import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  db: process.env.DB || 'mongodb://localhost:27017/bamboo',
  logLevel: process.env.LOG_LEVEL || 'info',
};
