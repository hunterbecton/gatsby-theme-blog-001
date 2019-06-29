import React from "react"
import { css } from "@emotion/core"

/* Import Components */
import BlogCard from "../components/blogCard"
import BlogFeature from "../components/blogFeature"
import CategorySidebar from "../components/categorySidebar"
import FeaturedSidebar from "../components/featuredSidebar"
import Layout from "../components/layout"
import NavLink from "../components/navLink"
import RecentSidebar from "../components/recentSidebar"

const IndexPage = ({ pageContext }) => {
  const { group, index, first, last } = pageContext
  const previousUrl = index - 1 === 1 ? "/" : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  const headerBlog = [group[0]]

  const blog_featured = css`
    grid-column-start: 2;
    grid-column-end: span 6;
    margin-bottom: 50px;
  `

  const blog_feed = css`
    grid-column-start: 2;
    grid-column-end: span 4;
  `
  
  const sidebar = css`
    grid-column-start: 6;
    grid-column-end: span 2;
  `
  const sticky = css`
    position: sticky;
    top: 40px;
`

  return (
    <Layout>
      <div css={blog_featured}>
        {headerBlog.map(({ node }) => (
          <BlogFeature
            key={node.id}
            link={node.frontmatter.path}
            featureImage={
              node.frontmatter.featureImage.childImageSharp.fluid.src
            }
            categories={node.frontmatter.categories}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
            authors={node.frontmatter.authors}
            date={node.frontmatter.date}
          />
        ))}
      </div>
      <div css={blog_feed}>
        {group.slice(1).map(({ node }) => (
          <BlogCard
            key={node.id}
            link={node.frontmatter.path}
            featureImage={
              node.frontmatter.featureImage.childImageSharp.fluid.src
            }
            categories={node.frontmatter.categories}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
            authors={node.frontmatter.authors}
            date={node.frontmatter.date}
          />
        ))}
        <div className="pagination">
          <div className="previous_link">
            <NavLink test={first} url={previousUrl} text="Previous Page" />
          </div>
          <div className="next_link">
            <NavLink test={last} url={nextUrl} text="Next Page" />
          </div>
        </div>
      </div>
      <div css={sidebar}>
        <div css={sticky}>
          <FeaturedSidebar />
          <RecentSidebar />
          <CategorySidebar />
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
