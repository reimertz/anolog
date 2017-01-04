import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import editor from './editor'
import post from './post'

const rootReducer = combineReducers({
  post,
  editor,
  routing
})

export default rootReducer