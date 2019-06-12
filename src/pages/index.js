import React from "react"
import { Link, graphql } from "gatsby"

import CategorySidebar from "../components/categorySidebar"
import FeaturedSidebar from "../components/featuredSidebar"
import Layout from "../components/layout"
import RecentSidebar from "../components/recentSidebar"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <FeaturedSidebar />
        <RecentSidebar />
        <CategorySidebar />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
