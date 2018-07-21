/* eslint-disable react/prop-types */

import React from 'react'
import { Formik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { set } from 'lodash'

// eslint-disable-next-line no-unused-vars
import validate, { makeSchema } from './formElements/validations'
// import fakeData from '../queries/fakeData'

import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import { dataToFormValues, formValuesToData } from './formElements/helpers'

import { GET_MANUSCRIPT } from '../queries/manuscripts'
import SUBMIT_MANUSCRIPT from '../mutations/submitManuscript'
import UPLOAD_FILE from '../mutations/uploadFile'

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
    // const { id } = this.props.match.params
    const { id } = this

    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 100)
      return <Loading />
    }
    // console.log('render')

    return (
      <Mutation mutation={UPLOAD_FILE}>
        {// eslint-disable-next-line arrow-body-style
        (uploadFile, uploadResponse) => {
          // console.log(uploadResponse)
          return (
            <Mutation mutation={SUBMIT_MANUSCRIPT}>
              {// eslint-disable-next-line arrow-body-style
              (submitManuscript, mutationResponse) => {
                // const submit = () => {

                // }

                return (
                  <Query query={GET_MANUSCRIPT} variables={{ id }}>
                    {queryResponse => {
                      // console.log(queryResponse)
                      const submission = queryResponse.data.manuscript
                      // const submission = undefined
                      // console.log
                      const values = submission && dataToFormValues(submission)
                      if (!values) return null
                      // console.log('v', values)
                      // console.log(values)
                      const validations = makeSchema(values)
                      // console.log(validations)

                      const onSubmit = (formValues, formikBag) => {
                        // console.log('do it')
                        // console.log('image', formValues.image)

                        const submit = () => {
                          const manuscriptInput = formValuesToData(formValues)
                          // console.log(manuscriptInput)

                          set(manuscriptInput, 'status.initialSubmission', true)
                          submitManuscript({
                            variables: { data: manuscriptInput },
                          })
                        }

                        if (formValues.image.url === submission.image.url) {
                          // console.log('not changed')
                          // eslint-disable-next-line no-param-reassign
                          delete formValues.image
                          submit()
                        } else {
                          uploadFile({
                            variables: { file: formValues.image.file },
                          }).then(res => {
                            // console.log(formValues.image)
                            const imageName = formValues.image.file.name
                            // console.log(formValues)

                            // eslint-disable-next-line no-param-reassign
                            formValues.image = {
                              name: imageName,
                              url: res.data.upload.url,
                            }
                            // console.log(formValues)
                            submit()
                            // const manuscriptInput = formValuesToData(formValues)
                            // // console.log(manuscriptInput)

                            // set(manuscriptInput, 'status.initialSubmission', true)
                            // submitManuscript({
                            //   variables: { data: manuscriptInput },
                            // })
                          })
                        }
                      }

                      return (
                        <div>
                          <h1>Submit your article</h1>
                          <Formik
                            // enableReinitialize
                            initialValues={values}
                            onSubmit={onSubmit}
                            ref={c => (this.form = c)}
                            render={SubmissionForm}
                            // validate={validate}
                            validationSchema={validations}
                            // validationSchema={validate}
                            // values={values}
                          />
                        </div>
                      )
                    }}
                  </Query>
                )
              }}
            </Mutation>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Submit)
