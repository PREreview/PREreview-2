/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import {
  addExternalReviewer,
  getArticleReviewers,
  getExternalTeamsForManuscript,
  getGlobalTeams,
  getTeamsForArticle,
  getUsers,
  inviteExternalReviewer,
  inviteReviewer,
  updateTeam,
} from './pieces'

import { getRegularUsers, getReviewerTeams } from '../../helpers/teams'

const mapper = {
  addExternalReviewer,
  getArticleReviewers: props => getArticleReviewers(props),
  getExternalTeamsForManuscript,
  getGlobalTeams,
  getTeamsForArticle: props => getTeamsForArticle(props),
  getUsers,
  inviteExternalReviewer,
  inviteReviewer,
  updateTeam,
}

// eslint-disable-next-line arrow-body-style
const mapProps = args => {
  // console.log(args)
  const allReviewerTeams = getReviewerTeams(
    get(args.getTeamsForArticle, 'data.teamsForArticle'),
  )

  const getTeam = type =>
    allReviewerTeams && allReviewerTeams.find(t => t.teamType === type)

  const externalTeams = get(
    args.getExternalTeamsForManuscript,
    'data.getExternalTeamsForManuscript',
  )

  const externalReviewers =
    externalTeams && externalTeams.find(t => t.teamType === 'externalReviewers')

  const externalReviewersInvited =
    externalTeams &&
    externalTeams.find(t => t.teamType === 'externalReviewersInvited')

  return {
    addExternalReviewer: args.addExternalReviewer.addExternalReviewer,
    externalReviewers,
    externalReviewersInvited,
    inviteExternalReviewer: args.inviteExternalReviewer.inviteExternalReviewer,
    inviteReviewer: args.inviteReviewer.inviteReviewer,
    loading:
      args.getArticleReviewers.loading ||
      args.getUsers.loading ||
      args.getExternalTeamsForManuscript.loading ||
      args.getGlobalTeams.loading ||
      args.getTeamsForArticle.loading,
    reviewersAcceptedTeam: getTeam('reviewersAccepted'),
    reviewersInvitedTeam: getTeam('reviewersInvited'),
    reviewersRejectedTeam: getTeam('reviewersRejected'),
    reviewersTeam: getTeam('reviewers'),
    suggested: get(
      args.getArticleReviewers.data,
      'manuscript.suggestedReviewer',
    ),
    updateTeam: args.updateTeam.updateTeam,
    users: getRegularUsers(
      get(args.getUsers, 'data.users'),
      get(args.getGlobalTeams, 'data.globalTeams'),
    ),
  }
}

const Composed = adopt(mapper, mapProps)

const ComposedAssignReviewers = props => {
  const { match, render } = props
  const { id: articleId } = match.params

  return (
    <Composed articleId={articleId}>
      {mappedProps => render({ ...mappedProps, articleId })}
    </Composed>
  )
}

export default withRouter(ComposedAssignReviewers)
