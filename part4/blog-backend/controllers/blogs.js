const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blogRequest = request.body

    if (!blogRequest.title) {
        return response.status(400).json({
            error: 'title field empty'
        })
    }

    if (!blogRequest.url) {
        return response.status(400).json({
            error: 'url field empty'
        })
    }

    const newBlog = new Blog(blogRequest)

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter