module.exports = {
  assetPrefix: 'https://villekulla-nma.netlify.app/',
  siteMetadata: {
    title: `Villekulla NMA`,
    description: `Occaecat mollit ad consequat et voluptate elit laborum nisi exercitation laboris exercitation aute aliquip aute.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-remark',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'x-robots-tag: noindex, noarchive, nosnippet',
            'cache-control: private, no-store',
          ],
        },
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-postcss',
  ],
};
