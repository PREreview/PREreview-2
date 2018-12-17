const config = require('config')
const mailer = require('@pubsweet/component-send-email')

const User = require('pubsweet-server/src/models/User')
const Team = require('pubsweet-server/src/models/Team')

const Manuscript = require('../manuscript/src/manuscript')

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
  const dashboardUrl = `${config.get('pubsweet-server.baseUrl')}/dashboard`
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
  initialSubmission,
}

const email = async (type, context) => {
  if (!mapper[type])
    throw new Error(`${type} is not a valid email notification type`)

  await mapper[type](context)
}

module.exports = email
