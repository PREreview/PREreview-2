/* eslint-disable react/prop-types */

import React from 'react'
import { withRouter } from 'react-router-dom'

import { Button } from '@pubsweet/ui'

import AutoComplete from './formElements/AutoComplete'
import { getWBPerson } from '../fetch/WBApi'

const SubmitButton = ({ history }) => {
  const onClick = () => {
    // TO DO -- create new article
    history.push('/submit')
  }

  return (
    <React.Fragment>
      <AutoComplete fetchData={getWBPerson} placeholder="booya" />
      <Button onClick={onClick} primary>
        New Submission
      </Button>
    </React.Fragment>
  )
}

const Dashboard = ({ history }) => (
  <div>
    <SubmitButton history={history} />
  </div>
)

export default withRouter(Dashboard)
