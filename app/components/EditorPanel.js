/* eslint-disable react/prop-types */

import React from 'react'
import { State } from 'react-powerplug'
import { assign } from 'lodash'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'

import { isRejected } from '../helpers/status'

import { Discuss, PanelInfo, RejectArticle, ReviewerInfo, Ribbon } from './ui'

// const makeValues = values => {
//   const vals = cloneDeep(values)
//   return mergeWith(initialValues, vals)
// }

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

  const initialState = {
    rejectedCheck: false,
    ribbonMessage: '',
    ribbonStatus: null,
  }

  const rejectedState = {
    ribbonMessage: 'This article has been rejected',
    ribbonStatus: 'error',
  }

  if (alreadyRejected) {
    assign(initialState, rejectedState)
  }

  return (
    <State initial={initialState}>
      {({ state, setState }) => {
        // HACK -- find a more elegant way to handle this
        if (
          alreadyRejected &&
          state.ribbonMessage !== rejectedState.ribbonMessage
        ) {
          setState(rejectedState)
        }

        const toggleRejectionWarning = () => {
          setState({
            rejectedCheck: !state.rejectedCheck,
            ribbonMessage: state.rejectedCheck
              ? ''
              : 'You are about to reject this article',
            ribbonStatus: state.rejectedCheck ? null : 'error',
          })
        }

        return (
          <React.Fragment>
            <h1>Editor Panel </h1>
            {!loading && (
              <React.Fragment>
                <PanelInfo editor={editor} scienceOfficer={scienceOfficer} />

                <Ribbon
                  message={state.ribbonMessage}
                  status={state.ribbonStatus}
                />

                <RejectArticle
                  alreadyRejected={alreadyRejected}
                  article={article}
                  checked={state.rejectedCheck}
                  update={toggleRejectionWarning}
                  updateArticle={updateArticle}
                />

                {!alreadyRejected &&
                  !state.rejectedCheck && (
                    <React.Fragment>
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
