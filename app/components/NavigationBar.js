import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Action, AppBar } from '@pubsweet/ui'

import CURRENT_USER from '../queries/currentUser'

// TODO -- move to theme
// TODO -- use classname on appbar in ui
const StyledBar = styled(AppBar)`
  box-shadow: 0 0 3px black;
`

const NavigationBar = ({ data: { currentUser }, location, history }) => {
  const navLinks = [
    <Action active={location.pathname.match(/dashboard/g)} to="/dashboard">
      Dashboard
    </Action>,
    <Action active={location.pathname.match(/submit/g)} to="/submit">
      Submit
    </Action>,
  ]

  const onLogoutClick = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <StyledBar
      brand="WormBase"
      navLinkComponents={navLinks}
      onLogoutClick={onLogoutClick}
      user={currentUser}
    />
  )
}

NavigationBar.propTypes = {
  data: PropTypes.shape({
    currentUser: PropTypes.shape({
      admin: PropTypes.bool,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default () => (
  <Query query={CURRENT_USER}>{withRouter(NavigationBar)}</Query>
)
