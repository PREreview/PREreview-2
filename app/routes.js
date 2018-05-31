import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// import { AuthenticatedComponent as Private } from 'pubsweet-client'

import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'
import PasswordReset from 'pubsweet-component-password-reset-frontend/PasswordReset'

import Dashboard from './components/Dashboard'
import NavigationBar from './components/NavigationBar'
import Submit from './components/Submit'

import Private from './components/Private'

const routes = (
  <Switch>
    <Route component={Login} exact path="/login" />
    <Route component={Signup} exact path="/signup" />
    <Route component={PasswordReset} exact path="/password-reset" />

    <Private>
      <Route component={NavigationBar} path="/" />
      <Switch>
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Submit} exact path="/submit" />
        <Redirect to="/dashboard" />
      </Switch>
    </Private>
  </Switch>
)

export default routes
