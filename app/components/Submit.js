/* eslint-disable react/prop-types */

import React from 'react'
import { Formik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import validate from './formElements/validations'
// import fakeData from '../queries/fakeData'

import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import { dataToFormValues, formValuesToData } from './formElements/helpers'

import { GET_MANUSCRIPT } from '../queries/manuscripts'
import SUBMIT_MANUSCRIPT from '../mutations/submitManuscript'

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
      <Mutation mutation={SUBMIT_MANUSCRIPT}>
        {(submitManuscript, mutationResponse) => {
          const onSubmit = (values, formikBag) => {
            // console.log('do it')
            submitManuscript(formValuesToData(values))
          }

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
                      validationSchema={validate}
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
  }
}

export default withRouter(Submit)
