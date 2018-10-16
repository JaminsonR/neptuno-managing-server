let db = require('../config/db')
let { URL_DB } = require('../config')
let users = require('../test/mocks/users')
let usersModel = require('../models/user')
async function inicializar () {
  await db.connect(URL_DB())
  await db.clean()
  let [user] = users
  let userObj = new usersModel(user)
  await userObj.create()
  db.disconnect()
}

inicializar()