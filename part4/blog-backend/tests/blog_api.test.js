const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe.only('when there are blogs in database', () => {
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

    describe('adding a new blog', () => {
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

            const blogsAfterPost = await helper.blogsInDatabase()
            assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)

            const titles = blogsAfterPost.map(response => response.title)
            assert(titles.includes('my test blog post'))
        })

        test('empty likes field defaults to 0', async () => {
            const newBlog = {
                title: 'this blog has no likes',
                author: 'me',
                url: 'http://noLikes.url.com'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)

            const blogsAfterPost = await helper.blogsInDatabase()
            const savedBlog = blogsAfterPost.find(blog => blog.title === 'this blog has no likes')

            assert.strictEqual(savedBlog.likes, 0)
        })

        test('empty title field throws 400', async () => {
            const newBlog = {
                author: 'me',
                url: 'http://noTitle.url.com',
                likes: 5
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })

        test('empty url field throws 400', async () => {
            const newBlog = {
                title: 'this blog has no url',
                author: 'me',
                likes: 5
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })
    })

    test.only('a blog can be deleted', async () => {
        const blogsBeforeDelete = await helper.blogsInDatabase()
        const blogToDelete = blogsBeforeDelete[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDatabase()
        assert.strictEqual(blogsAfterDelete.length, blogsBeforeDelete.length - 1)

        const titles = blogsAfterDelete.map(blog => blog.title)
        assert(!titles.includes(blogToDelete.title))
    })
})

after(async () => {
    await mongoose.connection.close()
})