/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import { getCurrentStatus } from '../../helpers/status'

const StatusLabel = styled.span`
  color: ${props => {
    if (props.decision) {
      const { accepted, rejected, revise } = props.decision
      if (accepted) return th('colorSuccess')
      if (rejected) return th('colorError')
      if (revise) return th('colorWarning')
    }

    return th('colorFurniture')
  }};

  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 0 calc(${th('gridUnit')}) 0 0;
  text-transform: uppercase;
`

const StatusItem = props => {
  const { status, label } = props

  if (status) {
    const statusLabel = getCurrentStatus(status)
    return <StatusLabel decision={status.decision}>{statusLabel}</StatusLabel>
  }
  return <StatusLabel>{label}</StatusLabel>
}

export default StatusItem
