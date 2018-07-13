/* global graphql */
import React from 'react'

import Post from '../components/Post'

class PostTemplate extends React.Component {
  render () {
    const { data } = this.props

    return (
      <Post post={data.post} />
    )
  }
}

export default PostTemplate

export const postQuery = graphql`
query PostBySlug($slug: String!) {
  post: markdownRemark(fields: { base: { eq: $slug } }) {
    html
    fields {
      date
    }
    frontmatter {
      title
      category
      author
      cover {
        childImageSharp {
          resize(width: 400) {
            src
          }
        }
      }
    }
  }
}
`
