import React from 'react'
import Link from 'gatsby-link'

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
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
   
  return (
    <Layout>
      <h4>{pageCount} Pages</h4>
 
      {group.map(({ node }) => (
        <div key={node.id} className="blogListing">
          <div className="date">{node.frontmatter.date}</div>
          <Link className="blogUrl" to={node.frontmatter.path}>
            {node.frontmatter.title}
          </Link>
          <div>{node.excerpt}</div>
        </div>
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