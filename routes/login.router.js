const express = require('express')
const app = express()
const LoginController = require('../controllers/login.controller')
const UserModel = require('../models/user');

app.route('/auth')
	.post(async (req,res) => {
    let { id, password } = req.body
    let resp = await LoginController.login(id, password)
    return res.status(resp.codigoEstado).send(resp)
	})

module.exports = app
