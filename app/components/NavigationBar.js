import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { matchPath, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Action, AppBar } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import CURRENT_USER from '../queries/currentUser'

const StyledBar = styled(AppBar)`
  flex: initial;

  > div:first-child > span:first-child {
    background: ${th('colorPrimary')};
    height: calc(${th('gridUnit')} * 9);
    margin: 0 calc(${th('gridUnit')} * 3) 0 0;
    padding: calc(${th('gridUnit')} * 3) 1rem;

    a {
      color: ${th('colorTextReverse')};
    }
  }
`

const navLinks = (location, currentUser) => {
  const isDashboard = location.pathname.match(/dashboard/g)
  const isArticle = location.pathname.match(/article/g)
  const isReviewers = location.pathname.match(/assign-reviewers/g)
  const isTeamManager = location.pathname.match(/teams/g)

  const isAdmin = currentUser && currentUser.admin

  const path = `/${isArticle ? 'article' : 'assign-reviewers'}/:id`
  const match = matchPath(location.pathname, { path })
  let id
  if (match) ({ id } = match.params)

  const dashboardLink = (
    <Action active={isDashboard} to="/dashboard">
      Dashboard
    </Action>
  )

  const submitLink = (
    <Action active={isArticle} to={`/article/${id}`}>
      Article
    </Action>
  )

  const reviewersLink = (
    <Action active={isReviewers} to={`/assign-reviewers/${id}`}>
      Assign Reviewers
    </Action>
  )

  const teamsLink = (
    <Action active={isTeamManager} to="/teams">
      Team Manager
    </Action>
  )

  const links = [dashboardLink]

  if (isArticle || isReviewers) {
    links.push(submitLink)
    links.push(reviewersLink)
  }

  if (isAdmin) links.push(teamsLink)

  return links
}

const NavigationBar = ({
  data: { currentUser },
  history,
  location,
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
