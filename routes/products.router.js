var router = require('express').Router()
var ProductController = require('../controllers/products.controller')

router.post('/', ProductController.storeProduct);
router.get('/', ProductController.getProducts);


module.exports = router;