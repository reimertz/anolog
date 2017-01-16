import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

import 'whatwg-fetch'
import "./stylesheets/main.scss"
import "../node_modules/Dante2/src/styles/dante.scss"

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)



import 'whatwg-fetch'

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)