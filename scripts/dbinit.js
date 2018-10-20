let db = require('../config/db')
let { URL_DB } = require('../config')
let users = require('../test/mocks/users')
let UsersModel = require('../models/user')
async function init () {
  await db.connect(URL_DB())
  await db.clean()
  let [user] = users
  let userObj = new UsersModel(user)
  await userObj.create()
  db.disconnect()
}

init()
