/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Accordion, H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const suggested = [
  { email: 'user1@example.com', userId: 'user1', username: 'User One' },
  { email: 'user2@example.com', userId: 'user2', username: 'User Two' },
  { email: 'user3@example.com', userId: 'user3', username: 'User Three' },
]

// const usersPool = [
//   { email: 'user1@example.com', userId: 'user1', username: 'User One' },
//   { email: 'user2@example.com', userId: 'user2', username: 'User Two' },
//   { email: 'user3@example.com', userId: 'user3', username: 'User Three' },
//   { email: 'user4@example.com', userId: 'user4', username: 'User Four' },
//   { email: 'user5@example.com', userId: 'user5', username: 'User Five' },
//   { email: 'user6@example.com', userId: 'user6', username: 'User Six' },
//   { email: 'user7@example.com', userId: 'user7', username: 'User Seven' },
// ]

// const teamReviewers = [
//   {
//     email: 'user1@example.com',
//     status: 'accepted',
//     userId: 'user1',
//     username: 'User One',
//   },
//   {
//     email: 'user2@example.com',
//     status: 'rejected',
//     userId: 'user2',
//     username: 'User Two',
//   },
//   {
//     email: 'user3@example.com',
//     status: 'pending',
//     userId: 'user3',
//     username: 'User Three',
//   },
//   {
//     email: 'user4@example.com',
//     status: 'pending',
//     userId: 'user4',
//     username: 'User Four',
//   },
// ]

const PageWrapper = styled.div`
  margin: 0 auto;
  clear: both;
  max-width: ${props => {
    if (props.minWidth) {
      return props.minWidth
    }
    return '1024'
  }}px;
`

const PageHeading = styled(H2)`
  margin: 0 auto calc(${th('gridUnit')} * 3);
  padding: 0 calc(${th('gridUnit')} * 2);
  text-align: center;
`

const ContentWrapper = styled.div`
  display: flex;
`

const AccordionWrapper = styled.div`
  margin: 0 auto calc(${th('gridUnit')} * 2);
`
const SuggestedReviewer = styled.span`
  background-color: ${th('colorSecondary')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  padding: calc(${th('gridUnit')} / 2);
  margin: 0 ${th('gridUnit')};
`

const SuggestedReviewers = props => {
  const { suggestedReviewers } = props
  return suggestedReviewers.map(reviewer => (
    <SuggestedReviewer>{reviewer.username}</SuggestedReviewer>
  ))
}

const AssignReviewers = props => (
  <PageWrapper>
    <PageHeading>Assign Reviewers</PageHeading>
    <AccordionWrapper>
      <Accordion label="Suggested Reviewers" startExpanded>
        <ContentWrapper>
          <SuggestedReviewers suggestedReviewers={suggested} />
        </ContentWrapper>
      </Accordion>
    </AccordionWrapper>
    <AccordionWrapper>
      <Accordion label="Pool of Reviewers">
        <ContentWrapper>Something else</ContentWrapper>
      </Accordion>
    </AccordionWrapper>
    <AccordionWrapper>
      <Accordion label="Invite Reviewers">
        <ContentWrapper>Something else 2</ContentWrapper>
      </Accordion>
    </AccordionWrapper>
    <AccordionWrapper>
      <Accordion label="Stats">
        <ContentWrapper>Something else 3</ContentWrapper>
      </Accordion>
    </AccordionWrapper>
  </PageWrapper>
)
export default AssignReviewers
