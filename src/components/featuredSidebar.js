import React from "react"
import { StaticQuery, graphql } from "gatsby"

function FeaturedSidebar() {
    return (
      <StaticQuery
        query={featuredSidebarQuery}
        render={data => {
          const posts = data.allMarkdownRemark.edges
          return (
            <div>
              <h3>Featured Posts</h3>
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

const featuredSidebarQuery = graphql`
  query FeaturedSidebarQuery {
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: {featured: {eq: true}}}
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
              featured
              templateKey
            }
          }
        }
      }
  }
`

export default FeaturedSidebar