import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogFeedTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
        <Bio />
      </Layout>
    )
  }
}

export default BlogFeedTemplate

export const pageQuery = graphql`
  query BlogFeed($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: {eq: "blog-post"}}}
      limit: 6
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
