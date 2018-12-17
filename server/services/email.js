const config = require('config')
const mailer = require('@pubsweet/component-send-email')

const User = require('pubsweet-server/src/models/User')
const Team = require('pubsweet-server/src/models/Team')

const Manuscript = require('../manuscript/src/manuscript')

/* Helpers */

const baseUrl = config.get('pubsweet-server.baseUrl')
// const dashboardUrl = `${baseUrl}/dashboard`

const getArticleUrl = articleId => `${baseUrl}/article/${articleId}`

const getArticleLink = articleId => `
  <p>
    <a href="${getArticleUrl(articleId)}">
      View it on the Micropublication platform.
    </a>
  </p>
`

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

const getEditorIds = async context => {
  const globalTeams = await Team.findByField('global', true)
  const editorTeam = globalTeams.find(t => t.teamType === 'editors')
  return editorTeam.members
}

const getEditorEmails = async context => {
  const editorIds = await getEditorIds(context)

  const editors = await Promise.all(
    editorIds.map(async memberId => User.find(memberId)),
  )

  const emails = editors.map(ed => ed.email).join(',')
  return emails
}

const getManuscript = async context => {
  const manuscriptId = context.object.id
  return Manuscript.find(manuscriptId)
}

const getUser = async context => {
  const { userId } = context
  return User.find(userId)
}

const sendEmail = data => {
  const { content, subject, to } = data

  const emailData = {
    from: config.get('mailer.from'),
    html: `<p>${content}</p>`,
    subject: `Micropublication | ${subject}`,
    text: content,
    to,
  }

  mailer.send(emailData)
}

const toRegularText = text =>
  text
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, str => str.toUpperCase())

/* End Helpers */

/* 
  Sends email to authors that a data type has been selected on their article
*/
const dataTypeSelected = async context => {
  const authorEmails = await getAuthorEmails(context)
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      The Micropublication editors assigned your article "${manuscript.title}"
      the "${toRegularText(manuscript.dataType)}" data type.
    </p>
    <p>You can now complete your full submission!</p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'Data type selected for submission',
    to: authorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email to editors that an article is now fully submitted
*/

const fullSubmission = async context => {
  const editorEmails = await getEditorEmails(context)
  const manuscript = await getManuscript(context)
  const user = await getUser(context)

  const content = `
    <p>
      User ${user.username} just finished the full submission for article 
      "${manuscript.title}".
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'Full Submission',
    to: editorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email to editors that a new article has been submitted
*/
const initialSubmission = async context => {
  const editorEmails = await getEditorEmails(context)
  const manuscript = await getManuscript(context)
  const user = await getUser(context)

  const content = `
    <p>There has been a new submission!</p>
    <p>User ${user.username} just submitted article "${manuscript.title}".</p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'New Submission',
    to: editorEmails,
  }

  sendEmail(data)
}

const mapper = {
  dataTypeSelected,
  fullSubmission,
  initialSubmission,
}

const email = async (type, context) => {
  if (!mapper[type])
    throw new Error(`${type} is not a valid email notification type`)

  await mapper[type](context)
}

module.exports = email
