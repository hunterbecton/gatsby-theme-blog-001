import React from "react"
import Link from "gatsby-link"

const NavLink = props => {
    if (!props.test) {
      return <Link to={props.url}>{props.text}</Link>
    } else {
      return <span>{props.text}</span>
    }
}

export default NavLink;