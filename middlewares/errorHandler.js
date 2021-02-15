const errorHandler = (err, req, res, next) => {
  if(err) {
    console.log(err.message, err.name, '<<<<<< error di errorhandler');
    switch (err.name) {
      case 'Username / Password wrong':
        res.status(401).json({
          message: 'Invalid email or password, check again'
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