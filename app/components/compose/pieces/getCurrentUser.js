/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'

import CURRENT_USER from '../../../queries/currentUser'

const getCurrentUserQuery = <Query query={CURRENT_USER} />

export default getCurrentUserQuery
