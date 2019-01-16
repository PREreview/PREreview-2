/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { PanelSectionHeader, PanelTextEditor, RecommendationDot } from './index'

const Message = styled.div`
  color: ${th('colorTextPlaceholder')};
  margin-top: calc(${th('gridUnit')} * 2);
`

const Editor = styled(PanelTextEditor)`
  div[contenteditable] {
    border: 0;
  }
`

const ReviewHeadWrapper = styled.div`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
`

const ReviewWrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const Pending = styled.div`
  align-self: flex-end;
  color: ${th('colorPrimary')};
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  line-height: ${th('lineHeightBaseSmall')};
  margin-left: auto; /* pull right */
`

const Review = props => {
  const { content, recommendation, reviewer, status } = props

  return (
    <ReviewWrapper>
      <ReviewHeadWrapper>
        <RecommendationDot
          recommendation={status.pending ? null : recommendation}
        />

        {reviewer.username}

        {status.pending && <Pending>pending</Pending>}
      </ReviewHeadWrapper>

      {!status.pending && <Editor readOnly value={content} />}
    </ReviewWrapper>
  )
}

const Reviews = props => {
  const { reviews } = props

  return (
    <div>
      <PanelSectionHeader>Reviewer feedback</PanelSectionHeader>

      {(!reviews || reviews.length === 0) && (
        <Message>No invited reviewers yet for this article</Message>
      )}

      {reviews && reviews.length > 0 && (
        <List component={Review} items={reviews} />
      )}
    </div>
  )
}

export default Reviews
