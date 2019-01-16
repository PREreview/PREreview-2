/* eslint-disable react/prop-types */

import React from 'react'
import { clone } from 'lodash'

import { formValuesToData } from '../formElements/helpers'
import { Form } from './index'

const initialValues = {
  content: '',
}

const DiscussForm = props => {
  const { article, currentUser, updateArticle, ...otherProps } = props

  const handleSubmit = (values, formikBag) => {
    const { id, communicationHistory } = article
    const { content } = values

    let history = clone(communicationHistory)
    if (!history) history = []
    history = history.map(item => {
      const transformed = clone(item)
      transformed.user = transformed.user.id
      return transformed
    })

    const newEntry = {
      content,
      user: currentUser.id,
    }

    history.push(newEntry)

    const data = {
      communicationHistory: history,
      id,
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

export default DiscussForm
