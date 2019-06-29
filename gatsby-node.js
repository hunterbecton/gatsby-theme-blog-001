const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              description
              date(formatString: "MMMM DD, YYYY")
              featureImage {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
              title
              authors
              categories
              path
              templateKey
              profileImage {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
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

    // Paginated blog
    let blogs = []
    // Iterate through all nodes, putting all found blogs (where templateKey = blog-post) into `blogs`
    posts.forEach(edge => {
      if (_.isMatch(edge.node.frontmatter, { templateKey: "blog-post" })) {
        blogs = blogs.concat(edge)
      }
    })
    // Create paginated pages for blogs
    createPaginatedPages({
      edges: blogs,
      createPage: createPage,
      pageTemplate: "src/templates/blog-feed.js",
      pageLength: 6, // This is optional and defaults to 10 if not used
      pathPrefix: "/", // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    })

    // Create individual blog posts:
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

    // Category pages
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
      const categoryPath = `/category/${_.kebabCase(category)}`

      let blogsByCategory = []
      // Iterate through all nodes, putting all found blogs (where templateKey = blog-post and category node) into `blogsByCategory`
      posts.forEach(edge => {
        if (
          _.isMatch(edge.node.frontmatter, { templateKey: "blog-post" }) &&
          _.includes(edge.node.frontmatter.categories, category)
        ) {
          blogsByCategory = blogsByCategory.concat(edge)
        }
      })
      // Create paginated pages for categories
      createPaginatedPages({
        edges: blogsByCategory,
        createPage: createPage,
        pageTemplate: "src/templates/category.js",
        pageLength: 6, // This is optional and defaults to 10 if not used
        pathPrefix: categoryPath, // This is optional and defaults to an empty string if not used
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
      const authorPath = `/author/${_.kebabCase(author)}`

      let blogsByAuthor = []
      // Iterate through all nodes, putting all found blogs (where templateKey = blog-post and author node) into `blogByAuthor`
      posts.forEach(edge => {
        if (
          _.isMatch(edge.node.frontmatter, { templateKey: "blog-post" }) &&
          _.includes(edge.node.frontmatter.authors, author)
        ) {
          blogsByAuthor = blogsByAuthor.concat(edge)
        }
      })
      // Create paginated pages for authors
      createPaginatedPages({
        edges: blogsByAuthor,
        createPage: createPage,
        pageTemplate: "src/templates/author.js",
        pageLength: 6, // This is optional and defaults to 10 if not used
        pathPrefix: authorPath, // This is optional and defaults to an empty string if not used
        context: {
          author: author,        },
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

// exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
//   const { createNodeField } = boundActionCreators;

//   const postsOfAuthors = {};
//   // iterate thorugh all markdown nodes to link books to author
//   // and build author index
//   const markdownNodes = getNodes()
//       .filter(node => node.internal.type === "MarkdownRemark")
//       .forEach(node => {
//           if (node.frontmatter.author) {
//               const authorNode = getNodes().find(
//                   node2 =>
//                       node2.internal.type === "MarkdownRemark" &&
//           node2.frontmatter.title === node.frontmatter.author
//               );

//               if (authorNode) {
//                   createNodeField({
//                       node,
//                       name: "author",
//                       value: authorNode.id,
//                   });

//                   // if it's first time for this author init empty array for his posts
//                   if (!(authorNode.id in postsOfAuthors)) {
//                       postsOfAuthors[authorNode.id] = [];
//                   }
//                   // add book to this author
//                   postsOfAuthors[authorNode.id].push(node.id);
//               }
//           }
//       });

//   Object.entries(postsOfAuthors).forEach(([authorNodeId, postIds]) => {
//       createNodeField({
//           node: getNode(authorNodeId),
//           name: "posts",
//           value: postIds,
//       });
//   });
// };
