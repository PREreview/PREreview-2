/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Button as UIButton, H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'
import { getGlobalTeamMembersByType } from '../helpers/teams'

import {
  getDecision,
  isAccepted,
  isApprovedByScienceOfficer,
  isNotApprovedByScienceOfficer,
  isRejected,
} from '../helpers/status'

import {
  DecisionSection,
  Discuss,
  EditorPanelMetadata,
  EditorPanelRibbon,
  PanelInfo,
  ReviewerInfo,
  ScienceOfficerSection,
} from './ui'

// const validationSchema = yup.object().shape({
//   content: yup.string(),
//   decisionLetter: yup.string().nullable(),
// })

const Wrapper = styled.div`
  padding-right: calc(${th('gridUnit')} * 2);
`

const Header = styled(H2)`
  color: ${th('colorText')};
`

const Button = styled(UIButton)`
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const Message = styled.div`
  color: ${th('colorTextPlaceholder')};
  text-transform: uppercase;
`

const SendTo = props => {
  const {
    article,
    currentUser,
    editor,
    globalTeams,
    scienceOfficer,
    updateCurrentlyWith,
  } = props

  const editors = getGlobalTeamMembersByType(globalTeams, 'editors')
  let sendToId, sendToLabel

  if (editors.find(user => user.id === currentUser.id)) {
    sendToId = scienceOfficer && scienceOfficer.id
    sendToLabel = 'Science Officer'
  } else if (scienceOfficer && scienceOfficer.id === currentUser.id) {
    sendToId = editor && editor.id
    sendToLabel = 'Editor'
  }

  if (!sendToId) return null

  const sendTo = () => {
    const data = {
      currentlyWith: sendToId,
      id: article.id,
    }

    updateCurrentlyWith({ variables: { data } })
  }

  if (article.currentlyWith === sendToId) {
    return <Message>{`With ${sendToLabel}`}</Message>
  }

  return (
    <Button onClick={sendTo} primary>
      Send to {sendToLabel}
    </Button>
  )
}

const EditorPanel = props => {
  const {
    article,
    currentUser,
    editor,
    editorSuggestedReviewers,
    globalTeams,
    loading,
    reviewerCounts,
    reviews,
    scienceOfficer,
    updateArticle,
    updateCurrentlyWith,
    updateMetadata,
  } = props

  if (loading) return <Loading />

  const { status } = article
  const decision = getDecision(status)

  const alreadyRejected = isRejected(status)
  const approved = isApprovedByScienceOfficer(status)
  const notApproved = isNotApprovedByScienceOfficer(status)
  const scienceOfficerHasDecision = approved || notApproved

  const deriveRibbonStatus = () => {
    if (isAccepted(status)) return 'accepted'
    if (isRejected(status)) return 'rejected'
    if (decision === 'revise') return 'revise'
    if (approved) return 'scienceOfficerApproved'
    if (notApproved) return 'scienceOfficerDeclined'
    if (!scienceOfficerHasDecision) return 'scienceOfficerPending'
    return null
  }

  return (
    <Wrapper>
      <Header>Editor Panel</Header>

      {!loading && (
        <React.Fragment>
          <PanelInfo editor={editor} scienceOfficer={scienceOfficer} />
          <EditorPanelRibbon type={deriveRibbonStatus()} />

          <SendTo
            article={article}
            currentUser={currentUser}
            editor={editor}
            globalTeams={globalTeams}
            scienceOfficer={scienceOfficer}
            updateCurrentlyWith={updateCurrentlyWith}
          />

          {!alreadyRejected &&
            !decision && (
              <Authorize operation="isScienceOfficer" unauthorized={null}>
                <ScienceOfficerSection
                  article={article}
                  editorSuggestedReviewers={editorSuggestedReviewers}
                  updateArticle={updateArticle}
                />
              </Authorize>
            )}

          <EditorPanelMetadata
            articleId={article.id}
            doi={article.doi}
            updateMetadata={updateMetadata}
          />

          <ReviewerInfo
            articleId={article.id}
            reviewerCounts={reviewerCounts}
            reviews={reviews}
          />

          <DecisionSection article={article} updateArticle={updateArticle} />

          <Discuss
            article={article}
            currentUser={currentUser}
            updateArticle={updateArticle}
          />
        </React.Fragment>
      )}
    </Wrapper>
  )
}

const Composed = () => <ComposedEditorPanel render={EditorPanel} />
export default Composed
