/* global graphql */
import React from 'react'

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
          : <div>No post</div>
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
