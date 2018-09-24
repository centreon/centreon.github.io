import React from 'react'
import Link from 'gatsby-link'
import EmailValidator from 'email-validator'
import classnames from 'classnames'
import compose from 'recompose/compose'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import MuiTextfield from '@material-ui/core/TextField'
import MuiTypography from '@material-ui/core/Typography'
import MuiCheckbox from '@material-ui/core/Checkbox'
import MuiButton from '@material-ui/core/Button'

import SlackIcon from '../components/SocialButton/Network/Slack'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    alignSelf: 'center',
    marginTop: theme.spacing.unit * 2
  },
  rootDesktop: {
    width: '30%',
    padding: theme.spacing.unit * 2,
    backgroundColor: '#fff',
    marginTop: 0
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: theme.spacing.unit * 2
  },
  titleIcon: {
    marginRight: theme.spacing.unit
  },
  titleText: {
    ...theme.typography.title,
    color: '#009FDF',
    fontSize: 22,
    lineHeight: '24px'
  },
  description: {
    fontSize: '1rem',
    marginBottom: theme.spacing.unit
  },
  validated: {
    display: 'flex',
    flexDirection: 'row'
  },
  conditionsLink: {
    textDecoration: 'none',
    alignSelf: 'center'
  },
  error: {
    ...theme.typography.body1,
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit
  }
})

class RegisterSlack extends React.Component {
  state = {
    email: '',
    validated: false,
    errorMsg: '',
    emailInError: false
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      error: '',
      emailInError: false
    })
  }

  handleSendInvitation = (event) => {
    event.preventDefault()

    if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        errorMsg: 'The email must be valid.',
        emailInError: true
      })
      return
    }
    if (!this.state.validaded) {
      this.setState({
        errorMsg: 'The code of conduct must be read and validate.',
        errorOpen: true
      })
      return
    }
    this.setState({
      sending: true
    })
    axios.post(
      'https://i94v3240k5.execute-api.us-west-2.amazonaws.com/prod/invite',
      {
        email: this.state.email
      }
    ).then((res) => {
      const newState = {
        email: '',
        sending: false
      }

      let data
      if (typeof res.data === 'string' || res.data instanceof String) {
        data = JSON.parse(res.data)
      } else {
        data = res.data
      }
      if (!data.ok) {
        if (data.error === 'already_in_team') {
          newState.errorMsg = `You've already joined this team! Please log in at https://centreon.slack.com.`
        } else if (data.error === 'already_invited') {
          newState.errorMsg = `You're already invited! Please check your email.`
        } else {
          newState.email = this.state.email
          newState.errorMsg = `We have some technical problems. Please retry later.`
        }
      }

      this.setState(newState)
    }).catch((err) => {
      console.log(err)
      this.setState({
        sending: false,
        errorMsg: `We have some technical problems. Please retry later.`
      })
    })
  }

  handleChangeValid = (event) => {
    this.setState({
      errorMsg: '',
      validaded: event.target.checked
    })
  }

  render () {
    const { classes, width } = this.props

    return (
      <form
        noValidate
        onSubmit={this.handleSendInvitation}
        className={classnames(
          classes.root,
          {[classes.rootDesktop]: isWidthUp('lg', width)}
        )}>
        <div className={classes.title}>
          <SlackIcon className={classes.titleIcon} />
          <div className={classes.titleText}>
            Register to Slack
          </div>
        </div>
        <MuiTypography variant='body1' className={classes.description}>
          On the Centreon Community Slack, you obtain help from experienced users and help others with what you have learned.
        </MuiTypography>
        <MuiTypography variant='body1' className={classes.description}>
          You can propose fixes and enhanced, or discuss about monitoring and your favorite solution Centreon.
        </MuiTypography>
        <MuiTextfield
          label='Email'
          placeholder='Email'
          required
          type='email'
          error={this.state.emailInError}
          value={this.state.email}
          onChange={this.handleChangeEmail} />
        <div className={classes.validated}>
          <Link
            to='/slack-code-of-conduct'
            className={classes.conditionsLink}>
            <MuiTypography
              variant='caption'>
              I accept to respect the code of conduct
            </MuiTypography>
          </Link>
          <MuiCheckbox
            onChange={this.handleChangeValid}
            value='validated'
            color='primary' />
        </div>
        {this.state.errorMsg &&
          <div className={classes.error}>{this.state.errorMsg}</div>}
        <MuiButton
          disabled={this.state.sending}
          type='submit'
          variant='contained'
          color='primary'>
          Send
        </MuiButton>
      </form>
    )
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(RegisterSlack)
