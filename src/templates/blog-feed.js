import React from "react"
import Link from "gatsby-link"

import BlogCard from "../components/blogCard"
import CategorySidebar from "../components/categorySidebar"
import FeaturedSidebar from "../components/featuredSidebar"
import Layout from "../components/layout"
import RecentSidebar from "../components/recentSidebar"

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const IndexPage = ({ pageContext }) => {
  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? "/" : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <Layout>
      <h4>{pageCount} Pages</h4>
      {group.map(({ node }) => (
        <BlogCard
          key={node.id}
          link={node.frontmatter.path}
          categories={node.frontmatter.categories}
          title={node.frontmatter.title}
          description={node.frontmatter.description}
          authors={node.frontmatter.authors}
          date={node.frontmatter.date}
        />
      ))}
      <div className="previousLink">
        <NavLink test={first} url={previousUrl} text="Previous Page" />
      </div>
      <div className="nextLink">
        <NavLink test={last} url={nextUrl} text="Next Page" />
      </div>
      <FeaturedSidebar />
      <RecentSidebar />
      <CategorySidebar />
    </Layout>
  )
}
export default IndexPage