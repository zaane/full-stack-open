const blogSamples = require('../blog_samples')
const initialBlogs = blogSamples.listWithManyBlogs

const Blog = require('../models/blog')

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
module.exports = {
    initialBlogs,
    blogsInDatabase,
}