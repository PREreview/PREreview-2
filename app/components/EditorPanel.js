/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { State } from 'react-powerplug'

import { H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'

import {
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
  RejectArticle,
  ReviewerInfo,
  ScienceOfficerSection,
} from './ui'

// const validationSchema = yup.object().shape({
//   content: yup.string(),
//   decisionLetter: yup.string().nullable(),
// })

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

  const accepted = isAccepted(status)
  const alreadyRejected = isRejected(status)
  const approved = isApprovedByScienceOfficer(status)
  const notApproved = isNotApprovedByScienceOfficer(status)
  const scienceOfficerHasDecision = approved || notApproved

  const initialState = {
    rejectedCheck: false,
    ribbonStatus: null,
  }

  return (
    <State initial={initialState}>
      {({ state, setState }) => {
        const { rejectedCheck, ribbonStatus } = state

        // HACK -- Find a more elegant way to handle this
        if (accepted && ribbonStatus !== 'accepted') {
          setState({ ribbonStatus: 'accepted' })
        } else if (
          !accepted &&
          alreadyRejected &&
          ribbonStatus !== 'rejected'
        ) {
          setState({ ribbonStatus: 'rejected' })
        } else if (
          !accepted &&
          !alreadyRejected &&
          approved &&
          ribbonStatus !== 'scienceOfficerApproved'
        ) {
          setState({ ribbonStatus: 'scienceOfficerApproved' })
        } else if (
          !accepted &&
          !alreadyRejected &&
          !approved &&
          notApproved &&
          ribbonStatus !== 'scienceOfficerDeclined'
        ) {
          setState({ ribbonStatus: 'scienceOfficerDeclined' })
        }

        const toggleRejectionWarning = () => {
          setState({
            rejectedCheck: !rejectedCheck,
            ribbonStatus: rejectedCheck ? null : 'rejectionWarning',
          })
        }

        return (
          <React.Fragment>
            <Header>Editor Panel</Header>

            {!loading && (
              <React.Fragment>
                <PanelInfo editor={editor} scienceOfficer={scienceOfficer} />

                <EditorPanelRibbon type={ribbonStatus} />

                {!scienceOfficerHasDecision && (
                  <RejectArticle
                    alreadyRejected={alreadyRejected}
                    article={article}
                    checked={rejectedCheck}
                    update={toggleRejectionWarning}
                    updateArticle={updateArticle}
                  />
                )}

                {!alreadyRejected &&
                  !rejectedCheck && (
                    <React.Fragment>
                      <ScienceOfficerSection
                        article={article}
                        updateArticle={updateArticle}
                      />
                      <ReviewerInfo articleId={article.id} />
                    </React.Fragment>
                  )}

                {/* {approved && ( */}
                <DecisionSection
                  article={article}
                  updateArticle={updateArticle}
                />
                {/* )} */}

                <Discuss
                  article={article}
                  currentUser={currentUser}
                  updateArticle={updateArticle}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )
      }}
    </State>
  )
}

const Composed = () => <ComposedEditorPanel render={EditorPanel} />
export default Composed
