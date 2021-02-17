const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

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
    stock: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

beforeAll((done) => {
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
      queryInterface.bulkInsert('Products', dummyProduct, { returning: true })
        .then(data => {
          id = data[0].id
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    .catch(err => {
      done(err)
    })
})

afterAll(function (done) {
  queryInterface.bulkDelete('Products', null, {})
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
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('stock')
        done()
      })
  })
})
