const express = require('express')
const app = express()
const SalesController = require('../controllers/sales.controller')
const { jwt, middlewareTesting } = require('../utils/middlewares')
const { isTesting } = require('../config')
const jwtMiddleware = middlewareTesting(isTesting, jwt)
app.route('*').all(jwtMiddleware)

// create
app
  .route('/')
  .post(async (req, res) => {
    let resp = await SalesController.create(req.body)
    return res.status(resp.stateCode).send(resp)
  })

// get all
app
  .route('/')
  .get(async (req, res) => {
    let resp = await SalesController.getAll()
    return res.status(resp.stateCode).send(resp)
  })

// get per month sales
app
  .route('/months')
  .get(async (req, res) => {
    let resp = await SalesController.getPerMonth()
    return res.status(resp.stateCode).send(resp)
  })

module.exports = app
