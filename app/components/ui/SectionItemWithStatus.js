/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'

import { SectionItem, StatusItem } from './index'

const StatusRow = styled.div`
  display: flex;
  margin-bottom: calc(${th('gridUnit')});
`

const SectionItemWithStatus = props => {
  const { actionsComponent, status, title } = props

  // const event = { date: new Date() }
  const event = null
  const statusItems = [status, event]

  return (
    <React.Fragment>
      <StatusRow>
        {statusItems.map(i => {
          if (!i) return null
          if (!i.date) return <StatusItem key={uniqueId()} status={i} />
          return <StatusItem key={uniqueId()} label={i.date.toString()} />
        })}
      </StatusRow>

      <SectionItem rightComponent={actionsComponent} title={title} />
    </React.Fragment>
  )
}

export default SectionItemWithStatus
