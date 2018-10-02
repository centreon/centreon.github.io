import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Index } from 'elasticlunr'
import { navigateTo } from 'gatsby-link'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import MuiFormControl from '@material-ui/core/FormControl'
import MuiInput from '@material-ui/core/Input'
import MuiInputAdornment from '@material-ui/core/InputAdornment'
import MuiMenuList from '@material-ui/core/MenuList'
import MuiMenuItem from '@material-ui/core/MenuItem'
import MuiPaper from '@material-ui/core/Paper'
import MuiIconButton from '@material-ui/core/IconButton'

import MuiSearchIcon from '@material-ui/icons/Search'
import MuiKeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'

import Highlight from './Highlight'

const styles = theme => ({
  root: {
    width: 380,
    height: 'fit-content',
    position: 'relative'
  },
  flex: {
    flexGrow: 1,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: theme.palette.grey[400],
    borderRadius: `${theme.shape.borderRadius}px`,
    borderStyle: 'solid',
    padding: theme.spacing.unit / 2,
    backgroundColor: '#fff'
  },
  result: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer,
    left: 0,
    right: 0
  },
  mobileResult: {
    top: 48
  },
  searchItem: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    ...theme.typography.title,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: 2
  },
  titleHighlight: {
    fontWeight: theme.typography.title.fontWeight + 500,
    textDecoration: 'underline'
  },
  desc: {
    ...theme.typography.title,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 100
  },
  descHighlight: {
    fontWeight: 600,
    textDecoration: 'underline'
  }
})

class SearchBar extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The search index engine */
    searchIndex: PropTypes.object.isRequired,
    /* Function call when the searh is finish */
    onSearchClose: PropTypes.func
  }

  state = {
    search: '',
    result: []
  }

  index = null

  getIndex () {
    if (this.index) {
      return this.index
    }
    return Index.load(this.props.searchIndex)
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    }, () => {
      const index = this.getIndex()
      this.setState({
        result: index.search(
          this.state.search,
          {
            fields: {
              title: {boost: 3, bool: 'AND'},
              description: {boost: 1},
              categories: {boost: 2}
            },
            bool: 'OR',
            expand: true
          }
        ).map((node) => {
          return index.documentStore.getDoc(node.ref)
        })
      })
    })
  }

  handleClick = (path) => {
    navigateTo(`/post${path}`)
    this.setState({
      search: '',
      result: []
    })
    if (this.props.onSearchClose) {
      this.props.onSearchClose()
    }
  }

  getDesktop () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <MuiFormControl fullWidth>
          <MuiInput
            disableUnderline
            className={classes.input}
            placeholder='Search'
            value={this.state.search}
            onChange={this.handleSearch}
            endAdornment={
              <MuiInputAdornment position='end'>
                <MuiSearchIcon />
              </MuiInputAdornment>
            } />
        </MuiFormControl>
        {this.getResult(true)}
      </div>
    )
  }

  getMobile () {
    const { classes } = this.props

    return (
      <React.Fragment>
        <MuiIconButton onClick={this.props.onSearchClose}>
          <MuiKeyboardArrowLeftIcon />
        </MuiIconButton>
        <MuiFormControl className={classes.flex}>
          <MuiInput
            autoFocus
            placeholder='Search'
            value={this.state.search}
            onChange={this.handleSearch} />
        </MuiFormControl>
        <MuiIconButton>
          <MuiSearchIcon />
        </MuiIconButton>
        {this.getResult()}
      </React.Fragment>
    )
  }

  getResult (desktop = false) {
    const { classes } = this.props

    return (
      <React.Fragment>
        {this.state.result.length > 0
          ? <MuiPaper
            className={classnames(
              classes.result,
              {[classes.mobileResult]: !desktop}
            )}
            elevation={1}
            square
            >
            <MuiMenuList>
              {this.state.result.map((result) => {
                return (
                  <MuiMenuItem
                    onClick={() => { this.handleClick(result.base) }}
                    className={classes.searchItem}
                    key={result.slug}>
                    <div className={classes.title}>
                      <Highlight
                        text={result.title}
                        highlight={this.state.search}
                        highlightClassName={classes.titleHighlight}
                        />
                    </div>
                    <div className={classes.desc}>
                      <Highlight
                        text={result.description}
                        highlight={this.state.search}
                        highlightClassName={classes.descHighlight}
                        truncate
                        />
                    </div>
                  </MuiMenuItem>
                )
              })}
            </MuiMenuList>
          </MuiPaper>
          : null
        }
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Hidden mdDown>
          {this.getDesktop()}
        </Hidden>
        <Hidden lgUp>
          {this.getMobile()}
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SearchBar)
