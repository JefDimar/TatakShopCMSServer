const router = require('express').Router();
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const ProductController = require('../controllers/productController')

// User Routing
router.post('/login', UserController.login)
// Middleware auth
router.use(authentication)
// Product Routing
router.get('/products', ProductController.getAll)

router.use(authorize)
router.post('/products', ProductController.create)
router.get('/products/:id', ProductController.getByID)
router.put('/products/:id', ProductController.edit)
router.patch('/products/:id', ProductController.setPrice)
router.delete('/products/:id', ProductController.delete)

module.exports = router