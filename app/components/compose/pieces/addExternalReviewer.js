/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'
import { GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT } from './getExternalTeamsForManuscript'
import { withCurrentUser } from '../../../userContext'

const ADD_EXTERNAL_REVIEWER = gql`
  mutation AddExternalReviewer($input: AddExternalReviewerInput!) {
    addExternalReviewer(input: $input)
  }
`

const AddExternalReviewerMutation = props => {
  const { articleId, currentUser, render } = props

  const refetchQueries = [
    {
      query: GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT,
      variables: { manuscriptId: articleId },
    },
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: currentUser.id },
    },
  ]

  return (
    <Mutation mutation={ADD_EXTERNAL_REVIEWER} refetchQueries={refetchQueries}>
      {(addExternalReviewer, addExternalReviewerResponse) =>
        render({ addExternalReviewer, addExternalReviewerResponse })
      }
    </Mutation>
  )
}

export default withCurrentUser(AddExternalReviewerMutation)
