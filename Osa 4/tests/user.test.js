const { TestWatcher } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const helper = require ('../utils/test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('adding an user with no password does not work',async () => {
  const invalidUser= {
    username:"aaa",
    name:"Invalid",
    password:""
  }
  const status =await api.post('/api/users').send(invalidUser).expect(400)
  expect(status.text).toContain('password')
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
}) 

test('adding an user with no username does not work', async () => {
  const invalidUser = {
    username:"",
    name: "Invalid",
    password :"333"
  }
  const status = await api.post('/api/users').send(invalidUser).expect(400)
  expect(status.text).toContain('validation')
})

afterAll(() => {
    mongoose.connection.close()
})