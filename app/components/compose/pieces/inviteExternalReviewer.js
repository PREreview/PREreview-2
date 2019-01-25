/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const INVITE_EXTERNAL_REVIEWER = gql`
  mutation InviteExternalReviewer($manuscriptId: ID!, $reviewerId: ID!) {
    inviteExternalReviewer(manuscriptId: $manuscriptId, reviewerId: $reviewerId)
  }
`

const InviteExternalReviewerMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={INVITE_EXTERNAL_REVIEWER}>
      {(inviteExternalReviewer, inviteExternalReviewerResponse) =>
        render({ inviteExternalReviewer, inviteExternalReviewerResponse })
      }
    </Mutation>
  )
}

export default InviteExternalReviewerMutation
