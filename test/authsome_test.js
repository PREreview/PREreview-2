// const Review = require('../server/review/src/review')
const Manuscript = require('../server/manuscript/src/manuscript')
const { dbCleaner, api } = require('pubsweet-server/test')
const { User, Team } = require('pubsweet-server')

const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const authentication = require('pubsweet-server/src/authentication')
// const uuid = require('uuid')

const newStatus = {
  decision: {
    accepted: false,
    rejected: false,
    revise: false,
  },
  scienceOfficer: {
    approved: null,
    pending: false,
  },
  submission: {
    datatypeSelected: false,
    full: false,
    initial: false,
  },
}

describe('authsome mode', () => {
  let token
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('only shows an unsubmitted manuscript to an author', async () => {
    const manuscript = await new Manuscript({
      title: 'A Manuscript',
      status: newStatus,
    }).save()

    await new Team({
      name: 'Authors',
      teamType: 'author',
      members: [user.id],
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()

    // The author sees the manuscript
    const { body } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      token,
    )

    expect(body.data.manuscripts).toHaveLength(1)

    // The science officer doesn't
    const scienceOfficer = await new User(fixtures.otherUser).save()
    const soToken = authentication.token.create(scienceOfficer)
    await new Team({
      name: 'Science Officers',
      teamType: 'scienceOfficers',
      members: [scienceOfficer.id],
      global: true,
    }).save()

    const { body: soBody } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      soToken,
    )

    expect(soBody.data.manuscripts).toHaveLength(0)
  })

  it('shows the manuscript to editors after initial submission', async () => {
    const manuscript = await new Manuscript({
      title: 'A Manuscript',
      status: { ...newStatus, submission: { initial: true } },
    }).save()

    await new Team({
      name: 'Authors',
      teamType: 'author',
      members: [user.id],
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()

    // The author sees the manuscript
    const { body } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      token,
    )

    expect(body.data.manuscripts).toHaveLength(1)

    // The science officer also sees it
    const scienceOfficer = await new User(fixtures.otherUser).save()
    const soToken = authentication.token.create(scienceOfficer)
    await new Team({
      name: 'Science Officers',
      teamType: 'scienceOfficers',
      members: [scienceOfficer.id],
      global: true,
    }).save()

    const { body: soBody } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      soToken,
    )

    expect(soBody.data.manuscripts).toHaveLength(1)

    // And the editor sees it too
    const editor = await new User({
      ...fixtures.otherUser,
      username: 'editor',
      email: 'editor@example.com',
    }).save()
    const editorToken = authentication.token.create(editor)
    await new Team({
      name: 'Editors',
      teamType: 'editors',
      members: [editor.id],
      global: true,
    }).save()

    const { body: editorBody } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      editorToken,
    )

    expect(editorBody.data.manuscripts).toHaveLength(1)
  })

  it('enables the editors to change the data type of a submission, after the initial submission', async () => {
    const scienceOfficer = await new User(fixtures.otherUser).save()
    const soToken = authentication.token.create(scienceOfficer)

    await new Team({
      name: 'Science Officers',
      teamType: 'scienceOfficers',
      members: [scienceOfficer.id],
      global: true,
    }).save()

    // Before the initial submission, the only ones who can read the manuscript, the authors,
    // should not be able to change the data type
    const manuscript = await new Manuscript({
      title: 'A Manuscript',
      status: newStatus,
    }).save()

    await new Team({
      name: 'Authors',
      teamType: 'author',
      members: [user.id],
      object: { objectId: manuscript.id, objectType: 'manuscript' },
    }).save()

    const { body } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          dataType: 'authors should never be able to change the datatype',
        },
      },
      token,
    )

    expect(body.errors[0].message).toMatch('Operation not permitted')

    // But after the initial submission, the editors (editors and science officers) can change the dataType
    manuscript.status.submission.initial = true
    await manuscript.save()

    const { body: soBody } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          dataType: 'scienceofficers can change datatype',
        },
      },
      soToken,
    )

    expect(soBody.data.updateManuscript.dataType).toEqual(
      'scienceofficers can change datatype',
    )

    // And the editor can change it too
    const editor = await new User({
      ...fixtures.otherUser,
      username: 'editor',
      email: 'editor@example.com',
    }).save()
    const editorToken = authentication.token.create(editor)

    await new Team({
      name: 'Editors',
      teamType: 'editors',
      members: [editor.id],
      global: true,
    }).save()

    const { body: editorBody } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          dataType: 'editors can change datatype',
        },
      },
      editorToken,
    )

    expect(editorBody.data.updateManuscript.dataType).toEqual(
      'editors can change datatype',
    )

    // But the author still can't change it

    const { body: authorBody } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          dataType: 'authors should never be able to change the datatype',
        },
      },
      token,
    )

    expect(authorBody.errors[0].message).toMatch('Operation not permitted')
  })

  it('editors can only change the datatype of a manuscript', async () => {
    const scienceOfficer = await new User(fixtures.otherUser).save()
    const soToken = authentication.token.create(scienceOfficer)

    await new Team({
      name: 'Science Officers',
      teamType: 'scienceOfficers',
      members: [scienceOfficer.id],
      global: true,
    }).save()

    const editor = await new User({
      ...fixtures.otherUser,
      username: 'editor',
      email: 'editor@example.com',
    }).save()
    const editorToken = authentication.token.create(editor)

    await new Team({
      name: 'Editors',
      teamType: 'editors',
      members: [editor.id],
      global: true,
    }).save()

    const manuscript = await new Manuscript({
      title: 'A Manuscript',
      status: newStatus,
    }).save()

    const { body: soBody } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          title: 'Xyz',
        },
      },
      soToken,
    )

    // Before the initial submission, the manuscript is not even visible to editors
    expect(soBody.errors[0].message).toMatch('Object not found')

    // After the initial submission, the editors (editors and science officers) can't change
    // things other than dataType
    manuscript.status.submission.initial = true
    await manuscript.save()

    const { body: soBody2 } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          title: 'can not change it',
        },
      },
      soToken,
    )

    expect(soBody2.errors[0].message).toMatch('Operation not permitted')

    // And the editor can't change it either
    const { body: editorBody } = await api.graphql.query(
      `mutation($data: ManuscriptInput!) {
        updateManuscript(data: $data) { title, dataType }
      }`,
      {
        data: {
          id: manuscript.id,
          funding: 'can not change this',
        },
      },
      editorToken,
    )

    expect(editorBody.errors[0].message).toMatch('Operation not permitted')
  })
})
