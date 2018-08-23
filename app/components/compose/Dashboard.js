/* eslint-disable react/prop-types */

import React from 'react'
import { Adopt } from 'react-adopt'

import {
  createSubmission as createSubmissionMutation,
  createTeam as createTeamMutation,
  getArticles as getArticlesQuery,
  getCurrentUser as getCurrentUserQuery,
  getGlobalTeams as getGlobalTeamsQuery,
} from './pieces'

const mapper = {
  createSubmissionMutation,
  createTeamMutation,
  getArticlesQuery,
  getCurrentUserQuery,
  getGlobalTeamsQuery,
}

const getTeamByType = (teams, type) =>
  teams && teams.find(t => t.teamType === type)

const mapProps = args => ({
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
  loading: args.getArticlesQuery.loading || args.getGlobalTeamsQuery.loading,
})

const Composed = ({ render, ...props }) => (
  <Adopt mapper={mapper} mapProps={mapProps}>
    {mappedProps => render({ ...props, ...mappedProps })}
  </Adopt>
)

export default Composed
