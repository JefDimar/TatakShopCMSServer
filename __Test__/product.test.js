const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

let token = ''
let tokenCust = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyQG1haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJyb2xlIjoiY3VzdG9tZXIifQ.Fljwi-q8zMtIjTv1y83Vwb3rd1CQpWTA8FFZGMva9-0' // Generate dari web jwt kak, takut ngubah ntar malah error dari awal nambah, takut ga kesampean waktu di client ^_^
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

  it('post products - should response status code (201 - Created)', function (done) {
    const body = dummyProduct[0]

    request(app)
      .post('/products')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Success to add product to database!')
        done()
      })
  })

  it('get products by id - should response status code (201 - Created)', function (done) {
    request(app)
      .get(`/products/${id}`)
      .send()
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        done()
      })
  })

  it('edit products by id - should response status code (201 - Created)', function (done) {
    const body = {
      name: 'Headset uler ijo',
      image_url: 'https://www.eliteprintsolutions.com.au/wp-content/uploads/2020/04/razer-kraken-te-gallery-02.jpg',
      price: 500000,
      stock: 7
    }
    request(app)
      .put(`/products/${id}`)
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Success data has been updated successfully')
        done()
      })
  })

  it('edit products by id for stock & price - should response status code (201 - Created)', function (done) {
    const body = {
      price: 600000,
      stock: 10
    }
    request(app)
      .patch(`/products/${id}`)
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Success data has been updated successfully')
        done()
      })
  })

  it('delete products by id - should response status code (201 - Created)', function (done) {
    request(app)
      .delete(`/products/${id}`)
      .send()
      .set('access_token', token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Products has been deleted')
        done()
      })
  })
})

describe('failed case for product', function () {
  describe('case for create product', function () {
    it('no access_token - should response status code (401 - Unauthorized)', function (done) {
      const body = dummyProduct[0]
      request(app)
        .post('/products')
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please provide a JWT token, or login again')
          done()
        })
    })

    it('gave access_token but not admin - should response status code (401 - Unauthorized)', function (done) {
      const body = dummyProduct[0]
      request(app)
        .post('/products')
        .set('access_token', tokenCust)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please login first')
          done()
        })
    })

    it('required field missing value - should response status code (400 - Bad Request)', function (done) {
      const body = {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          done()
        })
    })

    it('field \'stock\' filled with minus - should response status code (400 - Bad Request)', function (done) {
      const body = {
        name: 'Mouse seri besi',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
        price: 15000000,
        stock: -5,
      }
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Price or Stock must be greater than zero')
          done()
        })
    })

    it('field \'price\' filled with minus - should response status code (400 - Bad Request)', function (done) {
      const body = {
        name: 'Mouse seri besi',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
        price: -100000,
        stock: 5,
      }
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Price or Stock must be greater than zero')
          done()
        })
    })
  })

  describe('case for update product', function () {
    it('access_token missing - should response status code (401 - Unauthorized)', function (done) {
      const body = dummyProduct[0]
      request(app)
        .put('/products')
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please provide a JWT token, or login again')
          done()
        })
    })

    it('have access_token but not admin - should response status code (401 - Unauthorized)', function (done) {
      const body = dummyProduct[0]
      request(app)
        .put('/products')
        .set('access_token', tokenCust)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please login first')
          done()
        })
    })

    it('field \'stock\' filled with minus - should response status code (400 - Bad Request)', function (done) {
      const body = {
        name: 'Mouse seri besi',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
        price: 15000000,
        stock: -5,
      }
      request(app)
        .put(`/products/${id}`)
        .set('access_token', token)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Price or Stock must be greater than zero')
          done()
        })
    })

    it('field \'price\' filled with minus - should response status code (400 - Bad Request)', function (done) {
      const body = {
        name: 'Mouse seri besi',
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
        price: -100000,
        stock: 5,
      }
      request(app)
        .put(`/products/${id}`)
        .set('access_token', token)
        .send(body)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Price or Stock must be greater than zero')
          done()
        })
    })
  })

  describe('case for delete product', function () {

  })
})