const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const sampleUser = {
    username: "stanley",
    name: "Stan Lee",
    password: "spiderman"
}

describe('when trying to log in', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        await api
            .post('/api/users')
            .send(sampleUser)
    })

    test('valid username/password combo sends 201', async () => {
        await api
            .post('/api/login')
            .send({
                username: sampleUser.username,
                password: sampleUser.password
            })
            .expect(201)
    })

    test('invalid username sends 401', async () => {
        await api
            .post('/api/login')
            .send({
                username: 'notarealusername',
                password: sampleUser.password
            })
            .expect(401)
            .expect(result => {
                if (result.status == 401) { console.log('401', result.body) }
            })
    })

    test('invalid password sends 401', async () => {
        await api
            .post('/api/login')
            .send({
                username: sampleUser.username,
                password: 'incorrect password'
            })
            .expect(401)
            .expect(result => console.log(result.body))
            .expect(result => {
                if (result.status == 401) { console.log('401', result.body) }
            })
    })
})

after(async () => {
    await mongoose.connection.close()
})