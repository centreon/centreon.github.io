import React from 'react'
import { JssProvider, SheetsRegistry } from 'react-jss'
import ReactDOMServer from 'react-dom/server'

import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents
}) => {
  const generateClassName = createGenerateClassName()
  const sheetsRegistry = new SheetsRegistry()

  const bodyHtml = ReactDOMServer.renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}>
      <MuiThemeProvider theme={createMuiTheme()} sheetsManager={new Map()}>
        <CssBaseline />
        {bodyComponent}
      </MuiThemeProvider>
    </JssProvider>
  )

  replaceBodyHTMLString(bodyHtml)
  setHeadComponents([
    <style
      type='text/css'
      id='server-side-jss'
      key='server-side-jss'
      dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }} />
  ])
}
