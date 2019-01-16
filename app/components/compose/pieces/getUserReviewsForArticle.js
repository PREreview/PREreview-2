/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withCurrentUser } from '../../../userContext'

const GET_USER_REVIEWS_FOR_ARTICLE = gql`
  query GetUserReviewsForArticle($articleVersionId: ID!, $reviewerId: ID!) {
    userReviewsForArticle(
      articleVersionId: $articleVersionId
      reviewerId: $reviewerId
    ) {
      articleVersionId
      content
      events {
        createdAt
      }
      id
      recommendation
      status {
        submitted
      }
    }
  }
`

const GetUserReviewsForArticleQuery = props => {
  const { articleVersionId, currentUser, render } = props

  const variables = {
    articleVersionId,
    reviewerId: currentUser.id,
  }

  return (
    <Query query={GET_USER_REVIEWS_FOR_ARTICLE} variables={variables}>
      {render}
    </Query>
  )
}

export { GET_USER_REVIEWS_FOR_ARTICLE }
export default withCurrentUser(GetUserReviewsForArticleQuery)
