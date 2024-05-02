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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}