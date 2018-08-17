/* DELETE */

import gql from 'graphql-tag'

const ADD_HISTORY_ENTRY = gql`
  mutation AddHistoryEntry($data: HistoryEntryInput!) {
    addHistoryEntry(input: $data) {
      content
      from
      timestamp
      to
    }
  }
`

export default ADD_HISTORY_ENTRY
