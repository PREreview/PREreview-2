import gql from 'graphql-tag'

const UPDATE_MANUSCRIPT_FOR_EDITOR = gql`
  mutation submitManuscript($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      communicationHistory {
        content
        # id
        timestamp
        user {
          id
          username
        }
      }
      decisionLetter
      id
      status {
        dataTypeSelected
        decision {
          accepted
          rejected
          revise
        }
        initialSubmission
        scienceOfficer {
          approved
          pending
        }
        submitted
      }
    }
  }
`

export default UPDATE_MANUSCRIPT_FOR_EDITOR
