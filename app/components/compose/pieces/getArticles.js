/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import { GET_MANUSCRIPTS } from '../../../queries/manuscripts'

const getArticlesQuery = <Query query={GET_MANUSCRIPTS} />

export default getArticlesQuery
