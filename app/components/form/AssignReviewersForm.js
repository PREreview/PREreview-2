/* eslint-disable react/prop-types */

import React from 'react'

import Form from './Form'

const AssignReviewersForm = props => {
  const { reviewersTeam, updateTeam, ...otherProps } = props

  const initialValues = {
    reviewers: reviewersTeam.members.map(member => ({
      label: member.username,
      value: member.id,
    })),
  }

  const handleSubmit = (values, formikBag) => {
    const members = values.reviewers.map(val => val.value)
    const data = { members }

    updateTeam({
      variables: {
        id: reviewersTeam.id,
        input: data,
      },
    })

    formikBag.resetForm()
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      {...otherProps}
    />
  )
}

export default AssignReviewersForm
