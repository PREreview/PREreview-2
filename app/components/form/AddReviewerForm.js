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
  const { addExternalReviewer, articleId } = props

  const handleSubmit = (formValues, formikBag) => {
    const { email, name } = formValues

    addExternalReviewer({
      variables: {
        input: {
          articleId,
          email,
          name,
        },
      },
    })
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
