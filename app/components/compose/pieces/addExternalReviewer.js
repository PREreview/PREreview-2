/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ADD_EXTERNAL_REVIEWER = gql`
  mutation AddExternalReviewer($input: AddExternalReviewerInput!) {
    addExternalReviewer(input: $input)
  }
`

const AddExternalReviewerMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={ADD_EXTERNAL_REVIEWER}>
      {(addExternalReviewer, addExternalReviewerResponse) =>
        render({ addExternalReviewer, addExternalReviewerResponse })
      }
    </Mutation>
  )
}

export default AddExternalReviewerMutation
