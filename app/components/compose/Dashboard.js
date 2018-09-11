/* eslint-disable react/prop-types */

import React from 'react'
import { Adopt } from 'react-adopt'
import { get } from 'lodash'

import {
  createSubmission as createSubmissionMutation,
  createTeam as createTeamMutation,
  getArticles as getArticlesQuery,
  getCurrentUser as getCurrentUserQuery,
  getDashboardArticles as getDashboardArticlesQuery,
  getGlobalTeams as getGlobalTeamsQuery,
  handleInvitation,
} from './pieces'

const mapper = {
  createSubmissionMutation,
  createTeamMutation,
  getArticlesQuery,
  getCurrentUserQuery,
  getDashboardArticlesQuery,
  getGlobalTeamsQuery,
  handleInvitation,
}

const getTeamByType = (teams, type) =>
  teams && teams.find(t => t.teamType === type)

/* eslint-disable-next-line arrow-body-style */
const mapProps = args => {
  // console.log(args.getDashboardArticlesQuery)

  return {
    articles: args.getArticlesQuery.data.manuscripts,
    createSubmission: args.createSubmissionMutation.createSubmission,
    createTeam: args.createTeamMutation.createTeam,
    currentUser: args.getCurrentUserQuery.data.currentUser,
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

export default Composed
