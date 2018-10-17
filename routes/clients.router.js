var router = require('express').Router()
var ClientController = require('../controllers/clients.controller')

router.post('/', ClientController.storeClient)
router.get('/', ClientController.getClients)

module.exports = router
