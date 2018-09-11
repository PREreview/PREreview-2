/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Action, ActionGroup } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import TitleWithActions from './TitleWithActions'

const ReviewerSectionItem = props => {
  const {
    handleInvitation,
    id: articleId,
    reviewerStatus: status,
    title,
  } = props
  let actions

  const onInvitationClick = action => handleInvitation(articleId, action)

  const InvitationActions = (
    <ActionGroup>
      <Action onClick={() => onInvitationClick('accept')}>
        Accept Invitation
      </Action>
      <Action onClick={() => onInvitationClick('reject')}>
        Reject Invitation
      </Action>
    </ActionGroup>
  )

  const ReviewLink = (
    <ActionGroup>
      <Action to={`/article/${articleId}`}>Review</Action>
    </ActionGroup>
  )

  const RejectNotification = styled.div`
    color: ${th('colorError')};
  `

  if (status === 'pendingDecision') actions = InvitationActions
  if (status === 'accepted') actions = ReviewLink
  if (status === 'rejected')
    actions = <RejectNotification>Invitation Rejected</RejectNotification>

  return <TitleWithActions rightComponent={actions} title={title} />
}

export default ReviewerSectionItem
