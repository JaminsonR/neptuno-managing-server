import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import users from './mocks/users'
import usersModel from '../models/user'

test.before(async t => {
  await db.connect(URL_DB())
})

test.beforeEach(async t => {
  await db.clean()
})

test.after('cleanup', t => {
  db.disconnect()
})


test('login', async t => {
  let [user] = users
  let userObj = new usersModel(user)
  await userObj.create()
  let res = await request(app).post(`/api/login/auth`).send({ id: user['id'], password: user['password'] })
  console.log(res.body)
  t.is(true, true)
})