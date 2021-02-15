const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
  try {
    const decoded = checkToken(req.headers.access_token)

    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          next({
            name: 'Unauthorized, access denied'
          })
        }
      })
      .catch(err => {
        next(err);
      })
  } catch (err) {
    next(err)
  }
}

module.exports = authentication