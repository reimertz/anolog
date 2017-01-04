import React, { Component } from 'react'
import Header from '../components/Header'
class App extends Component {
  render() {

    const { children } = this.props

    return (
      <div>
        <Header />
        { children }
      </div>
    )
  }
}

export default App