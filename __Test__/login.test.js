const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(function (done) {
  sequelize.close()
  done()
})

describe('success case for login', function () {
  it('should response Status Code (200 - Ok)', function (done) {
    const body = {
      email: 'admin@mail.com',
      password: '123456'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.access_token).toEqual('string')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})

describe('error case for login', function () {
  it('password wrong - should response Status code (401 - Unauthorized)', function (done) {
    const body = {
      email: 'admin@mail.com',
      password: '123456789'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Invalid email or password, check again')
        done()
      })
  })

  it('email wrong - should response Status code (401 - Unauthorized)', function (done) {
    const body = {
      email: 'adminbeneran@mail.com',
      password: '123456'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Invalid email or password, check again')
        done()
      })
  })

  it('sending nothing - should response status code (500 - Internal server error)', function (done) {
    request(app)
      .post('/login')
      .send('')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toEqual(500)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Internal Server Error')
        done()
      })
  })

  it('sending null - should response status code (500 - Internal server error)', function (done) {
    const body = {
      email: null,
      password: null
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Invalid email or password, check again')
        done()
      })
  })
})