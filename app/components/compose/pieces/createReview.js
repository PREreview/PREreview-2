/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input)
  }
`

const CreateReviewMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={CREATE_REVIEW_MUTATION}>
      {(createReview, createReviewResponse) =>
        render({ createReview, createReviewResponse })
      }
    </Mutation>
  )
}

export default CreateReviewMutation
