import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import MuiTooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit / 2,
    '&:not(:first-child)': {
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderLeftColor: '#84BD00'
    }
  },
  dateFont: {
    ...theme.typography.title,
    color: '#0072CE',
    fontSize: 20
  }
})

class ExtraDate extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  }

  getDay () {
    const date = new Date(this.props.date)
    const string = '00' + String(date.getDate())
    return string.substr(string.length - 2)
  }

  getMonth () {
    const date = new Date(this.props.date)
    const string = '00' + String(date.getMonth() + 1)
    return string.substr(string.length - 2)
  }

  render () {
    const { classes, title } = this.props

    return (
      <MuiTooltip title={title}>
        <div className={classes.root}>
          <div className={classes.dateFont}>{this.getDay()}</div>
          <div className={classes.dateFont}>{this.getMonth()}</div>
        </div>
      </MuiTooltip>
    )
  }
}

export default withStyles(styles)(ExtraDate)
