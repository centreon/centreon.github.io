/* global graphql */
import React from 'react'

import MuiTypography from '@material-ui/core/Typography'

import PostPreview from '../components/Post/Preview'

class CategoryTemplate extends React.Component {
  render () {
    const { data } = this.props

    return (
      <React.Fragment>
        {data.posts
          ? data.posts.edges.map((post, idx) => {
            return (
              <PostPreview
                variant={idx % 2 === 0 ? 'primary' : 'secondary'}
                post={post.node}
                key={idx} />
            )
          })
          : <React.Fragment>
            <MuiTypography variant='display3' gutterBottom>
              We working to produce soon contents for this category.
            </MuiTypography>
            <MuiTypography variant='title'>
              You can suggest some idea on our <a href='https://centreon.slack.com'>community Slack</a>.
            </MuiTypography>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default CategoryTemplate

export const postQuery = graphql`
query CategroyPost($slug: String!) {
  posts: allMarkdownRemark(
    filter: {
      id: { regex: "//posts//" },
      frontmatter: { category: { in: [$slug] } }
    }
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
                resolutions(width: 150, height: 150) {
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
