import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'
import PasswordReset from 'pubsweet-component-password-reset-frontend/PasswordReset'

const routes = (
  <Switch>
    <Route component={Login} path="/login" />
    <Route component={Signup} path="/signup" />
    <Route component={PasswordReset} path="/password-reset" />
  </Switch>
)

export default routes
