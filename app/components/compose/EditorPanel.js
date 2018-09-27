/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import {
  getArticleForEditor,
  getGlobalTeams,
  getReviewsForArticle,
  getTeamsForArticle,
  updateArticleForEditor,
  updateCurrentlyWith,
} from './pieces'

import { withCurrentUser } from '../../userContext'
import {
  getEditor,
  getReviewersTeamByType,
  getScienceOfficer,
} from '../../helpers/teams'

const mapper = {
  getArticleForEditor: props => getArticleForEditor(props),
  getGlobalTeams,
  getReviewsForArticle: props => getReviewsForArticle(props),
  getTeamsForArticle: props => getTeamsForArticle(props),
  updateArticleForEditor,
  updateCurrentlyWith,
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

  const reviewersTeam = get(
    getReviewersTeamByType(teams, 'reviewers'),
    'members',
  )

  return {
    article: args.getArticleForEditor.data.manuscript,
    editor: getEditor(args.getTeamsForArticle.data.teamsForArticle),
    editorSuggestedReviewers: reviewersTeam,
    globalTeams: get(args.getGlobalTeams, 'data.globalTeams'),
    loading:
      args.getTeamsForArticle.loading ||
      args.getArticleForEditor.loading ||
      args.getGlobalTeams.loading ||
      args.getReviewsForArticle.loading,
    reviewerCounts: {
      accepted,
      invited,
      rejected,
    },
    reviews: get(args.getReviewsForArticle, 'data.reviewsForArticle'),
    scienceOfficer: getScienceOfficer(
      args.getTeamsForArticle.data.teamsForArticle,
    ),
    updateArticle: args.updateArticleForEditor.updateArticle,
    updateCurrentlyWith: args.updateCurrentlyWith.updateCurrentlyWith,
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
