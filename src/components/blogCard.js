import React from "react"

function BlogCard(props) {
  return (
    <div className="blog_card" key={props.key}>
      {props.categories.map((category, i) => {
        return (
          <p key={i} className="blog_card_category">
            {category}
          </p>
        )
      })}
      <h2 className="blog_card_title">{props.title}</h2>
      <p className="blog_card_description">{props.description}</p>
      <div className="blog_card_profile">
        {props.authors.map((author, i) => {
          return (
            <p key={i} className="blog_card_profile_author">
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
