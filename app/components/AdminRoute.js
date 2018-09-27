/* eslint-disable react/prop-types */

import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { withCurrentUser } from '../userContext'

const NotAdminErrorPageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

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
  const { currentUser, ...otherProps } = props
  const isAdmin = currentUser.admin

  if (!isAdmin) return <NotAdminErrorPage />
  return <Route {...otherProps} />
}

export default withCurrentUser(AdminRoute)
