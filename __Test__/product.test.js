const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt')

let token = ''
let id = 0
const admin = {
  email: 'admin@mail.com',
  password: '123456'
}
const dummyProduct = [
  {
    name: 'Mouse seri besi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
    price: 15000000,
    stock: 4
  }
]

beforeAll(function (done) {
  User.findOne({
    where: { email: admin.email }
  })
    .then(user => {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      const access_token = generateToken(payload)
      token = access_token
      return user
    })
    .then(user => {
      Product.create(dummyProduct)
        .then(data => {
          id = data.id
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    .catch(err => {
      console.log(err);
      done(err)
    })
})

afterAll(function (done) {
  Product.destroy({
    where: { id }
  })
    .then(_ => {
      sequelize.close()
      done()
    })
    .catch(err => {
      sequelize.close()
      done(err)
    })
})

describe('success case for product', function () {
  it('get products - should response status code (200 - Ok)', function (done) {
    request(app)
      .get('/products')
      .send()
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        expect(typeof res.body.access_token).toEqual('string')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})