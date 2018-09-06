#! usr/bin/env node

const logger = require('@pubsweet/logger')
const { User } = require('pubsweet-server/src/models')

const users = [
  {
    email: 'george@george.com',
    password: 'password',
    username: 'george',
  },
  {
    email: 'john@john.com',
    password: 'password',
    username: 'john',
  },
  {
    email: 'jean@jean.com',
    password: 'password',
    username: 'jean',
  },
  {
    email: 'jack@jack.com',
    password: 'password',
    username: 'jack',
  },
  {
    email: 'maria@maria.com',
    password: 'password',
    username: 'maria',
  },
  {
    email: 'catherine@catherine.com',
    password: 'password',
    username: 'catherine',
  },
  {
    email: 'mark@mark.com',
    password: 'password',
    username: 'mark',
  },
  {
    email: 'stephen@stephen.com',
    password: 'password',
    username: 'stephen',
  },
  {
    email: 'darren@darren.com',
    password: 'password',
    username: 'darren',
  },
  {
    email: 'elizabeth@elizabeth.com',
    password: 'password',
    username: 'elizabeth',
  },
]

const seed = async () => {
  logger.info('Creating demo users')

  const newUsers = users.map(
    user =>
      new User({
        ...user,
      }),
  )

  Promise.all(newUsers.map(u => u.save())).then(res => {
    logger.info('All demo users successfully created')
  })
}

seed()
