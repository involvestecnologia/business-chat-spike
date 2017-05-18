const os = require('os');
const path = require('path');
const shell = require('shelljs');
const split = require('split');
const DailyRotateFile = require('winston-daily-rotate-file');
const winston = require('winston');

winston.emitErrs = true;

const logDirectory = path.join(os.homedir(), '.backend/logs');
shell.mkdir('-p', logDirectory);

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: path.join(logDirectory, 'out'),
      datePattern: '.HH-mm.dd-MM-yyyy.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = split().on('data', (message) => {
  logger.info(message);
});
