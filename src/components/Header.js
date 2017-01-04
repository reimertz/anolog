import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { uploadPost } from '../actions/post'

class Header extends Component {

  onPublish() {
    const { dispatch } = this.props

    dispatch(uploadPost())
  }
  render() {
    const currentPath = this.props.routing.locationBeforeTransitions.pathname
    const isFork = currentPath.indexOf('/fork') >= 0
    const isCreating = currentPath.indexOf('create') >= 0 || isFork
    const isPost = (currentPath.split('/').length -1) === 3

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
                  ? <Link to={`${currentPath}/fork`} className="bg">Fork</Link>
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