/* eslint-disable react/prop-types */

import React from 'react'
import { State } from 'react-powerplug'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'

import {
  isApprovedByScienceOfficer,
  isNotApprovedByScienceOfficer,
  isRejected,
} from '../helpers/status'

import {
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

  const alreadyRejected = isRejected(status)
  const approved = isApprovedByScienceOfficer(status)
  const notApproved = isNotApprovedByScienceOfficer(status)

  const initialState = {
    rejectedCheck: false,
    ribbonStatus: null,
  }

  return (
    <State initial={initialState}>
      {({ state, setState }) => {
        const { rejectedCheck, ribbonStatus } = state

        // HACK -- Find a more elegant way to handle this
        if (alreadyRejected && ribbonStatus !== 'rejected') {
          setState({ ribbonStatus: 'rejected' })
        } else if (
          !alreadyRejected &&
          approved &&
          ribbonStatus !== 'scienceOfficerApproved'
        ) {
          setState({ ribbonStatus: 'scienceOfficerApproved' })
        } else if (
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
            <h1>Editor Panel </h1>
            {!loading && (
              <React.Fragment>
                <PanelInfo editor={editor} scienceOfficer={scienceOfficer} />

                <EditorPanelRibbon type={ribbonStatus} />

                <RejectArticle
                  alreadyRejected={alreadyRejected}
                  article={article}
                  checked={rejectedCheck}
                  update={toggleRejectionWarning}
                  updateArticle={updateArticle}
                />

                {!alreadyRejected &&
                  !rejectedCheck && (
                    <React.Fragment>
                      <ScienceOfficerSection
                        article={article}
                        updateArticle={updateArticle}
                      />
                      <ReviewerInfo />
                    </React.Fragment>
                  )}

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
