import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { typography } from "../tokens"


const Wrapper = styled("div")`
  
  @import url(${typography.fonts});

  display: grid;
  grid-template-columns: 1fr repeat(6, minmax(100px,187px)) 1fr;
  grid-gap: 20px;
`

const Layout = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout