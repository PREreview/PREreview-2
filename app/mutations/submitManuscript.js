import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      id
      authors {
        email
        name
      }
      title
      laboratory
      funding
      image {
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

export default SUBMIT_MANUSCRIPT
