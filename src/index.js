import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

import "../node_modules/Dante2/docs/dante-vendors.js"
import "../node_modules/Dante2/app/styles/dante.scss"
import "../node_modules/Dante2/docs/dante.js"
import "./stylesheets/main.scss"

import 'whatwg-fetch'

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)