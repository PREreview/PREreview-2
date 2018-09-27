/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'
import { withCurrentUser } from '../../../userContext'

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteManuscript(id: $id)
  }
`

const DeleteArticleMutation = props => {
  const { currentUser, render } = props

  const refetch = [
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: currentUser.id },
    },
  ]

  return (
    <Mutation mutation={DELETE_ARTICLE} refetchQueries={refetch}>
      {(deleteArticle, deleteArticleResponse) =>
        render({ deleteArticle, deleteArticleResponse })
      }
    </Mutation>
  )
}

export default withCurrentUser(DeleteArticleMutation)
