/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import {
  getCurrentUser,
  getUserReviewsForArticle,
  updateReview,
} from './pieces'
import { ReviewerPanel } from '../ui'

const mapper = {
  getCurrentUser,
  getUserReviewsForArticle,
  updateReview,
}

/* eslint-disable-next-line arrow-body-style */
const mapProps = args => {
  return {
    currentUser: get(args.getCurrentUser, 'data.currentUser'),
    loading:
      args.getCurrentUser.loading || args.getUserReviewsForArticle.loading,
    reviews: get(args.getUserReviewsForArticle, 'data.userReviewsForArticle'),
    updateReview: args.updateReview.updateReview,
  }
}

const Composed = adopt(mapper, mapProps)

const ComposedReviewerPanel = props => {
  const { match } = props
  const articleVersionId = match.params.id

  return (
    <Composed articleVersionId={articleVersionId}>
      {mappedProps => <ReviewerPanel {...mappedProps} />}
    </Composed>
  )
}

export default withRouter(ComposedReviewerPanel)
