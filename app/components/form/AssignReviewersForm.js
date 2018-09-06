/* eslint-disable react/prop-types */

import React from 'react'

import Form from './Form'

const AssignReviewersForm = props => {
  const { reviewers, reviewersTeamId, updateTeam, ...otherProps } = props

  const initialValues = {
    reviewers: reviewers.map(member => ({
      label: member.username,
      value: member.id,
    })),
  }

  const handleSubmit = (values, formikBag) => {
    const members = values.reviewers.map(val => val.value)
    const data = { members }

    updateTeam({
      variables: {
        id: reviewersTeamId,
        input: data,
      },
    }).then(() => formikBag.resetForm(values))
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
