const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

    test('correct number of blogs returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('all blogs have unique identifier named id', async () => {
        const response = await api.get('/api/blogs')
        const keyLists = response.body.map(blog => Object.keys(blog))

        assert(keyLists.every(keyList => keyList.includes('id')))
    })

    describe.only('adding a new blog', () => {

        let sampleToken = ''

        before(async () => {
            await User.deleteMany({})

            const sampleUser = {
                username: "stanley",
                name: "Stan Lee",
                password: "spiderman"
            }

            await api
                .post('/api/users')
                .send(sampleUser)

            const response = await api
                .post('/api/login')
                .send({
                    username: sampleUser.username,
                    password: sampleUser.password
                })

            sampleToken = response.body.token

        })

        test('a valid post can be added', async () => {
            const newBlog = {
                title: 'my test blog post',
                author: 'me',
                url: 'http://noLikes.url.com',
                likes: 17
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set({ Authorization: `Bearer ${sampleToken}` })
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
                .set({ Authorization: `Bearer ${sampleToken}` })
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
                .set({ Authorization: `Bearer ${sampleToken}` })
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
                .set({ Authorization: `Bearer ${sampleToken}` })
                .send(newBlog)
                .expect(400)
        })
    })

    describe('when trying to change the database', () => {
        test('a blog can be deleted', async () => {
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

        test('a blog can be updated', async () => {
            const blogsBeforeUpdate = await helper.blogsInDatabase()
            const blogToUpdate = blogsBeforeUpdate[0]
            const updatedBlog = { ...blogToUpdate, likes: 42 }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)

            const blogsAfterUpdate = await helper.blogsInDatabase()
            assert.strictEqual(blogsAfterUpdate.length, blogsBeforeUpdate.length)

            const supposedToBeUpdated = blogsAfterUpdate.find(blog => blog.title === blogToUpdate.title)
            assert.strictEqual(supposedToBeUpdated.likes, 42)
        })
    })


})

after(async () => {
    await mongoose.connection.close()
})