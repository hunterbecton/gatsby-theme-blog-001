import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

function FeaturedSidebar() {
    return (
      <StaticQuery
        query={featuredSidebarQuery}
        render={data => {
          const posts = data.allMarkdownRemark.edges
          return (
            <div>
            {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
                <div>
                    <h1>{title}</h1>
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
        limit: 3
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { featured: {eq: true}}}
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
            }
          }
        }
      }
  }
`

export default FeaturedSidebar