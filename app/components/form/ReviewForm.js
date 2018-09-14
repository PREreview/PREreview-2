import React from 'react'

import Form from './Form'

const ReviewForm = props => {
  const initialValues = {
    // recommendation: null,
    recommendation: 'accept',
    review: 'hahha',
  }

  const handleSubmit = (values, formikBag) => {
    // console.log(values)
  }

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit} {...props} />
  )
}

export default ReviewForm
