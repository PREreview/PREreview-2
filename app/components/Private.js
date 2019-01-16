import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'
import { pick } from 'lodash'
import gql from 'graphql-tag'

import { CurrentUserProvider } from '../userContext'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      admin
      id
      teams {
        id
      }
      username
    }
  }
`

const Private = ({ children, location }) => (
  <Query query={CURRENT_USER}>
    {({ client, data, error, loading, networkStatus }) => {
      if (loading) return null

      // remove invalid token and prepare for login redirect
      if (
        (networkStatus === 7 &&
          !loading &&
          !error &&
          data.currentUser === null) ||
        error
      ) {
        client.cache.reset()
        localStorage.removeItem('token')
      }

      if (!localStorage.getItem('token')) {
        const { pathname, search = '' } = location
        const url = pathname + search
        return <Redirect to={`/login?next=${url}`} />
      }

      const currentUser = pick(data.currentUser, ['admin', 'id', 'username'])

      return (
        <CurrentUserProvider value={{ currentUser }}>
          {children}
        </CurrentUserProvider>
      )
    }}
  </Query>
)

Private.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
}

export { CURRENT_USER }
export default withRouter(Private)
