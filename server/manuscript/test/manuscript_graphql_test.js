const path = require('path')

const pathToComponent = path.resolve(__dirname, '..', 'src')
process.env.NODE_CONFIG = `{"pubsweet":{"components":["${pathToComponent}"]}}`

const { model: Manuscript } = require('../src')
const { dbCleaner, api } = require('pubsweet-server/test')
const { User } = require('pubsweet-server')

const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const authentication = require('pubsweet-server/src/authentication')

describe('Manuscript queries', () => {
  let token
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('can find manuscripts', async () => {
    await new Manuscript({ title: '1' }).save()
    await new Manuscript({ title: '2' }).save()

    const { body } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      token,
    )

    expect(body.data.manuscripts).toHaveLength(2)
    expect(body.data.manuscripts[0].title).toEqual('1')
  })

  it('can find manuscript by id', async () => {
    const manuscript = await new Manuscript({ title: '1' }).save()

    const { body } = await api.graphql.query(
      `query($id: ID!) {
        manuscript(id: $id) {
          title
        }
      }`,
      { id: manuscript.id },
      token,
    )
    expect(body.data.manuscript.title).toEqual('1')
  })

  it('can create a submission', async () => {
    const { body } = await api.graphql.query(
      `mutation {
        createSubmission {
          status {
            decision {
              accepted
            }
          }
        }
      }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: {
        createSubmission: {
          status: {
            decision: {
              accepted: false,
            },
          },
        },
      },
    })
  })

  // it('can update a manuscript', async () => {
  //   const manuscript = await new Manuscript({ title: 'Before' }).save()
  //   const { body } = await api.graphql.query(
  //     `mutation($id: ID, $input: ManuscriptInput) {
  //       updateManuscript(id: $id, input: $input) { title }
  //     }`,
  //     {
  //       id: manuscript.id,
  //       input: {
  //         title: 'After',
  //       },
  //     },
  //     token,
  //   )

  //   expect(body).toEqual({
  //     data: {
  //       updateManuscript: { title: 'After' },
  //     },
  //   })
  // })

  // it('can delete a manuscript', async () => {
  //   const manuscript = await new Manuscript({ title: 'To delete' }).save()
  //   const { body } = await api.graphql.query(
  //     `mutation($id: ID) {
  //       deleteManuscript(id: $id) { title }
  //     }`,
  //     { id: manuscript.id },
  //     token,
  //   )

  //   expect(body).toEqual({
  //     data: { deleteManuscript: { title: 'To delete' } },
  //   })
  // })
})
