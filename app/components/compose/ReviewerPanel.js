/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import { withCurrentUser } from '../../userContext'

import { getUserReviewsForArticle, updateReview } from './pieces'
import { ReviewerPanel } from '../ui'

const mapper = {
  getUserReviewsForArticle,
  updateReview,
}

/* eslint-disable-next-line arrow-body-style */
const mapProps = args => {
  return {
    loading: args.getUserReviewsForArticle.loading,
    reviews: get(args.getUserReviewsForArticle, 'data.userReviewsForArticle'),
    updateReview: args.updateReview.updateReview,
  }
}

const Composed = adopt(mapper, mapProps)

const ComposedReviewerPanel = props => {
  const { currentUser, match } = props
  const articleVersionId = match.params.id

  return (
    <Composed articleVersionId={articleVersionId}>
      {mappedProps => (
        <ReviewerPanel currentUser={currentUser} {...mappedProps} />
      )}
    </Composed>
  )
}

export default withRouter(withCurrentUser(ComposedReviewerPanel))
