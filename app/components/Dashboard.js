/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'lodash'

import { Action as UIAction } from '@pubsweet/ui'
import { Section } from './ui'

import ComposedDashboard from './compose/Dashboard'
import Loading from './Loading'

const SubmitButton = props => {
  const { createSubmission, createTeam, currentUser, scienceOfficer } = props

  const onClick = () => {
    createSubmission().then(res => {
      const { id } = res.data.createSubmission

      // Create teams for article
      const teams = [
        // Author team with current user as member
        {
          members: [currentUser.id],
          name: `author-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'author',
        },
        // Editor team with no one assigned yet
        {
          members: [],
          name: `editor-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'editor',
        },
        // Science officer team with first (and only) SO pre-assigned
        {
          members: [scienceOfficer.id],
          name: `science-officer-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'scienceOfficer',
        },
        // Reviewer team with no one assigned yet
        {
          members: [],
          name: `reviewers-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'reviewers',
        },
      ]

      // Create all, then redirect
      Promise.all(
        teams.map(team => createTeam({ variables: { data: team } })),
      ).then(response => {
        props.history.push(`/article/${id}`)
      })
    })
  }

  return <Action onClick={onClick}>New Submission</Action>
}

const Action = styled(UIAction)`
  line-height: unset;
`

const DashboardWrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`

const Dashboard = props => {
  const {
    articles,
    createSubmission,
    createTeam,
    currentUser,
    globalEditorTeam,
    globalScienceOfficerTeam,
    history,
    loading,
  } = props

  if (loading) return <Loading />

  const editorItems =
    articles && articles.filter(item => get(item, 'status.submission.initial'))

  const headerActions = [
    <SubmitButton
      createSubmission={createSubmission}
      createTeam={createTeam}
      currentUser={currentUser}
      history={history}
      key="createSubmission"
      scienceOfficer={globalScienceOfficerTeam.members[0]}
    />,
  ]

  return (
    <DashboardWrapper>
      <Section actions={headerActions} items={articles} label="My Articles" />
      <Section
        editors={globalEditorTeam.members}
        items={editorItems}
        label="Editor Section"
      />
    </DashboardWrapper>
  )
}

const Composed = props => <ComposedDashboard render={Dashboard} {...props} />
export default withRouter(Composed)
