const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require ('../utils/test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

//HTTP-GET realted test
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right amount of blogs in database', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('blogs return an id field', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

//HTTP-POST related tests
test('adding a valid blog works', async () => {
  const validBlog = {title: "TITLE",
  author: "JS CODE",
  url: "notasite.com",
  likes: 69
  }
  await api.post('/api/blogs').send(validBlog).expect(201).expect('Content-Type', /application\/json/)
  const response=await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length + 1)
})

test('null amount of likes turns into 0', async () => {
  const nullBlog = 
  {
  title: "TEST",
  author: "A NULL BLOG",
  url: "notasite.com",
  likes: null
  }
  await api.post('/api/blogs').send(nullBlog).expect(201)
  response = await helper.blogsInDb()
  const item = response.find(item=>item.title=="TEST");
  expect(item.likes).toBe(0)
})

test ('missing title and author fields return status 400', async () => {
  const titlemissingBlog = 
  {
  author: "A NULL BLOG",
  url: "notasite.com",
  likes: 1
  }
  const authormissingBlog=
  {
  Title :"?",
  url: "notasite.com",
  likes: null
  }
  await api.post('/api/blogs').send(titlemissingBlog).expect(400)
  await api.post('/api/blogs').send(authormissingBlog).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})