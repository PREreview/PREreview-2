module.exports = {
  dbManager: {
    admin: true,
    email: 'admin@admin.com',
    password: 'testpassword',
    username: 'testusername',
  },
  'pubsweet-server': {
    db: {
      database: 'wbtest',
    },
    pool: { min: 0, max: 1, idleTimeoutMillis: 1000 },
    host: 'http://localhost',
    port: 3000,
    secret: 'somesecret',
  },
}
