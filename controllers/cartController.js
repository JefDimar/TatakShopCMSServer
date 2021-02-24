const { Cart } = require('../models')

class CartController {
  static getCart(req, res, next) {
    const idUser = req.user.id
    Cart.findAll({
      where: {
        userId: idUser
      },
      include: ['Products']
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static createCart(req, res, next) {
    const input = {
      userId: req.user.id,
      productId: req.params.id,
      quantity: req.body.quantity,
      status: req.body.status || false
    }

    Cart.create(input)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateCart(req, res, next) {}

  static deleteCart(req, res, next) {}
}

module.exports = CartController;