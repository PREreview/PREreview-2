/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withCurrentUser } from '../../../userContext'

const GET_DASHBOARD_ARTICLES = gql`
  query GetDashboardArticles($currentUserId: ID!) {
    dashboardArticles(currentUserId: $currentUserId) {
      author {
        id
        status {
          submission {
            datatypeSelected
            initial
            full
          }
        }
        title
      }
      editor {
        assignedEditor {
          id
          username
        }
        id
        status {
          decision {
            accepted
            rejected
            revise
          }
          submission {
            datatypeSelected
            initial
            full
          }
        }
        title
      }
      isGlobal
      reviewer {
        id
        reviewerStatus
        title
      }
    }
  }
`

const GetDashboardArticlesQuery = props => {
  const { currentUser, render } = props

  const variables = {
    currentUserId: currentUser.id,
  }

  return (
    <Query query={GET_DASHBOARD_ARTICLES} variables={variables}>
      {render}
    </Query>
  )
}

export { GET_DASHBOARD_ARTICLES }
export default withCurrentUser(GetDashboardArticlesQuery)
