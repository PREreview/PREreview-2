/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_ARTICLE_FOR_EDITOR } from './getArticleForEditor'

const MANUSCRIPT_METADATA_UPDATE = gql`
  mutation ManuscriptMetadataUpdate($manuscriptId: ID!, $data: MetadataInput!) {
    manuscriptMetadataUpdate(manuscriptId: $manuscriptId, data: $data)
  }
`

const ManuscriptMetadataUpdateMutation = props => {
  const { articleId, render } = props
  console.log(props)

  const refetchQueries = [
    {
      query: GET_ARTICLE_FOR_EDITOR,
      variables: { id: articleId },
    },
  ]

  return (
    <Mutation
      mutation={MANUSCRIPT_METADATA_UPDATE}
      refetchQueries={refetchQueries}
    >
      {(
        manuscriptMetadataUpdateMutation,
        manuscriptMetadataUpdateMutationResult,
      ) =>
        render({
          manuscriptMetadataUpdateMutation,
          manuscriptMetadataUpdateMutationResult,
        })
      }
    </Mutation>
  )
}

export default ManuscriptMetadataUpdateMutation
