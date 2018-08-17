import gql from 'graphql-tag'

const CREATE_TEAM = gql`
  mutation CreateTeam($data: TeamInput!) {
    createTeam(input: $data) {
      id
    }
  }
`

export default CREATE_TEAM
