/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import { GET_MANUSCRIPT_FOR_EDITOR } from '../../../queries/manuscripts'
import UPDATE_MANUSCRIPT_FOR_EDITOR from '../../../mutations/updateManuscriptForEditor'

const updateArticleForEditorMutation = ({ articleId, render }) => (
  <Mutation
    mutation={UPDATE_MANUSCRIPT_FOR_EDITOR}
    refetchQueries={[
      {
        query: GET_MANUSCRIPT_FOR_EDITOR,
        variables: { id: articleId },
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

export default updateArticleForEditorMutation
