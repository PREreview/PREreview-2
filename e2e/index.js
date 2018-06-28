/* eslint-disable import/no-extraneous-dependencies */

// import ReactSelector from 'testcafe-react-selectors'
import { ClientFunction, Selector } from 'testcafe'

import { addUser, createTables } from '@pubsweet/db-manager'
import start from 'pubsweet/src/startup/start'

let server

const startServer = async () => {
  if (!server) {
    server = await start()
  }
}

const setup = async () => {
  await createTables(true)

  const user = {
    email: 'testUser@email.com',
    password: 'testPassword',
    username: 'testUser',
  }
  await addUser(user)
}

const getLocation = ClientFunction(() => document.location.href)

const loginPage = {
  url: 'http://localhost:3000/login',
}

fixture`Login Page`.page`${loginPage.url}`.before(startServer).beforeEach(setup)

test('Succeful login redirects user to dashboard', async t => {
  await t
    .typeText(Selector('form input[type="text"]'), 'testUser')
    .typeText(Selector('form input[type="password"]'), 'testPassword')
    .click(Selector('form button'))
    .expect(getLocation())
    .contains('/dashboard')
})
