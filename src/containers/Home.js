import React, { Component } from 'react'
import { connect } from 'react-redux'

import Editor from '../components/Editor'

import { homePost } from '../data/postData'

class Home extends Component {
  async componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {


  }

  render() {
    return (
      <div>
        <Editor content={homePost} editable={false} />
      </div>
    )
  }
}

export default connect()(Home)

