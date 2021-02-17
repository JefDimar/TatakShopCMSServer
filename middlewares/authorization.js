const { User } = require('../models')

function authorize(req, res, next) {
  const email = req.user.email

  User.findOne({
    where: { email }
  })
    .then(user => {
      console.log(user, 'ini di habis then findone')
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