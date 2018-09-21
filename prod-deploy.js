const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    user: {
      name: 'Centreon Bot',
      email: 'rd@centreon.com'
    }
  },
  (err) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log('Deploy done')
    process.exit(0)
  }
)
