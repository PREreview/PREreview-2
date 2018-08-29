/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Accordion, Action } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { ReviewersNumbers, ReviewsPreview } from './index'

const StyledAction = styled(Action)`
  line-height: unset;
  margin-bottom: ${th('gridUnit')};
`

const fakeReviewersNumbers = [
  {
    amount: 10,
    id: 'fkjfsjldkjflks',
    label: 'invited',
  },
  {
    amount: 6,
    id: 'lkflsajsalkfj',
    label: 'rejected',
  },
  {
    amount: 3,
    id: 'lklk;afk;dsk',
    label: 'accepted',
  },
]

const fakeReviewsData = [
  {
    content: '<p>This is almost ok</p>',
    id: 'llalfjdljaslfjlsd',
    recommendation: 'revise',
    status: 'pending',
    username: 'Yannis Barlas',
  },
  {
    content: '<p>This is great</p>',
    id: 'bfjksasdhak',
    recommendation: 'accept',
    status: 'submitted',
    username: 'Alexis Georgantas',
  },
]

// eslint-disable-next-line arrow-body-style
const ReviewerInfo = props => {
  // const { data } = props
  // if (!data || !data.length > 0) return null

  return (
    <Accordion label="Reviews" startExpanded>
      <div>
        <StyledAction to="">Reviewers Control Panel</StyledAction>
      </div>
      <ReviewersNumbers data={fakeReviewersNumbers} />
      <ReviewsPreview data={fakeReviewsData} />
    </Accordion>
  )
}

export default ReviewerInfo
