import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Footer extends Component {

  render() {

    return (
      <footer>
        <Link href={'https://github.com/reimertz/anolog'}>source</Link>
        <span> ■ </span>
        <Link href={'https://github.com/reimertz/anolog/wiki'}>support</Link>
        <span> ■ </span>
        <Link href={'https://github.com/reimertz/anolog/issues'}>report a bug</Link>
      </footer>
    )
  }
}

export default connect()(Footer)