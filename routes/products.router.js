const express = require('express')
const app = express()
const ProductController = require('../controllers/products.controller')
const { jwt, middlewareTesting } = require('../utils/middlewares')
const { isTesting } = require('../config')
const jwtMiddleware = middlewareTesting(isTesting, jwt)
app.route('*').all(jwtMiddleware)

// create
app
  .route('/')
  .post(async (req, res) => {
    let resp = await ProductController.create(req.body)
    return res.status(resp.stateCode).send(resp)
  })

// get all
app
  .route('/')
  .get(async (req, res) => {
    let resp = await ProductController.getAll()
    return res.status(resp.stateCode).send(resp)
  })

// modify existence
app
  .route('/existence/:id/:amount')
  .post(async (req, res) => {
    let resp = await ProductController.modifyStock(req.params)
    return res.status(resp.stateCode).send(resp)
  })

module.exports = app
