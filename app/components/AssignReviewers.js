/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { clone, union } from 'lodash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { Accordion, Action, Button, H2, List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedAssignReviewers from './compose/AssignReviewers'
import { Select as DefaultSelect } from './ui'
import { AssignReviewersForm } from './form'
import Loading from './Loading'
import { isMember } from '../helpers/teams'

const Centered = styled.div`
  margin: 0 auto;
  /* max-width: 770px; */
  width: 60%;

  > div {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }
`

const Invite = styled(Action)`
  line-height: unset;
`

const Table = styled(ReactTable)`
  width: 100%;

  .rt-tbody {
    text-align: center;
  }

  .rt-th {
    &:focus {
      outline: none;
    }
  }

  div.rt-noData {
    display: none;
  }
`

const PageHeading = styled(H2)`
  margin: 0 auto calc(${th('gridUnit')} * 3);
  padding: 0 calc(${th('gridUnit')} * 2);
  text-align: center;
`

const ContentWrapper = styled.div`
  cursor: default;
  display: flex;
  margin-left: ${th('gridUnit')};

  form {
    width: 100%;

    button {
      margin-top: calc(${th('gridUnit')} * 2);
    }
  }
`

const Select = styled(DefaultSelect)`
  max-width: unset !important;
  width: 100%;
`

const Tag = styled.span`
  background-color: ${th('colorBackgroundHue')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  padding: calc(${th('gridUnit')} / 2);
  margin: ${th('gridUnit')} 0;
`

const SuggestedReviewer = props => {
  const { name } = props
  return <Tag>{name}</Tag>
}

const SuggestedReviewers = props => {
  const { data } = props
  if (!data || data.length === 0) return null
  const items = data.map(item => {
    const i = clone(item)
    i.id = i.WBId
    return i
  })

  return <List component={SuggestedReviewer} items={items} />
}

const Section = ({ children, label }) => (
  <Accordion label={label} startExpanded>
    <ContentWrapper>{children}</ContentWrapper>
  </Accordion>
)

const EmptyMessage = styled.div`
  color: ${th('colorTextPlaceholder')};
  margin: 0 auto;
`

const ReviewerTable = props => {
  const { data, invitedTeam, updateTeam } = props

  const rows = data.map(reviewer => {
    const item = clone(reviewer)
    item.status = 'Not invited'
    item.action = 'Invite'

    if (isMember(invitedTeam, item.id)) {
      item.status = 'Invited'
      item.action = 'Re-invite'
    }

    return item
  })

  const sendInvitation = reviewer => {
    const { id } = reviewer
    const invitedMemberIds = invitedTeam.members.map(member => member.id)

    updateTeam({
      variables: {
        id: invitedTeam.id,
        input: {
          members: union([id], invitedMemberIds),
        },
      },
    })
  }

  const columns = [
    {
      accessor: 'username',
      Header: 'Username',
    },
    {
      accessor: 'status',
      Header: 'Status',
    },
    {
      accessor: 'action',
      Cell: context => {
        const { original, value } = context
        return <Invite onClick={() => sendInvitation(original)}>{value}</Invite>
      },
      Header: 'Action',
    },
  ]

  return (
    <React.Fragment>
      {(!data || data.length === 0) && (
        <EmptyMessage>There are currently no reviewers</EmptyMessage>
      )}

      {data &&
        data.length > 0 && (
          <Table
            className="-striped -highlight"
            columns={columns}
            data={rows}
            minRows={0}
            resizable={false}
            showPagination={false}
          />
        )}
    </React.Fragment>
  )
}

const AssignReviewers = props => {
  const {
    loading,
    suggested,
    reviewersTeam,
    reviewersInvitedTeam,
    users,
    updateTeam,
    ...otherProps
  } = props

  if (loading) return <Loading />

  let suggestedReviewers
  if (suggested && suggested.name && suggested.name.length > 0)
    suggestedReviewers = [suggested]

  const userOptions = users
    ? users.map(user => ({
        label: user.username,
        value: user.id,
      }))
    : []

  const reviewers = reviewersTeam.members

  return (
    <Centered>
      <PageHeading>Assign Reviewers</PageHeading>

      <Section label="Suggested Reviewer by the Author">
        <SuggestedReviewers data={suggestedReviewers} />
      </Section>

      <Section label="Assign Reviewers to Article">
        <AssignReviewersForm
          reviewers={reviewers}
          reviewersTeamId={reviewersTeam.id}
          updateTeam={updateTeam}
          {...otherProps}
        >
          {formProps => {
            const { dirty, setFieldValue, values } = formProps

            const handleChange = newValue =>
              setFieldValue('reviewers', newValue)

            return (
              <React.Fragment>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  name="reviewers"
                  onChange={handleChange}
                  options={userOptions}
                  value={values.reviewers}
                />

                <Button disabled={!dirty} primary type="submit">
                  Save
                </Button>
              </React.Fragment>
            )
          }}
        </AssignReviewersForm>
      </Section>

      <Section label="Status">
        <ReviewerTable
          data={reviewers}
          invitedTeam={reviewersInvitedTeam}
          updateTeam={updateTeam}
        />
      </Section>
    </Centered>
  )
}

const Composed = () => <ComposedAssignReviewers render={AssignReviewers} />
export default Composed