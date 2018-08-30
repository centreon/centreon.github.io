import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

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
  text: {
    marginLeft: theme.spacing.unit,
    fontSize: 12,
    lineHeight: '24px'
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
    navigateTo(`/category/${this.props.category.slug}`)
  }

  render () {
    const { classes, category } = this.props

    const Icon = require(`./Icon/${category.icon}`)

    return (
      <div className={classes.root} onClick={this.handleClick}>
        <Icon />
        <Typography variant='button' className={classes.text}>
          {category.display}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Category)
