import React from "react"
import { graphql } from "gatsby"

import CategorySidebar from "../components/categorySidebar"
import FeaturedSidebar from "../components/featuredSidebar"
import Layout from "../components/layout"
import RecentSidebar from "../components/recentSidebar"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <Layout>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        />
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.author}</p>
        <p>{post.frontmatter.date}</p>
        <p>{post.frontmatter.categories}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <FeaturedSidebar />
        <RecentSidebar />
        <CategorySidebar />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        authors
        categories
        featureImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
    }
  }
}
`
