/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_ARTICLE_FOR_EDITOR } from './getArticleForEditor'

const UPDATE_CURRENTLY_WITH = gql`
  mutation UpdateCurrentlyWith($data: ManuscriptInput!) {
    updateManuscript(data: $data) {
      id
    }
  }
`

const UpdateCurrentlyWithMutation = props => {
  const { articleId, render } = props

  const refetch = [
    {
      query: GET_ARTICLE_FOR_EDITOR,
      variables: {
        id: articleId,
      },
    },
  ]

  return (
    <Mutation mutation={UPDATE_CURRENTLY_WITH} refetchQueries={refetch}>
      {(updateCurrentlyWith, updateCurrentlyWithResult) =>
        render({ updateCurrentlyWith, updateCurrentlyWithResult })
      }
    </Mutation>
  )
}

export default UpdateCurrentlyWithMutation
