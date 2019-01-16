/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import GET_TEAMS_FOR_ARTICLE from '../../../queries/teamsForArticle'

const getTeamsForArticleQuery = props => {
  const { articleId: id, render } = props

  return (
    <Query query={GET_TEAMS_FOR_ARTICLE} variables={{ id }}>
      {render}
    </Query>
  )
}

export default getTeamsForArticleQuery
