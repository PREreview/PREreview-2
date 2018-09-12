/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import CREATE_SUBMISSION from '../../../mutations/createSubmission'

const createSubmissionMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={CREATE_SUBMISSION}>
      {(createSubmission, createSubmissionResult) =>
        render({ createSubmission, createSubmissionResult })
      }
    </Mutation>
  )
}

export default createSubmissionMutation
