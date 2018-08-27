/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'

import { getCurrentUser, getTeamsForArticle } from './pieces'
import { getEditor, getScienceOfficer } from './helpers/teams'

const mapper = {
  getCurrentUser,
  getTeamsForArticle: props => getTeamsForArticle(props),
}

const mapProps = args => ({
  currentUser: args.getCurrentUser.data.currentUser,
  editor: getEditor(args.getTeamsForArticle.data.teamsForArticle),
  loading: args.getCurrentUser.loading || args.getTeamsForArticle.loading,
  scienceOfficer: getScienceOfficer(
    args.getTeamsForArticle.data.teamsForArticle,
  ),
})

const Composed = adopt(mapper, mapProps)

const ComposedEditorPanel = props => {
  const { match, render, ...otherProps } = props
  const { id: articleId } = match.params

  return (
    <Composed articleId={articleId} {...otherProps}>
      {render}
    </Composed>
  )
}

export default withRouter(ComposedEditorPanel)
