/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import ComposedSubmit from './compose/Submit'
import ReviewerPanel from './compose/ReviewerPanel'
import EditorPanel from './EditorPanel'
import SubmitForm from './form/SubmissionForm'
import Loading from './Loading'
import SubmissionForm from './SubmissionForm'
import { ArticlePreview } from './ui'
import { isEditableByAuthor, isFullSubmissionReady } from '../helpers/status'
import { formValuesToData } from './formElements/helpers'

const SplitScreen = styled.div`
  display: flex;
  height: 100%;

  > div {
    overflow-y: auto;
  }

  > div:first-child {
    flex-grow: 1;
  }

  > div:last-child {
    border: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorBackgroundHue')};
    border-radius: ${th('borderRadius')};
    flex-basis: 50%;
    height: 100%;
    margin-left: ${th('gridUnit')};
    padding: ${th('gridUnit')};
  }
`

const FormWrapper = styled.div`
  height: 100%;

  form {
    height: 100%;
  }
`

const Form = props => {
  const { article, update, upload } = props
  return (
    <SubmitForm article={article} update={update} upload={upload}>
      {formProps => (
        <div>
          <h1>Submit your article</h1>
          <SubmissionForm article={article} {...formProps} />
        </div>
      )}
    </SubmitForm>
  )
}

const FormWithPreview = props => {
  const { article, update, upload } = props

  return (
    <FormWrapper>
      <SubmitForm article={article} update={update} upload={upload}>
        {formProps => {
          const { values } = formProps

          return (
            <SplitScreen>
              <div>
                <h1>Submit your article</h1>
                <SubmissionForm article={article} {...formProps} />
              </div>

              <div>
                <ArticlePreview article={formValuesToData(values)} />
              </div>
            </SplitScreen>
          )
        }}
      </SubmitForm>
    </FormWrapper>
  )
}

const Submit = props => {
  const { article, loading, update, upload } = props

  if (loading) return <Loading />
  const { status } = article
  const full = isFullSubmissionReady(status)
  const editableByAuthor = isEditableByAuthor(status)

  const form = <Form article={article} update={update} upload={upload} />
  const formWithPreview = (
    <FormWithPreview article={article} update={update} upload={upload} />
  )
  const preview = <ArticlePreview article={article} />

  /*
    if not full:
      !iseditable and isglobal, show form
      editor will select datatype -> show form

      !iseditable and !isglobal
      author and you cannot edit -> show preview

      iseditable and isglobal
      initial -> cannot see
      post-datatype -> show preview

      iseditable and !isglobal
      author and you can edit -> show form
  */

  if (!full) {
    if (editableByAuthor)
      return (
        <Authorize
          object={article}
          operation="isGlobal"
          unauthorized={formWithPreview}
        >
          {preview}
        </Authorize>
      )

    return (
      <Authorize object={article} operation="isGlobal" unauthorized={preview}>
        {form}
      </Authorize>
    )
  }

  if (full) {
    return (
      <Authorize
        object={article}
        operation="isGlobalOrAcceptedReviewer"
        unauthorized={preview}
      >
        <SplitScreen>
          <div>{preview}</div>
          <div>
            <Authorize operation="isGlobal" unauthorized={null}>
              <EditorPanel />
            </Authorize>
            <Authorize
              object={article}
              operation="isAcceptedReviewer"
              unauthorized={null}
            >
              <ReviewerPanel />
            </Authorize>
          </div>
        </SplitScreen>
      </Authorize>
    )
  }

  return null
}

const Composed = () => <ComposedSubmit render={Submit} />
export default Composed
