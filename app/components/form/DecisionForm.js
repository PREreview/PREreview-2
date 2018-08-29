/* eslint-disable react/prop-types */

import React from 'react'

import { Form } from './index'
import { formValuesToData } from '../formElements/helpers'
import { setAccepted, setRejected, setRevise } from '../../helpers/status'

const getNewStatus = (status, decision) => {
  if (decision === 'accept') return setAccepted(status)
  if (decision === 'reject') return setRejected(status)
  if (decision === 'revise') return setRevise(status)

  throw new Error('Cannot set new status without a valid decision value')
}

const DecisionForm = props => {
  const { article, updateArticle, ...otherProps } = props

  const initialValues = {
    decision: 'accept',
    decisionLetter: 'yesh',
  }

  const handleSubmit = (values, formikBag) => {
    const { id, status } = article
    const { decision, decisionLetter } = values

    const data = {
      decisionLetter,
      id,
      status: getNewStatus(status, decision),
    }

    updateArticle({ variables: { data: formValuesToData(data) } })
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      {...otherProps}
    />
  )
}

export default DecisionForm
