/* eslint-disable react/prop-types */

import React from 'react'
import { Formik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { get, cloneDeep } from 'lodash'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

// eslint-disable-next-line no-unused-vars
import makeSchema from './formElements/validations'
// import fakeData from '../queries/fakeData'

import EditorPanel from './EditorPanel'
import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import { dataToFormValues, formValuesToData } from './formElements/helpers'
import {
  isFullSubmissionReady,
  updateSubmissionStatus,
} from '../helpers/status'

import { GET_MANUSCRIPT } from '../queries/manuscripts'
import SUBMIT_MANUSCRIPT from '../mutations/submitManuscript'
import UPLOAD_FILE from '../mutations/uploadFile'

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

class Submit extends React.Component {
  constructor(props) {
    super(props)

    this.id = undefined
    this.validated = false

    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    this.id = this.props.match.params.id
  }

  componentDidUpdate() {
    if (this.form && !this.validated) this.form.runValidations()
  }

  render() {
    const { id } = this

    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 100)
      return <Loading />
    }

    return (
      <Query query={GET_MANUSCRIPT} variables={{ id }}>
        {// eslint-disable-next-line arrow-body-style
        queryResponse => {
          return (
            <Mutation mutation={UPLOAD_FILE}>
              {// eslint-disable-next-line arrow-body-style
              (uploadFile, uploadResponse) => {
                return (
                  <Mutation
                    mutation={SUBMIT_MANUSCRIPT}
                    update={(cache, { data: { updateManuscript } }) => {
                      const { manuscript } = cache.readQuery({
                        query: GET_MANUSCRIPT,
                        variables: {
                          id: queryResponse.data.manuscript.id,
                        },
                      })

                      cache.writeQuery({
                        data: { manuscript },
                        query: GET_MANUSCRIPT,
                      })
                    }}
                  >
                    {// eslint-disable-next-line arrow-body-style
                    (submitManuscript, mutationResponse) => {
                      const submission = queryResponse.data.manuscript
                      const values = submission && dataToFormValues(submission)
                      if (!values) return null
                      const validations = makeSchema(values)

                      const onSubmit = (formValues, formikBag) => {
                        const submit = () => {
                          const data = cloneDeep(formValues)
                          console.log(data)
                          data.status = updateSubmissionStatus(data.status)
                          console.log(data)
                          const manuscriptInput = formValuesToData(data)

                          submitManuscript({
                            variables: { data: manuscriptInput },
                          })

                          formikBag.resetForm(formValues)
                        }
                        if (
                          get(formValues, 'image.url') ===
                          get(submission, 'image.url')
                        ) {
                          // eslint-disable-next-line no-param-reassign
                          delete formValues.image
                          submit()
                        } else {
                          uploadFile({
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
                            ref={c => (this.form = c)}
                            render={SubmissionForm}
                            validationSchema={validations}
                          />
                        </React.Fragment>
                      )

                      const final = isFullSubmissionReady(values.status) ? (
                        <SplitScreen>
                          <div>{form}</div>
                          <div>
                            <EditorPanel
                              submission={values}
                              update={submitManuscript}
                              values={values}
                            />
                          </div>
                        </SplitScreen>
                      ) : (
                        <div>{form}</div>
                      )

                      return final
                    }}
                  </Mutation>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Submit)
