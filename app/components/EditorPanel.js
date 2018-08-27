/* eslint-disable react/prop-types */

import React from 'react'
import { State } from 'react-powerplug'
// import styled, { css } from 'styled-components'
import { Form, Formik } from 'formik'
// import * as yup from 'yup'
import {
  assign,
  // cloneDeep,
  isFunction,
  // mergeWith
} from 'lodash'
// import { v4 as uuid } from 'uuid'

// import { Action, Button, H6 } from '@pubsweet/ui'
// import { th } from '@pubsweet/ui-toolkit'

import ComposedEditorPanel from './compose/EditorPanel'
import Loading from './Loading'

import { formValuesToData } from './formElements/helpers'
import { isRejected, setRejected } from '../helpers/status'

// import ADD_HISTORY_ENTRY from '../mutations/addHistoryEntry'

import { PanelInfo, RejectArticle, ReviewerInfo, Ribbon } from './ui'

// import { RejectCheckbox } from './formElements'
// import Dropdown from './formElements/Dropdown'
// import TextEditor from './formElements/TextEditor'

// const StyledDropdown = styled(Dropdown)`
//   max-width: 100%;
// `

// const initialValues = {
//   content: 'hello',
//   decisionLetter: 'booya',
// }

// const makeValues = values => {
//   const vals = cloneDeep(values)
//   return mergeWith(initialValues, vals)
// }

// const validationSchema = yup.object().shape({
//   content: yup.string(),
//   decisionLetter: yup.string().nullable(),
// })

// const History = props => {
//   const { data } = props
//   if (!data || !data.length > 0) return null

//   return (
//     <React.Fragment>
//       <StyledH6>Communications History</StyledH6>
//       {data.map(item => (
//         <Editor label={item.username} readOnly value={item.content} />
//       ))}
//     </React.Fragment>
//   )
// }

// const SendForm = props => {
//   const { action, originalValues, values } = props
//   // console.log(props)
//   const history = values.communicationsHistory

//   let buttonText = 'Send'
//   let editorType, placeholder
//   // let editor

//   const rejected = isRejected(originalValues.status)

//   if (rejected || action === 'reject') {
//     buttonText = 'Send to author'
//     editorType = 'decisionLetter'
//     placeholder = 'Make some comments for the author'
//   } else if (action === 'editor') {
//     buttonText = 'Send to Science Officer'
//     editorType = 'content'
//     placeholder = 'Leave some comments to the Science Officer'
//   }
//   // else if (rejected) {
//   //   buttonText = ''
//   // }

//   return (
//     <Form>
//       {!(action === 'reject') &&
//         !rejected && (
//           <React.Fragment>
//             <StyledAction to="">Reviewers Control Panel</StyledAction>{' '}
//             <ReviewersNumbers />
//             <Reviews data={reviewsData} />
//           </React.Fragment>
//         )}

//       <History data={history} />

//       <Editor
//         placeholder={placeholder}
//         readOnly={rejected}
//         type={editorType}
//         {...props}
//       />

//       {!rejected && (
//         <Button primary type="submit">
//           {buttonText}
//         </Button>
//       )}
//     </Form>
//   )
// }

// const Editor = props => {
//   const { errors, placeholder, touched, type, values } = props

//   const labels = {
//     content: 'Notes',
//     decisionLetter: 'Decision letter',
//   }

//   // console.log(labels[type], props.label)

//   return (
//     <StyledEditor
//       error={errors && errors[type]}
//       // key={uuid()}
//       label={labels[type] || props.label}
//       name={type}
//       placeholder={placeholder}
//       touched={touched && touched[type]}
//       value={(values && values[type]) || props.value}
//       {...props}
//     />
//   )
// }

// class EditorPanel extends React.Component {
//   constructor(props) {
//     super(props)

//     // let rejected
//     // const { status } = props.values
//     // if (get(status, 'decision.rejected')) rejected = true
//     const rejected = isRejected(props.values.status)

//     // console.log(props.client)

//     // const { currentUser } = props.client.readQuery({
//     //   query: CURRENT_USER,
//     // })

//     // console.log(currentUser)

//     // this.currentUser = currentUser

//     this.state = {
//       currentRole: 'editor',
//       info: rejected ? 'This article has been rejected' : '',
//       // info: 'You are about to reject this article',
//       infoStatus: rejected ? 'error' : undefined,
//       // infoStatus: 'error',
//       reject: false,
//       // reject: true,
//     }
//   }

//   getAction = () => {
//     const { currentRole, reject } = this.state
//     if (reject) return 'reject'
//     return currentRole
//   }

//   toggleRejected = () => {
//     if (this.state.reject) {
//       this.setState({
//         info: '',
//         infoStatus: undefined,
//         reject: false,
//       })
//     } else {
//       this.setState({
//         info: 'You are about to reject this article',
//         infoStatus: 'error',
//         reject: true,
//       })
//     }
//   }

//   handleSubmit = (formValues, formikBag) => {
//     // console.log(formValues)

//     const {
//       // submission,
//       update,
//     } = this.props
//     const { reject } = this.state
//     const data = cloneDeep(formValues)

//     // if (!data.history) data.history = []
//     // data.history.push(formValues)
//     // update({ variables: { data } })

//     if (reject) {
//       data.status = setRejected(data.status)
//       data.decisionLetter = formValues.decisionLetter
//     } else {
//       // console.log(data)
//       if (!data.communicationsHistory) data.communicationsHistory = []
//       // console.log(this.currentUser)
//       data.communicationsHistory.push({
//         content: data.content,
//         userId: this.currentUser.id,
//         // TODO -- get that dynamically in the future, as it might change
//         username: this.currentUser.username,
//       })
//       delete data.content
//     }

//     update({ variables: { data: formValuesToData(data) } })
//   }

//   render() {
//     const { values } = this.props
//     const { info, infoStatus, reject } = this.state
//     const self = this

//     console.log(this.props)

//     return (
//       <React.Fragment>
//         <h1>Editor Panel</h1>

//         {/* <InfoBar
//           error={infoStatus === 'error'}
//           hide={!info}
//           success={infoStatus === 'success'}
//         >
//           {info}
//         </InfoBar>

//         {!isRejected(values.status) && (
//           <RejectCheckbox
//             checked={reject}
//             onChange={e => this.toggleRejected(e)}
//           />
//         )}

//         <Formik
//           initialValues={makeValues(values)}
//           onSubmit={this.handleSubmit}
//           render={formikProps => (
//             <SendForm
//               action={self.getAction()}
//               currentUser={this.currentUser}
//               originalValues={values}
//               toggleRejected={this.toggleRejected}
//               {...formikProps}
//             />
//           )}
//           validationSchema={validationSchema}
//         /> */}
//       </React.Fragment>
//     )
//   }
// }

const initialValues = {
  decisionLetter: 'Something',
}

const EditorPanelForm = props => {
  const { children, ...other } = props
  return (
    <Formik {...other}>
      {formikProps => (
        <Form>{isFunction(children) ? children(formikProps) : children}</Form>
      )}
    </Formik>
  )
}

const EditorPanel = props => {
  const { article, editor, loading, scienceOfficer, updateArticle } = props
  const { status } = article
  const alreadyRejected = isRejected(status)
  // console.log(props)

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

  // console.log(initialState)

  return (
    <State initial={initialState}>
      {({ state, setState }) => {
        const onSubmit = (formValues, formikBag) => {
          // console.log('submit')

          let data = { id: article.id }

          if (state.rejectedCheck) {
            data.decisionLetter = formValues.decisionLetter
            data.status = setRejected(status)
            setState(rejectedState)
          }

          // console.log('og', data)
          data = formValuesToData(data)
          // console.log('transformed', data)
          updateArticle({ variables: { data } })
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
            {loading && <Loading />}

            {!loading && (
              <EditorPanelForm
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {formikProps => (
                  <React.Fragment>
                    <PanelInfo
                      editor={editor}
                      scienceOfficer={scienceOfficer}
                    />

                    <Ribbon
                      message={state.ribbonMessage}
                      status={state.ribbonStatus}
                    />

                    <RejectArticle
                      alreadyRejected={alreadyRejected}
                      checked={state.rejectedCheck}
                      update={toggleRejectionWarning}
                      {...formikProps}
                    />

                    {!alreadyRejected &&
                      !state.rejectedCheck && <ReviewerInfo />}
                  </React.Fragment>
                )}
              </EditorPanelForm>
            )}
          </React.Fragment>
        )
      }}
    </State>
  )
}

const Composed = () => <ComposedEditorPanel render={EditorPanel} />
export default Composed
