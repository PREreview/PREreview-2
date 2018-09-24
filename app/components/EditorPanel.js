/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'

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

const EditorPanel = props => {
  const {
    article,
    currentUser,
    editor,
    loading,
    scienceOfficer,
    updateArticle,
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

          {!alreadyRejected &&
            !decision && (
              <ScienceOfficerSection
                article={article}
                updateArticle={updateArticle}
              />
            )}

          <ReviewerInfo articleId={article.id} />

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
