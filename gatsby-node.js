const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _kebabCase = require("lodash/kebabCase")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions


  if (node.internal.type === `MarkdownRemark` && node.frontmatter.name){
    createNodeField({
      node,
      name: `slug`,
      value: `/${_kebabCase(node.frontmatter.name)}`,
    })
  }

  if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  

}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const googlePostTemplate = path.resolve(`./src/templates/google-post.js`)
  return graphql(`
    {
     local: allMarkdownRemark(
        filter: {parent: {internal: {type: {eq: "File"}}}}
      ){
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    google: allMarkdownRemark(
      filter: {parent: {internal: {type: {eq: "GoogleDocs"}}}}
    ){
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }

    }
  `).then(result => {

    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const local = result.data.local.edges
    const google = result.data.google.edges

    local.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
    })

    google.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
  })
  })
}
