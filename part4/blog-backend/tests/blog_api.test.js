const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of notes returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all posts have unique identifier named id', async () => {
    const response = await api.get('/api/blogs')
    const keyLists = response.body.map(blog => Object.keys(blog))

    assert(keyLists.every(keyList => keyList.includes('id')))
})

test('a valid post can be added', async () => {
    const newBlog = {
        title: 'my test blog post',
        author: 'me',
        url: 'http://url.url.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(response => response.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('my test blog post'))
})

test('blank likes field defaults to 0', async () => {
    const newBlog = {
        title: 'this blog has no likes',
        author: 'me',
        url: 'http://noId.url.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')

    const savedBlog = response.body.find(blog => blog.title === 'this blog has no likes')

    assert.strictEqual(savedBlog.likes, 0)

})

after(async () => {
    await mongoose.connection.close()
})