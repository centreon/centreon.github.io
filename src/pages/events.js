/* global graphql */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 4
  },
  title: {
    ...theme.typography.title,
    color: '#009FDF',
    fontSize: 28
  },
  date: {
    ...theme.typography.display1,
    color: '#84BD00',
    fontSize: 22
  },
  description: {
    ...theme.typography.display1,
    fontSize: 18,
    marginTop: theme.spacing.unit
  }
})

class Events extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* Data from graphql */
    data: PropTypes.object.isRequired
  }

  getDate (date) {
    const momentDate = moment(date)
    if (momentDate._f.match(/m/)) {
      return momentDate.format('LLL')
    }
    return momentDate.format('LL')
  }

  render () {
    const { data, classes } = this.props

    return (
      <React.Fragment>
        {data.events.edges
          .filter(({ node }) => {
            const dateCurrent = moment()
            let dateCompare
            if (node.dateEnd) {
              dateCompare = moment(node.dateEnd)
            } else {
              dateCompare = moment(node.dateStart)
            }

            return dateCompare.isSameOrAfter(dateCurrent, 'day')
          })
          .map(({ node }) => {
            return (
              <div key={node.fields.slug} className={classes.root}>
                <div className={classes.title}>
                  {node.title}
                </div>
                <div className={classes.date}>
                  {this.getDate(node.dateStart)}
                  {node.dateEnd && ` to ${this.getDate(node.dateEnd)}`}
                </div>
                <div className={classes.description}>
                  {node.desc}
                </div>
              </div>
            )
          })}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Events)

export const gueryEvent = graphql`
query EventQuery {
  events: allCalendarJson(
    sort: { fields: [fields___date], order: ASC}
  ) {
    edges {
      node {
        fields {
          date
          slug
        }
        title
        dateStart
        dateEnd
        desc
      }
    }
  }
}
`
