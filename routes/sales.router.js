const router = require('express').Router()
const SalesController = require('../controllers/sales.controller')
const { jwt } = require('../utils/middlewares')

// create
router.post('/', jwt, SalesController.storeSale)

// get all
router.get('/', jwt, SalesController.getSales)

module.exports = router
