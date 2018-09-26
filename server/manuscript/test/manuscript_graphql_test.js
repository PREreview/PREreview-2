const path = require('path')
const uuid = require('uuid')

const pathToComponent = path.resolve(__dirname, '..', 'src')
process.env.NODE_CONFIG = `{"pubsweet":{"components":["${pathToComponent}"]}}`

const { model: Manuscript } = require('../src')
const { dbCleaner, api } = require('pubsweet-server/test')
const { User, Team } = require('pubsweet-server')

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

  it('can update a manuscript', async () => {
    const manuscript = await new Manuscript({ title: 'Before' }).save()

    const { body } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title }
      }`,
      {
        data: {
          acknowledgements: 'Hello',
          authors: [
            {
              credit: ['Hi'],
              email: user.email,
              id: user.id,
              name: user.username,
              submittingAuthor: true,
              WBId: 'SomeID',
            },
          ],
          comments: 'Some comments',
          communicationHistory: [
            { content: 'Comms', timestamp: Date.now(), user: user.id },
          ],
          dataType: 'Some type',
          decisionLetter: 'A decision',
          disclaimer: true,
          funding: 'Funds from somewhere',
          geneExpression: {
            antibodyUsed: 'String',
            backboneVector: { name: 'Name', type: 'Type', WBId: 'WBid' },
            coinjected: 'String',
            constructComments: 'String',
            constructionDetails: 'String',
            detectionMethod: 'String',
            dnaSequence: [{ name: 'Name', type: 'Type', WBId: 'WBid' }],
            expressionPattern: { name: 'Name', type: 'Type', WBId: 'WBid' },
            fusionType: { name: 'Name', type: 'Type', WBId: 'WBid' },
            genotype: 'String',
            injectionConcentration: 'String',
            inSituDetails: 'String',
            integratedBy: { name: 'Name', type: 'Type', WBId: 'WBid' },
            observeExpression: {
              certainly: [
                {
                  certainly: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  during: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  id: uuid.v4(),
                  subcellularLocalization: {
                    name: 'Name',
                    type: 'Type',
                    WBId: 'WBid',
                  },
                },
              ],
              not: [
                {
                  during: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  id: uuid.v4(),
                  not: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  subcellularLocalization: {
                    name: 'Name',
                    type: 'Type',
                    WBId: 'WBid',
                  },
                },
              ],
              partially: [
                {
                  during: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  id: uuid.v4(),
                  partially: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  subcellularLocalization: {
                    name: 'Name',
                    type: 'Type',
                    WBId: 'WBid',
                  },
                },
              ],
              possibly: [
                {
                  during: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  id: uuid.v4(),
                  possibly: { name: 'Name', type: 'Type', WBId: 'WBid' },
                  subcellularLocalization: {
                    name: 'Name',
                    type: 'Type',
                    WBId: 'WBid',
                  },
                },
              ],
            },
            reporter: { name: 'Name', type: 'Type', WBId: 'WBid' },
            species: { name: 'Name', type: 'Type', WBId: 'WBid' },
            strain: 'String',
            transgeneName: 'String',
            transgeneUsed: [{ name: 'Name', type: 'Type', WBId: 'WBid' }],
            utr: { name: 'Name', type: 'Type', WBId: 'WBid' },
            variation: { name: 'Name', type: 'Type', WBId: 'WBid' },
          },
          id: manuscript.id,
          image: {
            name: 'String',
            size: 'String',
            type: 'String',
            url: 'String',
          },
          laboratory: { name: 'Name', type: 'Type', WBId: 'WBid' },
          patternDescription: 'String',
          status: {
            decision: {
              accepted: true,
              rejected: false,
              revise: false,
            },
            scienceOfficer: {
              approved: true,
              pending: false,
            },
            submission: {
              datatypeSelected: false,
              full: false,
              initial: true,
            },
          },
          suggestedReviewer: {
            name: 'A name',
            WBId: 'Some id',
          },
          title: 'After',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        updateManuscript: { title: 'After' },
      },
    })
  })

  it('can delete a manuscript', async () => {
    const manuscript = await new Manuscript({ title: 'To delete' }).save()
    const { body } = await api.graphql.query(
      `mutation($id: ID!) {
        deleteManuscript(id: $id)
      }`,
      { id: manuscript.id },
      token,
    )

    expect(body).toEqual({
      data: { deleteManuscript: manuscript.id },
    })
  })

  it('can handle invitation', async () => {
    const manuscript = await new Manuscript({ title: 'Before' }).save()

    // First try the accept path
    const teamAccepted = await new Team({
      name: 'Reviewers who accepted',
      teamType: 'reviewersAccepted',
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()
    const { body } = await api.graphql.query(
      `mutation($action: String!, $articleId: ID!, $currentUserId: ID!) {
        handleInvitation(action: $action, articleId: $articleId, currentUserId: $currentUserId)
      }`,
      {
        action: 'accept',
        articleId: manuscript.id,
        currentUserId: user.id,
      },
      token,
    )

    expect(body).toEqual({
      data: {
        handleInvitation: teamAccepted.id,
      },
    })

    expect((await Team.find(teamAccepted.id)).members).toEqual([user.id])

    // Then the reject path
    const teamRejected = await new Team({
      name: 'Reviewers who rejected',
      teamType: 'reviewersRejected',
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()

    const anotherUser = await new User({
      username: 'other',
      email: 'user@example.com',
      password: 'example',
    }).save()

    const { body: body2 } = await api.graphql.query(
      `mutation($action: String!, $articleId: ID!, $currentUserId: ID!) {
        handleInvitation(action: $action, articleId: $articleId, currentUserId: $currentUserId)
      }`,
      {
        action: 'reject',
        articleId: manuscript.id,
        currentUserId: anotherUser.id,
      },
      token,
    )

    expect(body2).toEqual({
      data: {
        handleInvitation: teamRejected.id,
      },
    })

    expect((await Team.find(teamRejected.id)).members).toEqual([anotherUser.id])
  })

  it('can find global teams', async () => {
    const globalTeam = await new Team({
      name: 'Science Officers',
      teamType: 'scienceOfficers',
      global: true,
    }).save()

    const { body } = await api.graphql.query(
      `query {
        globalTeams {
          id
        }
      }`,
      {},
      token,
    )
    expect(body.data.globalTeams).toHaveLength(1)
    expect(body.data.globalTeams[0].id).toEqual(globalTeam.id)
  })

  it('can find teams for a manuscript', async () => {
    const manuscript = await new Manuscript({ title: '1' }).save()
    const team = await new Team({
      name: 'Team for manuscript',
      teamType: 'someType',
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()

    const { body } = await api.graphql.query(
      `query($id: ID!) {
        teamsForArticle(id: $id) {
          name
        }
      }`,
      { id: manuscript.id },
      token,
    )

    expect(body.data.teamsForArticle).toHaveLength(1)
    expect(body.data.teamsForArticle[0].name).toEqual(team.name)
  })

  describe('Dashboard', () => {
    it("can get the author's manuscript", async () => {
      const authorManuscript = await new Manuscript({ title: '1' }).save()
      await new Manuscript({ title: '2' }).save()

      await new Team({
        name: 'Author team for manuscript',
        teamType: 'author',
        members: [user.id],
        object: { objectId: authorManuscript.id, objectType: 'manuscript' },
      }).save()

      const { body } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            author {
              title
            }
          }
        }`,
        { currentUserId: user.id },
        token,
      )
      expect(body.data.dashboardArticles.author).toHaveLength(1)
      expect(body.data.dashboardArticles.author[0].title).toEqual(
        authorManuscript.title,
      )
    })

    it("can get editor's manuscripts", async () => {
      const manuscript = await new Manuscript({
        title: '1',
        status: { submission: { initial: true } },
      }).save()
      const manuscript2 = await new Manuscript({
        title: '2',
        status: { submission: { initial: true } },
      }).save()

      // Global editors team
      await new Team({
        name: 'Editors',
        teamType: 'editors',
        members: [user.id],
        global: true,
      }).save()

      // An editor team with assigned editors
      await new Team({
        name: 'Editors',
        teamType: 'editor',
        members: [user.id],
        object: { objectId: manuscript.id, objectType: 'manuscript' },
      }).save()

      // An empty editor team
      await new Team({
        name: 'Editors',
        teamType: 'editor',
        members: [],
        object: { objectId: manuscript2.id, objectType: 'manuscript' },
      }).save()

      const { body } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            editor {
              title
            }
            isGlobal
          }
        }`,
        { currentUserId: user.id },
        token,
      )
      expect(body.data.dashboardArticles.editor).toHaveLength(2)
      expect(body.data.dashboardArticles.isGlobal).toEqual(true)
    })
  })
})
