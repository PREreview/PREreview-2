module.exports = {
  dbManager: {
    admin: true,
    email: 'admin@admin.com',
    password: 'testpassword',
    username: 'testusername',
  },
  'pubsweet-server': {
    db: {
      database: 'wb-test',
      password: 'wb-testpass',
      port: 5480,
      user: 'wb-testuser',
    },
    host: 'http://localhost',
    port: 3000,
    secret: 'somesecret',
  },
}
