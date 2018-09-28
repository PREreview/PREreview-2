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
import { isFullSubmissionReady } from '../helpers/status'
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

  if (!full) {
    return <Form article={article} update={update} upload={upload} />
  }

  const isEditor = true
  const isReviewer = false

  if (isEditor || isReviewer) {
    return (
      <SplitScreen>
        <div>
          <ArticlePreview article={article} />
        </div>
        <div>
          {isEditor && <EditorPanel />}
          {isReviewer && <ReviewerPanel />}
        </div>
      </SplitScreen>
    )
  }

  return <ArticlePreview article={article} />
}

const Composed = () => <ComposedSubmit render={Submit} />
export default Composed
