import gql from 'graphql-tag'

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      global
      id
      members {
        id
        username
      }
      name
      object {
        objectId
      }
      teamType
    }
  }
`

/* eslint-disable-next-line import/prefer-default-export */
export { GET_TEAMS }
