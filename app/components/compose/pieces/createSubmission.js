/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import CREATE_SUBMISSION from '../../../mutations/createSubmission'
import { GET_MANUSCRIPTS } from '../../../queries/manuscripts'

const update = (cache, { data: { createSubmission } }) => {
  const { manuscripts } = cache.readQuery({
    query: GET_MANUSCRIPTS,
  })

  cache.writeQuery({
    data: { manuscripts: manuscripts.push(createSubmission) },
    query: GET_MANUSCRIPTS,
  })
}

const createSubmissionMutation = ({ render }) => (
  <Mutation mutation={CREATE_SUBMISSION} update={update}>
    {(createSubmission, createSubmissionResult) =>
      render({ createSubmission, createSubmissionResult })
    }
  </Mutation>
)

export default createSubmissionMutation
