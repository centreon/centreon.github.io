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
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-nprogress',
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
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Centreon Labs',
        short_name: 'CentreonLabs',
        display: 'fullscreen',
        background_color: '#fff',
        theme_color: '#84BD00',
        start_url: '/',
        icons: [
          {
            src: '/icons/centreon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/centreon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt'
  ]
}
