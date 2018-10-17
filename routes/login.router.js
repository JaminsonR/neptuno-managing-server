const express = require('express')
const app = express()
const LoginController = require('../controllers/login.controller')

app
  .route('/auth')
  .post(async (req, res) => {
    let { id, password } = req.body
    let resp = await LoginController.login(id, password)
    return res.status(resp.stateCode).send(resp)
  })

module.exports = app
