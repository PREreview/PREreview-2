import gql from 'graphql-tag'

const SUBMIT_MANUSCRIPT = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
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

export default SUBMIT_MANUSCRIPT
