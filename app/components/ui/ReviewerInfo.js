/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Action } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { Accordion, ReviewersNumbers, ReviewsPreview } from './index'

const StyledAction = styled(Action)`
  line-height: unset;
`

const ContentWrapper = styled.div`
  margin-left: calc(${th('gridUnit')} * 3);

  > div:first-child {
    margin-top: calc(${th('gridUnit')} * 2);
  }

  > div:not(:last-child) {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }
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
    content:
      '<p>Donec at sodales nibh. Nam augue libero, vestibulum ut ante in, consequat dignissim quam. Mauris porta magna a turpis molestie dignissim. Curabitur augue metus, lacinia sit amet quam et, tristique placerat est. Sed blandit fringilla diam, et tristique massa pharetra nec. In consectetur vehicula volutpat. Etiam pretium malesuada ligula, vel congue nibh maximus et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus finibus, velit in interdum sodales, nisl nisl viverra augue, id tincidunt diam erat non est. Donec volutpat semper fringilla. Integer tellus erat, tempor ac odio ornare, luctus malesuada erat. Morbi a luctus leo. Etiam nibh felis, tempor non viverra nec, maximus non elit. Ut varius eros enim, sed sagittis arcu efficitur quis. In eu leo at odio elementum semper ut quis leo.</p>',
    id: 'bfjksasdhak',
    recommendation: 'accept',
    status: 'submitted',
    username: 'Alexis Georgantas',
  },
]

const ReviewerInfo = props => {
  const { articleId } = props

  return (
    <Accordion label="Reviews">
      <ContentWrapper>
        <div>
          <StyledAction to={`/assign-reviewers/${articleId}`}>
            Go to Reviewer Assignment Page
          </StyledAction>
        </div>

        <ReviewersNumbers data={fakeReviewersNumbers} />
        <ReviewsPreview data={fakeReviewsData} />
      </ContentWrapper>
    </Accordion>
  )
}

export default ReviewerInfo
