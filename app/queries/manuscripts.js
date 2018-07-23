import gql from 'graphql-tag'

const GET_MANUSCRIPT = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      acknowledgements
      authors {
        email
        name
        submittingAuthor
        wormBaseId
      }
      comments
      dataType
      disclaimer
      funding
      id
      image {
        name
        url
      }
      laboratory
      patternDescription
      status {
        dataTypeSelected
        initialSubmission
        submitted
      }
      suggestedReviewer
      title
    }
  }
`

const GET_MANUSCRIPTS = gql`
  query manuscripts {
    manuscripts {
      id
      status {
        dataTypeSelected
        initialSubmission
        submitted
      }
      title
    }
  }
`

export { GET_MANUSCRIPT, GET_MANUSCRIPTS }
