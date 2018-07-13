/* global graphql */
import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import PostPreview from '../components/Post/Preview'

const styles = theme => ({
  indexHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10
  },
  career: {
    height: 250,
    borderRadius: '200px/125px'
  }
})

class Index extends React.Component {
  render () {
    const { data } = this.props

    return (
      <React.Fragment>
        {data.posts.edges.map((post, idx) => {
          return (
            <PostPreview
              post={post.node}
              key={idx} />
          )
        })}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Index)

export const layoutQuery = graphql`
query LayoutQuery {
  posts: allMarkdownRemark(
    filter: { id: { regex: "//posts//" } }
    sort: { fields: [fields___date], order: DESC }
  ) {
    edges {
      node {
        fields {
          slug
          date
          base
        }
        frontmatter {
          title
          author
          category
          description
          cover {
            children {
              ... on ImageSharp {
                resolutions(width: 250, height: 250) {
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    }
  }
}
`
