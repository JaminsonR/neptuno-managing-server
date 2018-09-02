var router = require('express').Router()
var LoginController = require('../controllers/login.controller')

router.post('/login', LoginController.login)

module.exports = router;
