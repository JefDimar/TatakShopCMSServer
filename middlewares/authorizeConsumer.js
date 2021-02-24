const { Cart } = require('../models')

function authorizeConsumer (req, res, next) {
  const id = req.user.id

  Cart.findOne({
    where: { userId: id }
  })
    .then(cart => {
      if (!cart) {
        next({
          name: 'Unauthorized, access denied'
        })
      } else if (cart.userId !== id) {
        next({
          name: 'Unauthorized, access denied'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorizeConsumer