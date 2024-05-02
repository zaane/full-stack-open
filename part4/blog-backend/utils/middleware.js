const morgan = require('morgan')
const { inspect } = require('node:util');

morgan.token('content', request => inspect(request.body))
const requestLogger = 
    morgan(':method :url :status :res[content-length] - :response-time ms :content')

//TODO: implement unknown endpoint and error handler middleware

module.exports = { requestLogger }