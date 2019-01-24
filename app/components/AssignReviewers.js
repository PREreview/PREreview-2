/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { clone } from 'lodash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { Accordion, Action, Button, H2, List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedAssignReviewers from './compose/AssignReviewers'
import { Select as DefaultSelect } from './ui'
import { TextField } from './formElements'
import { AddReviewerForm, AssignReviewersForm } from './form'
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
  flex-direction: column;
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
  margin: ${th('gridUnit')} 0;
  padding: calc(${th('gridUnit')} / 2);
`

const InviteSectionWrapper = styled.div`
  margin: calc(${th('gridUnit')} * 3) 0;
`

const InviteSection = props => {
  const { addExternalReviewer, articleId } = props

  return (
    <InviteSectionWrapper>
      <Action>Add a reviewer that is not in the system</Action>

      <AddReviewerForm
        addExternalReviewer={addExternalReviewer}
        articleId={articleId}
      >
        {formProps => {
          const { errors, values, ...rest } = formProps

          return (
            <React.Fragment>
              <TextField
                error={errors.name}
                label="Name"
                name="name"
                required
                value={values.name}
                {...rest}
              />

              <TextField
                error={errors.email}
                label="Email"
                name="email"
                required
                value={values.email}
                {...rest}
              />

              <Button primary type="submit">
                OK
              </Button>
            </React.Fragment>
          )
        }}
      </AddReviewerForm>
    </InviteSectionWrapper>
  )
}

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

const LinkWrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const ReviewerTable = props => {
  const {
    acceptedTeam,
    articleId,
    data,
    externalReviewers,
    inviteReviewer,
    invitedTeam,
    rejectedTeam,
  } = props

  const nameToUsername = externalReviewers.members.map(m => {
    const modified = clone(m)
    modified.username = modified.name
    delete modified.name
    return modified
  })

  const modifiedData = data.concat(nameToUsername)

  const rows = modifiedData.map(reviewer => {
    const item = clone(reviewer)
    item.status = 'Not invited'
    item.action = 'Invite'

    if (isMember(invitedTeam, item.id)) {
      item.status = 'Invited'
      item.action = 'Re-invite'
    }

    if (isMember(rejectedTeam, item.id)) {
      item.status = 'Rejected'
      item.action = '-'
    } else if (isMember(acceptedTeam, item.id)) {
      item.status = 'Accepted'
      item.action = '-'
    }

    return item
  })

  const sendInvitation = (aritcleId, reviewer) => {
    const { id: reviewerId } = reviewer

    inviteReviewer({
      variables: {
        articleId,
        reviewerId,
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

        if (value === '-') return value
        return (
          <Invite onClick={() => sendInvitation(articleId, original)}>
            {value}
          </Invite>
        )
      },
      Header: 'Action',
    },
  ]

  return (
    <React.Fragment>
      {(!modifiedData || modifiedData.length === 0) && (
        <EmptyMessage>There are currently no reviewers</EmptyMessage>
      )}

      {modifiedData &&
        modifiedData.length > 0 && (
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
    addExternalReviewer,
    articleId,
    externalReviewers,
    inviteReviewer,
    loading,
    suggested,
    reviewersTeam,
    reviewersAcceptedTeam,
    reviewersRejectedTeam,
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

      <LinkWrapper>
        <Action to={`/article/${articleId}`}>Back to Article</Action>
      </LinkWrapper>

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

        <InviteSection
          addExternalReviewer={addExternalReviewer}
          articleId={articleId}
        />
      </Section>

      <Section label="Status">
        <ReviewerTable
          acceptedTeam={reviewersAcceptedTeam}
          articleId={articleId}
          data={reviewers}
          externalReviewers={externalReviewers}
          invitedTeam={reviewersInvitedTeam}
          inviteReviewer={inviteReviewer}
          rejectedTeam={reviewersRejectedTeam}
        />
      </Section>
    </Centered>
  )
}

const Composed = () => <ComposedAssignReviewers render={AssignReviewers} />
export default Composed
