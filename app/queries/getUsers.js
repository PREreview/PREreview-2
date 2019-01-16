import gql from 'graphql-tag'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`

export default GET_USERS
