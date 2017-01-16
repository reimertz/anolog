import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="container">
        <Header  {...this.props} />
        <main>
          { children }
        </main>
        <Footer {...this.props} />
      </div>
    )
  }
}

export default App