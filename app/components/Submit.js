import React from 'react'
import { Formik } from 'formik'

import validate from './formElements/validations'
import fakeData from '../queries/fakeData'

import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

const onSubmit = () => {}

class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.validated = false

    this.state = {
      loading: true,
    }
  }

  componentDidUpdate() {
    if (this.form && !this.validated) this.form.runValidations()
  }

  render() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 100) // 2000)
      return <Loading />
    }

    return (
      <div>
        <h1>Submit your article</h1>
        <Formik
          initialValues={fakeData}
          onSubmit={onSubmit}
          ref={c => (this.form = c)}
          render={SubmissionForm}
          // validate={validate}
          validationSchema={validate}
        />
      </div>
    )
  }
}

export default Submit
