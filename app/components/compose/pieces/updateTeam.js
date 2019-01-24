/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import { GET_TEAMS } from './getTeams'
import UPDATE_TEAM from '../../../mutations/updateTeam'
import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'
import { withCurrentUser } from '../../../userContext'

const updateTeamMutation = ({ currentUser, render }) => {
  const refetch = [
    {
      query: GET_TEAMS,
    },
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: currentUser.id },
    },
  ]

  return (
    <Mutation mutation={UPDATE_TEAM} refetchQueries={refetch}>
      {(updateTeam, updateTeamResult) =>
        render({ updateTeam, updateTeamResult })
      }
    </Mutation>
  )
}

export default withCurrentUser(updateTeamMutation)
