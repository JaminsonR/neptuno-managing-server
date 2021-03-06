const express = require("express");
const app = express();
var ClientController = require("../controllers/clients.controller");

// middleware code
const { jwt, middlewareTesting } = require("../utils/middlewares");
const { isTesting } = require("../config");
const jwtMiddleware = middlewareTesting(isTesting, jwt);
app.route("*").all(jwtMiddleware);

// create
app.route("/add").post(async (req, res) => {
  let resp = await ClientController.create(req.body);
  return res.status(resp.stateCode).send(resp);
});

// get all
app.route("/").get(async (req, res) => {
  let resp = await ClientController.getAll();
  return res.status(resp.stateCode).send(resp);
});

module.exports = app;
