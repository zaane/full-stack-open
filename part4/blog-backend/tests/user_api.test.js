const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when adding new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('a valid new user can be added', async () => {
        const newUser = {
            username: "stanley",
            name: "Stan Lee",
            password: "spiderman"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('username needs >=3 characters', async () => {
        const newUser = {
            username: "ba",
            name: "Bashir",
            password: "obrien"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('password needs >=3 characters', async () => {
        const newUser = {
            username: "bashir75",
            name: "Bashir",
            password: "ob"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})