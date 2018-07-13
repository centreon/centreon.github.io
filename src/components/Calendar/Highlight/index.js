import React from 'react'
import PropTypes from 'prop-types'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

import { withStyles } from '@material-ui/core/styles'
import MuiTooltip from '@material-ui/core/Tooltip'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  date: {
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
    marginRight: theme.spacing.unit
  },
  dateFont: {
    ...theme.typography.title,
    color: '#0072CE',
    fontSize: 22
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    padding: 2
  },
  infoTitle: {
    ...theme.typography.title,
    color: '#84BD00',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  infoDesc: {
    ...theme.typography.title,
    fontSize: 11
  }
})

class Highlight extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string
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
    const { classes, title, desc } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.date}>
          <div className={classes.dateFont}>{this.getDay()}</div>
          <div className={classes.dateFont}>{this.getMonth()}</div>
        </div>
        <div className={classes.information}>
          <MuiTooltip title={title}>
            <ResponsiveEllipsis
              className={classes.infoTitle}
              text={title}
              maxLine='1'
              basedOn='letters'
              />
          </MuiTooltip>
          <MuiTooltip title={desc}>
            <ResponsiveEllipsis
              className={classes.infoDesc}
              text={desc}
              maxLine='2'
              basedOn='letters'
              />
          </MuiTooltip>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Highlight)
