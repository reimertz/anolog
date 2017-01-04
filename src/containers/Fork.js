import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions/post'

import Editor from '../components/Editor'

class Fork extends Component {
  async componentWillMount() {
    const { dispatch } = this.props
    const { hash1, hash2, key} = this.props.routeParams

    dispatch(fetchPost(hash1, hash2, key))
  }

  render() {
    const { post } = this.props

    return (
      <div>
        { post.isFetching
          ? false
          : <Editor content={post.post} editable={true} />
        }
      </div>
    )
  }
}


const inject = (state) => {
  return {
    post: state.post,
    editor: state.post
  }
}

export default connect(inject)(Fork)