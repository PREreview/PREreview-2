/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'

import SUBMIT_MANUSCRIPT from '../../../mutations/submitManuscript'
import { GET_MANUSCRIPT } from '../../../queries/manuscripts'

const UpdateArticle = props => {
  const { articleId, render } = props

  const refetch = [
    {
      query: GET_MANUSCRIPT,
      variables: { id: articleId },
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

export default UpdateArticle
