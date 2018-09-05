/* eslint-disable react/prop-types */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USERS = gql`
  query GetUsers {
    users {
      admin
      id
      username
    }
  }
`

const GetUsersQuery = props => {
  const { render } = props

  return <Query query={GET_USERS}>{render}</Query>
}

export default GetUsersQuery
