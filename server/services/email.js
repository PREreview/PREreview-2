const config = require('config')
const mailer = require('@pubsweet/component-send-email')

const User = require('pubsweet-server/src/models/User')
const Team = require('pubsweet-server/src/models/Team')

const Manuscript = require('../manuscript/src/manuscript')

/* Helpers */

const dashboardUrl = `${config.get('pubsweet-server.baseUrl')}/dashboard`

const getAuthorIds = async context => {
  const manuscriptId = context.object.id

  const teams = await Team.all()
  const authorTeam = teams.find(
    t =>
      !t.global &&
      t.object.objectId === manuscriptId &&
      t.teamType === 'author',
  )

  return authorTeam.members
}

const getAuthorEmails = async context => {
  const authorIds = await getAuthorIds(context)

  const authors = await Promise.all(
    authorIds.map(async authorId => User.find(authorId)),
  )

  const emails = authors.map(a => a.email).join(',')
  return emails
}

const getManuscript = async context => {
  const manuscriptId = context.object.id
  return Manuscript.find(manuscriptId)
}

const toRegularText = text =>
  text
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, str => str.toUpperCase())

/* End Helpers */

const dataTypeSelected = async context => {
  const manuscript = await getManuscript(context)
  const authorEmails = await getAuthorEmails(context)

  const content = `
    <p>
      The Micropublication editors assigned your article "${manuscript.title}"
      the "${toRegularText(manuscript.dataType)}" data type.
    </p>
    <p>You can now complete your full submission!</p>
    <p>See the article on your <a href="${dashboardUrl}">Dashboard</a>.</p>
  `

  const data = {
    from: config.get('mailer.from'),
    html: `<p>${content}</p>`,
    subject: 'Micropulication | Data type selected for submission',
    text: content,
    to: authorEmails,
  }

  mailer.send(data)
}

/* 
  Sends email to editors that a new article has been submitted
*/
const initialSubmission = async context => {
  /* Get user */
  const { userId } = context
  const user = await User.find(userId)

  /* Get manuscript */
  const manuscriptId = context.object.id
  const manuscript = await Manuscript.find(manuscriptId)

  /* Get editor emails */
  const globalTeams = await Team.findByField('global', true)
  const editorTeam = globalTeams.find(t => t.teamType === 'editors')

  let editors
  await Promise.all(
    editorTeam.members.map(async memberId => User.find(memberId)),
  ).then(res => (editors = res))

  const editorEmails = editors.map(ed => ed.email).join(',')

  /* Create email */
  const content = `
    <p>There has been a new submission!</p>
    <p>User ${user.username} just submitted article "${manuscript.title}".</p>
    <p>See it on your <a href="${dashboardUrl}">Dashboard</a>.</p>
  `

  const data = {
    from: config.get('mailer.from'),
    html: `<p>${content}</p>`,
    subject: 'Micropulication | New Submission',
    text: content,
    to: editorEmails,
  }

  mailer.send(data)
}

const mapper = {
  dataTypeSelected,
  initialSubmission,
}

const email = async (type, context) => {
  if (!mapper[type])
    throw new Error(`${type} is not a valid email notification type`)

  await mapper[type](context)
}

module.exports = email
