const { deferConfig } = require('config/defer')
const path = require('path')

const components = require('./components.json')

module.exports = {
  authsome: {
    mode: path.join(__dirname, 'auth.js'),
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
    uploads: 'uploads',
  },
  validations: path.join(__dirname, 'validations'),
}
