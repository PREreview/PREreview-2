/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_ARTICLE_REVIEWERS = gql`
  query GetArticleReviewers($id: ID!) {
    manuscript(id: $id) {
      id
      suggestedReviewer {
        name
        WBId
      }
    }
  }
`

const GetArticleReviewersQuery = props => {
  const { articleId: id, render } = props

  return (
    <Query query={GET_ARTICLE_REVIEWERS} variables={{ id }}>
      {render}
    </Query>
  )
}

export default GetArticleReviewersQuery
