import React from 'react'
import { Formik } from 'formik'
import { get, set } from 'lodash'

import Loading from './Loading'
import SubmissionForm from './SubmissionForm'

import fakeData from '../queries/fakeData'

const validate = values => {
  // same as above, but feel free to move this into a class method now.
  const errors = {}
  // console.log(values)
  if (!get(values, 'author.name')) {
    set(errors, 'author.name', 'Required')
  }

  if (!get(values, 'author.email')) {
    set(errors, 'author.email', 'Required')
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.author.email)
  ) {
    set(errors, 'author.email', 'Invalid email address')
  }
  return errors
}

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
        {/* <p>What joy!</p> */}
        <Formik
          initialValues={fakeData}
          onSubmit={onSubmit}
          ref={c => (this.form = c)}
          render={SubmissionForm}
          validate={validate}
        />
      </div>
    )
  }
}

export default Submit
