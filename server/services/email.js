const config = require('config')
const mailer = require('@pubsweet/component-send-email')

const User = require('pubsweet-server/src/models/User')
const Team = require('pubsweet-server/src/models/Team')

const { model: ExternalUser } = require('../models/externalUser')
const Manuscript = require('../manuscript/src/manuscript')
const Review = require('../review/src/review')

/* Helpers */

const baseUrl = config.get('pubsweet-server.baseUrl')
const dashboardUrl = `${baseUrl}/dashboard`
const dashboardLink = `
  <p>
    <a href="${dashboardUrl}">
      View it on your dashboard
    </a>
  </p>
`

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

const getCurrentUser = async context => {
  const { userId } = context
  return User.find(userId)
}

const getEditorIds = async () => {
  const globalTeams = await Team.findByField('global', true)
  const editorTeam = globalTeams.find(t => t.teamType === 'editors')
  return editorTeam.members
}

const getEditorEmails = async () => {
  const editorIds = await getEditorIds()

  const editors = await Promise.all(
    editorIds.map(async memberId => User.find(memberId)),
  )

  const emails = editors.map(ed => ed.email).join(',')
  return emails
}

const getExternalUserEmailById = async id => {
  const externalUser = await ExternalUser.query().findById(id)
  if (!externalUser)
    throw new Error(`Email: External User with id ${id} not found`)
  return externalUser.email
}

const getReview = async context => {
  const { reviewId } = context
  return Review.find(reviewId)
}

const getManuscript = async context => {
  const manuscriptId = context.object.id
  return Manuscript.find(manuscriptId)
}

const getUserById = async userId => User.find(userId)

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
  Sends article acceptance email to author
*/
const articleAccepted = async context => {
  const authorEmails = await getAuthorEmails(context)
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      Your article "${manuscript.title}" has been accepted by the editors!
    </p>
    <h4>
      Decision letter:
    </h4>
    <p>
      ${manuscript.decisionLetter}
    </p>
    ${dashboardLink}
  `

  const data = {
    content,
    subject: 'Article accepted',
    to: authorEmails,
  }

  sendEmail(data)
}

/* 
  Sends article rejection email to author
*/
const articleRejected = async context => {
  const authorEmails = await getAuthorEmails(context)
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      Your article "${manuscript.title}" has been rejected by the editors.
    </p>
    <h4>
      Decision letter:
    </h4>
    <p>
      ${manuscript.decisionLetter}
    </p>
    ${dashboardLink}
  `

  const data = {
    content,
    subject: 'Article rejected',
    to: authorEmails,
  }

  sendEmail(data)
}

/* 
  Sends request for article revision to author
*/
const articleRevision = async context => {
  const authorEmails = await getAuthorEmails(context)
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      The editors have requested revisions for your article 
      "${manuscript.title}".
    </p>
    <h4>
      Decision letter:
    </h4>
    <p>
      ${manuscript.decisionLetter}
    </p>
    ${dashboardLink}
  `

  const data = {
    content,
    subject: 'Article revision requested',
    to: authorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email to user when the "Send to science officer / editor" is clicked
*/

const currentlyWith = async context => {
  const manuscript = await getManuscript(context)
  const currentlyWithId = manuscript.currentlyWith
  const userToNotify = await getUserById(currentlyWithId)
  const currentUser = await getCurrentUser(context)

  const content = `
    <p>
      Your attention was requested by user ${currentUser.username} on article
      "${manuscript.title}".
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'Attention requested',
    to: userToNotify.email,
  }

  sendEmail(data)
}

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
  const editorEmails = await getEditorEmails()
  const manuscript = await getManuscript(context)
  const currentUser = await getCurrentUser(context)

  const content = `
    <p>
      User ${currentUser.username} just finished the full submission for
      article "${manuscript.title}".
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
  const editorEmails = await getEditorEmails()
  const manuscript = await getManuscript(context)
  const currentUser = await getCurrentUser(context)

  const content = `
    <p>There has been a new submission!</p>
    <p>
      User ${currentUser.username} just submitted article "${manuscript.title}".
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'New Submission',
    to: editorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email to editors when a reviewer has responded to an invitation
*/
const reviewerInvitationResponse = async context => {
  const { action } = context

  if (action !== 'accept' && action !== 'reject')
    throw new Error(`
      Reviewer Invitation Response: Invalid action ${action} provided
    `)

  const editorEmails = await getEditorEmails()
  const currentUser = await getUserById(context.userId)
  const manuscript = await getManuscript(context)

  const invitationText = action === 'accept' ? 'accepted' : 'rejected'

  const content = `
    <p>
      User ${currentUser.username} has ${invitationText} your invitation
      to review article "${manuscript.title}"
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: `Reviewer invitation ${invitationText}`,
    to: editorEmails,
  }

  sendEmail(data)
}

/* 
  Send email to reviewer when they are invited to review an article
*/
const reviewerInvited = async context => {
  const manuscript = await getManuscript(context)
  const reviewer = await getUserById(context.reviewerId)

  const content = `
    <p>
      You have been invited to review article "${manuscript.title}"!
    </p>
    ${dashboardLink}
  `

  const data = {
    content,
    subject: 'Review Invitation',
    to: reviewer.email,
  }

  sendEmail(data)
}

/* 
  Send email to editors when a review is submitted
*/
const reviewSubmitted = async context => {
  const editorEmails = await getEditorEmails()
  const review = await getReview(context)
  const manuscript = await Manuscript.find(review.articleVersionId)
  const reviewer = await getUserById(context.userId)

  const content = `
    <p>
      User ${reviewer.username} just submitted a review for article 
      "${manuscript.title}"!
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'Review submitted',
    to: editorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email to editors when the science officer changes the approval status
  of an article
*/
const scienceOfficerApprovalStatusChange = async context => {
  const editorEmails = await getEditorEmails()
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      The science officer has changed the approval status of article 
      ${manuscript.title}.
    </p>
    ${getArticleLink(manuscript.id)}
  `

  const data = {
    content,
    subject: 'Approval status change',
    to: editorEmails,
  }

  sendEmail(data)
}

/* 
  Sends email inviting reviewer that is not currently a user in the system
  to sign up in order to review a manuscript.
*/
const sendExternalReviewerInvitation = async context => {
  const { externalUserId } = context
  const externalUserEmail = await getExternalUserEmailById(externalUserId)
  const manuscript = await getManuscript(context)

  const content = `
    <p>
      You have been invited to review article "${
        manuscript.title
      }" on the Micropublication submission platform.
    </p>
    <p>
      Please <a href="${baseUrl}">sign up</a> to continue.
    </p>
  `

  const data = {
    content,
    subject: 'Invitation to review',
    to: externalUserEmail,
  }

  sendEmail(data)
}

const mapper = {
  articleAccepted,
  articleRejected,
  articleRevision,
  currentlyWith,
  dataTypeSelected,
  fullSubmission,
  initialSubmission,
  reviewerInvitationResponse,
  reviewerInvited,
  reviewSubmitted,
  scienceOfficerApprovalStatusChange,
  sendExternalReviewerInvitation,
}

const email = async (type, context) => {
  if (!mapper[type])
    throw new Error(`${type} is not a valid email notification type`)

  await mapper[type](context)
}

module.exports = email
