import JssProvider from 'react-jss'
import { renderToString } from 'react-dom/server'
import React from 'react'

import getPageContext from './src/getPageContext'

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const pageContext = getPageContext()

  replaceBodyHTMLString(
    renderToString(
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}>
        {React.cloneElement(bodyComponent, {
          pageContext
        })}
      </JssProvider>
    )
  )

  setHeadComponents([
    <style
      type='text/css'
      id='server-side-jss'
      key='server-side-jss'
      dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
    />
  ])
}

exports.onRenderBody = ({ setHeadComponents }) => {
  return setHeadComponents([])
}
