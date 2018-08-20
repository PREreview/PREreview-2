/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { cloneDeep, mergeWith } from 'lodash'
// import { v4 as uuid } from 'uuid'
import { withApollo } from 'react-apollo'

import { Action, Button, H6 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { formValuesToData } from './formElements/helpers'
import { isRejected, setRejected } from './formElements/statusHelpers'

// import ADD_HISTORY_ENTRY from '../mutations/addHistoryEntry'
import CURRENT_USER from '../queries/currentUser'

import { RejectCheckbox } from './formElements'
// import Dropdown from './formElements/Dropdown'
import TextEditor from './formElements/TextEditor'

const StyledAction = styled(Action)`
  line-height: unset;
  margin-bottom: ${th('gridUnit')};
`

// const StyledDropdown = styled(Dropdown)`
//   max-width: 100%;
// `

const StyledH6 = styled(H6)`
  color: ${th('colorText')};
  margin: calc(${th('gridUnit')} * 2) 0 0 0;
`

const historyEntryStyle = css`
  > div > div {
    margin-bottom: 0;
  }

  label {
    color: ${th('colorPrimary')};
  }

  div[contenteditable] {
    background: ${th('colorBackground')};
    border: 0;
    border-bottom: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorBorder')};
    cursor: default;
    margin-bottom: 0;
    padding: 0;
  }
`

const StyledEditor = styled(TextEditor)`
  max-width: 100%;
  padding: ${th('gridUnit')} 0;
  width: unset;

  ${props => props.readOnly && historyEntryStyle};
`

const ReviewersNumbersItemWrapper = styled.div`
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  padding-left: ${th('gridUnit')};

  span:first-child {
    flex-basis: 5%;
    font-family: ${th('fontReading')};
  }
`

const ReviewEditor = StyledEditor.extend`
  ${props =>
    props.readOnly &&
    css`
      div[contenteditable] {
        border: 0;
      }
    `};
`

const ReviewersNumbersItem = props => {
  const { number, text } = props

  return (
    <ReviewersNumbersItemWrapper>
      <span>{number}</span>
      <span>reviewers {text}</span>
    </ReviewersNumbersItemWrapper>
  )
}

// eslint-disable-next-line arrow-body-style
const ReviewersNumbers = props => {
  // const {}(
  return (
    <div>
      <ReviewersNumbersItem number={10} text="invited" />
      <ReviewersNumbersItem number={7} text="responded" />
      <ReviewersNumbersItem number={2} text="accepted" />
    </div>
  )
}

const initialValues = {
  content: 'hello',
  decisionLetter: 'booya',
}

const makeValues = values => {
  const vals = cloneDeep(values)
  return mergeWith(initialValues, vals)
}

const validationSchema = yup.object().shape({
  content: yup.string(),
  decisionLetter: yup.string().nullable(),
})

const History = props => {
  const { data } = props
  if (!data || !data.length > 0) return null

  return (
    <React.Fragment>
      <StyledH6>Communications History</StyledH6>
      {data.map(item => (
        <Editor label={item.username} readOnly value={item.content} />
      ))}
    </React.Fragment>
  )
}

const reviewsData = [
  {
    content: '<p>This is almost ok</p>',
    recommendation: 'revise',
    status: 'pending',
    username: 'Yannis Barlas',
  },
  {
    content: '<p>This is great</p>',
    recommendation: 'accept',
    status: 'submitted',
    username: 'Alexis Georgantas',
  },
]

const RecommendationDot = styled.div`
  align-self: center;
  background: ${props => {
    const { recommendation } = props
    if (recommendation === 'revise') return th('colorWarning')
    if (recommendation === 'accept') return th('colorSuccess')
    if (recommendation === 'reject') return th('colorError')
    return th('colorFurniture')
  }};
  border-radius: 50%;
  display: inline-flex;
  height: calc(${th('gridUnit')} * 1);
  margin-right: ${th('gridUnit')};
  width: calc(${th('gridUnit')} * 1);
`

const ReviewHeadWrapper = styled.div`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
`

const ReviewWrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const Pending = styled.div`
  color: ${th('colorPrimary')};
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  line-height: ${th('lineHeightBaseSmall')};
  margin-left: auto; /* pull right */
`

const Review = props => {
  const { data } = props
  const pending = data.status === 'pending'

  return (
    <ReviewWrapper>
      <ReviewHeadWrapper>
        <RecommendationDot
          recommendation={pending ? null : data.recommendation}
        />
        {data.username}
        {pending && <Pending>pending</Pending>}
      </ReviewHeadWrapper>
      {!pending && <ReviewEditor readOnly value={data.content} />}
    </ReviewWrapper>
  )
}

const Reviews = props => {
  const { data } = props
  if (!data || !data.length > 0) return null

  return (
    <div>
      <StyledH6>Reviews</StyledH6>
      {data.map(item => <Review data={item} />)}
    </div>
  )
}

const SendForm = props => {
  const { action, originalValues, values } = props
  // console.log(props)
  const history = values.communicationsHistory

  let buttonText = 'Send'
  let editorType, placeholder
  // let editor

  const rejected = isRejected(originalValues.status)

  if (rejected || action === 'reject') {
    buttonText = 'Send to author'
    editorType = 'decisionLetter'
    placeholder = 'Make some comments for the author'
  } else if (action === 'editor') {
    buttonText = 'Send to Science Officer'
    editorType = 'content'
    placeholder = 'Leave some comments to the Science Officer'
  }
  // else if (rejected) {
  //   buttonText = ''
  // }

  return (
    <Form>
      {!(action === 'reject') &&
        !rejected && (
          <React.Fragment>
            <StyledAction to="">Reviewers Control Panel</StyledAction>{' '}
            <ReviewersNumbers />
            <Reviews data={reviewsData} />
          </React.Fragment>
        )}

      <History data={history} />

      <Editor
        placeholder={placeholder}
        readOnly={rejected}
        type={editorType}
        {...props}
      />

      {!rejected && (
        <Button primary type="submit">
          {buttonText}
        </Button>
      )}
    </Form>
  )
}

const Editor = props => {
  const { errors, placeholder, touched, type, values } = props

  const labels = {
    content: 'Notes',
    decisionLetter: 'Decision letter',
  }

  // console.log(labels[type], props.label)

  return (
    <StyledEditor
      error={errors && errors[type]}
      // key={uuid()}
      label={labels[type] || props.label}
      name={type}
      placeholder={placeholder}
      touched={touched && touched[type]}
      value={(values && values[type]) || props.value}
      {...props}
    />
  )
}

const InfoBar = styled.div`
  background: ${props => {
    if (props.success) return th('colorSuccess')
    if (props.error) return th('colorError')
    return th('colorBackgroundHue')
  }};
  color: ${props =>
    props.success || props.error ? th('colorTextReverse') : th('colorText')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: calc(${th('gridUnit')} / 2);
  text-align: center;
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`

// class SendForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       reject: false,
//     }
//   }

//   render() {
//     const infoMessage = 'You are about to reject'

//     return (
//       <Form>
//         <InfoBar>{infoMessage}</InfoBar>
//         <RejectCheckbox />
//       </Form>
//     )
//   }
// }

// const EditorPanel = props => {
//   const { submission, update } = props

//   return (
//     <React.Fragment>
//       <h1>Editor Panel</h1>
//       {/* <Mutation mutation={ADD_HISTORY_ENTRY}>
//         {(addHistoryEntry, more) => ( */}
//       <Formik
//         initialValues={initialValues}
//         onSubmit={formValues => {
//           console.log(formValues)
//           const data = cloneDeep(submission)
//           if (!data.history) data.history = []
//           data.history.push(formValues)
//           update({ variables: { data } })
//         }}
//         render={SendForm}
//         validationSchema={validationSchema}
//       />
//       {/* )}
//       </Mutation> */}
//     </React.Fragment>
//   )
// }

class EditorPanel extends React.Component {
  constructor(props) {
    super(props)

    // let rejected
    // const { status } = props.values
    // if (get(status, 'decision.rejected')) rejected = true
    const rejected = isRejected(props.values.status)

    // console.log(props.client)

    const { currentUser } = props.client.readQuery({
      query: CURRENT_USER,
    })

    // console.log(currentUser)

    this.currentUser = currentUser

    this.state = {
      currentRole: 'editor',
      info: rejected ? 'This article has been rejected' : '',
      // info: 'You are about to reject this article',
      infoStatus: rejected ? 'error' : undefined,
      // infoStatus: 'error',
      reject: false,
      // reject: true,
    }
  }

  getAction = () => {
    const { currentRole, reject } = this.state
    if (reject) return 'reject'
    return currentRole
  }

  toggleRejected = () => {
    if (this.state.reject) {
      this.setState({
        info: '',
        infoStatus: undefined,
        reject: false,
      })
    } else {
      this.setState({
        info: 'You are about to reject this article',
        infoStatus: 'error',
        reject: true,
      })
    }
  }

  handleSubmit = (formValues, formikBag) => {
    // console.log(formValues)

    const {
      // submission,
      update,
    } = this.props
    const { reject } = this.state
    const data = cloneDeep(formValues)

    // if (!data.history) data.history = []
    // data.history.push(formValues)
    // update({ variables: { data } })

    if (reject) {
      data.status = setRejected(data.status)
      data.decisionLetter = formValues.decisionLetter
    } else {
      // console.log(data)
      if (!data.communicationsHistory) data.communicationsHistory = []
      // console.log(this.currentUser)
      data.communicationsHistory.push({
        content: data.content,
        userId: this.currentUser.id,
        // TODO -- get that dynamically in the future, as it might change
        username: this.currentUser.username,
      })
      delete data.content
    }

    update({ variables: { data: formValuesToData(data) } })
  }

  render() {
    const { values } = this.props
    const { info, infoStatus, reject } = this.state
    const self = this

    // console.log(values)

    return (
      <React.Fragment>
        <h1>Editor Panel</h1>

        <InfoBar
          error={infoStatus === 'error'}
          hide={!info}
          success={infoStatus === 'success'}
        >
          {info}
        </InfoBar>

        {!isRejected(values.status) && (
          <RejectCheckbox
            checked={reject}
            onChange={e => this.toggleRejected(e)}
          />
        )}

        {/* <Mutation mutation={ADD_HISTORY_ENTRY}>
          {(addHistoryEntry, more) => ( */}

        <Formik
          initialValues={makeValues(values)}
          onSubmit={this.handleSubmit}
          render={formikProps => (
            <SendForm
              action={self.getAction()}
              currentUser={this.currentUser}
              originalValues={values}
              toggleRejected={this.toggleRejected}
              {...formikProps}
            />
          )}
          validationSchema={validationSchema}
        />
        {/* )}
        </Mutation> */}
      </React.Fragment>
    )
  }
}

export default withApollo(EditorPanel)
