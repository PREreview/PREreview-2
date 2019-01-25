const clone = require('lodash/clone')

const email = require('./email')

const validNotifications = ['email']

const mapper = {
  articleAccepted: ['email'],
  articleRejected: ['email'],
  articleRevision: ['email'],
  currentlyWith: ['email'],
  dataTypeSelected: ['email'],
  fullSubmission: ['email'],
  initialSubmission: ['email'],
  reviewerInvitationResponse: ['email'],
  reviewerInvited: ['email'],
  reviewSubmitted: ['email'],
  scienceOfficerApprovalStatusChange: ['email'],
  sendExternalReviewerInvitation: ['email'],
}

const runType = (type, context) => {
  if (!mapper[type] || !Array.isArray(mapper[type]))
    throw new Error('Notification type not recognized')

  mapper[type].forEach(notification => {
    if (!validNotifications.includes(notification))
      throw new Error(`${notification} is not a valid notification`)

    if (notification === 'email') email(type, context)
  })
}

const notify = (notifyTypes, context) => {
  let types = clone(notifyTypes)

  if (!Array.isArray(notifyTypes)) {
    if (typeof notifyTypes === 'string') {
      types = [notifyTypes]
    } else {
      throw new Error('Invalid types format provided to notify')
    }
  }

  types.forEach(type => runType(type, context))
}

module.exports = notify
