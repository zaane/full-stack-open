const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const blogSamples = require('../blog_samples')
const initialBlogs = blogSamples.listWithManyBlogs
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of notes returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test('all posts have unique identifier named id', async () => {
    const response = await api.get('/api/blogs')
    const keyLists = response.body.map(blog => Object.keys(blog))
    
    assert(keyLists.every(keyList => keyList.includes('id')))
})

after(async () => {
    await mongoose.connection.close()
})