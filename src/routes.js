import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Post from './containers/Post'
import Fork from './containers/Fork'
import NotFound from './containers/NotFound'
import Home from './containers/Home'
import CreatePost from './containers/CreatePost'
import ThinkingFace from './containers/ThinkingFace'

export default
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/not-found" component={NotFound} />
    <Route path="/thinking-face" component={ThinkingFace} />
    <Route path="/create" component={CreatePost} />

    <Route path=":hashId/:key" component={Post} />
    <Route path=":hashId/:key/fork" component={Fork} />

    <Route path="*" component={NotFound}/>
  </Route>