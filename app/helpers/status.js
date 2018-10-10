import { clone, get, isUndefined, keys, pickBy, set } from 'lodash'

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

const cleanSubmission = {
  datatypeSelected: false,
  full: false,
  initial: false,
}

const createNewStatus = () => ({
  decision: clone(cleanDecision),
  scienceOfficer: clone(cleanScienceOfficer),
  submission: clone(cleanSubmission),
})

/*
  STATUS INFO
*/

const getCurrentStatus = status => {
  if (!status) throw new Error('No status object was provided')

  if (isAccepted(status)) return 'Accepted'
  if (isRejected(status)) return 'Rejected'
  if (isRevise(status)) return 'Under revision'

  if (isReviewerSubmitted(status)) return 'Review submitted'
  if (isReviewerAccepted(status)) return 'Reviewer accepted'
  if (isReviewerInvited(status)) return 'Reviewer invited'

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

/* Decision */
const isAccepted = status => {
  if (get(status, 'decision.accepted')) return true
  return false
}

const isRejected = status => {
  if (get(status, 'decision.rejected')) return true
  return false
}

const isRevise = status => {
  if (get(status, 'decision.revise')) return true
  return false
}

/* Reviewers */
const isReviewerInvited = status => {
  if (get(status, 'reviewers.invited')) return true
  return false
}

const isReviewerAccepted = status => {
  if (get(status, 'reviewers.accepted')) return true
  return false
}

const isReviewerSubmitted = status => {
  if (get(status, 'reviewers.submitted')) return true
  return false
}

/* Science Officer */
const isApprovedByScienceOfficer = status => {
  if (get(status, 'scienceOfficer.approved')) return true
  return false
}

const isNotApprovedByScienceOfficer = status => {
  if (get(status, 'scienceOfficer.approved') === false) return true
  return false
}

/* Submission */
const isFullSubmissionReady = status => {
  if (get(status, 'submission.full')) return true
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

const isEditableByAuthor = status =>
  isInitialSubmissionReady(status) === false ||
  (isDatatypeSelected(status) && isFullSubmissionReady(status) === false)

/*
  DECISION
*/

const setAccepted = status => {
  const newStatus = clone(status)
  newStatus.decision = clone(cleanDecision)
  set(newStatus, 'decision.accepted', true)
  return newStatus
}

const setRejected = status => {
  const newStatus = clone(status)
  newStatus.decision = clone(cleanDecision)
  set(newStatus, 'decision.rejected', true)
  return newStatus
}

const setRevise = status => {
  const newStatus = clone(status)
  newStatus.decision = clone(cleanDecision)
  set(newStatus, 'decision.revise', true)
  return newStatus
}

const hasDecision = status =>
  get(status, 'decision.accepted') === true ||
  get(status, 'decision.rejected') === true ||
  get(status, 'decision.revise') === true

const getDecision = status => {
  if (!status) throw new Error('No status provided!')
  const truthy = keys(pickBy(status.decision, value => value === true))

  if (truthy.length > 1)
    throw new Error(
      'There should only be one valid status in a decision object!',
    )
  if (truthy.length === 0) return null

  return truthy[0]
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

/*
  SUBMISSION
*/

const setInitialSubmissionReady = status => {
  set(status, 'submission.initial', true)
  return status
}

const setDatatypeSelected = status => {
  set(status, 'submission.datatypeSelected', true)
  return status
}

const setFullSubmissionReady = status => {
  set(status, 'submission.full', true)
  return status
}

// Sets submission status to its next logical state
// initial -> datatype selected -> full
const updateSubmissionStatus = status => {
  if (!status)
    throw new Error('Cannot update submission status without a status object')

  const newStatus = clone(status)
  if (!newStatus.submission) newStatus.submission = clone(cleanSubmission)

  const initial = isInitialSubmissionReady(newStatus)
  const datatype = isDatatypeSelected(newStatus)
  const full = isFullSubmissionReady(newStatus)

  if (!initial) return setInitialSubmissionReady(newStatus)
  if (initial && !datatype) return setDatatypeSelected(newStatus)
  if (datatype && !full) return setFullSubmissionReady(newStatus)

  throw new Error(
    'Cannot update submission status, as it has been fully submitted already',
  )
}

/*
  EXPORT
*/

export {
  createNewStatus,
  getCurrentStatus,
  getDecision,
  getStatus,
  hasDecision,
  isAccepted,
  isApprovedByScienceOfficer,
  isDatatypeSelected,
  isEditableByAuthor,
  isFullSubmissionReady,
  isInitialSubmissionReady,
  isNotApprovedByScienceOfficer,
  isRejected,
  isReviewerAccepted,
  isReviewerInvited,
  isReviewerSubmitted,
  isRevise,
  setApproved,
  setAccepted,
  setDatatypeSelected,
  setFullSubmissionReady,
  setInitialSubmissionReady,
  setRejected,
  setRevise,
  updateSubmissionStatus,
}
