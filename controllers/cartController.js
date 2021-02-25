const { Cart } = require('../models')

class CartController {
  static getCart(req, res, next) {
    const idUser = req.user.id
    Cart.findAll({
      where: {
        userId: idUser,
        status: false
      },
      order: [['id', 'DESC']],
      include: ['Product']
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static createCart(req, res, next) {
    const input = {
      userId: req.user.id,
      productId: req.params.productId,
      quantity: +req.body.quantity,
      status: req.body.status || false
    }
      Cart.findOne({
        where: {
          userId: req.user.id,
          productId: input.productId,
          status: false
        },
        include: ['Product']
      })
        .then(cart => {
          if (cart) {
            let qty = +cart.quantity + +input.quantity
            return Cart.update({ quantity: qty }, {
              where: { id: cart.id },
              returning: true
            })
          } else {
            return Cart.create(input, {
              include: ['Product']
            })
          }
        })
        .then(data => {
          if (Array.isArray(data)) {
            res.status(201).json(data[1])
          } else {
            res.status(201).json(data)
          }
        })
        .catch(err => {
          next(err)
        })
  }

  static updateCart(req, res, next) {
    const id = req.params.cartId
    const input = {
      quantity: +req.body.quantity
    }
    Cart.update(input, {
      where: { id },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    const id = req.params.cartId
    Cart.destroy({
      where: { id }
    })
      .then(data => {
        if (!data) {
          next({
            name: 'Data not found'
          })
        } else {
          res.status(200).json({
            message: 'Cart has been deleted'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController;