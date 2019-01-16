import React from 'react'
import * as yup from 'yup'

import Form from './Form'

const initialValues = {
  email: '',
  name: '',
}

const validations = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  name: yup.string().required('Name is required'),
})

const AddReviewerForm = props => {
  // const { articleId } = props

  const handleSubmit = (formValues, formikBag) => {
    // console.log('submit me!', formValues)
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validations}
      {...props}
    />
  )
}

export default AddReviewerForm
