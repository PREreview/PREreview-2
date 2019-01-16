/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import { GET_ARTICLE_FOR_EDITOR } from './getArticleForEditor'
import { GET_DASHBOARD_ARTICLES } from './getDashboardArticles'
import UPDATE_MANUSCRIPT_FOR_EDITOR from '../../../mutations/updateManuscriptForEditor'
import { withCurrentUser } from '../../../userContext'

const updateArticleForEditorMutation = ({ articleId, currentUser, render }) => (
  <Mutation
    mutation={UPDATE_MANUSCRIPT_FOR_EDITOR}
    refetchQueries={[
      {
        query: GET_ARTICLE_FOR_EDITOR,
        variables: { id: articleId },
      },
      {
        query: GET_DASHBOARD_ARTICLES,
        variables: { currentUserId: currentUser.id },
      },
    ]}
  >
    {(updateManuscript, updateManuscriptResult) =>
      render({
        updateArticle: updateManuscript,
        updateArticleResult: updateManuscriptResult,
      })
    }
  </Mutation>
)

export default withCurrentUser(updateArticleForEditorMutation)
