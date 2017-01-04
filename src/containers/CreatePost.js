import React, { Component } from 'react'
import { connect } from 'react-redux'

import Editor from '../components/Editor'

class CreatePost extends Component {

  async componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <Editor editable={true} />
      </div>
    )
  }
}

export default connect()(CreatePost)

