import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import EmailValidator from 'email-validator'
import Link from 'gatsby-link'
import axios from 'axios'
import { detect } from 'detect-browser'

import { withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import MuiButton from '@material-ui/core/Button'
import MuiTypography from '@material-ui/core/Typography'
import MuiCheckbox from '@material-ui/core/Checkbox'
import MuiSnackbar from '@material-ui/core/Snackbar'

import SlackIcon from './Network/Slack'

let measureText
if (typeof document !== 'undefined') {
  measureText = require('measure-text').default
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 34,
    minHeight: 34,
    padding: theme.spacing.unit,
    backgroundColor: '#56B68B',
    color: '#fff',
    zIndex: theme.zIndex.drawer + 10
  },
  title: {
    display: 'flex'
  },
  sideRight: {
    flexDirection: 'row'
  },
  sideLeft: {
    flexDirection: 'row-reverse'
  },
  textContent: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
  text: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  hasLink: {
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest
    })
  },
  formContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit / 2,
    overflow: 'hidden'
  },
  formInput: {
    marginRight: theme.spacing.unit / 2
  },
  formInputColor: {
    color: '#fff'
  },
  formButtonSize: {
    minHeight: 26
  },
  conditionsLink: {
    color: '#fff'
  },
  conditionsText: {
    lineHeight: '30px',
    color: '#fff'
  },
  conditionsCheckbox: {
    width: 30,
    height: 30
  }
})

class Slack extends React.Component {
  static propTypes = {
    forceOpen: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    openSide: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    forceOpen: false,
    openSide: 'right',
    size: 38,
    style: {}
  }

  state = {
    open: false,
    width: 0,
    height: 0,
    email: '',
    validaded: false,
    sending: false,
    errorOpen: false,
    errorMsg: '',
    emailInError: false,
    sentOpen: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const state = {...prevState}
    if (nextProps.forceOpen && !state.open) {
      state.open = true
    }

    /* Calculate size of text */
    const baseSize = nextProps.size - 2 * nextProps.theme.spacing.unit
    state.style = {
      lineHeight: `${baseSize}px`,
      fontSize: `${baseSize * 0.75}px`
    }
    if (document) {
      const sizeText = measureText({
        text: nextProps.text,
        fontFamily: nextProps.theme.typography.fontFamily,
        fontWeight: nextProps.theme.typography.fontWeightMedium,
        lineHeight: `${baseSize}px`,
        fontSize: `${(baseSize) * 0.75}px`,
        fontStyle: 'normal'
      })
      state.width = sizeText.width.value + nextProps.theme.spacing.unit * 2
      const sizeFormText = measureText({
        text: 'I accept to respect the code of conduct',
        fontFamily: nextProps.theme.typography.caption.fontFamily,
        fontWeight: nextProps.theme.typography.caption.fontWeight,
        fontSize: nextProps.theme.typography.caption.fontSize,
        lineHeight: `${baseSize}px`,
        fontStyle: 'normal'
      })
      state.widthForm = sizeFormText.width.value + 50
      const browser = detect()
      if (browser.name === 'edge' || browser.name === 'safari') {
        state.widthForm = 250
      }
    } else {
      state.width = 300
      state.widthForm = 250
    }

    return state
  }

  handleMouseEnter = () => {
    if (this.props.forceOpen) {
      return
    }
    this.resetState(true)
  }

  handleMouseLeave = () => {
    if (this.props.forceOpen) {
      return
    }
    this.resetState(false)
  }

  resetState = (open) => {
    this.setState({
      open: open,
      email: '',
      validaded: false,
      errorOpen: false,
      errorMsg: '',
      emailInError: false
    })
  }

  handleChangeEmail = (event) => {
    this.setState({
      emailInError: false,
      email: event.target.value
    })
  }

  handleChangeValid = (event) => {
    this.setState({
      validaded: event.target.checked
    })
  }

  handleLink = () => {
    if (this.props.link && this.props.link.match(/https?:\/\//)) {
      window.location = this.props.link
    }
  }

  handleSendInvitation = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        errorMsg: 'The email must be valid.',
        errorOpen: true,
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
        newState.errorOpen = true
        if (data.error === 'already_in_team') {
          newState.errorMsg = `You've already joined this team! Please log in at https://centreon.slack.com.`
        } else if (data.error === 'already_invited') {
          newState.errorMsg = `You're already invited! Please check your email.`
        } else {
          newState.email = this.state.email
          newState.errorMsg = `We have some technical problems. Please retry later.`
        }
      } else {
        newState.sentOpen = true
      }

      this.setState(newState)
    }).catch((err) => {
      console.log(err)
      this.setState({
        sending: false,
        errorOpen: true,
        errorMsg: `We have some technical problems. Please retry later.`
      })
    })
  }

  handleErrorClose = () => {
    this.setState({
      errorOpen: false
    })
  }

  handleSentClose = () => {
    this.setState({
      sentOpen: false
    })
  }

  render () {
    const {
      classes,
      theme,
      size,
      openSide,
      style,
      text,
      className
    } = this.props

    const baseSize = size - 2 * theme.spacing.unit

    return (
      <div
        className={classnames(
          classes.root,
          {
            [className]: className
          }
        )}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          ...style,
          borderRadius: size / 2
        }}>
        <div
          onClick={this.handleLink}
          className={classnames(
            classes.title,
            {[classes.sideLeft]: openSide === 'left'},
            {[classes.sideRight]: openSide === 'right'},
            {[classes.hasLink]: this.props.link}
          )}>
          <SlackIcon
            nativeColor='inherit'
            style={{
              width: baseSize,
              height: baseSize
            }}
            />
          <div className={classes.textContent}
            style={{
              width: this.state.open ? this.state.width : 0
            }}>
            <div
              style={this.state.style}
              className={classes.text}>
              {text}
            </div>
          </div>
        </div>
        <form
          noValidate
          onSubmit={this.handleSendInvitation}
          className={classes.form}
          style={{
            marginTop: this.state.open ? theme.spacing.unit : 0,
            height: this.state.open ? 68 : 0,
            width: this.state.open ? this.state.widthForm : 0
          }}>
          <div className={classes.formContent}>
            <MuiTextField
              InputProps={{
                classes: {
                  input: classes.formInputColor
                }
              }}
              className={classes.formInput}
              placeholder='Invitation email'
              type='email'
              value={this.state.email}
              onChange={this.handleChangeEmail}
              error={this.state.emailInError}
              />
            <MuiButton
              disabled={this.state.sending}
              classes={{
                sizeSmall: classes.formButtonSize
              }}
              type='submit'
              size='small'
              variant='contained'
              color='primary'>
              Send
            </MuiButton>
          </div>
          <div className={classes.formContent}>
            <Link
              to='/slack-code-of-conduct'
              className={classes.conditionsLink}>
              <MuiTypography
                className={classes.conditionsText}
                variant='caption'>
                I accept to respect the code of conduct
              </MuiTypography>
            </Link>
            <MuiCheckbox
              checked={this.state.validaded}
              onChange={this.handleChangeValid}
              className={classes.conditionsCheckbox}
              color='primary'
              />
          </div>
        </form>
        <MuiSnackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          ContentProps={{
            style: {
              backgroundColor: theme.palette.error.main,
              color: theme.palette.getContrastText(
                theme.palette.error.main
              )
            }
          }}
          open={this.state.errorOpen}
          onClose={this.handleErrorClose}
          message={this.state.errorMsg}
          />
        <MuiSnackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.sentOpen}
          onClose={this.handleSentClose}
          message='Now check your email!' />
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Slack)
