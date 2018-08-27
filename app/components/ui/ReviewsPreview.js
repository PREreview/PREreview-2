/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { List, H6 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { PanelTextEditor, RecommendationDot } from './index'

const StyledH6 = styled(H6)`
  color: ${th('colorText')};
  margin: calc(${th('gridUnit')} * 2) 0 0 0;
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
  const { content, recommendation, status, username } = props
  const pending = status === 'pending'

  return (
    <ReviewWrapper>
      <ReviewHeadWrapper>
        <RecommendationDot recommendation={pending ? null : recommendation} />
        {username}
        {pending && <Pending>pending</Pending>}
      </ReviewHeadWrapper>
      {!pending && <Editor readOnly value={content} />}
    </ReviewWrapper>
  )
}

const Reviews = props => {
  const { data } = props
  if (!data || !data.length > 0) return null

  return (
    <div>
      <StyledH6>Reviewer feedback</StyledH6>
      <List component={Review} items={data} />
    </div>
  )
}

export default Reviews
