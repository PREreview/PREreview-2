/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_REVIEWS_FOR_ARTICLE = gql`
  query GetReviewsForArticle($articleVersionId: ID!) {
    reviewsForArticle(articleVersionId: $articleVersionId) {
      articleVersionId
      content
      events {
        createdAt
      }
      id
      recommendation
      reviewer {
        username
      }
      status {
        pending
        submitted
      }
    }
  }
`

const GetReviewsForArticleQuery = props => {
  const { articleId, render } = props
  const variables = { articleVersionId: articleId }

  return (
    <Query query={GET_REVIEWS_FOR_ARTICLE} variables={variables}>
      {render}
    </Query>
  )
}

export default GetReviewsForArticleQuery
