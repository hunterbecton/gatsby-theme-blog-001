import React from "react"
import { navigate } from "gatsby"
import _ from "lodash"
import { css } from "@emotion/core"
import { colors, typography } from "../tokens"

function BlogFeature(props) {

  const feature_blog = css`
    align-content: center;
    background: linear-gradient(${colors.overlayStart}, ${colors.overlayEnd}),
      url(${props.featureImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    display: grid;
    min-height: 580px;
  `

  const feature_blog_info = css`
    display: flex;
    flex-direction: column;
    margin-left: 70px;
    max-width: 565px;
  `

  const feature_blog_title = css`
    color: ${colors.textLight};
    font-family: ${typography.featuredFont};
    font-size: ${typography.featuredSize};
    font-weight: ${typography.featuredWeight};
    letter-spacing: ${typography.featuredLetterSpacing};
    line-height: ${typography.featuredLineHeight};
  `

  return (
    <div css={feature_blog}>
      <div css={feature_blog_info}>
        <h2
          onClick={() => {
            navigate(props.link)
          }}
          css={feature_blog_title}
        >
          {props.title}
        </h2>
        <p className="feature_blog_description">{props.description}</p>
      </div>
    </div>
  )
}

export default BlogFeature
