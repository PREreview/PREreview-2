/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import { Ribbon } from './index'

const options = {
  rejected: {
    message: 'This article has been rejected',
    status: 'error',
  },
  rejectionWarning: {
    message: 'You are about to reject this article',
    status: 'error',
  },
  scienceOfficerApproved: {
    message: 'Approved by Science Officer',
    status: 'success',
  },
  scienceOfficerDeclined: {
    message: 'Not approved by Science Officer',
    status: 'error',
  },
  scienceOfficerPending: {
    message: 'Pending decision by Science Officer',
  },
}

const EditorPanelRibbon = props => {
  const { type } = props

  const message = get(options[type], 'message')
  const status = get(options[type], 'status')

  return <Ribbon message={message} status={status} />
}

export default EditorPanelRibbon
