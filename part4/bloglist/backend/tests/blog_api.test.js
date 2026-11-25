const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
  assert.strictEqual(response.body[0]._id, undefined)
})



after(() => {
  // Close the database connection after all tests are done
  mongoose.connection.close()
})