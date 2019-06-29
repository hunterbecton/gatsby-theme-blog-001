import React from "react"
import { navigate } from "gatsby"
import _ from "lodash"
import { css } from "@emotion/core"
import { colors } from "../tokens"

function BlogCard(props) {
  return (
    <div
      className="blog_card"
      css={css`
        display: flex;
        height: 350px;
        margin-bottom: 40px;
      `}
    >
      <div
        className="blog_card_featureImage"
        css={css`
          background-image: url(${props.featureImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 350px;
          min-width: 310px;
          border-radius: 10px;
        `}
      />
      <div
        className="blog_info"
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 40px;
        `}
      >
        {props.categories.map((category, i) => {
          const categoryLink = _.kebabCase(category)
          return (
            <p
              css={css`
                color: ${colors.accent};
              `}
              key={i}
              className="blog_card_category"
              onClick={() => {
                navigate(`category/${categoryLink}`)
              }}
            >
              {category}
            </p>
          )
        })}
        <h2
          onClick={() => {
            navigate(props.link)
          }}
          className="blog_card_title"
        >
          {props.title}
        </h2>
        <p className="blog_card_description">{props.description}</p>
        <div className="blog_card_profile">
          {props.authors.map((author, i) => {
            const authorLink = _.kebabCase(author)
            return (
              <p
                key={i}
                className="blog_card_profile_author"
                onClick={() => {
                  navigate(`author/${authorLink}`)
                }}
              >
                {author}
              </p>
            )
          })}
          <p className="blog_card_date">{props.date}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
