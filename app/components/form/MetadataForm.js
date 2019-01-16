import React from 'react'
import * as yup from 'yup'

import Form from './Form'

const validations = yup.object().shape({
  doi: yup.string().required('Cannot leave field empty'),
})

const MetadataForm = props => {
  const { articleId, doi, setState, updateMetadata, ...rest } = props

  const initialValues = {
    doi: doi || '',
  }

  const handleSubmit = (values, formikBag) => {
    const variables = {
      data: { ...values },
      manuscriptId: articleId,
    }

    updateMetadata({ variables }).then(() => setState({ showForm: false }))
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

export default MetadataForm
