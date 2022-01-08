import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import BlogForm from "./components/NewBlog"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      blogs.sort((firstItem, secondItem) => secondItem.likes-firstItem.likes )).then(blogs => setBlogs( blogs ))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLike = (blog) => {
    console.log("Blog liked")
    const likes = blog.likes +1
    const newBlog= {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title : blog.title,
      url: blog.url
    }
    blogService.update(blog.id,newBlog).then(returnedBlog => {setBlogs(blogs.map(newblog => newblog.id !== blog.id ? newblog : returnedBlog))})
  }
  const removeBlog = (blog) => {
    blogService.remove(blog.id)
    setBlogs(blogs.filter(blogObject => blogObject.id !== blog.id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password, })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch(exception) {
      console.log("wrong credentials")
      setErrorMessage("Invalid username or password")
      setTimeout(() => {
        setErrorMessage(null)}, 5000
      )
    }
  }
  const logOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    window.location.reload(false)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setStatusMessage("a new blog "+blogObject.title+" by "+blogObject.author+" added")
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <ErrorNotification message={errorMessage} type="error" />
      <Notification message={statusMessage} type="status" />
      {user === null ?
        loginForm() :<div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick ={logOut}>log out</button></p>
          <Togglable buttonLabel="Create a new blog" ref = {blogFormRef} > <BlogForm
            createBlog={addBlog}
          /></Togglable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} onLike={() => onLike(blog)} remove={() => removeBlog(blog)} user = {user.name} />)}
        </div>
      }
    </div>
  )
}
export default App