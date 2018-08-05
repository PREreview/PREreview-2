/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'
import {
  get,
  // without,
} from 'lodash'

import { Action as UIAction, ActionGroup, Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import CREATE_SUBMISSION from '../mutations/createSubmission'
import {
  // GET_MANUSCRIPT,
  GET_MANUSCRIPTS,
} from '../queries/manuscripts'
import DELETE_MANUSCRIPT from '../mutations/deleteManuscript'

import Loading from './Loading'

const SubmitButton = props => {
  const onClick = () => {
    props.createSubmission().then(res => {
      const { id } = res.data.createSubmission
      props.history.push(`/submit/${id}`)
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
  const { items, label } = props
  return (
    <div>
      <SectionHeader>{label}</SectionHeader>
      {items &&
        items.length > 0 &&
        items.map(item => <SectionItem data={item} key={item.id} />)}
    </div>
  )
}

const StatusLabel = styled.span`
  font-size: ${th('fontSizeHeadingSmall')};
  text-transform: uppercase;
`

const Status = props => {
  const { status } = props
  let text

  if (!status.initialSubmission) text = 'Not Submitted'
  if (status.initialSubmission && !status.dataTypeSelected)
    text = 'Initial Submission ready'
  if (status.dataTypeSelected) text = 'Datatype selected'
  if (status.submitted) text = 'Submitted'

  return <StatusLabel>{text}</StatusLabel>
}

const Action = styled(UIAction)`
  line-height: unset;
`

const SectionItem = props => {
  const { data } = props
  return (
    <React.Fragment>
      <Status status={data.status} />
      <SectionItemWrapper key={data.id}>
        <SectionItemTitle>{data.title || 'Untitled'}</SectionItemTitle>
        <ActionGroup>
          <Action to={`/submit/${data.id}`}>Edit</Action>
          <Mutation
            mutation={DELETE_MANUSCRIPT}
            refetchQueries={[
              // { query: GET_MANUSCRIPT, variables: { id: data.id } },
              { query: GET_MANUSCRIPTS },
            ]}
            // update={(cache, { data: { deleteManuscript } }) => {
            //   const { manuscripts } = cache.readQuery({
            //     query: GET_MANUSCRIPTS,
            //   })

            //   // const a = cache.readQuery({
            //   //   query: GET_MANUSCRIPT,
            //   //   variables: { id: deleteManuscript },
            //   // })

            //   // console.log(a)

            //   const toRemove = manuscripts.find(
            //     item => item.id === deleteManuscript,
            //   )

            //   cache.writeQuery({
            //     data: { manuscripts: without(manuscripts, toRemove) },
            //     query: GET_MANUSCRIPTS,
            //   })
            // }}
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
  /* border-bottom: 1px dashed black; */
  display: flex;
  justify-content: space-between;
  /* padding: ${th('gridUnit')}; */
  /* position: relative; */
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
  const { history } = props

  return (
    <Query query={GET_MANUSCRIPTS}>
      {response => {
        if (response.loading) {
          // console.log('not yet')
          return <Loading />
        }

        const items = get(response, 'data.manuscripts')
        // console.log(items)

        // const authoredItems
        const editorItems =
          items && items.filter(item => get(item, 'status.initialSubmission'))

        return (
          <div>
            <Mutation
              mutation={CREATE_SUBMISSION}
              update={(cache, { data: { createSubmission } }) => {
                // console.log(data)
                const { manuscripts } = cache.readQuery({
                  query: GET_MANUSCRIPTS,
                })

                // console.log(cache)

                cache.writeQuery({
                  data: { manuscripts: manuscripts.push(createSubmission) },
                  query: GET_MANUSCRIPTS,
                })
              }}
            >
              {(createSubmission, more) => (
                <SubmitButton
                  createSubmission={createSubmission}
                  history={history}
                />
              )}
            </Mutation>
            <Section items={items} label="My Articles" />
            <Section items={editorItems} label="Editor Section" />
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(Dashboard)
