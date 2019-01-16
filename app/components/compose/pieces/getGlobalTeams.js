/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import GET_GLOBAL_TEAMS from '../../../queries/getGlobalTeams'

const getGlobalTeamsQuery = ({ render }) => (
  <Query query={GET_GLOBAL_TEAMS}>{render}</Query>
)

export default getGlobalTeamsQuery
