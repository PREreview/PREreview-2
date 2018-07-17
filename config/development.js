const { deferConfig } = require('config/defer')

module.exports = {
  dbManager: {
    admin: true,
    email: 'admin@admin.com',
    password: 'adminadmin',
    username: 'admin',
  },
  'pubsweet-client': {
    baseUrl: deferConfig(
      cfg => `http://localhost:${cfg['pubsweet-server'].port}`,
    ),
  },
  'pubsweet-server': {
    db: {
      database: 'wb',
      password: 'pass',
      port: 5480,
      user: 'dev',
    },
    host: 'http://localhost',
    port: 3000,
    secret: 'somesecret',
  },
}
