import gql from 'graphql-tag'

const UPDATE_TEAM = gql`
  mutation UpdateTeam($id: ID, $input: TeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
    }
  }
`

export default UPDATE_TEAM
