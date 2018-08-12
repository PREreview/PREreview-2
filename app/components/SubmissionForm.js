/* eslint-disable react/prop-types */

import React from 'react'
import { Form } from 'formik'
import { get } from 'lodash'

import { Button } from '@pubsweet/ui'

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
  const { dataTypeSelected, initialSubmission, submitted } = status
  if (initialSubmission && !dataTypeSelected) return true
  if (submitted) return true
  return false
}

const SubmissionForm = props => {
  const { values } = props
  // console.log(values)
  // console.log(values.coAuthors)
  // console.log(Array.isArray(values))
  // console.log(props)
  // console.log(props.errors)
  // console.log(props.touched)
  // console.log(isReadOnly(values.status))

  const readOnly = isReadOnly(values.status)

  const {
    initialSubmission,
    // submitted,
  } = values.status

  return (
    <Form>
      <InitialSubmission readOnly={readOnly} values={values} {...props} />

      {initialSubmission && (
        <Dropdown
          error={get(props.errors, 'dataType')}
          label="Choose a datatype"
          name="dataType"
          options={options.dataType}
          required
          touched={get(props.touched, 'dataType')}
          value={get(values, 'dataType')}
          {...props}
        />
      )}

      {values.status.dataTypeSelected &&
        values.dataType === 'geneExpression' && (
          <GeneExpressionForm readOnly={readOnly} {...props} />
        )}

      <Button primary type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SubmissionForm
