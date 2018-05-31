import gql from 'graphql-tag'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      admin
      username
    }
  }
`

export default CURRENT_USER
