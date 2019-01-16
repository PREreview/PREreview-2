import gql from 'graphql-tag'

const CREATE_TEAM = gql`
  mutation CreateTeam($data: TeamInput!) {
    createTeam(input: $data) {
      id
      members {
        id
        username
      }
      object {
        objectId
        objectType
      }
      name
    }
  }
`

export default CREATE_TEAM
