import { clone, get, set } from 'lodash'

const genericDecision = {
  accepted: false,
  rejected: false,
  revise: false,
}

const isRejected = status => {
  if (get(status, 'decision.rejected')) return true
  return false
}

const setRejected = status => {
  const newStatus = clone(status)
  newStatus.decision = genericDecision
  set(newStatus, 'decision.rejected', true)
  return newStatus
}

export { isRejected, setRejected }
