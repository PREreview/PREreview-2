/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'

import {
  getArticleForEditor,
  getTeamsForArticle,
  updateArticleForEditor,
} from './pieces'

import { withCurrentUser } from '../../userContext'
import { getEditor, getScienceOfficer } from '../../helpers/teams'

const mapper = {
  getArticleForEditor: props => getArticleForEditor(props),
  getTeamsForArticle: props => getTeamsForArticle(props),
  updateArticleForEditor,
}

const mapProps = args => ({
  article: args.getArticleForEditor.data.manuscript,
  editor: getEditor(args.getTeamsForArticle.data.teamsForArticle),
  loading: args.getTeamsForArticle.loading || args.getArticleForEditor.loading,
  scienceOfficer: getScienceOfficer(
    args.getTeamsForArticle.data.teamsForArticle,
  ),
  updateArticle: args.updateArticleForEditor.updateArticle,
})

const Composed = adopt(mapper, mapProps)

const ComposedEditorPanel = props => {
  const { currentUser, match, render, ...otherProps } = props
  const { id: articleId } = match.params

  return (
    <Composed articleId={articleId} {...otherProps}>
      {mappedProps => render({ articleId, currentUser, ...mappedProps })}
    </Composed>
  )
}

// TO DO -- delete withRouter and get article id from getArticle

export default withRouter(withCurrentUser(ComposedEditorPanel))
