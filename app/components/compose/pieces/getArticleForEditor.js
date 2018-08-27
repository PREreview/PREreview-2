/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import { GET_MANUSCRIPT_FOR_EDITOR } from '../../../queries/manuscripts'

const getArticleForEditorQuery = props => {
  const { articleId: id, render } = props

  return (
    <Query query={GET_MANUSCRIPT_FOR_EDITOR} variables={{ id }}>
      {render}
    </Query>
  )
}

export default getArticleForEditorQuery
