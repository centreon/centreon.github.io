import React from 'react'
import PropTypes from 'prop-types'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import classnames from 'classnames'

class Highlight extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    highlight: PropTypes.string.isRequired,
    highlightClassName: PropTypes.string.isRequired,
    truncate: PropTypes.bool.isRequired,
    truncateNumberWords: PropTypes.number.isRequired
  }

  static defaultProps = {
    truncate: false,
    truncateNumberWords: 2
  }

  getTruncated (text, highlight, pos, numberParts) {
    const nbWords = this.props.truncateNumberWords + 1
    if (!this.props.truncate || highlight || numberParts === 1) {
      return text
    }
    const words = text.split(/ /)
    if (words.length <= nbWords) {
      return text
    }
    if (pos === 0) {
      return `...${words.slice(Math.max(words.length - nbWords, 1)).join(' ')}`
    }
    if (pos === numberParts - 1) {
      return `${words.slice(0, nbWords).join(' ')}...`
    }
    const begin = words.slice(0, nbWords).join(' ')
    const end = words.slice(Math.max(words.length - nbWords, 1))
    return `${begin}...${end}`
  }

  render () {
    const { text, highlight, highlightClassName } = this.props
    const matches = match(text, highlight)
    const parts = parse(text, matches)

    return (
      <React.Fragment>
        {parts.map((part, idx) => {
          return (
            <span className={classnames(
              {[highlightClassName]: part.highlight}
            )} key={`part-${idx}`}>
              {this.getTruncated(
                part.text,
                part.highlight,
                idx,
                parts.length
              )}
            </span>
          )
        })}
      </React.Fragment>
    )
  }
}

export default Highlight
