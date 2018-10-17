var router = require('express').Router()
var ProductController = require('../controllers/products.controller')

// create
router.post('/', ProductController.storeProduct)

// get all
router.get('/', ProductController.getProducts)

module.exports = router
