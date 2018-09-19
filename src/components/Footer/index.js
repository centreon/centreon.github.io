import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import { withStyles } from '@material-ui/core/styles'
import MuiTypography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    color: '#767676',
    backgroundColor: '#f5f5f5'
  },
  license: {
    marginRight: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit / 2,
    borderWidth: 0
  },
  link: {
    color: '#767676',
    textDecoration: 'none'
  },
  divider: {
    marginRight: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit / 2
  }
})

class Footer extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired
  }

  render () {
    const { classes } = this.props

    return (
      <footer className={classes.root}>
        <MuiTypography variant='body2' color='inherit'>
          Centreon 2018
        </MuiTypography>
        <a rel='license' href='http://creativecommons.org/licenses/by-sa/4.0/'>
          <img
            className={classes.license}
            alt='Creative Commons License'
            src='https://i.creativecommons.org/l/by-sa/4.0/80x15.png' />
        </a>
        <a
          className={classes.link}
          rel='license'
          href='http://creativecommons.org/licenses/by-sa/4.0/'>
          <MuiTypography variant='body2' color='inherit'>
            Creative Commons Attribution-ShareAlike 4.0
          </MuiTypography>
        </a>
        <MuiTypography
          variant='body2'
          color='inherit'
          className={classes.divider}>
          -
        </MuiTypography>
        <MuiTypography variant='body2' color='inherit'>
          Legal notice
        </MuiTypography>
        <MuiTypography
          variant='body2'
          color='inherit'
          className={classes.divider}>
          -
        </MuiTypography>
        <Link to='/slack-code-of-conduct' className={classes.link}>
          <MuiTypography variant='body2' color='inherit'>
            Slack code of conduct
          </MuiTypography>
        </Link>
        <MuiTypography
          variant='body2'
          color='inherit'
          className={classes.divider}>
          -
        </MuiTypography>
        <a
          className={classes.link}
          rel='carreer'
          href='https://www.centreon.com/en/carreer/'>
          <MuiTypography variant='body2' color='inherit'>
            Carreer
          </MuiTypography>
        </a>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
