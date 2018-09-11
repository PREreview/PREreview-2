/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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

  return (
    <Mutation mutation={HANDLE_INVITATION} variables={variables}>
      {(handleInvitation, handleInvitationResponse) =>
        render({ handleInvitation, handleInvitationResponse })
      }
    </Mutation>
  )
}

export default HandleInvitationMutation
