const { deferConfig } = require('config/defer')

const components = require('./components.json')

module.exports = {
  authsome: {
    mode: __dirname + '/auth.js',
  },
  mailer: {
    from: 'nobody@example.com',
    transport: {
      sendmail: true,
    },
  },
  pubsweet: { components },
  'pubsweet-server': {
    baseUrl: deferConfig(
      cfg => `${cfg['pubsweet-server'].host}:${cfg['pubsweet-server'].port}`,
    ),
    uploads: 'uploads',
  },
}
