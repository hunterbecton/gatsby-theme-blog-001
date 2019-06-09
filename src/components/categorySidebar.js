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
              <h1>Categories</h1>
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
    allMarkdownRemark(filter: {frontmatter: {sidebar: {eq: true}}}) {
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