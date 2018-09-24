/* eslint-disable react/prop-types */

import React from 'react'
import * as yup from 'yup'

import { Form } from './index'
import { formValuesToData } from '../formElements/helpers'
import {
  getDecision,
  setAccepted,
  setRejected,
  setRevise,
} from '../../helpers/status'

const getNewStatus = (status, decision) => {
  if (decision === 'accept') return setAccepted(status)
  if (decision === 'reject') return setRejected(status)
  if (decision === 'revise') return setRevise(status)

  throw new Error('Cannot set new status without a valid decision value')
}

// TO DO -- align wording between radio and getDecision so that this gets deleted
const transformDecision = decision => {
  if (decision === 'accepted' || decision === 'rejected')
    return decision.slice(0, decision.length - 2)

  return decision
}

const validations = yup.object().shape({
  decision: yup.string().required('You have to make a decision'),
  decisionLetter: yup.string().required('You have to write a decision letter'),
})

const DecisionForm = props => {
  const { article, updateArticle, ...otherProps } = props
  const { decisionLetter: letter, id, status } = article
  const recordedDecision = transformDecision(getDecision(status))

  const initialValues = {
    decision: recordedDecision || '',
    decisionLetter: letter || '',
  }

  const handleSubmit = (values, formikBag) => {
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
      validationSchema={validations}
      {...otherProps}
    />
  )
}

export default DecisionForm
