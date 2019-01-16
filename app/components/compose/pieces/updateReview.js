/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { withCurrentUser } from '../../../userContext'
import { GET_USER_REVIEWS_FOR_ARTICLE } from './getUserReviewsForArticle'
import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input)
  }
`

const UpdateReviewMutation = props => {
  const { articleVersionId, currentUser, render } = props

  const refetch = [
    {
      query: GET_USER_REVIEWS_FOR_ARTICLE,
      variables: {
        articleVersionId,
        reviewerId: currentUser.id,
      },
    },
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: {
        currentUserId: currentUser.id,
      },
    },
  ]

  return (
    <Mutation mutation={UPDATE_REVIEW} refetchQueries={refetch}>
      {(updateReview, updateReviewResponse) =>
        render({ updateReview, updateReviewResponse })
      }
    </Mutation>
  )
}

export default withCurrentUser(UpdateReviewMutation)
