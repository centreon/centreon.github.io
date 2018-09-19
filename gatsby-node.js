const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const base = createFilePath(
      { node, getNode, basePath: 'posts' }
    )
    createNodeField({
      node,
      name: 'base',
      value: base
    })
    const content = base.match(/^\/(\d{4}-\d{2}-\d{2})-([\w-]+)\/$/)
    createNodeField({
      node,
      name: 'date',
      value: content[1]
    })
    createNodeField({
      node,
      name: 'slug',
      value: content[2]
    })
  } else if (node.internal.type === 'CalendarJson') {
    const base = createFilePath(
      { node, getNode, basePath: 'calendar' }
    )
    createNodeField({
      node,
      name: 'date',
      value: node.dateStart
    })
    createNodeField({
      node,
      name: 'slug',
      value: base.replace(/\//g, '')
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const postTemplate = path.resolve('./src/templates/PostTemplate.js')
  const categoryTemplate = path.resolve('./src/templates/CategoryTemplate.js')

  return graphql(
    `
      {
        md: allMarkdownRemark(
          filter: { id: { regex: "//posts//" } }, limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
                base
                date
              }
            }
          }
        }
        categories: allCategoriesJson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      Promise.reject(result.errors)
    }

    result.data.md.edges.forEach(({ node }) => {
      createPage({
        path: `/post${node.fields.base}`,
        component: postTemplate,
        context: {
          slug: node.fields.base
        }
      })
    })

    result.data.categories.edges.forEach(({ node }) => {
      createPage({
        path: `/category/${node.slug}`,
        component: categoryTemplate,
        context: {
          slug: node.slug
        }
      })
    })
  })
}
