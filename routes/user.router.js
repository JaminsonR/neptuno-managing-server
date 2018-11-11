const express = require('express')
const app = express()
const { jwt, middlewareTesting } = require('../utils/middlewares')
const UserController = require('../controllers/user.controller')
const { isTesting } = require('../config')
const jwtMiddleware = middlewareTesting(isTesting, jwt)
app.route('*').all(jwtMiddleware)

// esto es necesario?
// create
app
  .route('/register')
  .post(async (req, res) => {
    let resp = await UserController.create(req.body)
    return res.status(resp.stateCode).send(resp)
  })

// // get all
// app
//   .route('/')
//   .get(async (req, res) => {
//     let resp = await UserController.getAll()
//     return res.status(resp.stateCode).send(resp)
//   })

module.exports = app
