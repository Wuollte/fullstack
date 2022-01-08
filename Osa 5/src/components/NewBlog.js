import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newURL, setNewURL] = useState("")
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog ({
      title: newTitle,
      author: newAuthor,
      url:newURL,
      likes:null
    })
    setNewTitle("")
    setNewAuthor("")
    setNewURL("")
  }
  return (
    <div>
      <form onSubmit={addBlog}>
      Title <input value = {newTitle} onChange={handleTitleChange} /> <br></br>
      Author <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /> <br></br>
      URL <input value ={newURL} onChange={handleURLChange} /> <br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm