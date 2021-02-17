const { User } = require('../models')

function authorize(req, res, next) {
  const email = req.user.email

  User.findOne({
    where: { email }
  })
    .then(user => {
      if (!user) {
        next({
          name: 'Unauthorized, access denied'
        })
      } else if (user.role !== 'admin') {
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

module.exports = authorize