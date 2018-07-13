module.exports = {
  siteMetadata: {
    title: 'Centreon Labs',
    description: 'The R&D space and life@Centreon',
    siteUrl: 'https://centreon.github.io'
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/calendar/`,
        name: 'calendar'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/categories.json`,
        name: 'categories'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-plugin-sharp',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
      options: {
        fields: [
          'title',
          'description',
          'categories'
        ],
        resolvers: {
          MarkdownRemark: {
            slug: node => node.fields.slug,
            base: node => node.fields.base,
            title: node => node.frontmatter.title,
            description: node => node.frontmatter.description,
            categories: node => node.frontmatter.category.join(',')
          }
        }
      }
    }
  ]
}
