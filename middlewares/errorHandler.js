const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case 'SequelizeValidationError':
        const outputErr = []
        err.errors.forEach(errors => {
          outputErr.push(errors.message)
        })
        res.status(400).json({
          message: outputErr
        })
        break;
      case 'SequelizeUniqueConstraintError':
        res.status(400).json({
          message: 'Email already registered, try different email'
        })
        break;
      case 'Username / Password wrong':
        res.status(401).json({
          message: 'Username or Password incorrect, please login again'
        })
        break;
      case 'JsonWebTokenError':
        res.status(400).json({
          message: 'Please provide a JWT token, or login again'
        })
        break;
      case 'Username / Password wrong':
        res.status(401).json({
          message: 'Invalid email or password, check again'
        })
        break;
      case 'Unauthorized, access denied':
        res.status(401).json({
          message: 'Please login first'
        })
        break;
      case 'Error price / stock, min > 0':
        res.status(400).json({
          message: 'Price or Stock must be greater than zero'
        })
        break;
      case 'Data not found':
        res.status(404).json({
          message: 'Products you requested not found'
        })
        break;
      case 'SequelizeDatabaseError':
        res.status(400).json({
          message: 'Database error'
        })
        break;
      default:
        res.status(500).json({
          message: 'Internal Server Error'
        })
        break;
    }
  }
}

module.exports = errorHandler