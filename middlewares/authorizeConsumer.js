const { Cart } = require('../models')
const { checkToken } = require('../helpers/jwt')

function authorizeConsumer (req, res, next) {
  const decoded = checkToken(req.headers.access_token)
  const id = req.params.cartId
  const userId = req.user.id
  Cart.findOne({
    where: { userId: decoded.id, id }
  })
    .then(cart => {
      console.log(cart)
      if (!cart) {
        next({
          name: 'Unauthorized, access denied'
        })
      } else if (cart.userId !== userId) {
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