const mongoose = require('mongoose');
const Promise = require('bluebird');

const logger = require('./logger');
const env = require('./env');

const url = env.MONGODB;

mongoose.set('debug', env.NODE_ENV !== 'production');

mongoose.connect(url, { server: { reconnectTries: Number.MAX_VALUE } });

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => logger.info(`Mongoose default connection open to ${url}`));

mongoose.connection.on('error', err => logger.error(`Mongoose default connection error: ${err}`));

mongoose.connection.on('disconnected', () => logger.info('Mongoose default connection disconnected'));

mongoose.connection.once('open', () => logger.info('Mongoose default connection is open'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
