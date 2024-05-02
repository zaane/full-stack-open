const _ = require('lodash')
const blogSamples = require('../blog_samples')
const blogList = blogSamples.listWithManyBlogs

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
    return blogs
        .reduce((max, current) => current.likes > max.likes ? current : max)
}

const mostLikes = (blogs) => {
    return _(blogs)
        .groupBy(blog => blog.author)
        .map((blogList, author) => {
            const likes = totalLikes(blogList)
            return { author, likes }
        })
        .reduce((max, current) => current.likes > max.likes ? current : max)
}

console.log(mostLikes(blogList))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes
}