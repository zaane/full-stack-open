const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
    app.use(middleware.requestLogger)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

//TODO: use unknown endpoint and error handler middleware

module.exports = app