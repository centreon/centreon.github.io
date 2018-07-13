/* global graphql */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Helmet from 'react-helmet'
import { Motion, spring } from 'react-motion'

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'

import 'typeface-roboto'

import CategoryContext from '../context/Category'
import Header from '../components/Header'
import SocialButton from '../components/SocialButton'
import Footer from '../components/Footer'

const theme = createMuiTheme()

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
    const { data, classes, children } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet title={data.site.siteMetadata.title}>
          <html lang='en' />
        </Helmet>
        <div className={classes.root}>
          <Header
            onChangeHeight={this.handleChangeHeaderHeight}
            searchIndex={data.searchIndex.index}
            categories={data.categories.edges
              .filter(({ node }) => {
                return node.inMenu
              })
              .map(({ node }) => {
                return node
              })}
            events={data.events.edges
              .filter(({ node }) => {
                const dateCurrent = moment()
                let dateCompare
                if (node.dateEnd) {
                  dateCompare = moment(node.dateEnd)
                } else {
                  dateCompare = moment(node.dateStart)
                }

                return dateCompare.isSameOrAfter(dateCurrent, 'day')
              })
              .map(({ node }) => {
                return node
              })} />
          <CategoryContext.Provider value={data.categories.edges
                .map(({ node }) => {
                  return node
                })}>
            <Hidden mdDown>
              <Motion style={{
                marginTop: spring(this.state.headerClose
                  ? 149 + theme.spacing.unit * 4
                  : 481 + theme.spacing.unit * 4)
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
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Layout)

export const query = graphql`
query SiteTitleQuery {
  site {
    siteMetadata {
      title
    }
  }
  searchIndex: siteSearchIndex {
    index
  }
  categories: allCategoriesJson {
    edges {
      node {
        slug
        display
        icon
        inMenu
      }
    }
  }
  events: allCalendarJson(
    sort: { fields: [fields___date], order: ASC}
  ) {
    edges {
      node {
        fields {
          date
          slug
        }
        title
        dateStart
        desc
      }
    }
  }
}
`
