import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import MuiTypography from '@material-ui/core/Typography'

import CategoryContext from '../../context/Category'

const styles = theme => ({
  content: {
    ...theme.typography.body1,
    fontSize: '1.2rem',
    marginTop: theme.spacing.unit * 8
  },
  mobileContent: {
    marginTop: theme.spacing.unit * 2
  },
  headerImage: {
    alignSelf: 'center'
  },
  modileHeaderImage: {
    width: '100%'
  },
  mobileWrapperImage: {
    marginTop: theme.spacing.unit,
    maxHeight: 125,
    overflowY: 'hidden'
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    ...theme.typography.body1,
    fontSize: 18,
    marginTop: theme.spacing.unit * 4
  },
  mobileHeaderInfo: {
    marginTop: 0,
    fontSize: 14
  },
  mobileHeaderInfoTags: {
    marginTop: 0,
    fontSize: 16,
    color: '#84BD00'
  },
  headerDivider: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
    borderLeftColor: '#84BD00'
  },
  headerTitle: {
    marginTop: theme.spacing.unit * 4,
    fontSize: 38,
    color: '#0072CE',
    alignSelf: 'center'
  },
  mobileHeaderTitle: {
    fontSize: 26
  }
})

class Post extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The post data */
    post: PropTypes.object.isRequired
  }

  getDesktop () {
    const { post, classes } = this.props

    return (
      <CategoryContext.Consumer>
        {categories => (
          <React.Fragment>
            <div className={classes.headerInfo}>
              <div>
                Published {moment(post.fields.date).format('LL')}
              </div>
              <div className={classes.headerDivider} />
              <div>
                {post.frontmatter.category.map((category) => {
                  const tags = categories.find((tag) => {
                    return tag.slug === category
                  })
                  if (tags) {
                    return tags.display
                  }

                  return category
                }).join(', ')}
              </div>
              <div className={classes.headerDivider} />
              <div>
                by {post.frontmatter.author}
              </div>
            </div>
            <MuiTypography variant='headline' className={classes.headerTitle}>
              {post.frontmatter.title}
            </MuiTypography>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: post.html }} />
          </React.Fragment>
        )}
      </CategoryContext.Consumer>
    )
  }

  getMobile () {
    const { post, classes } = this.props

    return (
      <CategoryContext.Consumer>
        {categories => (
          <React.Fragment>
            <div className={classnames(
              classes.headerInfo,
              classes.mobileHeaderInfo)}>
              <div>
                Published {moment(post.fields.date).format('LL')}
              </div>
              <div className={classes.headerDivider} />
              <div>
                by {post.frontmatter.author}
              </div>
            </div>
            <div className={classnames(
              classes.headerInfo,
              classes.mobileHeaderInfoTags)}>
              {post.frontmatter.category.map((category) => {
                const tags = categories.find((tag) => {
                  return tag.slug === category
                })
                if (tags) {
                  return tags.display
                }

                return category
              }).join(', ')}
            </div>
            <MuiTypography variant='headline' className={classnames(
              classes.headerTitle,
              classes.mobileHeaderTitle
            )}>
              {post.frontmatter.title}
            </MuiTypography>
            <div
              className={classnames(
                classes.content,
                classes.mobileContent
              )}
              dangerouslySetInnerHTML={{ __html: post.html }} />
          </React.Fragment>
        )}
      </CategoryContext.Consumer>
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

export default withStyles(styles)(Post)
