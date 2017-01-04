import React from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <DevTools />
      <Router history={history} routes={routes} />
    </div>
  </Provider>
)

export default Root