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
    label: 'invited',
  },
  {
    amount: 6,
    label: 'rejected',
  },
  {
    amount: 3,
    label: 'accepted',
  },
]

const fakeReviewsData = [
  {
    content: '<p>This is almost ok</p>',
    recommendation: 'revise',
    status: 'pending',
    username: 'Yannis Barlas',
  },
  {
    content: '<p>This is great</p>',
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
