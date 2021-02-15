const request = require('supertest')
const app = require('../app')

describe('success case for login', function() {
  it('should response Status Code (200 - Ok)', function(done) {
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

describe('error case for login', function() {
  it('password wrong - should response Status code (401 - Unauthorized)', function(done) {
    const body = {
      ema: 'admin@mail.com',
      pas: '123456789'
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

  it('email wrong - should response Status code (401 - Unauthorized)', function(done) {
    const body = {
      ema: 'adminbeneran@mail.com',
      pas: '123456'
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

  it('sending nothing - should response status code (500 - Internal server error)', function(done) {
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
})