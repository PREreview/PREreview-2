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
        decision {
          accepted
          rejected
          revise
        }
        scienceOfficer {
          approved
          pending
        }
        submission {
          initial
          datatypeSelected
          full
        }
      }
    }
  }
`

export default UPDATE_MANUSCRIPT_FOR_EDITOR
