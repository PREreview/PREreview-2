/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'
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

const ReviewerInfo = props => {
  const { articleId, reviewerCounts, reviews } = props

  return (
    <Accordion label="Reviews">
      <ContentWrapper>
        <Authorize operation="isEditor" unauthorize={null}>
          <div>
            <StyledAction to={`/assign-reviewers/${articleId}`}>
              Go to Reviewer Assignment Page
            </StyledAction>
          </div>
        </Authorize>

        <ReviewersNumbers data={reviewerCounts} />
        <ReviewsPreview reviews={reviews} />
      </ContentWrapper>
    </Accordion>
  )
}

export default ReviewerInfo
