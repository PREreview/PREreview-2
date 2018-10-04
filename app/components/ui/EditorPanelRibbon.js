/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'

import Ribbon from './Ribbon'

const StyledRibbon = styled(Ribbon)`
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const options = {
  accepted: {
    message: 'This article has been accepted',
    status: 'success',
  },
  rejected: {
    message: 'This article has been rejected',
    status: 'error',
  },
  rejectionWarning: {
    message: 'You are about to reject this article',
    status: 'error',
  },
  revise: {
    message: 'This article is marked for revision',
    status: 'warning',
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
    message: 'Pending approval by Science Officer',
  },
}

const EditorPanelRibbon = props => {
  const { type } = props

  const message = get(options[type], 'message')
  const status = get(options[type], 'status')

  return <StyledRibbon message={message} status={status} />
}

export default EditorPanelRibbon
