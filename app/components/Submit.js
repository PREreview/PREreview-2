/* eslint-disable react/prop-types */

import React from 'react'
import { Formik } from 'formik'
import { get, cloneDeep } from 'lodash'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import makeSchema from './formElements/validations'

import EditorPanel from './EditorPanel'
import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import ComposedSubmit from './compose/Submit'

import { dataToFormValues, formValuesToData } from './formElements/helpers'
import {
  isFullSubmissionReady,
  updateSubmissionStatus,
} from '../helpers/status'

const SplitScreen = styled.div`
  display: flex;
  height: 100%;

  > div {
    overflow-y: auto;
  }

  > div:first-child {
    flex-grow: 1;
  }

  > div:last-child {
    border: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorBackgroundHue')};
    border-radius: ${th('borderRadius')};
    flex-basis: 40%;
    height: 100%;
    margin-left: ${th('gridUnit')};
    padding: ${th('gridUnit')};
  }
`

const Submit = props => {
  const { article, loading, update, upload } = props

  if (loading) return <Loading />

  const values = article && dataToFormValues(article)
  if (!values) return null

  const validations = makeSchema(values)

  const onSubmit = (formValues, formikBag) => {
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
        const imageName = formValues.image.file.name
        // eslint-disable-next-line no-param-reassign
        formValues.image = {
          name: imageName,
          url: res.data.upload.url,
        }
        submit()
      })
    }
  }

  const form = (
    <React.Fragment>
      <h1>Submit your article</h1>
      <Formik
        enableReinitialize
        initialValues={values}
        onSubmit={onSubmit}
        render={SubmissionForm}
        validationSchema={validations}
      />
    </React.Fragment>
  )
  const final = isFullSubmissionReady(values.status) ? (
    <SplitScreen>
      <div>{form}</div>
      <div>
        <EditorPanel />
      </div>
    </SplitScreen>
  ) : (
    <div>{form}</div>
  )
  return final
}

const Composed = () => <ComposedSubmit render={Submit} />
export default Composed
