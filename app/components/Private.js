import React from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
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
/* 
  This will check whether the user has been saved to a temporary team before
  they signed up, and will move them to proper teams now that they are a user.

  This shouldn't be here, and will be moved to a "sign-up hook" once such a
  thing exists.
*/
const NORMALIZE_TEAM_MEMBERSHIP = gql`
  mutation NormalizeTeamMembership($userId: ID!) {
    normalizeTeamMembership(userId: $userId)
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
        <Mutation
          mutation={NORMALIZE_TEAM_MEMBERSHIP}
          variables={{ userId: data.currentUser.id }}
        >
          {(normalizeTeamMembership, normalizeTeamMembershipResponse) => {
            if (!normalizeTeamMembershipResponse.called) {
              normalizeTeamMembership() // .then(() => console.log('in there')
            }

            return (
              <CurrentUserProvider value={{ currentUser }}>
                {children}
              </CurrentUserProvider>
            )
          }}
        </Mutation>
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
