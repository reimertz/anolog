import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
  render() {

    const { children } = this.props

    return (
      <div className="container">
        <Header />
        <main>
          { children }
        </main>
        <Footer />
      </div>
    )
  }
}

export default App