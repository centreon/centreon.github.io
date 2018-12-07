import React from 'react'
import { navigateTo } from 'gatsby-link'

class Index extends React.Component {
  componentDidMount () {
    navigateTo('/register-slack')
  }

  render () {
    return <div />
  }
}

export default Index
