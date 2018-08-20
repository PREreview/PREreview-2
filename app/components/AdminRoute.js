/* eslint-disable react/prop-types */

import React from 'react'
import { Route } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'

import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import CURRENT_USER from '../queries/currentUser'

const NotAdminErrorPageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  div:last-child {
    margin-bottom: 20%;
  }
`

const NotAdminErrorPage = () => (
  <NotAdminErrorPageWrapper>
    <div>
      <Icon color={th('colorError')} size={8}>
        alert_octagon
      </Icon>
    </div>
    <div>You need admin privileges to view this page</div>
  </NotAdminErrorPageWrapper>
)

const AdminRoute = props => {
  const { client, ...otherProps } = props

  const { currentUser } = client.readQuery({
    query: CURRENT_USER,
  })

  if (!currentUser.admin) return <NotAdminErrorPage />

  return <Route {...otherProps} />
}

export default withApollo(AdminRoute)
