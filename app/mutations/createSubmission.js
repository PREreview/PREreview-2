import gql from 'graphql-tag'

const CREATE_SUBMISSION = gql`
  mutation CreateSubmission {
    createSubmission {
      id
    }
  }
`

export default CREATE_SUBMISSION
