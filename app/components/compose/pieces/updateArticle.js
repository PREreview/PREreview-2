/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import SUBMIT_MANUSCRIPT from '../../../mutations/submitManuscript'
import { GET_MANUSCRIPT } from '../../../queries/manuscripts'
import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'
import { withCurrentUser } from '../../../userContext'

const UpdateArticle = props => {
  const { articleId, currentUser, render } = props

  const refetch = [
    {
      query: GET_MANUSCRIPT,
      variables: { id: articleId },
    },
    {
      query: GET_DASHBOARD_ARTICLES,
      variables: { currentUserId: currentUser.id },
    },
  ]

  return (
    <Mutation mutation={SUBMIT_MANUSCRIPT} refetchQueries={refetch}>
      {(updateArticle, updateArticleResponse) =>
        render({ updateArticle, updateArticleResponse })
      }
    </Mutation>
  )
}

export default withCurrentUser(UpdateArticle)
