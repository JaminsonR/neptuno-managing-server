var router = require('express').Router()
var ClientController = require('../controllers/clients.controller')
const { jwt } = require('../utils/middlewares')

// create
router.post('/', jwt, ClientController.storeClient)

// get all
router.get('/', jwt, ClientController.getClients)

module.exports = router
