const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blogRequest = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    const sampleUser = await User.findById(decodedToken.id)

    const newBlog = new Blog(
        { ...blogRequest, user: sampleUser.id })

    const savedBlog = await newBlog.save()

    sampleUser.blogs = sampleUser.blogs.concat(savedBlog.id)
    await sampleUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
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