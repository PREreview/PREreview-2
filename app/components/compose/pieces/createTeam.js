/*
  See https://github.com/pedronauck/react-adopt#leading-with-multiple-params
  for react-adopt pattern.
*/

/* eslint-disable react/prop-types */

import React from 'react'
import { Mutation } from 'react-apollo'
// import { Adopt } from 'react-adopt'

import CREATE_TEAM from '../../../mutations/createTeam'

const createTeamMutation = ({ render }) => (
  <Mutation mutation={CREATE_TEAM}>
    {(createTeam, createTeamResult) => render({ createTeam, createTeamResult })}
  </Mutation>
)

export default createTeamMutation
