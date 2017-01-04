import React, { Component } from 'react'
import { connect } from 'react-redux'

import Editor from '../components/Editor'

import { whyPost } from '../data/postData'

class ThinkingFace extends Component {
  async componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {


  }

  render() {
    return (
      <div>
        <Editor content={whyPost} editable={false} />
      </div>
    )
  }
}

export default connect()(ThinkingFace)

