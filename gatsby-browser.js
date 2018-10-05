import React from 'react'
import { JssProvider } from 'react-jss'

import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export const onInitialClientRender = () => {
  const ssStyles = window.document.getElementById('server-side-jss')
  ssStyles && ssStyles.parentNode.removeChild(ssStyles)
}

export const wrapRootComponent = ({ Root }) => {
  const generateClassName = createGenerateClassName()

  return () => (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createMuiTheme()}>
        <CssBaseline />
        <Root />
      </MuiThemeProvider>
    </JssProvider>
  )
}
