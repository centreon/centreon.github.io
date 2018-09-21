const ghpages = require('gh-pages')

const cred = process.env.GHPAGES

ghpages.publish(
  'public',
  {
    user: {
      name: 'Centreon Bot',
      email: 'rd@centreon.com'
    },
    repo: `https://${cred}@github.com/centreon/centreon.github.io.git`
  },
  (err) => {
    if (err) {
      console.log(err.message)
      process.exit(1)
    }
    console.log('Deploy done')
    process.exit(0)
  }
)
