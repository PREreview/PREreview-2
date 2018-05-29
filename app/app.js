import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import createHistory from 'history/createBrowserHistory'

import { configureStore, Root } from 'pubsweet-client'
import theme from '@pubsweet/coko-theme'

import routes from './routes'

const history = createHistory()
const store = configureStore(history, {})

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Root history={history} routes={routes} store={store} theme={theme} />,
  rootEl,
)

export default hot(module)(Root)
