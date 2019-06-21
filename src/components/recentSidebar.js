import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div>
                <p>{title}</p>
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
        filter: { frontmatter: { templateKey: {eq: "blog-post"}}}
        limit: 3
        ){
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
            }
          }
        }
      }
  }
`

export default RecentSidebar