/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USER_REVIEWS_FOR_ARTICLE = gql`
  query GetUserReviewsForArticle($articleVersionId: ID!, $reviewerId: ID!) {
    userReviewsForArticle(
      articleVersionId: $articleVersionId
      reviewerId: $reviewerId
    ) {
      articleVersionId
      content
      id
      recommendation
    }
  }
`

const GetUserReviewsForArticleQuery = props => {
  const { articleVersionId, getCurrentUser, render } = props
  const userId = getCurrentUser.data.currentUser.id

  const variables = {
    articleVersionId,
    reviewerId: userId,
  }

  return (
    <Query query={GET_USER_REVIEWS_FOR_ARTICLE} variables={variables}>
      {render}
    </Query>
  )
}

export default GetUserReviewsForArticleQuery
