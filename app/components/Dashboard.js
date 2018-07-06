/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'

import { Button } from '@pubsweet/ui'

const SubmitButton = ({ history }) => {
  const onClick = () => {
    // TO DO -- create new article
    history.push('/submit')
  }

  return (
    <Button onClick={onClick} primary>
      New Submission
    </Button>
  )
}

const Dashboard = ({ history }) => (
  <div>
    <SubmitButton history={history} />
  </div>
)

export default withRouter(Dashboard)
