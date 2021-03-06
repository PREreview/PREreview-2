/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const ReviewersNumbersItemWrapper = styled.div`
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  padding-left: ${th('gridUnit')};

  span:first-child {
    flex-basis: 5%;
    font-family: ${th('fontReading')};
  }
`

const Header = styled.div`
  font-weight: bold;
`

const ReviewersNumbersItem = props => {
  const { amount, label } = props
  if (!amount && !label) return null

  return (
    <ReviewersNumbersItemWrapper>
      <span>{amount}</span>
      <span>
        reviewer
        {amount === 1 ? '' : 's'} {label}
      </span>
    </ReviewersNumbersItemWrapper>
  )
}

const ReviewersNumbers = props => {
  const { data } = props

  const items = [
    {
      amount: data.invited,
      id: 'invited',
      label: 'invited',
    },
    {
      amount: data.accepted,
      id: 'accepted',
      label: 'accepted',
    },
    {
      amount: data.rejected,
      id: 'rejected',
      label: 'rejected',
    },
  ]

  return (
    <div>
      <Header>Reviewer stats</Header>
      <List component={ReviewersNumbersItem} items={items} />
    </div>
  )
}

export default ReviewersNumbers
