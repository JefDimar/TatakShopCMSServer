const router = require('express').Router();
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const authorizeConsumer = require('../middlewares/authorizeConsumer')

// User Routing
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/products', ProductController.getAll)
// Middleware authentication
router.use(authentication)
// Route for CMS w/ authorize admin
router.post('/products', authorize, ProductController.create)
router.get('/products/:id', authorize, ProductController.getByID)
router.put('/products/:id', authorize, ProductController.edit)
router.patch('/products/:id', authorize, ProductController.setPrice)
router.delete('/products/:id', authorize, ProductController.delete)
//Route for customer/client (cart)
router.get('/carts', authorizeConsumer, CartController.getCart)
router.post('/carts/:productId', authorizeConsumer, CartController.createCart)
router.put('/carts/:cartId', authorizeConsumer, CartController.updateCart)
router.delete('/carts/:cartId', authorizeConsumer, CartController.deleteCart)

module.exports = router