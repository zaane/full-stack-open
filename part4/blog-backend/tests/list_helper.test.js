const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  emptyList,
  listWithOneBlog,
  listWithManyBlogs,
  favorite } = require('../blog_samples')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('empty list returns 0', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blog, equals sum of likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('blog with most likes', () => {
  test('finds the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, favorite)
  })
})

describe('author with most blogs', () => {
  const mostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }

  test('find the author with the most total blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, mostBlogs)
  })
})

describe('author with most likes', () => {
  const mostLiked = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }

  test('find the author with the most total likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, mostLiked)
  })
})