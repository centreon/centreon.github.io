import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import MuiListItem from '@material-ui/core/ListItem'
import MuiListItemIcon from '@material-ui/core/ListItemIcon'

import WebIcon from '@material-ui/icons/Web'

import ExtendButton from '../ExtendButton'
import Slack from './Slack'
import TwitterIcon from './Network/Twitter'
import GithubIcon from './Network/Github'
import LinkedinIcon from './Network/Linkedin'
import SlackIcon from './Network/Slack'

const styles = theme => ({
  base: {
    position: 'fixed'
  }
})

class SocialButton extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The top start position */
    top: PropTypes.number.isRequired,
    /* The right start position */
    right: PropTypes.number.isRequired,
    /* The size of the circle button */
    size: PropTypes.number.isRequired,
    /* The class for list item */
    itemClass: PropTypes.string
  }

  static defaultProps = {
    size: 34,
    top: 0,
    right: 0,
    desktop: false
  }

  getDesktop () {
    const { classes, theme, size } = this.props

    return (
      <React.Fragment>
        <ExtendButton
          className={classes.base}
          size={size}
          icon={TwitterIcon}
          color='#00aced'
          text='@CentreonLabs'
          openSide='left'
          textColor='#fff'
          style={{
            top: this.props.top,
            right: this.props.right
          }}
          link='https://twitter.com/CentreonLabs'
          />
        <ExtendButton
          className={classes.base}
          size={size}
          icon={GithubIcon}
          color='#181717'
          text='centreon'
          openSide='left'
          textColor='#fff'
          style={{
            top: this.props.top + theme.spacing.unit + size,
            right: this.props.right
          }}
          link='https://github.com/centreon'
          />
        <ExtendButton
          className={classes.base}
          size={size}
          icon={LinkedinIcon}
          color='#0077B5'
          text='centreon'
          openSide='left'
          textColor='#fff'
          style={{
            top: this.props.top + (theme.spacing.unit + size) * 2,
            right: this.props.right
          }}
          link='https://www.linkedin.com/company/merethis'
          />
        <ExtendButton
          className={classes.base}
          size={size}
          icon={WebIcon}
          color='#0072CE'
          text='www.centreon.com'
          openSide='left'
          textColor='#fff'
          style={{
            top: this.props.top + (theme.spacing.unit + size) * 3,
            right: this.props.right
          }}
          link='https://www.centreon.com/en/'
          />
        <Slack
          className={classes.base}
          size={size}
          text='centreon'
          openSide='left'
          style={{
            top: this.props.top + (theme.spacing.unit + size) * 4,
            right: this.props.right
          }}
          link='https://centreon.slack.com/'
          />
      </React.Fragment>
    )
  }

  getMobile () {
    const { itemClass } = this.props

    return (
      <React.Fragment>
        <MuiListItem
          className={itemClass}
          component='a'
          href='https://twitter.com/CentreonLabs'
          button>
          <MuiListItemIcon style={{color: '#00aced'}}>
            <TwitterIcon nativeColor='inherit' />
          </MuiListItemIcon>
          @CentreonLabs
        </MuiListItem>
        <MuiListItem
          className={itemClass}
          component='a'
          href='https://github.com/centreon'
          button>
          <MuiListItemIcon style={{color: '#181717'}}>
            <GithubIcon nativeColor='inherit' />
          </MuiListItemIcon>
          centreon
        </MuiListItem>
        <MuiListItem
          className={itemClass}
          component='a'
          href='https://www.linkedin.com/company/merethis'
          button>
          <MuiListItemIcon style={{color: '#0077B5'}}>
            <LinkedinIcon nativeColor='inherit' />
          </MuiListItemIcon>
          centreon
        </MuiListItem>
        <MuiListItem
          className={itemClass}
          component='a'
          href='https://www.centreon.com/en/'
          button>
          <MuiListItemIcon style={{color: '#0072CE'}}>
            <WebIcon nativeColor='inherit' />
          </MuiListItemIcon>
          centreon
        </MuiListItem>
        <MuiListItem
          className={itemClass}
          component={Link}
          to='/register-slack'
          button>
          <MuiListItemIcon style={{color: '#56B68B'}}>
            <SlackIcon nativeColor='inherit' />
          </MuiListItemIcon>
          centreon
        </MuiListItem>
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

export default withStyles(styles, {withTheme: true})(SocialButton)
