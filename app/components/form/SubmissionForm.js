/* eslint-disable react/prop-types */

import React from 'react'
import { get, cloneDeep } from 'lodash'
import AuthorizeWithGraphQL from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import Form from './Form'

import { dataToFormValues, formValuesToData } from '../formElements/helpers'
import makeSchema from '../formElements/validations'
import { updateSubmissionStatus } from '../../helpers/status'

const SubmissionForm = props => {
  const { article, update, upload, ...otherProps } = props
  const initialValues = dataToFormValues(article)
  const validations = makeSchema(initialValues)

  const handleSubmit = (formValues, formikBag) => {
    const submit = () => {
      const data = cloneDeep(formValues)
      data.status = updateSubmissionStatus(data.status)
      const manuscriptInput = formValuesToData(data)

      update({ variables: { data: manuscriptInput } })
      formikBag.resetForm(formValues)
    }

    if (get(formValues, 'image.url') === get(article, 'image.url')) {
      // eslint-disable-next-line no-param-reassign
      delete formValues.image
      submit()
    } else {
      upload({
        variables: { file: formValues.image.file },
      }).then(res => {
        // const imageName = formValues.image.file.name
        const imageName = formValues.image.name

        // eslint-disable-next-line no-param-reassign
        formValues.image = {
          name: imageName,
          url: res.data.upload.url,
        }

        submit()
      })
    }
  }

  return (
    <AuthorizeWithGraphQL
      object={{
        current: { ...article, type: 'manuscript' },
        update: { ...article, type: 'manuscript', dataType: 'changed' },
      }}
      operation="update"
      unauthorized={
        <Form
          canChangeDataType={false}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validations}
          {...otherProps}
        />
      }
    >
      <Form
        canChangeDataType
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validations}
        {...otherProps}
      />
    </AuthorizeWithGraphQL>
  )
}

export default SubmissionForm
