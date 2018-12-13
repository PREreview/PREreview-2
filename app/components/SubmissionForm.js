/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'
import { Toggle } from 'react-powerplug'

import { Button } from '@pubsweet/ui'
import Authorize from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import {
  getCurrentStatus,
  isDatatypeSelected,
  isFullSubmissionReady,
  isInitialSubmissionReady,
} from '../helpers/status'

import { ArticlePreviewModal } from './ui'
import Dropdown from './formElements/Dropdown'
import InitialSubmission from './formElements/InitialSubmission'
import GeneExpressionForm from './formElements/GeneExpressionForm'

const options = {
  dataType: [
    {
      label: 'Gene expression results',
      value: 'geneExpression',
    },
  ],
}

const isReadOnly = status => {
  const currentStatus = getCurrentStatus(status)

  if (
    currentStatus === 'Initial submission ready' ||
    currentStatus === 'Submitted'
  )
    return true

  return false
}

const DatatypeSelect = props => {
  const { article, values } = props

  const disabledSelect = (
    <Dropdown
      error={get(props.errors, 'dataType')}
      isDisabled
      label="Choose a datatype"
      name="dataType"
      options={options.dataType}
      required
      touched={get(props.touched, 'dataType')}
      value={options.dataType.find(o => o.value === get(values, 'dataType'))}
      {...props}
    />
  )

  return (
    <Authorize
      object={article}
      operation="isGlobal"
      unauthorized={disabledSelect}
    >
      <Dropdown
        error={get(props.errors, 'dataType')}
        label="Choose a datatype"
        name="dataType"
        options={options.dataType}
        required
        touched={get(props.touched, 'dataType')}
        value={options.dataType.find(o => o.value === get(values, 'dataType'))}
        {...props}
      />
    </Authorize>
  )
}

const SubmissionForm = props => {
  const { article, values } = props

  const { status } = values
  const readOnly = isReadOnly(status)
  const datatypeSelected = isDatatypeSelected(status)
  const initial = isInitialSubmissionReady(status)
  const full = isFullSubmissionReady(status)

  return (
    <React.Fragment>
      <InitialSubmission readOnly={readOnly} values={values} {...props} />

      {initial && (
        <DatatypeSelect article={article} values={values} {...props} />
      )}

      {datatypeSelected &&
        values.dataType === 'geneExpression' && (
          <Authorize object={article} operation="isAuthor" unauthorized={null}>
            <GeneExpressionForm readOnly={readOnly} {...props} />
          </Authorize>
        )}

      {!full && (
        <React.Fragment>
          <Toggle initial={false}>
            {({ on, toggle }) => (
              <React.Fragment>
                <Button onClick={toggle}>Preview</Button>
                <ArticlePreviewModal
                  isOpen={on}
                  onRequestClose={toggle}
                  values={values}
                />
              </React.Fragment>
            )}
          </Toggle>
          <Button primary type="submit">
            Submit
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SubmissionForm
