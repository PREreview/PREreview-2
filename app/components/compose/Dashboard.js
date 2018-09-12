/* eslint-disable react/prop-types */

import React from 'react'
import { Adopt } from 'react-adopt'
import { withApollo } from 'react-apollo'
import { get } from 'lodash'

import {
  createSubmission as createSubmissionMutation,
  createTeam as createTeamMutation,
  deleteArticle,
  getArticles as getArticlesQuery,
  getCurrentUser as getCurrentUserQuery,
  getDashboardArticles as getDashboardArticlesQuery,
  getGlobalTeams as getGlobalTeamsQuery,
  handleInvitation,
} from './pieces'

/* eslint-disable sort-keys */
const mapper = {
  getCurrentUserQuery,
  createSubmissionMutation,
  createTeamMutation,
  deleteArticle,
  getArticlesQuery,
  getDashboardArticlesQuery,
  getGlobalTeamsQuery,
  handleInvitation,
}
/* eslint-enable sort-keys */

const getTeamByType = (teams, type) =>
  teams && teams.find(t => t.teamType === type)

/* eslint-disable-next-line arrow-body-style */
const mapProps = args => {
  // console.log(args.getDashboardArticlesQuery)

  return {
    articles: args.getArticlesQuery.data.manuscripts,
    authorArticles: get(
      args.getDashboardArticlesQuery,
      'data.dashboardArticles.author',
    ),
    createSubmission: args.createSubmissionMutation.createSubmission,
    createTeam: args.createTeamMutation.createTeam,
    currentUser: args.getCurrentUserQuery.data.currentUser,
    deleteArticle: args.deleteArticle.deleteArticle,
    globalEditorTeam: getTeamByType(
      args.getGlobalTeamsQuery.data.globalTeams,
      'editors',
    ),
    globalScienceOfficerTeam: getTeamByType(
      args.getGlobalTeamsQuery.data.globalTeams,
      'scienceOfficers',
    ),
    handleInvitation: args.handleInvitation.handleInvitation,
    loading:
      args.getArticlesQuery.loading ||
      args.getGlobalTeamsQuery.loading ||
      args.getDashboardArticlesQuery.loading,
    reviewerArticles: get(
      args.getDashboardArticlesQuery,
      'data.dashboardArticles.reviewer',
    ),
  }
}

const Composed = ({ render, ...props }) => (
  <Adopt mapper={mapper} mapProps={mapProps}>
    {mappedProps => render({ ...props, ...mappedProps })}
  </Adopt>
)

export default withApollo(Composed)
