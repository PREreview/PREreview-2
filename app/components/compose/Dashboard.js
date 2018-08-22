/* eslint-disable react/prop-types */

import React from 'react'
import { Adopt } from 'react-adopt'

import {
  createSubmission as createSubmissionMutation,
  createTeam as createTeamMutation,
  getArticles as getArticlesQuery,
  getCurrentUser as getCurrentUserQuery,
} from './pieces'

const mapper = {
  createSubmissionMutation,
  createTeamMutation,
  getArticlesQuery,
  getCurrentUserQuery,
}

const mapProps = args => ({
  articles: args.getArticlesQuery.data.manuscripts,
  createSubmission: args.createSubmissionMutation.createSubmission,
  createTeam: args.createTeamMutation.createTeam,
  currentUser: args.getCurrentUserQuery.data.currentUser,
  loading: args.getArticlesQuery.loading,
})

const Composed = ({ render, ...props }) => (
  <Adopt mapper={mapper} mapProps={mapProps}>
    {mappedProps => render({ ...props, ...mappedProps })}
  </Adopt>
)

export default Composed
