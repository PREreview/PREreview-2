/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
  const { getCurrentUserQuery, render } = props
  const { id } = getCurrentUserQuery.data.currentUser

  return (
    <Query query={GET_DASHBOARD_ARTICLES} variables={{ currentUserId: id }}>
      {render}
    </Query>
  )
}

export { GET_DASHBOARD_ARTICLES }
export default GetDashboardArticlesQuery
