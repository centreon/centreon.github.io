/* global location */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link, { withPrefix } from 'gatsby-link'
import { Motion, spring } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiDrawer from '@material-ui/core/Drawer'
import MuiList from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import MuiListItemIcon from '@material-ui/core/ListItemIcon'

import MuiMenuIcon from '@material-ui/icons/Menu'
import MuiSearchIcon from '@material-ui/icons/Search'
import MuiArrowBack from '@material-ui/icons/ArrowBack'

import logo from './logo-community.png'
import joinus from './we_hiring.png'

import SearchBar from '../SearchBar'
import Calendar from '../Calendar'
import Category from '../Category'
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  desktop: {
    width: 1280,
    alignSelf: 'center'
  },
  title: {
    justifyContent: 'space-around'
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
    borderRadius: '300px/150px'
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
  }
})

class Header extends React.Component {
  static extraHeight = 332

  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The search index engine */
    searchIndex: PropTypes.object.isRequired,
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

    if (Header.oldLocation === location.pathname) {
      return state
    }

    state.extraHidden = true
    state.menuOpen = false

    Header.routeWithExtra.map((route) => {
      const path = withPrefix(route.path)

      if (route.exact && path === location.pathname) {
        state.extraHidden = false
      } else if (location.pathname.match(new RegExp(`^${path.replace('/', '\\/')}/`))) {
        state.extraHidden = false
      }
    })

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
      this.props.onChangeHeight(false)
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
    } /* else {
      this.setState({
        extraHidden: false
      })
      this.props.onChangeHeight(false)
    } */
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

  render () {
    const { classes, searchIndex, categories, events } = this.props

    return (
      <header className={classes.root} ref={this.header}>
        <Hidden mdDown>
          <div className={classnames(
            classes.block,
            classes.desktop,
            classes.title
          )}>
            <Link to='/'>
              <img
                src={logo}
                alt='CentreonLabs' />
            </Link>
            <SearchBar searchIndex={searchIndex} />
          </div>
          {this.props.extra
            ? <Motion
              style={{height: spring(this.state.extraHidden
                ? 0
                : Header.extraHeight)}}>
              {(style) => {
                return (
                  <div style={style} className={classnames(
                    classes.block,
                    classes.desktop,
                    classes.title,
                    classes.extra
                  )}>
                    <Calendar events={events} />
                    <a href='https://www.centreon.com/en/community/'>
                      <img
                        src={joinus}
                        alt='Join the Centreon Community'
                        className={classes.joinus} />
                    </a>
                  </div>
                )
              }}
            </Motion>
            : null}
          <Divider />
          <div className={classnames(
            classes.block,
            classes.categories
          )}>
            {categories.map((category) => {
              return <Category key={category.slug} category={category} />
            })}
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
                  Category
                </MuiListItem>
                {categories.map((category) => {
                  const Icon = require(`../Category/Icon/${category.icon}`)

                  return (
                    <MuiListItem
                      key={category.slug}
                      className={classes.menuItem}
                      component={Link}
                      to={`/category/${category.slug}`}
                      button>
                      <MuiListItemIcon><Icon /></MuiListItemIcon>
                      {category.display}
                    </MuiListItem>
                  )
                })}
                <MuiListItem className={classes.menuTitle}>
                  Social Network
                </MuiListItem>
                <SocialButton itemClass={classes.menuItem} />
                <MuiListItem
                  className={classes.menuTitle}
                  component={Link}
                  to='/events'
                  button
                  >
                  Events
                </MuiListItem>
              </MuiList>
            </div>
          </MuiDrawer>
          <div className={classes.mobileBar}>

            {this.state.searchOpen
              ? <SearchBar
                searchIndex={searchIndex}
                onSearchClose={this.handleCloseSearch} />
              : <React.Fragment>
                <MuiIconButton onClick={this.toggleMenu}>
                  <MuiMenuIcon />
                </MuiIconButton>
                <Link to='/' className={classes.mobileLogo}>
                  <img
                    className={classes.mobileImage}
                    src={logo}
                    alt='CentreonLabs' />
                </Link>
                <MuiIconButton onClick={this.handleOpenSearch}>
                  <MuiSearchIcon />
                </MuiIconButton>
              </React.Fragment>
            }
          </div>
        </Hidden>
      </header>
    )
  }
}

export default withStyles(styles)(Header)
