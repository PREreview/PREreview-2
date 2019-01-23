/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT = gql`
  query GetExternalTeamsForManuscript($manuscriptId: ID!) {
    getExternalTeamsForManuscript(manuscriptId: $manuscriptId) {
      id
      members {
        id
        email
        name
      }
      teamType
    }
  }
`

const getExternalTeamsForManuscriptQuery = props => {
  const { articleId, render } = props

  return (
    <Query
      query={GET_EXTERNAL_TEAMS_FOR_MANUSCRIPT}
      variables={{ manuscriptId: articleId }}
    >
      {render}
    </Query>
  )
}

module.exports = getExternalTeamsForManuscriptQuery
