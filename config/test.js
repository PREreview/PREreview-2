module.exports = {
  dbManager: {
    admin: true,
    email: 'admin@admin.com',
    password: 'testpassword',
    username: 'testusername',
  },
  'pubsweet-server': {
    db: {
      database: 'test',
      password: 'pass',
      port: 5480,
      user: 'test',
    },
    host: 'http://localhost',
    pool: {
      idleTimeoutMillis: 1000,
      max: 1,
      min: 0,
    },
    port: 3000,
    secret: 'somesecret',
  },
}
