const express = require('express')
const app = express()
const { jwt } = require('../utils/middlewares')
// const LoginController = require('../controllers/user.controller')

// get all
// app
//   .route('/')
//   .get(async (req, res) => {
//     let { id, password } = req.body
//     let resp = await LoginController.login(id, password)
//     return res.status(resp.stateCode).send(resp)
//   })

module.exports = app
