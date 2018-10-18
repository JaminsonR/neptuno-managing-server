var router = require('express').Router()
var ProductController = require('../controllers/products.controller')
const { jwt, middlewareTesting } = require('../utils/middlewares')
const { isTesting } = require('../config')
const jwtMiddleware = middlewareTesting(isTesting, jwt)

// create
router.post('/', jwtMiddleware, ProductController.storeProduct)

// get all
router.get('/', jwtMiddleware, ProductController.getProducts)

module.exports = router
