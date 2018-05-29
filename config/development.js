module.exports = {
  dbManager: {
    admin: true,
    email: 'admin@admin.com',
    password: 'adminadmin',
    username: 'admin',
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
