const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blogRequest = request.body
    const sampleUser = await User.findById(request.userId)

    const newBlog = new Blog(
        { ...blogRequest, user: sampleUser.id })

    const savedBlog = await newBlog.save()

    sampleUser.blogs = sampleUser.blogs.concat(savedBlog.id)
    await sampleUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    const userId = request.userId

    if (blogToDelete.user.toString() !== userId.toString()) {
        return response.status(401).json({
            error: 'permission denied'
        })
    }

    await Blog.findByIdAndDelete(blogToDelete.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog,
        { new: true })

    response.json(returnedBlog)
})

//TODO: catch errors for all methods

module.exports = blogsRouter