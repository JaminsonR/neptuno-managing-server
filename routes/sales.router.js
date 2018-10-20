const router = require('express').Router()
const SalesController = require('../controllers/sales.controller')
const { jwt, middlewareTesting } = require('../utils/middlewares')
const { isTesting } = require('../config')
const jwtMiddleware = middlewareTesting(isTesting, jwt)

// create
router.post('/', jwtMiddleware, SalesController.storeSale)

// get all
router.get('/', jwtMiddleware, SalesController.getSales)

router.get('/months', jwtMiddleware, SalesController.getSalesPerMonth)

module.exports = router
