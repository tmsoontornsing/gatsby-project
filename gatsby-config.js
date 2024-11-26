module.exports = {
  siteMetadata: {
    title: 'Hello World - Gatsby App by TM',
    description: 'A simple Gatsby project by TM', // Add description field if needed
    author: 'TM', // Add an author field here
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`, // Name for the source
        path: `${__dirname}/src/pages/hello-world/`, // Path to the folder containing markdown files
      },
    },
    `gatsby-transformer-remark`, // Transforms Markdown files into HTML
  ],
};
