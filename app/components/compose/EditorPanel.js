/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import {
  getArticleForEditor,
  getTeamsForArticle,
  updateArticleForEditor,
} from './pieces'

import { withCurrentUser } from '../../userContext'
import {
  getEditor,
  getReviewersTeamByType,
  getScienceOfficer,
} from '../../helpers/teams'

const mapper = {
  getArticleForEditor: props => getArticleForEditor(props),
  getTeamsForArticle: props => getTeamsForArticle(props),
  updateArticleForEditor,
}

const mapProps = args => {
  const teams = get(args.getTeamsForArticle, 'data.teamsForArticle')

  const invited = get(
    getReviewersTeamByType(teams, 'reviewersInvited'),
    'members.length',
  )

  const accepted = get(
    getReviewersTeamByType(teams, 'reviewersAccepted'),
    'members.length',
  )

  const rejected = get(
    getReviewersTeamByType(teams, 'reviewersRejected'),
    'members.length',
  )

  return {
    article: args.getArticleForEditor.data.manuscript,
    editor: getEditor(args.getTeamsForArticle.data.teamsForArticle),
    loading:
      args.getTeamsForArticle.loading || args.getArticleForEditor.loading,
    reviewerCounts: {
      accepted,
      invited,
      rejected,
    },
    scienceOfficer: getScienceOfficer(
      args.getTeamsForArticle.data.teamsForArticle,
    ),
    updateArticle: args.updateArticleForEditor.updateArticle,
  }
}

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
