import React, { Component } from 'react'
import { connect } from 'react-redux'

import Editor from '../components/Editor'

import { notFoundPost } from '../data/postData'

class NotFound extends Component {
  async componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <Editor content={notFoundPost} editable={false} />
      </div>
    )
  }
}

export default connect()(NotFound)

