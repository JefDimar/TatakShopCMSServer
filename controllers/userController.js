const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static login(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: input.email
      }
    })
      .then(user => {
        if(!user) {
          next({
            name: 'Username / Password wrong'
          })
        } else {
          const match = checkPassword(input.password, user.password)

          if (match && user.role === 'admin') {
            const payload = {
              id: user.id,
              email: user.email,
              role: user.role
            }
            const access_token = generateToken(payload)

            const output = {
              message: 'Welcome back admin, have a nice day!',
              access_token,
              user: user.email
            }

            res.status(200).json(output)
          } else if (match && user.role === 'customer') {
            const payload = {
              id: user.id,
              email: user.email,
              role: user.role
            }
            const access_token = generateToken(payload)

            const output = {
              message: `Welcome back ${user.email}, have a nice day!`,
              access_token,
              user: user.email
            }

            res.status(200).json(output)
          } else {
            next({
              name: 'Username / Password wrong'
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static register(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(input)
      .then(user => {
        const output = {
          id: user.id,
          email: user.email,
          role: user.role
        }
        res.status(201).json(output)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController