import { clone, get, isUndefined, set } from 'lodash'

/*
  CLEAN STATES
*/

const cleanDecision = {
  accepted: false,
  rejected: false,
  revise: false,
}

const cleanScienceOfficer = {
  approved: null,
  pending: false,
}

/*
  STATUS INFO
*/

const getCurrentStatus = status => {
  if (!status) throw new Error('No status object was provided')

  if (isAccepted(status)) return 'Accepted'
  if (isRejected(status)) return 'Rejected'

  if (isApprovedByScienceOfficer(status)) return 'Approved by Science Officer'
  if (isNotApprovedByScienceOfficer(status))
    return 'Not approved by Science Officer'

  if (isFullSubmissionReady(status)) return 'Submitted'
  if (isDatatypeSelected(status)) return 'Datatype Selected'
  if (isInitialSubmissionReady(status)) return 'Initial submission ready'

  return 'Not submitted'
}

const getStatus = article => {
  if (!article) throw new Error('No article object was provided')
  const { status } = article

  return {
    currentStatus: getCurrentStatus(status),
    fullStatus: status,
  }
}

const isAccepted = status => {
  if (get(status, 'decision.accepted')) return true
  return false
}

const isApprovedByScienceOfficer = status => {
  if (get(status, 'scienceOfficer.approved')) return true
  return false
}

const isFullSubmissionReady = status => {
  if (get(status, 'decision.full')) return true
  return false
}

const isInitialSubmissionReady = status => {
  if (get(status, 'submission.initial')) return true
  return false
}

const isDatatypeSelected = status => {
  if (get(status, 'submission.datatypeSelected')) return true
  return false
}

const isNotApprovedByScienceOfficer = status => {
  if (get(status, 'scienceOfficer.approved') === false) return true
  return false
}

const isRejected = status => {
  if (get(status, 'decision.rejected')) return true
  return false
}

/*
  DECISION
*/

const setRejected = status => {
  const newStatus = clone(status)
  newStatus.decision = cleanDecision
  set(newStatus, 'decision.rejected', true)
  return newStatus
}

/*
  SCIENCE OFFICER APPROVAL
*/

const setApproved = (status, approved) => {
  if (isUndefined(approved)) throw new Error('Approval needs a Boolean value')

  const newStatus = clone(status)
  newStatus.scienceOfficer = cleanScienceOfficer
  set(newStatus, 'scienceOfficer.approved', approved)
  return newStatus
}

export {
  getCurrentStatus,
  getStatus,
  isAccepted,
  isApprovedByScienceOfficer,
  isDatatypeSelected,
  isFullSubmissionReady,
  isInitialSubmissionReady,
  isNotApprovedByScienceOfficer,
  isRejected,
  setApproved,
  setRejected,
}
