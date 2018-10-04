/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import { GET_MANUSCRIPT } from '../../../queries/manuscripts'

const GetArticleQuery = props => {
  const { articleId: id, render } = props

  return (
    <Query query={GET_MANUSCRIPT} variables={{ id }}>
      {render}
    </Query>
  )
}

export { GET_MANUSCRIPT as GET_ARTICLE }
export default GetArticleQuery
