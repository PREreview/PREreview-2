/* eslint-disable react/prop-types */

import React from 'react'
import { get, isUndefined } from 'lodash'

import { formValuesToData } from '../formElements/helpers'
import { isTruthy } from '../../helpers/generic'
import { setApproved } from '../../helpers/status'
import { Form } from './index'

const ScienceOfficerApprovalForm = props => {
  const { article, updateArticle, ...otherProps } = props

  let approved = get(article, 'status.scienceOfficer.approved')
  if (!isUndefined(approved)) approved = approved.toString()

  const initialValues = {
    approve: approved,
  }

  const handleSubmit = (values, formikBag) => {
    const { approve } = values
    const { id, status } = article

    const approval = isTruthy(approve)

    const data = {
      id,
      status: setApproved(status, approval),
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

export default ScienceOfficerApprovalForm
