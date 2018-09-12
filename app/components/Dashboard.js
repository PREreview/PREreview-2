/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'lodash'

import { Action as UIAction } from '@pubsweet/ui'
import { ReviewerSectionItem, Section } from './ui'

import ComposedDashboard from './compose/Dashboard'
import Loading from './Loading'
import { GET_DASHBOARD_ARTICLES } from './compose/pieces/getDashboardArticles'

const SubmitButton = props => {
  const {
    client,
    createSubmission,
    createTeam,
    currentUser,
    history,
    scienceOfficer,
  } = props

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
        // Invited reviewers team with no one assigned yet
        {
          members: [],
          name: `reviewers-invited-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'reviewersInvited',
        },
        // Reviewers that accepted with no one assigned yet
        {
          members: [],
          name: `reviewers-accepted-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'reviewersAccepted',
        },
        // Reviewers that rejected with no one assigned yet
        {
          members: [],
          name: `reviewers-rejected-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'reviewersRejected',
        },
      ]

      // Create all, then redirect
      Promise.all(
        teams.map(team => createTeam({ variables: { data: team } })),
      ).then(response => {
        /*
          Manually refetch articles from server.
          Cannot use refetch on create, as the teams will not have been
          created yet, so there is no way see that this article belongs to
          this author.
        */
        client.query({
          fetchPolicy: 'network-only',
          query: GET_DASHBOARD_ARTICLES,
          variables: { currentUserId: currentUser.id },
        })

        history.push(`/article/${id}`)
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
    authorArticles,
    client,
    createSubmission,
    createTeam,
    currentUser,
    deleteArticle,
    globalEditorTeam,
    globalScienceOfficerTeam,
    handleInvitation,
    history,
    loading,
    reviewerArticles,
  } = props

  if (loading) return <Loading />

  const editorItems =
    articles && articles.filter(item => get(item, 'status.submission.initial'))

  const headerActions = [
    <SubmitButton
      client={client}
      createSubmission={createSubmission}
      createTeam={createTeam}
      currentUser={currentUser}
      history={history}
      key="createSubmission"
      scienceOfficer={globalScienceOfficerTeam.members[0]}
    />,
  ]

  const respondToInvitation = (articleId, action) => {
    const variables = {
      action,
      articleId,
      currentUserId: currentUser.id,
    }

    handleInvitation({ variables })
  }

  return (
    <DashboardWrapper>
      <Section
        actions={headerActions}
        deleteArticle={deleteArticle}
        items={authorArticles}
        label="My Articles"
      />

      <Section
        handleInvitation={respondToInvitation}
        itemComponent={ReviewerSectionItem}
        items={reviewerArticles}
        label="Reviews"
      />

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
