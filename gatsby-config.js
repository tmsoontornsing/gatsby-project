module.exports = {
  siteMetadata: {
    title: 'Your Site Title',
    description: 'A description of your site',
    author: 'Your Name', // Add author here
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet'
  ],
}