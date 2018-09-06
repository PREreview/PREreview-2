const { deferConfig } = require('config/defer')
const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
    }),
    new winston.transports.DailyRotateFile({
      datePattern: 'DD-MM-YYYY',
      dirname: path.join(__dirname, '../logs/production'),
      filename: 'app-%DATE%.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: true,
      maxFiles: '30d',
      zippedArchive: true,
    }),
  ],
})

module.exports = {
  'pubsweet-client': {
    baseUrl: deferConfig(
      cfg => `http://localhost:${cfg['pubsweet-server'].port}`,
    ),
  },
  'pubsweet-server': {
    logger,
  },
}
