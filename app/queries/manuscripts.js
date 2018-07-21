import gql from 'graphql-tag'

const GET_MANUSCRIPT = gql`
  query manuscript($id: ID!) {
    manuscript(id: $id) {
      id
      authors {
        email
        name
        submittingAuthor
        wormBaseId
      }
      title
      laboratory
      funding
      image {
        name
        url
      }
      patternDescription
      acknowledgements
      suggestedReviewer
      disclaimer
      comments
    }
  }
`

const GET_MANUSCRIPTS = gql`
  query manuscripts {
    manuscripts {
      id
      title
    }
  }
`

export { GET_MANUSCRIPT, GET_MANUSCRIPTS }
