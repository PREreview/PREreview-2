import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Action, AppBar } from '@pubsweet/ui'

import CURRENT_USER from '../queries/currentUser'

const StyledBar = styled(AppBar)`
  flex: initial;
`

const navLinks = (location, currentUser) => {
  const isDashboard = location.pathname.match(/dashboard/g)
  const isAssignReviewers = location.pathname.match(/assign_reviewers/g)
  const isSubmit = location.pathname.match(/submit/g)
  const isTeamManager = location.pathname.match(/teams/g)

  const isAdmin = currentUser && currentUser.admin

  const dashboardLink = (
    <Action active={isDashboard} to="/dashboard">
      Dashboard
    </Action>
  )
  const assignEditorsLink = (
    <Action active={isAssignReviewers} to="/assign_reviewers">
      Assign Reviewers
    </Action>
  )
  const submitLink = (
    <Action active={isSubmit} to="/submit">
      Article
    </Action>
  )

  const teamsLink = (
    <Action active={isTeamManager} to="/teams">
      Team Manager
    </Action>
  )

  const links = [dashboardLink, assignEditorsLink]

  if (isSubmit) links.push(submitLink)
  if (isAdmin) links.push(teamsLink)

  return links
}

const NavigationBar = ({
  data: { currentUser },
  location,
  history,
  ...props
}) => {
  const links = navLinks(location, currentUser)

  const onLogoutClick = () => {
    // eslint-disable-next-line react/prop-types
    props.client.cache.reset()
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <StyledBar
      brand="MicroPublications"
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
