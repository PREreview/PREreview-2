// const path = require('path')
// const uuid = require('uuid')
const email = require('../services/email')

// const pathToComponent = path.resolve(__dirname, '..', 'src')
// process.env.NODE_CONFIG = `{"pubsweet":{"components":["${pathToComponent}"]}}`

// These tests are not testing authorization, authsome
// returns true for everything
// jest.mock('../../../config/authsome.js', () => () => true)

// const { model: Manuscript } = require('../src')
const { dbCleaner /* api */ } = require('pubsweet-server/test')
const { User, Team } = require('pubsweet-server')

const fixtures = require('pubsweet-server/test/fixtures/fixtures')
// const authentication = require('pubsweet-server/src/authentication')

describe('Email', () => {
  // let token
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()

    const editor = await new User({
      email: 'editor@editor.com',
      password: 'password',
      username: 'editor',
    }).save()
    // console.log('fljdslfjklsdjs', editor.id)

    await new Team({
      global: true,
      members: [editor.id],
      name: 'Editors Global',
      teamType: 'editors',
    }).save()
  })

  it('passes', async () => {
    await email('initialSubmission', { userId: user.id })
    expect(true).toBe(true)
  })
})
