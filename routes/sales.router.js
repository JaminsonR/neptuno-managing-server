var router = require('express').Router()
var SalesController = require('../controllers/sales.controller')

router.post('/', SalesController.storeSale)
router.get('/', SalesController.getSales)

module.exports = router
