import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'

class NotFoundPage extends Component {
  componentDidMount () {
    navigateTo('/register-slack')
  }

  render () {
    return <div />
  }
}

export default NotFoundPage
