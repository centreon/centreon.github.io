/* global location */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link, { withPrefix } from 'gatsby-link'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiDrawer from '@material-ui/core/Drawer'
import MuiList from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import MuiTypography from '@material-ui/core/Typography'

import MuiMenuIcon from '@material-ui/icons/Menu'
import MuiArrowBack from '@material-ui/icons/ArrowBack'

import logo from './logo-community.png'

import SocialButton from '../SocialButton'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    flexDirection: 'column'
  },
  block: {
    display: 'flex',
    flexDirection: 'row'
  },
  desktop: {
    width: 1280,
    alignSelf: 'center'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    height: 300
  },
  titleText: {
    backgroundColor: '#0071ce',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit * 3,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  titleImg: {
    flexGrow: 1,
    backgroundImage: `url(/centreon_labs_banner.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  extra: {
    overflow: 'hidden'
  },
  categories: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    justifyContent: 'center',
    '&:not(:first-child)': {
      marginLeft: theme.spacing.unit
    }
  },
  joinus: {
    height: 300,
    borderRadius: '300px/200px'
  },
  mobileBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row'
  },
  mobileImage: {
    height: 50
  },
  mobileLogo: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center'
  },
  menu: {
    width: 300
  },
  menuTitle: {
    ...theme.typography.title,
    fontSize: 24
  },
  menuItem: {
    ...theme.typography.body1,
    fontSize: 16,
    paddingLeft: theme.spacing.unit * 4
  },
  menuItemSelected: {
    backgroundColor: theme.palette.grey[300]
  }
})

class Header extends React.Component {
  static extraHeight = 332

  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The search index engine */
    searchIndex: PropTypes.object,
    /* If display extra information */
    extra: PropTypes.bool.isRequired,
    /* The list of categories to display */
    categories: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    /* The list of events to display */
    events: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    /* Call when the height of the header change */
    onChangeHeight: PropTypes.func.isRequired
  }

  static defaultProps = {
    extra: true,
    categories: [],
    onChangeHeight: () => {}
  }

  static oldLocation = null

  static routeWithExtra = [
    {
      path: '/',
      exact: true
    },
    {
      path: '/category',
      exact: false
    }
  ]

  state = {
    extraHidden: false,
    menuOpen: false,
    searchOpen: false
  }

  static getDerivedStateFromProps (newProps, oldState) {
    const state = {...oldState}

    if (typeof location !== 'undefined' &&
      Header.oldLocation === location.pathname) {
      return state
    }

    state.extraHidden = true
    state.menuOpen = false

    if (typeof location !== 'undefined') {
      Header.routeWithExtra.map((route) => {
        const path = withPrefix(route.path)

        if (route.exact && path === location.pathname) {
          state.extraHidden = false
        } else if (location.pathname
            .match(new RegExp(`^${path.replace('/', '\\/')}/`))) {
          state.extraHidden = false
        }
      })
    }

    return state
  }

  componentDidUpdate () {
    if (Header.oldLocation !== location.pathname) {
      this.props.onChangeHeight(this.state.extraHidden)
    }
    Header.oldLocation = location.pathname
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.onChangeHeight(this.state.extraHidden)
    })
    Header.oldLocation = location.pathname

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    if (window.scrollY > 5) {
      this.setState({
        extraHidden: true
      })
      this.props.onChangeHeight(true)
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  handleOpenSearch = () => {
    this.setState({
      searchOpen: true
    })
  }

  handleCloseSearch = () => {
    this.setState({
      searchOpen: false
    })
  }

  isSelected (slug) {
    if (typeof window !== 'undefined') {
      return window.location.pathname.match(new RegExp(`/category/${slug}$`)) !== null
    }
    return false
  }

  render () {
    const { classes } = this.props

    return (
      <header className={classes.root} ref={this.header}>
        <Hidden mdDown>
          <div
            className={classnames(
              classes.block,
              classes.title
            )}>
            <Link to='/' className={classes.titleText}>
              <MuiTypography
                variant='display1'
                color='inherit'
                style={{
                  fontWeight: 700
                }}
                gutterBottom>
                CENTREON LABS
              </MuiTypography>
              <MuiTypography
                variant='headline'
                color='inherit'>
                Discover the backstage of our R&D Team
              </MuiTypography>
            </Link>
            <div className={classes.titleImg} />
          </div>
          <Divider />
        </Hidden>
        <Hidden lgUp>
          <MuiDrawer
            open={this.state.menuOpen}
            onClose={this.toggleMenu}>
            <div className={classes.menu}>
              <MuiIconButton onClick={this.toggleMenu}>
                <MuiArrowBack />
              </MuiIconButton>
              <MuiList>
                <MuiListItem className={classes.menuTitle}>
                  Social Network
                </MuiListItem>
                <SocialButton itemClass={classes.menuItem} />
              </MuiList>
            </div>
          </MuiDrawer>
          <div className={classes.mobileBar}>
            <MuiIconButton onClick={this.toggleMenu}>
              <MuiMenuIcon />
            </MuiIconButton>
            <Link to='/' className={classes.mobileLogo}>
              <img
                className={classes.mobileImage}
                src={logo}
                alt='CentreonLabs' />
            </Link>
          </div>
        </Hidden>
      </header>
    )
  }
}

export default withStyles(styles)(Header)
