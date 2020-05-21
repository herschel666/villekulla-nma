module.exports = {
  siteMetadata: {
    title: `Villekulla NMA`,
    description: `Occaecat mollit ad consequat et voluptate elit laborum nisi exercitation laboris exercitation aute aliquip aute.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {},
      },
    },
    'gatsby-plugin-postcss',
  ],
};
