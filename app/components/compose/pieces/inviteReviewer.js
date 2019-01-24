/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_TEAMS } from './getTeams'

const INVITE_REVIEWER = gql`
  mutation InviteReviewer($articleId: ID!, $reviewerId: ID!) {
    inviteReviewer(articleId: $articleId, reviewerId: $reviewerId)
  }
`

const refetchQueries = [
  {
    query: GET_TEAMS,
  },
]

const InviteReviewerMutation = props => {
  const { render } = props

  return (
    <Mutation mutation={INVITE_REVIEWER} refetchQueries={refetchQueries}>
      {(inviteReviewer, inviteReviewerResponse) =>
        render({ inviteReviewer, inviteReviewerResponse })
      }
    </Mutation>
  )
}

export default InviteReviewerMutation
