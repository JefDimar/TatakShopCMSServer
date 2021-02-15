const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(function(done) {
  sequelize.close()
  done()
})

describe('success case for product', function() {
  it('get products - should response status code (200 - Ok)', function(done) {
    
  })
})