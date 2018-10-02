/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import ComposedSubmit from './compose/Submit'
// import ReviewerPanel from './compose/ReviewerPanel'
import EditorPanel from './EditorPanel'
import SubmitForm from './form/SubmissionForm'
import Loading from './Loading'
import SubmissionForm from './SubmissionForm'
import { ArticlePreview } from './ui'
import { isFullSubmissionReady } from '../helpers/status'

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

const Submit = props => {
  const { article, loading, update, upload } = props

  if (loading) return <Loading />
  const { status } = article

  const theform = (
    <React.Fragment>
      <h1>Submit your article</h1>
      <SubmitForm article={article} update={update} upload={upload}>
        {formProps => <SubmissionForm article={article} {...formProps} />}
      </SubmitForm>
    </React.Fragment>
  )

  const final = isFullSubmissionReady(status) ? (
    <SplitScreen>
      <div>
        <ArticlePreview article={article} />
      </div>
      <div>
        <Authorize operation="isGlobal" unauthorized={null}>
          <EditorPanel />
        </Authorize>
        {/* <ReviewerPanel /> */}
      </div>
    </SplitScreen>
  ) : (
    <div>{theform}</div>
  )

  return final
}

const Composed = () => <ComposedSubmit render={Submit} />
export default Composed
