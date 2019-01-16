/*
 * DEPRECATED ??
 */

/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import { GET_MANUSCRIPTS } from '../../../queries/manuscripts'

const getArticlesQuery = ({ render }) => (
  <Query query={GET_MANUSCRIPTS}>{render}</Query>
)

export default getArticlesQuery
