/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'

const HANDLE_INVITATION = gql`
  mutation HandleInvitation(
    $action: String!
    $articleId: ID!
    $currentUserId: ID!
  ) {
    handleInvitation(
      action: $action
      articleId: $articleId
      currentUserId: $currentUserId
    )
  }
`

const HandleInvitationMutation = props => {
  const { getCurrentUserQuery, render } = props
  const { id } = getCurrentUserQuery.data.currentUser

  const variables = {
    currentUserId: id,
  }

  const refetch = [
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: id },
    },
  ]

  return (
    <Mutation
      mutation={HANDLE_INVITATION}
      refetchQueries={refetch}
      variables={variables}
    >
      {(handleInvitation, handleInvitationResponse) =>
        render({ handleInvitation, handleInvitationResponse })
      }
    </Mutation>
  )
}

export default HandleInvitationMutation
