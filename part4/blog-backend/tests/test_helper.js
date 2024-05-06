const blogSamples = require('../blog_samples')
const initialBlogs = blogSamples.listWithManyBlogs

const Blog = require('../models/blog')

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const sampleToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYmJ5X2hpbGw0MiIsImlkIjoiNjYzNmFlMGU0Zjk4YTBkZmY4NjVhMmU5IiwiaWF0IjoxNzE0OTQ5MjUzfQ.Q1DMXI9PWtN2efGCCdgnHMZyok5pReJvfVRHzk5JuKA'

module.exports = {
    initialBlogs,
    blogsInDatabase,
    sampleToken
}