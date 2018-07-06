import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// import { AuthenticatedComponent as Private } from 'pubsweet-client'

import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'
import PasswordReset from 'pubsweet-component-password-reset-frontend/PasswordReset'

import Dashboard from './components/Dashboard'
import NavigationBar from './components/NavigationBar'
import Submit from './components/Submit'

import Page from './components/Page'
import PageLayout from './components/PageLayout'
import Private from './components/Private'

const routes = (
  <Switch>
    <Route component={Login} exact path="/login" />
    <Route component={Signup} exact path="/signup" />
    <Route component={PasswordReset} exact path="/password-reset" />

    <Private>
      <PageLayout>
        <Route component={NavigationBar} path="/" />
        <Page>
          <Switch>
            <Route component={Dashboard} exact path="/dashboard" />
            <Route component={Submit} exact path="/submit" />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Page>
      </PageLayout>
    </Private>
  </Switch>
)

export default routes
