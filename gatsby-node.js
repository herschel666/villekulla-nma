/* eslint @typescript-eslint/no-var-requires: off */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const basicSluggify = (str) =>
  str
    .replace(/ä+/gi, 'ae')
    .replace(/ö+/gi, 'oe')
    .replace(/ü+/gi, 'ue')
    .replace(/ß+/gi, 'ss');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = node.fileAbsolutePath.endsWith('/startseite.md')
      ? '/'
      : createFilePath({ node, getNode, basePath: 'content/' });

    createNodeField({
      node,
      name: 'slug',
      value: basicSluggify(slug),
    });
  }
};

exports.createSchemaCustomization = ({ actions }) =>
  actions.createTypes(`
type MainNavigationItem {
  slug: String!
  title: String!
}
`);

exports.createResolvers = ({ createResolvers }) =>
  createResolvers({
    Query: {
      mainNavigation: {
        type: [`MainNavigationItem`],
        resolve: (_, __, context) => {
          const pages = context.nodeModel.getAllNodes({
            type: `MarkdownRemark`,
          });

          return pages
            .filter(
              ({ fileAbsolutePath }) =>
                !fileAbsolutePath.endsWith('/startseite.md')
            )
            .map(({ frontmatter, fields }) => ({
              slug: fields.slug,
              title: frontmatter.title,
            }));
        },
      },
    },
  });

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve('src/templates/page.tsx');
  const result = await graphql(`
    {
      pages: allMarkdownRemark(limit: 1000) {
        edges {
          node {
            filePath: fileAbsolutePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.pages.edges
    .filter(({ node }) => !node.filePath.endsWith('/startseite.md'))
    .forEach(({ node }) => {
      const pagePathname = `/${basicSluggify(
        path.basename(node.filePath).split('.').shift()
      )}/`;

      createPage({
        path: pagePathname,
        component: pageTemplate,
        context: {},
      });
    });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const oldPage = { ...page };

  page.path = page.path.replace(/([^/])$/, '$1/');
  if (page.path !== oldPage.path) {
    console.log('Deleting old page without trailing slash...');
    deletePage(oldPage);
    createPage(page);
  }
};
