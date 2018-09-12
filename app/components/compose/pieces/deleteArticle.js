/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteManuscript(id: $id)
  }
`

const DeleteArticleMutation = props => {
  const { getCurrentUserQuery, render } = props
  const { id } = getCurrentUserQuery.data.currentUser

  const refetch = [
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: id },
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

export default DeleteArticleMutation
