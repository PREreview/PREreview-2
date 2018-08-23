import React from 'react'
import { Query } from 'react-apollo'

import GET_GLOBAL_TEAMS from '../../../queries/getGlobalTeams'

const getGlobalTeamsQuery = <Query query={GET_GLOBAL_TEAMS} />

export default getGlobalTeamsQuery
