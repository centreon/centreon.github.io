import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Highlight from './Highlight'
import ExtraDate from './ExtraDate'

const styles = theme => ({
  root: {
    width: 300,
    height: 300,
    borderRadius: '50%',
    backgroundColor: 'rgba(234, 234, 234, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: 210,
    width: 210,
    overflow: 'hidden'
  },
  extraDate: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  divider: {
    ...theme.typography.subheading,
    color: '#767676',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: 'center'
  }
})

class Calendar extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The list of events */
    events: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  static defaultProps = {
    events: []
  }

  render () {
    const { classes, events } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {events
            .slice(0, 2)
            .map((cal) => {
              return <Highlight
                key={cal.fields.slug}
                date={cal.dateStart}
                title={cal.title}
                desc={cal.desc} />
            })
          }
          {events.length > 2
            ? <div className={classes.divider}>More Event</div>
            : null}
          <div className={classes.extraDate}>
            {events
              .slice(2)
              .map((event) => {
                return <ExtraDate
                  key={event.fields.slug}
                  date={event.dateStart}
                  title={event.title} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Calendar)
