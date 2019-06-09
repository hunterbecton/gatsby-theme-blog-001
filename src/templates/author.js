import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class AuthorTemplate extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
              >
                <Link style={{ boxShadow: `none` }} to={node.frontmatter.path}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default AuthorTemplate

export const pageQuery = graphql`
  query PostsByAuthor($author: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}, authors: {eq: $author}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            path
            title
            date
            authors
            categories
            description
          }
        }
      }
    }
  }
`
