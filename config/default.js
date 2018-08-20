const { deferConfig } = require('config/defer')
const path = require('path')
const winston = require('winston')

const components = require('./components.json')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      // level: 'debug',
    }),
  ],
})

module.exports = {
  authsome: {
    mode: path.join(__dirname, 'auth.js'),
    teams: {
      author: {
        name: 'Author',
      },
      editor: {
        name: 'Editor',
      },
      editors: {
        name: 'Editors Global',
      },
    },
  },
  mailer: {
    from: 'nobody@example.com',
    transport: {
      sendmail: true,
    },
  },
  publicKeys: ['pubsweet-client', 'authsome', 'pubsweet', 'validations'],
  pubsweet: { components },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
  },
  'pubsweet-server': {
    baseUrl: deferConfig(
      cfg => `${cfg['pubsweet-server'].host}:${cfg['pubsweet-server'].port}`,
    ),
    enableExperimentalGraphql: true,
    logger,
    uploads: 'uploads',
  },
  validations: path.join(__dirname, 'validations'),
}
