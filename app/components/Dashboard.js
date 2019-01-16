/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Action as UIAction } from '@pubsweet/ui'
import {
  AuthorSectionItem,
  EditorSectionItem,
  ReviewerSectionItem,
  Section,
} from './ui'

import ComposedDashboard from './compose/Dashboard'
import Loading from './Loading'
import { GET_DASHBOARD_ARTICLES } from './compose/pieces/getDashboardArticles'
import { CURRENT_USER } from './Private'

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
          members: scienceOfficer ? [scienceOfficer.id] : [],
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

          TO DO -- Substitute these queries with subscriptions
        */

        // Need to get the user to have user.teams updated
        // All this must go when the authsome mode can stop relying on
        // the data it gets for user.teams from the cache
        client
          .query({
            fetchPolicy: 'network-only',
            query: CURRENT_USER,
          })
          .then(() => {
            client.query({
              fetchPolicy: 'network-only',
              query: GET_DASHBOARD_ARTICLES,
              variables: { currentUserId: currentUser.id },
            })

            history.push(`/article/${id}`)
          })
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
    authorArticles,
    client,
    createReview,
    createSubmission,
    createTeam,
    currentUser,
    deleteArticle,
    editorArticles,
    globalEditorTeam,
    globalScienceOfficerTeam,
    handleInvitation,
    history,
    isGlobal,
    loading,
    reviewerArticles,
  } = props

  if (loading) return <Loading />

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

    handleInvitation({ variables }).then(res => {
      if (action === 'accept') {
        const reviewInput = {
          articleVersionId: articleId,
          reviewerId: currentUser.id,
        }

        createReview({ variables: { input: reviewInput } })
      }
    })
  }

  return (
    <DashboardWrapper>
      <Section
        actions={headerActions}
        deleteArticle={deleteArticle}
        itemComponent={AuthorSectionItem}
        items={authorArticles}
        label="My Articles"
      />

      <Section
        handleInvitation={respondToInvitation}
        itemComponent={ReviewerSectionItem}
        items={reviewerArticles}
        label="Reviews"
      />

      {isGlobal && (
        <Section
          editors={globalEditorTeam.members}
          itemComponent={EditorSectionItem}
          items={editorArticles}
          label="Editor Section"
        />
      )}
    </DashboardWrapper>
  )
}

const Composed = props => <ComposedDashboard render={Dashboard} {...props} />
export default Composed
