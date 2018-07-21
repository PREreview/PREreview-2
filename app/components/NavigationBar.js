import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { Action, AppBar } from '@pubsweet/ui'

import CURRENT_USER from '../queries/currentUser'

// TODO -- use classname on appbar in ui

const navLinks = location => {
  const isDashboard = location.pathname.match(/dashboard/g)
  const isSubmit = location.pathname.match(/submit/g)

  // console.log('submit', isSubmit)

  const dashboardLink = (
    <Action active={isDashboard} to="/dashboard">
      Dashboard
    </Action>
  )

  const submitLink = (
    <Action active={isSubmit} to="/submit">
      Article
    </Action>
  )

  const links = [dashboardLink]

  if (isSubmit) links.push(submitLink)

  return links
}

const NavigationBar = ({ data: { currentUser }, location, history }) => {
  // const navLinks = [
  //   <Action active={location.pathname.match(/dashboard/g)} to="/dashboard">
  //     Dashboard
  //   </Action>,
  //   <Action active={location.pathname.match(/submit/g)} to="/submit">
  //     Submit
  //   </Action>,
  // ]
  const links = navLinks(location)

  const onLogoutClick = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <AppBar
      brand="WormBase"
      navLinkComponents={links}
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
