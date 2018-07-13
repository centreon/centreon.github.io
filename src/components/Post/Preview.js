import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import moment from 'moment'
import compose from 'recompose/compose'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'

import CategoryContext from '../../context/Category'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: '50%',
    filter: 'grayscale(1)'
  },
  mobileImage: {
    width: 100,
    height: 100
  },
  emptyImage: {
    backgroundColor: '#eaeaea'
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing.unit * 2
  },
  title: {
    ...theme.typography.title,
    color: '#0072CE',
    fontSize: 30
  },
  mobileTitle: {
    fontSize: 22
  },
  date: {
    ...theme.typography.body1,
    color: '#767676',
    fontSize: 18
  },
  mobileDate: {
    fontSize: 12
  },
  tags: {
    ...theme.typography.body1,
    color: '#84BD00',
    fontSize: 18
  },
  mobileTags: {
    fontSize: 12
  },
  description: {
    ...theme.typography.body1,
    color: '#767676',
    fontSize: 18,
    marginTop: theme.spacing.unit * 3
  },
  mobileDescription: {
    fontSize: 12,
    marginTop: theme.spacing.unit * 2
  },
  link: {
    textDecoration: 'none'
  },
  mobileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

class Preview extends React.Component {
  static propTypes = {
    /* CSS classes */
    classes: PropTypes.object.isRequired,
    /* The post data */
    post: PropTypes.object.isRequired
  }

  render () {
    const { classes, post, width } = this.props

    return (
      <CategoryContext.Consumer>
        {categories => (
          <div className={classes.root}>
            <Link to={`/post${post.fields.base}`}>
              {post.frontmatter.cover
                ? <LazyLoad
                  height={100}
                  throttle={300}
                  once
                  offset={100}>
                  <picture>
                    <source
                      type='image/webp'
                      className={classnames(
                        classes.image,
                        {[classes.mobileImage]: isWidthDown('md', width)}
                      )}
                      srcSet={post.frontmatter.cover.children[0].resolutions.srcSetWebp}
                    />
                    <source
                      className={classnames(
                        classes.image,
                        {[classes.mobileImage]: isWidthDown('md', width)}
                      )}
                      srcSet={post.frontmatter.cover.children[0].resolutions.srcSet} />
                    <img
                      src={post.frontmatter.cover.children[0].resolutions.src}
                      className={classnames(
                        classes.image,
                        {[classes.mobileImage]: isWidthDown('md', width)}
                      )} />
                  </picture>
                </LazyLoad>
                : <div className={classnames(
                  classes.image,
                  classes.emptyImage,
                  {[classes.mobileImage]: isWidthDown('md', width)})} />
              }
            </Link>
            <div className={classes.information}>
              <Link to={`/post${post.fields.base}`} className={classes.link}>
                <ResponsiveEllipsis
                  className={classnames(
                    classes.title,
                    {[classes.mobileTitle]: isWidthDown('md', width)}
                  )}
                  maxLine={isWidthDown('md', width) ? 1 : 2}
                  basedOn='letters'
                  text={post.frontmatter.title} />
              </Link>
              <Hidden mdDown>
                <div className={classes.date}>
                  {moment(post.fields.date).format('LL')}
                </div>
                <div className={classes.tags}>
                  {post.frontmatter.category.map((category) => {
                    const tags = categories.find((tag) => {
                      return tag.slug === category
                    })
                    if (tags) {
                      return tags.display
                    }

                    return category
                  }).join(' - ')}
                </div>
              </Hidden>
              <Hidden lgUp>
                <div className={classes.mobileInfo}>
                  <div className={classnames(classes.tags, classes.mobileTags)}>
                    {post.frontmatter.category.map((category) => {
                      const tags = categories.find((tag) => {
                        return tag.slug === category
                      })
                      if (tags) {
                        return tags.display
                      }

                      return category
                    }).join(' - ')}
                  </div>
                  <div className={classnames(classes.date, classes.mobileDate)}>
                    {moment(post.fields.date).format('L')}
                  </div>
                </div>
              </Hidden>
              <ResponsiveEllipsis
                className={classnames(
                  classes.description,
                  {[classes.mobileDescription]: isWidthDown('md', width)}
                )}
                maxLine={isWidthDown('md', width) ? 2 : 5}
                basedOn='letters'
                text={post.frontmatter.description} />
            </div>
          </div>
        )}
      </CategoryContext.Consumer>
    )
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(Preview)
