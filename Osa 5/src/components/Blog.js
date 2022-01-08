import React, { useState } from "react"
const Blog = ({ blog,onLike,remove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  const [showBlog,setShow] = useState(false)
  const setShowBlog =(event) => {
    event.preventDefault()
    setShow ((prevState) => !prevState)
  }
  if(showBlog === true && user===blog.user.name){
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={setShowBlog}>hide</button> <br></br>
        {blog.url} <br></br>
            likes: {blog.likes} <button onClick={onLike}>like</button> <br></br>
        {blog.user.name} <br></br>
        <button onClick={remove}>delete</button>
      </div>
    )
  }
  if(showBlog === true){
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={setShowBlog}>hide</button> <br></br>
        {blog.url} <br></br>
            likes: {blog.likes} <button onClick={onLike}>like</button> <br></br>
        {blog.user.name}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={setShowBlog}>view</button>
    </div>
  )
}

export default Blog