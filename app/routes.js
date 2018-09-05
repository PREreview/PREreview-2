import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// import { AuthenticatedComponent as Private } from 'pubsweet-client'

import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'
import PasswordReset from 'pubsweet-component-password-reset-frontend/PasswordReset'

import Dashboard from './components/Dashboard'
import AssignReviewers from './components/AssignReviewers'
import NavigationBar from './components/NavigationBar'
import Submit from './components/Submit'
import TeamManager from './components/TeamManager'

import AdminRoute from './components/AdminRoute'
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
            <Route
              component={AssignReviewers}
              exact
              path="/assign-reviewers/:id"
            />
            <Route component={Submit} exact path="/article/:id" />
            <AdminRoute component={TeamManager} exact path="/teams" />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Page>
      </PageLayout>
    </Private>
  </Switch>
)

export default routes
