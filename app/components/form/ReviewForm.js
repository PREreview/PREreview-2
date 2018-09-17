import React from 'react'
import * as yup from 'yup'

import Form from './Form'

const validations = yup.object().shape({
  content: yup.string().required('Cannot leave review empty'),
  recommendation: yup.string().required('You need to make a recommendation'),
})

const ReviewForm = props => {
  const { review, updateReview, ...rest } = props

  // TO DO -- remove check when you start rendering form only when there is a review
  let content, recommendation
  if (review) ({ content, recommendation } = review)

  const initialValues = {
    content: content || '',
    recommendation: recommendation || '',
  }

  const handleSubmit = (values, formikBag) => {
    const variables = {
      id: review.id,
      input: values,
    }

    updateReview({ variables })
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validations}
      {...rest}
    />
  )
}

export default ReviewForm
