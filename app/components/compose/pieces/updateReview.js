/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_USER_REVIEWS_FOR_ARTICLE } from './getUserReviewsForArticle'

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input)
  }
`

const UpdateReviewMutation = props => {
  const { articleVersionId, getCurrentUser, render } = props
  const userId = getCurrentUser.data.currentUser.id

  const refetch = [
    {
      query: GET_USER_REVIEWS_FOR_ARTICLE,
      variables: {
        articleVersionId,
        reviewerId: userId,
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

export default UpdateReviewMutation
