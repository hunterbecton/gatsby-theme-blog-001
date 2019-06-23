import React from "react"
import { navigate } from "gatsby"
import _ from "lodash"

function BlogCard(props) {
  return (
    <div className="blog_card" key={props.key}>
      {props.categories.map((category, i) => {
        const categoryLink = _.kebabCase(category)
        return (
          <p
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
  )
}

export default BlogCard
