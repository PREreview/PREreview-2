/* eslint-disable react/prop-types */

import React from 'react'

import { Button } from '@pubsweet/ui'

import { RejectArticleForm } from '../form'
import { PanelTextEditor as Editor, RejectCheckbox } from './index'

const DecisionLetterForm = props => (
  <RejectArticleForm {...props}>
    {formProps => {
      const { values } = formProps

      return (
        <React.Fragment>
          <Editor
            label="Decision Letter"
            name="decisionLetter"
            placeholder="Write some comments to the author"
            required
            value={values.decisionLetter}
            {...formProps}
          />

          <Button primary type="submit">
            Submit
          </Button>
        </React.Fragment>
      )
    }}
  </RejectArticleForm>
)

const DecisionLetter = ({ value }) => (
  <Editor label="Decision Letter" readOnly value={value} />
)

const RejectArticle = props => {
  const { alreadyRejected, article, checked, update, updateArticle } = props
  const isChecked = alreadyRejected || checked

  return (
    <React.Fragment>
      {!alreadyRejected && (
        <RejectCheckbox checked={isChecked} onChange={update} />
      )}

      {checked &&
        !alreadyRejected && (
          <DecisionLetterForm article={article} updateArticle={updateArticle} />
        )}

      {alreadyRejected && <DecisionLetter value={article.decisionLetter} />}
    </React.Fragment>
  )
}

export default RejectArticle
