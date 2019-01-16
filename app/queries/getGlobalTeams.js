import gql from 'graphql-tag'

const GET_GLOBAL_TEAMS = gql`
  query GetGlobalTeams {
    globalTeams {
      id
      members {
        id
        username
      }
      teamType
    }
  }
`

export default GET_GLOBAL_TEAMS
