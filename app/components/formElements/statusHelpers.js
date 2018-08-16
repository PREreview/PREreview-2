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
  if (!newStatus.decision) newStatus.decision = genericDecision

  if (get(newStatus, 'decision.accepted'))
    set(newStatus, 'decision.accepted', false)
  if (get(newStatus, 'decision.revise'))
    set(newStatus, 'decision.revise', false)

  set(newStatus, 'decision.rejected', true)

  return newStatus
}

export { isRejected, setRejected }
