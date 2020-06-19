let db = require("../config/db");
let { URL_DB } = require("../config");

// mocks
let users = require("../test/mocks/users");
let clients = require("../test/mocks/clients");
let products = require("../test/mocks/products");
let sales = require("../test/mocks/sales");

// models
let UsersModel = require("../models/user.model");
let ClientsModel = require("../models/client.model");
let ProductsModel = require("../models/product.model");
let SalesModel = require("../models/sale.model");

async function init() {
  await db.connect(URL_DB());
  await db.clean();
  let [user] = users;
  let userObj = new UsersModel(user);
  await userObj.create();

  // clients
  let [client] = clients;
  let clientObj = new ClientsModel(client);
  await clientObj.create();

  // products
  let [product] = products;
  let productObj = new ProductsModel(product);
  await productObj.create();

  // sales
  let [sale] = sales;
  let saleObj = new SalesModel(sale);
  await saleObj.create();

  db.disconnect();
}

init();
