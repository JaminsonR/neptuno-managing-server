var router = require('express').Router()
var ClientController = require('../controllers/clients.controller')

// create
router.post('/', ClientController.storeClient)

// get all
router.get('/', ClientController.getClients)

module.exports = router
