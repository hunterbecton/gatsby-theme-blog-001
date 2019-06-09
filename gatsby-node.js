const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              authors
              categories
              templateKey
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      if (edge.node.frontmatter.templateKey === "blog-post") {
        createPage({
          path: edge.node.frontmatter.path,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            templateKey: edge.node.frontmatter.templateKey,
            slug: edge.node.fields.slug,
            id,
          },
        })
      }
    })
    
    // Category pages:
    let categories = []
    // Iterate through each post, putting all found categories into `categories`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.categories`)) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    })
    // Eliminate duplicate categories
    categories = _.uniq(categories)

    // Make category pages
    categories.forEach(category => {
      const categoryPath = `/category/${_.kebabCase(category)}/`

      createPage({
        path: categoryPath,
        component: path.resolve(`src/templates/category.js`),
        context: {
          category: category,
        },
      })
    })

    // Author pages:
    let authors = []
    // Iterate through each post, putting all found authors into `authors`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.authors`)) {
        authors = authors.concat(edge.node.frontmatter.authors)
      }
    })
    // Eliminate duplicate authors
    authors = _.uniq(authors)

    // Make author pages
    authors.forEach(author => {
      const authorPath = `/author/${_.kebabCase(author)}/`

      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/author.js`),
        context: {
          author: author,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}