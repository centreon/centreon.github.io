import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#e4e4e4',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    borderRadius: 15,
    cursor: 'pointer',
    '&:not(:first-child)': {
      marginLeft: theme.spacing.unit
    }
  },
  selected: {
    backgroundColor: '#0072CE',
    color: '#fff'
  },
  text: {
    fontSize: 12,
    lineHeight: '24px',
    color: 'inherit'
  }
})

class Category extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The category information */
    category: PropTypes.object.isRequired
  }

  handleClick = () => {
    if (this.isSelected()) {
      navigateTo('/')
    } else {
      navigateTo(`/category/${this.props.category.slug}`)
    }
  }

  isSelected () {
    if (typeof window !== 'undefined') {
      return window.location.pathname.match(new RegExp(`/category/${this.props.category.slug}$`)) !== null
    }
    return false
  }

  render () {
    const { classes, category } = this.props

    return (
      <div
        className={classnames(
          classes.root,
          {[classes.selected]: this.isSelected()}
        )} onClick={this.handleClick}>
        <Typography variant='button' className={classes.text}>
          {category.display}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Category)
