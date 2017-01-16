import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { uploadPost } from '../actions/post'

class Header extends Component {

  onPublish() {
    const { dispatch } = this.props

    dispatch(uploadPost())
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { location } = this.props.router
    const   nextLocation = nextProps.router.location

    return location.pathname === nextLocation.pathname
  }

  render() {
    const { params, location } = this.props.router
    const { pathname } = location
    const { hashId, key } = params

    const isFork = pathname.indexOf('/fork') >= 0
    const isCreating = pathname.indexOf('create') >= 0 || isFork
    const isPost = (hashId && key) || isFork

    return (
      <header>
        <left>
          <Link to={'/'}><h1>anolog ✐</h1></Link>
        </left>

        <right>
          { isCreating
            ? <Link onClick={this.onPublish.bind(this)} className="bg">Publish</Link>
            : <div style={{display: 'flex',flexDirection: 'row'}}>
                { isPost && !isFork
                  ? <Link to={`${pathname}/fork`} className="bg">Fork</Link>
                  : false
                }
                <Link to={'/create'} className="bg">Write a story</Link>
              </div>
          }
        </right>
      </header>
    )
  }
}

const inject = (state) => {
  return {
    post: state.post,
    editor: state.editor,
    routing: state.routing
  }
}

export default connect(inject)(Header)