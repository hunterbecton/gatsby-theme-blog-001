import React from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import _ from "lodash"

function RecentSidebar() {
  return (
    <StaticQuery
      query={recentSidebarQuery}
      render={data => {
        const posts = data.allMarkdownRemark.edges
        return (
          <div>
            <h3>Recent Posts</h3>
            {posts.map(({ node }) => {
              const blogLink = _.kebabCase(node.frontmatter.path)
              const title = node.frontmatter.title
              return (
                <div>
                  <p
                    onClick={() => {
                      navigate(`/${blogLink}`)
                    }}
                  >
                    {title}
                  </p>
                  <p>{node.frontmatter.date}</p>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
}

const recentSidebarQuery = graphql`
  query RecentSidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featured
            templateKey
            path
          }
        }
      }
    }
  }
`

export default RecentSidebar
