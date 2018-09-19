import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

import slackLogo from '../static/slack.png'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    height: 200,
    alignSelf: 'center'
  },
  mobileLogo: {
    height: 'auto',
    width: '70%'
  },
  title: {
    ...theme.typography.title,
    fontSize: 28,
    alignSelf: 'center',
    marginTop: theme.spacing.unit * 3,
    color: '#009FDF'
  },
  content: {
    ...theme.typography.body2,
    fontSize: 14
  },
  gutterTop: {
    marginTop: theme.spacing.unit
  }
})

class SlackCodeOfConduct extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render () {
    const { classes, width } = this.props

    return (
      <div className={classes.root}>
        <img src={slackLogo} className={classnames(
          classes.logo,
          {[classes.mobileLogo]: isWidthDown('md', width)}
          )} />
        <div className={classes.title}>Code of Conduct</div>
        <div className={classnames(classes.content, classes.gutterTop)}>
          <p>The Centreon Slack is a place where all the members of  the community can discuss together.
          Please do not post stuff about sales, business opportunities and such here.</p>
          <p>The following usage guidelines should be common sense, and apply mostly to public channels.
          Channel creators promise to follow the Channel Guidelines when creating new channels.</p>
          <ul>
            <li>Be polite, and keep it clean.</li>
            <li>Cultivate a network of support & encouragement for each other</li>
            <li>Everybody is welcome to contribute regardless of its experience or skill level. If you want to hang back and lurk, that’s cool, too.</li>
            <li>Be courteous. This means:
              <ul>
                <li>Don’t use the @channel function unless you really need to notify everyone in the conversation.</li>
                <li>Try to limit one-on-one idle chatter in channels. The rest of the channel members are probably getting distracted by constant notifications and may turn off notifications for that channel as a result.</li>
              </ul>
            </li>
            <li>Do not share files or messages over Slack that have sensitive information in them.</li>
          </ul>
          <p>Please read the channel description to known the purpose of the channel</p>
          <p>If you have an issue or a request, don’t hesitate to contact an administrator.</p>
          <p>Current administrators :</p>
          <ul>
            <li>Maximilien Bersoult</li>
            <li>Eric Coquard</li>
            <li>Hung Bui</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(SlackCodeOfConduct)
