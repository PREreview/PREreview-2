/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'

import { Button } from '@pubsweet/ui'

import CREATE_SUBMISSION from '../mutations/createSubmission'
import { GET_MANUSCRIPTS } from '../queries/manuscripts'

const SubmitButton = props => {
  const onClick = () => {
    props.createSubmission().then(res => {
      const { id } = res.data.createSubmission
      props.history.push(`/submit/${id}`)
    })
  }

  return (
    <Button onClick={onClick} primary>
      New Submission
    </Button>
  )
}

const ManuscriptList = props => {
  const { manuscripts } = props.data
  if (!(manuscripts && manuscripts.length)) return null

  return (
    <div>
      {manuscripts.map(item => (
        <a href={`/submit/${item.id}`} key={item.id}>
          <div key={item.id}>{item.id}</div>
        </a>
      ))}
    </div>
  )
}

const Dashboard = props => {
  // console.log(GET_MANUSCRIPTS)
  const { history } = props
  return (
    <div>
      <Mutation mutation={CREATE_SUBMISSION}>
        {(createSubmission, more) => (
          <SubmitButton createSubmission={createSubmission} history={history} />
        )}
      </Mutation>

      <Query query={GET_MANUSCRIPTS}>
        {response => <ManuscriptList {...response} />}
      </Query>
    </div>
  )
}

export default withRouter(Dashboard)
