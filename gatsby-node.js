const path = require('path');
const fs = require('fs');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              template
              title
            }
          }
        }
      }
    }
  `);

  // Handle errors in GraphQL query
  if (result.errors) {
    console.error('Error loading markdown data:', result.errors);
    return;
  }

  // Handle missing data
  if (!result.data || !result.data.allMarkdownRemark) {
    console.error('No markdown data found');
    return;
  }

  // Define a fallback template in case specified templates are missing
  const fallbackTemplatePath = path.resolve('./src/templates/default.js');

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.frontmatter || !node.frontmatter.path) {
      console.warn('Skipping page due to missing path in frontmatter');
      return;
    }

    const template = node.frontmatter.template || 'default';
    const templatePath = path.resolve(`./src/templates/${template}.js`);

    // Use fallback template if the specified template doesn't exist
    const finalTemplatePath = fs.existsSync(templatePath)
      ? templatePath
      : fallbackTemplatePath;

    console.log(`Creating page: ${node.frontmatter.path} using template: ${template}`);

    createPage({
      path: node.frontmatter.path,
      component: finalTemplatePath,
      context: {
        pathSlug: node.frontmatter.path, // Pass pathSlug to match the GraphQL query in templates
      },
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = node.frontmatter.path || path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      node,
      name: 'slug',
      value: `/${slug}`,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemarkFrontmatter {
      path: String
      title: String
      template: String
    }
  `);
};
