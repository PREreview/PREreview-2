/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { get } from 'lodash'

import { Action as UIAction, ActionGroup, Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedDashboard from './compose/Dashboard'

import { getCurrentStatus } from '../helpers/status'

import { GET_MANUSCRIPTS } from '../queries/manuscripts'
import DELETE_MANUSCRIPT from '../mutations/deleteManuscript'

import Loading from './Loading'
import AssignEditor from '././dashboard/AssignEditor'

const SubmitButton = props => {
  const { createSubmission, createTeam, currentUser, scienceOfficer } = props

  const onClick = () => {
    createSubmission().then(res => {
      const { id } = res.data.createSubmission

      const teams = [
        {
          members: [currentUser.id],
          name: `author-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'author',
        },
        {
          members: [],
          name: `editor-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'editor',
        },
        {
          members: [scienceOfficer.id],
          name: `science-officer-${id}`,
          object: {
            objectId: id,
            objectType: 'article',
          },
          teamType: 'scienceOfficer',
        },
      ]

      Promise.all(
        teams.map(team => createTeam({ variables: { data: team } })),
      ).then(response => {
        // console.log(response)
        props.history.push(`/submit/${id}`)
      })
    })
  }

  return (
    <Button onClick={onClick} primary>
      New Submission
    </Button>
  )
}

const SectionHeader = styled.h3`
  color: ${th('colorPrimary')};
  font-family: ${th('fontReading')};
  text-transform: uppercase;
`

const Section = props => {
  const { items, editors, label, updateTeam } = props
  return (
    <div>
      <SectionHeader>{label}</SectionHeader>
      {items &&
        items.length > 0 &&
        items.map(item => (
          <SectionItem
            data={item}
            editors={editors}
            key={item.id}
            updateTeam={updateTeam}
          />
        ))}
    </div>
  )
}

const StatusLabel = styled.span`
  font-size: ${th('fontSizeHeadingSmall')};
  text-transform: uppercase;
`

const Status = props => {
  const { status } = props
  const label = getCurrentStatus(status)

  return <StatusLabel>{label}</StatusLabel>
}

const Action = styled(UIAction)`
  line-height: unset;
`

const SectionItem = props => {
  const { data, editors } = props
  return (
    <React.Fragment>
      <Status status={data.status} />
      <SectionItemWrapper key={data.id}>
        <div>
          <SectionItemTitle>{data.title || 'Untitled'}</SectionItemTitle>
          {editors && <AssignEditor articleId={data.id} />}
        </div>

        <ActionGroup>
          <Action to={`/submit/${data.id}`}>Edit</Action>
          <Mutation
            mutation={DELETE_MANUSCRIPT}
            refetchQueries={[{ query: GET_MANUSCRIPTS }]}
          >
            {deleteManuscript => (
              <Action
                onClick={() => deleteManuscript({ variables: { id: data.id } })}
              >
                Delete
              </Action>
            )}
          </Mutation>
        </ActionGroup>
      </SectionItemWrapper>
    </React.Fragment>
  )
}

const SectionItemWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  max-width: 800px;

  div:last-child {
    margin-bottom: 3px;
  }

  &:hover {
    background: ${th('colorBackgroundHue')};
  }
`

const SectionItemTitle = styled.span`
  font-size: ${th('fontSizeHeading4')};
  font-family: ${th('fontReading')};
  line-height: ${th('lineHeightHeading4')};
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

  return (
    <React.Fragment>
      <SubmitButton
        createSubmission={createSubmission}
        createTeam={createTeam}
        currentUser={currentUser}
        history={history}
        scienceOfficer={globalScienceOfficerTeam.members[0]}
      />
      <Section items={articles} label="My Articles" />
      <Section
        editors={globalEditorTeam.members}
        items={editorItems}
        label="Editor Section"
      />
    </React.Fragment>
  )
}

const Composed = props => <ComposedDashboard render={Dashboard} {...props} />
export default withRouter(Composed)
