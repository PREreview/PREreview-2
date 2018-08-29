/* eslint-disable react/prop-types */

import React from 'react'

import { setRejected } from '../../helpers/status'
import { formValuesToData } from '../formElements/helpers'

import { Form } from './index'

const initialValues = {
  decisionLetter: 'Something',
}

const RejectArticleForm = props => {
  const { article, updateArticle, ...otherProps } = props

  const handleSubmit = (values, formikBag) => {
    const { id, status } = article
    const { decisionLetter } = values

    const data = {
      decisionLetter,
      id,
      status: setRejected(status),
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

export default RejectArticleForm
