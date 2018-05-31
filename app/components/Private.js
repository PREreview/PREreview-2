import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Redirect, withRouter } from 'react-router-dom'

import CURRENT_USER from '../queries/currentUser'

const Private = ({ children, location }) => (
  <Query query={CURRENT_USER}>
    {({ loading }) => {
      if (loading) return 'Loading...'

      if (!localStorage.getItem('token')) {
        const { pathname, search = '' } = location
        const url = pathname + search
        return <Redirect to={`/login?next=${url}`} />
      }

      return children
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

export default withRouter(Private)
