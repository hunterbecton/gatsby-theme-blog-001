import React from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import _ from "lodash"

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
              const blogLink = _.kebabCase(node.frontmatter.path)
              const title = node.frontmatter.title
              return (
                <div key={node.id}>
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

const featuredSidebarQuery = graphql`
  query FeaturedSidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { featured: { eq: true } } }
      limit: 3
    ) {
      edges {
        node {
          id
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

export default FeaturedSidebar
