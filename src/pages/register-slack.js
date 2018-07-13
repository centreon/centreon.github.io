import React from 'react'
import Link from 'gatsby-link'
import EmailValidator from 'email-validator'

import { withStyles } from '@material-ui/core/styles'
import MuiTextfield from '@material-ui/core/Textfield'
import MuiTypography from '@material-ui/core/Typography'
import MuiCheckbox from '@material-ui/core/Checkbox'
import MuiButton from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    alignSelf: 'center'
  },
  title: {
    ...theme.typography.title,
    color: '#009FDF',
    alignSelf: 'center',
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
  }

  handleChangeValid = (event) => {
    this.setState({
      errorMsg: '',
      validaded: event.target.checked
    })
  }

  render () {
    const { classes } = this.props

    return (
      <form
        noValidate
        onSubmit={this.handleSendInvitation}
        className={classes.root}>
        <div className={classes.title}>Register to slack</div>
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

export default withStyles(styles)(RegisterSlack)
