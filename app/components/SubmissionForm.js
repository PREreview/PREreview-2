/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import { Button } from '@pubsweet/ui'
import {
  getCurrentStatus,
  isDatatypeSelected,
  isFullSubmissionReady,
  isInitialSubmissionReady,
} from '../helpers/status'

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

const SubmissionForm = props => {
  const { values } = props
  // console.log(props)
  // console.log(values)
  // console.log(values.coAuthors)
  // console.log(Array.isArray(values))
  // console.log(props)
  // console.log(props.errors)
  // console.log(props.touched)
  // console.log(isReadOnly(values.status))

  const { status } = values
  const readOnly = isReadOnly(status)
  const datatypeSelected = isDatatypeSelected(status)
  const initial = isInitialSubmissionReady(status)
  const submitted = isFullSubmissionReady(status)

  const dropdown = (opts = {}) => (
    <Dropdown
      error={get(props.errors, 'dataType')}
      isDisabled={opts.isDisabled}
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
    <React.Fragment>
      <InitialSubmission readOnly={readOnly} values={values} {...props} />

      {initial && props.canChangeDataType && dropdown()}

      {datatypeSelected &&
        !props.canChangeDataType &&
        dropdown({ isDisabled: true })}

      {datatypeSelected &&
        values.dataType === 'geneExpression' && (
          <GeneExpressionForm readOnly={readOnly} {...props} />
        )}

      {!submitted && (
        <Button primary type="submit">
          Submit
        </Button>
      )}
    </React.Fragment>
  )
}

export default SubmissionForm
