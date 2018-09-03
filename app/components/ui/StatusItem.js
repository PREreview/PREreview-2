/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import { getCurrentStatus } from '../../helpers/status'

const StatusLabel = styled.span`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  color: ${props => {
    if (props.decision && props.decision.accepted) {
      return th('colorSuccess')
    } else if (props.decision && props.decision.rejected) {
      return th('colorError')
    }
    return th('colorFurniture')
  }};
  text-transform: uppercase;
  margin: 0 calc(${th('gridUnit')}) 0 0;
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
