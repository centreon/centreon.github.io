import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { navigateTo } from 'gatsby-link'

import { withStyles } from '@material-ui/core/styles'

let measureText
if (typeof document !== 'undefined') {
  measureText = require('measure-text').default
}

const styles = theme => ({
  root: {
    display: 'flex',
    width: 'fit-content',
    padding: theme.spacing.unit,
    zIndex: theme.zIndex.drawer
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
  }
})

class ExtendButton extends React.Component {
  static propTypes = {
    forceOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    openSide: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    textColor: PropTypes.string,
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
    style: {}
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
    } else {
      state.width = 300
    }

    return state
  }

  handleMouseEnter = () => {
    if (this.props.forceOpen) {
      return
    }
    this.setState({
      open: true
    })
  }

  handleMouseLeave = () => {
    if (this.props.forceOpen) {
      return
    }
    this.setState({
      open: false
    })
  }

  handleClick = () => {
    if (this.props.link && this.props.link.match(/https?:\/\//)) {
      window.location = this.props.link
    } else if (this.props.link) {
      navigateTo(this.props.link)
    }
  }

  getIcon () {
    const baseSize = this.props.size - 2 * this.props.theme.spacing.unit

    return React.createElement(
      this.props.icon,
      {
        nativeColor: 'inherit',
        style: {
          width: baseSize,
          height: baseSize
        }
      }
    )
  }

  getContent () {
    return (
      <React.Fragment>
        {this.getIcon()}
        <div className={this.props.classes.textContent}
          style={{
            width: this.state.open ? this.state.width : 0
          }}>
          <div
            style={this.state.style}
            className={this.props.classes.text}>
            {this.props.text}
          </div>
        </div>
      </React.Fragment>
    )
  }

  render () {
    const { classes, className, openSide, textColor, color, theme } = this.props
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={{
          ...this.props.style,
          height: this.props.size,
          borderRadius: this.props.size / 2,
          backgroundColor: this.props.color,
          color: textColor || theme.palette.getContrastText(color)
        }}
        className={classnames(
          classes.root,
          {[classes.sideLeft]: openSide === 'left'},
          {[classes.sideRight]: openSide === 'right'},
          {[classes.hasLink]: this.props.link},
          {[className]: className}
        )}>
        {this.getContent()}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(ExtendButton)
