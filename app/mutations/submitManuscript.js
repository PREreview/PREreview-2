import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($manuscript: Manuscript!) {
    updateManuscript {
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
