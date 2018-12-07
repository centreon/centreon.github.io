/* global graphql */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Helmet from 'react-helmet'
import { Motion, spring } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import 'typeface-roboto'

import 'prismjs/themes/prism-solarizedlight.css'

import CategoryContext from '../context/Category'
import Header from '../components/Header'
import SocialButton from '../components/SocialButton'
import Footer from '../components/Footer'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  },
  desktop: {
    alignSelf: 'center',
    width: 1280,
    display: 'flex',
    flexDirection: 'column'
  },
  mobile: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50
  },
  flex: {
    flexGrow: 1
  }
})

class Layout extends React.Component {
  static propTypes = {
    /* Data from graphql */
    data: PropTypes.object.isRequired,
    /* CSS classes */
    classes: PropTypes.object.isRequired
  }

  state = {
    headerClose: false
  }

  handleChangeHeaderHeight = (close) => {
    this.setState({
      headerClose: close
    })
  }

  render () {
    const { data, classes, children, theme } = this.props

    return (
      <Fragment>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang='en' />
          <link rel='icon' type='image/png' href='favicon.png' />
        </Helmet>
        <div className={classes.root}>
          <Header
            onChangeHeight={this.handleChangeHeaderHeight}
            categories={[]}
            events={[]} />
          <CategoryContext.Provider value={[]}>
            <Hidden mdDown>
              <Motion style={{
                marginTop: spring(this.state.headerClose
                  ? 330 + theme.spacing.unit * 4
                  : 330 + theme.spacing.unit * 4)
              }}>
                {(style) => (
                  <React.Fragment>
                    <SocialButton
                      top={style.marginTop}
                      right={theme.spacing.unit * 2}
                      />
                    <main
                      className={classes.desktop}
                      style={style}>
                      {children()}
                    </main>
                  </React.Fragment>
                )}
              </Motion>
            </Hidden>
            <Hidden lgUp>
              <main
                className={classes.mobile}>
                {children()}
              </main>
            </Hidden>
          </CategoryContext.Provider>
          <div className={classes.flex} />
          <Footer />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout)

export const query = graphql`
query SiteTitleQuery {
  site {
    siteMetadata {
      title
    }
  }
}
`
