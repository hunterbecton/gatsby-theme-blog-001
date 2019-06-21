import React from "react"
import { StaticQuery, graphql } from "gatsby"

function CategorySidebar() {
  return (
    <StaticQuery
      query={categorySidebarQuery}
      render={data => {
        const categories = data.allMarkdownRemark.edges
        return (
          <div>
            <h3>Categories</h3>
            {categories.map(({ node }) => {
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

const categorySidebarQuery = graphql`
  query CategorySidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { sidebar: { eq: true } } }
      limit: 12
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            sidebar
          }
        }
      }
    }
  }
`

export default CategorySidebar
