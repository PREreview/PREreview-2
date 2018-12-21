/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_ARTICLE_FOR_EDITOR = gql`
  query GetArticleForEditor($id: ID!) {
    manuscript(id: $id) {
      communicationHistory {
        content
        # id
        timestamp
        user {
          id
          username
        }
      }
      currentlyWith
      decisionLetter
      doi
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

const GetArticleForEditorQuery = props => {
  const { articleId: id, render } = props

  return (
    <Query query={GET_ARTICLE_FOR_EDITOR} variables={{ id }}>
      {render}
    </Query>
  )
}

export { GET_ARTICLE_FOR_EDITOR }
export default GetArticleForEditorQuery
