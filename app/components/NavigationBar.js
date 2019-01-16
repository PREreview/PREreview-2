/* eslint-disable react/prop-types */

import React from 'react'
// import PropTypes from 'prop-types'
import { Query, withApollo } from 'react-apollo'
import { matchPath } from 'react-router-dom'
import styled from 'styled-components'

import { Action, AppBar } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import { withCurrentUser } from '../userContext'
import { GET_ARTICLE } from './compose/pieces/getArticle'
import { isFullSubmissionReady } from '../helpers/status'

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
    <Query query={GET_ARTICLE} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return null
        const { manuscript: article } = data
        const { status } = article
        const full = isFullSubmissionReady(status)
        if (!full) return null

        return (
          <Authorize operation="isEditor" unauthorized={null}>
            <Action active={isReviewers} to={`/assign-reviewers/${id}`}>
              Assign Reviewers
            </Action>
          </Authorize>
        )
      }}
    </Query>
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

const NavigationBar = props => {
  const { currentUser, history, location } = props
  const links = navLinks(location, currentUser)

  const onLogoutClick = () => {
    props.client.cache.reset()
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <StyledBar
      brand="PREreview"
      navLinkComponents={links}
      onLogoutClick={onLogoutClick}
      user={currentUser}
    />
  )
}

// NavigationBar.propTypes = {
//   data: PropTypes.shape({
//     currentUser: PropTypes.shape({
//       admin: PropTypes.bool,
//       username: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired,
//   }).isRequired,
// }

export default withApollo(withCurrentUser(NavigationBar))
