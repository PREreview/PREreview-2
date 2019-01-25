/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT } from './getExternalTeamsForManuscript'

const INVITE_EXTERNAL_REVIEWER = gql`
  mutation InviteExternalReviewer($manuscriptId: ID!, $reviewerId: ID!) {
    inviteExternalReviewer(manuscriptId: $manuscriptId, reviewerId: $reviewerId)
  }
`

const InviteExternalReviewerMutation = props => {
  const { articleId, render } = props

  const refetchQueries = [
    {
      query: GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT,
      variables: { manuscriptId: articleId },
    },
  ]

  return (
    <Mutation
      mutation={INVITE_EXTERNAL_REVIEWER}
      refetchQueries={refetchQueries}
    >
      {(inviteExternalReviewer, inviteExternalReviewerResponse) =>
        render({ inviteExternalReviewer, inviteExternalReviewerResponse })
      }
    </Mutation>
  )
}

export default InviteExternalReviewerMutation
