/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import GET_TEAMS from '../../../queries/getTeams'
import UPDATE_TEAM from '../../../mutations/updateTeam'

const refetch = [
  {
    query: GET_TEAMS,
  },
]

const updateTeamMutation = ({ render }) => (
  <Mutation mutation={UPDATE_TEAM} refetchQueries={refetch}>
    {(updateTeam, updateTeamResult) => render({ updateTeam, updateTeamResult })}
  </Mutation>
)

export default updateTeamMutation
